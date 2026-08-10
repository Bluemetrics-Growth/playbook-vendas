"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
  size?: "sm" | "md";
}

export function CopyButton({ text, label = "Copiar", className = "", size = "sm" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard indisponivel (contexto sem https); ignora silenciosamente
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`btn ${size === "sm" ? "btn-sm" : ""} btn-tertiary ${className}`}
      aria-label={copied ? "Copiado" : label}
    >
      {copied ? <Check size={15} /> : <Copy size={15} />}
      <span>{copied ? "Copiado" : label}</span>
    </button>
  );
}
