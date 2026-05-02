import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line } from 'recharts';

export function KpiCard({ title, value, change, isPositive, icon, highlight, borderTop, data }: any) {
  const chartColor = highlight ? '#2dd4bf' : (isPositive ? '#10b981' : '#f43f5e');
  
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className={`rounded-[1.25rem] p-5 shadow-sm border transition-shadow flex flex-col ${highlight ? 'bg-gradient-to-br from-slate-800 to-slate-900 text-white border-slate-700 shadow-xl' : `bg-white border-slate-100/60 hover:shadow-md ${borderTop}`}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2.5 rounded-xl ${highlight ? 'bg-white/10 text-teal-400' : 'bg-slate-50 text-slate-600'}`}>
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${
          isPositive 
            ? (highlight ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-50 text-emerald-600') 
            : (highlight ? 'bg-rose-500/20 text-rose-300' : 'bg-rose-50 text-rose-500')
        }`}>
          {isPositive ? <TrendingUp size={12} strokeWidth={3} /> : <TrendingDown size={12} strokeWidth={3} />}
          {change}
        </div>
      </div>
      <div>
        <h4 className={`text-xs font-bold uppercase tracking-wide mb-1 ${highlight ? 'text-slate-400' : 'text-slate-400'}`}>{title}</h4>
        <div className={`text-2xl font-black tracking-tight ${highlight ? 'text-white' : 'text-slate-900'}`}>{value}</div>
      </div>
      {data && (
        <div className="h-10 mt-3 -mx-2 w-[calc(100%+16px)]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.map((val: any, idx: number) => ({ value: val, index: idx }))}>
              <Line type="monotone" dataKey="value" stroke={chartColor} strokeWidth={2.5} dot={false} isAnimationActive={true} animationDuration={1500} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.div>
  );
}
