import React from 'react';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  Gift,
  Heart,
  MoreHorizontal,
  Package,
  ShoppingCart,
  Target,
  ThumbsUp,
  TrendingUp,
  UserRoundPlus,
} from 'lucide-react';
import { businessMetrics } from '../data/businessMetrics';

type HojeViewProps = {
  onNavigate?: (tab: string) => void;
};

const salesData = [
  { day: '6 mai', revenue: 4300 },
  { day: '7 mai', revenue: 10300 },
  { day: '8 mai', revenue: 10100 },
  { day: '9 mai', revenue: 14000 },
  { day: '10 mai', revenue: 12100 },
  { day: '11 mai', revenue: 12900 },
  { day: '12 mai', revenue: 15000 },
];

const activities = [
  { icon: <ShoppingCart size={18} />, title: 'Novo pedido recebido', text: 'Pedido #10583 • R$ 87,42', time: '12 min' },
  { icon: <UserRoundPlus size={18} />, title: 'Novo cliente', text: 'Sarah J. • 1º pedido', time: '25 min' },
  { icon: <Gift size={18} />, title: 'Recompensa resgatada', text: 'João D. • 250 pontos', time: '41 min' },
  { icon: <TrendingUp size={18} />, title: 'Campanha atualizada', text: 'Especial Dia das Mães', time: '1 h' },
  { icon: <ThumbsUp size={18} />, title: 'Feedback positivo', text: 'Avaliação 5 estrelas', time: '2 h' },
];

const kpis = [
  {
    label: 'Receita hoje',
    value: businessMetrics.today.revenue,
    change: '18,7% vs ontem',
    icon: <CircleDollarSign size={22} />,
    points: [14, 15, 19, 18, 22, 20, 25, 24, 28, 27],
  },
  {
    label: 'Pedidos hoje',
    value: businessMetrics.today.orders,
    change: '15,2% vs ontem',
    icon: <Package size={22} />,
    points: [11, 12, 16, 15, 18, 17, 22, 20, 24, 23],
  },
  {
    label: 'Saúde dos clientes',
    value: businessMetrics.today.customerHealth,
    change: '4,5% vs últimos 7 dias',
    icon: <Heart size={22} />,
    points: [15, 17, 19, 16, 17, 16, 22, 20, 25],
  },
];

const priorities = [
  ['Reforçar equipe', `Pico previsto entre ${businessMetrics.today.peakWindow}`, 'operacao'],
  ['Revisar estoque crítico', 'Hambúrguer e batata sobem no jantar', 'inteligencia'],
  ['Preparar campanha de retorno', '10% de clientes podem voltar', 'campanhas'],
] as const;

