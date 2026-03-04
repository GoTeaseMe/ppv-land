import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={[
        'bg-[rgba(255,255,255,0.04)] border border-[var(--line)] rounded-[var(--radius)] p-[22px]',
        'shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur-sm',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
};
