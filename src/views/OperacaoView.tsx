import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Activity, AlertTriangle, CheckCircle2, Clock, MapPin, PackageCheck, Search, TimerReset, UserCheck,
} from 'lucide-react';
import { KpiCard } from '../components/ui/KpiCard';
import { formatCurrency, operations } from '../data/mockData';

export function OperacaoView() {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredOrders = operations.filter((order) => (
    order.id.includes(searchQuery) || order.customer.toLowerCase().includes(searchQuery.toLowerCase())
  ));

  const bottleneck = useMemo(() => {
    const grouped = operations.reduce<Record<string, number>>((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + order.time;
      return acc;
    }, {});
    return Object.entries(grouped).sort((a, b) => b[1] - a[1])[0];
  }, []);

  const columns = [
    { title: 'Novos', id: 'Novos', color: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-700', dot: 'bg-blue-400' },
    { title: 'Preparando', id: 'Preparando', color: 'bg-amber-50', border: 'border-amber-100', text: 'text-amber-700', dot: 'bg-amber-400' },
    { title: 'Em Rota', id: 'Em Rota', color: 'bg-emerald-50', border: 'border-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-400' },
  ];

  return (
    <div className="p-4 sm:p-8 pb-20 max-w-7xl mx-auto w-full space-y-8 relative z-0">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Operacao</h2>
          <p className="text-slate-500 font-medium">Pedidos, atrasos e gargalos agora.</p>
        </div>
        <div className="relative w-full lg:w-80">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Search size={16} /></span>
          <input
            type="text"
            placeholder="Buscar pedido ou cliente..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-100 transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <KpiCard title="Pedidos Abertos" value={String(operations.length)} change="Volume normal" isPositive icon={<Activity size={20} />} borderTop="border-t-4 border-t-amber-400" highlight data={[5, 8, 12, 10, 15, 14, operations.length]} />
        <KpiCard title="Tempo Medio" value="22 min" change="-4 min" isPositive icon={<Clock size={20} />} borderTop="border-t-4 border-t-blue-400" data={[38, 35, 32, 34, 30, 29, 22]} />
        <KpiCard title="Atrasados" value={String(operations.filter((o) => o.late).length)} change="Acao imediata" isPositive={false} icon={<AlertTriangle size={20} />} borderTop="border-t-4 border-t-rose-400" data={[3, 2, 0, 1, 0, 0, operations.filter((o) => o.late).length]} />
        <KpiCard title="Gargalo" value={bottleneck?.[0] ?? '-'} change={`${bottleneck?.[1] ?? 0} min somados`} isPositive={false} icon={<TimerReset size={20} />} borderTop="border-t-4 border-t-orange-400" data={[18, 21, 25, 28, 24, 27, bottleneck?.[1] ?? 0]} />
        <KpiCard title="Concluidos Hoje" value="84" change="+12%" isPositive icon={<CheckCircle2 size={20} />} borderTop="border-t-4 border-t-emerald-400" data={[30, 45, 50, 65, 70, 78, 84]} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {columns.map((col, index) => {
          const colOrders = filteredOrders.filter((order) => order.status === col.id);

          return (
            <motion.section
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              key={col.id}
              className="bg-slate-50/85 backdrop-blur-xl rounded-[1.5rem] p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col min-h-[520px]"
            >
              <div className="flex justify-between items-center mb-5 px-1">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${col.dot}`} />
                  <span className="font-black text-slate-800 text-lg tracking-tight">{col.title}</span>
                </div>
                <span className={`text-xs font-black px-2.5 py-1 rounded-lg border ${col.border} ${col.color} ${col.text}`}>{colOrders.length}</span>
              </div>

              <div className="space-y-3 overflow-y-auto flex-1 pr-1 pb-4 custom-scrollbar">
                <AnimatePresence>
                  {colOrders.map((order) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                      key={order.id}
                      className={`bg-white p-4 rounded-[1.25rem] shadow-sm border transition-all cursor-pointer relative overflow-hidden group ${
                        order.late ? 'border-rose-200 hover:border-rose-400' : order.warning ? 'border-amber-200 hover:border-amber-400' : 'border-slate-100 hover:border-teal-200'
                      }`}
                    >
                      <div className={`absolute top-0 left-0 w-1 h-full ${order.late ? 'bg-rose-500' : order.warning ? 'bg-amber-400' : col.dot}`} />
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-black text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg">#{order.id}</span>
                          <span className={`text-[10px] font-black text-white px-2 py-1 rounded-md uppercase tracking-wider ${order.platform === 'iFood' ? 'bg-rose-600' : 'bg-teal-600'}`}>{order.platform}</span>
                        </div>
                        <div className={`flex items-center gap-1.5 text-xs font-black px-2 py-1 rounded-md ${
                          order.late ? 'bg-rose-100 text-rose-700 animate-pulse' : order.warning ? 'bg-amber-100 text-amber-700' : 'bg-slate-50 text-slate-500'
                        }`}>
                          <Clock size={12} strokeWidth={3} />
                          {order.time} min
                        </div>
                      </div>

                      <h4 className="font-black text-slate-800 text-base mb-1">{order.customer}</h4>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed mb-4">{order.items}</p>

                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="bg-slate-50 rounded-xl p-2">
                          <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1"><UserCheck size={12} /> Resp.</p>
                          <p className="text-sm font-black text-slate-700">{order.owner}</p>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-2">
                          <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Total</p>
                          <p className="text-sm font-black text-slate-700">{formatCurrency(order.total)}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                        {order.status === 'Novos' && <button className="bg-teal-50 text-teal-700 px-3 py-1.5 rounded-lg text-xs font-black hover:bg-teal-600 hover:text-white transition-colors">Aceitar</button>}
                        {order.status === 'Preparando' && <button className="bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg text-xs font-black hover:bg-amber-500 hover:text-white transition-colors">Despachar</button>}
                        {order.status === 'Em Rota' && order.courier && (
                          <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1.5 rounded-lg">
                            <MapPin size={12} className="text-slate-500" />
                            <span className="text-xs font-bold text-slate-600">{order.courier}</span>
                          </div>
                        )}
                        <button className="ml-auto text-slate-500 hover:text-teal-700 transition-colors"><PackageCheck size={17} /></button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {colOrders.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-40 text-slate-400">
                    <CheckCircle2 size={32} className="mb-2 opacity-50" />
                    <span className="text-sm font-medium">Nenhum pedido aqui</span>
                  </div>
                )}
              </div>
            </motion.section>
          );
        })}
      </div>
    </div>
  );
}
