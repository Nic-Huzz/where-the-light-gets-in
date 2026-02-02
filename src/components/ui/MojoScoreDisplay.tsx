'use client';

import { MojoScore } from '@/lib/types';
import { calculateMojoAverage } from '@/lib/storage';

interface MojoScoreDisplayProps {
  score: MojoScore;
  showDetails?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function MojoScoreDisplay({
  score,
  showDetails = false,
  size = 'md',
  className = '',
}: MojoScoreDisplayProps) {
  const average = calculateMojoAverage(score);

  const sizeStyles = {
    sm: {
      circle: 'w-16 h-16',
      text: 'text-xl',
      label: 'text-xs',
    },
    md: {
      circle: 'w-24 h-24',
      text: 'text-3xl',
      label: 'text-sm',
    },
    lg: {
      circle: 'w-32 h-32',
      text: 'text-4xl',
      label: 'text-base',
    },
  };

  const styles = sizeStyles[size];


  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Main Score Circle */}
      <div
        className={`
          ${styles.circle}
          rounded-full
          bg-white/15
          backdrop-blur-md
          border-4 border-white/30
          flex items-center justify-center
          shadow-lg shadow-black/10
        `}
      >
        <span className={`${styles.text} font-bold text-accent`}>
          {average.toFixed(1)}
        </span>
      </div>

      <p className={`mt-2 ${styles.label} text-white/70`}>Mojo Score</p>

      {/* Details */}
      {showDetails && (
        <div className="mt-4 grid grid-cols-3 gap-4 w-full max-w-xs">
          <ScoreItem label="Play" value={score.play} icon="🎮" />
          <ScoreItem label="Purpose" value={score.purpose} icon="🧭" />
          <ScoreItem label="Potential" value={score.potential} icon="🌱" />
        </div>
      )}
    </div>
  );
}

function ScoreItem({ label, value, icon }: { label: string; value: number; icon: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-lg mb-1">{icon}</span>
      <span className="text-xl font-semibold text-white">{value}</span>
      <span className="text-xs text-white/70">{label}</span>
    </div>
  );
}

export default MojoScoreDisplay;
