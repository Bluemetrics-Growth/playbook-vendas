import { EstadoCalculo, FatoresCenario, comporPremissas } from "../config/roi-model";
import { inteiro, moeda, umaCasa } from "../lib/format";

// Tabela "Hoje vs Com BlueDocs" (Secao 4 / 5). Linhas operacionais, sempre
// visiveis (fazem parte da parte ungated). Os numeros premio (valor
// recuperavel, ROI, payback) ficam em bloco separado e gateado.
export function ComparisonTable({
  estado,
  fatores,
}: {
  estado: EstadoCalculo;
  fatores: FatoresCenario;
}) {
  const { premissas } = comporPremissas(estado.entradas, fatores);

  const horasHoje = premissas.docsMes * premissas.horasPorDoc;
  const horasCom = horasHoje * (1 - premissas.reducaoTempoIa);

  const erroHoje = premissas.docsMes * premissas.taxaErro * premissas.custoErro;
  const erroCom = erroHoje * (1 - premissas.reducaoErro);

  const custoHojeMensal = horasHoje * premissas.custoHora;

  const rows: { label: string; hoje: string; bd: string }[] = [
    {
      label: "Tempo de análise (horas/mês)",
      hoje: `${inteiro(horasHoje)} h`,
      bd: `${inteiro(horasCom)} h`,
    },
    {
      label: "Custo mensal da análise manual",
      hoje: moeda(custoHojeMensal),
      bd: moeda(custoHojeMensal * (1 - premissas.reducaoTempoIa)),
    },
    {
      label: "Erros e retrabalho (mês)",
      hoje: moeda(erroHoje),
      bd: moeda(erroCom),
    },
    {
      label: "Velocidade de decisão",
      hoje: "Dias",
      bd: "Horas",
    },
  ];

  if (premissas.d3Ligado) {
    rows.push({
      label: "Cobertura de editais (mês)",
      hoje: "0 extras",
      bd: `+${umaCasa(premissas.editaisExtraMes)} editais`,
    });
  }

  return (
    <table className="cmp">
      <thead>
        <tr>
          <th />
          <th>Hoje (manual)</th>
          <th>Com BlueDocs</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.label}>
            <td>{r.label}</td>
            <td className="cmp__hoje">{r.hoje}</td>
            <td className="cmp__bd">{r.bd}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
