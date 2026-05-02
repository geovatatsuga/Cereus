import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { FadeView } from '../ui/FadeView';
import { AnimatePresence } from 'motion/react';
import { DashboardView } from '../../views/DashboardView';
import { HojeView } from '../../views/HojeView';
import { AudienciaView } from '../../views/AudienciaView';
import { AtendimentoView } from '../../views/AtendimentoView';
import { OperacaoView } from '../../views/OperacaoView';
import { AnalyticsView } from '../../views/AnalyticsView';
import { IAView } from '../../views/IAView';
import { InteligenciaView } from '../../views/InteligenciaView';
import { SettingsView } from '../../views/SettingsView';
import { CampaignsView } from '../../views/CampaignsView';

export function AppLayout() {
  const [activeTab, setActiveTab] = useState('hoje');

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-700 font-sans overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 flex flex-col h-full overflow-y-auto bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC] via-[#F8FAFC]/90 to-white pointer-events-none"></div>
        
        <Header />

        <AnimatePresence mode="wait">
          {activeTab === 'hoje' && <FadeView key="hoje"><HojeView /></FadeView>}
          {activeTab === 'dashboard' && <FadeView key="dashboard"><DashboardView /></FadeView>}
          {activeTab === 'audiencia' && <FadeView key="audiencia"><AudienciaView /></FadeView>}
          {activeTab === 'atendimento' && <FadeView key="atendimento"><AtendimentoView /></FadeView>}
          {activeTab === 'campanhas' && <FadeView key="campanhas"><CampaignsView /></FadeView>}
          {activeTab === 'operacao' && <FadeView key="operacao"><OperacaoView /></FadeView>}
          {activeTab === 'analytics' && <FadeView key="analytics"><AnalyticsView /></FadeView>}
          {activeTab === 'ia' && <FadeView key="ia"><IAView /></FadeView>}
          {activeTab === 'inteligencia' && <FadeView key="inteligencia"><InteligenciaView /></FadeView>}
          {activeTab === 'configuracoes' && <FadeView key="configuracoes"><SettingsView /></FadeView>}
        </AnimatePresence>
      </main>
    </div>
  );
}
