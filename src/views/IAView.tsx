import React from 'react';
import { ArrowRight, Database, Mail, Paperclip, Send, Shield, Sparkles, Target, UserRound } from 'lucide-react';
import { cardClass, KpiTile, pageInner, pageShell, SectionTitle } from '../components/ui/DashboardWidgets';
import { businessMetrics } from '../data/businessMetrics';

export function IAView() {
  return (
    <div className={pageShell}>
      <div className={pageInner}>
        <section className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle title="Assistente" subtitle="Faça perguntas, encontre oportunidades e transforme recomendações em ações." />
          <button className="rounded-xl border border-[#E5ECEA] bg-white px-4 py-2.5 text-sm font-bold text-[#082F35]">Novo chat</button>
        </section>
        <section className="grid items-stretch gap-3 xl:grid-cols-[1fr_360px]">
          <article className={`${cardClass} min-h-[520px] p-4`}>
            <div className="space-y-7">
              <div className="flex gap-3"><Sparkles className="mt-1 text-[#0F8F86]" /><div><b className="text-[#082F35]">Cereus</b><p className="mt-2 text-sm font-semibold text-[#42526B]">Oi Alex! Posso ajudar você a entender performance, encontrar oportunidades e tomar ações.</p><p className="mt-1 text-xs text-[#64748B]">9:41</p></div></div>
              <div className="flex justify-end gap-3"><div className="rounded-xl bg-[#E8F8F5] px-5 py-3 text-sm font-semibold text-[#082F35]">Como está a performance do CRM este mês?</div><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8F8F5] font-bold">AM</span></div>
              <div className="flex gap-3"><Sparkles className="mt-1 text-[#0F8F86]" /><div className="max-w-[760px]"><b className="text-[#082F35]">Cereus</b><p className="mt-2 text-sm font-semibold text-[#42526B]">Aqui está um resumo rápido da performance em maio até agora.</p><div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><KpiTile icon={<Target size={18}/>} label="Receita total" value={businessMetrics.analytics.totalRevenue} change="22,7% vs período" /><KpiTile icon={<UserRound size={18}/>} label="Novos clientes" value="203" change="15,6%" /><KpiTile icon={<Target size={18}/>} label="Recompra" value={businessMetrics.loyalty.repeatRate} change="8,4%" /><KpiTile icon={<Sparkles size={18}/>} label="Em risco" value="213" change="18,3%" danger /></div><button className="mt-3 rounded-lg border border-[#E5ECEA] bg-white px-4 py-2.5 text-sm font-bold text-[#082F35]">Ver dashboard completo →</button></div></div>
              <div className="flex justify-end gap-3"><div className="rounded-xl bg-[#E8F8F5] px-5 py-3 text-sm font-semibold text-[#082F35]">Quais clientes têm maior risco de parar de comprar?</div><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8F8F5] font-bold">AM</span></div>
              <div className="flex gap-3"><Sparkles className="mt-1 text-[#0F8F86]" /><div className="max-w-[700px]"><b className="text-[#082F35]">Cereus</b><p className="mt-2 text-sm font-semibold text-[#42526B]">Estes clientes reduziram frequência, tempo desde o último pedido ou engajamento.</p><table className="mt-4 w-full text-left text-sm"><thead className="bg-slate-50 text-xs text-[#64748B]"><tr><th className="p-3">Cliente</th><th>Último pedido</th><th>LTV</th><th>Risco</th><th>Fator</th></tr></thead><tbody className="divide-y divide-[#E5ECEA]">{[['Jessica Brown','30 abr','R$ 89','Alto','Poucos pedidos'],['David Wilson','3 mai','R$ 567','Médio','Queda de frequência'],['Emily Davis','25 abr','R$ 312','Médio','Engajamento caiu']].map(r=><tr key={r[0]}>{r.map(c=><td key={c} className="p-3 font-semibold">{c}</td>)}</tr>)}</tbody></table><div className="mt-3 flex gap-3"><button className="rounded-lg border border-[#E5ECEA] bg-white px-4 py-2.5 text-sm font-bold text-[#082F35]">Ver clientes em risco</button><button className="rounded-lg bg-[#053B3A] px-4 py-2.5 text-sm font-bold text-white">Criar campanha win-back</button></div></div></div>
            </div>
            <div className="mt-8 rounded-2xl border border-[#E5ECEA] p-3"><input className="w-full bg-transparent px-2 py-2 text-sm outline-none" placeholder="Pergunte qualquer coisa sobre clientes, pedidos ou campanhas..." /><div className="flex justify-between"><Paperclip size={18} className="text-[#64748B]" /><button className="rounded-full bg-[#E8F8F5] p-2 text-[#0F8F86]"><Send size={18}/></button></div></div>
          </article>
          <aside className="space-y-3">
            <article className={`${cardClass} p-4`}><h3 className="mb-4 font-bold text-[#082F35]">Sugestões de pergunta</h3>{['Mostrar resumo de vendas de hoje','Recomendar campanha para clientes inativos','Quais itens geram recompra?','Quais segmentos mais crescem?','Como melhorar retenção?'].map(x=><button key={x} className="mb-2 flex w-full justify-between rounded-lg border border-[#E5ECEA] px-3 py-3 text-left text-sm font-semibold text-[#082F35]">{x}<ArrowRight size={16}/></button>)}</article>
            <article className={`${cardClass} p-4`}><h3 className="mb-4 flex items-center gap-2 font-bold text-[#082F35]"><Target size={18}/>Ações recomendadas</h3>{[['Lançar win-back','Criar campanha'],['Reativar clientes','Ver clientes'],['Promover campeões','Ver itens']].map(r=><div key={r[0]} className="mb-3 flex items-center justify-between rounded-lg border border-[#E5ECEA] p-3"><span className="text-sm font-semibold">{r[0]}</span><button className="rounded-md bg-[#053B3A] px-3 py-1.5 text-xs font-bold text-white">{r[1]}</button></div>)}</article>
            <article className={`${cardClass} p-4`}><h3 className="mb-4 flex items-center gap-2 font-bold text-[#082F35]"><Database size={18}/>Fontes usadas</h3>{['Pedidos e transações','Perfis de clientes','Performance de campanhas','Cardápio e produtos'].map(x=><p key={x} className="mb-3 text-sm font-semibold text-[#42526B]">✓ {x}</p>)}</article>
            <article className={`${cardClass} p-4`}><h3 className="mb-3 flex items-center gap-2 font-bold text-[#082F35]"><Shield size={18}/>Por que confiar?</h3><p className="text-sm font-semibold leading-6 text-[#42526B]">O Cereus usa seus dados e modelos do setor para gerar recomendações revisáveis.</p></article>
          </aside>
        </section>
      </div>
    </div>
  );
}
