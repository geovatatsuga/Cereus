import React from 'react';
import { NavItem } from './NavItem';
import {
  BarChart3, Bot, BrainCircuit, Home, Inbox, LayoutDashboard, Megaphone, Settings, Sparkles,
  Utensils, Users, Zap,
} from 'lucide-react';

export function Sidebar({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) {
  return (
    <aside className="w-20 md:w-64 bg-slate-50 border-r border-slate-200/70 flex flex-col justify-between py-5 md:py-7 px-3 md:px-4 transition-all z-20 relative overflow-hidden">
      <div className="relative z-10">
        <button onClick={() => setActiveTab('hoje')} className="mb-8 px-2 md:px-4 flex items-center justify-center md:justify-start gap-4 group w-full">
          <div className="flex items-center justify-center group-hover:scale-105 transition-all duration-300">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 drop-shadow-sm">
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
          <div className="hidden md:block text-left">
            <h1 className="text-[22px] font-black tracking-tight leading-none text-[#0F3D3A] mb-0.5">cereus crm</h1>
            <p className="text-[9px] font-black uppercase tracking-widest text-[#46B29D] opacity-90">gestao inteligente</p>
          </div>
        </button>

        <div className="space-y-6">
          <nav className="flex flex-col gap-1">
            <NavItem icon={<Home size={20} />} label="Hoje" active={activeTab === 'hoje'} onClick={() => setActiveTab('hoje')} badge="Agora" />
            <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
            <NavItem icon={<Users size={20} />} label="Clientes" active={activeTab === 'audiencia'} onClick={() => setActiveTab('audiencia')} />
            <NavItem icon={<Inbox size={20} />} label="Atendimento" active={activeTab === 'atendimento'} onClick={() => setActiveTab('atendimento')} badge="6" />
            <NavItem icon={<Megaphone size={20} />} label="Campanhas" active={activeTab === 'campanhas'} onClick={() => setActiveTab('campanhas')} badge="ROI" />
            <NavItem icon={<Zap size={20} />} label="Jornadas" active={activeTab === 'automacoes'} onClick={() => setActiveTab('automacoes')} />
            <NavItem icon={<Utensils size={20} />} label="Operacao" active={activeTab === 'operacao'} onClick={() => setActiveTab('operacao')} />
          </nav>

          <div>
            <div className="hidden md:flex items-center gap-3 px-4 mb-3">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Decisao</span>
              <div className="h-px bg-slate-200 flex-1" />
            </div>
            <nav className="flex flex-col gap-1">
              <NavItem icon={<BarChart3 size={20} />} label="Metricas" active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
            </nav>
          </div>

          <div>
            <div className="hidden md:flex items-center gap-3 px-4 mb-3">
              <span className="text-[10px] font-black text-teal-600 uppercase tracking-widest flex items-center gap-1.5"><Sparkles size={12} /> IA</span>
              <div className="h-px bg-teal-100 flex-1" />
            </div>
            <nav className="flex flex-col gap-1">
              <NavItem icon={<Bot size={20} />} label="Cereus" active={activeTab === 'ia'} onClick={() => setActiveTab('ia')} badge="Chat" />
              <NavItem icon={<BrainCircuit size={20} />} label="Inteligencia" active={activeTab === 'inteligencia'} onClick={() => setActiveTab('inteligencia')} badge="Lab" />
            </nav>
          </div>
        </div>
      </div>

      <button
        onClick={() => setActiveTab('configuracoes')}
        className={`relative z-10 hidden md:flex items-center gap-3 px-3 py-2.5 rounded-2xl cursor-pointer transition-colors border text-left ${
          activeTab === 'configuracoes'
            ? 'bg-white shadow-[0_2px_10px_rgba(0,0,0,0.03)] border-slate-100'
            : 'hover:bg-slate-100/50 border-transparent'
        }`}
      >
        <img src="https://i.pravatar.cc/150?img=32" alt="User" className="w-10 h-10 rounded-full shadow-sm ring-2 ring-white" />
        <div className="min-w-0">
          <p className="text-sm font-black text-slate-700 truncate">Maria Silva</p>
          <p className="text-xs text-slate-500 font-medium truncate">Admin geral</p>
        </div>
        <Settings size={16} className="ml-auto text-slate-400" />
      </button>
    </aside>
  );
}
