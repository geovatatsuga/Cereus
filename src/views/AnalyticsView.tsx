import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowDownRight, ArrowUpRight, BarChart3, Calendar, DollarSign, Filter, Layers,
  PieChart as PieIcon, ShoppingBag, Users,
} from 'lucide-react';
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, LineChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import { formatCurrency, funnelData, revenueData } from '../data/mockData';

const cohortData = [
  { cohort: 'Jan', m0: 100, m1: 58, m2: 42, m3: 31 },
  { cohort: 'Fev', m0: 100, m1: 61, m2: 45, m3: 36 },
  { cohort: 'Mar', m0: 100, m1: 64, m2: 51, m3: 0 },
  { cohort: 'Abr', m0: 100, m1: 69, m2: 0, m3: 0 },
  { cohort: 'Mai', m0: 100, m1: 0, m2: 0, m3: 0 },
];

const channelRoi = [
  { channel: 'WhatsApp', spend: 1200, revenue: 18400, roi: 15.3 },
  { channel: 'iFood', spend: 2800, revenue: 22100, roi: 7.9 },
  { channel: 'Instagram', spend: 1900, revenue: 9500, roi: 5 },
  { channel: 'E-mail', spend: 420, revenue: 3800, roi: 9 },
];

export function AnalyticsView() {
  const [activeTab, setActiveTab] = useState<'financeiro' | 'funil' | 'cohort'>('financeiro');
  const totals = useMemo(() => {
    const revenue = revenueData.reduce((sum, item) => sum + item.receita, 0);
    const expenses = revenueData.reduce((sum, item) => sum + item.despesas, 0);
    return { revenue, expenses, profit: revenue - expenses };
  }, []);

  return (
    <div className="p-4 sm:p-8 pb-20 max-w-7xl mx-auto w-full space-y-8 relative z-0">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Metricas e BI</h2>
          <p className="text-slate-500 font-medium">Funil, cohorts, ROI por canal e leitura financeira para decisao.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 shadow-sm hover:bg-slate-50 transition-colors">
            <Calendar size={16} /> Ultimos 6 meses
          </button>
          <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 shadow-sm hover:bg-slate-50 transition-colors">
            <Filter size={16} /> Filtros
          </button>
        </div>
      </div>

      <div className="flex bg-slate-100 p-1 rounded-2xl w-full md:w-fit shadow-inner border border-slate-200/50">
        {[
          ['financeiro', 'Financeiro'],
          ['funil', 'Funil e canais'],
          ['cohort', 'Retencao'],
        ].map(([id, label]) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as any)}
            className={`flex-1 md:flex-none px-5 py-2 rounded-xl text-sm font-black transition-all ${
              activeTab === id ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          ['Receita Total', formatCurrency(totals.revenue), '+21%', <DollarSign size={20} />, 'emerald'],
          ['Lucro', formatCurrency(totals.profit), '+18%', <BarChart3 size={20} />, 'teal'],
          ['Pedidos Pagos', '840', '+8%', <ShoppingBag size={20} />, 'blue'],
          ['Conversao', '6,72%', '-2%', <PieIcon size={20} />, 'rose'],
        ].map(([title, value, delta, icon, color]) => (
          <div key={String(title)} className="bg-white rounded-[1.5rem] p-5 shadow-sm border border-slate-100">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2.5 bg-${color}-50 rounded-xl text-${color}-600`}>{icon}</div>
              <span className={`text-xs font-black px-2 py-1 rounded-md flex items-center gap-1 ${String(delta).startsWith('+') ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'}`}>
                {String(delta).startsWith('+') ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {delta}
              </span>
            </div>
            <h4 className="text-slate-500 text-sm font-bold mb-1">{title}</h4>
            <p className="text-3xl font-black text-slate-800 tracking-tight">{value}</p>
          </div>
        ))}
      </div>

      {activeTab === 'financeiro' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100">
            <h3 className="text-xl font-black text-slate-800">Evolucao financeira</h3>
            <p className="text-sm text-slate-500 font-medium mb-6">Receita, despesas e lucro por mes</p>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="receita" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0d9488" stopOpacity={0.25} /><stop offset="95%" stopColor="#0d9488" stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Area type="monotone" dataKey="despesas" name="Despesas" stroke="#94a3b8" strokeWidth={2} fill="transparent" />
                  <Area type="monotone" dataKey="receita" name="Receita" stroke="#0d9488" strokeWidth={3} fill="url(#receita)" />
                  <Line type="monotone" dataKey="lucro" name="Lucro" stroke="#0284c7" strokeWidth={2} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>
          <aside className="bg-slate-900 rounded-[1.5rem] p-6 text-white">
            <Layers size={28} className="text-teal-300 mb-4" />
            <h3 className="font-black text-xl mb-2">Leitura executiva</h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-5">A margem cresce quando o WhatsApp ganha participacao, mas chamados abertos subiram. Escale campanhas de alto LTV antes de gerar volume frio.</p>
            <div className="space-y-3">
              <div className="flex justify-between text-sm"><span className="text-slate-400">Margem media</span><strong>38%</strong></div>
              <div className="flex justify-between text-sm"><span className="text-slate-400">Canal mais rentavel</span><strong>WhatsApp</strong></div>
              <div className="flex justify-between text-sm"><span className="text-slate-400">Risco</span><strong className="text-amber-300">Suporte</strong></div>
            </div>
          </aside>
        </motion.div>
      )}

      {activeTab === 'funil' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100">
            <h3 className="text-xl font-black text-slate-800">Funil de conversao</h3>
            <p className="text-sm text-slate-500 font-medium mb-6">Da visita ao pedido pago</p>
            <div className="space-y-4">
              {funnelData.map((item, index) => (
                <div key={item.step}>
                  <div className="flex justify-between text-xs font-black mb-1">
                    <span className="text-slate-600">{item.step}</span>
                    <span>{item.count.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="h-9 bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${(item.count / funnelData[0].count) * 100}%` }} className="h-full rounded-xl" style={{ backgroundColor: item.color }} />
                  </div>
                  {index < funnelData.length - 1 && <p className="text-center text-[10px] font-black text-slate-400 mt-1">{Math.round((funnelData[index + 1].count / item.count) * 100)}% seguem</p>}
                </div>
              ))}
            </div>
          </section>
          <section className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100">
            <h3 className="text-xl font-black text-slate-800">ROI por canal</h3>
            <p className="text-sm text-slate-500 font-medium mb-6">Receita atribuida contra custo</p>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={channelRoi}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="channel" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 700 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <Tooltip />
                  <Bar dataKey="roi" name="ROI" radius={[8, 8, 0, 0]}>
                    {channelRoi.map((item) => <Cell key={item.channel} fill={item.roi > 10 ? '#0f766e' : '#38bdf8'} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </motion.div>
      )}

      {activeTab === 'cohort' && (
        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100">
          <div className="flex items-start gap-3 mb-6">
            <Users className="text-teal-600" size={24} />
            <div>
              <h3 className="text-xl font-black text-slate-800">Cohorts de retencao</h3>
              <p className="text-sm text-slate-500 font-medium">Percentual de clientes que voltam a comprar apos a primeira compra.</p>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-2 min-w-[620px] overflow-x-auto">
            <div className="text-xs font-black text-slate-400 uppercase">Safra</div>
            {['M0', 'M1', 'M2', 'M3'].map((month) => <div key={month} className="text-xs font-black text-slate-400 uppercase text-center">{month}</div>)}
            {cohortData.map((row) => (
              <React.Fragment key={row.cohort}>
                <div className="font-black text-slate-700 py-3">{row.cohort}</div>
                {[row.m0, row.m1, row.m2, row.m3].map((value, index) => (
                  <div key={`${row.cohort}-${index}`} className={`py-3 rounded-xl text-center text-sm font-black ${value === 0 ? 'bg-slate-50 text-slate-300' : value > 60 ? 'bg-teal-100 text-teal-800' : value > 40 ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'}`}>
                    {value ? `${value}%` : '-'}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
}
