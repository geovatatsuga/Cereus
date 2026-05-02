import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  AlertTriangle, CalendarClock, CheckCircle2, Coffee, Eye, Heart, MessageCircle,
  PauseCircle, PlayCircle, Plus, Send, Settings2, ShoppingBag, Sparkles, TestTube2, Zap,
} from 'lucide-react';
import { AutomationCard } from '../components/ui/AutomationCard';
import { automationStats, formatCurrency } from '../data/mockData';

const templates = [
  { title: 'Recuperacao de Carrinho', desc: 'WhatsApp 30min apos abandono, com produto, prazo e incentivo.', icon: <ShoppingBag size={24} />, color: 'from-rose-400 to-orange-400', expected: '+R$ 4.200/mes' },
  { title: 'Upsell de Bebidas', desc: 'Oferece bebida para pedidos sem complemento em dias de baixa margem.', icon: <Coffee size={24} />, color: 'from-amber-400 to-yellow-500', expected: '+8% ticket' },
  { title: 'Reativacao 30 Dias', desc: 'Dispara cupom progressivo e pausa quando o cliente responde.', icon: <CalendarClock size={24} />, color: 'from-blue-500 to-cyan-500', expected: '34% retorno' },
  { title: 'NPS Humanizado', desc: 'Coleta nota, abre ticket se houver reclamacao e notifica gestor.', icon: <Heart size={24} />, color: 'from-pink-500 to-rose-400', expected: '-18% churn' },
];

const logs = [
  { type: 'success', text: 'Boas-vindas VIP enviou 18 mensagens e gerou 3 pedidos.', time: '18:12' },
  { type: 'warning', text: 'Ciclo de Reativacao pausou 4 contatos por falta de opt-in.', time: '17:48' },
  { type: 'error', text: 'Pesquisa NPS teve 2 falhas por e-mail invalido.', time: '16:20' },
];

