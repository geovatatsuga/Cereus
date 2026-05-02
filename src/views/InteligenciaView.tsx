import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  AlertTriangle, ArrowRight, Beaker, Brain, CalendarDays, Eye, LineChart, PackageSearch, Target, TrendingUp,
} from 'lucide-react';
import {
  Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer,
  Scatter, ScatterChart, Tooltip as RechartsTooltip, XAxis, YAxis, ZAxis,
} from 'recharts';

const churnRiskData = [
  { name: 'Baixo', users: 1450, color: '#10b981' },
  { name: 'Moderado', users: 820, color: '#fbbf24' },
  { name: 'Alto', users: 340, color: '#f97316' },
  { name: 'Critico', users: 125, color: '#ef4444' },
];

const rfmData = [
  { name: 'Campeoes', recency: 10, frequency: 50, monetary: 5000, fill: '#10b981' },
  { name: 'Clientes fieis', recency: 20, frequency: 35, monetary: 3000, fill: '#34d399' },
  { name: 'Potenciais fieis', recency: 15, frequency: 15, monetary: 1500, fill: '#38bdf8' },
  { name: 'Em risco', recency: 80, frequency: 25, monetary: 2500, fill: '#f87171' },
  { name: 'Hibernando', recency: 120, frequency: 5, monetary: 400, fill: '#94a3b8' },
];

const modelCards = [
  {
    name: 'Previsao de vendas diaria',
    route: 'vendas',
    question: 'Quanto vou vender amanha?',
    status: 'Em validacao',
    icon: <LineChart size={20} />,
    metric: 'MAPE 8,4%',
    impact: 'Evita falta de preparo no pico',
    decision: 'Escalar equipe e estoque por dia/horario',
    next: 'Testar clima, feriado e campanha como variaveis externas',
    action: 'Planejar equipe',
    summary: 'Preve o faturamento esperado por dia e horario para o restaurante preparar equipe, compras e campanha com antecedencia.',
    output: 'Amanha: R$ 10.800 previstos, pico entre 19h e 21h, confianca media-alta.',
    inputs: ['historico de pedidos', 'dia da semana', 'campanhas', 'clima'],
    bg: 'from-teal-50 to-white',
    accent: 'text-teal-700',
    tone: 'teal',
  },
  {
    name: 'Previsao de demanda por produto',
    route: 'demanda',
    question: 'O que pode faltar hoje?',
    status: 'Experimento',
    icon: <TrendingUp size={20} />,
    metric: 'Top 20 SKUs',
    impact: 'Reduz ruptura de combos e bebidas',
    decision: 'Evitar ruptura de combo, bebida e sobremesa',
    next: 'Separar demanda por canal: iFood, WhatsApp e Site',
    action: 'Ajustar estoque',
    summary: 'Estima quais produtos devem sair mais em cada turno para evitar falta de itens campeoes no horario de maior movimento.',
    output: 'Bebidas e combos familiares devem subir 18% no jantar.',
    inputs: ['vendas por produto', 'canal', 'horario', 'rupturas anteriores'],
    bg: 'from-sky-50 to-white',
    accent: 'text-sky-700',
    tone: 'sky',
  },
  {
    name: 'Churn de clientes',
    route: 'churn',
    question: 'Quem esta prestes a sumir?',
    status: 'Produzindo insight',
    icon: <AlertTriangle size={20} />,
    metric: '125 criticos',
    impact: 'Recupera receita parada antes de perder o cliente',
    decision: 'Priorizar resgate com aprovacao humana',
    next: 'Medir lift real da campanha contra grupo controle',
    action: 'Criar resgate',
    summary: 'Identifica clientes com alta chance de nao voltar e separa quem deve receber uma abordagem cuidadosa.',
    output: '125 clientes criticos, com R$ 8.500 de LTV em risco.',
    inputs: ['ultima compra', 'frequencia', 'reclamacoes', 'resposta a campanhas'],
    bg: 'from-rose-50 to-white',
    accent: 'text-rose-700',
    tone: 'rose',
  },
  {
    name: 'RFM e segmentacao',
    route: 'rfm',
    question: 'Qual oferta combina com cada cliente?',
    status: 'Ativo',
    icon: <Target size={20} />,
    metric: '5 clusters',
    impact: 'Evita mandar desconto errado para cliente bom',
    decision: 'Escolher oferta por recencia, frequencia e valor',
    next: 'Automatizar migracao de segmentos toda madrugada',
    action: 'Ver segmentos',
    summary: 'Agrupa clientes pelo comportamento de compra para escolher melhor oferta, canal e urgencia de contato.',
    output: '5 grupos ativos: campeoes, fieis, potenciais, em risco e hibernando.',
    inputs: ['recencia', 'frequencia', 'valor gasto', 'ticket medio'],
    bg: 'from-amber-50 to-white',
    accent: 'text-amber-700',
    tone: 'amber',
  },
];

