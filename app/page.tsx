import { redirect } from "next/navigation";

// Não há hub nem catálogo: o Playbook é só o ABM. A raiz leva direto pra ele.
export default function HomePage() {
  redirect("/abm");
}
