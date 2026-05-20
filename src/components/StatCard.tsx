import { type LucideIcon } from "lucide-react";

interface Props {
  label: string;
  value: number | string;
  hint?: string;
  icon: LucideIcon;
  accent?: "primary" | "success" | "warning" | "muted";
}

const accentMap = {
  primary: "bg-primary/10 text-primary",
  success: "bg-success/15 text-success",
  warning: "bg-warning/20 text-warning-foreground",
  muted: "bg-muted text-muted-foreground",
};

export function StatCard({ label, value, hint, icon: Icon, accent = "primary" }: Props) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-2 font-display text-3xl font-semibold tracking-tight">
            {value}
          </p>
          {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${accentMap[accent]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
