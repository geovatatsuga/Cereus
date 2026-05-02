import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Bot, FileSearch, Send, Sparkles } from 'lucide-react';
import { MiniVisual } from '../components/ui/MiniVisual';
import { clients, formatCurrency } from '../data/mockData';

export function IAView() {
  const riskClients = clients.filter((client) => client.churnRisk >= 60);

  return (
    <div className="p-4 sm:p-8 pb-20 max-w-7xl mx-auto w-full space-y-8 relative z-0">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-teal-700 to-emerald-500 tracking-tight mb-2">Cereus</h2>
        </div>
        <span className="w-fit bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-sm font-black border border-emerald-100">LLM assistido</span>
      </div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <section className="xl:col-span-2 bg-white/95 backdrop-blur-xl rounded-[1.5rem] shadow-sm border border-teal-100 flex flex-col min-h-[560px] overflow-hidden">
          <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-slate-100 bg-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-teal-600 to-emerald-400 flex items-center justify-center text-white">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-black text-slate-900">Cereus Chat</h3>
              </div>
            </div>
            <MiniVisual variant="chat" tone="teal" className="h-11 w-16" />
          </div>

          <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50/50">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-600 to-emerald-400 shrink-0 flex items-center justify-center text-white shadow-sm">
                <Sparkles size={20} />
              </div>
              <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 max-w-[88%]">
                <p className="text-slate-700 text-sm font-medium leading-relaxed">Hoje: atraso + clientes em risco.</p>
              </div>
            </div>

            <div className="flex gap-4 flex-row-reverse">
              <img src="https://i.pravatar.cc/150?img=32" alt="User" className="w-10 h-10 rounded-full shadow-sm shrink-0" />
              <div className="bg-slate-900 p-4 rounded-2xl rounded-tr-none shadow-sm max-w-[88%]">
                <p className="text-white text-sm font-medium leading-relaxed">O que eu deveria fazer agora para vender mais sem piorar a operacao?</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-600 to-emerald-400 shrink-0 flex items-center justify-center text-white shadow-sm">
                <Sparkles size={20} />
              </div>
              <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-teal-100/50 max-w-[88%] space-y-4">
                <div>
                  <p className="text-xs font-black text-teal-700 uppercase tracking-wider mb-2">Resposta do Cereus</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      ['Resolver atraso', 'rose'],
                      ['Recuperar VIPs', 'teal'],
                      ['Segurar disparo', 'amber'],
                    ].map(([step, tone]) => (
                      <div key={step} className={`border rounded-xl p-3 text-sm font-black ${
                        tone === 'rose' ? 'bg-rose-50 border-rose-100 text-rose-800' : tone === 'amber' ? 'bg-amber-50 border-amber-100 text-amber-800' : 'bg-teal-50 border-teal-100 text-teal-900'
                      }`}>
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                    <p className="text-[10px] font-black text-slate-400 uppercase">Receita em risco</p>
                    <p className="font-black text-slate-900">{formatCurrency(2060)}</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                    <p className="text-[10px] font-black text-slate-400 uppercase">Clientes</p>
                    <p className="font-black text-slate-900">{riskClients.length} prioritarios</p>
                  </div>
                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
                    <p className="text-[10px] font-black text-amber-600 uppercase">Cuidado</p>
                    <p className="font-black text-amber-800">Suporte antes</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button className="bg-slate-900 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-black transition-colors flex items-center gap-2"><Send size={15} /> Criar</button>
                  <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-black transition-colors flex items-center gap-2"><FileSearch size={15} /> Fontes</button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white border-t border-slate-100">
            <div className="relative">
              <input type="text" placeholder="Pergunte ao Cereus..." className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50" />
              <button className="absolute right-2 top-2 bg-slate-900 hover:bg-teal-700 transition-colors text-white p-2 rounded-lg">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>

        <aside className="bg-white rounded-[1.5rem] p-6 border border-slate-100 shadow-sm h-fit">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h3 className="font-black text-xl text-slate-800">Sinais</h3>
            <MiniVisual variant="churn" tone="rose" className="h-12 w-16" />
          </div>
          <div className="space-y-3">
            {riskClients.map((client) => (
              <div key={client.id} className="rounded-2xl bg-slate-50 p-4 border border-slate-100 flex items-center justify-between gap-3">
                <div>
                  <p className="font-black text-slate-800">{client.name}</p>
                  <p className="text-xs text-slate-400 font-bold">LTV {formatCurrency(client.spent)}</p>
                </div>
                <span className="text-xs font-black text-rose-700 bg-rose-50 border border-rose-100 px-2 py-1 rounded-lg">{client.churnRisk}%</span>
              </div>
            ))}
          </div>
        </aside>
      </motion.div>
    </div>
  );
}
