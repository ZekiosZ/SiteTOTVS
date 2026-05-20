import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, SlidersHorizontal, Users } from "lucide-react";
import { ClientCard } from "@/components/ClientCard";
import { NewClientModal } from "@/components/NewClientModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockClients, type ClientStatus } from "@/lib/mock-data";

export const Route = createFileRoute("/clientes")({
  head: () => ({
    meta: [
      { title: "Clientes · Client Cards AI" },
      { name: "description", content: "Lista completa de clientes em formato de cards." },
    ],
  }),
  component: ClientsPage,
});

const STATUSES: (ClientStatus | "Todos")[] = ["Todos", "Novo", "Em andamento", "Prioritário", "Concluído"];

function ClientsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<ClientStatus | "Todos">("Todos");
  const [sort, setSort] = useState<"recent" | "name">("recent");

  const clients = useMemo(() => {
    let list = mockClients.filter((c) => {
      const q = query.toLowerCase();
      const matchesQ =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q));
      const matchesS = status === "Todos" || c.status === status;
      return matchesQ && matchesS;
    });
    list = [...list].sort((a, b) =>
      sort === "name"
        ? a.name.localeCompare(b.name)
        : new Date(b.lastMeeting).getTime() - new Date(a.lastMeeting).getTime(),
    );
    return list;
  }, [query, status, sort]);

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Clientes</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {clients.length} {clients.length === 1 ? "cliente" : "clientes"} encontrados
          </p>
        </div>
        <NewClientModal />
      </div>

      <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-border bg-card p-3 shadow-[var(--shadow-card)] md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, empresa ou tag..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-10 border-0 pl-9 shadow-none focus-visible:ring-0"
          />
        </div>
        <div className="flex items-center gap-2">
          <Select value={status} onValueChange={(v) => setStatus(v as ClientStatus | "Todos")}>
            <SelectTrigger className="h-10 w-44">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={(v) => setSort(v as "recent" | "name")}>
            <SelectTrigger className="h-10 w-48">
              <SlidersHorizontal className="mr-1 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Reunião mais recente</SelectItem>
              <SelectItem value="name">Nome (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {clients.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {clients.map((c) => (
            <ClientCard key={c.id} client={c} />
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
        <Users className="h-6 w-6" />
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold">Nenhum cliente encontrado</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        Ajuste os filtros ou crie seu primeiro cliente. Você também pode importar uma transcrição
        para gerar um card automaticamente.
      </p>
      <div className="mt-5">
        <NewClientModal trigger={<Button>Criar primeiro cliente</Button>} />
      </div>
    </div>
  );
}
