import React from 'react';
import {
  Bell,
  Building2,
  CalendarClock,
  ChevronRight,
  CreditCard,
  Database,
  Download,
  FileText,
  Globe2,
  KeyRound,
  Link2,
  Lock,
  Mail,
  MapPin,
  MessageCircle,
  Package,
  Plug,
  ReceiptText,
  ShieldCheck,
  SlidersHorizontal,
  Store,
  Truck,
  UserCog,
  Users,
  Webhook,
} from 'lucide-react';
import { cardClass, pageInner, pageShell, Pill, SectionTitle } from '../components/ui/DashboardWidgets';

const inputClass = 'w-full rounded-xl border border-[#E5ECEA] bg-[#F7F7F4] px-3.5 py-2.5 text-sm font-bold text-[#082F35] outline-none transition focus:border-[#0F8F86] focus:ring-4 focus:ring-[#0F8F86]/10';
const labelClass = 'mb-1.5 block text-[11px] font-black uppercase tracking-wide text-[#64748B]';

export function SettingsView() {
  return (
    <div className={pageShell}>
      <div className={pageInner}>
        <section className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle title="Configurações" subtitle="Central para controlar restaurante, operação, canais, equipe, segurança e dados." />
          <div className="flex flex-wrap gap-2">
            <button className="rounded-xl border border-[#E5ECEA] bg-white px-4 py-2.5 text-sm font-bold text-[#64748B]">Cancelar</button>
            <button className="rounded-xl bg-[#053B3A] px-5 py-2.5 text-sm font-bold text-white shadow-[0_12px_24px_rgba(5,59,58,0.18)]">Salvar alterações</button>
          </div>
        </section>

        <section className="grid items-stretch gap-4 xl:grid-cols-[0.82fr_1.18fr]">
          <BusinessProfile />
          <OperationSettings />
        </section>

        <section className="grid items-stretch gap-4 xl:grid-cols-[1fr_1fr_0.9fr]">
          <IntegrationsHub />
          <TeamPermissions />
          <NotificationCenter />
        </section>

        <section className="grid items-stretch gap-4 xl:grid-cols-[0.95fr_1.05fr]">
          <AISettings />
          <BillingAndPlan />
        </section>

        <section className="grid items-stretch gap-4 xl:grid-cols-[0.9fr_1.1fr]">
          <SecurityAndPrivacy />
          <DataAndAudit />
        </section>
      </div>
    </div>
  );
}

function BusinessProfile() {
  return (
    <article className={`${cardClass} p-5`}>
      <Header icon={<Store />} title="Restaurante" action="Editar identidade" />
      <div className="mt-4 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E8F8F5] text-[#0F8F86]">
          <Building2 size={30} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#082F35]">Bella's Bistro</h3>
          <p className="text-sm font-semibold text-[#64748B]">Delivery · Cozinha italiana · João Pessoa</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Field label="Nome público" value="Bella's Bistro" />
        <Field label="CNPJ" value="12.345.678/0001-90" />
        <Field label="Telefone" value="+55 83 99999-9999" />
        <Field label="E-mail comercial" value="contato@bellasbistro.com.br" />
        <label className="sm:col-span-2">
          <span className={labelClass}>Endereço principal</span>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0F8F86]" size={17} />
            <input className={`${inputClass} pl-10`} defaultValue="Av. Epitácio Pessoa, 1200 · João Pessoa, PB" />
          </div>
        </label>
      </div>
    </article>
  );
}

