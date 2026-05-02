import React, { useState } from 'react';
import { AlertTriangle, Bell, CheckCircle2, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex items-center justify-between px-4 sm:px-8 py-5 sticky top-0 z-10">
      <div className="relative group w-full max-w-md hidden md:block">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="text-slate-300 group-focus-within:text-teal-500 transition-colors" size={18} strokeWidth={2.5} />
        </div>
        <input
          type="text"
          placeholder="Buscar cliente, pedido ou crescimento..."
          className="w-full bg-white border border-slate-200/70 rounded-lg py-3 pl-12 pr-4 text-sm font-medium text-slate-700 focus:outline-none focus:ring-4 focus:ring-teal-500/10 transition-all placeholder-slate-400"
        />
      </div>

      <div className="flex items-center gap-4 ml-auto relative">
        <div className="hidden lg:flex items-center gap-2 rounded-lg bg-white border border-slate-200/70 px-3 py-2">
          <CheckCircle2 size={16} className="text-emerald-600" />
          <span className="text-xs font-black text-slate-600">CRM saudavel</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setOpen((value) => !value)}
          className="relative p-3 text-teal-600 hover:text-teal-700 bg-white hover:bg-white rounded-lg transition-all border border-slate-200/70"
          aria-label="Abrir notificacoes"
        >
          <Bell size={20} strokeWidth={2.5} />
          <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-rose-500 rounded-full shadow-[0_0_0_3px_#FFF]" />
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              className="absolute right-0 top-14 w-[min(360px,calc(100vw-2rem))] bg-white rounded-xl border border-slate-200/70 shadow-lg p-4"
            >
              <h3 className="font-black text-slate-800 mb-3">Notificacoes criticas</h3>
              <div className="space-y-3">
                <div className="flex gap-3 rounded-lg bg-rose-50 p-3">
                  <AlertTriangle size={18} className="text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-black text-rose-800">1 pedido atrasado em rota</p>
                    <p className="text-xs font-medium text-rose-600">Roberto Silva esta ha 42 min aguardando.</p>
                  </div>
                </div>
                <div className="flex gap-3 rounded-lg bg-amber-50 p-3">
                  <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-black text-amber-800">Campanha bloqueada</p>
                    <p className="text-xs font-medium text-amber-700">9 contatos sem opt-in foram removidos.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
