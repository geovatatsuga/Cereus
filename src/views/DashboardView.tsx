import React, { useMemo, useState } from 'react';
import {
  AlertTriangle, ArrowDownRight, ArrowUpRight, Calendar, ChevronRight, DollarSign,
  Filter, Headphones, PieChart as PieIcon, Send, Target, TrendingUp, Users, Wallet, Zap,
} from 'lucide-react';
import {
  Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import { KpiCard } from '../components/ui/KpiCard';
import {
  campaigns, clients, formatCurrency, funnelData, performanceData, segmentData, totals,
} from '../data/mockData';

export function DashboardView() {
  const [channel, setChannel] = useState('Todos');
  const highRiskClients = clients.filter((client) => client.churnRisk >= 70);
  const totalRisk = highRiskClients.reduce((sum, client) => sum + client.spent, 0);
  const projectedRecovery = Math.round(totalRisk * 0.34);

  const funnelConversion = useMemo(() => {
    const first = funnelData[0].count;
    const last = funnelData[funnelData.length - 1].count;
    return ((last / first) * 100).toFixed(2);
  }, []);

  return (
    <div className="p-4 sm:p-8 pb-20 max-w-7xl mx-auto w-full space-y-8 relative z-0">
      <div className="flex flex-col xl:flex-row justify-between gap-4 bg-white/75 p-3 rounded-2xl border border-white/70 shadow-sm backdrop-blur-sm">
        <div className="flex flex-wrap items-center gap-2">
          <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm text-sm font-bold text-slate-700">
            <Calendar size={18} className="text-teal-600" />
            Maio de 2026
            <ChevronRight size={14} className="text-slate-400 rotate-90" />
          </button>
          {['Todos', 'WhatsApp', 'iFood', 'Site'].map((item) => (
            <button
              key={item}
              onClick={() => setChannel(item)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-bold transition-all ${
                channel === item
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-100 hover:border-teal-200'
              }`}
            >
              <Filter size={16} className={channel === item ? 'text-teal-300' : 'text-teal-600'} />
              {item}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:flex sm:items-center gap-3 text-sm">
          <div className="bg-emerald-50 text-emerald-700 px-3 py-2 rounded-xl font-bold">Dados sincronizados</div>
          <div className="bg-slate-50 text-slate-500 px-3 py-2 rounded-xl font-medium">Atualizado hoje, 18:45</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4">
        <div className="xl:col-span-2">
          <KpiCard title="Receita Bruta" value={formatCurrency(totals.revenue)} change="+14,2%" isPositive icon={<DollarSign size={20} />} borderTop="border-t-4 border-t-teal-500" data={performanceData.map((d) => d.receita)} />
        </div>
        <KpiCard title="Lucro Bruto" value={formatCurrency(totals.grossProfit)} change="+10,1%" isPositive icon={<Wallet size={20} />} borderTop="border-t-4 border-t-emerald-500" data={[22, 24, 21, 25, 27, 28, 29]} />
        <KpiCard title="CAC" value={formatCurrency(totals.cac)} change="-6%" isPositive icon={<Target size={20} />} borderTop="border-t-4 border-t-blue-400" data={[35, 34, 32, 31, 30, 29, 28]} />
        <KpiCard title="LTV/CAC" value="66x" change="+4x" isPositive icon={<TrendingUp size={20} />} borderTop="border-t-4 border-t-cyan-400" data={[48, 52, 54, 58, 61, 64, 66]} />
        <KpiCard title="Chamados Abertos" value={String(totals.openTickets)} change="+3 hoje" isPositive={false} icon={<Headphones size={20} />} highlight borderTop="border-t-0" data={[8, 10, 9, 11, 12, 11, 14]} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <section className="xl:col-span-2 bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-teal-600 mb-2">Prioridade</p>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Recuperar clientes valiosos</h2>
            </div>
            <button className="bg-slate-900 hover:bg-teal-700 text-white px-4 py-3 rounded-xl text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2">
              <Send size={16} className="text-teal-300" />
              Revisar disparo
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            {[
              ['Clientes', highRiskClients.length],
              ['LTV em risco', formatCurrency(totalRisk)],
              ['Recuperavel', formatCurrency(projectedRecovery)],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-slate-50 border border-slate-100 p-4">
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">{label}</p>
                <p className="text-xl font-black text-slate-900 mt-1">{value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {highRiskClients.map((client) => (
              <div key={client.id} className="rounded-2xl border border-rose-100 bg-rose-50/50 p-4">
                <div className="flex items-center gap-3 mb-3">
                  <img src={`https://api.dicebear.com/7.x/fun-emoji/svg?seed=${client.avatarSeed}`} alt={client.name} className="w-10 h-10 rounded-full bg-white" />
                  <div>
                    <p className="font-black text-slate-800 text-sm">{client.name}</p>
                    <p className="text-xs font-bold text-rose-600">{client.churnRisk}% risco</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 font-medium">Ultimo pedido ha {client.lastOrderDays} dias</p>
                <p className="text-sm font-black text-slate-800 mt-1">LTV {formatCurrency(client.spent)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-900 rounded-[1.5rem] p-6 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
            <DollarSign size={150} className="rotate-12 translate-x-4 -translate-y-4" />
          </div>
          <h3 className="text-slate-300 font-bold text-sm uppercase tracking-wider mb-4 border-b border-slate-700 pb-2">Caixa projetado</h3>
          <div className="space-y-4 relative z-10">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-sm font-medium flex items-center gap-1.5"><ArrowDownRight size={16} className="text-emerald-400" /> A receber</span>
              <span className="font-bold text-emerald-400">R$ 14.250</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-sm font-medium flex items-center gap-1.5"><ArrowUpRight size={16} className="text-rose-400" /> A pagar</span>
              <span className="font-bold text-rose-400">R$ 8.900</span>
            </div>
            <div className="pt-3 border-t border-slate-700 flex justify-between items-center">
              <span className="text-slate-300 font-bold">Saldo 7 dias</span>
              <span className="text-xl font-black">R$ 5.350</span>
            </div>
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h3 className="font-black text-xl text-slate-800">Base de clientes</h3>
              <p className="text-sm font-medium text-slate-400">1.200 perfis segmentados</p>
            </div>
            <PieIcon className="text-teal-600" size={22} />
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={segmentData} innerRadius={55} outerRadius={82} paddingAngle={2} dataKey="value" stroke="none" cornerRadius={4}>
                  {segmentData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {segmentData.map((seg) => (
              <div key={seg.name} className="flex justify-between items-center text-sm">
                <span className="font-bold text-slate-600 flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: seg.color }} />{seg.name}</span>
                <span className="font-black text-slate-800">{seg.value}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="lg:col-span-2 bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-6">
            <div>
              <h3 className="font-black text-xl text-slate-800">Pedidos, receita e inatividade</h3>
              <p className="text-sm font-medium text-slate-400">Sinais operacionais dos ultimos 7 dias</p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-bold">
              <span className="bg-teal-50 text-teal-700 px-2 py-1 rounded-lg">Conversao {funnelConversion}%</span>
              <span className="bg-rose-50 text-rose-600 px-2 py-1 rounded-lg">Inativos monitorados</span>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPedidos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0f766e" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#0f766e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #f1f5f9' }} />
                <Area type="monotone" dataKey="inativos" name="Inativos" stroke="#f43f5e" strokeWidth={2} fill="transparent" />
                <Area type="monotone" dataKey="pedidos" name="Pedidos" stroke="#0f766e" strokeWidth={4} fill="url(#colorPedidos)" activeDot={{ r: 6, fill: '#0f766e' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <section className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between gap-4 mb-5">
          <div>
            <h3 className="font-black text-xl text-slate-800">Campanhas com impacto</h3>
            <p className="text-sm font-medium text-slate-400">ROI, publico e receita esperada</p>
          </div>
          <button className="text-teal-700 font-bold text-sm bg-teal-50 px-4 py-2 rounded-xl flex items-center gap-1">
            Ver campanhas <ChevronRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {campaigns.map((campaign) => (
            <div key={campaign.name} className="border border-slate-100 rounded-2xl p-4 bg-slate-50/60">
              <div className="flex items-center justify-between mb-3">
                <p className="font-black text-slate-800">{campaign.name}</p>
                <Zap size={16} className="text-teal-600" />
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{campaign.audience}</p>
              <div className="flex justify-between items-end mt-4">
                <div>
                  <p className="text-xs text-slate-500 font-medium">Receita prevista</p>
                  <p className="font-black text-slate-900">{formatCurrency(campaign.projectedRevenue)}</p>
                </div>
                <span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-lg text-xs font-black">ROI {campaign.roi}x</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {totals.openTickets > 10 && (
        <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
          <AlertTriangle size={20} className="shrink-0 mt-0.5" />
          <p className="text-sm font-bold">
            {totals.openTickets} chamados abertos. Resolva os criticos antes de campanha grande.
          </p>
        </div>
      )}
    </div>
  );
}
