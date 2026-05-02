import React from 'react';
import { CalendarClock, CheckCircle2, Eye, MessageSquare, Send, Target, Wallet } from 'lucide-react';
import { campaigns, clients, formatCurrency } from '../data/mockData';

export function CampaignsView() {
  const selectedAudience = clients.filter((client) => client.segment === 'Em Risco' || client.churnRisk >= 60);

  return (
    <div className="p-4 sm:p-8 pb-20 max-w-7xl mx-auto w-full space-y-8 relative z-0">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Campanhas</h2>
          <p className="text-slate-500 font-medium">Escolha publico, confira ROI e envie com seguranca.</p>
        </div>
        <button className="bg-slate-900 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl text-sm font-black shadow-sm flex items-center gap-2">
          <Send size={16} className="text-teal-300" /> Nova campanha
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {campaigns.map((campaign) => (
          <article key={campaign.name} className="bg-white rounded-[1.5rem] p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <h3 className="font-black text-slate-800 text-lg">{campaign.name}</h3>
                <p className="text-sm text-slate-500 font-medium">{campaign.audience}</p>
              </div>
              <span className="bg-teal-50 text-teal-700 text-xs font-black px-2 py-1 rounded-lg">{campaign.status}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-5">
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-[10px] uppercase font-black text-slate-400">Canal</p>
                <p className="font-black text-slate-800 text-sm">{campaign.channel}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-[10px] uppercase font-black text-slate-400">Custo</p>
                <p className="font-black text-slate-800 text-sm">{formatCurrency(campaign.budget)}</p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-3">
                <p className="text-[10px] uppercase font-black text-emerald-600">ROI</p>
                <p className="font-black text-emerald-700 text-sm">{campaign.roi}x</p>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
              <div>
                <p className="text-xs font-bold text-slate-400">Receita prevista</p>
                <p className="font-black text-slate-900">{formatCurrency(campaign.projectedRevenue)}</p>
              </div>
              <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-3 py-2 rounded-xl text-xs font-black flex items-center gap-1">
                <Eye size={14} /> Revisar
              </button>
            </div>
          </article>
        ))}
      </div>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-[1.5rem] p-6 border border-slate-100 shadow-sm">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h3 className="font-black text-xl text-slate-800">Resgate VIP 45 dias</h3>
              <p className="text-sm text-slate-500 font-medium">Pronta para aprovacao.</p>
            </div>
            <span className="bg-amber-50 text-amber-700 px-3 py-1.5 rounded-xl text-xs font-black">Aguardando aprovacao</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              ['Publico elegivel', `${selectedAudience.length} clientes`, <Target size={20} />],
              ['Receita prevista', formatCurrency(6300), <Wallet size={20} />],
              ['Envio', 'Hoje 20:00', <CalendarClock size={20} />],
            ].map(([title, value, icon]) => (
              <div key={String(title)} className="rounded-2xl bg-slate-50 border border-slate-100 p-4">
                <div className="text-teal-700 mb-3">{icon}</div>
                <p className="text-xs font-black uppercase tracking-wider text-slate-400">{title}</p>
                <p className="font-black text-slate-900 mt-1">{value}</p>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-5">
            <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2"><MessageSquare size={14} /> Mensagem</p>
            <p className="text-sm font-medium text-slate-700 leading-relaxed">Oi, [Nome]. Sentimos sua falta. Liberamos 20% por 24h para voce voltar, e seu proximo pedido tera acompanhamento especial da equipe.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button className="bg-slate-900 hover:bg-teal-700 text-white px-5 py-3 rounded-xl text-sm font-black flex items-center gap-2"><Send size={16} /> Aprovar e agendar</button>
            <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-5 py-3 rounded-xl text-sm font-black">Enviar teste</button>
          </div>
        </div>

        <aside className="bg-slate-900 rounded-[1.5rem] p-6 text-white shadow-xl h-fit">
          <CheckCircle2 size={34} className="text-teal-300 mb-4" />
          <h3 className="font-black text-xl mb-2">Checklist de envio</h3>
          <div className="space-y-3 text-sm">
            {['Opt-in ok', 'Tickets excluidos', 'Frequencia ok', 'Cupom testado'].map((item) => (
              <div key={item} className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 size={16} className="text-teal-300" />
                <span className="font-bold">{item}</span>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}
