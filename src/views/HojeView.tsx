import React from 'react';
import { AlertTriangle, ArrowRight, PackageSearch, ShoppingBag, Wallet } from 'lucide-react';
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
    { label: 'Pedidos hoje', value: '84', hint: `${openOrders} abertos`, icon: <ShoppingBag size={19} />, tone: 'sky' },
    { label: 'Ticket medio', value: formatCurrency(averageTicket), hint: 'meta R$ 150', icon: <PackageSearch size={19} />, tone: 'amber' },
    { label: 'Atrasados', value: String(lateOrders.length), hint: 'em rota', icon: <AlertTriangle size={19} />, tone: 'rose' },
  ];

  const dayFlow = [
    { hour: '11h', orders: 18, revenue: 'R$ 980', tone: 'sky' },
    { hour: '13h', orders: 34, revenue: 'R$ 1,8k', tone: 'teal' },
    { hour: '19h', orders: 52, revenue: 'R$ 3,1k', tone: 'amber' },
    { hour: '21h', orders: 41, revenue: 'R$ 2,4k', tone: 'rose' },
  ];

  return (
    <div className="p-4 sm:p-8 pb-20 max-w-7xl mx-auto w-full space-y-6 relative z-0">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-wider text-teal-700 mb-2">Hoje</p>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Hoje</h2>
        </div>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        {kpis.map((kpi) => (
          <article key={kpi.label} className="bg-white rounded-xl p-5 border border-slate-200/70">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                kpi.tone === 'rose' ? 'bg-rose-50 text-rose-700' : kpi.tone === 'amber' ? 'bg-amber-50 text-amber-700' : kpi.tone === 'sky' ? 'bg-sky-50 text-sky-700' : 'bg-emerald-50 text-emerald-700'
              }`}>
                {kpi.icon}
              </div>
              {kpi.tone === 'rose' && lateOrders.length > 0 && <span className="w-2 h-2 rounded-full bg-rose-500" />}
            </div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{kpi.label}</p>
            <p className="text-3xl font-extrabold text-slate-950 mt-1">{kpi.value}</p>
            <p className="text-sm font-semibold text-slate-500 mt-2">{kpi.hint}</p>
          </article>
        ))}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <article className="xl:col-span-2 bg-white rounded-xl p-5 sm:p-6 border border-slate-200/70">
          <div className="flex flex-col gap-5">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1">Fluxo do dia</p>
                <h3 className="text-2xl font-extrabold text-slate-950 tracking-tight">145 pedidos</h3>
              </div>
              <span className="text-sm font-semibold text-slate-500">R$ 8,3k</span>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {dayFlow.map((item) => (
                <div key={item.hour} className="border-t border-slate-100 pt-3">
                  <div className="h-20 flex items-end mb-3">
                    <div
                      className={`w-full rounded-sm ${
                        item.tone === 'rose' ? 'bg-rose-500' : item.tone === 'amber' ? 'bg-amber-500' : item.tone === 'sky' ? 'bg-sky-500' : 'bg-emerald-600'
                      }`}
                      style={{ height: `${Math.max(26, item.orders)}px` }}
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-bold text-slate-900">{item.hour}</p>
                    <p className="text-[10px] font-semibold text-slate-400">{item.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="bg-white rounded-xl p-5 border border-slate-200/70">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">Crescimento</p>
          <h3 className="font-bold text-lg text-slate-950">{bestCampaign.name}</h3>
          <div className="flex items-end justify-between gap-3 mt-5">
            <div>
              <p className="text-[10px] font-semibold uppercase text-slate-400">Receita prevista</p>
              <p className="text-2xl font-extrabold text-slate-950">{formatCurrency(bestCampaign.projectedRevenue)}</p>
            </div>
            <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md text-xs font-bold">{bestCampaign.roi}x ROI</span>
          </div>
          <button
            onClick={() => onNavigate?.('campanhas')}
            className="w-full mt-5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded-lg py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors"
          >
            Revisar <ArrowRight size={16} />
          </button>
        </article>
      </section>
    </div>
  );
}
