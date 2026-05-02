import React, { useState } from 'react';
import {
  AlertTriangle, CalendarClock, CheckCircle2, Eye, MessageCircle,
  PauseCircle, PlayCircle, Repeat2, Route, Send, ShieldCheck, ShoppingBag, Target, TestTube2,
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
        <button className="bg-slate-900 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl text-sm font-black shadow-sm flex items-center gap-2">
          {activeMode === 'campanhas' ? <Send size={16} className="text-teal-300" /> : <Route size={16} className="text-teal-300" />}
          {activeMode === 'campanhas' ? 'Nova campanha' : 'Nova automacao'}
        </button>
      </div>

      <section className="bg-white rounded-[1.5rem] p-4 border border-slate-100 shadow-sm">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 flex-1">
          {growthGoals.map((goal) => (
            <button
              key={goal.id}
              onClick={() => {
                setActiveGoal(goal.id);
                setActiveMode(goal.mode);
              }}
              className={`text-left rounded-2xl border p-4 transition-all ${
                activeGoal === goal.id
                  ? 'bg-teal-50 border-teal-200 text-teal-900'
                  : 'bg-slate-50 border-slate-100 text-slate-700 hover:border-teal-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  activeGoal === goal.id ? 'bg-teal-600 text-white' : 'bg-white text-teal-700'
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
          <div className="bg-slate-100 p-1 rounded-2xl border border-slate-200 flex w-full sm:w-fit">
            {[
              ['campanhas', 'Campanhas', <Send size={15} />],
              ['automacoes', 'Automacoes', <Route size={15} />],
            ].map(([mode, label, icon]) => (
              <button
                key={String(mode)}
                onClick={() => setActiveMode(mode as GrowthMode)}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all ${
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
              <article key={campaign.name} className="bg-white rounded-[1.5rem] p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="font-black text-slate-800 text-lg">{campaign.name}</h3>
                    <p className="text-sm text-slate-500 font-medium">{campaign.audience}</p>
                  </div>
                  <span className="bg-teal-50 text-teal-700 text-xs font-black px-2 py-1 rounded-lg">{campaign.status}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-5">
                  {[
                    ['Canal', campaign.channel],
                    ['Data', 'Pontual'],
                    ['Custo', formatCurrency(campaign.budget)],
                  ].map(([label, value]) => (
                    <div key={label} className="bg-slate-50 rounded-xl p-3">
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
                  <span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-lg text-xs font-black">ROI {campaign.roi}x</span>
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
                </div>
                <span className="bg-amber-50 text-amber-700 px-3 py-1.5 rounded-xl text-xs font-black">Aguardando aprovacao</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {[
                  ['Publico elegivel', `${selectedAudience.length} clientes`, <Target size={20} />],
                  ['Receita prevista', formatCurrency(6300), <Wallet size={20} />],
                  ['Janela', 'Hoje 20:00', <CalendarClock size={20} />],
                ].map(([title, value, icon]) => (
                  <div key={String(title)} className="rounded-2xl bg-slate-50 border border-slate-100 p-4">
                    <div className="text-teal-700 mb-3">{icon}</div>
                    <p className="text-xs font-black uppercase tracking-wider text-slate-400">{title}</p>
                    <p className="font-black text-slate-900 mt-1">{value}</p>
                  </div>
                ))}
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-5">
                <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2"><MessageCircle size={14} /> Mensagem</p>
                <p className="text-sm font-medium text-slate-700 leading-relaxed">Oi, [Nome]. Sentimos sua falta. Liberamos 20% por 24h para voce voltar.</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button className="bg-slate-900 hover:bg-teal-700 text-white px-5 py-3 rounded-xl text-sm font-black flex items-center gap-2"><Send size={16} /> Agendar</button>
                <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-5 py-3 rounded-xl text-sm font-black">Teste</button>
              </div>
            </div>

            <aside className="bg-slate-900 rounded-[1.5rem] p-6 text-white shadow-xl h-fit">
              <CheckCircle2 size={34} className="text-teal-300 mb-4" />
              <h3 className="font-black text-xl mb-2">Antes do disparo</h3>
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
              <div key={String(label)} className="bg-white rounded-[1.5rem] p-5 border border-slate-100 shadow-sm">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${style}`}>{icon}</div>
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

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-[1.5rem] p-6 border border-slate-100 shadow-sm">
              <h3 className="text-xl font-black text-slate-800 mb-6">Cliente critico</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {[
                  ['Quando', '30 dias sem comprar'],
                  ['Regra', 'LTV acima de R$ 700'],
                  ['Pausa', 'Reclamacao aberta'],
                  ['Acao', 'Jornada de retorno'],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-2xl bg-slate-50 border border-slate-100 p-4">
                    <p className="text-xs font-black uppercase tracking-wider text-slate-400">{title}</p>
                    <p className="font-bold text-slate-800 mt-1">{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <aside className="bg-slate-900 rounded-[1.5rem] p-6 text-white shadow-xl h-fit">
              <TestTube2 className="text-teal-300 mb-4" size={30} />
              <h3 className="font-black text-xl mb-2">Teste da automacao</h3>
              <div className="grid grid-cols-3 gap-2 mb-5">
                {[
                  ['Elegiveis', '125'],
                  ['Pausados', '9'],
                  ['Receita', 'R$ 6,3k'],
                ].map(([label, value]) => (
                  <div key={label} className="bg-white/10 rounded-xl p-3">
                    <p className="text-[10px] font-black uppercase text-slate-400">{label}</p>
                    <p className="text-sm font-black">{value}</p>
                  </div>
                ))}
              </div>
              <button className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-black py-3 rounded-xl transition-colors">Publicar</button>
            </aside>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {automationTemplates.map(([title, expected]) => (
              <article key={title} className="bg-white rounded-[1.5rem] p-5 border border-slate-100 shadow-sm">
                <p className="font-black text-slate-800">{title}</p>
                <span className="text-xs font-black bg-emerald-50 text-emerald-700 px-2 py-1 rounded-lg">{expected}</span>
              </article>
            ))}
          </section>
        </>
      )}
    </div>
  );
}
