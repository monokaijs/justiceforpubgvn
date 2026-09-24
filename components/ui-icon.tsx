import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, X } from "lucide-react";
import type { ReactNode } from "react";

const icons = {
  down: ArrowDown,
  left: ArrowLeft,
  right: ArrowRight,
  external: ArrowUpRight,
  check: Check,
  close: X,
} as const;

export function UiIcon({ name, className = "" }: { name: keyof typeof icons; className?: string }) {
  const Icon = icons[name];
  return <Icon className={`ui-icon ${className}`.trim()} aria-hidden="true" />;
}

const textIcons = { "↓": "down", "←": "left", "→": "right", "↗": "external" } as const;

export function renderIconText(value: string): ReactNode {
  return value.split(/([↓←→↗])/g).map((part, index) => {
    const name = textIcons[part as keyof typeof textIcons];
    return name ? <UiIcon name={name} key={index} /> : part;
  });
}
