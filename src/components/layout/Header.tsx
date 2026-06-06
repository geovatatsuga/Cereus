import React, { useState } from 'react';
import { AlertTriangle, Bell, ChevronDown, CircleHelp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 flex h-11 items-center justify-end bg-[#F7F7F4]/90 px-4 backdrop-blur-xl sm:px-6 lg:px-7">
      <div className="relative flex shrink-0 items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setOpen((value) => !value)}
          className="relative rounded-xl p-2 text-[#082F35] transition-all hover:text-[#0F8F86]"
          aria-label="Abrir notificações"
        >
          <Bell size={21} strokeWidth={2.35} />
        </motion.button>
        <button className="hidden rounded-xl p-2 text-[#082F35] transition-all hover:text-[#0F8F86] sm:flex" aria-label="Ajuda">
          <CircleHelp size={22} strokeWidth={2.25} />
        </button>
        <button className="flex items-center gap-3" aria-label="Abrir perfil">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DDEAE7] bg-[#E8F8F5] text-[13px] font-black text-[#082F35]">AM</span>
          <ChevronDown size={18} className="text-[#31516C]" />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              className="absolute right-0 top-12 w-[min(360px,calc(100vw-2rem))] rounded-2xl border border-[#E5ECEA] bg-white p-4 shadow-xl"
            >
              <h3 className="mb-3 font-black text-[#082F35]">Notificações importantes</h3>
              <div className="space-y-3">
                <div className="flex gap-3 rounded-lg bg-rose-50 p-3">
                  <AlertTriangle size={18} className="mt-0.5 shrink-0 text-rose-600" />
                  <div>
                    <p className="text-sm font-black text-rose-800">1 pedido atrasado em rota</p>
                    <p className="text-xs font-medium text-rose-600">Pedido #10582 precisa de atenção.</p>
                  </div>
                </div>
                <div className="flex gap-3 rounded-lg bg-amber-50 p-3">
                  <AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber-600" />
                  <div>
                    <p className="text-sm font-black text-amber-800">Revisão de campanha pronta</p>
                    <p className="text-xs font-medium text-amber-700">136 clientes entram no segmento de retorno.</p>
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