function ModelIllustration({ tone }: { tone: string }) {
  const palette: Record<string, { main: string; soft: string; line: string }> = {
    teal: { main: '#0f766e', soft: '#ccfbf1', line: '#14b8a6' },
    sky: { main: '#0369a1', soft: '#e0f2fe', line: '#38bdf8' },
    rose: { main: '#be123c', soft: '#ffe4e6', line: '#fb7185' },
    amber: { main: '#b45309', soft: '#fef3c7', line: '#f59e0b' },
  };
  const color = palette[tone] ?? palette.teal;

  return (
    <svg viewBox="0 0 96 72" className="h-14 w-20" role="img" aria-label="Visual do modelo">
      <rect x="6" y="8" width="84" height="56" rx="16" fill={color.soft} />
      {tone === 'teal' && (
        <>
          <path d="M18 48 C30 36, 38 41, 48 29 S66 18, 78 24" fill="none" stroke={color.main} strokeWidth="4" strokeLinecap="round" />
          <circle cx="48" cy="29" r="4" fill="white" stroke={color.main} strokeWidth="2" />
          <rect x="18" y="19" width="18" height="5" rx="2.5" fill="white" opacity="0.9" />
        </>
      )}
      {tone === 'sky' && (
        <>
          <rect x="22" y="38" width="10" height="14" rx="3" fill={color.main} opacity="0.82" />
          <rect x="39" y="27" width="10" height="25" rx="3" fill={color.line} opacity="0.9" />
          <rect x="56" y="18" width="10" height="34" rx="3" fill={color.main} opacity="0.68" />
          <path d="M20 24 H72" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.9" />
        </>
      )}
      {tone === 'rose' && (
        <>
          <path d="M48 18 L72 54 H24 Z" fill="white" opacity="0.9" />
          <path d="M48 28 V42" stroke={color.main} strokeWidth="5" strokeLinecap="round" />
          <circle cx="48" cy="49" r="3" fill={color.main} />
        </>
      )}
      {tone === 'amber' && (
        <>
          <circle cx="31" cy="31" r="9" fill="white" stroke={color.main} strokeWidth="3" />
          <circle cx="61" cy="25" r="7" fill="white" stroke={color.line} strokeWidth="3" />
          <circle cx="58" cy="49" r="8" fill="white" stroke={color.main} strokeWidth="3" />
          <path d="M39 33 L53 27 M38 36 L51 45" stroke={color.main} strokeWidth="3" strokeLinecap="round" opacity="0.7" />
        </>
      )}
    </svg>
  );
}

