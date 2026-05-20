import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckSquare, Square } from "lucide-react";
import { mockClients, tagStyles } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/tarefas")({
  head: () => ({
    meta: [
      { title: "Tarefas · Client Cards AI" },
      { name: "description", content: "Próximas ações pendentes em todos os clientes." },
    ],
  }),
  component: TasksPage,
});

function TasksPage() {
  const tasks = mockClients.flatMap((c) =>
    c.nextSteps.map((step, i) => ({
      id: `${c.id}-${i}`,
      step,
      client: c,
    })),
  );

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      <h1 className="font-display text-3xl font-semibold tracking-tight">Tarefas</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {tasks.length} próximas ações em aberto.
      </p>

      <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
        {tasks.map((t) => (
          <div key={t.id} className="group flex items-start gap-3 px-5 py-4 transition-colors hover:bg-muted/40">
            <button className="mt-0.5 text-muted-foreground hover:text-primary">
              <Square className="h-4 w-4 group-hover:hidden" />
              <CheckSquare className="hidden h-4 w-4 group-hover:block" />
            </button>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-foreground">{t.step}</p>
              <Link
                to="/clientes/$clientId"
                params={{ clientId: t.client.id }}
                className="mt-1 inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary"
              >
                {t.client.name} · {t.client.company}
              </Link>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {t.client.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary" className={cn("rounded-full border-0 text-xs", tagStyles[tag])}>
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
