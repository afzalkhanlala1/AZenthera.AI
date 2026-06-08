// =============================================================================
// Rate limiting — Upstash if configured, best-effort in-memory otherwise.
// In-memory is NOT durable across serverless invocations; set
// UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN in production.
// =============================================================================

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export interface RateLimitResult {
  success: boolean;
  remaining: number;
}

const hasUpstash =
  !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;

const upstashCache = new Map<string, Ratelimit>();

function getUpstashLimiter(limit: number, windowSec: number): Ratelimit {
  const key = `${limit}:${windowSec}`;
  let limiter = upstashCache.get(key);
  if (!limiter) {
    limiter = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(limit, `${windowSec} s`),
      prefix: "azenthera/rl",
    });
    upstashCache.set(key, limiter);
  }
  return limiter;
}

const memoryStore = new Map<string, { count: number; reset: number }>();

function memoryLimit(
  id: string,
  limit: number,
  windowSec: number
): RateLimitResult {
  const now = Date.now();
  const windowMs = windowSec * 1000;
  const entry = memoryStore.get(id);
  if (!entry || entry.reset < now) {
    memoryStore.set(id, { count: 1, reset: now + windowMs });
    return { success: true, remaining: limit - 1 };
  }
  entry.count += 1;
  const remaining = Math.max(0, limit - entry.count);
  return { success: entry.count <= limit, remaining };
}

/**
 * @param id      Unique bucket id (e.g. `inspect:<ip>`).
 * @param limit   Max requests per window.
 * @param windowSec Window length in seconds.
 */
export async function rateLimit(
  id: string,
  limit: number,
  windowSec: number
): Promise<RateLimitResult> {
  if (hasUpstash) {
    try {
      const { success, remaining } = await getUpstashLimiter(limit, windowSec).limit(id);
      return { success, remaining };
    } catch {
      // Fall back to in-memory if Upstash is unreachable.
    }
  }
  return memoryLimit(id, limit, windowSec);
}

export function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") || "anon";
}
