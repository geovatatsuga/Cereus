import React from 'react';
import { motion } from 'motion/react';

export function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void, badge?: string }) {
  return (
    <button 
      onClick={onClick}
      className={`group w-full relative flex items-center justify-center md:justify-start gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
        active 
          ? 'text-white bg-white/14 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_12px_30px_rgba(0,0,0,0.16)]' 
          : 'text-white/72 hover:text-white hover:bg-white/8 border border-transparent'
      }`}
    >
      {active && (
        <motion.div 
          layoutId="activeTabIndicator"
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/14 to-[#7DD3C0]/12"
          initial={false}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <div className={`relative z-10 transition-colors duration-300 ${active ? 'text-white' : 'text-white/74 group-hover:text-white'}`}>
        {React.cloneElement(icon as React.ReactElement, { strokeWidth: active ? 2.3 : 2, size: 18 })}
      </div>
      <span className={`relative z-10 hidden md:block whitespace-nowrap text-[13px] ${active ? 'font-bold' : 'font-semibold'}`}>{label}</span>
    </button>
  );
}
