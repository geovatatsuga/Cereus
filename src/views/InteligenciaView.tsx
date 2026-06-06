import React, { ReactNode, useState } from 'react';
import {
  AlertTriangle,
  BarChart3,
  BookOpen,
  CalendarClock,
  CheckCircle2,
  Clock,
  Gift,
  Megaphone,
  Package,
  ShieldCheck,
  Star,
  Target,
  TrendingUp,
  Trophy,
  UserRound,
  Users,
  Utensils,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  cardClass,
  CereusMark,
  Donut,
  KpiTile,
  pageInner,
  pageShell,
  Pill,
  SegTabs,
  SectionTitle,
} from '../components/ui/DashboardWidgets';

type LabTab = 'Visão geral' | 'Vendas' | 'Demanda por produto' | 'Clientes em risco' | 'Segmentação';

const tabs: LabTab[] = ['Visão geral', 'Vendas', 'Demanda por produto', 'Clientes em risco', 'Segmentação'];

const salesByHour = [
  { hour: '00h', real: 28, previsao: 24 },
  { hour: '02h', real: 14, previsao: 16 },
  { hour: '04h', real: 12, previsao: 14 },
  { hour: '06h', real: 34, previsao: 36 },
  { hour: '08h', real: 74, previsao: 68 },
  { hour: '10h', real: 58, previsao: 64 },
  { hour: '12h', real: 82, previsao: 86 },
  { hour: '14h', real: 110, previsao: 108 },
  { hour: '16h', real: 96, previsao: 104 },
  { hour: '18h', real: 138, previsao: 136 },
  { hour: '20h', real: null, previsao: 300 },
  { hour: '22h', real: null, previsao: 248 },
  { hour: '24h', real: null, previsao: 82 },
];

const productDemand = [
  { hour: '00h', hamburguer: 110, batata: 82, frango: 52 },
  { hour: '04h', hamburguer: 94, batata: 68, frango: 44 },
  { hour: '08h', hamburguer: 210, batata: 132, frango: 82 },
  { hour: '12h', hamburguer: 292, batata: 188, frango: 128 },
  { hour: '16h', hamburguer: 340, batata: 224, frango: 148 },
  { hour: '20h', hamburguer: 500, batata: 360, frango: 230 },
  { hour: '24h', hamburguer: 250, batata: 170, frango: 112 },
];

const rfmSegments = [
  { name: 'Campeões', percent: 28, clients: 380, color: '#35C4A8' },
  { name: 'Fiéis', percent: 22, clients: 298, color: '#2F80ED' },
  { name: 'Potenciais', percent: 20, clients: 271, color: '#8E6DEB' },
  { name: 'Novos', percent: 16, clients: 217, color: '#F5A623' },
  { name: 'Em risco', percent: 14, clients: 190, color: '#F25563' },
];

const modelCards: Array<{
  tab: Exclude<LabTab, 'Visão geral'>;
  title: string;
  subtitle: string;
  accent: string;
  icon: ReactNode;
  preview: ReactNode;
  footer: string;
}> = [
  {
    tab: 'Vendas',
    title: 'Previsão de vendas',
    subtitle: 'Quanto devemos vender hoje e amanhã?',
    accent: '#0F8F86',
    icon: <BarChart3 size={18} />,
    preview: <MiniLinePreview />,
    footer: 'Ver previsão',
  },
  {
    tab: 'Demanda por produto',
    title: 'Demanda por produto',
    subtitle: 'Quais itens podem faltar no pico?',
    accent: '#2F80ED',
    icon: <Package size={18} />,
    preview: <RiskBarsPreview />,
    footer: 'Ver demanda',
  },
  {
    tab: 'Clientes em risco',
    title: 'Clientes em risco',
    subtitle: 'Quais clientes estão deixando de pedir?',
    accent: '#F25563',
    icon: <Users size={18} />,
    preview: <RiskCustomersPreview />,
    footer: 'Ver risco',
  },
  {
    tab: 'Segmentação',
    title: 'Segmentação',
    subtitle: 'Quem são meus melhores clientes?',
    accent: '#7C5BEF',
    icon: <Star size={18} />,
    preview: <Donut data={rfmSegments.map((item) => ({ name: item.name, value: item.percent, color: item.color }))} center="5" sub="segmentos" size={138} />,
    footer: 'Ver segmentos',
  },
];

