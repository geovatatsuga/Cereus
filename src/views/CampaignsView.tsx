import React, { useState } from 'react';
import {
  AlertTriangle, CalendarClock, CheckCircle2, Eye, MessageCircle,
  PauseCircle, PlayCircle, Repeat2, Route, Send, ShieldCheck, ShoppingBag, Target,
  TrendingUp, UserRound, Wallet, Zap,
} from 'lucide-react';
import { AutomationCard } from '../components/ui/AutomationCard';
import { automationStats, campaigns, clients, formatCurrency } from '../data/mockData';

type GrowthMode = 'campanhas' | 'automacoes';
type GrowthGoal = 'vender' | 'recuperar' | 'ticket' | 'recorrencia';

const automationTemplates = [
  ['Carrinho abandonado', '+R$ 4.200/mes'],
  ['Cliente sumido', '34% retorno'],
  ['NPS com suporte', '-18% churn'],
];

export function CampaignsView() {
  const [activeMode, setActiveMode] = useState<GrowthMode>('campanhas');
  const [activeGoal, setActiveGoal] = useState<GrowthGoal>('vender');
  const selectedAudience = clients.filter((client) => client.segment === 'Em Risco' || client.churnRisk >= 60);

  const growthGoals = [
    { id: 'vender' as GrowthGoal, label: 'Vender hoje', hint: 'Campanha pontual', mode: 'campanhas' as GrowthMode, icon: <ShoppingBag size={18} /> },
    { id: 'recuperar' as GrowthGoal, label: 'Recuperar clientes', hint: 'Campanha ou fluxo', mode: 'campanhas' as GrowthMode, icon: <UserRound size={18} /> },
    { id: 'ticket' as GrowthGoal, label: 'Aumentar ticket', hint: 'Oferta no pedido', mode: 'automacoes' as GrowthMode, icon: <TrendingUp size={18} /> },
    { id: 'recorrencia' as GrowthGoal, label: 'Automatizar retorno', hint: 'Roda sozinho', mode: 'automacoes' as GrowthMode, icon: <Repeat2 size={18} /> },
  ];

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
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 flex-1">
          {growthGoals.map((goal) => (
            <button
              key={goal.id}
              onClick={() => {
                setActiveGoal(goal.id);
                setActiveMode(goal.mode);
              }}
              className={`text-left rounded-lg border p-4 transition-all ${
                activeGoal === goal.id
                  ? 'bg-slate-900 border-slate-900 text-white'
                  : 'bg-slate-50 border-slate-100 text-slate-700 hover:border-teal-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  activeGoal === goal.id ? 'bg-white/10 text-teal-200' : 'bg-white text-slate-600'
                }`}>
                  {goal.icon}
                </div>
                <div>
                  <p className="text-sm font-black">{goal.label}</p>
                </div>
              </div>
            </button>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {campaigns.map((campaign) => (
              <article key={campaign.name} className="bg-white rounded-xl p-5 border border-slate-200/70 hover:shadow-sm transition-all">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="font-black text-slate-800 text-lg">{campaign.name}</h3>
                    <p className="text-xs text-slate-400 font-bold mt-1">{campaign.audience}</p>
                  </div>
                  <span className="text-xs font-bold text-slate-500 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-md">{campaign.status}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-5">
                  {[
                    ['Canal', campaign.channel],
                    ['Data', 'Pontual'],
                    ['Custo', formatCurrency(campaign.budget)],
                  ].map(([label, value]) => (
                    <div key={label} className="bg-slate-50 rounded-lg p-3">
                      <p className="text-[10px] uppercase font-black text-slate-400">{label}</p>
                      <p className="font-black text-slate-800 text-sm">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                  <div>
                    <p className="text-xs font-bold text-slate-400">Receita prevista</p>
                    <p className="font-black text-slate-900">{formatCurrency(campaign.projectedRevenue)}</p>
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md text-xs font-black">ROI {campaign.roi}x</span>
                  <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-3 py-2 rounded-lg text-xs font-black flex items-center gap-1">
                    <Eye size={14} /> Revisar
                  </button>
                </div>
              </article>
            ))}
          </div>

          <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 bg-white rounded-xl p-6 border border-slate-200/70">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-black text-xl text-slate-800">Resgate VIP 45 dias</h3>
                </div>
                <span className="bg-amber-50 text-amber-700 px-3 py-1.5 rounded-md text-xs font-black">Aguardando aprovacao</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {[
                  ['Publico elegivel', `${selectedAudience.length} clientes`, <Target size={20} />],
                  ['Receita prevista', formatCurrency(6300), <Wallet size={20} />],
                  ['Janela', 'Hoje 20:00', <CalendarClock size={20} />],
                ].map(([title, value, icon]) => (
                  <div key={String(title)} className="rounded-lg bg-slate-50 border border-slate-100 p-4">
                    <div className="text-teal-700 mb-3">{icon}</div>
                    <p className="text-xs font-black uppercase tracking-wider text-slate-400">{title}</p>
                    <p className="font-black text-slate-900 mt-1">{value}</p>
                  </div>
                ))}
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-2"><MessageCircle size={14} /> Mensagem</p>
                <p className="text-sm font-black text-slate-800">20% por 24h</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button className="bg-slate-900 hover:bg-teal-700 text-white px-5 py-3 rounded-lg text-sm font-black flex items-center gap-2"><Send size={16} /> Agendar</button>
                <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-5 py-3 rounded-lg text-sm font-black">Teste</button>
              </div>
            </div>

            <aside className="bg-slate-900 rounded-xl p-6 text-white shadow-sm h-fit">
              <h3 className="font-black text-xl mb-4">Antes do disparo</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {['Opt-in ok', 'Tickets excluidos', 'Frequencia ok', 'Cupom testado'].map((item) => (
                  <div key={item} className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-slate-300">
                    <CheckCircle2 size={16} className="text-teal-300" />
                    <span className="text-xs font-black">{item}</span>
                  </div>
                ))}
              </div>
            </aside>
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
