'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Header, PageContainer } from '@/components/layout';
import { Button, Card, BreathingAnimation, TextArea, Confetti, SuccessCheckmark } from '@/components/ui';
import { getUserState } from '@/lib/storage';
import { QUICK_WINS, BREATHING_EXERCISES, TWO_WOLVES_CONTENT } from '@/lib/content';

export default function QuickWinToolPage() {
  const router = useRouter();
  const params = useParams();
  const toolId = params.tool as string;

  const [isComplete, setIsComplete] = useState(false);
  const [selectedWolf, setSelectedWolf] = useState<string | null>(null);
  const [reflection, setReflection] = useState('');

  useEffect(() => {
    const state = getUserState();
    if (!state.onboarded) {
      router.replace('/');
      return;
    }
  }, [router]);

  const tool = QUICK_WINS.find((qw) => qw.id === toolId);

  if (!tool) {
    return (
      <>
        <Header />
        <PageContainer centered>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Tool not found</h1>
            <Link href="/quick-wins">
              <Button>Back to Quick Wins</Button>
            </Link>
          </div>
        </PageContainer>
      </>
    );
  }

  // Render different tool experiences
  const renderToolContent = () => {
    switch (toolId) {
      case 'box-breathing':
        return (
          <BreathingAnimation
            phases={BREATHING_EXERCISES.box.phases}
            cycles={BREATHING_EXERCISES.box.cycles}
            onComplete={() => setIsComplete(true)}
          />
        );

      case '478-breathing':
        return (
          <BreathingAnimation
            phases={BREATHING_EXERCISES['478'].phases}
            cycles={BREATHING_EXERCISES['478'].cycles}
            onComplete={() => setIsComplete(true)}
          />
        );

      case 'two-wolves':
        return (
          <div className="max-w-lg mx-auto">
            <Card variant="warm" padding="lg" className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                {TWO_WOLVES_CONTENT.title}
              </h3>
              <div className="text-white/70 whitespace-pre-line text-sm leading-relaxed">
                {TWO_WOLVES_CONTENT.story}
              </div>
            </Card>

            <h3 className="text-lg font-semibold text-white mb-4 text-center">
              {TWO_WOLVES_CONTENT.question}
            </h3>

            <div className="grid gap-3 sm:grid-cols-3 mb-6">
              {Object.entries(TWO_WOLVES_CONTENT.options).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setSelectedWolf(key)}
                  className={`
                    p-4 rounded-xl border-2 transition-all
                    ${selectedWolf === key
                      ? 'border-accent bg-accent/20'
                      : 'border-white/30 hover:border-white/50'
                    }
                  `}
                >
                  <span className="text-2xl mb-2 block">
                    {key === 'good' ? '🐺✨' : key === 'bad' ? '🐺🔥' : '🐺'}
                  </span>
                  <span className="text-sm font-medium text-white">{label}</span>
                </button>
              ))}
            </div>

            {selectedWolf && (
              <div className="animate-fade-in">
                <p className="text-white/70 mb-4">
                  {selectedWolf === 'good'
                    ? "Great awareness. Keep feeding that wolf with positive thoughts and actions."
                    : selectedWolf === 'bad'
                    ? "That's okay—awareness is the first step. What's one small thing you can do to feed the good wolf right now?"
                    : "That's human. Every day is a choice. Which wolf do you want to feed more?"}
                </p>
                <Button onClick={() => setIsComplete(true)} fullWidth>
                  Complete Check-in
                </Button>
              </div>
            )}
          </div>
        );

      case 'get-to-language':
        return (
          <div className="max-w-lg mx-auto">
            <Card variant="glow" padding="lg" className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                The Power of "Get To"
              </h3>
              <p className="text-white/70 mb-4">
                Notice how "I've <strong>got to</strong> go to work" feels heavy and obligatory.
              </p>
              <p className="text-white/70 mb-4">
                Now try: "I <strong>get to</strong> go to work."
              </p>
              <p className="text-white/70">
                Same words, different energy. One feels like a burden, the other like a privilege.
              </p>
            </Card>

            <h3 className="text-lg font-semibold text-white mb-4">
              Your Turn
            </h3>
            <p className="text-white/70 mb-4">
              What's something you've been saying you've "got to" do?
            </p>

            <TextArea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="I've got to..."
              rows={2}
              className="mb-4"
            />

            {reflection && (
              <div className="animate-fade-in">
                <Card variant="warm" padding="md" className="mb-6">
                  <p className="text-white font-medium">
                    Reframe: "I <span className="text-primary">get to</span>{' '}
                    {reflection.replace(/^I('ve)?\s*(got|have)\s*to\s*/i, '').trim() || '...'}
                    "
                  </p>
                </Card>

                <p className="text-white/70 text-sm mb-4">
                  Feel the difference? Keep noticing your language today.
                </p>

                <Button onClick={() => setIsComplete(true)} fullWidth>
                  Got It
                </Button>
              </div>
            )}
          </div>
        );

      case 'i-am-enough':
        return (
          <div className="max-w-lg mx-auto text-center">
            <div className="py-12">
              <div className="text-6xl mb-8">💪</div>
              <h2 className="text-3xl font-bold text-white mb-6">
                I Am Enough
              </h2>
              <p className="text-xl text-white/70 mb-8">
                Say it out loud. Mean it.
              </p>

              <Card variant="glow" padding="lg" className="mb-8">
                <p className="text-lg text-white leading-relaxed">
                  You don't have to earn your worth. You don't have to prove anything to anyone.
                  Right here, right now, as you are—<strong className="text-primary">you are enough</strong>.
                </p>
              </Card>

              <p className="text-white/70 mb-6">
                Take a deep breath. Place your hand on your heart if it helps.
              </p>

              <Button onClick={() => setIsComplete(true)} size="lg">
                I Am Enough
              </Button>
            </div>
          </div>
        );

      case 'three-wins':
        return <ThreeWinsExercise onComplete={() => setIsComplete(true)} />;

      case 'play-microdose':
        return (
          <div className="max-w-lg mx-auto text-center">
            <div className="text-5xl mb-6">🎮</div>
            <h3 className="text-xl font-semibold text-white mb-4">
              5 Minutes of Pure Play
            </h3>
            <p className="text-white/70 mb-8">
              Set a timer for 5 minutes and do something purely for fun.
              No productivity, no purpose—just play.
            </p>

            <div className="grid gap-4 mb-8">
              <Card padding="md" className="text-left">
                <span className="text-lg mr-3">🔍</span>
                <span className="font-medium">Curiosity Play:</span>{' '}
                <span className="text-white/70">Google something weird you've always wondered about</span>
              </Card>
              <Card padding="md" className="text-left">
                <span className="text-lg mr-3">🎲</span>
                <span className="font-medium">Spontaneity Play:</span>{' '}
                <span className="text-white/70">Do something random—dance, doodle, make a funny face</span>
              </Card>
              <Card padding="md" className="text-left">
                <span className="text-lg mr-3">🤪</span>
                <span className="font-medium">Nonsense Play:</span>{' '}
                <span className="text-white/70">Do something absurd that makes you laugh</span>
              </Card>
            </div>

            <Button onClick={() => setIsComplete(true)} size="lg">
              I Played!
            </Button>
          </div>
        );

      case 'this-too-shall-pass':
        return (
          <div className="max-w-lg mx-auto text-center py-12">
            <div className="text-5xl mb-8">🌅</div>
            <h2 className="text-3xl font-bold text-white mb-6">
              This Too Shall Pass
            </h2>

            <Card variant="warm" padding="lg" className="mb-8">
              <p className="text-lg text-white leading-relaxed mb-4">
                Whatever you're feeling right now—the pressure, the anxiety, the uncertainty—
                it's temporary. Like clouds passing across the sky.
              </p>
              <p className="text-white/70">
                This moment will change. You will get through this.
              </p>
            </Card>

            <p className="text-white/70 mb-6">
              Take three deep breaths and repeat:<br />
              <strong className="text-white">"This too shall pass."</strong>
            </p>

            <Button onClick={() => setIsComplete(true)} size="lg">
              I Feel It
            </Button>
          </div>
        );

      case 'humming':
        return (
          <div className="max-w-lg mx-auto text-center py-12">
            <div className="text-5xl mb-8">🎵</div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Humming Technique
            </h2>
            <p className="text-white/70 mb-8">
              Humming activates your vagus nerve, calms your nervous system,
              and creates a playful inner tone.
            </p>

            <Card variant="glow" padding="lg" className="mb-8">
              <ol className="text-left space-y-4">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">1.</span>
                  <span>Take a deep breath in</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">2.</span>
                  <span>Hum any tune on the exhale (your favorite song, a random melody)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">3.</span>
                  <span>Feel the vibration in your chest and face</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">4.</span>
                  <span>Repeat 5-10 times</span>
                </li>
              </ol>
            </Card>

            <Button onClick={() => setIsComplete(true)} size="lg">
              Done Humming
            </Button>
          </div>
        );

      case 'rule-number-6':
        return (
          <div className="max-w-lg mx-auto text-center py-12">
            <div className="text-5xl mb-8">😄</div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Rule Number 6
            </h2>

            <Card variant="warm" padding="lg" className="mb-8">
              <blockquote className="text-xl font-semibold text-white mb-4">
                "Don't take yourself so goddamn seriously."
              </blockquote>
              <p className="text-white/70">
                That's Rule Number 6. There are no other rules.
              </p>
            </Card>

            <p className="text-white/70 mb-6">
              Whatever's weighing on you right now—can you find a way to hold it more lightly?
              To laugh at yourself, just a little?
            </p>

            <Button onClick={() => setIsComplete(true)} size="lg">
              I'll Lighten Up
            </Button>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <p className="text-white/70 mb-6">
              This tool is coming soon.
            </p>
            <Link href="/quick-wins">
              <Button>Back to Quick Wins</Button>
            </Link>
          </div>
        );
    }
  };

  if (isComplete) {
    return (
      <>
        <Header />
        <Confetti active={true} duration={3000} particleCount={60} />
        <PageContainer centered>
          <div className="text-center page-transition">
            <div className="mb-6">
              <SuccessCheckmark size={100} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              Well done!
            </h2>
            <p className="text-white/70 mb-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              You just took a moment for yourself. That matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.7s' }}>
              <Link href="/quick-wins">
                <Button variant="secondary">Try Another Tool</Button>
              </Link>
              <Link href="/dashboard">
                <Button>Back to Dashboard</Button>
              </Link>
            </div>
          </div>
        </PageContainer>
      </>
    );
  }

  return (
    <>
      <Header />
      <PageContainer maxWidth="md">
        {/* Back Link */}
        <Link
          href="/quick-wins"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
        >
          ← Back to Quick Wins
        </Link>

        {/* Tool Header */}
        <div className="text-center mb-8">
          <span className="text-4xl mb-4 block">{tool.icon}</span>
          <h1 className="text-2xl font-bold text-white mb-2">{tool.name}</h1>
          <p className="text-white/70">{tool.description}</p>
        </div>

        {/* Tool Content */}
        {renderToolContent()}
      </PageContainer>
    </>
  );
}

