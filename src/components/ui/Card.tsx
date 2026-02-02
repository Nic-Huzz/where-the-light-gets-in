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
    bg-white
    border border-gray-100
    shadow-sm
  `,
  glow: `
    card-glow
  `,
  warm: `
    card-warm
  `,
  interactive: `
    bg-white
    border-2 border-gray-200
    shadow-sm
    hover:border-primary/40 hover:shadow-md
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
      ? '!border-primary !border-2 shadow-lg shadow-primary/20 bg-primary/5 ring-2 ring-primary/20'
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
