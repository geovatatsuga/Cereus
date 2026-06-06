import React from 'react';
import { NavItem } from './NavItem';
import {
  BarChart3,
  Beaker,
  ChevronDown,
  Crown,
  HeartHandshake,
  Home,
  MoreVertical,
  Package,
  Plug,
  Settings,
  Target,
  Users,
} from 'lucide-react';

export function Sidebar({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) {
  return (
    <aside className="relative z-20 flex w-18 flex-col justify-between overflow-hidden bg-[#053B3A] bg-[linear-gradient(180deg,#063F3F_0%,#042F30_54%,#032727_100%)] px-3 py-4 shadow-[18px_0_50px_rgba(5,59,58,0.12)] transition-all md:w-[205px] md:py-5">
      <div className="absolute inset-x-0 top-0 h-60 bg-[radial-gradient(circle_at_28%_8%,rgba(125,211,192,0.22),transparent_42%)]" />
      <div className="relative z-10">
        <button onClick={() => setActiveTab('hoje')} className="mb-7 flex w-full items-center justify-center gap-3 px-1 group md:justify-start md:px-2">
          <div className="flex items-center justify-center transition-all duration-300">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
              <rect x="2" y="7" width="5" height="10" rx="2.5" fill="#46B29D" />
              <rect x="9.5" y="2" width="5" height="20" rx="2.5" fill="url(#cereusGrad)" />
              <rect x="17" y="7" width="5" height="10" rx="2.5" fill="#46B29D" />
              <defs>
                <linearGradient id="cereusGrad" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#7DD3C0" />
                  <stop offset="1" stopColor="#46B29D" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="hidden text-left md:block">
            <h1 className="text-[21px] font-bold leading-none text-white/95">cereus ai</h1>
          </div>
        </button>

        <div className="space-y-6">
          <nav className="flex flex-col gap-1.5">
            <NavItem icon={<Home />} label="Início" active={activeTab === 'hoje'} onClick={() => setActiveTab('hoje')} />
            <NavItem icon={<Package />} label="Pedidos" active={activeTab === 'operacao'} onClick={() => setActiveTab('operacao')} />
            <NavItem icon={<Users />} label="Clientes" active={activeTab === 'audiencia'} onClick={() => setActiveTab('audiencia')} />
            <NavItem icon={<HeartHandshake />} label="Fidelidade" active={activeTab === 'atendimento'} onClick={() => setActiveTab('atendimento')} />
            <NavItem icon={<Target />} label="Campanhas" active={activeTab === 'campanhas'} onClick={() => setActiveTab('campanhas')} />
            <NavItem icon={<BarChart3 />} label="Resultados" active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
            <NavItem icon={<Beaker />} label="Lab de IA" active={activeTab === 'inteligencia'} onClick={() => setActiveTab('inteligencia')} />
          </nav>

          <div className="mx-1 hidden h-px bg-white/12 md:block" />

          <div>
            <p className="mb-3 hidden px-3 text-[11px] font-bold uppercase tracking-[0.08em] text-white/72 md:block">Configurações</p>
            <nav className="flex flex-col gap-1.5">
              <NavItem icon={<Plug />} label="Integrações" active={false} onClick={() => setActiveTab('configuracoes')} />
              <NavItem icon={<Settings />} label="Configurações" active={activeTab === 'configuracoes'} onClick={() => setActiveTab('configuracoes')} />
            </nav>
          </div>
        </div>
      </div>

      <div className="relative z-10 hidden space-y-3.5 md:block">
        <button className="relative w-full overflow-hidden rounded-xl border border-white/12 bg-white/7 p-3 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          <div className="absolute -bottom-5 right-7 flex items-end gap-1 opacity-10">
            <span className="h-7 w-3 rounded-full bg-[#7DD3C0]" />
            <span className="h-12 w-3 rounded-full bg-[#7DD3C0]" />
            <span className="h-5 w-3 rounded-full bg-[#7DD3C0]" />
          </div>
          <div className="relative flex items-center justify-between gap-3">
            <div>
              <p className="text-[13px] font-bold text-white">Bella's Bistro</p>
              <p className="mt-2.5 flex items-center gap-2 text-[11px] font-semibold text-white/72"><Crown size={12} className="text-[#F7D36B]" /> Plano Premium</p>
            </div>
            <ChevronDown size={17} className="text-white/72" />
          </div>
        </button>

        <button
          onClick={() => setActiveTab('configuracoes')}
          className="flex w-full items-center gap-3 rounded-2xl text-left"
        >
          <img src="https://i.pravatar.cc/150?img=12" alt="Alex Morgan" className="h-9 w-9 rounded-full shadow-sm ring-2 ring-white/20" />
          <div className="min-w-0">
            <p className="truncate text-[13px] font-bold text-white">Alex Morgan</p>
            <p className="truncate text-xs font-medium text-white/65">Administrador</p>
          </div>
          <MoreVertical size={18} className="ml-auto text-white/70" />
        </button>
      </div>
    </aside>
  );
}
