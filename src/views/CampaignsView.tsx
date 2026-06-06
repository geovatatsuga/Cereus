import React from 'react';
import { CalendarDays, ChevronDown, Mail, MoreVertical, Send, Target } from 'lucide-react';
import { Area, AreaChart, Line, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { cardClass, CereusMark, KpiTile, pageInner, pageShell, Pill, SectionTitle } from '../components/ui/DashboardWidgets';
import { businessMetrics } from '../data/businessMetrics';

const perf = [
  { name: '12 abr', receita: 5, custo: 2 },
  { name: '19 abr', receita: 9, custo: 3 },
  { name: '26 abr', receita: 15, custo: 6 },
  { name: '3 mai', receita: 12, custo: 5 },
  { name: '10 mai', receita: 18, custo: 8 },
];

const campaigns = [
  ['Especial Dia das Mães', '12.842', 'E-mail', 'R$ 286', 'R$ 9.842', '34,4x', 'Ativa'],
  ['Win-back 45+ dias', '1.136', 'E-mail', 'R$ 124', 'R$ 4.756', '38,4x', 'Concluída'],
  ['Upsell VIP - Menu primavera', '2.341', 'SMS', 'R$ 88', 'R$ 3.219', '36,6x', 'Concluída'],
  ['Boas-vindas novos clientes', 'Novos', 'E-mail', 'R$ 162', 'R$ 6.341', '21,3x', 'Ativa'],
  ['Oferta de aniversário', 'Este mês', 'E-mail', 'R$ 110', 'R$ 2.914', '26,5x', 'Ativa'],
];

export function CampaignsView() {
  return (
    <div className={pageShell}>
      <div className={pageInner}>
        <section className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle title="Campanhas e crescimento" subtitle="Crie, automatize e otimize campanhas que geram resultado real." />
          <div className="flex flex-wrap gap-3">
            <button className="rounded-xl border border-[#E5ECEA] bg-white px-4 py-2.5 text-sm font-bold text-[#64748B]"><CalendarDays className="mr-2 inline" size={16} /> 12 abr - 12 mai, 2025 <ChevronDown className="ml-2 inline" size={15} /></button>
            <button className="rounded-xl bg-[#053B3A] px-5 py-2.5 text-sm font-bold text-white">Criar campanha <ChevronDown className="ml-2 inline" size={15} /></button>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <KpiTile icon={<Target size={20} />} label="Receita de campanhas" value={businessMetrics.campaigns.revenue} change="22,7% vs 30 dias" />
          <KpiTile icon={<Target size={20} />} label="ROI total" value={businessMetrics.campaigns.roi} change="18,3% vs 30 dias" />
          <KpiTile icon={<Mail size={20} />} label="E-mails enviados" value={businessMetrics.campaigns.emailsSent} change="12,1% vs 30 dias" />
          <KpiTile icon={<Send size={20} />} label="Conversões" value={businessMetrics.campaigns.conversions} change="16,6% vs 30 dias" />
        </section>

        <section className={`${cardClass} bg-[#E8F8F5] p-4`}>
          <div className="grid gap-4 lg:grid-cols-[90px_1.2fr_1fr_260px] lg:items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white"><CereusMark className="h-14 w-14" /></div>
            <div>
              <p className="mb-2 flex items-center gap-2 text-sm font-bold text-[#0F8F86]">Campanha recomendada</p>
              <h3 className="text-lg font-bold text-[#082F35]">Lance uma campanha win-back para clientes inativos</h3>
              <p className="mt-1 text-sm font-semibold text-[#42526B]">Encontramos {businessMetrics.campaigns.audienceSize} clientes sem pedido há 45+ dias. Campanhas similares geraram {businessMetrics.campaigns.potentialRevenue} com ROI de {businessMetrics.campaigns.expectedRoi}.</p>
            </div>
            <div className="grid grid-cols-3 rounded-xl bg-white p-4 text-sm">
              {[`Receita potencial|${businessMetrics.campaigns.potentialRevenue}`, `ROI esperado|${businessMetrics.campaigns.expectedRoi}`, `Público|${businessMetrics.campaigns.audienceSize}`].map((item) => {
                const [label, value] = item.split('|');
                return <div key={label} className="border-r border-[#E5ECEA] last:border-0"><p className="text-xs font-semibold text-[#64748B]">{label}</p><b className="text-lg text-[#082F35]">{value}</b></div>;
              })}
            </div>
            <div className="flex justify-end gap-3">
              <button className="rounded-lg border border-[#E5ECEA] bg-white px-4 py-2.5 text-sm font-bold text-[#082F35]">Ver público</button>
              <button className="rounded-lg bg-[#053B3A] px-4 py-2.5 text-sm font-bold text-white">Criar campanha</button>
            </div>
          </div>
        </section>

        <section className="grid items-stretch gap-3 xl:grid-cols-[1.5fr_0.8fr]">
          <article className={`${cardClass} overflow-hidden`}>
            <div className="flex items-center justify-between px-5 py-4"><h3 className="font-bold text-[#082F35]">Campanhas recentes</h3><button className="text-sm font-bold text-[#0F8F86]">Ver todas →</button></div>
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs font-bold text-[#64748B]"><tr><th className="px-5 py-3">Campanha</th><th>Público</th><th>Canal</th><th>Custo</th><th>Receita</th><th>ROI</th><th>Status</th><th /></tr></thead>
              <tbody className="divide-y divide-[#E5ECEA]">{campaigns.map((row, i) => <tr key={row[0]}><td className="px-5 py-3"><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#053B3A] text-white"><Mail size={16} /></span><div><b>{row[0]}</b><p className="text-xs text-[#64748B]">Enviada em maio</p></div></div></td>{row.slice(1, 6).map((cell) => <td key={cell} className="font-semibold text-[#082F35]">{cell}</td>)}<td><Pill tone={row[6] === 'Ativa' ? 'teal' : 'slate'}>{row[6]}</Pill></td><td><MoreVertical size={16} /></td></tr>)}</tbody>
            </table>
          </article>
          <article className={`${cardClass} p-4`}>
            <div className="mb-4 flex items-center justify-between"><h3 className="font-bold text-[#082F35]">Performance</h3><button className="rounded-lg border border-[#E5ECEA] px-3 py-2 text-xs font-bold">30 dias</button></div>
            <div className="mb-2 grid grid-cols-2"><div><p className="text-xs text-[#64748B]">Receita total</p><b className="text-xl text-[#082F35]">{businessMetrics.campaigns.revenue}</b></div><div><p className="text-xs text-[#64748B]">ROI total</p><b className="text-xl text-[#082F35]">{businessMetrics.campaigns.roi}</b></div></div>
            <div className="h-[155px]"><ResponsiveContainer width="100%" height="100%"><AreaChart data={perf}><defs><linearGradient id="campPerf" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#7DD3C0" stopOpacity={0.36}/><stop offset="1" stopColor="#7DD3C0" stopOpacity={0.04}/></linearGradient></defs><XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize:10, fill:'#64748B'}}/><YAxis axisLine={false} tickLine={false} tick={{fontSize:10, fill:'#64748B'}}/><Area dataKey="receita" stroke="#20B5A7" strokeWidth={3} fill="url(#campPerf)" dot={false} isAnimationActive={false}/><Line dataKey="custo" stroke="#8DDDD1" strokeWidth={2} dot={false}/></AreaChart></ResponsiveContainer></div>
            <div className="grid grid-cols-4 rounded-xl bg-[#F1F6F4] p-3 text-xs font-semibold text-[#42526B]"><span>Custo<br/><b>{businessMetrics.campaigns.cost}</b></span><span>Receita<br/><b>{businessMetrics.campaigns.revenue}</b></span><span>ROI<br/><b>{businessMetrics.campaigns.roi}</b></span><span>Conversões<br/><b>{businessMetrics.campaigns.conversions}</b></span></div>
          </article>
        </section>

        <section className={`${cardClass} p-3`}>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-[#082F35]">Automações</h3>
                <Pill>3 ativas</Pill>
              </div>
              <p className="mt-1 text-xs font-semibold text-[#64748B]">Boas-vindas, carrinho abandonado e pós-compra rodando em segundo plano.</p>
            </div>
            <div className="grid flex-1 gap-2 sm:grid-cols-3 lg:max-w-[620px]">
              {[
                ['Melhor automação', 'Boas-vindas', '21,3% conv.'],
                ['Receita gerada', 'R$ 30.715', '+14,2%'],
                ['Envios automáticos', '7.203', '30 dias'],
              ].map(([label, value, detail]) => (
                <div key={label} className="rounded-xl bg-[#F1F6F4] px-3 py-2">
                  <p className="text-[11px] font-bold text-[#64748B]">{label}</p>
                  <b className="text-sm text-[#082F35]">{value}</b>
                  <span className="ml-2 text-[11px] font-bold text-[#0F8F86]">{detail}</span>
                </div>
              ))}
            </div>
            <button className="rounded-lg border border-[#E5ECEA] bg-white px-4 py-2 text-sm font-bold text-[#0F8F86]">Ver automações →</button>
          </div>
        </section>
      </div>
    </div>
  );
}
