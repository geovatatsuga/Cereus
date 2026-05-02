import React from 'react';

type MiniVisualVariant = 'campaign' | 'automation' | 'forecast' | 'demand' | 'churn' | 'rfm' | 'chat';

const palette = {
  teal: { bg: '#ccfbf1', main: '#0f766e', soft: '#5eead4' },
  sky: { bg: '#e0f2fe', main: '#0369a1', soft: '#38bdf8' },
  rose: { bg: '#ffe4e6', main: '#be123c', soft: '#fb7185' },
  amber: { bg: '#fef3c7', main: '#b45309', soft: '#f59e0b' },
  slate: { bg: '#e2e8f0', main: '#0f172a', soft: '#64748b' },
};

export function MiniVisual({
  variant,
  tone = 'teal',
  className = 'h-16 w-24',
}: {
  variant: MiniVisualVariant;
  tone?: keyof typeof palette;
  className?: string;
}) {
  const color = palette[tone];

  return (
    <svg viewBox="0 0 120 84" className={className} role="img" aria-label="Visual">
      <rect x="8" y="10" width="104" height="64" rx="20" fill={color.bg} />
      {variant === 'campaign' && (
        <>
          <path d="M32 47 L68 31 V58 L32 47 Z" fill="white" stroke={color.main} strokeWidth="4" strokeLinejoin="round" />
          <path d="M72 34 C82 39 82 50 72 55" fill="none" stroke={color.soft} strokeWidth="5" strokeLinecap="round" />
          <rect x="27" y="48" width="13" height="17" rx="5" fill={color.main} />
        </>
      )}
      {variant === 'automation' && (
        <>
          <circle cx="36" cy="42" r="10" fill="white" stroke={color.main} strokeWidth="4" />
          <circle cx="84" cy="42" r="10" fill="white" stroke={color.main} strokeWidth="4" />
          <path d="M48 42 H72" stroke={color.soft} strokeWidth="6" strokeLinecap="round" />
          <path d="M68 34 L78 42 L68 50" fill="none" stroke={color.main} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
      {variant === 'forecast' && (
        <>
          <path d="M25 56 C38 45 45 49 55 37 S75 23 94 30" fill="none" stroke={color.main} strokeWidth="5" strokeLinecap="round" />
          <circle cx="55" cy="37" r="5" fill="white" stroke={color.main} strokeWidth="3" />
          <rect x="25" y="23" width="21" height="7" rx="3.5" fill="white" opacity="0.9" />
        </>
      )}
      {variant === 'demand' && (
        <>
          <rect x="29" y="43" width="12" height="18" rx="4" fill={color.main} opacity="0.85" />
          <rect x="53" y="31" width="12" height="30" rx="4" fill={color.soft} />
          <rect x="77" y="22" width="12" height="39" rx="4" fill={color.main} opacity="0.72" />
          <path d="M26 26 H94" stroke="white" strokeWidth="5" strokeLinecap="round" opacity="0.9" />
        </>
      )}
      {variant === 'churn' && (
        <>
          <path d="M60 20 L89 61 H31 Z" fill="white" stroke={color.main} strokeWidth="4" strokeLinejoin="round" />
          <path d="M60 33 V47" stroke={color.main} strokeWidth="5" strokeLinecap="round" />
          <circle cx="60" cy="55" r="3.5" fill={color.main} />
        </>
      )}
      {variant === 'rfm' && (
        <>
          <circle cx="39" cy="36" r="10" fill="white" stroke={color.main} strokeWidth="4" />
          <circle cx="76" cy="29" r="8" fill="white" stroke={color.soft} strokeWidth="4" />
          <circle cx="72" cy="56" r="10" fill="white" stroke={color.main} strokeWidth="4" />
          <path d="M49 36 L67 31 M48 41 L63 51" stroke={color.main} strokeWidth="4" strokeLinecap="round" opacity="0.55" />
        </>
      )}
      {variant === 'chat' && (
        <>
          <rect x="26" y="24" width="42" height="24" rx="10" fill="white" stroke={color.main} strokeWidth="4" />
          <rect x="53" y="39" width="40" height="24" rx="10" fill={color.main} opacity="0.9" />
          <circle cx="39" cy="36" r="3" fill={color.soft} />
          <circle cx="51" cy="36" r="3" fill={color.soft} />
          <path d="M64 51 H82" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.9" />
        </>
      )}
    </svg>
  );
}
