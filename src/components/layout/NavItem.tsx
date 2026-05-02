import React from 'react';
import { motion } from 'motion/react';

export function NavItem({ icon, label, active, onClick, badge }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void, badge?: string }) {
  return (
    <button 
      onClick={onClick}
      className={`group w-full relative flex items-center justify-center md:justify-start gap-4 px-4 py-3 rounded-lg transition-all duration-300 ${
        active 
          ? 'text-slate-900 bg-white border border-slate-200/70' 
          : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100/50 border border-transparent'
      }`}
    >
      {active && (
        <motion.div 
          layoutId="activeTabIndicator"
          className="absolute left-0 top-[20%] bottom-[20%] w-1 bg-teal-500 rounded-r-full"
          initial={false}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <div className={`transition-colors duration-300 ${active ? 'text-teal-600' : ''}`}>
        {React.cloneElement(icon as React.ReactElement, { strokeWidth: active ? 2.5 : 2, size: active ? 20 : 20 })}
      </div>
      <span className={`hidden md:block whitespace-nowrap text-sm ${active ? 'font-bold' : 'font-medium'}`}>{label}</span>
      
      {badge && (
        <span className="hidden md:block ml-auto bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-md">
          {badge}
        </span>
      )}
    </button>
  );
}
