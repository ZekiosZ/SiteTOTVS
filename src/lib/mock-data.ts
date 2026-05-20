export type ClientStatus = "Novo" | "Em andamento" | "Prioritário" | "Concluído";

export type ClientTag =
  | "Urgente"
  | "Financeiro"
  | "Suporte"
  | "Venda"
  | "Contrato"
  | "Follow-up";

export interface Meeting {
  id: string;
  date: string;
  title: string;
  summary: string;
}

export interface Client {
  id: string;
  name: string;
  company: string;
  status: ClientStatus;
  summary: string;
  needs: string[];
  pains: string[];
  goals: string[];
  nextSteps: string[];
  lastMeeting: string;
  tags: ClientTag[];
  notes: string;
  meetings: Meeting[];
}

export const mockClients: Client[] = [
  {
    id: "1",
    name: "Mariana Costa",
    company: "Nova Health",
    status: "Prioritário",
    summary:
      "Diretora de operações buscando solução para reduzir o tempo de onboarding de pacientes em 40%.",
    needs: [
      "Reduzir tempo de onboarding",
      "Integração com prontuário eletrônico",
      "Relatórios automáticos para a diretoria",
    ],
    pains: [
      "Processo manual demorado entre setores",
      "Falta de visibilidade do funil de pacientes",
    ],
    goals: ["Escalar atendimentos sem aumentar equipe", "Padronizar fluxos clínicos"],
    nextSteps: [
      "Enviar proposta comercial até sexta-feira",
      "Agendar demo técnica com TI",
    ],
    lastMeeting: "2026-05-18",
    tags: ["Urgente", "Venda"],
    notes: "Decisora final é a CEO. Sensibilidade a prazo de implementação.",
    meetings: [
      {
        id: "m1",
        date: "2026-05-18",
        title: "Discovery comercial",
        summary: "Apresentação do problema, mapeamento de stakeholders e budget.",
      },
      {
        id: "m2",
        date: "2026-05-05",
        title: "Primeiro contato",
        summary: "Indicação por parceiro. Interesse em automação clínica.",
      },
    ],
  },
  {
    id: "2",
    name: "Rafael Lima",
    company: "Atlas Logística",
    status: "Em andamento",
    summary:
      "CFO avaliando ferramentas para consolidação financeira multi-filial e previsibilidade de caixa.",
    needs: ["Consolidação multi-filial", "Forecast de caixa", "Auditoria mensal"],
    pains: ["Planilhas desencontradas", "Atraso no fechamento mensal"],
    goals: ["Fechamento em até 5 dias úteis", "Dashboard executivo único"],
    nextSteps: ["Revisar contrato com jurídico", "Definir piloto de 30 dias"],
    lastMeeting: "2026-05-15",
    tags: ["Financeiro", "Contrato"],
    notes: "Time financeiro com 12 pessoas. Resistência inicial à mudança.",
    meetings: [
      {
        id: "m1",
        date: "2026-05-15",
        title: "Alinhamento de escopo",
        summary: "Definição de KPIs e prazos. Aprovação preliminar do diretor.",
      },
    ],
  },
  {
    id: "3",
    name: "Júlia Andrade",
    company: "Verde Studio",
    status: "Novo",
    summary:
      "Fundadora de estúdio criativo explorando organização de clientes e cobrança recorrente.",
    needs: ["CRM leve", "Cobrança recorrente", "Portal do cliente"],
    pains: ["Esquecimento de follow-ups", "Cobrança manual"],
    goals: ["Profissionalizar operação", "Crescer 2x em 12 meses"],
    nextSteps: ["Enviar materiais educativos", "Marcar segunda conversa"],
    lastMeeting: "2026-05-19",
    tags: ["Follow-up", "Venda"],
    notes: "Sensível a preço. Vale apresentar plano starter.",
    meetings: [
      {
        id: "m1",
        date: "2026-05-19",
        title: "Primeira reunião",
        summary: "Apresentação geral da plataforma e levantamento de dores.",
      },
    ],
  },
  {
    id: "4",
    name: "Pedro Henrique",
    company: "Forja Tech",
    status: "Em andamento",
    summary:
      "Head de suporte buscando reduzir tickets repetidos e melhorar SLA com base de conhecimento.",
    needs: ["Base de conhecimento", "Automação de respostas", "Métricas de SLA"],
    pains: ["Volume crescente de tickets", "Equipe sobrecarregada"],
    goals: ["Reduzir tickets em 30%", "SLA abaixo de 4h"],
    nextSteps: ["Workshop de configuração", "Validar integração com Slack"],
    lastMeeting: "2026-05-12",
    tags: ["Suporte"],
    notes: "Possível upsell em 3 meses para módulo de IA.",
    meetings: [
      {
        id: "m1",
        date: "2026-05-12",
        title: "Kick-off técnico",
        summary: "Apresentação da arquitetura e plano de implantação em fases.",
      },
    ],
  },
  {
    id: "5",
    name: "Camila Souza",
    company: "Brisa Imóveis",
    status: "Concluído",
    summary:
      "Implantação concluída com sucesso. Cliente satisfeito, em fase de adoção e expansão.",
    needs: ["Treinamento contínuo", "Suporte premium"],
    pains: ["Adoção entre corretores antigos"],
    goals: ["Expansão para 3 novas filiais"],
    nextSteps: ["Revisão trimestral em junho"],
    lastMeeting: "2026-05-02",
    tags: ["Follow-up"],
    notes: "Case potencial para estudo público.",
    meetings: [
      {
        id: "m1",
        date: "2026-05-02",
        title: "Encerramento de implantação",
        summary: "Validação de marcos, NPS 9, alinhamento de próximos passos.",
      },
    ],
  },
  {
    id: "6",
    name: "Bruno Tavares",
    company: "Polo Energia",
    status: "Prioritário",
    summary:
      "Diretor técnico avaliando substituição de sistema legado. Decisão prevista para o próximo mês.",
    needs: ["Migração de dados", "Compliance regulatório", "API aberta"],
    pains: ["Sistema legado instável", "Custo de manutenção alto"],
    goals: ["Substituir legado em 90 dias"],
    nextSteps: ["Enviar arquitetura de migração", "Reunião com compliance"],
    lastMeeting: "2026-05-17",
    tags: ["Urgente", "Contrato"],
    notes: "Concorrência direta na proposta. Diferencial está no suporte.",
    meetings: [
      {
        id: "m1",
        date: "2026-05-17",
        title: "Avaliação técnica",
        summary: "Comparativo com concorrentes, dúvidas sobre SLA e segurança.",
      },
    ],
  },
];

export const stats = {
  total: mockClients.length,
  active: mockClients.filter((c) => c.status !== "Concluído").length,
  meetings: mockClients.reduce((acc, c) => acc + c.meetings.length, 0),
  pending: mockClients.reduce((acc, c) => acc + c.nextSteps.length, 0),
};

export const statusStyles: Record<ClientStatus, string> = {
  Novo: "bg-accent text-accent-foreground",
  "Em andamento": "bg-warning/15 text-warning-foreground border border-warning/30",
  Prioritário: "bg-destructive/10 text-destructive border border-destructive/20",
  Concluído: "bg-success/15 text-success-foreground border border-success/30",
};

export const tagStyles: Record<ClientTag, string> = {
  Urgente: "bg-destructive/10 text-destructive",
  Financeiro: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  Suporte: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
  Venda: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
  Contrato: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  "Follow-up": "bg-muted text-muted-foreground",
};
