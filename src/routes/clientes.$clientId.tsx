import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar, FileText, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockClients, statusStyles, tagStyles } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/clientes/$clientId")({
  head: ({ params }) => {
    const c = mockClients.find((x) => x.id === params.clientId);
    return {
      meta: [
        { title: c ? `${c.name} · Client Cards AI` : "Cliente · Client Cards AI" },
        { name: "description", content: c?.summary ?? "Detalhes do cliente" },
      ],
    };
  },
  component: ClientDetail,
  notFoundComponent: () => (
    <div className="p-10 text-center">
      <p>Cliente não encontrado.</p>
      <Link to="/clientes" className="text-primary underline">Voltar</Link>
    </div>
  ),
});

function ClientDetail() {
  const { clientId } = Route.useParams();
  const client = mockClients.find((c) => c.id === clientId);
  if (!client) throw notFound();

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10">
      <Link
        to="/clientes"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar para clientes
      </Link>

      {/* Header */}
      <div className="mt-4 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 font-display text-lg font-semibold text-primary">
              {client.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
            </div>
            <div>
              <h1 className="font-display text-2xl font-semibold tracking-tight">{client.name}</h1>
              <p className="text-sm text-muted-foreground">{client.company}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", statusStyles[client.status])}>
                  {client.status}
                </span>
                {client.tags.map((t) => (
                  <Badge key={t} variant="secondary" className={cn("rounded-full border-0 px-2.5 py-0.5 text-xs", tagStyles[t])}>
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="gap-2">
              <Sparkles className="h-4 w-4" />
              Gerar novo resumo
            </Button>
            <Button asChild className="gap-2">
              <Link to="/transcricoes">
                <Plus className="h-4 w-4" />
                Adicionar transcrição
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Section title="Resumo do cliente">
            <p className="text-sm leading-relaxed text-muted-foreground">{client.summary}</p>
          </Section>
          <Section title="Necessidades identificadas">
            <BulletList items={client.needs} />
          </Section>
          <Section title="Principais dores">
            <BulletList items={client.pains} tone="destructive" />
          </Section>
          <Section title="Objetivos do cliente">
            <BulletList items={client.goals} tone="primary" />
          </Section>
          <Section title="Próximas ações">
            <ul className="space-y-2">
              {client.nextSteps.map((step) => (
                <li key={step} className="flex items-start gap-3 rounded-xl border border-border bg-background p-3 text-sm">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  {step}
                </li>
              ))}
            </ul>
          </Section>
        </div>

        <div className="space-y-6">
          <Section title="Histórico de reuniões">
            <ul className="space-y-3">
              {client.meetings.map((m) => (
                <li key={m.id} className="rounded-xl border border-border bg-background p-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(m.date).toLocaleDateString("pt-BR")}
                  </div>
                  <p className="mt-1 text-sm font-medium">{m.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{m.summary}</p>
                </li>
              ))}
            </ul>
          </Section>
          <Section title="Observações internas" icon={FileText}>
            <p className="text-sm leading-relaxed text-muted-foreground">{client.notes}</p>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
  icon: Icon,
}: {
  title: string;
  children: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
      <div className="mb-3 flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
        <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

function BulletList({ items, tone = "muted" }: { items: string[]; tone?: "muted" | "primary" | "destructive" }) {
  const dot = {
    muted: "bg-muted-foreground/40",
    primary: "bg-primary",
    destructive: "bg-destructive",
  }[tone];
  return (
    <ul className="space-y-2">
      {items.map((i) => (
        <li key={i} className="flex items-start gap-3 text-sm">
          <span className={cn("mt-2 h-1.5 w-1.5 shrink-0 rounded-full", dot)} />
          <span className="text-foreground/90">{i}</span>
        </li>
      ))}
    </ul>
  );
}
