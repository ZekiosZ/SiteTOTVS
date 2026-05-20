import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, Activity, FileText, CheckCircle2, Upload, ArrowRight, Search } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { ClientCard } from "@/components/ClientCard";
import { NewClientModal } from "@/components/NewClientModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockClients, stats } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard · Client Cards AI" },
      { name: "description", content: "Visão geral dos seus clientes e próximas ações." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const recent = mockClients.slice(0, 6);

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-10">
      {/* Hero */}
      <section className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-[var(--shadow-card)]">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            IA pronta para analisar reuniões
          </div>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Gestão Inteligente de Clientes
          </h1>
          <p className="mt-3 text-base text-muted-foreground md:text-lg">
            Transforme reuniões em cards organizados com informações essenciais sobre cada cliente.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline" className="gap-2">
            <Link to="/transcricoes">
              <Upload className="h-4 w-4" />
              Importar transcrição
            </Link>
          </Button>
          <NewClientModal />
        </div>
      </section>

      {/* Stats */}
      <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total de clientes" value={stats.total} icon={Users} accent="primary" />
        <StatCard label="Clientes ativos" value={stats.active} icon={Activity} accent="success" hint="Em andamento e prioritários" />
        <StatCard label="Reuniões analisadas" value={stats.meetings} icon={FileText} accent="muted" />
        <StatCard label="Ações pendentes" value={stats.pending} icon={CheckCircle2} accent="warning" />
      </section>

      {/* Recent clients */}
      <section className="mt-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-xl font-semibold tracking-tight">Clientes recentes</h2>
            <p className="text-sm text-muted-foreground">Atualizados a partir das últimas reuniões.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar cliente..." className="h-9 w-64 pl-9" />
            </div>
            <Button asChild variant="ghost" size="sm" className="gap-1">
              <Link to="/clientes">
                Ver todos <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {recent.map((c) => (
            <ClientCard key={c.id} client={c} />
          ))}
        </div>
      </section>
    </div>
  );
}
