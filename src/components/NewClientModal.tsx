import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Sparkles } from "lucide-react";

export function NewClientModal({ trigger }: { trigger?: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo cliente
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle className="font-display">Novo cliente</DialogTitle>
          <DialogDescription>
            Crie um card rapidamente. Você poderá enriquecer com transcrições depois.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" placeholder="Ex.: Mariana Costa" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="company">Empresa / projeto</Label>
            <Input id="company" placeholder="Ex.: Nova Health" />
          </div>
          <div className="grid gap-2">
            <Label>Status inicial</Label>
            <Select defaultValue="Novo">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Novo">Novo</SelectItem>
                <SelectItem value="Em andamento">Em andamento</SelectItem>
                <SelectItem value="Prioritário">Prioritário</SelectItem>
                <SelectItem value="Concluído">Concluído</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="notes">Observações iniciais</Label>
            <Textarea id="notes" placeholder="Contexto, indicação, expectativas..." rows={3} />
          </div>
          <div className="flex items-start gap-2 rounded-xl border border-border bg-accent/40 p-3 text-xs text-accent-foreground">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0" />
            Em seguida você pode colar uma transcrição e a IA preencherá automaticamente
            necessidades, dores e próximos passos.
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={() => setOpen(false)}>Criar card</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
