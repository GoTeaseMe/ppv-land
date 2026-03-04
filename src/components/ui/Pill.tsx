import React from 'react';

interface PillProps {
  children: React.ReactNode;
  size?: 'sm' | 'md';
  className?: string;
}

export const Pill: React.FC<PillProps> = ({ children, size = 'md', className = '' }) => {
  const sizeStyles = {
    sm: 'text-xs px-2 py-1.5',
    md: 'text-[13px] px-3 py-2',
  };

  return (
    <span
      className={[
        'inline-flex items-center gap-2 border border-[var(--line)] rounded-full text-[var(--muted)] bg-[rgba(255,255,255,0.03)] whitespace-nowrap',
        sizeStyles[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  );
};
