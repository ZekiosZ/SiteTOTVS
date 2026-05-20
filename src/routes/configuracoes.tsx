import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/configuracoes")({
  head: () => ({
    meta: [
      { title: "Configurações · Client Cards AI" },
      { name: "description", content: "Preferências da workspace e da IA." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-10">
      <h1 className="font-display text-3xl font-semibold tracking-tight">Configurações</h1>
      <p className="mt-1 text-sm text-muted-foreground">Personalize sua workspace.</p>

      <div className="mt-8 space-y-6">
        <Card title="Perfil">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Nome" defaultValue="Lucas Vieira" />
            <Field label="Email" defaultValue="lucas@acme.studio" />
            <Field label="Workspace" defaultValue="Acme Studio" />
            <Field label="Idioma" defaultValue="Português (BR)" />
          </div>
        </Card>

        <Card title="IA & automações">
          <Toggle
            label="Gerar resumos automáticos"
            description="Cria resumo a cada nova transcrição importada."
            defaultChecked
          />
          <Toggle
            label="Sugerir próximos passos"
            description="A IA propõe ações para cada cliente."
            defaultChecked
          />
          <Toggle
            label="Identificar dores e necessidades"
            description="Extrai automaticamente dos textos das reuniões."
            defaultChecked
          />
        </Card>

        <Card title="Notificações">
          <Toggle label="Lembretes de follow-up" description="Receba lembretes 24h antes." defaultChecked />
          <Toggle label="Resumo semanal por email" description="Toda segunda às 8h." />
        </Card>

        <div className="flex justify-end">
          <Button>Salvar alterações</Button>
        </div>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <h2 className="font-display text-base font-semibold">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, defaultValue }: { label: string; defaultValue?: string }) {
  return (
    <div className="grid gap-1.5">
      <Label>{label}</Label>
      <Input defaultValue={defaultValue} />
    </div>
  );
}

function Toggle({ label, description, defaultChecked }: { label: string; description: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-border bg-background p-3">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}