function OperationSettings() {
  const periods = [
    ['Seg a Qui', '11:00 - 23:00', 'Aberto'],
    ['Sex e Sáb', '11:00 - 00:30', 'Pico alto'],
    ['Domingo', '12:00 - 22:30', 'Aberto'],
  ];

  return (
    <article className={`${cardClass} p-5`}>
      <Header icon={<Truck />} title="Operação e delivery" action="Ajustar SLA" />
      <div className="mt-4 grid gap-3 md:grid-cols-4">
        <MiniSetting icon={<CalendarClock />} label="Tempo de preparo" value="18-24 min" />
        <MiniSetting icon={<Truck />} label="Entrega padrão" value="35-45 min" />
        <MiniSetting icon={<Package />} label="Pedido mínimo" value="R$ 25,00" />
        <MiniSetting icon={<Globe2 />} label="Raio de entrega" value="6,5 km" />
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <h4 className="mb-3 text-sm font-bold text-[#082F35]">Horários de funcionamento</h4>
          <div className="space-y-2">
            {periods.map(([day, time, status]) => (
              <div key={day} className="grid grid-cols-[1fr_120px_90px] items-center rounded-xl border border-[#E5ECEA] bg-[#F7F7F4] px-3 py-2.5 text-sm">
                <b className="text-[#082F35]">{day}</b>
                <span className="font-semibold text-[#64748B]">{time}</span>
                <Pill tone={status === 'Pico alto' ? 'amber' : 'teal'}>{status}</Pill>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-bold text-[#082F35]">Regras operacionais</h4>
          <Toggle label="Pausar pedidos quando atraso passar de 20 min" checked />
          <Toggle label="Alertar estoque crítico no pico" checked />
          <Toggle label="Permitir retirada no balcão" checked />
          <Toggle label="Aceitar pedidos agendados" checked />
        </div>
      </div>
    </article>
  );
}

function IntegrationsHub() {
  const integrations = [
    ['WhatsApp Business', 'Conectado', '+55 83 99999-9999', <MessageCircle />, 'teal'],
    ['iFood', 'Conectado', 'Loja Centro sincronizada', <Store />, 'teal'],
    ['Google Business', 'Conectado', 'Avaliações e horário', <Globe2 />, 'teal'],
    ['Tiny ERP', 'Pendente', 'Produtos e notas fiscais', <Webhook />, 'amber'],
    ['Mercado Pago', 'Pendente', 'Pagamentos e chargebacks', <CreditCard />, 'amber'],
  ] as const;

  return (
    <article className={`${cardClass} p-5`}>
      <Header icon={<Plug />} title="Integrações" action="Adicionar" />
      <div className="mt-4 space-y-2.5">
        {integrations.map(([name, status, detail, icon, tone]) => (
          <div key={name} className="flex items-center justify-between gap-3 rounded-xl border border-[#E5ECEA] bg-[#F7F7F4] p-3">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#0F8F86]">{React.cloneElement(icon, { size: 18 })}</span>
              <div>
                <p className="font-bold text-[#082F35]">{name}</p>
                <p className="text-xs font-semibold text-[#64748B]">{detail}</p>
              </div>
            </div>
            <Pill tone={tone}>{status}</Pill>
          </div>
        ))}
      </div>
    </article>
  );
}

function TeamPermissions() {
  const roles = [
    ['Proprietário', '2 usuários', 'Acesso total, cobrança e segurança'],
    ['Gerente', '3 usuários', 'Operação, campanhas, relatórios e equipe'],
    ['Atendimento', '6 usuários', 'Pedidos, clientes e mensagens'],
    ['Cozinha', '8 usuários', 'Fila de pedidos e estoque operacional'],
  ];

  return (
    <article className={`${cardClass} p-5`}>
      <Header icon={<Users />} title="Equipe e permissões" action="Convidar" />
      <div className="mt-4 space-y-2.5">
        {roles.map(([role, count, access]) => (
          <button key={role} className="flex w-full items-center justify-between gap-3 rounded-xl border border-[#E5ECEA] p-3 text-left transition hover:bg-[#F7F7F4]">
            <span>
              <b className="block text-[#082F35]">{role}</b>
              <span className="text-xs font-semibold text-[#64748B]">{access}</span>
            </span>
            <span className="flex items-center gap-2 text-xs font-bold text-[#64748B]">{count}<ChevronRight size={16} /></span>
          </button>
        ))}
      </div>
    </article>
  );
}

function NotificationCenter() {
  return (
    <article className={`${cardClass} p-5`}>
      <Header icon={<Bell />} title="Alertas" action="Ver canais" />
      <div className="mt-4 space-y-3">
        <Toggle label="Pedido atrasado" checked detail="Push + WhatsApp para gerente" />
        <Toggle label="Estoque crítico" checked detail="Alerta 90 min antes do pico" />
        <Toggle label="Cliente VIP reclamou" checked detail="Prioridade alta" />
        <Toggle label="Resumo diário" checked detail="Todo dia às 08:30" />
        <Toggle label="Relatório semanal" detail="Segunda às 09:00" />
      </div>
    </article>
  );
}

function AISettings() {
  return (
    <article className={`${cardClass} p-5`}>
      <Header icon={<SlidersHorizontal />} title="Inteligência e automações" action="Testar previsão" />
      <div className="mt-4 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-2xl bg-[#E8F8F5] p-4">
          <p className="text-sm font-bold text-[#0F8F86]">Modo atual</p>
          <h3 className="mt-2 text-xl font-bold text-[#082F35]">Recomendações assistidas</h3>
          <p className="mt-2 text-sm font-semibold leading-5 text-[#42526B]">
            O Cereus sugere ações, mas campanhas e mudanças operacionais precisam de aprovação humana.
          </p>
        </div>
        <div className="space-y-3">
          <Toggle label="Gerar recomendações diárias" checked />
          <Toggle label="Prever demanda por produto" checked />
          <Toggle label="Criar rascunhos de campanha" checked />
          <Toggle label="Aplicar ações automaticamente" />
        </div>
      </div>
    </article>
  );
}

function BillingAndPlan() {
  return (
    <article className={`${cardClass} p-5`}>
      <Header icon={<ReceiptText />} title="Plano e cobrança" action="Gerenciar plano" />
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <MiniSetting icon={<CreditCard />} label="Plano atual" value="Premium" />
        <MiniSetting icon={<FileText />} label="Próxima fatura" value="R$ 349 · 12/jun" />
        <MiniSetting icon={<ReceiptText />} label="Uso da base" value="1.356 clientes" />
      </div>
      <div className="mt-4 rounded-xl border border-[#E5ECEA] p-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-[#082F35]">Método de pagamento</p>
            <p className="text-xs font-semibold text-[#64748B]">Cartão final 4242 · Visa</p>
          </div>
          <button className="text-sm font-bold text-[#0F8F86]">Atualizar</button>
        </div>
      </div>
    </article>
  );
}

function SecurityAndPrivacy() {
  return (
    <article className={`${cardClass} p-5`}>
      <Header icon={<ShieldCheck />} title="Segurança e LGPD" action="Abrir central" />
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <MiniSetting icon={<Lock />} label="2FA" value="Obrigatório" />
        <MiniSetting icon={<KeyRound />} label="Sessões ativas" value="4 dispositivos" />
        <MiniSetting icon={<Database />} label="Retenção de dados" value="24 meses" />
        <MiniSetting icon={<Download />} label="Exportações" value="Aprovação exigida" />
      </div>
      <div className="mt-4 space-y-3">
        <Toggle label="Bloquear exportação de clientes por atendentes" checked />
        <Toggle label="Anonimizar clientes inativos após retenção" checked />
        <Toggle label="Exigir aprovação para excluir dados" checked />
      </div>
    </article>
  );
}

function DataAndAudit() {
  const logs = [
    ['02:41', 'Alex Morgan alterou janela de pico para 19h-21h'],
    ['01:58', 'Token do WhatsApp renovado automaticamente'],
    ['Ontem', 'Exportação CSV aprovada para relatório mensal'],
    ['Ontem', 'Integração iFood sincronizou 48 novos pedidos'],
  ];

  return (
    <article className={`${cardClass} p-5`}>
      <Header icon={<Database />} title="Dados e auditoria" action="Exportar log" />
      <div className="mt-4 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-3">
          <MiniSetting icon={<Database />} label="Última sincronização" value="há 2 min" />
          <MiniSetting icon={<Link2 />} label="Webhooks ativos" value="6 endpoints" />
          <MiniSetting icon={<Mail />} label="Eventos de campanha" value="186.542 enviados" />
        </div>
        <div className="space-y-2.5">
          {logs.map(([time, action]) => (
            <div key={action} className="flex items-center justify-between gap-3 rounded-xl border border-[#E5ECEA] bg-[#F7F7F4] px-3 py-2.5">
              <p className="text-sm font-semibold text-[#42526B]">{action}</p>
              <span className="text-xs font-black text-[#64748B]">{time}</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

function Header({ icon, title, action }: { icon: React.ReactNode; title: string; action?: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E8F8F5] text-[#0F8F86]">{icon}</span>
        <h3 className="font-bold text-[#082F35]">{title}</h3>
      </div>
      {action && <button className="text-xs font-bold text-[#0F8F86]">{action} →</button>}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label>
      <span className={labelClass}>{label}</span>
      <input className={inputClass} defaultValue={value} />
    </label>
  );
}

function MiniSetting({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[#E5ECEA] bg-[#F7F7F4] p-3">
      <span className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#0F8F86]">{icon}</span>
      <p className="text-xs font-bold text-[#64748B]">{label}</p>
      <p className="mt-1 text-sm font-black text-[#082F35]">{value}</p>
    </div>
  );
}

function Toggle({ label, checked = false, detail }: { label: string; checked?: boolean; detail?: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-[#E5ECEA] bg-white px-3 py-2.5">
      <div>
        <p className="text-sm font-bold text-[#082F35]">{label}</p>
        {detail && <p className="mt-0.5 text-xs font-semibold text-[#64748B]">{detail}</p>}
      </div>
      <span className={`relative h-6 w-11 rounded-full transition ${checked ? 'bg-[#0F8F86]' : 'bg-slate-200'}`}>
        <span className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${checked ? 'left-6' : 'left-1'}`} />
      </span>
    </div>
  );
}
