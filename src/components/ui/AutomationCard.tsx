import React from 'react';
import { motion } from 'motion/react';

export function AutomationCard({ title, trigger, action, icon, color, statusColor, metrics }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3 }}
      className="bg-white relative flex flex-col overflow-hidden group rounded-xl border border-slate-200/70 transition-all h-full"
    >
      <div className="p-5 flex flex-col flex-1 bg-white">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-lg bg-gradient-to-br ${color} text-white shadow-sm`}>
              {icon}
            </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{statusColor.includes('teal') ? 'Rodando' : 'Pausa'}</span>
            <div className={`w-2 h-2 rounded-full ${statusColor} ${statusColor.includes('teal') ? 'animate-pulse' : ''}`}></div>
          </div>
        </div>
        
        <h4 className="font-bold text-base text-slate-950 mb-4">{title}</h4>

        <div className="grid grid-cols-2 gap-2 mb-5">
          <div className="rounded-lg bg-slate-50 border border-slate-100 p-3">
            <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Gatilho</span>
            <p className="text-xs font-bold text-slate-700 truncate mt-1">{trigger}</p>
          </div>
          <div className="rounded-lg bg-slate-50 border border-slate-100 p-3">
            <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Saida</span>
            <p className="text-xs font-bold text-slate-700 truncate mt-1">{action}</p>
          </div>
        </div>

        <div className="mt-auto grid grid-cols-3 gap-2 pt-4 border-t border-slate-100">
           <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Exec.</span>
              <span className="text-sm font-black text-slate-700">{metrics.sent}</span>
           </div>
           <div className="flex flex-col border-l border-slate-100 pl-3">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Conv.</span>
              <span className="text-sm font-black text-emerald-600">{metrics.conv}</span>
           </div>
           <div className="flex flex-col border-l border-slate-100 pl-3">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Receita</span>
              <span className="text-sm font-black text-slate-700">{metrics.rev}</span>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
