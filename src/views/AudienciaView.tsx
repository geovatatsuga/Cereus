import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Download, Search, Send, Star, TrendingDown, TrendingUp, Users } from 'lucide-react';
import { KpiCard } from '../components/ui/KpiCard';
import { clients, formatCurrency } from '../data/mockData';

const segmentStyle: Record<string, string> = {
  VIP: 'bg-amber-50 text-amber-700 border-amber-100',
  Recorrente: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  Novo: 'bg-blue-50 text-blue-700 border-blue-100',
  'Em Risco': 'bg-rose-50 text-rose-700 border-rose-100',
};

export function AudienciaView() {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [search, setSearch] = useState('');

  const filteredClients = useMemo(() => (
    clients.filter((client) => {
      const matchesFilter =
        activeFilter === 'Todos'
        || client.segment === activeFilter
        || (activeFilter === 'Sumidos' && client.lastOrderDays >= 20)
        || (activeFilter === 'Alto valor' && client.spent >= 3000)
        || (activeFilter === 'Reclamaram' && client.timeline.some((event) => event.toLowerCase().includes('reclam')));
      const q = search.toLowerCase();
      const matchesSearch = client.name.toLowerCase().includes(q) || client.email.toLowerCase().includes(q) || client.tags.join(' ').includes(q);
      return matchesFilter && matchesSearch;
    })
  ), [activeFilter, search]);

  const totalSpent = clients.reduce((sum, client) => sum + client.spent, 0);
  const avgLtv = Math.round(totalSpent / clients.length);
  const churnList = clients.filter((client) => client.churnRisk >= 60);

  return (
    <div className="p-4 sm:p-8 pb-20 max-w-7xl mx-auto w-full space-y-8 relative z-0">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Clientes</h2>
          <p className="text-slate-500 font-medium">Quem vale cuidar, vender ou recuperar.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm flex items-center gap-2">
            <Download size={16} /> Importar CSV
          </button>
          <button className="bg-slate-900 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm flex items-center gap-2">
            <Send size={16} className="text-teal-300" /> Acionar segmento
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard title="Base Ativa" value="1.200" change="+42 novos" isPositive icon={<Users size={20} />} borderTop="border-t-4 border-t-teal-500" data={[1100, 1120, 1150, 1155, 1160, 1180, 1200]} />
        <KpiCard title="LTV Medio" value={formatCurrency(avgLtv)} change="+7%" isPositive icon={<TrendingUp size={20} />} borderTop="border-t-4 border-t-emerald-500" data={[1400, 1510, 1620, 1700, 1780, 1810, avgLtv]} />
        <KpiCard title="Clientes em Risco" value={String(churnList.length)} change="Monitorar" isPositive={false} icon={<TrendingDown size={20} />} borderTop="border-t-4 border-t-rose-400" data={[1, 2, 2, 3, 2, 3, churnList.length]} />
        <KpiCard title="Score Medio" value="68" change="+5 pts" isPositive icon={<Star size={20} />} highlight borderTop="border-t-0" data={[51, 55, 58, 61, 63, 65, 68]} />
      </div>

      <div>
        <section className="bg-white rounded-[1.5rem] p-5 sm:p-6 shadow-sm border border-slate-100">
          <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">
            <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100 overflow-x-auto">
              {['Todos', 'VIP', 'Em Risco', 'Sumidos', 'Alto valor', 'Reclamaram'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-lg text-xs font-black whitespace-nowrap transition-all ${
                    activeFilter === filter ? 'bg-white text-teal-700 shadow-sm border border-slate-100/70' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="relative w-full lg:w-72">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Search size={16} /></span>
              <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Buscar nome, e-mail ou tag" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-100 transition-all" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 text-xs font-black uppercase tracking-wider">
                  <th className="pb-3 px-3">Cliente</th>
                  <th className="pb-3 px-3">Segmento</th>
                  <th className="pb-3 px-3">Canal</th>
                  <th className="pb-3 px-3 text-center">Score</th>
                  <th className="pb-3 px-3 text-center">Risco</th>
                  <th className="pb-3 px-3 text-right">LTV</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client, index) => (
                  <motion.tr
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.035 }}
                    key={client.id}
                    className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3 min-w-56">
                        <img src={`https://api.dicebear.com/7.x/fun-emoji/svg?seed=${client.avatarSeed}`} alt={client.name} className="w-10 h-10 rounded-full bg-slate-100" />
                        <div>
                          <p className="text-sm font-black text-slate-800">{client.name}</p>
                          <p className="text-xs text-slate-400 font-medium">{client.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider border ${segmentStyle[client.segment]}`}>
                        {client.segment}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-sm text-slate-500 font-bold">{client.channel}</td>
                    <td className="py-3 px-3 text-center">
                      <span className="text-sm font-black text-slate-800">{client.score}</span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className={`text-xs font-black px-2 py-1 rounded-lg ${client.churnRisk >= 60 ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'}`}>
                        {client.churnRisk}%
                      </span>
                    </td>
                    <td className="py-3 px-3 text-sm font-black text-slate-800 text-right">{formatCurrency(client.spent)}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
