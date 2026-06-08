import { NextResponse } from "next/server";
import dns from "node:dns/promises";
import net from "node:net";
import * as cheerio from "cheerio";
import { rateLimit, clientIp } from "@/lib/rateLimit";

// Needs the Node runtime for DNS lookups (SSRF guard).
export const runtime = "nodejs";

const MAX_BYTES = 1_500_000; // 1.5 MB cap on fetched HTML
const FETCH_TIMEOUT_MS = 8000;

interface InspectResult {
  businessName: string;
  description: string;
  summary: string;
  services: string[];
  sourceUrl: string;
}

/** Reject private, loopback, link-local, and unique-local addresses. */
function isPrivateAddress(ip: string): boolean {
  if (net.isIPv4(ip)) {
    const [a, b] = ip.split(".").map(Number);
    if (a === 10) return true;
    if (a === 127) return true;
    if (a === 0) return true;
    if (a === 169 && b === 254) return true; // link-local
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    if (a === 100 && b >= 64 && b <= 127) return true; // CGNAT
    return false;
  }
  const lower = ip.toLowerCase();
  if (lower === "::1" || lower === "::") return true;
  if (lower.startsWith("fe80")) return true; // link-local
  if (lower.startsWith("fc") || lower.startsWith("fd")) return true; // unique-local
  if (lower.startsWith("::ffff:")) return isPrivateAddress(lower.replace("::ffff:", ""));
  return false;
}

function normalizeUrl(raw: string): URL | null {
  let candidate = raw.trim();
  if (!/^https?:\/\//i.test(candidate)) candidate = `https://${candidate}`;
  try {
    const u = new URL(candidate);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    return u;
  } catch {
    return null;
  }
}

async function assertPublicHost(hostname: string): Promise<boolean> {
  // Literal IPs.
  if (net.isIP(hostname)) return !isPrivateAddress(hostname);
  if (hostname === "localhost" || hostname.endsWith(".local")) return false;
  try {
    const records = await dns.lookup(hostname, { all: true });
    if (!records.length) return false;
    return records.every((r) => !isPrivateAddress(r.address));
  } catch {
    return false;
  }
}

function clean(text: string | undefined | null): string {
  return (text || "").replace(/\s+/g, " ").trim();
}

function heuristicExtract(html: string, url: URL): InspectResult {
  const $ = cheerio.load(html);
  const title = clean($("title").first().text());
  const ogSite = clean($('meta[property="og:site_name"]').attr("content"));
  const metaDesc =
    clean($('meta[name="description"]').attr("content")) ||
    clean($('meta[property="og:description"]').attr("content"));
  const h1 = clean($("h1").first().text());

  const businessName =
    ogSite ||
    title.split(/[|\-–—·:]/)[0].trim() ||
    h1 ||
    url.hostname.replace(/^www\./, "");

  // Candidate "services" from headings + nav text.
  const services: string[] = [];
  const seen = new Set<string>();
  $("h2, h3, nav a, [class*='service'] h3").each((_, el) => {
    const t = clean($(el).text());
    if (t && t.length >= 3 && t.length <= 48 && !seen.has(t.toLowerCase())) {
      seen.add(t.toLowerCase());
      services.push(t);
    }
  });

  const summaryParts = [metaDesc, h1].filter(Boolean);
  const summary = clean(summaryParts.join(". ")) || `${businessName} — see ${url.hostname}.`;

  return {
    businessName,
    description: metaDesc || h1 || "",
    summary,
    services: services.slice(0, 10),
    sourceUrl: url.toString(),
  };
}

async function llmSummarize(
  base: InspectResult,
  bodyText: string
): Promise<InspectResult> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return base;
  try {
    const { default: OpenAI } = await import("openai");
    const openai = new OpenAI({ apiKey: key });
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You summarize a business from its website text. Return JSON with keys: businessName (string), summary (2-3 sentences describing what they do, for a phone agent to use), services (array of up to 6 short service/offering names). Be factual; do not invent prices.",
        },
        {
          role: "user",
          content: `URL: ${base.sourceUrl}\nTitle/name guess: ${base.businessName}\n\nWebsite text:\n${bodyText.slice(0, 6000)}`,
        },
      ],
    });
    const raw = completion.choices[0]?.message?.content;
    if (!raw) return base;
    const parsed = JSON.parse(raw);
    return {
      ...base,
      businessName: clean(parsed.businessName) || base.businessName,
      summary: clean(parsed.summary) || base.summary,
      services: Array.isArray(parsed.services) && parsed.services.length
        ? parsed.services.map((s: unknown) => clean(String(s))).filter(Boolean).slice(0, 6)
        : base.services,
    };
  } catch {
    return base;
  }
}

export async function POST(req: Request) {
  const ip = clientIp(req);
  const limit = await rateLimit(`inspect:${ip}`, 10, 60 * 60); // 10/hour
  if (!limit.success) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again later." },
      { status: 429 }
    );
  }

  let url: URL | null = null;
  try {
    const body = await req.json();
    url = normalizeUrl(String(body?.url ?? ""));
  } catch {
    /* handled below */
  }
  if (!url) {
    return NextResponse.json({ error: "Enter a valid website URL." }, { status: 400 });
  }

  if (!(await assertPublicHost(url.hostname))) {
    return NextResponse.json(
      { error: "That address can't be inspected." },
      { status: 400 }
    );
  }

  // Fetch with timeout + size cap.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  let html = "";
  try {
    const res = await fetch(url.toString(), {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent": "AzentheraVoiceAgent/1.0 (+https://azentheraai.com)",
        Accept: "text/html,application/xhtml+xml",
      },
    });
    if (!res.ok) {
      return NextResponse.json(
        { error: `Couldn't load that site (${res.status}).` },
        { status: 422 }
      );
    }
    const reader = res.body?.getReader();
    if (reader) {
      const decoder = new TextDecoder();
      let received = 0;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        received += value.byteLength;
        html += decoder.decode(value, { stream: true });
        if (received > MAX_BYTES) {
          controller.abort();
          break;
        }
      }
    } else {
      html = (await res.text()).slice(0, MAX_BYTES);
    }
  } catch {
    return NextResponse.json(
      { error: "Couldn't reach that website. Check the URL and try again." },
      { status: 422 }
    );
  } finally {
    clearTimeout(timeout);
  }

  const base = heuristicExtract(html, url);
  const $ = cheerio.load(html);
  $("script, style, noscript").remove();
  const bodyText = clean($("body").text()).slice(0, 8000);

  const result = await llmSummarize(base, bodyText);
  return NextResponse.json(result, {
    headers: { "Cache-Control": "no-store" },
  });
}
