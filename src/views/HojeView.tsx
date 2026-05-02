import React from 'react';
import { AlertTriangle, ArrowRight, CheckCircle2, Clock, MessageCircle, PackageSearch, Send, Users, Wallet } from 'lucide-react';
import { campaigns, clients, formatCurrency, operations, totals } from '../data/mockData';

export function HojeView() {
  const lateOrders = operations.filter((order) => order.late);
  const riskClients = clients.filter((client) => client.churnRisk >= 60);
  const bestCampaign = campaigns[0];

  const actions = [
    {
      title: 'Resolver atraso em rota',
      desc: `${lateOrders.length} pedido precisa de acompanhamento antes de empurrar mais vendas.`,
      icon: <Clock size={18} />,
      tone: 'rose',
    },
    {
      title: 'Resgatar clientes em risco',
      desc: `${riskClients.length} clientes somam ${formatCurrency(riskClients.reduce((sum, client) => sum + client.spent, 0))} em historico de compra.`,
      icon: <Users size={18} />,
      tone: 'teal',
    },
    {
      title: 'Reforcar preparo do jantar',
      desc: 'Previsao indica pico entre 19h e 21h. Reforce bebidas e combos.',
      icon: <PackageSearch size={18} />,
      tone: 'amber',
    },
  ];

  return (
    <div className="p-4 sm:p-8 pb-20 max-w-7xl mx-auto w-full space-y-8 relative z-0">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <section className="xl:col-span-2 bg-slate-900 rounded-[1.5rem] p-6 sm:p-8 text-white shadow-xl">
          <p className="text-xs font-black uppercase tracking-wider text-teal-300 mb-3">Hoje, agora</p>
          <h2 className="text-3xl font-black tracking-tight mb-3">O restaurante precisa vender mais sem piorar a operacao.</h2>
          <p className="text-slate-300 font-medium max-w-3xl">
            Prioridade: resolver atraso, recuperar clientes de alto valor e preparar o pico do jantar antes de disparar campanha grande.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
            <div className="bg-white/10 border border-white/10 rounded-2xl p-4">
              <Wallet size={20} className="text-teal-300 mb-3" />
              <p className="text-[10px] font-black uppercase text-slate-400">Vendas do mes</p>
              <p className="text-2xl font-black">{formatCurrency(totals.revenue)}</p>
            </div>
            <div className="bg-white/10 border border-white/10 rounded-2xl p-4">
              <AlertTriangle size={20} className="text-rose-300 mb-3" />
              <p className="text-[10px] font-black uppercase text-slate-400">Atrasos agora</p>
              <p className="text-2xl font-black">{lateOrders.length}</p>
            </div>
            <div className="bg-white/10 border border-white/10 rounded-2xl p-4">
              <MessageCircle size={20} className="text-sky-300 mb-3" />
              <p className="text-[10px] font-black uppercase text-slate-400">Atendimento</p>
              <p className="text-2xl font-black">6 pendencias</p>
            </div>
          </div>
        </section>

        <aside className="bg-white rounded-[1.5rem] p-6 border border-slate-100 shadow-sm">
          <p className="text-xs font-black uppercase tracking-wider text-teal-700 mb-2">Campanha indicada</p>
          <h3 className="font-black text-xl text-slate-900">{bestCampaign.name}</h3>
          <p className="text-sm text-slate-500 font-medium mt-2">{bestCampaign.audience} em {bestCampaign.channel}</p>
          <div className="grid grid-cols-2 gap-3 mt-5">
            <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-3">
              <p className="text-[10px] font-black uppercase text-emerald-700">Receita prevista</p>
              <p className="font-black text-slate-900">{formatCurrency(bestCampaign.projectedRevenue)}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 border border-slate-100 p-3">
              <p className="text-[10px] font-black uppercase text-slate-400">ROI</p>
              <p className="font-black text-slate-900">{bestCampaign.roi}x</p>
            </div>
          </div>
          <button className="w-full mt-5 bg-slate-900 hover:bg-teal-700 text-white rounded-xl py-3 text-sm font-black flex items-center justify-center gap-2">
            Revisar antes de enviar <ArrowRight size={16} />
          </button>
        </aside>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {actions.map((action) => (
          <article key={action.title} className="bg-white rounded-[1.25rem] p-5 border border-slate-100 shadow-sm">
            <div className={`w-10 h-10 rounded-xl mb-4 flex items-center justify-center ${
              action.tone === 'rose' ? 'bg-rose-50 text-rose-700' : action.tone === 'amber' ? 'bg-amber-50 text-amber-700' : 'bg-teal-50 text-teal-700'
            }`}>
              {action.icon}
            </div>
            <h3 className="font-black text-slate-900 mb-2">{action.title}</h3>
            <p className="text-sm font-medium text-slate-500 leading-relaxed">{action.desc}</p>
          </article>
        ))}
      </section>

      <section className="bg-white rounded-[1.5rem] p-6 border border-slate-100 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div>
            <h3 className="font-black text-xl text-slate-900">Checklist do dono</h3>
            <p className="text-sm font-medium text-slate-500">O minimo para terminar o dia com operacao saudavel.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {['Atraso acompanhado', 'Campanha revisada', 'Estoque do jantar conferido', 'Clientes criticos priorizados'].map((item, index) => (
            <div key={item} className="flex items-center gap-3 rounded-2xl bg-slate-50 border border-slate-100 p-4">
              <CheckCircle2 size={18} className={index === 0 ? 'text-amber-600' : 'text-teal-600'} />
              <p className="text-sm font-black text-slate-700">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
