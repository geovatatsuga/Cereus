import React, { useState } from 'react';
import {
  AlertTriangle, CheckCircle2, Eye, MessageCircle,
  PauseCircle, PlayCircle, Repeat2, Route, Send, ShieldCheck, Zap,
} from 'lucide-react';
import { AutomationCard } from '../components/ui/AutomationCard';
import { automationStats, campaigns, formatCurrency } from '../data/mockData';

type GrowthMode = 'campanhas' | 'automacoes';

const automationTemplates = [
  ['Carrinho abandonado', '+R$ 4.200/mes'],
  ['Cliente sumido', '34% retorno'],
  ['NPS com suporte', '-18% churn'],
];

export function CampaignsView() {
  const [activeMode, setActiveMode] = useState<GrowthMode>('campanhas');
  const totalRevenue = campaigns.reduce((sum, campaign) => sum + campaign.projectedRevenue, 0);
  const totalBudget = campaigns.reduce((sum, campaign) => sum + campaign.budget, 0);
  const averageRoi = totalRevenue / totalBudget;
  const totalAudience = campaigns.reduce((sum, campaign) => {
    const match = campaign.audience.match(/\d+/);
    return sum + (match ? Number(match[0]) : 0);
  }, 0);

  return (
    <div className="p-4 sm:p-8 pb-20 max-w-7xl mx-auto w-full space-y-8 relative z-0">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-wider text-teal-700 mb-2">Crescimento</p>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Vender e recuperar clientes</h2>
        </div>
        <button className="bg-slate-900 hover:bg-teal-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2">
          {activeMode === 'campanhas' ? <Send size={16} className="text-teal-300" /> : <Route size={16} className="text-teal-300" />}
          {activeMode === 'campanhas' ? 'Nova campanha' : 'Nova automacao'}
        </button>
      </div>

      <section className="bg-white rounded-xl p-4 border border-slate-200/70">
        <div className="flex flex-col 2xl:flex-row 2xl:items-center justify-between gap-4">
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 flex-1">
            {[
              ['Receita prevista', formatCurrency(totalRevenue)],
              ['Investimento', formatCurrency(totalBudget)],
              ['ROI medio', `${averageRoi.toFixed(1)}x`],
              ['Publico', `${totalAudience} clientes`],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg bg-slate-50 border border-slate-100 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{label}</p>
                <p className="text-xl font-extrabold text-slate-950 mt-1">{value}</p>
              </div>
            ))}
          </div>
          <div className="bg-slate-100 p-1 rounded-lg border border-slate-200 flex w-full sm:w-fit">
            {[
              ['campanhas', 'Campanhas', <Send size={15} />],
              ['automacoes', 'Automacoes', <Route size={15} />],
            ].map(([mode, label, icon]) => (
              <button
                key={String(mode)}
                onClick={() => setActiveMode(mode as GrowthMode)}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-md text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  activeMode === mode ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {activeMode === 'campanhas' ? (
        <>
          <section className="bg-white rounded-xl border border-slate-200/70 overflow-hidden">
            <div className="grid grid-cols-[1.4fr_0.8fr_0.7fr_0.8fr_0.55fr_0.8fr_0.45fr] gap-4 px-5 py-3 border-b border-slate-100 text-[10px] font-bold uppercase tracking-wide text-slate-400 min-w-[920px]">
              <span>Campanha</span>
              <span>Publico</span>
              <span>Investimento</span>
              <span>Receita prevista</span>
              <span>ROI</span>
              <span>Status</span>
              <span />
            </div>
            <div className="divide-y divide-slate-100 overflow-x-auto">
              {campaigns.map((campaign) => (
                <div key={campaign.name} className="grid grid-cols-[1.4fr_0.8fr_0.7fr_0.8fr_0.55fr_0.8fr_0.45fr] gap-4 px-5 py-4 items-center min-w-[920px]">
                  <div>
                    <p className="font-bold text-slate-950">{campaign.name}</p>
                    <p className="text-xs font-semibold text-slate-400 mt-1">{campaign.channel}</p>
                  </div>
                  <p className="text-sm font-bold text-slate-700">{campaign.audience}</p>
                  <p className="text-sm font-bold text-slate-700">{formatCurrency(campaign.budget)}</p>
                  <p className="text-sm font-extrabold text-slate-950">{formatCurrency(campaign.projectedRevenue)}</p>
                  <span className="w-fit bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md text-xs font-bold">{campaign.roi}x</span>
                  <span className="w-fit text-xs font-bold text-slate-500 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-md">{campaign.status}</span>
                  <button className="text-slate-500 hover:text-slate-900 transition-colors justify-self-end" aria-label={`Revisar ${campaign.name}`}>
                    <Eye size={16} />
                  </button>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-4 border-t border-slate-100 bg-slate-50/60">
              {['Opt-in ok', 'Tickets excluidos', 'Frequencia ok', 'Cupom testado'].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-lg bg-white border border-slate-100 px-3 py-2 text-slate-600">
                  <CheckCircle2 size={15} className="text-emerald-600" />
                  <span className="text-xs font-bold">{item}</span>
                </div>
              ))}
              </div>
          </section>
        </>
      ) : (
        <>
          <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              ['Rodando', '2', <PlayCircle size={20} />, 'bg-emerald-50 text-emerald-700'],
              ['Pausadas', '1', <PauseCircle size={20} />, 'bg-amber-50 text-amber-700'],
              ['Receita recorrente', formatCurrency(4960), <Repeat2 size={20} />, 'bg-teal-50 text-teal-700'],
              ['Falhas 24h', '41', <AlertTriangle size={20} />, 'bg-rose-50 text-rose-700'],
            ].map(([label, value, icon, style]) => (
              <div key={String(label)} className="bg-white rounded-xl p-5 border border-slate-200/70">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${style}`}>{icon}</div>
                <p className="text-sm font-bold text-slate-500">{label}</p>
                <p className="text-3xl font-black text-slate-900 mt-1">{value}</p>
              </div>
            ))}
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {automationStats.map((item, index) => (
              <AutomationCard
                key={item.title}
                title={item.title}
                trigger={item.trigger}
                action={item.action}
                icon={index === 0 ? <MessageCircle size={22} /> : index === 1 ? <Zap size={22} /> : <ShieldCheck size={22} />}
                color={index === 0 ? 'from-teal-500 to-emerald-400' : index === 1 ? 'from-slate-700 to-slate-600' : 'from-cyan-500 to-blue-500'}
                statusColor={item.status === 'Rodando' ? 'bg-teal-400' : 'bg-slate-300'}
                metrics={{ sent: `${item.sent} exec.`, conv: `${item.conversion}%`, rev: item.revenue ? formatCurrency(item.revenue) : '-' }}
              />
            ))}
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {automationTemplates.map(([title, expected]) => (
              <article key={title} className="bg-white rounded-xl p-5 border border-slate-200/70 flex items-center justify-between gap-3">
                <div>
                  <p className="font-black text-slate-800">{title}</p>
                  <span className="text-xs font-black bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md">{expected}</span>
                </div>
              </article>
            ))}
          </section>
        </>
      )}
    </div>
  );
}
