export type Step = "hero" | "premissas" | "gate" | "resultado";

const ORDER: { id: Step; label: string }[] = [
  { id: "hero", label: "Vertical" },
  { id: "premissas", label: "Premissas" },
  { id: "gate", label: "Cadastro" },
  { id: "resultado", label: "Business case" },
];

export function Stepper({ current }: { current: Step }) {
  const idx = ORDER.findIndex((s) => s.id === current);
  return (
    <div className="stepper" aria-label="Progresso">
      {ORDER.map((s, i) => (
        <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            className={
              "stepper__item" +
              (i === idx ? " is-active" : "") +
              (i < idx ? " is-done" : "")
            }
          >
            <span className="stepper__dot">{i < idx ? "✓" : i + 1}</span>
            <span>{s.label}</span>
          </div>
          {i < ORDER.length - 1 && <span className="stepper__bar" />}
        </div>
      ))}
    </div>
  );
}
