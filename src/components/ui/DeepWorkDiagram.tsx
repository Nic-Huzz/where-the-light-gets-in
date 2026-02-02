'use client';

interface DeepWorkDiagramProps {
  type: string;
  className?: string;
}

export function DeepWorkDiagram({ type, className = '' }: DeepWorkDiagramProps) {
  const diagrams: Record<string, JSX.Element> = {
    'a-game-words': (
      <svg viewBox="0 0 120 80" className={`w-full h-full ${className}`}>
        {/* Central star */}
        <polygon
          points="60,10 65,30 85,30 70,42 75,62 60,50 45,62 50,42 35,30 55,30"
          fill="#F7D154"
          opacity="0.9"
        />

        {/* 5 word bubbles around */}
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = (i * 72 - 90) * (Math.PI / 180);
          const x = 60 + 38 * Math.cos(angle);
          const y = 40 + 30 * Math.sin(angle);
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="12" fill="rgba(167,139,195,0.3)" stroke="#A78BC3" strokeWidth="1.5" />
              <text x={x} y={y + 4} textAnchor="middle" fill="white" fontSize="8" fontWeight="600">
                {i + 1}
              </text>
            </g>
          );
        })}

        {/* Label */}
        <text x="60" y="75" textAnchor="middle" fill="white" fontSize="8" opacity="0.8">Your 5 Words</text>
      </svg>
    ),

    'to-be-list': (
      <svg viewBox="0 0 120 80" className={`w-full h-full ${className}`}>
        {/* Person silhouette */}
        <circle cx="60" cy="22" r="12" fill="rgba(255,255,255,0.3)" stroke="white" strokeWidth="1" />
        <path
          d="M40 70 L45 45 Q60 35 75 45 L80 70"
          fill="rgba(255,255,255,0.2)"
          stroke="white"
          strokeWidth="1"
        />

        {/* BE qualities floating around */}
        <g fill="#F7D154" fontSize="7" fontWeight="500">
          <text x="20" y="30">Kind</text>
          <text x="90" y="25">Present</text>
          <text x="15" y="55">Curious</text>
          <text x="88" y="50">Brave</text>
          <text x="25" y="75">Patient</text>
          <text x="82" y="72">Loving</text>
        </g>

        {/* "BE" in center */}
        <text x="60" y="55" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">BE</text>
      </svg>
    ),

    'acceptance-control-lists': (
      <svg viewBox="0 0 120 80" className={`w-full h-full ${className}`}>
        {/* Yin-yang inspired design */}
        <circle cx="60" cy="40" r="30" fill="none" stroke="white" strokeWidth="2" opacity="0.3" />

        {/* Left side - Accept (let go) */}
        <path d="M60 10 A30 30 0 0 0 60 70" fill="rgba(167,139,195,0.3)" />
        <circle cx="60" cy="25" r="8" fill="#A78BC3" opacity="0.8" />

        {/* Right side - Control (act on) */}
        <path d="M60 10 A30 30 0 0 1 60 70" fill="rgba(247,209,84,0.3)" />
        <circle cx="60" cy="55" r="8" fill="#F7D154" opacity="0.8" />

        {/* Labels */}
        <text x="35" y="43" textAnchor="middle" fill="white" fontSize="7" fontWeight="600">Release</text>
        <text x="85" y="43" textAnchor="middle" fill="white" fontSize="7" fontWeight="600">Control</text>

        {/* Arrows */}
        <path d="M25 40 L15 40" stroke="#A78BC3" strokeWidth="1.5" markerEnd="url(#release-arrow-dw)" />
        <path d="M95 40 L105 40" stroke="#F7D154" strokeWidth="1.5" markerEnd="url(#control-arrow-dw)" />

        <defs>
          <marker id="release-arrow-dw" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
            <path d="M4,2 L0,0 L0,4 Z" fill="#A78BC3" />
          </marker>
          <marker id="control-arrow-dw" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
            <path d="M0,0 L4,2 L0,4 Z" fill="#F7D154" />
          </marker>
        </defs>
      </svg>
    ),

    'success-list': (
      <svg viewBox="0 0 120 80" className={`w-full h-full ${className}`}>
        {/* Personal success definition */}
        <rect x="25" y="15" width="70" height="50" rx="8" fill="rgba(255,255,255,0.1)" stroke="white" strokeWidth="1" opacity="0.8" />

        {/* Checkmark items */}
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(0, ${i * 14})`}>
            <circle cx="38" cy="28" r="5" fill="#F7D154" opacity="0.8" />
            <path d="M35 28 L37 30 L41 26" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="48" y="25" width="35" height="6" rx="2" fill="rgba(255,255,255,0.3)" />
          </g>
        ))}

        {/* "MY Success" label */}
        <text x="60" y="75" textAnchor="middle" fill="white" fontSize="9" fontWeight="600">MY Definition</text>
      </svg>
    ),

    'mantras': (
      <svg viewBox="0 0 120 80" className={`w-full h-full ${className}`}>
        {/* Speech bubbles with power words */}
        <g>
          {/* Main bubble */}
          <rect x="20" y="15" width="80" height="35" rx="10" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1.5" />
          <polygon points="45,50 55,50 50,60" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1" />

          {/* Mantra text */}
          <text x="60" y="30" textAnchor="middle" fill="white" fontSize="9" fontWeight="600">"I am calm.</text>
          <text x="60" y="42" textAnchor="middle" fill="white" fontSize="9" fontWeight="600">I am ready."</text>
        </g>

        {/* Sparkles */}
        <text x="15" y="25" fill="#F7D154" fontSize="10">✦</text>
        <text x="105" y="35" fill="#F7D154" fontSize="8">✦</text>
        <text x="95" y="65" fill="#A78BC3" fontSize="9">✦</text>

        {/* Label */}
        <text x="60" y="75" textAnchor="middle" fill="white" fontSize="8" opacity="0.8">Power Phrases</text>
      </svg>
    ),

    'just-admit-it': (
      <svg viewBox="0 0 120 80" className={`w-full h-full ${className}`}>
        {/* Mirror frame */}
        <rect x="30" y="10" width="60" height="55" rx="6" fill="none" stroke="white" strokeWidth="2" />
        <rect x="35" y="15" width="50" height="45" rx="4" fill="rgba(255,255,255,0.1)" />

        {/* Reflection lines */}
        <line x1="40" y1="25" x2="80" y2="25" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        <line x1="40" y1="35" x2="75" y2="35" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        <line x1="40" y1="45" x2="70" y2="45" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

        {/* Truth symbol */}
        <circle cx="60" cy="35" r="12" fill="rgba(247,209,84,0.3)" stroke="#F7D154" strokeWidth="1.5" />
        <text x="60" y="39" textAnchor="middle" fill="#F7D154" fontSize="12" fontWeight="bold">!</text>

        {/* Label */}
        <text x="60" y="75" textAnchor="middle" fill="white" fontSize="8" opacity="0.8">Radical Honesty</text>
      </svg>
    ),

    'dedication': (
      <svg viewBox="0 0 120 80" className={`w-full h-full ${className}`}>
        {/* Heart shape */}
        <path
          d="M60 65 C45 50 25 45 25 30 C25 18 35 12 48 18 C55 22 58 28 60 32 C62 28 65 22 72 18 C85 12 95 18 95 30 C95 45 75 50 60 65 Z"
          fill="rgba(167,139,195,0.3)"
          stroke="#A78BC3"
          strokeWidth="1.5"
        />

        {/* Person silhouettes inside heart */}
        <g>
          <circle cx="50" cy="38" r="5" fill="white" opacity="0.6" />
          <circle cx="60" cy="36" r="5" fill="white" opacity="0.6" />
          <circle cx="70" cy="38" r="5" fill="white" opacity="0.6" />
        </g>

        {/* "For" text */}
        <text x="60" y="52" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">For...</text>

        {/* Label */}
        <text x="60" y="78" textAnchor="middle" fill="white" fontSize="8" opacity="0.8">Remove Ego</text>
      </svg>
    ),

    'who-am-i': (
      <svg viewBox="0 0 120 80" className={`w-full h-full ${className}`}>
        {/* Question marks spiral */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const angle = (i * 51) * (Math.PI / 180);
          const radius = 15 + i * 3;
          const x = 60 + radius * Math.cos(angle);
          const y = 40 + radius * Math.sin(angle);
          const size = 10 + i;
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              fill={i === 6 ? '#F7D154' : `rgba(255,255,255,${0.3 + i * 0.1})`}
              fontSize={size}
              fontWeight="bold"
            >
              ?
            </text>
          );
        })}

        {/* Central "I" */}
        <circle cx="60" cy="40" r="15" fill="rgba(167,139,195,0.3)" stroke="#A78BC3" strokeWidth="1.5" />
        <text x="60" y="46" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">I</text>

        {/* Label */}
        <text x="60" y="75" textAnchor="middle" fill="white" fontSize="8" opacity="0.8">7 Deep Questions</text>
      </svg>
    ),

    'dreams': (
      <svg viewBox="0 0 120 80" className={`w-full h-full ${className}`}>
        {/* Cloud/dream shapes */}
        <ellipse cx="40" cy="30" rx="20" ry="12" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        <ellipse cx="55" cy="25" rx="15" ry="10" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        <ellipse cx="70" cy="32" rx="18" ry="11" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

        {/* Stars */}
        <text x="30" y="20" fill="#F7D154" fontSize="12">★</text>
        <text x="75" y="18" fill="#F7D154" fontSize="10">★</text>
        <text x="90" y="30" fill="#F7D154" fontSize="8">★</text>
        <text x="20" y="45" fill="#A78BC3" fontSize="9">★</text>

        {/* Thought bubble trail */}
        <circle cx="60" cy="55" r="4" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="0.5" />
        <circle cx="55" cy="62" r="3" fill="rgba(255,255,255,0.15)" stroke="white" strokeWidth="0.5" />
        <circle cx="52" cy="68" r="2" fill="rgba(255,255,255,0.1)" stroke="white" strokeWidth="0.5" />

        {/* Label */}
        <text x="60" y="78" textAnchor="middle" fill="white" fontSize="8" opacity="0.8">Envision Your Future</text>
      </svg>
    ),
  };

  return diagrams[type] || (
    <svg viewBox="0 0 120 80" className={`w-full h-full ${className}`}>
      <circle cx="60" cy="40" r="25" fill="rgba(255,255,255,0.2)" />
      <text x="60" y="45" textAnchor="middle" fill="white" fontSize="20">🍪</text>
    </svg>
  );
}

export default DeepWorkDiagram;
