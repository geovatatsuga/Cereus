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

  const ModelHealth = ({ tone, items }: { tone: 'teal' | 'sky' | 'rose' | 'amber'; items: string[] }) => (
    <div className="bg-white rounded-xl p-4 border border-slate-200/70 flex flex-col md:flex-row md:items-center justify-between gap-3">
      <span className={`h-2 w-2 rounded-full ${tone === 'rose' ? 'bg-rose-500' : tone === 'amber' ? 'bg-amber-500' : tone === 'sky' ? 'bg-sky-500' : 'bg-emerald-600'}`} />
      <div className="flex flex-wrap gap-2 md:justify-end">
        {items.map((item) => (
          <span key={item} className="rounded-md bg-slate-50 border border-slate-100 px-3 py-2 text-xs font-bold text-slate-700">{item}</span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-8 pb-20 max-w-7xl mx-auto w-full space-y-8 relative z-0">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Lab de IA</h2>
        </div>
        <div className="flex bg-slate-100/80 p-1 rounded-lg w-full lg:w-auto overflow-x-auto border border-slate-200">
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
              className={`flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-bold transition-all whitespace-nowrap ${
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
            <section className="bg-slate-900 rounded-xl p-5 sm:p-6 text-white overflow-hidden relative">
              <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-5 items-center">
                <div className="lg:col-span-2">
                  <p className="text-xs font-black uppercase tracking-wider text-teal-300 mb-3 flex items-center gap-2"><Beaker size={15} /> Laboratorio de IA</p>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight">Modelos em producao</h3>
                </div>
                <div className="bg-white/10 border border-white/10 rounded-lg p-4">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <CalendarDays size={26} className="text-teal-300" />
                  </div>
                  <h4 className="font-black text-lg mb-2">Amanha</h4>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-white/10 rounded-lg p-2"><p className="text-[10px] text-slate-400 font-bold uppercase">Confianca</p><p className="text-xs font-black text-teal-300">Media-alta</p></div>
                    <div className="bg-white/10 rounded-lg p-2"><p className="text-[10px] text-slate-400 font-bold uppercase">Pico</p><p className="text-xs font-black">20h</p></div>
                    <div className="bg-white/10 rounded-lg p-2"><p className="text-[10px] text-slate-400 font-bold uppercase">Equipe</p><p className="text-xs font-black">+1 pessoa</p></div>
                  </div>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {modelCards.map((model) => (
                <button
                  key={model.name}
                  onClick={() => setActiveTab(model.route as any)}
                  className="group text-left rounded-xl border border-slate-200/70 bg-white overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-sm"
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 ${model.accent} flex items-center justify-center shrink-0`}>
                        {model.icon}
                      </div>
                      <span className={`h-2 w-2 rounded-full mt-2 ${model.tone === 'rose' ? 'bg-rose-500' : model.tone === 'amber' ? 'bg-amber-500' : model.tone === 'sky' ? 'bg-sky-500' : 'bg-emerald-600'}`} />
                    </div>

                    <div className="mb-4">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{model.status}</p>
                      <h4 className="font-bold text-base text-slate-950 leading-tight mb-2">{model.name}</h4>
                      <p className="text-sm font-semibold text-slate-600 leading-snug">{model.question}</p>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/80">
                      <span className={`bg-slate-50 border border-slate-100 ${model.accent} px-2.5 py-1 rounded-md text-xs font-bold`}>{model.metric}</span>
                      <span className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 text-slate-700 flex items-center justify-center transition-transform group-hover:translate-x-1">
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
            <div className="bg-white rounded-xl p-6 border border-slate-200/70">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-teal-700 mb-2">Modelo de previsao</p>
                  <h3 className="text-2xl font-black text-slate-900">Previsao de vendas diaria</h3>
                </div>
                <div className="rounded-lg bg-teal-50 border border-teal-100 p-4 min-w-56">
                  <p className="text-[10px] font-black uppercase tracking-wider text-teal-700 mb-1">Resultado de amanha</p>
                  <p className="text-2xl font-black text-slate-900">R$ 10.800</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                ['Confianca', 'Media-alta'],
                ['Variaveis', 'Clima + campanha'],
                ['Alerta', 'Evento fora da curva'],
              ].map(([title, value]) => (
                <div key={title} className="bg-white rounded-xl p-5 border border-slate-200/70">
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">{title}</p>
                  <p className="text-xl font-black text-slate-900">{value}</p>
                </div>
              ))}
            </div>
            <ModelHealth tone="teal" items={['Em validacao', 'Atualizado 17:55', 'Sugestao', 'Evita reforco tardio']} />
          </motion.section>
        )}

        {activeTab === 'demanda' && (
          <motion.section key="demanda" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }} className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200/70">
              <p className="text-xs font-black uppercase tracking-wider text-sky-700 mb-2">Modelo de demanda</p>
              <h3 className="text-2xl font-black text-slate-900">Previsao de demanda por produto</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {[
                ['Combo familia', '+18%', 'Alta no jantar'],
                ['Bebidas', '+14%', 'Risco de ruptura'],
                ['Sobremesas', '+7%', 'Estoque ok'],
                ['Saladas', '-4%', 'Baixa demanda'],
              ].map(([item, value, note]) => (
                <div key={item} className="bg-white rounded-xl p-5 border border-slate-200/70">
                  <p className="text-sm font-black text-slate-900">{item}</p>
                  <p className="text-2xl font-black text-sky-700 mt-2">{value}</p>
                  <p className="text-xs font-bold text-slate-500 mt-1">{note}</p>
                </div>
              ))}
            </div>
            <ModelHealth tone="sky" items={['Experimento', 'Atualizado 16:40', 'Cardapio mudou', 'Menos ruptura']} />
          </motion.section>
        )}

        {activeTab === 'churn' && (
          <motion.div key="churn" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <section className="bg-white rounded-xl p-6 border border-slate-200/70">
                <h3 className="text-xl font-black text-slate-800">Modelo de churn</h3>
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
              <section className="bg-slate-900 rounded-xl p-6 shadow-sm text-white flex flex-col justify-center">
                <AlertTriangle size={42} className="text-rose-400 mb-4 opacity-80" />
                <h3 className="text-xl font-black mb-6">R$ 8.500 em risco</h3>
                <button className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 rounded-lg transition-all w-full">Criar resgate</button>
              </section>
            </div>
            <ModelHealth tone="rose" items={['Insight ativo', 'Atualizado 18:42', 'Campanha nova', 'Lift pendente']} />
          </motion.div>
        )}

        {activeTab === 'rfm' && (
          <motion.div key="rfm" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }} className="space-y-6">
            <section className="bg-white rounded-xl p-6 border border-slate-200/70">
              <div className="mb-6 flex items-center gap-3">
                <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-lg"><Brain size={24} /></div>
                <div>
                  <h3 className="text-xl font-black text-slate-800">Matriz RFM</h3>
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
            <ModelHealth tone="amber" items={['Ativo', 'Atualizado 03:00', 'Sem historico', 'Oferta precisa']} />
          </motion.div>
        )}

        {activeTab === 'auditoria' && (
          <motion.section key="auditoria" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }} className="bg-white rounded-xl p-6 border border-slate-200/70">
            <h3 className="text-xl font-black text-slate-800 mb-5">Auditoria das ferramentas</h3>
            <div className="space-y-3">
              {[
                ['18:42', 'Churn sugeriu resgate', 'LTV + reclamacao + opt-in'],
                ['18:39', 'Disparo bloqueado', 'Ticket aberto'],
                ['17:55', 'Previsao atualizada', 'Amanha: R$ 10.800'],
              ].map(([time, title, desc]) => (
                <div key={title} className="rounded-lg border border-slate-100 bg-slate-50/70 p-4 flex items-start justify-between gap-4">
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
