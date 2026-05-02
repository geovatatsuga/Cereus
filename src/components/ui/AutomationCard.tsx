import React from 'react';
import { motion } from 'motion/react';

export function AutomationCard({ title, trigger, action, icon, color, statusColor, metrics }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white/80 backdrop-blur-md relative flex flex-col overflow-hidden group rounded-[2rem] p-1 border border-slate-100 shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_40px_rgba(20,184,166,0.08)] transition-all h-full"
    >
      <div className="p-5 flex flex-col flex-1 bg-white rounded-[1.75rem]">
        <div className="flex justify-between items-start mb-5">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-2xl bg-gradient-to-br ${color} text-white shadow-sm`}>
              {icon}
            </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{statusColor.includes('teal') ? 'Rodando' : 'Pausa'}</span>
            <div className={`w-2 h-2 rounded-full ${statusColor} ${statusColor.includes('teal') ? 'animate-pulse' : ''}`}></div>
          </div>
        </div>
        
        <h4 className="font-bold text-lg text-slate-800 mb-4">{title}</h4>

        {/* Visual Workflow Flowchart Simplificado */}
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
            <div className="text-sm font-medium text-slate-500">{trigger}</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 ml-[1px]"></div>
            <div className="w-[2px] h-3 bg-slate-100 -ml-[5px]"></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
            <div className="text-sm font-bold text-slate-700">{action}</div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mt-auto grid grid-cols-3 gap-2 pt-4 border-t border-slate-100">
           <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Disparos</span>
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
