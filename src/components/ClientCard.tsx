import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Calendar, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type Client, statusStyles, tagStyles } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });
}

export function ClientCard({ client }: { client: Client }) {
  return (
    <div className="group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-display text-base font-semibold text-foreground">
            {client.name}
          </h3>
          <p className="truncate text-sm text-muted-foreground">{client.company}</p>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-full px-2.5 py-1 text-xs font-medium",
            statusStyles[client.status],
          )}
        >
          {client.status}
        </span>
      </div>

      <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {client.summary}
      </p>

      <div className="mt-4 space-y-2.5 text-sm">
        <Row label="Necessidades" value={client.needs[0]} />
        <Row label="Dores" value={client.pains[0]} />
        <Row label="Próximo passo" value={client.nextSteps[0]} />
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {client.tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className={cn("rounded-full border-0 px-2.5 py-0.5 text-xs font-medium", tagStyles[tag])}
          >
            {tag}
          </Badge>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          {formatDate(client.lastMeeting)}
        </div>
        <div className="flex gap-1.5">
          <Button variant="ghost" size="sm" className="h-8 gap-1">
            <Pencil className="h-3.5 w-3.5" />
            Editar
          </Button>
          <Button asChild size="sm" className="h-8 gap-1">
            <Link to="/clientes/$clientId" params={{ clientId: client.id }}>
              Ver detalhes
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <span className="w-24 shrink-0 text-xs uppercase tracking-wide text-muted-foreground/80">
        {label}
      </span>
      <span className="line-clamp-1 flex-1 text-sm text-foreground">{value}</span>
    </div>
  );
}
