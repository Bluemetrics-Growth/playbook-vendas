import { createElement } from "react";
import type { PdfProps } from "./BusinessCasePdf";

// Gera o PDF client-side e dispara o download imediato (Secao 3 / 7).
// O @react-pdf/renderer e o documento sao carregados sob demanda (dynamic
// import), para nao pesar no carregamento inicial da calculadora.
export async function baixarBusinessCasePdf(props: PdfProps): Promise<void> {
  const [{ pdf }, { BusinessCasePdf }] = await Promise.all([
    import("@react-pdf/renderer"),
    import("./BusinessCasePdf"),
  ]);

  // cast: BusinessCasePdf retorna um <Document>, mas seus props sao PdfProps.
  const blob = await pdf(createElement(BusinessCasePdf, props) as any).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const empresa =
    props.empresa.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-") || "operacao";
  a.href = url;
  a.download = `business-case-bluedocs-${empresa}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
