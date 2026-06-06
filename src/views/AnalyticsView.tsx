import React from 'react';
import {
  CalendarDays,
  Heart,
  Mail,
  Share2,
  ShieldCheck,
  Target,
  TrendingUp,
  X,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { cardClass, Donut, KpiTile, pageInner, pageShell, Pill, SectionTitle } from '../components/ui/DashboardWidgets';
import { businessMetrics } from '../data/businessMetrics';

const revenueTrend = [
  { day: '6 mai', receita: 6420, lucro: 3320, pedidos: 92, ticket: 69.8 },
  { day: '7 mai', receita: 7840, lucro: 4120, pedidos: 106, ticket: 74.0 },
  { day: '8 mai', receita: 9820, lucro: 5310, pedidos: 128, ticket: 76.7 },
  { day: '9 mai', receita: 11140, lucro: 6080, pedidos: 143, ticket: 77.9 },
  { day: '10 mai', receita: 10380, lucro: 5710, pedidos: 132, ticket: 78.6 },
  { day: '11 mai', receita: 11870, lucro: 6540, pedidos: 151, ticket: 78.6 },
  { day: '12 mai', receita: 16842, lucro: 9180, pedidos: 203, ticket: 83.0 },
];

const channelData = [
  { canal: 'E-mail', receita: 42316, pedidos: 1842, roi: 4.7, ticket: 23.01, status: 'Melhor canal' },
  { canal: 'WhatsApp', receita: 22140, pedidos: 926, roi: 3.4, ticket: 23.91, status: 'Forte' },
  { canal: 'Push', receita: 12658, pedidos: 612, roi: 2.1, ticket: 20.68, status: 'Bom' },
  { canal: 'Organico', receita: 7823, pedidos: 426, roi: 1.6, ticket: 18.36, status: 'Medio' },
  { canal: 'Apps', receita: 2587, pedidos: 186, roi: 1.2, ticket: 13.92, status: 'Atencao' },
];

const funnelData = [
  { etapa: 'Visitantes', valor: 62842, taxa: '100%' },
  { etapa: 'Engajados', valor: 31208, taxa: '49,7%' },
  { etapa: 'Carrinho', valor: 18234, taxa: '29,0%' },
  { etapa: 'Pedidos', valor: 6842, taxa: '10,9%' },
  { etapa: 'Receita', valor: 3908, taxa: '6,2%' },
];

const marginData = [
  { item: 'Receita', valor: 83631, color: '#20B5A7' },
  { item: 'CMV', valor: 37949, color: '#BDEDE5' },
  { item: 'Marketing', valor: 9842, color: '#FDCB6E' },
  { item: 'Operacao', valor: 6218, color: '#93C5FD' },
  { item: 'Lucro liquido', valor: 29622, color: '#053B3A' },
];

const cohortRows = [
  { week: '1-7 abr', clientes: 2430, w0: 100, w1: 47, w2: 29, w3: 21, w4: 16, w5: 12 },
  { week: '8-14 abr', clientes: 2688, w0: 100, w1: 46, w2: 28, w3: 20, w4: 15, w5: 11 },
  { week: '15-21 abr', clientes: 2514, w0: 100, w1: 48, w2: 30, w3: 22, w4: 16, w5: null },
  { week: '22-28 abr', clientes: 2760, w0: 100, w1: 49, w2: 31, w3: 23, w4: null, w5: null },
  { week: '29 abr-5 mai', clientes: 2450, w0: 100, w1: 51, w2: 34, w3: null, w4: null, w5: null },
];

const money = (value: number) => `R$ ${value.toLocaleString('pt-BR')}`;
const numberPt = (value: number) => value.toLocaleString('pt-BR');

function AnalyticsTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-[#E5ECEA] bg-white px-3 py-2 text-xs shadow-lg">
      <p className="mb-1 font-bold text-[#082F35]">{label}</p>
      {payload.map((item) => (
        <p key={item.name} className="font-semibold text-[#64748B]">
          <span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
          {item.name}: {item.name.toLowerCase().includes('roi') ? `${item.value}x` : money(item.value)}
        </p>
      ))}
    </div>
  );
}

