'use client';

interface QuickWinDiagramProps {
  type: string;
  className?: string;
}

export function QuickWinDiagram({ type, className = '' }: QuickWinDiagramProps) {
  const diagrams: Record<string, JSX.Element> = {
    'box-breathing': (
      <svg viewBox="0 0 120 120" className={`w-full h-full ${className}`}>
        {/* Box shape */}
        <rect x="20" y="20" width="80" height="80" fill="none" stroke="white" strokeWidth="3" rx="8" />

        {/* Arrows and labels */}
        {/* Top - Inhale */}
        <path d="M30 20 L90 20" stroke="white" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x="60" y="12" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">Inhale 4</text>

        {/* Right - Hold */}
        <path d="M100 30 L100 90" stroke="#F7D154" strokeWidth="2" markerEnd="url(#arrowhead-gold)" />
        <text x="115" y="60" textAnchor="middle" fill="#F7D154" fontSize="10" fontWeight="600" transform="rotate(90, 115, 60)">Hold 4</text>

        {/* Bottom - Exhale */}
        <path d="M90 100 L30 100" stroke="#A78BC3" strokeWidth="2" markerEnd="url(#arrowhead-purple)" />
        <text x="60" y="115" textAnchor="middle" fill="#A78BC3" fontSize="10" fontWeight="600">Exhale 4</text>

        {/* Left - Hold */}
        <path d="M20 90 L20 30" stroke="#F7D154" strokeWidth="2" markerEnd="url(#arrowhead-gold)" />
        <text x="8" y="60" textAnchor="middle" fill="#F7D154" fontSize="10" fontWeight="600" transform="rotate(-90, 8, 60)">Hold 4</text>

        {/* Center circle */}
        <circle cx="60" cy="60" r="15" fill="white" opacity="0.2" />
        <circle cx="60" cy="60" r="8" fill="white" />

        <defs>
          <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="white" />
          </marker>
          <marker id="arrowhead-gold" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#F7D154" />
          </marker>
          <marker id="arrowhead-purple" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#A78BC3" />
          </marker>
        </defs>
      </svg>
    ),

    '478-breathing': (
      <svg viewBox="0 0 120 80" className={`w-full h-full ${className}`}>
        {/* Wave pattern */}
        <path
          d="M10 60 Q25 60 30 40 L30 40 Q35 20 45 20 L75 20 Q85 20 90 40 L90 40 Q95 60 110 60"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Phase indicators */}
        <circle cx="20" cy="55" r="12" fill="white" opacity="0.2" />
        <text x="20" y="58" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">4</text>
        <text x="20" y="75" textAnchor="middle" fill="white" fontSize="8" opacity="0.7">In</text>

        <circle cx="60" cy="20" r="12" fill="#F7D154" opacity="0.3" />
        <text x="60" y="23" textAnchor="middle" fill="#F7D154" fontSize="10" fontWeight="bold">7</text>
        <text x="60" y="8" textAnchor="middle" fill="#F7D154" fontSize="8">Hold</text>

        <circle cx="100" cy="55" r="12" fill="#A78BC3" opacity="0.3" />
        <text x="100" y="58" textAnchor="middle" fill="#A78BC3" fontSize="10" fontWeight="bold">8</text>
        <text x="100" y="75" textAnchor="middle" fill="#A78BC3" fontSize="8">Out</text>

        {/* Flow arrows */}
        <path d="M32 50 L38 40" stroke="white" strokeWidth="1.5" markerEnd="url(#arrow478)" />
        <path d="M82 40 L88 50" stroke="#A78BC3" strokeWidth="1.5" markerEnd="url(#arrow478-purple)" />

        <defs>
          <marker id="arrow478" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
            <path d="M0,0 L4,2 L0,4 Z" fill="white" />
          </marker>
          <marker id="arrow478-purple" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
            <path d="M0,0 L4,2 L0,4 Z" fill="#A78BC3" />
          </marker>
        </defs>
      </svg>
    ),

    'two-wolves': (
      <svg viewBox="0 0 120 80" className={`w-full h-full ${className}`}>
        {/* Light wolf (left) */}
        <g transform="translate(15, 15)">
          <path
            d="M5 45 L10 30 L8 20 L15 25 L20 10 L25 25 L32 20 L30 30 L35 45 L20 40 Z"
            fill="white"
            opacity="0.9"
          />
          <circle cx="15" cy="28" r="2" fill="#A78BC3" />
          <circle cx="25" cy="28" r="2" fill="#A78BC3" />
          {/* Glow effect */}
          <circle cx="20" cy="30" r="20" fill="white" opacity="0.1" />
        </g>
        <text x="35" y="70" textAnchor="middle" fill="white" fontSize="8" fontWeight="600">Good</text>

        {/* VS */}
        <circle cx="60" cy="42" r="10" fill="#F7D154" opacity="0.3" />
        <text x="60" y="45" textAnchor="middle" fill="#F7D154" fontSize="10" fontWeight="bold">VS</text>

        {/* Dark wolf (right) */}
        <g transform="translate(65, 15)">
          <path
            d="M5 45 L10 30 L8 20 L15 25 L20 10 L25 25 L32 20 L30 30 L35 45 L20 40 Z"
            fill="#A78BC3"
            opacity="0.7"
          />
          <circle cx="15" cy="28" r="2" fill="#F7D154" />
          <circle cx="25" cy="28" r="2" fill="#F7D154" />
        </g>
        <text x="85" y="70" textAnchor="middle" fill="#A78BC3" fontSize="8" fontWeight="600">Fear</text>
      </svg>
    ),

    'get-to-language': (
      <svg viewBox="0 0 120 70" className={`w-full h-full ${className}`}>
        {/* "Got to" crossed out */}
        <rect x="8" y="20" width="45" height="30" rx="6" fill="#A78BC3" opacity="0.2" />
        <text x="30" y="40" textAnchor="middle" fill="white" fontSize="11" fontWeight="500" opacity="0.7">Got to</text>
        <line x1="10" y1="35" x2="50" y2="35" stroke="#A78BC3" strokeWidth="2" />

        {/* Arrow */}
        <path d="M58 35 L72 35" stroke="#F7D154" strokeWidth="2" markerEnd="url(#getto-arrow)" />

        {/* "Get to" highlighted */}
        <rect x="77" y="20" width="40" height="30" rx="6" fill="white" opacity="0.2" />
        <text x="97" y="40" textAnchor="middle" fill="white" fontSize="11" fontWeight="700">Get to</text>

        {/* Sparkle */}
        <text x="112" y="22" fill="#F7D154" fontSize="12">✨</text>

        <defs>
          <marker id="getto-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#F7D154" />
          </marker>
        </defs>
      </svg>
    ),

    'three-wins': (
      <svg viewBox="0 0 120 80" className={`w-full h-full ${className}`}>
        {/* Three trophy/medal icons */}
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${20 + i * 35}, 15)`}>
            <circle cx="15" cy="25" r="18" fill="#F7D154" opacity="0.2" />
            <circle cx="15" cy="25" r="12" fill="#F7D154" opacity="0.4" />
            <text x="15" y="30" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
              {i + 1}
            </text>
            {/* Checkmark */}
            <path
              d="M8 50 L13 55 L22 45"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        ))}

        {/* Label */}
        <text x="60" y="75" textAnchor="middle" fill="white" fontSize="9" opacity="0.8">Today + Tomorrow</text>
      </svg>
    ),

    'i-am-enough': (
      <svg viewBox="0 0 120 80" className={`w-full h-full ${className}`}>
        {/* Radiating lines */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <line
            key={i}
            x1="60"
            y1="40"
            x2={60 + 35 * Math.cos((angle * Math.PI) / 180)}
            y2={40 + 35 * Math.sin((angle * Math.PI) / 180)}
            stroke="#F7D154"
            strokeWidth="2"
            opacity="0.5"
          />
        ))}

        {/* Center heart */}
        <path
          d="M60 55 C50 45 40 35 40 28 C40 20 48 15 60 25 C72 15 80 20 80 28 C80 35 70 45 60 55 Z"
          fill="white"
        />

        {/* Glow */}
        <circle cx="60" cy="40" r="25" fill="white" opacity="0.1" />

        {/* Text */}
        <text x="60" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">I Am Enough</text>
      </svg>
    ),

    'play-microdose': (
      <svg viewBox="0 0 120 80" className={`w-full h-full ${className}`}>
        {/* Playful shapes */}
        <circle cx="25" cy="25" r="12" fill="white" opacity="0.5" />
        <rect x="55" y="15" width="20" height="20" rx="4" fill="#F7D154" opacity="0.6" transform="rotate(15, 65, 25)" />
        <polygon points="100,20 110,40 90,40" fill="#A78BC3" opacity="0.5" />

        <circle cx="35" cy="55" r="8" fill="#F7D154" opacity="0.5" />
        <rect x="60" y="45" width="15" height="15" rx="3" fill="white" opacity="0.4" transform="rotate(-10, 67, 52)" />
        <circle cx="95" cy="60" r="10" fill="#A78BC3" opacity="0.4" />

        {/* Sparkles */}
        <text x="45" y="40" fill="#F7D154" fontSize="10">✦</text>
        <text x="80" y="35" fill="white" fontSize="8">✦</text>
        <text x="70" y="70" fill="#A78BC3" fontSize="9">✦</text>

        {/* 5 min badge */}
        <circle cx="60" cy="40" r="14" fill="white" />
        <text x="60" y="44" textAnchor="middle" fill="#A78BC3" fontSize="9" fontWeight="bold">5m</text>
      </svg>
    ),

    'this-too-shall-pass': (
      <svg viewBox="0 0 120 80" className={`w-full h-full ${className}`}>
        {/* Horizon line */}
        <line x1="10" y1="55" x2="110" y2="55" stroke="white" strokeWidth="2" opacity="0.3" />

        {/* Sun rising */}
        <defs>
          <linearGradient id="sunGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#F7D154" />
            <stop offset="100%" stopColor="#FFE082" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="55" r="20" fill="url(#sunGradient)" />

        {/* Sun rays */}
        {[0, 30, 60, 90, 120, 150].map((angle, i) => (
          <line
            key={i}
            x1={60 + 25 * Math.cos(((180 + angle) * Math.PI) / 180)}
            y1={55 + 25 * Math.sin(((180 + angle) * Math.PI) / 180)}
            x2={60 + 35 * Math.cos(((180 + angle) * Math.PI) / 180)}
            y2={55 + 35 * Math.sin(((180 + angle) * Math.PI) / 180)}
            stroke="#F7D154"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}

        {/* Clouds passing */}
        <g opacity="0.5">
          <ellipse cx="25" cy="30" rx="15" ry="8" fill="white" />
          <ellipse cx="35" cy="28" rx="10" ry="6" fill="white" />
        </g>
        <g opacity="0.4">
          <ellipse cx="90" cy="25" rx="12" ry="6" fill="white" />
          <ellipse cx="100" cy="23" rx="8" ry="5" fill="white" />
        </g>

        {/* Arrow showing passage */}
        <path d="M20 35 Q60 20 100 35" fill="none" stroke="#A78BC3" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#pass-arrow)" />

        <defs>
          <marker id="pass-arrow" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
            <path d="M0,0 L5,2.5 L0,5 Z" fill="#A78BC3" />
          </marker>
        </defs>
      </svg>
    ),

    'humming': (
      <svg viewBox="0 0 120 80" className={`w-full h-full ${className}`}>
        {/* Face silhouette */}
        <ellipse cx="35" cy="40" rx="20" ry="25" fill="white" opacity="0.2" />
        <ellipse cx="35" cy="40" rx="15" ry="20" fill="white" opacity="0.4" />

        {/* Closed eyes (peaceful) */}
        <path d="M28 35 Q32 32 36 35" fill="none" stroke="#A78BC3" strokeWidth="2" strokeLinecap="round" />
        <path d="M38 35 Q42 32 46 35" fill="none" stroke="#A78BC3" strokeWidth="2" strokeLinecap="round" />

        {/* Slight smile */}
        <path d="M30 48 Q35 52 40 48" fill="none" stroke="#A78BC3" strokeWidth="2" strokeLinecap="round" />

        {/* Sound waves */}
        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={`M${55 + i * 12} 25 Q${60 + i * 12} 40 ${55 + i * 12} 55`}
            fill="none"
            stroke="#F7D154"
            strokeWidth="2"
            opacity={1 - i * 0.2}
            strokeLinecap="round"
          />
        ))}

        {/* Musical notes */}
        <text x="85" y="25" fill="#F7D154" fontSize="14">♪</text>
        <text x="100" y="40" fill="white" fontSize="12">♫</text>
        <text x="90" y="60" fill="#A78BC3" fontSize="10">♪</text>
      </svg>
    ),

    'rule-number-6': (
      <svg viewBox="0 0 120 80" className={`w-full h-full ${className}`}>
        {/* Big playful 6 */}
        <text x="60" y="55" textAnchor="middle" fill="white" fontSize="50" fontWeight="bold" fontFamily="Georgia, serif">6</text>

        {/* Decorative elements */}
        <circle cx="30" cy="20" r="8" fill="#F7D154" opacity="0.5" />
        <circle cx="95" cy="25" r="6" fill="#A78BC3" opacity="0.5" />
        <circle cx="85" cy="60" r="5" fill="#F7D154" opacity="0.4" />

        {/* Laughing eyes */}
        <text x="45" y="30" fill="#F7D154" fontSize="12">^</text>
        <text x="70" y="30" fill="#F7D154" fontSize="12">^</text>

        {/* Label */}
        <text x="60" y="75" textAnchor="middle" fill="white" fontSize="8" fontWeight="500" opacity="0.8">Don&apos;t take yourself too seriously</text>
      </svg>
    ),
  };

  return diagrams[type] || (
    <svg viewBox="0 0 120 80" className={`w-full h-full ${className}`}>
      <circle cx="60" cy="40" r="25" fill="white" opacity="0.2" />
      <circle cx="60" cy="40" r="15" fill="white" opacity="0.4" />
    </svg>
  );
}

export default QuickWinDiagram;
