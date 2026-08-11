import { Config } from "@remotion/cli/config";

// Reaproveita os assets da marca do app (../public/brand, ../public/fonts)
// em vez de duplicá-los dentro de remotion/public.
Config.setPublicDir("../public");

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setConcurrency(4);
// H.264 com qualidade boa e arquivo enxuto (vídeos vão pro repo/public).
Config.setCodec("h264");
Config.setCrf(23);
