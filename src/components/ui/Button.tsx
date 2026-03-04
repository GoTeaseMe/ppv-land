import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'toggle';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isActive?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'secondary', size = 'md', isActive = false, children, className = '', ...props }, ref) => {
    const baseStyles = [
      'border-0 rounded-xl font-bold cursor-pointer inline-flex items-center justify-center gap-2.5 transition-all',
      'duration-75',
    ];

    const sizeStyles = {
      sm: 'py-2 px-3 text-sm',
      md: 'py-3 px-3.5 text-base',
      lg: 'py-4 px-6 text-lg',
    };

    const variantStyles = {
      primary: [
        'bg-gradient-to-br from-[var(--accent)] to-[#9b7bff]',
        'text-[#0b0c10]',
        'hover:brightness-105',
      ],
      secondary: [
        'bg-[rgba(255,255,255,0.06)]',
        'border border-[var(--line)]',
        'text-[var(--text)]',
        'hover:bg-[rgba(255,255,255,0.09)]',
      ],
      toggle: [
        'bg-[rgba(255,255,255,0.06)]',
        'border border-[var(--line)]',
        'text-[var(--text)]',
        'hover:bg-[rgba(255,255,255,0.09)]',
      ],
    };

    const activeStyles = isActive
      ? ['border-[rgba(124,92,255,0.6)]', 'bg-[rgba(124,92,255,0.16)]', 'shadow-[inset_0_0_0_2px_rgba(124,92,255,0.18)]']
      : [];

    const buttonStyles = [
      ...baseStyles,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...activeStyles,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        className={buttonStyles}
        style={{ transform: 'translateY(0)' }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = 'translateY(1px)';
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
        }}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
