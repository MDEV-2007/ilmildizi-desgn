import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'accent' | 'success' | 'danger' | 'warning' | 'neutral' | 'purple' | 'gold';
  className?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'accent',
  className = '',
  size = 'md',
}) => {
  const variantStyles = {
    accent: 'bg-[rgba(47,179,163,0.16)] text-[#5cc4b6] border border-[rgba(47,179,163,0.35)]',
    success: 'bg-[rgba(107,155,111,0.16)] text-[#93bf96] border border-[rgba(107,155,111,0.35)]',
    danger: 'bg-[rgba(201,100,92,0.14)] text-[#dd8781] border border-[rgba(201,100,92,0.3)]',
    warning: 'bg-[rgba(217,154,56,0.14)] text-[#f0b55d] border border-[rgba(217,154,56,0.3)]',
    neutral: 'bg-[rgba(255,255,255,0.06)] text-[#b7b9bc] border border-[rgba(255,255,255,0.1)]',
    purple: 'bg-[rgba(168,85,247,0.16)] text-[#c084fc] border border-[rgba(168,85,247,0.3)]',
    gold: 'bg-[rgba(234,179,8,0.16)] text-[#facc15] border border-[rgba(234,179,8,0.3)]',
  };

  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 font-semibold tracking-wider uppercase',
    md: 'text-[11px] px-2.5 py-1 font-semibold tracking-wide',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full whitespace-nowrap leading-none transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
};
