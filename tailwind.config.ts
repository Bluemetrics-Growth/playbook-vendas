import type { Config } from "tailwindcss";

/**
 * Tailwind is wired to the BlueMetrics design tokens (styles/tokens.css).
 * Every value below resolves to a CSS custom property, so the design system
 * stays the single source of truth. Never hardcode raw hex in components.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx,mdx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-soft": "var(--bg-soft)",
        "bg-stage": "var(--bg-stage)",
        "bg-dark": "var(--bg-dark)",
        surface: "var(--neutral-0)",
        "surface-elevated": "var(--neutral-50)",
        fg: "var(--fg-1)",
        "fg-muted": "var(--fg-2)",
        "fg-hint": "var(--fg-3)",
        "fg-on-dark": "var(--fg-on-dark)",
        "fg-on-dark-2": "var(--fg-on-dark-2)",
        border: "var(--border)",
        "border-strong": "var(--border-strong)",
        primary: "var(--bm-blue)",
        "primary-hover": "var(--link-hover)",
        "primary-deep": "var(--bm-deep-blue)",
        "primary-soft": "var(--accent-soft)",
        accent: "var(--bm-cyan)",
        success: "var(--success)",
        warning: "var(--warning)",
        danger: "var(--danger)",
        // Brand support palette
        "bm-mint": "var(--bm-mint)",
        "bm-cyan": "var(--bm-cyan)",
        "bm-green": "var(--bm-green)",
        "bm-yellow": "var(--bm-yellow)",
        "bm-purple": "var(--bm-purple)",
        "bm-magenta": "var(--bm-magenta)",
        "bm-orange": "var(--bm-orange)",
        "bm-black": "var(--bm-black)",
        // Score bands
        "band-nurture": "var(--band-nurture)",
        "band-warm": "var(--band-warm)",
        "band-attention": "var(--band-attention)",
        "band-trigger": "var(--band-trigger)",
      },
      fontFamily: {
        display: "var(--font-display)",
        body: "var(--font-body)",
        mono: "var(--font-mono)",
      },
      fontSize: {
        "display-xl": "var(--fs-display-xl)",
        "display-l": "var(--fs-display-l)",
        "display-m": "var(--fs-display-m)",
        h1: "var(--fs-h1)",
        h2: "var(--fs-h2)",
        h3: "var(--fs-h3)",
        h4: "var(--fs-h4)",
        body: "var(--fs-body)",
        "body-sm": "var(--fs-body-sm)",
        eyebrow: "var(--fs-eyebrow)",
      },
      spacing: {
        1: "var(--space-1)",
        2: "var(--space-2)",
        3: "var(--space-3)",
        4: "var(--space-4)",
        5: "var(--space-5)",
        6: "var(--space-6)",
        7: "var(--space-7)",
        8: "var(--space-8)",
        9: "var(--space-9)",
        10: "var(--space-10)",
      },
      borderRadius: {
        xs: "var(--radius-xs)",
        s: "var(--radius-s)",
        sm: "var(--radius-s)",
        m: "var(--radius-m)",
        md: "var(--radius-m)",
        l: "var(--radius-l)",
        lg: "var(--radius-l)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        pill: "var(--radius-pill)",
      },
      boxShadow: {
        1: "var(--shadow-1)",
        2: "var(--shadow-2)",
        3: "var(--shadow-3)",
        blue: "var(--shadow-blue)",
      },
      maxWidth: {
        narrow: "var(--container-narrow)",
        text: "var(--container-text)",
        wide: "var(--container-wide)",
        full: "var(--container-full)",
      },
      transitionTimingFunction: {
        standard: "var(--ease-standard)",
        out: "var(--ease-out)",
        "in-out": "var(--ease-in-out)",
      },
      letterSpacing: {
        tight: "var(--ls-tight)",
        snug: "var(--ls-snug)",
        eyebrow: "var(--ls-eyebrow)",
      },
    },
  },
  plugins: [],
};

export default config;
