import React from 'react';
import { AlertTriangle, ArrowRight, Clock, MessageCircle, PackageSearch, ShoppingBag, Wallet } from 'lucide-react';
import { campaigns, formatCurrency, operations, totals } from '../data/mockData';

type HojeViewProps = {
  onNavigate?: (tab: string) => void;
};

export function HojeView({ onNavigate }: HojeViewProps) {
  const lateOrders = operations.filter((order) => order.late);
  const openOrders = operations.length;
  const averageTicket = Math.round(totals.revenue / 594);
  const bestCampaign = campaigns[0];

  const kpis = [
    { label: 'Receita hoje', value: 'R$ 4.820', hint: '+12% vs ontem', icon: <Wallet size={19} />, tone: 'teal' },
    { label: 'Pedidos hoje', value: '84', hint: `${openOrders} abertos agora`, icon: <ShoppingBag size={19} />, tone: 'sky' },
    { label: 'Ticket medio', value: formatCurrency(averageTicket), hint: 'meta R$ 150', icon: <PackageSearch size={19} />, tone: 'amber' },
    { label: 'Atrasados', value: String(lateOrders.length), hint: 'acao imediata', icon: <AlertTriangle size={19} />, tone: 'rose' },
  ];

  const alerts = [
    { label: 'Reforce 19h-21h', icon: <Clock size={16} />, tone: 'teal' },
    { label: '6 atendimentos', icon: <MessageCircle size={16} />, tone: 'sky' },
    { label: '1 atraso em rota', icon: <AlertTriangle size={16} />, tone: 'rose' },
  ];

  return (
    <div className="p-4 sm:p-8 pb-20 max-w-7xl mx-auto w-full space-y-6 relative z-0">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-wider text-teal-700 mb-2">Hoje</p>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Painel rapido</h2>
        </div>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <article key={kpi.label} className="bg-white rounded-[1.25rem] p-5 border border-slate-100 shadow-sm">
            <div className="flex items-start justify-between gap-3 mb-5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                kpi.tone === 'rose' ? 'bg-rose-50 text-rose-700' : kpi.tone === 'amber' ? 'bg-amber-50 text-amber-700' : kpi.tone === 'sky' ? 'bg-sky-50 text-sky-700' : 'bg-teal-50 text-teal-700'
              }`}>
                {kpi.icon}
              </div>
              {kpi.tone === 'rose' && lateOrders.length > 0 && <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />}
            </div>
            <p className="text-xs font-black uppercase tracking-wider text-slate-400">{kpi.label}</p>
            <p className="text-3xl font-black text-slate-900 mt-1">{kpi.value}</p>
            <p className="text-sm font-bold text-slate-500 mt-2">{kpi.hint}</p>
          </article>
        ))}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <article className="xl:col-span-2 bg-slate-900 rounded-[1.5rem] p-5 sm:p-6 text-white shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-teal-300 mb-2">Proximo passo</p>
              <h3 className="text-2xl font-black tracking-tight">Reforce o jantar</h3>
            </div>
            <div className="grid grid-cols-3 gap-2 min-w-full md:min-w-[360px]">
              {alerts.map((alert) => (
                <div key={alert.label} className="bg-white/10 border border-white/10 rounded-2xl p-3">
                  <div className={`mb-2 ${alert.tone === 'rose' ? 'text-rose-300' : alert.tone === 'sky' ? 'text-sky-300' : 'text-teal-300'}`}>{alert.icon}</div>
                  <p className="text-xs font-black leading-tight">{alert.label}</p>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="bg-white rounded-[1.5rem] p-5 border border-slate-100 shadow-sm">
          <p className="text-xs font-black uppercase tracking-wider text-teal-700 mb-2">Crescimento</p>
          <h3 className="font-black text-lg text-slate-900">{bestCampaign.name}</h3>
          <div className="flex items-end justify-between gap-3 mt-5">
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400">Receita prevista</p>
              <p className="text-2xl font-black text-slate-900">{formatCurrency(bestCampaign.projectedRevenue)}</p>
            </div>
            <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg text-xs font-black">{bestCampaign.roi}x ROI</span>
          </div>
          <button
            onClick={() => onNavigate?.('campanhas')}
            className="w-full mt-5 bg-white border border-slate-200 hover:bg-teal-50 hover:border-teal-200 text-slate-800 rounded-xl py-3 text-sm font-black flex items-center justify-center gap-2 transition-colors"
          >
            Revisar <ArrowRight size={16} />
          </button>
        </article>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          ['Pedidos', 'operacao'],
          ['Atendimento', 'atendimento'],
          ['Crescimento', 'campanhas'],
          ['Cereus', 'ia'],
        ].map(([label, tab]) => (
          <button
            key={tab}
            onClick={() => onNavigate?.(tab)}
            className="bg-white border border-slate-100 rounded-2xl px-4 py-4 text-sm font-black text-slate-700 shadow-sm hover:border-teal-200 hover:text-teal-700 transition-colors"
          >
            {label}
          </button>
        ))}
      </section>
    </div>
  );
}
