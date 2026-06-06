import React from 'react';
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import { TrendingUp } from 'lucide-react';

export const pageShell = 'w-full px-4 pb-4 pt-4 sm:px-6 lg:px-7';
export const pageInner = 'mx-auto max-w-[1420px] space-y-3';
export const cardClass = 'h-full min-w-0 rounded-2xl border border-[#E5ECEA] bg-white shadow-[0_12px_34px_rgba(8,47,53,0.045)]';

export function CereusMark({ className = 'h-12 w-12' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <rect x="10" y="17" width="8" height="15" rx="4" fill="#7DD3C0" />
      <rect x="21" y="9" width="7" height="30" rx="3.5" fill="#46B29D" />
      <rect x="31" y="17" width="8" height="15" rx="4" fill="#7DD3C0" />
    </svg>
  );
}

export function Sparkline({ points, className = 'h-11 w-24' }: { points: number[]; className?: string }) {
  const width = 94;
  const height = 42;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const path = points
    .map((point, index) => {
      const x = (index / (points.length - 1)) * width;
      const y = height - ((point - min) / Math.max(1, max - min)) * (height - 10) - 5;
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} fill="none" aria-hidden="true">
      <path d={path} stroke="#52C8B8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function KpiTile({
  icon,
  label,
  value,
  change,
  points = [12, 10, 14, 13, 18, 16, 22, 24],
  danger = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
  points?: number[];
  danger?: boolean;
}) {
  return (
    <article className={`${cardClass} p-3`}>
      <div className="flex items-start justify-between gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${danger ? 'bg-rose-50 text-rose-500' : 'bg-[#E8F8F5] text-[#0F8F86]'}`}>
          {icon}
        </div>
        <Sparkline points={points} className="h-10 w-22" />
      </div>
      <p className="mt-2 text-sm font-bold text-[#082F35]">{label}</p>
      <p className="mt-2 text-[25px] font-bold leading-none text-[#082F35]">{value}</p>
      <p className={`mt-2 flex items-center gap-1.5 text-[12px] font-bold ${danger ? 'text-rose-500' : 'text-[#48BFAE]'}`}>
        <TrendingUp size={14} /> {change}
      </p>
    </article>
  );
}

export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div>
      <h2 className="text-[26px] font-bold leading-tight text-[#082F35] sm:text-[30px]">{title}</h2>
      {subtitle && <p className="mt-1 text-sm font-medium text-[#64748B]">{subtitle}</p>}
    </div>
  );
}

export function DateButton({ label = '12 de maio de 2025' }: { label?: string }) {
  return (
    <button className="flex w-fit items-center gap-3 rounded-xl border border-[#E5ECEA] bg-white px-4 py-2.5 text-sm font-bold text-[#64748B] shadow-sm">
      {label}
    </button>
  );
}

export function Pill({ children, tone = 'teal' }: { children: React.ReactNode; tone?: 'teal' | 'rose' | 'amber' | 'blue' | 'slate' | 'purple' }) {
  const styles = {
    teal: 'bg-[#E8F8F5] text-[#0F8F86]',
    rose: 'bg-rose-50 text-rose-500',
    amber: 'bg-amber-50 text-amber-600',
    blue: 'bg-blue-50 text-blue-600',
    slate: 'bg-slate-50 text-slate-600',
    purple: 'bg-purple-50 text-purple-600',
  };
  return <span className={`rounded-lg px-2.5 py-1 text-xs font-bold ${styles[tone]}`}>{children}</span>;
}

export function MiniArea({
  data,
  height = 185,
  dataKey = 'value',
  xKey = 'name',
  yTicks,
}: {
  data: Array<Record<string, number | string>>;
  height?: number;
  dataKey?: string;
  xKey?: string;
  yTicks?: number[];
}) {
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 8, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="miniAreaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7DD3C0" stopOpacity={0.42} />
              <stop offset="95%" stopColor="#7DD3C0" stopOpacity={0.04} />
            </linearGradient>
          </defs>
          <XAxis dataKey={xKey} axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 11, fontWeight: 600 }} dy={8} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 11, fontWeight: 600 }} ticks={yTicks} width={40} />
          <Area type="monotone" dataKey={dataKey} stroke="#20B5A7" strokeWidth={3} fill="url(#miniAreaFill)" dot={false} activeDot={{ r: 5, strokeWidth: 2, stroke: '#20B5A7', fill: '#fff' }} isAnimationActive={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function Donut({
  data,
  center,
  sub,
  size = 150,
}: {
  data: Array<{ name: string; value: number; color: string }>;
  center: string;
  sub?: string;
  size?: number;
}) {
  return (
    <div className="relative w-full" style={{ height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" innerRadius={size * 0.27} outerRadius={size * 0.4} startAngle={90} endAngle={-270} paddingAngle={0} isAnimationActive={false}>
            {data.map((item) => <Cell key={item.name} fill={item.color} />)}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold text-[#082F35]">{center}</span>
        {sub && <span className="text-xs font-bold text-[#082F35]">{sub}</span>}
      </div>
    </div>
  );
}

export function SegTabs({ tabs, active, onChange }: { tabs: string[]; active: string; onChange: (tab: string) => void }) {
  return (
    <div className="flex max-w-full overflow-hidden rounded-xl border border-[#E5ECEA] bg-white p-1 shadow-sm">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-bold transition-colors ${
            active === tab ? 'bg-[#0F8F86] text-white shadow-sm' : 'text-[#42526B] hover:bg-[#F1F6F4]'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
