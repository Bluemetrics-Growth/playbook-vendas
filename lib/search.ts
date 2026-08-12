import type { SearchItem } from "@/content/types";
import { abmSections } from "@/content/abm/sections";
import { workflows } from "@/content/abm/workflows";
import { glossary } from "@/content/abm/glossary";
import { properties } from "@/content/abm/properties";
import { ifThenRules } from "@/content/abm/orchestration";

// Indice da busca ⌘K. Indexa seções, workflows, tasks, termos, propriedades e regras.
function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export function buildSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [];

  for (const s of abmSections) {
    items.push({
      id: `section-${s.slug}`,
      kind: "section",
      title: s.title,
      subtitle: s.short,
      href: s.href,
      keywords: slugify(`${s.title} ${s.short} ${s.group}`),
    });
  }

  for (const w of workflows) {
    items.push({
      id: `wf-${w.id}`,
      kind: "workflow",
      title: w.name,
      subtitle: `${w.tier}${w.band ? ` · Score ${w.band}` : ""} · ${w.owner}`,
      href: `/abm/esteiras/${w.id}`,
      keywords: slugify(`${w.id} ${w.name} ${w.tier} ${w.band ?? ""} ${w.owner} ${w.trigger} ${w.summary}`),
    });

    for (const t of w.tasks) {
      const b = t.brief;
      const briefText = b
        ? [b.objetivo, b.assunto, b.estrutura, b.perguntaGancho, b.comoAgir, b.personalizacao, ...(b.conteudo ?? []), ...(b.evite ?? [])]
            .filter(Boolean)
            .join(" ")
        : "";
      items.push({
        id: `task-${t.id}`,
        kind: "task",
        title: `${t.id} · ${t.action}`,
        subtitle: `${w.name} · ${t.day} · ${t.channel}`,
        href: `/abm/esteiras/${w.id}#${t.id}`,
        keywords: slugify(`${t.id} ${t.action} ${t.channel} ${t.day} ${w.id} ${w.name} ${t.script ?? ""} ${briefText}`),
      });
    }
  }

  for (const term of glossary) {
    items.push({
      id: `term-${slugify(term.term)}`,
      kind: "term",
      title: term.term,
      subtitle: term.definition,
      href: term.seeAlso ?? "/abm/glossario",
      keywords: slugify(`${term.term} ${term.definition}`),
    });
  }

  for (const p of properties) {
    items.push({
      id: `prop-${slugify(p.name)}`,
      kind: "property",
      title: p.name,
      subtitle: `${p.object} · ${p.usage}`,
      href: "/abm/hubspot",
      keywords: slugify(`${p.name} ${p.object} ${p.type} ${p.usage}`),
    });
  }

  for (const r of ifThenRules) {
    items.push({
      id: `rule-${r.id}`,
      kind: "rule",
      title: `${r.condition}`,
      subtitle: r.action,
      href: "/abm/orquestracao",
      keywords: slugify(`${r.tier} ${r.condition} ${r.action} ${r.sla ?? ""}`),
    });
  }

  return items;
}

export function searchItems(index: SearchItem[], query: string): SearchItem[] {
  const q = slugify(query.trim());
  if (!q) return index;
  const terms = q.split(/\s+/);
  return index
    .map((item) => {
      let score = 0;
      for (const t of terms) {
        if (item.keywords.includes(t)) score += 1;
        if (slugify(item.title).includes(t)) score += 2;
      }
      return { item, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.item);
}

export const kindLabel: Record<string, string> = {
  section: "Seção",
  workflow: "Workflow",
  task: "Task",
  term: "Termo",
  property: "Propriedade",
  rule: "Regra",
};
