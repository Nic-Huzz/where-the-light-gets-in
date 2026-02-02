'use client';

import { ReactNode } from 'react';
import { Button, Confetti, SuccessCheckmark } from '@/components/ui';
import Link from 'next/link';

interface CelebrationScreenProps {
  title?: string;
  message?: string;
  snaxName?: string;
  children?: ReactNode;
  primaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

export function CelebrationScreen({
  title = "You created a Crowey Snax!",
  message,
  snaxName,
  children,
  primaryAction = { label: "View My Collection", href: "/crowey-snax" },
  secondaryAction = { label: "Back to Dashboard", href: "/dashboard" },
}: CelebrationScreenProps) {
  return (
    <>
      <Confetti active={true} duration={4000} particleCount={80} />
      <div className="text-center py-12 page-transition">
        {/* Success Checkmark */}
        <div className="mb-6">
          <SuccessCheckmark size={90} />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-text mb-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          {title}
        </h1>

        {/* Snax name badge */}
        {snaxName && (
          <div className="inline-block crowey-snax-badge text-base mb-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <span>🍪</span>
            <span>{snaxName}</span>
          </div>
        )}

        {/* Message */}
        {message && (
          <p className="text-lg text-text-light mb-8 max-w-md mx-auto animate-fade-in" style={{ animationDelay: '0.6s' }}>
            {message}
          </p>
        )}

        {/* Custom content */}
        {children && (
          <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.7s' }}>
            {children}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
          {primaryAction.href ? (
            <Link href={primaryAction.href}>
              <Button size="lg">{primaryAction.label}</Button>
            </Link>
          ) : (
            <Button size="lg" onClick={primaryAction.onClick}>
              {primaryAction.label}
            </Button>
          )}

          {secondaryAction.href ? (
            <Link href={secondaryAction.href}>
              <Button variant="secondary" size="lg">
                {secondaryAction.label}
              </Button>
            </Link>
          ) : (
            <Button variant="secondary" size="lg" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default CelebrationScreen;
