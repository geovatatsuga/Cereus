import React from 'react';
import { CalendarDays, Gift, Heart, Mail, RefreshCw, Send, Star, Trophy, UserRound } from 'lucide-react';
import { cardClass, Donut, KpiTile, MiniArea, pageInner, pageShell, Pill, SectionTitle } from '../components/ui/DashboardWidgets';
import { businessMetrics } from '../data/businessMetrics';

const recompra = [
  { name: '6 mai', value: 22 },
  { name: '7 mai', value: 28 },
  { name: '8 mai', value: 24 },
  { name: '9 mai', value: 34 },
  { name: '10 mai', value: 41 },
  { name: '11 mai', value: 38 },
  { name: '12 mai', value: 46 },
];

const loyaltySegments = [
  { name: 'Campeões', value: 380, color: '#053B3A' },
  { name: 'Fiéis', value: 298, color: '#43C8B6' },
  { name: 'Potenciais', value: 271, color: '#9BE2D4' },
  { name: 'Novos', value: 217, color: '#D8F3EE' },
];

export function AtendimentoView() {
  return (
    <div className={pageShell}>
      <div className={pageInner}>
        <section className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle
            title="Fidelidade e recompra"
            subtitle="Acompanhe clientes fiéis, pontos, recompensas e oportunidades para aumentar a frequência de pedidos."
          />
          <button className="rounded-xl border border-[#E5ECEA] bg-white px-4 py-2.5 text-sm font-bold text-[#64748B]">
            <CalendarDays className="mr-2 inline" size={16} /> 12 de maio de 2025
          </button>
        </section>

        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <KpiTile icon={<UserRound size={20} />} label="Clientes recorrentes" value={businessMetrics.loyalty.repeatCustomers} change="12,4% vs 30 dias" />
          <KpiTile icon={<RefreshCw size={20} />} label="Taxa de recompra" value={businessMetrics.loyalty.repeatRate} change="8,4% vs 30 dias" />
          <KpiTile icon={<Gift size={20} />} label="Recompensas usadas" value={businessMetrics.loyalty.rewardsRedeemed} change="14,8% vs 30 dias" />
          <KpiTile icon={<Heart size={20} />} label="Clientes quase sumindo" value={businessMetrics.loyalty.slippingLoyalCustomers} change="acionar esta semana" danger />
        </section>

        <section className="grid items-stretch gap-3 xl:grid-cols-[0.9fr_1.1fr_0.9fr]">
          <article className={`${cardClass} p-4`}>
            <h3 className="mb-4 font-bold text-[#082F35]">Perfil de fidelidade</h3>
            <div className="grid grid-cols-[160px_1fr] items-center gap-3">
              <Donut data={loyaltySegments} center={businessMetrics.loyalty.repeatCustomers} sub="clientes" />
              <div className="space-y-3 text-sm font-semibold text-[#42526B]">
                {loyaltySegments.map((item) => (
                  <p key={item.name} className="flex justify-between">
                    <span><i className="mr-2 inline-block h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />{item.name}</span>
                    <b>{item.value}</b>
                  </p>
                ))}
              </div>
            </div>
            <button className="mt-4 text-sm font-bold text-[#0F8F86]">Ver segmentos fiéis →</button>
          </article>

          <article className={`${cardClass} p-4`}>
            <div className="mb-3 flex justify-between">
              <h3 className="font-bold text-[#082F35]">Recompra por semana</h3>
              <button className="rounded-lg border border-[#E5ECEA] px-3 py-2 text-xs font-bold">Últimos 7 dias</button>
            </div>
            <MiniArea data={recompra} height={205} />
            <div className="grid grid-cols-3 rounded-xl bg-[#F1F6F4] p-3 text-sm">
              <span>Pedidos recorrentes<br /><b>412</b></span>
              <span>Melhor dia<br /><b>46 recomp.</b></span>
              <span>Receita protegida<br /><b>R$ 18.420</b></span>
            </div>
          </article>

          <article className={`${cardClass} p-4`}>
            <h3 className="mb-4 font-bold text-[#082F35]">Programa de pontos</h3>
            <div className="grid grid-cols-2 items-center">
              <div>
                <p className="text-[27px] font-bold text-[#082F35]">{businessMetrics.loyalty.activeMembers}</p>
                <p className="text-sm font-semibold text-[#64748B]">membros ativos</p>
                <p className="mt-2 text-xs font-bold text-[#48BFAE]">↗ 15,3% vs 30 dias</p>
              </div>
              <Donut data={[{ name: 'Ativo', value: 72, color: '#43C8B6' }, { name: 'Outro', value: 28, color: '#D8F3EE' }]} center="72%" sub="ativos" size={130} />
            </div>
            {[`Pontos resgatados: ${businessMetrics.loyalty.pointsRedeemed}`, `Cupons usados: ${businessMetrics.loyalty.rewardsRedeemed}`, 'Engajamento: alto'].map((item) => (
              <p key={item} className="border-t border-[#E5ECEA] py-3 text-sm font-bold text-[#082F35]">
                {item} <span className="float-right text-[#0F8F86]">→</span>
              </p>
            ))}
          </article>
        </section>

        <section className="grid items-stretch gap-3 xl:grid-cols-[1.4fr_0.7fr]">
          <article className={`${cardClass} overflow-hidden`}>
            <div className="flex items-center justify-between p-4">
              <h3 className="font-bold text-[#082F35]">Clientes fiéis que precisam de ação <Pill tone="slate">12</Pill></h3>
              <button className="text-sm font-bold text-[#0F8F86]">Ver todos →</button>
            </div>
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs text-[#64748B]">
                <tr><th className="p-3">Cliente</th><th>Perfil</th><th>Último pedido</th><th>LTV</th><th>Risco</th><th>Próxima ação</th></tr>
              </thead>
              <tbody className="divide-y divide-[#E5ECEA]">
                {[
                  ['Sarah Johnson', 'Campeã', '18 mai', 'R$ 1.247', 'Baixo', 'Enviar menu VIP'],
                  ['Michael Chen', 'Fiel', '22 mai', 'R$ 842', 'Médio', 'Oferecer pontos extras'],
                  ['Emily Davis', 'Potencial', '25 mai', 'R$ 312', 'Médio', 'Incentivar 2º pedido'],
                  ['David Wilson', 'Campeão', '28 mai', 'R$ 1.247', 'Alto', 'Contato pessoal'],
                  ['Jessica Brown', 'Nova', '2 jun', 'R$ 567', 'Baixo', 'Mostrar benefícios'],
                ].map((row) => (
                  <tr key={row[0]}>
                    {row.slice(0, 4).map((cell) => <td key={cell} className="p-3 font-semibold text-[#082F35]">{cell}</td>)}
                    <td><Pill tone={row[4] === 'Alto' ? 'rose' : row[4] === 'Médio' ? 'amber' : 'teal'}>{row[4]}</Pill></td>
                    <td><Mail className="mr-2 inline text-[#0F8F86]" size={17} />{row[5]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>

          <article className={`${cardClass} bg-[#E8F8F5] p-4`}>
            <p className="text-sm font-bold text-[#0F8F86]">Próxima melhor ação</p>
            <h3 className="mt-6 text-lg font-bold text-[#082F35]">Criar desafio de recompra para clientes fiéis</h3>
            <p className="mt-3 text-sm font-semibold text-[#42526B]">
              Ofereça pontos em dobro para quem fizer o próximo pedido até sexta. Impacto estimado: +18% em recompra e {businessMetrics.loyalty.protectedRevenue} em receita protegida.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <span>Impacto<br /><b>+18%</b></span>
              <span>Público<br /><b>298 fiéis</b></span>
            </div>
            <button className="mt-5 rounded-lg bg-[#053B3A] px-4 py-3 text-sm font-bold text-white">
              <Send className="mr-2 inline" size={16} /> Criar desafio
            </button>
          </article>
        </section>

        <section className="grid items-stretch gap-3 xl:grid-cols-4">
          {[
            ['Campeões esfriando', '23 clientes', <Trophy size={22} />],
            ['Fiéis com queda', '31 clientes', <Star size={22} />],
            ['Novos sem retorno', '18 clientes', <RefreshCw size={22} />],
            ['Alto valor parado', '15 clientes', <Heart size={22} />],
          ].map(([title, value, icon]) => (
            <article key={String(title)} className={`${cardClass} p-4`}>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F8F5] text-[#0F8F86]">{icon}</div>
              <h4 className="font-bold text-[#082F35]">{title}</h4>
              <p className="mt-2 text-xl font-bold text-[#0F8F86]">{value}</p>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
