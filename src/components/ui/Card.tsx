'use client';

import { HTMLAttributes, forwardRef } from 'react';

type CardVariant = 'default' | 'glow' | 'warm' | 'interactive';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  selected?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const variantStyles: Record<CardVariant, string> = {
  default: `
    bg-white/15
    backdrop-blur-md
    border border-white/25
    shadow-lg shadow-black/5
  `,
  glow: `
    card-glow
  `,
  warm: `
    card-warm
  `,
  interactive: `
    bg-white/15
    backdrop-blur-md
    border-2 border-white/25
    shadow-lg shadow-black/5
    hover:border-white/40 hover:bg-white/20
    cursor-pointer
    transition-all duration-200
  `,
};

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({
    children,
    variant = 'default',
    selected = false,
    padding = 'md',
    className = '',
    ...props
  }, ref) => {
    // Selected state overrides border styling
    const selectedStyles = selected
      ? '!border-accent !border-2 shadow-lg shadow-accent/30 bg-accent/10 ring-2 ring-accent/30'
      : '';

    return (
      <div
        ref={ref}
        className={`
          rounded-2xl
          ${variantStyles[variant]}
          ${paddingStyles[padding]}
          ${selectedStyles}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
