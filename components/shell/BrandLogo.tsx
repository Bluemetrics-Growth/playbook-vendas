import Image from "next/image";
import Link from "next/link";

interface BrandLogoProps {
  variant?: "blue" | "white" | "black" | "deep-blue";
  withSignature?: boolean;
  href?: string;
  className?: string;
}

/**
 * Assinatura da marca: logo horizontal bluemetrics + "Playbook".
 * Wordmark sempre em lowercase (regra do design system).
 */
export function BrandLogo({
  variant = "blue",
  withSignature = true,
  href = "/",
  className = "",
}: BrandLogoProps) {
  const onDark = variant === "white";
  const content = (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Image
        src={`/brand/logo-${variant}-horizontal.png`}
        alt="bluemetrics"
        width={132}
        height={22}
        priority
        className="h-[22px] w-auto"
      />
      {withSignature ? (
        <span
          className="border-l pl-3 font-display text-[15px] font-medium tracking-tight"
          style={{
            borderColor: onDark ? "rgba(255,255,255,0.24)" : "var(--border-strong)",
            color: onDark ? "var(--fg-on-dark)" : "var(--fg-1)",
          }}
        >
          Playbook
        </span>
      ) : null}
    </span>
  );

  if (!href) return content;
  return (
    <Link href={href} aria-label="bluemetrics Playbook, ir para a home">
      {content}
    </Link>
  );
}
