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
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />

        {/* Content */}
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          {/* Light beam icon */}
          <div className="mb-8">
            <div className="inline-block p-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg shadow-primary/30">
                <span className="text-3xl">✨</span>
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-bold text-text mb-6 leading-tight">
            Where the Light
            <span className="block gradient-text">Gets In</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-text-light mb-8 max-w-lg mx-auto leading-relaxed">
            Your companion for personal transformation. Discover tools and exercises
            to help you become the person you want to be.
          </p>

          {/* Quote */}
          <blockquote className="text-lg italic text-text-light mb-10 max-w-md mx-auto">
            "There is a crack in everything. That's how the light gets in."
            <footer className="text-sm mt-2 not-italic">— Leonard Cohen</footer>
          </blockquote>

          {/* CTA Button */}
          <Link href="/onboarding">
            <Button size="lg" className="px-12">
              Start Your Journey
            </Button>
          </Link>

          {/* Book reference */}
          <p className="mt-8 text-sm text-text-light">
            Companion app for the book by{' '}
            <span className="font-medium text-text">Ben Crowe</span>
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
                <stop stopColor="#5FBDD6" />
                <stop offset="1" stopColor="#5FBDD6" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}