function Sparkline({ points }: { points: number[] }) {
  const width = 128;
  const height = 58;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const path = points
    .map((point, index) => {
      const x = (index / (points.length - 1)) * width;
      const y = height - ((point - min) / Math.max(1, max - min)) * (height - 12) - 6;
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-10 w-28" fill="none" aria-hidden="true">
      <path d={path} stroke="#17B8AB" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function KpiCard({ kpi }: { kpi: typeof kpis[number]; key?: React.Key }) {
  return (
    <article className="rounded-2xl border border-[#E5ECEA] bg-white p-3.5 shadow-[0_12px_30px_rgba(8,47,53,0.05)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E8F8F5] text-[#0F8F86]">
          {kpi.icon}
        </div>
        <button className="rounded-lg p-1.5 text-[#31516C] transition hover:bg-[#F1F6F4]" aria-label={`Mais opções de ${kpi.label}`}>
          <MoreHorizontal size={18} />
        </button>
      </div>
      <div className="mt-1 grid grid-cols-[1fr_auto] items-end gap-4">
        <div>
          <p className="text-[14px] font-bold text-[#082F35]">{kpi.label}</p>
          <p className="mt-2.5 text-[26px] font-black leading-none text-[#082F35]">{kpi.value}</p>
          <p className="mt-2.5 flex items-center gap-1.5 text-[12px] font-bold text-[#009D91]">
            <TrendingUp size={14} /> {kpi.change}
          </p>
        </div>
        <Sparkline points={kpi.points} />
      </div>
    </article>
  );
}

export function HojeView({ onNavigate }: HojeViewProps) {
  return (
    <div className="relative w-full px-4 pb-5 pt-2 sm:px-6 lg:px-7">
      <div className="mx-auto w-full max-w-[1760px] space-y-3.5">
        <section className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-[26px] font-black leading-tight text-[#082F35] sm:text-[29px]">Bem-vindo de volta, Alex 👋</h2>
            <p className="mt-1 text-sm font-semibold text-[#64748B]">Veja o que está acontecendo hoje no Bella's Bistro.</p>
          </div>
          <button className="flex w-fit items-center gap-3 rounded-xl border border-[#E5ECEA] bg-white px-5 py-3 text-sm font-bold text-[#31516C] shadow-[0_10px_24px_rgba(8,47,53,0.055)]">
            <CalendarDays size={18} className="text-[#31516C]" />
            12 de maio de 2025
            <ChevronDown size={17} />
          </button>
        </section>

        <section className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          {kpis.map((kpi) => (
            <KpiCard key={kpi.label} kpi={kpi} />
          ))}
        </section>

        <section className="grid grid-cols-1 gap-3.5 xl:grid-cols-[minmax(0,1.95fr)_minmax(360px,0.82fr)]">
          <article className="rounded-2xl border border-[#E5ECEA] bg-white p-3.5 shadow-[0_12px_30px_rgba(8,47,53,0.05)]">
            <div className="mb-2 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-[#082F35]">Tendência de Vendas</h3>
                <p className="mt-3 text-[29px] font-black leading-none text-[#082F35]">{businessMetrics.today.sales7d}</p>
                <p className="mt-2 flex items-center gap-1.5 text-[14px] font-bold text-[#009D91]">
                  <TrendingUp size={17} /> 16,4% vs 7 dias anteriores
                </p>
              </div>
              <button className="flex items-center gap-2 rounded-xl border border-[#E5ECEA] bg-white px-4 py-2.5 text-sm font-bold text-[#31516C]">
                Últimos 7 dias <ChevronDown size={16} />
              </button>
            </div>

            <div className="h-[198px] min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData} margin={{ top: 18, right: 10, left: 0, bottom: 4 }}>
                  <defs>
                    <linearGradient id="salesFillHome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="4%" stopColor="#7DD3C0" stopOpacity={0.36} />
                      <stop offset="95%" stopColor="#7DD3C0" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#31516C', fontSize: 12, fontWeight: 700 }} dy={12} />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#31516C', fontSize: 12, fontWeight: 700 }}
                    tickFormatter={(value) => (value === 0 ? 'R$ 0' : `R$ ${value / 1000}K`)}
                    ticks={[0, 3000, 6000, 9000, 12000, 15000]}
                    width={54}
                  />
                  <Tooltip
                    cursor={{ stroke: '#D5F1EC', strokeWidth: 1 }}
                    contentStyle={{ border: '1px solid #E5ECEA', borderRadius: 14, boxShadow: '0 18px 42px rgba(8,47,53,0.12)' }}
                    formatter={(value) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, 'Receita']}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#089E94" strokeWidth={4} fill="url(#salesFillHome)" dot={false} activeDot={{ r: 7, strokeWidth: 4, stroke: '#089E94', fill: '#fff' }} isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-3 rounded-xl border border-[#E5ECEA] bg-[#FBFCFC] p-3 sm:grid-cols-3">
              <div>
                <p className="text-sm font-semibold text-[#64748B]">Melhor dia</p>
                <p className="mt-2 text-sm font-semibold text-[#31516C]">12 de maio</p>
                <p className="mt-1 text-lg font-black text-[#082F35]">{businessMetrics.today.bestDayRevenue}</p>
              </div>
              <div className="sm:border-x sm:border-[#DCE8E5] sm:px-8">
                <p className="text-sm font-semibold text-[#64748B]">Média diária</p>
                <p className="mt-5 text-lg font-black text-[#082F35]">{businessMetrics.today.averageDailyRevenue}</p>
              </div>
              <div className="sm:px-4">
                <p className="text-sm font-semibold text-[#64748B]">vs 7 dias anteriores</p>
                <p className="mt-5 flex items-center gap-2 text-lg font-black text-[#009D91]"><TrendingUp size={18} /> 16,4%</p>
              </div>
            </div>
          </article>

          <article className="rounded-2xl border border-[#E5ECEA] bg-white p-3.5 shadow-[0_12px_30px_rgba(8,47,53,0.05)]">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-lg font-black text-[#082F35]">Atividade recente</h3>
              <button className="text-sm font-black text-[#009D91]">Ver todas</button>
            </div>
            <div className="divide-y divide-[#E5ECEA]">
              {activities.map((activity) => (
                <div key={activity.title} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E8F8F5] text-[#0F8F86]">
                    {activity.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-black text-[#082F35]">{activity.title}</p>
                    <p className="mt-1 text-[13px] font-semibold text-[#31516C]">{activity.text}</p>
                  </div>
                  <span className="text-sm font-semibold text-[#31516C]">{activity.time}</span>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="grid grid-cols-1 gap-3.5 xl:grid-cols-[minmax(0,1.95fr)_minmax(360px,0.82fr)]">
          <article className="min-h-[104px] rounded-2xl border border-[#E5ECEA] bg-white p-3.5 shadow-[0_12px_30px_rgba(8,47,53,0.05)]">
            <h3 className="mb-3 text-lg font-black text-[#082F35]">Prioridades de hoje</h3>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
              {priorities.map(([title, text, tab], index) => (
                <button
                  key={title}
                  onClick={() => onNavigate?.(tab)}
                  className="grid min-h-[52px] grid-cols-[36px_1fr_20px] items-center gap-3 rounded-xl bg-white text-left transition hover:bg-[#F7F7F4]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8F8F5] text-sm font-black text-[#0F8F86]">{index + 1}</span>
                  <span className="min-w-0">
                    <b className="block text-sm font-black text-[#082F35]">{title}</b>
                    <span className="mt-0.5 block truncate text-[12px] font-semibold text-[#31516C]">{text}</span>
                  </span>
                  <ArrowRight size={22} className="text-[#009D91]" />
                </button>
              ))}
            </div>
          </article>

          <article className="relative min-h-[104px] rounded-2xl border border-[#E5ECEA] bg-white p-3.5 shadow-[0_12px_30px_rgba(8,47,53,0.05)]">
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8F8F5] text-[#0F8F86]">
                <Target size={22} />
              </span>
              <h3 className="text-base font-black text-[#082F35]">Meta do dia</h3>
            </div>
            <p className="text-[15px] font-black text-[#082F35]">
              R$ 8.642 <span className="font-semibold text-[#31516C]">/ R$ 10.000</span>
            </p>
            <div className="mt-4 flex items-center gap-4">
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-[#D9F2EE]">
                <div className="h-full w-[86%] rounded-full bg-[#17B8AB]" />
              </div>
              <span className="text-sm font-black text-[#009D91]">86%</span>
            </div>
            <button className="mt-4 flex items-center gap-2 text-sm font-black text-[#009D91]">
              Ver todas as metas <ArrowRight size={18} />
            </button>
          </article>
        </section>
      </div>
    </div>
  );
}
