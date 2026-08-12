import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CommandPalette } from "@/components/shell/CommandPalette";
import { Providers } from "@/components/shell/Providers";

export const metadata: Metadata = {
  title: {
    default: "Playbook ABM · bluemetrics",
    template: "%s · Playbook ABM bluemetrics",
  },
  description:
    "Playbook de ABM da BlueMetrics. Treine e consulte o modelo: dois tiers, dois scores, esteiras de cadência e medição por conta.",
  icons: {
    icon: "/brand/logo-blue-symbol.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#06060a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>
          {children}
          <CommandPalette />
        </Providers>
      </body>
    </html>
  );
}