export function InteligenciaView() {
  const [active, setActive] = useState<LabTab>('Visão geral');

  return (
    <div className={`${pageShell} pb-5 pt-5`}>
      <div className={`${pageInner} max-w-[1360px] space-y-3`}>
        <section className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
          <SectionTitle
            title={active === 'Visão geral' ? 'Lab de IA' : pageTitles[active].title}
            subtitle={active === 'Visão geral' ? 'Veja, de forma simples, o que cada modelo prevê e qual ação ele recomenda para o seu delivery.' : pageTitles[active].subtitle}
          />
          <SegTabs tabs={tabs} active={active} onChange={(tab) => setActive(tab as LabTab)} />
        </section>

        {active === 'Visão geral' && <OverviewModel onOpen={setActive} />}
        {active === 'Vendas' && <SalesModel />}
        {active === 'Demanda por produto' && <DemandModel />}
        {active === 'Clientes em risco' && <AtRiskCustomersModel />}
        {active === 'Segmentação' && <RfmModel />}
      </div>
    </div>
  );
}

const pageTitles: Record<Exclude<LabTab, 'Visão geral'>, { title: string; subtitle: string }> = {
  Vendas: {
    title: 'Previsão de vendas',
    subtitle: 'Entenda quanto seu delivery deve vender ao longo do dia e o que fazer para se preparar.',
  },
  'Demanda por produto': {
    title: 'Demanda por produto',
    subtitle: 'Descubra quais itens têm maior chance de faltar ou acelerar no pico do delivery.',
  },
  'Clientes em risco': {
    title: 'Clientes em risco',
    subtitle: 'Veja quais clientes estão deixando de pedir e quais ações podem aumentar a recompra.',
  },
  Segmentação: {
    title: 'Segmentação de clientes',
    subtitle: 'Entenda quais grupos de clientes merecem prioridade e como falar com cada um deles.',
  },
};

function OverviewModel({ onOpen }: { onOpen: (tab: LabTab) => void }) {
  return (
    <>
      <section className="grid items-stretch gap-3 xl:grid-cols-[1fr_0.95fr]">
        <article className={`${cardClass} overflow-hidden bg-[#E8F8F5] p-4`}>
          <div className="flex items-center gap-4">
            <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-white">
              <CereusMark className="h-16 w-16" />
            </span>
            <div>
              <h3 className="max-w-md text-2xl font-bold leading-tight text-[#082F35]">Modelos que explicam e ajudam a decidir</h3>
              <p className="mt-4 max-w-xl text-sm font-semibold leading-6 text-[#42526B]">
                Cada modelo transforma dados do seu delivery em previsões práticas para operação, estoque, retenção e relacionamento com clientes.
              </p>
            </div>
          </div>
        </article>

        <article className={`${cardClass} p-4`}>
          <h3 className="mb-4 font-bold text-[#082F35]">Resumo de amanhã</h3>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <SummaryBox icon={<ShieldCheck />} label="Confiança" value="alta" />
            <SummaryBox icon={<Clock />} label="Pico às" value="20h" />
            <SummaryBox icon={<TrendingUp />} label="Demanda" value="+12%" />
            <SummaryBox icon={<Users />} label="Ação" value="reforçar equipe" />
          </div>
        </article>
      </section>

      <section className="grid items-stretch gap-3 xl:grid-cols-4">
        {modelCards.map((card, index) => (
          <button
            key={card.tab}
            onClick={() => onOpen(card.tab)}
            className={`${cardClass} group flex flex-col p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:border-[#9DDED3] hover:shadow-[0_16px_38px_rgba(8,47,53,0.08)]`}
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: card.accent }}>
                {index + 1}
              </span>
              <h3 className="font-bold text-[#082F35]">{card.title}</h3>
            </div>
            <p className="mb-3 min-h-10 text-sm font-semibold leading-5 text-[#42526B]">{card.subtitle}</p>
            <div className="flex min-h-[146px] w-full items-center justify-center rounded-xl border border-[#E5ECEA] bg-white p-3">{card.preview}</div>
            <div className="mt-auto flex items-center justify-between pt-3">
              <span className="flex items-center gap-2 text-xs font-bold text-[#64748B]">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E8F8F5] text-[#0F8F86]">{card.icon}</span>
                Modelo ativo
              </span>
              <span className="text-sm font-bold text-[#0F8F86] group-hover:translate-x-1 transition-transform">{card.footer} →</span>
            </div>
          </button>
        ))}
      </section>

      <section className="grid items-stretch gap-3 xl:grid-cols-[1fr_0.9fr]">
        <article className={`${cardClass} p-4`}>
          <h3 className="mb-4 font-bold text-[#082F35]">Como ler os modelos</h3>
          <div className="grid gap-3 md:grid-cols-3">
            <HowBox icon={<ShieldCheck />} title="Confiança" text="Mostra quão confiável é a previsão com base nos dados disponíveis." />
            <HowBox icon={<BarChart3 />} title="Impacto" text="Indica o potencial de ganho ou redução de risco ao agir com base no insight." />
            <HowBox icon={<Megaphone />} title="Próxima ação" text="Sugere o próximo passo mais eficaz para melhorar seu resultado hoje." />
          </div>
        </article>

        <article className={`${cardClass} p-4`}>
          <h3 className="mb-4 font-bold text-[#082F35]">Ações sugeridas para hoje</h3>
          {[
            ['Reforçar equipe no jantar', 'Vendas'],
            ['Revisar estoque de hambúrguer e batata', 'Demanda por produto'],
            ['Ativar campanha para clientes em risco', 'Clientes em risco'],
          ].map(([label, tab]) => (
            <button key={label} onClick={() => onOpen(tab as LabTab)} className="mb-3 flex w-full items-center justify-between rounded-xl border border-[#E5ECEA] p-3 text-left font-semibold text-[#082F35] hover:bg-[#F1F6F4]">
              {label}
              <span className="text-[#0F8F86]">›</span>
            </button>
          ))}
        </article>
      </section>
    </>
  );
}

