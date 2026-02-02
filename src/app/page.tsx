'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { getUserState } from '@/lib/storage';

export default function LandingPage() {
  const router = useRouter();

  // Check if user is already onboarded
  useEffect(() => {
    const userState = getUserState();
    if (userState.onboarded) {
      router.replace('/dashboard');
    }
  }, [router]);

  return (
    <div className="min-h-screen light-rays">
      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full blur-3xl bg-white/10" />
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full blur-3xl bg-accent/20" />
        <div className="absolute top-40 right-20 w-24 h-24 rounded-full blur-3xl bg-purple/15" />

        {/* Content */}
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          {/* Light beam icon */}
          <div className="mb-8">
            <div className="inline-block p-4 rounded-full bg-white/10 backdrop-blur-sm">
              <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg shadow-white/30">
                <span className="text-3xl">✨</span>
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            Where the Light
            <span className="block gradient-text">Gets In</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-white/80 mb-8 max-w-lg mx-auto leading-relaxed">
            Your companion for <span className="text-purple-light">simple</span>, <span className="text-[#FFD966] font-medium">playful</span> and{' '}
            <span className="text-white font-medium">profound</span> perspective shifts to change your life.
          </p>

          {/* Quote */}
          <blockquote className="text-lg italic text-white/70 mb-10 max-w-md mx-auto">
            "There is a crack in everything. That's how the light gets in."
            <footer className="text-sm mt-2 not-italic text-white/60">— Leonard Cohen</footer>
          </blockquote>

          {/* CTA Button */}
          <Link href="/onboarding">
            <Button size="lg" className="px-12 bg-white text-primary hover:bg-white/90">
              Start Your Journey
            </Button>
          </Link>

          {/* Book reference */}
          <p className="mt-8 text-sm text-white/70">
            Companion app for the book by{' '}
            <span className="font-medium text-[#FFD966]">Ben Crowe</span>
          </p>
        </div>

        {/* Bottom decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            preserveAspectRatio="none"
          >
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z"
              fill="url(#paint0_linear)"
              fillOpacity="0.05"
            />
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="720"
                y1="60"
                x2="720"
                y2="120"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FFFFFF" />
                <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}
