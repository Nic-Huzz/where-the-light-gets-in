'use client';

import { useState, useEffect, useCallback } from 'react';

interface BreathingPhase {
  name: string;
  duration: number;
  instruction: string;
}

interface BreathingAnimationProps {
  phases: BreathingPhase[];
  cycles: number;
  onComplete?: () => void;
  onPhaseChange?: (phase: BreathingPhase, cycleNumber: number) => void;
  autoStart?: boolean;
  fullScreen?: boolean;
  className?: string;
}

export function BreathingAnimation({
  phases,
  cycles,
  onComplete,
  onPhaseChange,
  autoStart = false,
  fullScreen: initialFullScreen = false,
  className = '',
}: BreathingAnimationProps) {
  const [isRunning, setIsRunning] = useState(autoStart);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [currentCycle, setCurrentCycle] = useState(1);
  const [countdown, setCountdown] = useState(phases[0]?.duration || 4);
  const [scale, setScale] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(initialFullScreen);
  const [showComplete, setShowComplete] = useState(false);

  const currentPhase = phases[currentPhaseIndex];

  // Calculate scale based on phase
  useEffect(() => {
    if (!isRunning) return;

    const phaseName = currentPhase?.name.toLowerCase();
    if (phaseName?.includes('inhale')) {
      setScale(1.4);
    } else if (phaseName?.includes('exhale')) {
      setScale(1);
    }
    // Hold phases maintain current scale
  }, [currentPhaseIndex, isRunning, currentPhase]);

  // Main timer effect
  useEffect(() => {
    if (!isRunning || !currentPhase) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Move to next phase
          const nextPhaseIndex = currentPhaseIndex + 1;

          if (nextPhaseIndex >= phases.length) {
            // Completed a cycle
            if (currentCycle >= cycles) {
              // All cycles complete
              setIsRunning(false);
              setShowComplete(true);
              setTimeout(() => {
                onComplete?.();
              }, 1500);
              return 0;
            } else {
              // Start next cycle
              setCurrentCycle(currentCycle + 1);
              setCurrentPhaseIndex(0);
              onPhaseChange?.(phases[0], currentCycle + 1);
              return phases[0].duration;
            }
          } else {
            // Move to next phase in current cycle
            setCurrentPhaseIndex(nextPhaseIndex);
            onPhaseChange?.(phases[nextPhaseIndex], currentCycle);
            return phases[nextPhaseIndex].duration;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, currentPhaseIndex, currentCycle, cycles, phases, onComplete, onPhaseChange, currentPhase]);

  const handleStart = useCallback(() => {
    setIsRunning(true);
    setCurrentPhaseIndex(0);
    setCurrentCycle(1);
    setCountdown(phases[0]?.duration || 4);
    setScale(1);
    setShowComplete(false);
    onPhaseChange?.(phases[0], 1);
  }, [phases, onPhaseChange]);

  const handleStop = useCallback(() => {
    setIsRunning(false);
  }, []);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setCurrentPhaseIndex(0);
    setCurrentCycle(1);
    setCountdown(phases[0]?.duration || 4);
    setScale(1);
    setShowComplete(false);
  }, [phases]);

  const toggleFullScreen = useCallback(() => {
    setIsFullScreen((prev) => !prev);
  }, []);

  if (!currentPhase) return null;

  // Get phase color
  const getPhaseColor = () => {
    const phaseName = currentPhase?.name.toLowerCase();
    if (phaseName?.includes('inhale')) return 'from-primary-light to-primary';
    if (phaseName?.includes('exhale')) return 'from-primary to-primary-dark';
    return 'from-primary-light to-primary';
  };

  const content = (
    <div className={`flex flex-col items-center ${isFullScreen ? 'min-h-screen justify-center py-12' : ''} ${className}`}>
      {/* Ambient Background (fullscreen only) */}
      {isFullScreen && isRunning && (
        <div className="breathing-ambient" />
      )}

      {/* Full Screen Toggle */}
      {!isFullScreen && (
        <button
          onClick={toggleFullScreen}
          className="absolute top-4 right-4 p-2 text-text-light hover:text-text transition-colors"
          aria-label="Enter fullscreen"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>
      )}

      {isFullScreen && (
        <button
          onClick={toggleFullScreen}
          className="absolute top-6 right-6 p-3 bg-white/80 rounded-full shadow-lg text-text-light hover:text-text transition-colors z-10"
          aria-label="Exit fullscreen"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* Completion State */}
      {showComplete && (
        <div className="text-center animate-fade-in">
          <div className="text-6xl mb-4">✨</div>
          <h2 className="text-2xl font-bold text-text mb-2">Well done!</h2>
          <p className="text-text-light">You completed {cycles} cycles</p>
        </div>
      )}

      {/* Breathing Circle */}
      {!showComplete && (
        <>
          <div className={`relative flex items-center justify-center ${isFullScreen ? 'w-80 h-80' : 'w-64 h-64'}`}>
            {/* Pulse rings (when running) */}
            {isRunning && (
              <>
                <div className={`breathing-ring breathing-ring-1 ${isFullScreen ? 'w-96 h-96' : 'w-72 h-72'}`} />
                <div className={`breathing-ring breathing-ring-2 ${isFullScreen ? 'w-96 h-96' : 'w-72 h-72'}`} />
                <div className={`breathing-ring breathing-ring-3 ${isFullScreen ? 'w-96 h-96' : 'w-72 h-72'}`} />
              </>
            )}

            {/* Outer glow */}
            <div
              className={`absolute rounded-full bg-gradient-to-br ${getPhaseColor()} opacity-20 blur-2xl transition-all`}
              style={{
                width: isFullScreen ? '280px' : '220px',
                height: isFullScreen ? '280px' : '220px',
                transform: `scale(${scale})`,
                transitionDuration: `${currentPhase.duration}s`,
                transitionTimingFunction: 'ease-in-out',
              }}
            />

            {/* Main circle */}
            <div
              className={`breathing-circle flex items-center justify-center transition-all ${isFullScreen ? 'w-56 h-56' : 'w-48 h-48'}`}
              style={{
                transform: `scale(${scale})`,
                transitionDuration: `${currentPhase.duration}s`,
                transitionTimingFunction: 'ease-in-out',
              }}
            >
              <div className="text-center text-white">
                <div className={`font-bold ${isFullScreen ? 'text-7xl' : 'text-5xl'}`}>
                  {countdown}
                </div>
              </div>
            </div>
          </div>

          {/* Phase Info */}
          <div className={`mt-8 text-center ${isFullScreen ? 'mt-12' : ''}`}>
            <h3 className={`font-semibold text-text mb-2 ${isFullScreen ? 'text-3xl' : 'text-2xl'}`}>
              {currentPhase.name}
            </h3>
            <p className={`text-text-light ${isFullScreen ? 'text-lg' : ''}`}>
              {currentPhase.instruction}
            </p>
          </div>

          {/* Cycle Indicator */}
          <div className={`mt-4 flex items-center gap-2 ${isFullScreen ? 'mt-6' : ''}`}>
            {Array.from({ length: cycles }).map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  i < currentCycle
                    ? 'w-3 h-3 bg-primary'
                    : i === currentCycle - 1
                    ? 'w-4 h-4 bg-primary ring-4 ring-primary/20'
                    : 'w-3 h-3 bg-gray-200'
                }`}
              />
            ))}
          </div>

          {/* Controls */}
          <div className={`mt-8 flex gap-4 ${isFullScreen ? 'mt-10' : ''}`}>
            {!isRunning ? (
              <button
                onClick={handleStart}
                className={`px-8 py-3 bg-primary text-white rounded-xl font-medium shadow-lg shadow-primary/30 hover:bg-primary-dark transition-colors ${isFullScreen ? 'px-12 py-4 text-lg' : ''}`}
              >
                {currentCycle === 1 && currentPhaseIndex === 0 ? 'Start' : 'Resume'}
              </button>
            ) : (
              <button
                onClick={handleStop}
                className={`px-8 py-3 bg-white text-text border-2 border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors ${isFullScreen ? 'px-12 py-4 text-lg' : ''}`}
              >
                Pause
              </button>
            )}

            {(currentCycle > 1 || currentPhaseIndex > 0 || !isRunning) && !showComplete && (
              <button
                onClick={handleReset}
                className={`px-8 py-3 border-2 border-gray-200 text-text rounded-xl font-medium hover:bg-gray-50 transition-colors ${isFullScreen ? 'px-12 py-4 text-lg' : ''}`}
              >
                Reset
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );

  // Wrap in fullscreen container if needed
  if (isFullScreen) {
    return (
      <div className="breathing-fullscreen">
        {content}
      </div>
    );
  }

  return <div className="relative">{content}</div>;
}

export default BreathingAnimation;
