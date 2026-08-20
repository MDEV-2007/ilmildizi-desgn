import React from 'react';

interface StatTileProps {
  icon: string | React.ReactNode;
  label: string;
  value: string | number;
  subValue?: string;
  tint?: 'streak' | 'coin' | 'level' | 'elo' | 'neutral' | 'accent';
  className?: string;
  onClick?: () => void;
}

export const StatTile: React.FC<StatTileProps> = ({
  icon,
  label,
  value,
  subValue,
  tint = 'neutral',
  className = '',
  onClick,
}) => {
  const tintStyles = {
    streak: {
      bg: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
      iconBg: 'bg-orange-500/20 text-orange-300',
    },
    coin: {
      bg: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
      iconBg: 'bg-amber-500/20 text-amber-300',
    },
    level: {
      bg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
      iconBg: 'bg-emerald-500/20 text-emerald-300',
    },
    elo: {
      bg: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
      iconBg: 'bg-blue-500/20 text-blue-300',
    },
    accent: {
      bg: 'bg-[rgba(47,179,163,0.12)] border-[rgba(47,179,163,0.25)] text-[#5cc4b6]',
      iconBg: 'bg-[rgba(47,179,163,0.2)] text-[#2fb3a3]',
    },
    neutral: {
      bg: 'bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.07)] text-[#e9eaeb]',
      iconBg: 'bg-[rgba(255,255,255,0.08)] text-[#b7b9bc]',
    },
  };

  const currentTint = tintStyles[tint];

  return (
    <div
      onClick={onClick}
      className={`glass-card p-3.5 sm:p-4 rounded-2xl flex items-center gap-3.5 transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:border-[rgba(47,179,163,0.4)] hover:scale-[1.01]' : ''
      } ${currentTint.bg} ${className}`}
    >
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 font-medium ${currentTint.iconBg} ${
          tint === 'streak' ? 'animate-flame-pulse' : ''
        }`}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium uppercase tracking-wider text-[#8d9094] truncate">
          {label}
        </p>
        <div className="flex items-baseline gap-1.5 mt-0.5">
          <span className="text-lg sm:text-xl font-bold tracking-tight text-[#e9eaeb] tabular-nums font-mono">
            {value}
          </span>
          {subValue && (
            <span className="text-[11px] font-medium text-[#8d9094]">
              {subValue}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
