'use client';

import { CroweySnaxType } from '@/lib/types';
import { CROWEY_SNAX_NAMES } from '@/lib/content';

interface CroweySnaxBadgeProps {
  type: CroweySnaxType;
  onClick?: () => void;
  className?: string;
}

export function CroweySnaxBadge({
  type,
  onClick,
  className = '',
}: CroweySnaxBadgeProps) {
  const name = CROWEY_SNAX_NAMES[type];

  return (
    <button
      onClick={onClick}
      className={`
        crowey-snax-badge
        hover:scale-105
        active:scale-95
        transition-transform duration-200
        ${onClick ? 'cursor-pointer' : 'cursor-default'}
        ${className}
      `}
    >
      <span>🍪</span>
      <span>{name}</span>
    </button>
  );
}

export default CroweySnaxBadge;
