import type { Channel } from "@/content/types";
import { Icon } from "@/components/ui/Icon";

const meta: Record<Channel, { icon: string; color: string; bg: string }> = {
  "LIGAÇÃO": { icon: "Phone", color: "#0072a3", bg: "rgba(0,187,255,0.14)" },
  "EMAIL 1:1": { icon: "Mail", color: "var(--bm-blue)", bg: "rgba(12,39,232,0.1)" },
  "LINKEDIN": { icon: "Linkedin", color: "#0a66c2", bg: "rgba(10,102,194,0.12)" },
  "WHATSAPP": { icon: "MessageCircle", color: "#128c4a", bg: "rgba(0,209,0,0.14)" },
  "TAREFA": { icon: "ClipboardList", color: "var(--neutral-700)", bg: "var(--neutral-100)" },
  "automação": { icon: "Cog", color: "var(--bm-purple)", bg: "rgba(123,0,220,0.1)" },
};

export function ChannelBadge({ channel }: { channel: Channel }) {
  const m = meta[channel];
  return (
    <span className="chip" style={{ background: m.bg, color: m.color }}>
      <Icon name={m.icon} size={13} />
      <span className="uppercase tracking-eyebrow text-[11px]">[{channel}]</span>
    </span>
  );
}

export { meta as channelMeta };