export function InteligenciaView() {
  const [activeTab, setActiveTab] = useState<'modelos' | 'vendas' | 'demanda' | 'churn' | 'rfm' | 'auditoria'>('modelos');

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-slate-900 text-white text-xs rounded-lg py-2 px-3 shadow-xl border border-slate-700">
        <p className="font-black mb-1">{label || payload[0]?.payload?.name}</p>
        {payload.map((item: any) => <p key={item.name}>{item.name}: <span className="font-medium">{item.value}</span></p>)}
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-8 pb-20 max-w-7xl mx-auto w-full space-y-8 relative z-0">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Ferramentas de Inteligencia</h2>
          <p className="text-slate-500 font-medium">Modelos, previsoes e auditorias para ajudar o dono do restaurante a decidir sem complicar.</p>
        </div>
        <div className="flex bg-slate-100/80 p-1 rounded-xl w-full lg:w-auto overflow-x-auto shadow-inner border border-slate-200">
          {[
            { id: 'modelos', label: 'Modelos', icon: <Beaker size={16} /> },
            { id: 'vendas', label: 'Vendas', icon: <LineChart size={16} /> },
            { id: 'demanda', label: 'Demanda', icon: <PackageSearch size={16} /> },
            { id: 'churn', label: 'Churn', icon: <AlertTriangle size={16} /> },
            { id: 'rfm', label: 'RFM', icon: <Target size={16} /> },
            { id: 'auditoria', label: 'Auditoria', icon: <Eye size={16} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-black transition-all whitespace-nowrap ${
                activeTab === tab.id ? 'bg-white text-teal-700 shadow-sm border border-slate-100' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'modelos' && (
          <motion.div key="modelos" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }} className="space-y-6">
            <section className="bg-slate-900 rounded-[1.5rem] p-5 sm:p-6 text-white shadow-xl overflow-hidden relative">
              <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.18),transparent_55%)] pointer-events-none" />
              <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-5 items-center">
                <div className="lg:col-span-2">
                  <p className="text-xs font-black uppercase tracking-wider text-teal-300 mb-3 flex items-center gap-2"><Beaker size={15} /> Laboratorio de IA</p>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-3">Ferramentas que explicam o futuro do restaurante</h3>
                  <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed max-w-3xl">
                    Cada modelo responde uma pergunta simples, mostra o impacto no negocio e termina em uma acao. A ideia nao e mostrar ciencia de dados para o dono, e sim antecipar venda, falta, atraso e cliente indo embora.
                  </p>
                </div>
                <div className="bg-white/10 border border-white/10 rounded-2xl p-4">
                  <CalendarDays size={26} className="text-teal-300 mb-3" />
                  <h4 className="font-black text-lg mb-2">Previsao para amanha</h4>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">R$ 10.800 em vendas, com pico entre 19h e 21h.</p>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-white/10 rounded-xl p-2"><p className="text-[10px] text-slate-400 font-black uppercase">Confianca</p><p className="text-xs font-black text-teal-300">Media-alta</p></div>
                    <div className="bg-white/10 rounded-xl p-2"><p className="text-[10px] text-slate-400 font-black uppercase">Pico</p><p className="text-xs font-black">20h</p></div>
                    <div className="bg-white/10 rounded-xl p-2"><p className="text-[10px] text-slate-400 font-black uppercase">Acao</p><p className="text-xs font-black">+1 pessoa</p></div>
                  </div>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {modelCards.map((model) => (
                <button
                  key={model.name}
                  onClick={() => setActiveTab(model.route as any)}
                  className={`group text-left rounded-[1.25rem] border border-slate-100 shadow-sm overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg bg-gradient-to-br ${model.bg}`}
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl bg-white border border-white ${model.accent} flex items-center justify-center shrink-0 shadow-sm`}>
                        {model.icon}
                      </div>
                      <div className="rounded-2xl bg-white/75 border border-white p-1 shadow-sm">
                        <ModelIllustration tone={model.tone} />
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">{model.status}</p>
                      <h4 className="font-black text-base text-slate-900 leading-tight mb-2">{model.name}</h4>
                      <p className="text-sm font-bold text-slate-700 leading-snug">{model.question}</p>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/80">
                      <span className={`bg-white border border-white ${model.accent} px-2.5 py-1 rounded-lg text-xs font-black shadow-sm`}>{model.metric}</span>
                      <span className="w-8 h-8 rounded-full bg-white border border-white text-slate-700 flex items-center justify-center shadow-sm transition-transform group-hover:translate-x-1">
                        <ArrowRight size={15} />
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </section>
          </motion.div>
        )}

        {activeTab === 'vendas' && (
          <motion.section key="vendas" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }} className="space-y-6">
            <div className="bg-white rounded-[1.5rem] p-6 border border-slate-100 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-teal-700 mb-2">Modelo de previsao</p>
                  <h3 className="text-2xl font-black text-slate-900">Previsao de vendas diaria</h3>
                  <p className="text-sm text-slate-500 font-medium mt-2 max-w-2xl">Mostra quanto o restaurante deve vender por dia e horario para orientar equipe, estoque, compras e campanhas.</p>
                </div>
                <div className="rounded-2xl bg-teal-50 border border-teal-100 p-4 min-w-56">
                  <p className="text-[10px] font-black uppercase tracking-wider text-teal-700 mb-1">Resultado de amanha</p>
                  <p className="text-2xl font-black text-slate-900">R$ 10.800</p>
                  <p className="text-xs font-bold text-slate-500 mt-1">Pico previsto entre 19h e 21h</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                ['Confianca', 'Media-alta', 'Historico parecido com ultimas sextas.'],
                ['O que afeta', 'Clima, campanha e dia', 'O modelo pesa contexto externo e canal.'],
                ['Quando nao confiar', 'Evento fora da curva', 'Show, chuva forte ou falta de entregador podem mudar tudo.'],
              ].map(([title, value, desc]) => (
                <div key={title} className="bg-white rounded-[1.25rem] p-5 border border-slate-100 shadow-sm">
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">{title}</p>
                  <p className="text-xl font-black text-slate-900">{value}</p>
                  <p className="text-sm font-medium text-slate-500 mt-2">{desc}</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-[1.25rem] p-5 border border-slate-100 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-3">Ciclo de vida do modelo</p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {[
                  ['Status', 'Em validacao'],
                  ['Atualizado', 'Hoje, 17:55'],
                  ['Aprovacao', 'Usar como sugestao'],
                  ['Impacto medido', 'Evita reforco tardio'],
                ].map(([title, value]) => (
                  <div key={title} className="rounded-2xl bg-slate-50 border border-slate-100 p-3">
                    <p className="text-[10px] font-black uppercase text-slate-400">{title}</p>
                    <p className="text-sm font-black text-slate-800 mt-1">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {activeTab === 'demanda' && (
          <motion.section key="demanda" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }} className="space-y-6">
            <div className="bg-white rounded-[1.5rem] p-6 border border-slate-100 shadow-sm">
              <p className="text-xs font-black uppercase tracking-wider text-sky-700 mb-2">Modelo de demanda</p>
              <h3 className="text-2xl font-black text-slate-900">Previsao de demanda por produto</h3>
              <p className="text-sm text-slate-500 font-medium mt-2 max-w-2xl">Ajuda a prever quais produtos podem faltar, quais itens preparar antes e quais categorias devem receber reforco no estoque.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {[
                ['Combo familia', '+18%', 'Alta no jantar'],
                ['Bebidas', '+14%', 'Risco de ruptura'],
                ['Sobremesas', '+7%', 'Estoque ok'],
                ['Saladas', '-4%', 'Baixa demanda'],
              ].map(([item, value, note]) => (
                <div key={item} className="bg-white rounded-[1.25rem] p-5 border border-slate-100 shadow-sm">
                  <p className="text-sm font-black text-slate-900">{item}</p>
                  <p className="text-2xl font-black text-sky-700 mt-2">{value}</p>
                  <p className="text-xs font-bold text-slate-500 mt-1">{note}</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-[1.25rem] p-5 border border-slate-100 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-3">Ciclo de vida do modelo</p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {[
                  ['Status', 'Experimento'],
                  ['Atualizado', 'Hoje, 16:40'],
                  ['Quando nao confiar', 'Cardapio mudou'],
                  ['Impacto esperado', 'Menos ruptura'],
                ].map(([title, value]) => (
                  <div key={title} className="rounded-2xl bg-slate-50 border border-slate-100 p-3">
                    <p className="text-[10px] font-black uppercase text-slate-400">{title}</p>
                    <p className="text-sm font-black text-slate-800 mt-1">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {activeTab === 'churn' && (
          <motion.div key="churn" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <section className="bg-white rounded-[1.5rem] p-6 border border-slate-100 shadow-sm">
                <h3 className="text-xl font-black text-slate-800">Modelo de churn</h3>
                <p className="text-sm text-slate-500 font-medium mb-6">Volumetria calculada nas ultimas 24 horas.</p>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={churnRiskData} layout="vertical" margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#475569', fontWeight: 700 }} width={90} />
                      <RechartsTooltip cursor={{ fill: '#f8fafc' }} content={<CustomTooltip />} />
                      <Bar dataKey="users" name="Clientes" radius={[0, 8, 8, 0]} barSize={34}>
                        {churnRiskData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </section>
              <section className="bg-slate-900 rounded-[1.5rem] p-6 shadow-sm text-white flex flex-col justify-center">
                <AlertTriangle size={42} className="text-rose-400 mb-4 opacity-80" />
                <h3 className="text-xl font-black mb-2">Acao sugerida pelo modelo</h3>
                <p className="text-slate-300 text-sm mb-6 leading-relaxed">O grupo critico soma LTV projetado perdido de R$ 8.500. A recomendacao e campanha pequena, revisada por humano, para clientes com historico de reclamacao.</p>
                <button className="bg-rose-500 hover:bg-rose-600 text-white font-black py-3 rounded-xl transition-all w-full">Criar automacao de resgate</button>
              </section>
            </div>
            <section className="bg-white rounded-[1.25rem] p-5 border border-slate-100 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-3">Ciclo de vida do modelo</p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {[
                  ['Status', 'Produzindo insight'],
                  ['Atualizado', 'Hoje, 18:42'],
                  ['Quando nao confiar', 'Base pequena ou campanha nova'],
                  ['Impacto medido', 'Lift de resgate pendente'],
                ].map(([title, value]) => (
                  <div key={title} className="rounded-2xl bg-slate-50 border border-slate-100 p-3">
                    <p className="text-[10px] font-black uppercase text-slate-400">{title}</p>
                    <p className="text-sm font-black text-slate-800 mt-1">{value}</p>
                  </div>
                ))}
              </div>
            </section>
          </motion.div>
        )}

        {activeTab === 'rfm' && (
          <motion.div key="rfm" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }} className="space-y-6">
            <section className="bg-white rounded-[1.5rem] p-6 border border-slate-100 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl"><Brain size={24} /></div>
                <div>
                  <h3 className="text-xl font-black text-slate-800">Matriz RFM</h3>
                  <p className="text-sm text-slate-500 max-w-2xl">Recencia, frequencia e valor monetario para decidir quem recebe oferta, atendimento ou retencao.</p>
                </div>
              </div>
              <div className="h-[420px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 30, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis type="number" dataKey="recency" name="Recencia" tick={{ fontSize: 12, fill: '#64748b' }} reversed />
                    <YAxis type="number" dataKey="frequency" name="Frequencia" tick={{ fontSize: 12, fill: '#64748b' }} />
                    <ZAxis type="number" dataKey="monetary" range={[120, 1900]} name="Valor" />
                    <RechartsTooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
                    {rfmData.map((entry) => <Scatter key={entry.name} name={entry.name} data={[entry]} fill={entry.fill} />)}
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </section>
            <section className="bg-white rounded-[1.25rem] p-5 border border-slate-100 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-3">Ciclo de vida do modelo</p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {[
                  ['Status', 'Ativo'],
                  ['Atualizado', 'Hoje, 03:00'],
                  ['Quando nao confiar', 'Cliente sem historico'],
                  ['Impacto medido', 'Ofertas mais precisas'],
                ].map(([title, value]) => (
                  <div key={title} className="rounded-2xl bg-slate-50 border border-slate-100 p-3">
                    <p className="text-[10px] font-black uppercase text-slate-400">{title}</p>
                    <p className="text-sm font-black text-slate-800 mt-1">{value}</p>
                  </div>
                ))}
              </div>
            </section>
          </motion.div>
        )}

        {activeTab === 'auditoria' && (
          <motion.section key="auditoria" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }} className="bg-white rounded-[1.5rem] p-6 border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black text-slate-800 mb-5">Auditoria das ferramentas</h3>
            <div className="space-y-3">
              {[
                ['18:42', 'Modelo sugeriu campanha de churn', 'Usou: ultima compra, LTV, reclamacao, opt-in'],
                ['18:39', 'Modelo bloqueou disparo automatico', 'Motivo: cliente com ticket aberto'],
                ['17:55', 'Previsao de vendas atualizada', 'Nova estimativa para amanha: R$ 10.800'],
              ].map(([time, title, desc]) => (
                <div key={title} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-black text-slate-800">{title}</p>
                    <p className="text-sm text-slate-500 font-medium mt-1">{desc}</p>
                  </div>
                  <span className="text-xs font-black text-slate-400">{time}</span>
                </div>
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