function CohortCell({ value }: { value: number | null }) {
  if (value === null) return <td className="p-2 text-center text-xs font-bold text-slate-300">-</td>;

  const opacity = Math.max(0.16, value / 100);
  return (
    <td className="p-1">
      <span
        className="block rounded-lg py-2 text-center text-xs font-bold text-[#082F35]"
        style={{ backgroundColor: `rgba(32, 181, 167, ${opacity})` }}
      >
        {value}%
      </span>
    </td>
  );
}

export function AnalyticsView() {
  return (
    <div className={`${pageShell} pb-5 pt-4`}>
      <div className={`${pageInner} max-w-[1360px] space-y-3.5`}>
        <section className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle title="Resultados" subtitle="Acompanhe performance, retenção e lucratividade em todo o delivery." />
          <div className="flex gap-3">
            <button className="rounded-xl border border-[#E5ECEA] bg-white px-4 py-2.5 text-sm font-bold text-[#64748B]">
              <CalendarDays className="mr-2 inline" size={16} />
              12 de maio
            </button>
            <button className="rounded-xl border border-[#E5ECEA] bg-white px-4 py-2.5 text-sm font-bold text-[#64748B]">
              <Share2 className="mr-2 inline" size={16} />
              Compartilhar
            </button>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 [&_article]:p-3 [&_article_p:nth-of-type(2)]:text-[25px]">
          <KpiTile icon={<Target size={20} />} label="Receita total" value={businessMetrics.analytics.totalRevenue} change="22,7% vs 30 dias" />
          <KpiTile icon={<ShieldCheck size={20} />} label="Margem bruta" value={businessMetrics.analytics.grossMargin} change="3,8pp vs 30 dias" />
          <KpiTile icon={<Heart size={20} />} label="Taxa de retenção" value={businessMetrics.analytics.retentionRate} change="5,6pp vs 30 dias" />
          <KpiTile icon={<Target size={20} />} label="ROI por canal" value={businessMetrics.campaigns.roi} change="18,3% vs 30 dias" />
        </section>

        <section className={`${cardClass} bg-[#E8F8F5] p-4`}>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-[#0F8F86]">
                <Mail size={25} />
              </span>
              <div>
                <p className="text-sm font-bold text-[#0F8F86]">Destaque do período</p>
                <h3 className="text-base font-bold text-[#082F35]">E-mail é o canal com melhor performance: ROI de {businessMetrics.campaigns.roi}.</h3>
                <p className="mt-1 max-w-3xl text-xs font-semibold text-[#42526B]">
                  Considere realocar verba dos apps de delivery para canais próprios. Apps têm o menor ROI, com 1,2x e ticket médio de R$ 13,92.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="rounded-lg bg-[#053B3A] px-5 py-2.5 text-sm font-bold text-white">Otimizar orçamento</button>
              <button className="text-sm font-bold text-[#0F8F86]">Ver relatório completo →</button>
              <X size={16} className="text-[#64748B]" />
            </div>
          </div>
        </section>

        <section className="grid items-stretch gap-3 xl:grid-cols-[1.15fr_0.85fr]">
          <article className={`${cardClass} p-4`}>
            <div className="mb-2.5 flex items-start justify-between gap-3">
              <div>
                <h3 className="font-bold text-[#082F35]">Tendência de receita e lucro</h3>
                <p className="mt-1 text-xs font-semibold text-[#64748B]">Receita, lucro bruto e volume de pedidos nos últimos 7 dias.</p>
              </div>
              <div className="grid grid-cols-3 gap-2 text-right text-xs">
                <span><b className="block text-base text-[#082F35]">{businessMetrics.analytics.totalRevenue}</b>Receita</span>
                <span><b className="block text-base text-[#082F35]">{businessMetrics.analytics.grossProfit}</b>Lucro</span>
                <span><b className="block text-base text-[#082F35]">955</b>Pedidos</span>
              </div>
            </div>
            <div className="h-[155px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={revenueTrend} margin={{ top: 12, right: 8, left: 0, bottom: 8 }}>
                  <defs>
                    <linearGradient id="analyticsRevenueFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7DD3C0" stopOpacity={0.42} />
                      <stop offset="95%" stopColor="#7DD3C0" stopOpacity={0.04} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#E5ECEA" vertical={false} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 11, fontWeight: 600 }} />
                  <YAxis yAxisId="money" axisLine={false} tickLine={false} tickFormatter={(v) => `R$ ${v / 1000}K`} tick={{ fill: '#64748B', fontSize: 11, fontWeight: 600 }} />
                  <YAxis yAxisId="orders" orientation="right" axisLine={false} tickLine={false} tickFormatter={(v) => `${v}`} tick={{ fill: '#64748B', fontSize: 11, fontWeight: 600 }} />
                  <Tooltip content={<AnalyticsTooltip />} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 12, fontWeight: 700 }} />
                  <Area yAxisId="money" type="monotone" name="Receita" dataKey="receita" stroke="#20B5A7" strokeWidth={3} fill="url(#analyticsRevenueFill)" dot={{ r: 3, fill: '#fff', stroke: '#20B5A7', strokeWidth: 2 }} isAnimationActive={false} />
                  <Line yAxisId="money" type="monotone" name="Lucro" dataKey="lucro" stroke="#053B3A" strokeWidth={2.5} dot={{ r: 3, fill: '#fff', stroke: '#053B3A', strokeWidth: 2 }} isAnimationActive={false} />
                  <Bar yAxisId="orders" name="Pedidos" dataKey="pedidos" fill="#BDEDE5" radius={[6, 6, 0, 0]} barSize={18} isAnimationActive={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-3 rounded-xl bg-[#F1F6F4] p-2.5 text-xs sm:grid-cols-4">
              <span>Melhor dia<br /><b className="text-[#082F35]">{businessMetrics.analytics.bestDayRevenue}</b></span>
              <span>Média diária<br /><b className="text-[#082F35]">{businessMetrics.analytics.averageRevenue}</b></span>
              <span>Ticket medio<br /><b className="text-[#082F35]">R$ 76,80</b></span>
              <span>Margem<br /><b className="text-[#0F8F86]">{businessMetrics.analytics.grossMargin}</b></span>
            </div>
          </article>

          <article className={`${cardClass} p-4`}>
            <div className="mb-2.5 flex items-center justify-between">
              <h3 className="font-bold text-[#082F35]">Performance por canal</h3>
              <button className="text-sm font-bold text-[#0F8F86]">Ver relatório →</button>
            </div>
            <div className="h-[165px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={channelData} layout="vertical" margin={{ top: 0, right: 22, left: 4, bottom: 0 }}>
                  <CartesianGrid stroke="#E5ECEA" horizontal={false} />
                  <XAxis type="number" axisLine={false} tickLine={false} tickFormatter={(v) => `R$ ${v / 1000}K`} tick={{ fill: '#64748B', fontSize: 11, fontWeight: 600 }} />
                  <YAxis type="category" dataKey="canal" axisLine={false} tickLine={false} width={78} tick={{ fill: '#082F35', fontSize: 12, fontWeight: 700 }} />
                  <Tooltip formatter={(value) => money(Number(value))} cursor={{ fill: '#F1F6F4' }} />
                  <Bar dataKey="receita" radius={[0, 8, 8, 0]} barSize={18} isAnimationActive={false}>
                    {channelData.map((item) => <Cell key={item.canal} fill={item.canal === 'Apps' ? '#FCA5A5' : '#20B5A7'} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 overflow-hidden rounded-xl border border-[#E5ECEA]">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-[#64748B]">
                  <tr>
                    <th className="p-2">Canal</th>
                    <th>Receita</th>
                    <th>Pedidos</th>
                    <th>ROI</th>
                    <th>Ticket</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5ECEA]">
                  {channelData.map((item) => (
                    <tr key={item.canal}>
                      <td className="p-2 font-bold text-[#082F35]">{item.canal}</td>
                      <td className="font-semibold text-[#082F35]">{money(item.receita)}</td>
                      <td className="font-semibold text-[#082F35]">{numberPt(item.pedidos)}</td>
                      <td className="font-bold text-[#082F35]">{item.roi}x</td>
                      <td className="font-semibold text-[#082F35]">R$ {item.ticket.toFixed(2).replace('.', ',')}</td>
                      <td>
                        <Pill tone={item.status === 'Atencao' ? 'rose' : item.status === 'Medio' ? 'amber' : 'teal'}>{item.status}</Pill>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </section>

        <section className="grid items-stretch gap-3 xl:grid-cols-[0.9fr_1.1fr_0.9fr]">
          <article className={`${cardClass} p-4`}>
            <h3 className="mb-1 font-bold text-[#082F35]">Visão de conversão</h3>
            <p className="mb-2 text-xs font-semibold text-[#64748B]">Mostra onde o cliente cai antes do pedido.</p>
            <div className="space-y-2">
              {funnelData.map((item, index) => {
                const width = `${Math.max(18, (item.valor / funnelData[0].valor) * 100)}%`;
                return (
                  <div key={item.etapa}>
                    <div className="mb-1 flex justify-between text-xs font-bold text-[#64748B]">
                      <span>{item.etapa}</span>
                      <span>{numberPt(item.valor)} · {item.taxa}</span>
                    </div>
                    <div className="h-6 rounded-lg bg-[#F1F6F4]">
                      <div className="flex h-6 items-center justify-end rounded-lg bg-[#20B5A7] pr-2 text-[11px] font-bold text-white" style={{ width }}>
                        {index === funnelData.length - 1 ? 'converteu' : ''}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 rounded-xl bg-[#F1F6F4] p-2.5 text-xs font-semibold text-[#42526B]">
              <b className="text-[#082F35]">6,2%</b> de conversão geral. O maior vazamento está entre engajamento e carrinho.
            </div>
          </article>

          <article className={`${cardClass} overflow-hidden p-4`}>
            <div className="mb-2.5 flex items-start justify-between gap-3">
              <div>
                <h3 className="font-bold text-[#082F35]">Retenção e cohort</h3>
                <p className="mt-1 text-xs font-semibold text-[#64748B]">Percentual de clientes que voltaram a pedir nas semanas seguintes.</p>
              </div>
              <Pill>Recompra 38,7%</Pill>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[580px] text-left text-xs">
                <thead className="text-[#64748B]">
                  <tr>
                    <th className="pb-2">Cohort</th>
                    <th className="pb-2">Clientes</th>
                    {['S0', 'S1', 'S2', 'S3', 'S4', 'S5'].map((week) => <th key={week} className="pb-2 text-center">{week}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {cohortRows.map((row) => (
                    <tr key={row.week} className="border-t border-[#E5ECEA]">
                      <td className="py-1.5 font-bold text-[#082F35]">{row.week}</td>
                      <td className="py-1.5 font-semibold text-[#64748B]">{numberPt(row.clientes)}</td>
                      <CohortCell value={row.w0} />
                      <CohortCell value={row.w1} />
                      <CohortCell value={row.w2} />
                      <CohortCell value={row.w3} />
                      <CohortCell value={row.w4} />
                      <CohortCell value={row.w5} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 grid grid-cols-3 rounded-xl bg-[#F1F6F4] p-2.5 text-xs">
              <span>Clientes analisados<br /><b className="text-[#082F35]">12.842</b></span>
              <span>Retenção 30d<br /><b className="text-[#082F35]">72,4%</b></span>
              <span>Queda S1→S2<br /><b className="text-amber-600">-18pp</b></span>
            </div>
          </article>

          <article className={`${cardClass} p-4`}>
            <h3 className="mb-1 font-bold text-[#082F35]">Lucro e margem</h3>
            <p className="mb-2 text-xs font-semibold text-[#64748B]">Decomposição simples para saber onde a margem está indo.</p>
            <Donut data={[{ name: 'Lucro', value: 54.6, color: '#43C8B6' }, { name: 'Custos', value: 45.4, color: '#D8F3EE' }]} center={businessMetrics.analytics.grossMargin} sub="Margem" size={130} />
            <div className="space-y-1.5 text-xs font-semibold text-[#42526B]">
              {marginData.map((item) => (
                <p key={item.item} className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />{item.item}</span>
                  <b className="text-[#082F35]">{money(item.valor)}</b>
                </p>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-xl bg-[#E8F8F5] p-2.5 text-xs font-bold text-[#0F8F86]">
              <TrendingUp size={16} /> Margem subiu 3,8pp com maior volume próprio.
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}