function SalesModel() {
  return (
    <>
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiTile icon={<BarChart3 />} label="Previsão hoje" value="R$ 8.420" change="+12% vs ontem" />
        <KpiTile icon={<CalendarClock />} label="Previsão amanhã" value="R$ 9.160" change="+15% vs hoje" />
        <KpiTile icon={<Clock />} label="Pico previsto" value="20h" change="276 pedidos" />
        <KpiTile icon={<ShieldCheck />} label="Confiança da previsão" value="92%" change="Alta confiança" />
      </section>

      <section className="grid items-stretch gap-3 xl:grid-cols-[1.45fr_0.95fr]">
        <article className={`${cardClass} p-4`}>
          <h3 className="mb-4 font-bold text-[#082F35]">Pedidos previstos por hora</h3>
          <div className="h-[205px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesByHour} margin={{ left: -10, right: 8, top: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="salesForecastFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7DD3C0" stopOpacity={0.42} />
                    <stop offset="95%" stopColor="#7DD3C0" stopOpacity={0.04} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#E5ECEA" vertical={false} />
                <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B', fontWeight: 600 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B', fontWeight: 600 }} />
                <Tooltip />
                <Area type="monotone" dataKey="previsao" name="Previsão" stroke="#0F8F86" strokeWidth={3} fill="url(#salesForecastFill)" strokeDasharray="6 5" isAnimationActive={false} />
                <Line type="monotone" dataKey="real" name="Real" stroke="#053B3A" strokeWidth={2.5} dot={{ r: 3 }} connectNulls={false} isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>

        <SimpleReading
          title="Resumo"
          body="O volume tende a crescer após 18h e atingir o pico às 20h."
          items={['Maior impacto no jantar', 'Demanda +12% vs ontem', 'Reforçar equipe e embalagem']}
        />
      </section>

      <section className="grid items-stretch gap-3 xl:grid-cols-[0.9fr_0.95fr_0.95fr]">
        <article className={`${cardClass} p-4`}>
          <h3 className="mb-4 font-bold text-[#082F35]">Comparação de dias</h3>
          {[
            ['Hoje', 612, '#053B3A'],
            ['Amanhã', 665, '#0F8F86'],
            ['Ontem', 548, '#CBD5E1'],
            ['Última semana', 573, '#CBD5E1'],
          ].map(([label, value, color]) => (
            <div key={String(label)} className="mb-3 grid grid-cols-[120px_1fr_90px] items-center gap-3 text-sm font-semibold text-[#42526B]">
              <span>{label}</span>
              <span className="h-2 rounded-full bg-slate-100"><span className="block h-full rounded-full" style={{ width: `${Number(value) / 7}%`, background: String(color) }} /></span>
              <span>{value} pedidos</span>
            </div>
          ))}
        </article>

        <article className={`${cardClass} p-4`}>
          <h3 className="mb-4 font-bold text-[#082F35]">Horários mais fortes</h3>
          {[
            ['Almoço (11h–14h)', '122', 'R$ 1.620'],
            ['Jantar (18h–22h)', '431', 'R$ 5.380'],
            ['Madrugada (00h–06h)', '59', 'R$ 620'],
          ].map(([period, orders, revenue]) => (
            <div key={period} className="mb-3 grid grid-cols-[1fr_80px_100px] text-sm font-semibold text-[#42526B]">
              <span>{period}</span>
              <b className="text-[#082F35]">{orders}</b>
              <b className="text-[#082F35]">{revenue}</b>
            </div>
          ))}
        </article>

        <ActionCard title="Próxima ação" icon={<Users />} text="Reforçar equipe entre 19h e 21h para reduzir atraso e proteger receita." button="Ver plano de equipe" />
      </section>
    </>
  );
}

