import { icons, type LucideProps } from "lucide-react";

type IconName = keyof typeof icons;

interface IconProps extends LucideProps {
  name: string;
}

/**
 * Renderiza um icone lucide-react pelo nome (string vinda do conteudo tipado).
 * Fallback para Circle quando o nome nao existe.
 */
export function Icon({ name, ...props }: IconProps) {
  const Cmp = (icons as Record<string, React.ComponentType<LucideProps>>)[name] ?? icons.Circle;
  return <Cmp aria-hidden {...props} />;
}

export type { IconName };
