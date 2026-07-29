import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Config-driven front end. O cálculo é 100% client-side (ver src/config/roi-model.ts).
// A rota da calculadora vive em "/" neste projeto dedicado. Ao integrar ao repo
// mãe (Vazamentoo-ROI), montar sob "/roi" ou "/business-case".
export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
});
