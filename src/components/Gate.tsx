import { useState } from "react";
import { LeadForm } from "../lib/lead";

// Tela 3 (Secao 4 / 3): gate minimo com Nome, Email corporativo, Empresa.
export function Gate({
  onSubmit,
  onVoltar,
  enviando,
}: {
  onSubmit: (form: LeadForm) => void;
  onVoltar: () => void;
  enviando: boolean;
}) {
  const [form, setForm] = useState<LeadForm>({ nome: "", email: "", empresa: "" });
  const [erros, setErros] = useState<Partial<Record<keyof LeadForm, string>>>({});

  function set<K extends keyof LeadForm>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
    setErros((e) => ({ ...e, [k]: undefined }));
  }

  function validar(): boolean {
    const e: Partial<Record<keyof LeadForm, string>> = {};
    if (!form.nome.trim()) e.nome = "Informe seu nome.";
    if (!form.empresa.trim()) e.empresa = "Informe a empresa.";
    const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email);
    if (!emailOk) e.email = "Use um e-mail corporativo válido.";
    else if (/@(gmail|hotmail|outlook|yahoo|live|icloud)\./i.test(form.email))
      e.email = "Prefira o e-mail corporativo.";
    setErros(e);
    return Object.keys(e).length === 0;
  }

  function submit(ev: React.FormEvent) {
    ev.preventDefault();
    if (validar()) onSubmit(form);
  }

  return (
    <section className="section">
      <div className="bm-container">
        <button className="back-link" onClick={onVoltar}>
          ‹ Voltar às premissas
        </button>
        <form className="gate" onSubmit={submit}>
          <h3 className="gate__title">Seu business case está pronto. Para onde enviamos?</h3>
          <p className="gate__sub">
            Liberamos o valor recuperável, o ROI 12 e 24 meses, o payback e o PDF para a
            diretoria.
          </p>

          <Field
            label="NOME"
            value={form.nome}
            erro={erros.nome}
            placeholder="Seu nome"
            onChange={(v) => set("nome", v)}
          />
          <Field
            label="EMAIL CORPORATIVO"
            type="email"
            value={form.email}
            erro={erros.email}
            placeholder="voce@empresa.com.br"
            onChange={(v) => set("email", v)}
          />
          <Field
            label="EMPRESA"
            value={form.empresa}
            erro={erros.empresa}
            placeholder="Sua empresa"
            onChange={(v) => set("empresa", v)}
          />

          <button
            type="submit"
            className="bm-btn bm-btn--primary bm-btn--lg bm-btn--block mt-8"
            disabled={enviando}
          >
            {enviando ? "Gerando..." : "Ver o ROI completo"}
          </button>

          <div className="gate__proof">
            <span className="chip chip-gray">AWS Advanced Partner</span>
            <span className="chip chip-gray">Anthropic Partner</span>
          </div>
          <p className="gate__foot">Seus dados estão protegidos. Sem spam, nunca.</p>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  erro,
  placeholder,
  type = "text",
  onChange,
}: {
  label: string;
  value: string;
  erro?: string;
  placeholder?: string;
  type?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="field">
      <label className="field__label">{label}</label>
      <input
        type={type}
        className={erro ? "is-error" : ""}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {erro && <span className="field__err">{erro}</span>}
    </div>
  );
}