// Three Wins Exercise Component
function ThreeWinsExercise({ onComplete }: { onComplete: () => void }) {
  const [todayWins, setTodayWins] = useState(['', '', '']);
  const [tomorrowWins, setTomorrowWins] = useState(['', '', '']);
  const [step, setStep] = useState<'today' | 'tomorrow'>('today');

  const handleTodayWinChange = (index: number, value: string) => {
    const newWins = [...todayWins];
    newWins[index] = value;
    setTodayWins(newWins);
  };

  const handleTomorrowWinChange = (index: number, value: string) => {
    const newWins = [...tomorrowWins];
    newWins[index] = value;
    setTomorrowWins(newWins);
  };

  const canProceedToday = todayWins.some((w) => w.trim().length > 0);
  const canComplete = tomorrowWins.some((w) => w.trim().length > 0);

  if (step === 'today') {
    return (
      <div className="max-w-lg mx-auto">
        <h3 className="text-xl font-semibold text-white mb-2">
          Today's Three Wins
        </h3>
        <p className="text-white/70 mb-6">
          What are three wins from today? They can be small—getting out of bed counts.
        </p>

        <div className="space-y-4 mb-6">
          {todayWins.map((win, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="text-primary font-bold">{index + 1}.</span>
              <input
                type="text"
                value={win}
                onChange={(e) => handleTodayWinChange(index, e.target.value)}
                placeholder={`Win ${index + 1}...`}
                className="flex-1 px-4 py-3 border-2 border-white/30 rounded-xl focus:border-primary focus:outline-none"
              />
            </div>
          ))}
        </div>

        <Button onClick={() => setStep('tomorrow')} disabled={!canProceedToday} fullWidth>
          Continue
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto animate-fade-in">
      <h3 className="text-xl font-semibold text-white mb-2">
        Tomorrow's Three Wins
      </h3>
      <p className="text-white/70 mb-6">
        What are three wins you want to create tomorrow?
      </p>

      <div className="space-y-4 mb-6">
        {tomorrowWins.map((win, index) => (
          <div key={index} className="flex items-center gap-3">
            <span className="text-primary font-bold">{index + 1}.</span>
            <input
              type="text"
              value={win}
              onChange={(e) => handleTomorrowWinChange(index, e.target.value)}
              placeholder={`Win ${index + 1}...`}
              className="flex-1 px-4 py-3 border-2 border-white/30 rounded-xl focus:border-primary focus:outline-none"
            />
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <Button variant="secondary" onClick={() => setStep('today')}>
          Back
        </Button>
        <Button onClick={onComplete} disabled={!canComplete} className="flex-1">
          Complete
        </Button>
      </div>
    </div>
  );
}