function DemandModel() {
  const risks = [
    ['Hambúrguer', 85, '#F25563'],
    ['Batata', 72, '#FF8B36'],
    ['Frango', 48, '#F4B83E'],
    ['Refrigerante', 35, '#3B82F6'],
    ['Açaí', 18, '#0F8F86'],
  ] as const;

  return (
    <>
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiTile icon={<Package />} label="Itens críticos" value="4 itens" change="com alto risco de ruptura" />
        <KpiTile icon={<Clock />} label="Pico de demanda" value="20h" change="horário de maior pressão" />
        <KpiTile icon={<AlertTriangle />} label="Risco de ruptura" value="alto" change="principais itens" danger />
        <KpiTile icon={<ShieldCheck />} label="Confiança da previsão" value="89%" change="precisão das previsões" />
      </section>

      <section className="grid items-stretch gap-3 xl:grid-cols-[1fr_0.95fr]">
        <article className={`${cardClass} p-4`}>
          <h3 className="mb-5 font-bold text-[#082F35]">Risco de falta no pico (20h)</h3>
          {risks.map(([name, value, color]) => (
            <div key={name} className="mb-4 grid grid-cols-[120px_1fr_42px] items-center gap-3 text-sm font-semibold text-[#42526B]">
              <span>{name}</span>
              <span className="h-2.5 rounded-full bg-slate-100"><span className="block h-full rounded-full" style={{ width: `${value}%`, background: color }} /></span>
              <b>{value}%</b>
            </div>
          ))}
        </article>

        <article className={`${cardClass} overflow-hidden bg-[#E8F8F5] p-4`}>
          <div className="flex items-center gap-4">
            <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-white">
              <CereusMark className="h-16 w-16" />
            </span>
            <div>
              <h3 className="text-2xl font-bold leading-tight text-[#082F35]">Hambúrguer e batata concentram o maior risco de ruptura no jantar.</h3>
              <p className="mt-4 font-semibold text-[#42526B]">Preparar mais porções antes das 19h, revisar estoque de batata e ajustar produção no pico.</p>
            </div>
          </div>
        </article>
      </section>

      <section className="grid items-stretch gap-3 xl:grid-cols-[1fr_0.9fr_0.85fr]">
        <article className={`${cardClass} p-4`}>
          <h3 className="mb-4 font-bold text-[#082F35]">Demanda por horário</h3>
          <div className="h-[155px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={productDemand} margin={{ left: -12, right: 8, top: 8, bottom: 0 }}>
                <CartesianGrid stroke="#E5ECEA" vertical={false} />
                <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B', fontWeight: 600 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B', fontWeight: 600 }} />
                <Tooltip />
                <Line dataKey="hamburguer" name="Hambúrguer" stroke="#0F8F86" strokeWidth={3} dot={false} isAnimationActive={false} />
                <Line dataKey="batata" name="Batata" stroke="#FF8B36" strokeWidth={2.5} dot={false} isAnimationActive={false} />
                <Line dataKey="frango" name="Frango" stroke="#6D5DF5" strokeWidth={2.5} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className={`${cardClass} p-4`}>
          <h3 className="mb-4 font-bold text-[#082F35]">Itens com maior aceleração</h3>
          {[
            ['Hambúrguer', '+25%', <Package />],
            ['Batata', '+18%', <Utensils />],
            ['Frango', '+12%', <Package />],
            ['Refrigerante', '+8%', <Package />],
          ].map(([name, value, icon]) => (
            <div key={String(name)} className="mb-3 flex items-center justify-between rounded-xl border border-[#E5ECEA] p-3">
              <span className="flex items-center gap-3 font-semibold text-[#42526B]">{React.cloneElement(icon as React.ReactElement, { size: 18, className: 'text-[#0F8F86]' })}{name}</span>
              <b className="text-[#0F8F86]">{value}</b>
            </div>
          ))}
        </article>

        <ActionCard title="Próxima ação" icon={<CalendarClock />} text="Revisar estoque de hambúrguer e batata antes das 18h." button="Ver recomendações de estoque" />
      </section>
    </>
  );
}

