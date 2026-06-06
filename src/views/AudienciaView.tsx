import React, { useState } from 'react';
import { AlertTriangle, Crown, Download, Filter, Heart, Mail, MoreVertical, RefreshCw, Search, SlidersHorizontal, UserRound, Users } from 'lucide-react';
import { Area, AreaChart, Cell, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { cardClass, Donut, pageInner, pageShell, Pill, SectionTitle } from '../components/ui/DashboardWidgets';
import { businessMetrics } from '../data/businessMetrics';

const health = [
  { name: '6 mai', value: 18 },
  { name: '7 mai', value: 42 },
  { name: '8 mai', value: 28 },
  { name: '9 mai', value: 48 },
  { name: '10 mai', value: 66 },
  { name: '11 mai', value: 62 },
  { name: '12 mai', value: 76 },
];

const churn = [
  { name: 'Baixo risco', value: 735, color: '#9BE2D4' },
  { name: 'Risco médio', value: 413, color: '#F3C45E' },
  { name: 'Alto risco', value: 208, color: '#F46D61' },
];

const customers = [
  ['Sarah Johnson', 'sarah.j@email.com', 'Fiel', '11 de maio', 'R$ 842', 'Baixo', 'Enviar menu sazonal'],
  ['Michael Chen', 'mchen@email.com', 'VIP', '8 de maio', 'R$ 1.247', 'Baixo', 'Convidar para evento VIP'],
  ['Emily Davis', 'emily.d@email.com', 'Em risco', '18 de abril', 'R$ 312', 'Alto', 'Oferta de retorno'],
  ['David Wilson', 'david.w@email.com', 'Recorrente', '3 de maio', 'R$ 567', 'Médio', 'Sugerir assinatura'],
  ['Jessica Brown', 'jess.b@email.com', 'Novo', '30 de abril', 'R$ 89', 'Baixo', 'Incentivar 2º pedido'],
  ['Amanda Morgan', 'amanda.m@email.com', 'Fiel', '29 de abril', 'R$ 724', 'Baixo', 'Enviar cupom de sobremesa'],
  ['Robert Lee', 'robert.lee@email.com', 'Em risco', '14 de abril', 'R$ 276', 'Alto', 'Oferta win-back'],
  ['Paula Santos', 'paula.s@email.com', 'VIP', '10 de maio', 'R$ 1.086', 'Baixo', 'Menu exclusivo'],
  ['Daniel Garcia', 'daniel.g@email.com', 'Recorrente', '5 de maio', 'R$ 638', 'Medio', 'Lembrete de recompra'],
  ['Carla Mendes', 'carla.m@email.com', 'Novo', '1 de maio', 'R$ 118', 'Baixo', 'Incentivar 2o pedido'],
  ['Lucas Rocha', 'lucas.r@email.com', 'Fiel', '7 de maio', 'R$ 912', 'Baixo', 'Oferecer pontos extras'],
  ['Fernanda Alves', 'fernanda.a@email.com', 'Em risco', '12 de abril', 'R$ 354', 'Alto', 'Contato pessoal'],];

export function AudienciaView() {
  const [expanded, setExpanded] = useState(false);
  const visibleCustomers = expanded ? customers : customers.slice(0, 5);

  return (
    <div className={pageShell}>
      <div className={pageInner}>
        <section className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle title="Clientes" subtitle="Entenda seus clientes, aumente a fidelidade e cresça o valor de vida." />
          <div className="flex flex-wrap gap-3">
            <button className="rounded-xl border border-[#E5ECEA] bg-white px-4 py-2.5 text-sm font-bold text-[#64748B]"><Filter className="mr-2 inline" size={16} /> Mais filtros</button>
            <button className="rounded-xl border border-[#E5ECEA] bg-white px-4 py-2.5 text-sm font-bold text-[#64748B]"><Download className="mr-2 inline" size={16} /> Exportar</button>
          </div>
        </section>

        <section className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap gap-3">
            {[
              ['Todos', businessMetrics.customers.total, <Users size={15} />, 'teal'],
              ['VIP', '156', <Crown size={15} />, 'amber'],
              ['Em risco', '213', <AlertTriangle size={15} />, 'rose'],
              ['Retornando', '642', <RefreshCw size={15} />, 'teal'],
              ['Alto valor', '278', <Heart size={15} />, 'teal'],
            ].map(([label, count, icon, tone]) => (
              <button key={String(label)} className={`rounded-xl border px-3.5 py-2 text-sm font-bold ${label === 'Todos' ? 'border-[#0F8F86] bg-[#E8F8F5] text-[#0F8F86]' : 'border-[#E5ECEA] bg-white text-[#42526B]'}`}>
                {React.cloneElement(icon as React.ReactElement, { className: 'mr-2 inline' })} {label} <span className="ml-1 rounded-md bg-slate-100 px-1.5 py-0.5 text-[11px]">{count}</span>
              </button>
            ))}
          </div>
          <div className="relative w-full xl:w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" size={17} />
            <input className="w-full rounded-xl border border-[#E5ECEA] bg-white py-2.5 pl-10 pr-10 text-sm font-semibold outline-none" placeholder="Buscar clientes..." />
            <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]" size={17} />
          </div>
        </section>

        <section className={`${cardClass} relative overflow-hidden bg-[#E8F8F5] p-4`}>
          <button className="absolute right-5 top-4 text-[#64748B]">×</button>
          <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <p className="mb-3 flex items-center gap-2 text-sm font-bold text-[#0F8F86]">Oportunidade de retorno</p>
              <h3 className="text-xl font-bold text-[#082F35]">Recupere {businessMetrics.customers.atRisk} clientes em risco com uma oferta personalizada</h3>
              <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-[#42526B]">Esses clientes não pedem há mais de 21 dias, mas têm {businessMetrics.customers.recoveryProbability} de probabilidade de recomprar com o incentivo certo.</p>
              <div className="mt-4 flex gap-3">
                <button className="rounded-lg bg-[#053B3A] px-5 py-2.5 text-sm font-bold text-white">Criar campanha de retorno</button>
                <button className="text-sm font-bold text-[#0F8F86]">Ver clientes em risco →</button>
              </div>
            </div>
            <div className="grid grid-cols-[1fr_180px] items-center gap-4">
              <Donut data={[{ name: 'chance', value: 68, color: '#43C8B6' }, { name: 'resto', value: 32, color: '#D8F3EE' }]} center="68%" sub="retorno" size={150} />
              <div className="space-y-3 text-sm font-semibold text-[#42526B]">
                <p className="flex justify-between"><span>LTV médio</span><b className="text-[#082F35]">{businessMetrics.customers.avgLtv}</b></p>
                <p className="flex justify-between"><span>Risco</span><b className="text-rose-500">Alto</b></p>
                <p className="flex justify-between"><span>Canal ideal</span><b className="text-[#082F35]">E-mail</b></p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-3 lg:grid-cols-3">
          <article className={`${cardClass} p-4`}>
            <div className="mb-4 flex items-center justify-between"><h3 className="font-bold text-[#082F35]">Principais segmentos</h3><button className="text-xs font-bold text-[#0F8F86]">Ver todos</button></div>
            {[
              ['Clientes fiéis', 532, '39%', '#43C8B6'],
              ['Recorrentes', 421, '31%', '#7DD3C0'],
              ['Novos', 203, '15%', '#A7E6DC'],
              ['Em risco', 136, '10%', '#F46D61'],
              ['VIP', 64, '5%', '#F3C45E'],
            ].map(([label, value, pct, color]) => (
              <div key={String(label)} className="mb-3 grid grid-cols-[130px_1fr_80px] items-center gap-3 text-sm font-semibold">
                <span>{label}</span><span className="h-1.5 rounded-full bg-slate-100"><span className="block h-full rounded-full" style={{ width: pct as string, backgroundColor: color as string }} /></span><span className="text-right text-[#42526B]">{value} ({pct})</span>
              </div>
            ))}
          </article>
          <article className={`${cardClass} p-4`}>
            <div className="mb-4 flex items-center justify-between"><h3 className="font-bold text-[#082F35]">Clientes em risco</h3><button className="text-xs font-bold text-[#0F8F86]">Ver relatório</button></div>
            <div className="grid grid-cols-[150px_1fr] items-center gap-3">
              <Donut data={churn} center={businessMetrics.customers.total} sub="Total" size={150} />
              <div className="space-y-3 text-sm font-semibold text-[#42526B]">{churn.map((item) => <p key={item.name} className="flex justify-between"><span><i className="mr-2 inline-block h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />{item.name}</span><b>{item.value}</b></p>)}</div>
            </div>
          </article>
          <article className={`${cardClass} p-4`}>
            <div className="mb-2 flex items-center justify-between"><h3 className="font-bold text-[#082F35]">Saúde dos clientes</h3><button className="text-xs font-bold text-[#64748B]">Esta semana</button></div>
            <div className="mb-1 text-right text-2xl font-bold text-[#082F35]">{businessMetrics.customers.healthScore} <span className="text-xs text-[#48BFAE]">↗ 6%</span></div>
            <div className="h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={health}>
                  <defs><linearGradient id="customerHealth" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#7DD3C0" stopOpacity={0.38} /><stop offset="1" stopColor="#7DD3C0" stopOpacity={0.04} /></linearGradient></defs>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748B' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748B' }} />
                  <Area dataKey="value" stroke="#20B5A7" strokeWidth={3} fill="url(#customerHealth)" dot={false} isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </article>
        </section>

        <section className={`${cardClass} overflow-hidden`}>
          <div className="flex items-center justify-between px-5 py-4">
            <div>
              <h3 className="font-bold text-[#082F35]">Lista de clientes</h3>
              <p className="mt-1 text-xs font-semibold text-[#64748B]">
                {expanded ? `${customers.length} clientes visiveis` : 'Mostrando principais 5 clientes'}
              </p>
            </div>
            <button
              onClick={() => setExpanded((value) => !value)}
              className="rounded-lg border border-[#E5ECEA] bg-white px-4 py-2 text-sm font-bold text-[#0F8F86] hover:bg-[#F1F6F4]"
            >
              {expanded ? 'Recolher lista' : 'Expandir lista'}
            </button>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-bold text-[#64748B]"><tr><th className="px-5 py-3">Cliente</th><th>Segmento</th><th>Último pedido</th><th>LTV</th><th>Risco</th><th>Próxima ação</th><th /></tr></thead>
            <tbody className="divide-y divide-[#E5ECEA]">
              {visibleCustomers.map((row, index) => (
                <tr key={row[0]} className="text-[#082F35]">
                  <td className="px-5 py-3"><div className="flex items-center gap-3"><img src={`https://i.pravatar.cc/80?img=${index + 30}`} className="h-10 w-10 rounded-full" alt="" /><div><b>{row[0]}</b><p className="text-xs text-[#64748B]">{row[1]}</p></div></div></td>
                  <td><Pill tone={row[2] === 'Em risco' ? 'rose' : row[2] === 'VIP' ? 'purple' : row[2] === 'Novo' ? 'slate' : 'teal'}>{row[2]}</Pill></td>
                  <td><b>{row[3]}</b><p className="text-xs text-[#64748B]">há poucos dias</p></td>
                  <td><b>{row[4]}</b><p className="text-xs text-[#64748B]">12 pedidos</p></td>
                  <td><Pill tone={row[5] === 'Alto' ? 'rose' : row[5] === 'Médio' ? 'amber' : 'teal'}>{row[5]}</Pill></td>
                  <td><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8F8F5] text-[#0F8F86]"><Mail size={17} /></span><span>{row[6]}</span></div></td>
                  <td><MoreVertical size={17} className="text-[#64748B]" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
