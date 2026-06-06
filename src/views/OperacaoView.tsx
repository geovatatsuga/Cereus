import React from 'react';
import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Filter,
  PackageCheck,
  ReceiptText,
  Timer,
  Truck,
} from 'lucide-react';
import { Area, AreaChart, Line, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { cardClass, Pill, Sparkline } from '../components/ui/DashboardWidgets';
import { businessMetrics } from '../data/businessMetrics';

const volume = [
  { name: '6h', hoje: 8, ontem: 5 },
  { name: '9h', hoje: 48, ontem: 24 },
  { name: '12h', hoje: 64, ontem: 36 },
  { name: '15h', hoje: 84, ontem: 62 },
  { name: '18h', hoje: 98, ontem: 90 },
  { name: '21h', hoje: 78, ontem: 84 },
];

const queue = [
  {
    title: 'Novos',
    count: '12',
    color: '#3B82F6',
    orders: [
      ['#10587', 'Sarah Johnson', '2 itens • Retirada', 'Médio'],
      ['#10588', 'Michael Chen', '3 itens • Delivery', 'Alto'],
    ],
  },
  {
    title: 'Preparando',
    count: '18',
    color: '#F59E0B',
    orders: [
      ['#10583', 'David Wilson', '4 itens • Delivery', 'Alto'],
      ['#10582', 'Jessica Brown', '3 itens • Retirada', 'Médio'],
    ],
  },
  {
    title: 'Prontos',
    count: '10',
    color: '#14B8A6',
    orders: [
      ['#10578', 'Amanda Lee', '2 itens • Retirada', 'Baixo'],
      ['#10577', 'James Taylor', '3 itens • Delivery', 'Baixo'],
    ],
  },
  {
    title: 'Em entrega',
    count: '8',
    color: '#6366F1',
    orders: [
      ['#10575', 'Daniel Kim', '3 itens • Delivery', 'Baixo'],
      ['#10574', 'Sophia Garcia', '2 itens • Delivery', 'Médio'],
    ],
  },
];

const recentOrders = [
  ['#10587', 'Cliente 1', 'Delivery', 'R$ 42,20', 'Novo', 'Baixa'],
  ['#10586', 'Cliente 2', 'Delivery', 'R$ 49,20', 'Novo', 'Alta'],
  ['#10585', 'Cliente 3', 'Retirada', 'R$ 36,70', 'Preparando', 'Média'],
  ['#10584', 'Cliente 4', 'Delivery', 'R$ 58,90', 'Pronto', 'Baixa'],
];

const summary = [
  { icon: <CheckCircle2 size={18} />, label: 'SLA de pedidos', sub: 'Hoje', value: '92%', change: '4,6%' },
  { icon: <ReceiptText size={18} />, label: 'Tickets concluídos', sub: 'Hoje', value: '37', change: '12,1%' },
  { icon: <Truck size={18} />, label: 'Entregas em rota', sub: 'Agora', value: '8', change: '2' },
  { icon: <Clock3 size={18} />, label: 'Tempo médio entrega', sub: 'Hoje', value: '32m', change: '-3m' },
];

function priorityTone(priority: string) {
  if (priority === 'Alto' || priority === 'Alta') return 'rose';
  if (priority === 'Médio' || priority === 'Média') return 'amber';
  return 'teal';
}

function statusTone(status: string) {
  if (status === 'Preparando') return 'amber';
  return 'teal';
}

function MetricCard({
  icon,
  label,
  value,
  change,
  danger = false,
  points = [12, 10, 14, 13, 18, 16, 22, 24],
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
  danger?: boolean;
  points?: number[];
}) {
  return (
    <article className={`${cardClass} p-4`}>
      <div className="flex items-start justify-between gap-3">
        <div className={`flex h-11 w-11 items-center justify-center rounded-full ${danger ? 'bg-rose-50 text-rose-500' : 'bg-[#E8F8F5] text-[#0F8F86]'}`}>
          {icon}
        </div>
        <Sparkline points={points} className="h-10 w-24" />
      </div>
      <p className="mt-3 text-sm font-bold text-[#082F35]">{label}</p>
      <p className="mt-2 text-[28px] font-black leading-none text-[#082F35]">{value}</p>
      <p className={`mt-2.5 text-[12px] font-black ${danger ? 'text-rose-500' : 'text-[#009D91]'}`}>↗ {change}</p>
    </article>
  );
}

export function OperacaoView() {
  return (
    <div className="w-full px-4 pb-6 pt-3 sm:px-6 lg:px-7">
      <div className="mx-auto max-w-[1760px] space-y-3.5">
        <section className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-[27px] font-black leading-tight text-[#082F35] sm:text-[30px]">Pedidos e operação</h2>
            <p className="mt-1.5 text-sm font-semibold text-[#64748B]">Monitore o fluxo ao vivo, acompanhe performance e mantenha cada experiência no nível certo.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-xl border border-[#E5ECEA] bg-white px-4 py-2.5 text-sm font-bold text-[#31516C] shadow-sm">
              <CalendarDays className="mr-2 inline" size={16} /> 12 de maio
            </button>
            <button className="rounded-xl border border-[#E5ECEA] bg-white px-4 py-2.5 text-sm font-bold text-[#31516C] shadow-sm">
              <Filter className="mr-2 inline" size={16} /> Filtros
            </button>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard icon={<PackageCheck size={21} />} label="Pedidos ativos" value={businessMetrics.operations.activeOrders} change="18,4% vs ontem" />
          <MetricCard icon={<Timer size={21} />} label="Tempo médio preparo" value={businessMetrics.operations.prepTime} change="-2m 12s vs ontem" />
          <MetricCard icon={<AlertTriangle size={21} />} label="Pedidos atrasados" value={businessMetrics.operations.delayedOrders} change="-33,3% vs ontem" danger />
          <MetricCard icon={<CheckCircle2 size={21} />} label="No prazo" value={businessMetrics.operations.onTimeRate} change="4,6% vs ontem" />
        </section>

        <section className="grid items-stretch gap-3.5 xl:grid-cols-[minmax(0,1.55fr)_minmax(380px,0.95fr)]">
          <article className={`${cardClass} p-4`}>
            <h3 className="mb-4 text-base font-black text-[#082F35]">Fila de pedidos ao vivo</h3>
            <div className="grid gap-3 lg:grid-cols-4">
              {queue.map((group) => (
                <div key={group.title} className="overflow-hidden rounded-xl border border-[#E5ECEA] bg-white">
                  <div className="flex items-center gap-2 border-b border-[#E5ECEA] p-3">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: group.color }} />
                    <b className="text-sm text-[#082F35]">{group.title}</b>
                    <span className="ml-auto rounded-md bg-slate-100 px-2 py-0.5 text-xs font-black text-[#31516C]">{group.count}</span>
                  </div>
                  <div className="divide-y divide-[#E5ECEA]">
                    {group.orders.map((item) => (
                      <div key={item[0]} className="p-3 text-xs">
                        <div className="flex justify-between gap-2">
                          <b className="text-[#082F35]">{item[0]}</b>
                          <span className="font-semibold text-[#64748B]">agora</span>
                        </div>
                        <p className="mt-1 font-bold text-[#31516C]">{item[1]}</p>
                        <div className="mt-1.5 flex items-center justify-between gap-2">
                          <span className="font-semibold text-[#64748B]">{item[2]}</span>
                          <Pill tone={priorityTone(item[3])}>{item[3]}</Pill>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="px-3 py-2.5 text-xs font-black text-[#0F8F86]">Ver todos →</button>
                </div>
              ))}
            </div>
          </article>

          <article className={`${cardClass} p-4`}>
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-base font-black text-[#082F35]">Volume por hora</h3>
              <button className="rounded-lg border border-[#E5ECEA] px-3 py-2 text-xs font-black text-[#31516C]">Hoje</button>
            </div>
            <div className="h-[205px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={volume} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="orderVolumeFill" x1="0" y1="0" x2="0" y2="1">
                      <stop stopColor="#7DD3C0" stopOpacity={0.38} />
                      <stop offset="1" stopColor="#7DD3C0" stopOpacity={0.04} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B', fontWeight: 700 }} dy={8} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B', fontWeight: 700 }} />
                  <Area dataKey="hoje" stroke="#20B5A7" strokeWidth={3} fill="url(#orderVolumeFill)" dot={false} isAnimationActive={false} />
                  <Line dataKey="ontem" stroke="#8DDDD1" strokeDasharray="5 5" strokeWidth={2} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 grid grid-cols-4 rounded-xl bg-[#F1F6F4] p-3 text-xs text-[#31516C]">
              <span>Total<br /><b className="text-[#082F35]">{businessMetrics.operations.hourlyTotal}</b></span>
              <span>Pico<br /><b className="text-[#082F35]">17-18h</b></span>
              <span>Média<br /><b className="text-[#082F35]">51</b></span>
              <span>Previsão<br /><b className="text-[#082F35]">{businessMetrics.operations.forecastOrders}</b></span>
            </div>
          </article>
        </section>

        <section className="grid items-stretch gap-3.5 xl:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.72fr)]">
          <article className={`${cardClass} overflow-hidden`}>
            <div className="flex items-center justify-between gap-3 p-4">
              <h3 className="text-base font-black text-[#082F35]">Pedidos recentes</h3>
              <button className="text-sm font-black text-[#0F8F86]">Ver todos →</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-xs">
                <thead className="bg-slate-50 text-[#64748B]">
                  <tr>
                    <th className="px-4 py-3">Pedido</th>
                    <th>Cliente</th>
                    <th>Canal</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Prioridade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5ECEA]">
                  {recentOrders.map((row) => (
                    <tr key={row[0]}>
                      <td className="px-4 py-3 font-black text-[#082F35]">{row[0]}</td>
                      <td className="font-bold text-[#31516C]">{row[1]}</td>
                      <td className="font-bold text-[#31516C]">{row[2]}</td>
                      <td className="font-bold text-[#31516C]">{row[3]}</td>
                      <td><Pill tone={statusTone(row[4])}>{row[4]}</Pill></td>
                      <td><Pill tone={priorityTone(row[5])}>{row[5]}</Pill></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className={`${cardClass} p-4`}>
            <h3 className="mb-4 text-base font-black text-[#082F35]">Resumo operacional</h3>
            <div className="space-y-3">
              {summary.map((item) => (
                <div key={item.label} className="grid grid-cols-[36px_1fr_auto_auto] items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8F8F5] text-[#0F8F86]">{item.icon}</span>
                  <span>
                    <b className="block text-sm text-[#082F35]">{item.label}</b>
                    <span className="text-xs font-bold text-[#64748B]">{item.sub}</span>
                  </span>
                  <b className="text-lg text-[#082F35]">{item.value}</b>
                  <span className="text-xs font-black text-[#009D91]">↗ {item.change}</span>
                </div>
              ))}
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}