function AtRiskCustomersModel() {
  const riskyCustomers = [
    ['Mariana Silva', '22/04/2025', 95, 'R$ 420'],
    ['Carlos Oliveira', '19/04/2025', 90, 'R$ 390'],
    ['Juliana Costa', '18/04/2025', 88, 'R$ 355'],
    ['Rafael Almeida', '16/04/2025', 82, 'R$ 310'],
    ['Beatriz Lima', '15/04/2025', 80, 'R$ 280'],
  ] as const;

  return (
    <>
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiTile icon={<Users />} label="Clientes em risco" value="87" change="12% da base ativa" />
        <KpiTile icon={<Target />} label="Receita em risco" value="R$ 6.840" change="12% da receita mensal" />
        <KpiTile icon={<TrendingUp />} label="Chance média de retorno" value="68%" change="com ação no momento certo" />
        <KpiTile icon={<ShieldCheck />} label="Confiança da previsão" value="85%" change="previsão de alta qualidade" />
      </section>

      <section className="grid items-stretch gap-3 xl:grid-cols-[1.05fr_0.95fr]">
        <article className={`${cardClass} p-4`}>
          <h3 className="mb-4 font-bold text-[#082F35]">Clientes com maior risco</h3>
          <div className="space-y-3">
            {riskyCustomers.map(([name, date, risk, value], index) => (
              <div key={name} className="grid grid-cols-[30px_1fr_110px_120px_80px] items-center gap-3 text-sm font-semibold text-[#42526B]">
                <b className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0F8F86] text-xs text-white">{index + 1}</b>
                <span>{name}</span>
                <span>{date}</span>
                <span className="h-2 rounded-full bg-slate-100"><span className="block h-full rounded-full bg-rose-500" style={{ width: `${risk}%` }} /></span>
                <b className="text-[#082F35]">{value}</b>
              </div>
            ))}
          </div>
          <button className="mt-4 rounded-xl border border-[#E5ECEA] px-4 py-2 text-sm font-bold text-[#0F8F86]">Ver todos os clientes em risco →</button>
        </article>

        <SimpleReading
          title="Resumo"
          body="Esses clientes reduziram frequência, tempo desde o último pedido e engajamento."
          items={['Sem pedido há 21+ dias', 'Queda de frequência', 'Boa chance de reativação com oferta certa']}
        />
      </section>

      <section className="grid items-stretch gap-3 xl:grid-cols-[0.85fr_0.85fr_0.9fr]">
        <article className={`${cardClass} p-4`}>
          <h3 className="mb-4 font-bold text-[#082F35]">Motivos do risco</h3>
          <Donut
            data={[
              { name: 'Recência', value: 42, color: '#053B3A' },
              { name: 'Frequência', value: 28, color: '#43C8B6' },
              { name: 'Ticket', value: 17, color: '#F5A623' },
              { name: 'Engajamento', value: 13, color: '#8E6DEB' },
            ]}
            center="4"
            sub="fatores"
            size={165}
          />
        </article>

        <article className={`${cardClass} p-4`}>
          <h3 className="mb-4 font-bold text-[#082F35]">Janela ideal de reconquista</h3>
          <div className="mb-4 flex gap-2">
            {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((day) => (
              <span key={day}>
                <Pill tone={['Qua', 'Qui', 'Sex'].includes(day) ? 'teal' : 'slate'}>{day}</Pill>
              </span>
            ))}
          </div>
          <div className="rounded-xl border border-[#E5ECEA] p-4 text-sm font-semibold text-[#42526B]">
            <b className="text-[#082F35]">Melhor janela: Qua a Sex</b>
            <p className="mt-2">Campanhas enviadas nesses dias têm até 28% mais chance de retorno.</p>
          </div>
        </article>

        <ActionCard title="Próxima ação" icon={<Megaphone />} text="Ativar campanha de win-back para 87 clientes com incentivo personalizado." button="Ativar campanha agora" />
      </section>
    </>
  );
}