export function AutomacoesView() {
  const [activeTab, setActiveTab] = useState('ativas');

  return (
    <div className="p-4 sm:p-8 pb-20 max-w-7xl mx-auto w-full space-y-8 relative z-0">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Automacoes e Regras</h2>
          <p className="text-slate-500 font-medium">Fluxos que economizam tempo sem perder controle.</p>
        </div>
        <button className="bg-slate-900 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all flex items-center gap-2">
          <Zap size={16} className="text-teal-300" /> Nova regra
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          ['Rodando', '2', <PlayCircle size={20} />, 'bg-emerald-50 text-emerald-700'],
          ['Em aprovacao', '1', <PauseCircle size={20} />, 'bg-amber-50 text-amber-700'],
          ['Receita atribuida', formatCurrency(4960), <Send size={20} />, 'bg-teal-50 text-teal-700'],
          ['Falhas 24h', '41', <AlertTriangle size={20} />, 'bg-rose-50 text-rose-700'],
        ].map(([label, value, icon, style]) => (
          <div key={String(label)} className="bg-white rounded-[1.5rem] p-5 border border-slate-100 shadow-sm">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${style}`}>{icon}</div>
            <p className="text-sm font-bold text-slate-500">{label}</p>
            <p className="text-3xl font-black text-slate-900 mt-1">{value}</p>
          </div>
        ))}
      </div>

      <div className="flex bg-slate-100 p-1 rounded-2xl w-full md:w-fit shadow-inner border border-slate-200/50">
        {[
          ['ativas', 'Ativas'],
          ['builder', 'Teste'],
          ['templates', 'Modelos'],
          ['logs', 'Logs'],
        ].map(([id, label]) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-1 md:flex-none px-5 py-2 rounded-xl text-sm font-black transition-all ${
              activeTab === id ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'ativas' && (
          <motion.div key="ativas" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {automationStats.map((item, index) => (
              <AutomationCard
                key={item.title}
                title={item.title}
                trigger={item.trigger}
                action={item.action}
                icon={index === 0 ? <MessageCircle size={22} /> : index === 1 ? <Zap size={22} /> : <Heart size={22} />}
                color={index === 0 ? 'from-teal-500 to-emerald-400' : index === 1 ? 'from-slate-700 to-slate-600' : 'from-cyan-500 to-blue-500'}
                statusColor={item.status === 'Rodando' ? 'bg-teal-400' : 'bg-slate-300'}
                metrics={{ sent: `${item.sent} envios`, conv: `${item.conversion}%`, rev: item.revenue ? formatCurrency(item.revenue) : '-' }}
              />
            ))}
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[1.5rem] flex flex-col items-center justify-center p-8 text-center hover:bg-slate-100 transition-colors cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center mb-4 group-hover:bg-teal-100 group-hover:text-teal-600 transition-colors">
                <Plus size={24} />
              </div>
              <p className="font-black text-slate-700">Novo fluxo</p>
              <p className="text-xs text-slate-400 mt-1">Gatilho, regra e acao</p>
            </div>
          </motion.div>
        )}

        {activeTab === 'builder' && (
          <motion.div key="builder" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <section className="lg:col-span-2 bg-white rounded-[1.5rem] p-6 border border-slate-100 shadow-sm">
              <h3 className="text-xl font-black text-slate-800 mb-1">Resgate de clientes criticos</h3>
              <p className="text-sm text-slate-500 font-medium mb-6">Simule antes de publicar.</p>
              <div className="space-y-4">
                {[
                  ['Gatilho', 'Cliente ficou 30 dias sem comprar', 'bg-blue-50 text-blue-700'],
                  ['Condicao', 'LTV acima de R$ 700 e opt-in ativo', 'bg-amber-50 text-amber-700'],
                  ['Aprovacao humana', 'Pausar se houver reclamacao aberta', 'bg-rose-50 text-rose-700'],
                  ['Acao', 'Enviar WhatsApp com cupom de 20%', 'bg-teal-50 text-teal-700'],
                ].map(([title, text, style], index) => (
                  <div key={title} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${style}`}>{index + 1}</div>
                      {index < 3 && <div className="w-px h-8 bg-slate-200" />}
                    </div>
                    <div className="flex-1 border border-slate-100 rounded-2xl p-4">
                      <p className="text-xs font-black uppercase tracking-wider text-slate-400">{title}</p>
                      <p className="font-bold text-slate-800 mt-1">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <aside className="bg-slate-900 rounded-[1.5rem] p-6 text-white shadow-xl h-fit">
              <TestTube2 className="text-teal-300 mb-4" size={30} />
              <h3 className="font-black text-xl mb-2">Resultado do teste</h3>
              <div className="grid grid-cols-3 gap-2 mb-5">
                {[
                  ['Elegiveis', '125'],
                  ['Bloqueados', '9'],
                  ['Receita', 'R$ 6,3k'],
                ].map(([label, value]) => (
                  <div key={label} className="bg-white/10 rounded-xl p-3">
                    <p className="text-[10px] font-black uppercase text-slate-400">{label}</p>
                    <p className="text-sm font-black">{value}</p>
                  </div>
                ))}
              </div>
              <button className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-black py-3 rounded-xl transition-colors">Enviar teste para gestor</button>
            </aside>
          </motion.div>
        )}

        {activeTab === 'templates' && (
          <motion.div key="templates" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {templates.map((template) => (
              <div key={template.title} className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all flex gap-5 items-start group">
                <div className={`w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br ${template.color} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}>
                  {template.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-black text-slate-800 text-lg">{template.title}</h3>
                    <span className="text-xs font-black bg-emerald-50 text-emerald-700 px-2 py-1 rounded-lg">{template.expected}</span>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed mt-1 mb-4">{template.desc}</p>
                  <button className="text-teal-700 font-black text-sm bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-xl transition-all">Usar template</button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'logs' && (
          <motion.div key="logs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-[1.5rem] p-6 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <Eye size={20} className="text-teal-600" />
              <h3 className="font-black text-xl text-slate-800">Auditoria de automacoes</h3>
            </div>
            <div className="space-y-3">
              {logs.map((log) => (
                <div key={log.text} className="flex items-start justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
                  <div className="flex gap-3">
                    {log.type === 'success' ? <CheckCircle2 className="text-emerald-600 shrink-0" size={20} /> : log.type === 'warning' ? <AlertTriangle className="text-amber-600 shrink-0" size={20} /> : <Settings2 className="text-rose-600 shrink-0" size={20} />}
                    <p className="text-sm font-bold text-slate-700">{log.text}</p>
                  </div>
                  <span className="text-xs font-black text-slate-400">{log.time}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
