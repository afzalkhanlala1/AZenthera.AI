import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/lib/data";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { VoiceAgentsPromo } from "@/components/voice/VoiceAgentsPromo";

export const metadata = {
  title: "AI Agents & Automation",
  description:
    "Custom multi-agent ecosystems that automate complex business workflows across departments — Sales, HR, Marketing, Engineering, and more. Includes live voice agents you can try.",
};

export default function AIAgentsPage() {
  const service = getServiceBySlug("ai-agents");
  if (!service) notFound();
  return (
    <ServicePageTemplate service={service} extraSection={<VoiceAgentsPromo />} />
  );
}