function RfmModel() {
  return (
    <>
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiTile icon={<Users />} label="Segmentos ativos" value="5" change="grupos identificados" />
        <KpiTile icon={<UserRound />} label="Clientes analisados" value="1.356" change="100% da base" />
        <KpiTile icon={<Star />} label="Maior grupo" value="Fiéis" change="41% dos clientes" />
        <KpiTile icon={<Target />} label="Cobertura" value="100%" change="base analisada" />
      </section>

      <section className="grid items-stretch gap-3 xl:grid-cols-[1fr_1fr]">
        <article className={`${cardClass} p-4`}>
          <h3 className="mb-4 font-bold text-[#082F35]">Distribuição dos segmentos</h3>
          <div className="grid gap-4 md:grid-cols-[220px_1fr] md:items-center">
            <Donut data={rfmSegments.map((item) => ({ name: item.name, value: item.percent, color: item.color }))} center="1.356" sub="clientes" size={220} />
            <div className="space-y-3">
              {rfmSegments.map((item) => (
                <p key={item.name} className="grid grid-cols-[1fr_50px_60px] items-center gap-3 text-sm font-semibold text-[#42526B]">
                  <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />{item.name}</span>
                  <b className="text-[#082F35]">{item.percent}%</b>
                  <span>{item.clients}</span>
                </p>
              ))}
            </div>
          </div>
        </article>

        <SimpleReading
          title="Resumo"
          body="Seus clientes mais valiosos estão concentrados entre Campeões e Fiéis, enquanto Em risco precisa de ação rápida."
          items={['Campeões geram mais receita', 'Potenciais podem crescer', 'Em risco precisam de reconquista']}
          icon={<BookOpen />}
        />
      </section>

      <section className="grid items-stretch gap-3 xl:grid-cols-[1.2fr_0.9fr_0.9fr]">
        <article className={`${cardClass} p-4`}>
          <h3 className="mb-4 font-bold text-[#082F35]">Perfil dos segmentos</h3>
          <div className="grid grid-cols-5 gap-3">
            {rfmSegments.map((item) => (
              <div key={item.name} className="rounded-xl border p-3 text-center text-sm font-semibold" style={{ borderColor: `${item.color}55`, background: `${item.color}12` }}>
                <Trophy className="mx-auto mb-2" size={22} style={{ color: item.color }} />
                <p>{item.name}</p>
                <b className="mt-1 block text-xl text-[#082F35]">{item.clients}</b>
                <span className="text-xs text-[#64748B]">{item.percent}%</span>
              </div>
            ))}
          </div>
        </article>

        <article className={`${cardClass} p-4`}>
          <h3 className="mb-4 font-bold text-[#082F35]">Receita por segmento</h3>
          <div className="h-[165px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'Campeões', value: 112 },
                { name: 'Fiéis', value: 92 },
                { name: 'Potenciais', value: 64 },
                { name: 'Novos', value: 38 },
                { name: 'Risco', value: 26 },
              ]}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748B', fontWeight: 600 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748B', fontWeight: 600 }} tickFormatter={(value) => `R$ ${value}k`} />
                <Tooltip />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} isAnimationActive={false}>
                  {rfmSegments.map((item) => <Cell key={item.name} fill={item.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>

        <ActionCard title="Próxima ação" icon={<Megaphone />} text="Criar oferta exclusiva para Potenciais e campanha de retorno para Em risco." button="Ver plano sugerido" />
      </section>
    </>
  );
}

function SummaryBox({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[#E5ECEA] p-4">
      <span className="mb-4 block text-[#0F8F86]">{icon}</span>
      <p className="text-sm text-[#64748B]">{label}</p>
      <b className="text-lg text-[#082F35]">{value}</b>
    </div>
  );
}

function HowBox({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div>
      <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F8F5] text-[#0F8F86]">{icon}</span>
      <b className="text-[#082F35]">{title}</b>
      <p className="mt-2 text-sm font-semibold leading-5 text-[#64748B]">{text}</p>
    </div>
  );
}

function SimpleReading({ title, body, items, icon = <SparklesIcon /> }: { title: string; body: string; items: string[]; icon?: ReactNode }) {
  return (
    <article className={`${cardClass} bg-[#E8F8F5] p-4`}>
      <div className="flex items-start gap-4">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-[#0F8F86]">{icon}</span>
        <div>
          <h3 className="font-bold text-[#082F35]">{title}</h3>
          <p className="mt-4 text-lg font-semibold leading-7 text-[#22314D]">{body}</p>
          <div className="mt-5 space-y-3">
            {items.map((item) => (
              <p key={item} className="flex items-center gap-3 text-sm font-semibold text-[#42526B]">
                <CheckCircle2 size={17} className="text-[#0F8F86]" /> {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function ActionCard({ title, icon, text, button }: { title: string; icon: ReactNode; text: string; button: string }) {
  return (
    <article className={`${cardClass} bg-[#E8F8F5] p-4`}>
      <h3 className="font-bold text-[#082F35]">{title}</h3>
      <div className="mt-4 rounded-2xl bg-white/55 p-4">
        <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#0F8F86]">{icon}</span>
        <p className="text-lg font-bold leading-6 text-[#082F35]">{text}</p>
        <button className="mt-5 w-full rounded-lg bg-[#0F8F86] px-4 py-3 text-sm font-bold text-white">{button} →</button>
      </div>
    </article>
  );
}

function MiniLinePreview() {
  return (
    <div className="h-[95px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={salesByHour.filter((_, index) => index % 2 === 0)} margin={{ left: -22, right: 0, top: 6, bottom: 0 }}>
          <defs>
            <linearGradient id="miniLabFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7DD3C0" stopOpacity={0.36} />
              <stop offset="95%" stopColor="#7DD3C0" stopOpacity={0.04} />
            </linearGradient>
          </defs>
          <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748B' }} />
          <YAxis hide />
          <Area type="monotone" dataKey="previsao" stroke="#0F8F86" strokeWidth={2.5} fill="url(#miniLabFill)" dot={false} isAnimationActive={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function RiskBarsPreview() {
  return (
    <div className="w-full space-y-2">
      {[
        ['Hambúrguer', 85, '#F25563'],
        ['Batata', 72, '#FF8B36'],
        ['Frango', 48, '#F4B83E'],
        ['Refri', 35, '#3B82F6'],
      ].map(([name, value, color]) => (
        <p key={String(name)} className="grid grid-cols-[86px_1fr_32px] items-center gap-2 text-xs font-semibold text-[#42526B]">
          <span>{name}</span>
          <span className="h-2 rounded-full bg-slate-100"><span className="block h-full rounded-full" style={{ width: `${value}%`, background: String(color) }} /></span>
          <b>{value}%</b>
        </p>
      ))}
    </div>
  );
}

function RiskCustomersPreview() {
  return (
    <div className="w-full space-y-2.5">
      {[
        ['Mariana Silva', 85],
        ['Carlos Oliveira', 72],
        ['Juliana Costa', 55],
      ].map(([name, risk]) => (
        <p key={String(name)} className="grid grid-cols-[1fr_80px_32px] items-center gap-2 text-xs font-semibold text-[#42526B]">
          <span>{name}</span>
          <span className="h-2 rounded-full bg-slate-100"><span className="block h-full rounded-full bg-rose-500" style={{ width: `${risk}%` }} /></span>
          <b>{risk}%</b>
        </p>
      ))}
    </div>
  );
}

function SparklesIcon() {
  return <CereusMark className="h-10 w-10" />;
}
