import { staticFile, delayRender, continueRender } from "remotion";

// Carrega as fontes da marca (Outfit display, Wix Madefor body) antes de renderizar.
const handle = delayRender("loading-fonts");

const faces = [
  new FontFace("Outfit", `url(${staticFile("fonts/Outfit-700.ttf")})`, { weight: "700" }),
  new FontFace("Outfit", `url(${staticFile("fonts/Outfit-600.ttf")})`, { weight: "600" }),
  new FontFace("Outfit", `url(${staticFile("fonts/Outfit-500.ttf")})`, { weight: "500" }),
  new FontFace("Wix Madefor Text", `url(${staticFile("fonts/Wix_Madefor_Text-Regular.ttf")})`, { weight: "400" }),
  new FontFace("Wix Madefor Text", `url(${staticFile("fonts/Wix_Madefor_Text-600.ttf")})`, { weight: "600" }),
];

Promise.all(faces.map((f) => f.load()))
  .then((loaded) => {
    loaded.forEach((f) => document.fonts.add(f));
    continueRender(handle);
  })
  .catch((err) => {
    console.error("font load error", err);
    continueRender(handle);
  });

export const fontDisplay = "Outfit, sans-serif";
export const fontBody = "'Wix Madefor Text', sans-serif";
