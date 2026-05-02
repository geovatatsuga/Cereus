import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, Clock, MessageCircle, Send, UserRound } from 'lucide-react';

const conversations = [
  {
    name: 'Roberto Silva',
    channel: 'WhatsApp',
    status: 'Urgente',
    last: 'Meu pedido esta atrasado de novo?',
    context: 'Pedido #1031 em rota ha 42 min',
    tone: 'rose',
  },
  {
    name: 'Carlos Mendes',
    channel: 'WhatsApp',
    status: 'Resgate',
    last: 'Recebi um cupom, ainda vale?',
    context: 'Cliente em risco, LTV R$ 850',
    tone: 'amber',
  },
  {
    name: 'Juliana Paes',
    channel: 'Instagram',
    status: 'Venda',
    last: 'Quero orcamento para evento sexta.',
    context: 'VIP, 31 pedidos, indicou 3 clientes',
    tone: 'teal',
  },
  {
    name: 'Bruna Lima',
    channel: 'Site',
    status: 'Pos-venda',
    last: 'Chegou tudo certo, obrigada!',
    context: 'NPS positivo, oportunidade de recorrencia',
    tone: 'sky',
  },
];

export function AtendimentoView() {
  const [selected, setSelected] = useState(conversations[0]);

  return (
    <div className="p-4 sm:p-8 pb-20 max-w-7xl mx-auto w-full space-y-8 relative z-0">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-wider text-teal-700 mb-2">Atendimento</p>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Fila inteligente</h2>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          {[
            ['Urgente', '1'],
            ['Resgate', '1'],
            ['Venda', '1'],
          ].map(([label, value]) => (
            <div key={label} className="bg-white border border-slate-200/70 rounded-lg px-4 py-2">
              <p className="text-[10px] font-black uppercase text-slate-400">{label}</p>
              <p className="text-lg font-black text-slate-900">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="bg-white rounded-xl border border-slate-200/70 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-black text-slate-900">Fila priorizada</h3>
            <span className="bg-rose-50 text-rose-700 px-2.5 py-1 rounded-md text-xs font-bold">6 pendencias</span>
          </div>
          <div className="divide-y divide-slate-100">
            {conversations.map((conversation) => (
              <button
                key={conversation.name}
                onClick={() => setSelected(conversation)}
                className={`w-full text-left p-4 transition-colors hover:bg-slate-50 ${selected.name === conversation.name ? 'bg-teal-50/50' : 'bg-white'}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    conversation.tone === 'rose' ? 'bg-rose-50 text-rose-700' : conversation.tone === 'amber' ? 'bg-amber-50 text-amber-700' : conversation.tone === 'sky' ? 'bg-sky-50 text-sky-700' : 'bg-teal-50 text-teal-700'
                  }`}>
                    <UserRound size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-black text-slate-900 truncate">{conversation.name}</p>
                      <span className="text-[10px] font-black uppercase text-slate-400">{conversation.channel}</span>
                    </div>
                    <p className="text-sm font-medium text-slate-600 truncate mt-1">{conversation.last}</p>
                    <p className="text-xs font-bold text-slate-400 truncate mt-1">{conversation.context}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="lg:col-span-2 bg-white rounded-xl border border-slate-200/70 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h3 className="font-black text-xl text-slate-900">{selected.name}</h3>
              <p className="text-sm font-medium text-slate-500">{selected.context}</p>
            </div>
            <span className={`w-fit px-3 py-1.5 rounded-md text-xs font-bold ${
              selected.tone === 'rose' ? 'bg-rose-50 text-rose-700' : selected.tone === 'amber' ? 'bg-amber-50 text-amber-700' : selected.tone === 'sky' ? 'bg-sky-50 text-sky-700' : 'bg-teal-50 text-teal-700'
            }`}>
              {selected.status}
            </span>
          </div>

          <div className="p-6 bg-slate-50/60 min-h-[320px] space-y-4">
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-full bg-slate-200 shrink-0" />
              <div className="bg-white rounded-lg border border-slate-100 p-4 max-w-xl shadow-sm">
                <p className="text-sm font-medium text-slate-700">{selected.last}</p>
              </div>
            </div>
            <div className="flex gap-3 flex-row-reverse">
              <div className="w-9 h-9 rounded-full bg-teal-600 shrink-0 flex items-center justify-center text-white"><MessageCircle size={16} /></div>
              <div className="bg-slate-900 text-white rounded-lg p-4 max-w-xl shadow-sm">
                <p className="text-sm font-medium">Pedido em rota. Ticket marcado como sensivel.</p>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-slate-100 bg-white">
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="rounded-lg bg-rose-50 border border-rose-100 p-3 flex gap-2">
                <AlertTriangle size={16} className="text-rose-700 shrink-0 mt-0.5" />
                <p className="text-xs font-bold text-rose-800">Sem campanha</p>
              </div>
              <div className="rounded-lg bg-amber-50 border border-amber-100 p-3 flex gap-2">
                <Clock size={16} className="text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs font-bold text-amber-800">10 min</p>
              </div>
              <div className="rounded-lg bg-teal-50 border border-teal-100 p-3 flex gap-2">
                <CheckCircle2 size={16} className="text-teal-700 shrink-0 mt-0.5" />
                <p className="text-xs font-bold text-teal-800">Salvar</p>
              </div>
            </div>
            <div className="relative">
              <input className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3.5 pl-4 pr-12 text-sm outline-none focus:ring-2 focus:ring-teal-500/30" placeholder="Responder cliente..." />
              <button className="absolute right-2 top-2 bg-slate-900 text-white p-2 rounded-lg hover:bg-teal-700 transition-colors">
                <Send size={18} />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
