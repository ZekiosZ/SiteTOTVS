import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Wand2, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/transcricoes")({
  head: () => ({
    meta: [
      { title: "Transcrições · Client Cards AI" },
      { name: "description", content: "Cole uma transcrição e gere o card do cliente." },
    ],
  }),
  component: TranscriptionPage,
});

function TranscriptionPage() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [text, setText] = useState("");

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-3xl font-semibold tracking-tight">Nova transcrição</h1>
        <p className="text-sm text-muted-foreground">
          Cole o conteúdo da reunião. A IA irá extrair as informações essenciais e gerar o card do cliente.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Form */}
        <div className="lg:col-span-3 space-y-5 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome do cliente</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex.: Mariana Costa" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="company">Empresa / projeto</Label>
              <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Ex.: Nova Health" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="transcript">Transcrição da reunião</Label>
            <Textarea
              id="transcript"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={14}
              placeholder="Cole aqui a transcrição completa da sua reunião..."
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              {text.length.toLocaleString("pt-BR")} caracteres · sem limite recomendado
            </p>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-border bg-accent/40 p-3.5 text-sm text-accent-foreground">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0" />
            <p>
              A IA identifica automaticamente <strong>necessidades</strong>, <strong>dores</strong>,{" "}
              <strong>objetivos</strong> e <strong>próximos passos</strong> a partir da transcrição.
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="ghost">Limpar</Button>
            <Button className="gap-2">
              <Wand2 className="h-4 w-4" />
              Gerar card do cliente
            </Button>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Preview do card
          </p>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display text-base font-semibold">
                  {name || "Nome do cliente"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {company || "Empresa / projeto"}
                </p>
              </div>
              <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">
                Novo
              </span>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              {text
                ? text.slice(0, 140) + (text.length > 140 ? "..." : "")
                : "O resumo gerado pela IA aparecerá aqui assim que você colar a transcrição."}
            </p>

            <div className="mt-4 space-y-2 text-sm">
              <PreviewRow label="Necessidades" placeholder="Identificadas automaticamente" />
              <PreviewRow label="Dores" placeholder="Identificadas automaticamente" />
              <PreviewRow label="Próximo passo" placeholder="Sugerido pela IA" />
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              <Badge variant="secondary" className="rounded-full">Follow-up</Badge>
              <Badge variant="secondary" className="rounded-full">Venda</Badge>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                Hoje
              </div>
              <Button size="sm" variant="ghost" className="gap-1">
                Ver detalhes <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewRow({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div className="flex gap-2">
      <span className="w-24 shrink-0 text-xs uppercase tracking-wide text-muted-foreground/80">{label}</span>
      <span className="line-clamp-1 flex-1 text-sm text-muted-foreground">{placeholder}</span>
    </div>
  );
}
