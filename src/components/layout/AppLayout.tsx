import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { FadeView } from '../ui/FadeView';
import { AnimatePresence } from 'motion/react';
import { HojeView } from '../../views/HojeView';
import { AudienciaView } from '../../views/AudienciaView';
import { AtendimentoView } from '../../views/AtendimentoView';
import { OperacaoView } from '../../views/OperacaoView';
import { AnalyticsView } from '../../views/AnalyticsView';
import { IAView } from '../../views/IAView';
import { InteligenciaView } from '../../views/InteligenciaView';
import { SettingsView } from '../../views/SettingsView';
import { CampaignsView } from '../../views/CampaignsView';

function CereusMark({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <rect x="10" y="17" width="8" height="15" rx="4" fill="currentColor" opacity="0.74" />
      <rect x="21" y="9" width="7" height="30" rx="3.5" fill="currentColor" />
      <rect x="31" y="17" width="8" height="15" rx="4" fill="currentColor" opacity="0.74" />
    </svg>
  );
}

export function AppLayout() {
  const [activeTab, setActiveTab] = useState('hoje');

  return (
    <div className="dashboard-fit-viewport bg-[#F7F7F4]">
      <div className="dashboard-fit-shell flex bg-[#F7F7F4] text-slate-700 font-sans overflow-hidden">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 flex h-full flex-col bg-[#F7F7F4] relative dashboard-main">

          <Header />

          <div className={`dashboard-scale-stage dashboard-tab-${activeTab}`}>
            <AnimatePresence mode="wait">
              {activeTab === 'hoje' && <FadeView key="hoje"><HojeView onNavigate={setActiveTab} /></FadeView>}
              {activeTab === 'audiencia' && <FadeView key="audiencia"><AudienciaView /></FadeView>}
              {activeTab === 'atendimento' && <FadeView key="atendimento"><AtendimentoView /></FadeView>}
              {activeTab === 'campanhas' && <FadeView key="campanhas"><CampaignsView /></FadeView>}
              {activeTab === 'operacao' && <FadeView key="operacao"><OperacaoView /></FadeView>}
              {activeTab === 'analytics' && <FadeView key="analytics"><AnalyticsView /></FadeView>}
              {activeTab === 'ia' && <FadeView key="ia"><IAView /></FadeView>}
              {activeTab === 'inteligencia' && <FadeView key="inteligencia"><InteligenciaView /></FadeView>}
              {activeTab === 'configuracoes' && <FadeView key="configuracoes"><SettingsView /></FadeView>}
            </AnimatePresence>
          </div>
        </main>
      </div>

      <button
        onClick={() => setActiveTab('ia')}
        className="group fixed bottom-5 right-5 z-50 flex h-[58px] w-[58px] items-center justify-center rounded-full border-4 border-[#BFF4EC] bg-[#0F8F86] text-white shadow-[0_0_0_7px_rgba(23,184,171,0.12),0_16px_36px_rgba(15,143,134,0.34)] transition hover:scale-105"
        aria-label="Abrir assistente"
      >
        <span className="pointer-events-none absolute -top-10 right-0 rounded-lg bg-[#082F35] px-3 py-2 text-xs font-black text-white opacity-0 shadow-lg transition group-hover:opacity-100">
          Assistente
        </span>
        <CereusMark className="h-8 w-8" />
        <span className="sr-only">Abrir assistente</span>
      </button>
    </div>
  );
}
