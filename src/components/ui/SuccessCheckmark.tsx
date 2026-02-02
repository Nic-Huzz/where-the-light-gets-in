'use client';

interface SuccessCheckmarkProps {
  size?: number;
  className?: string;
}

export function SuccessCheckmark({ size = 80, className = '' }: SuccessCheckmarkProps) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Pulsing rings */}
      <div
        className="celebration-ring"
        style={{ width: size * 1.5, height: size * 1.5 }}
      />
      <div
        className="celebration-ring"
        style={{ width: size * 1.5, height: size * 1.5, animationDelay: '0.3s' }}
      />

      {/* Checkmark SVG */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 52 52"
        className="success-burst"
      >
        {/* Circle */}
        <circle
          className="checkmark-circle"
          cx="26"
          cy="26"
          r="25"
          fill="none"
          stroke="#5FBDD6"
          strokeWidth="2"
        />
        {/* Checkmark */}
        <path
          className="checkmark-check"
          fill="none"
          stroke="#5FBDD6"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.1 27.2l7.1 7.2 16.7-16.8"
        />
      </svg>
    </div>
  );
}

export default SuccessCheckmark;
