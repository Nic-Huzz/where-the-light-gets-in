'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Header, PageContainer } from '@/components/layout';
import { Button, Card, ProgressIndicator, TextArea } from '@/components/ui';
import { CelebrationScreen } from '@/components/exercises';
import { getUserState, saveCroweySnax, getCroweySnaxByType } from '@/lib/storage';
import {
  DEEP_WORK_EXERCISES,
  A_GAME_WORDS_EXERCISE,
  TO_BE_LIST_EXERCISE,
  ACCEPTANCE_CONTROL_EXERCISE,
  CROWEY_SNAX_NAMES,
} from '@/lib/content';
import { CroweySnaxType, AGameWordsContent, ToBeListContent, AcceptanceListContent, ControlListContent } from '@/lib/types';

export default function DeepWorkExercisePage() {
  const router = useRouter();
  const params = useParams();
  const exerciseId = params.exercise as string;

  const [step, setStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [data, setData] = useState<Record<string, string>>({});
  const [existingSnax, setExistingSnax] = useState<boolean>(false);

  useEffect(() => {
    const state = getUserState();
    if (!state.onboarded) {
      router.replace('/');
      return;
    }
  }, [router]);

  const exercise = DEEP_WORK_EXERCISES.find((ex) => ex.id === exerciseId);

  useEffect(() => {
    if (exercise) {
      const existing = getCroweySnaxByType(exercise.produces);
      setExistingSnax(!!existing);
    }
  }, [exercise]);

  if (!exercise) {
    return (
      <>
        <Header />
        <PageContainer centered>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Exercise not found</h1>
            <Link href="/deep-work">
              <Button>Back to Deep Work</Button>
            </Link>
          </div>
        </PageContainer>
      </>
    );
  }

  const handleSaveAndComplete = (snaxType: CroweySnaxType, content: unknown) => {
    const state = getUserState();
    saveCroweySnax({
      type: snaxType,
      title: CROWEY_SNAX_NAMES[snaxType],
      content: content as AGameWordsContent | ToBeListContent | AcceptanceListContent | ControlListContent,
      painPoint: state.painPoint!,
    });
    setIsComplete(true);
  };

  // Render the appropriate exercise
  const renderExercise = () => {
    switch (exerciseId) {
      case 'a-game-words':
        return (
          <AGameWordsExercise
            step={step}
            setStep={setStep}
            data={data}
            setData={setData}
            onComplete={(content) => handleSaveAndComplete('a-game-words', content)}
          />
        );

      case 'to-be-list':
        return (
          <ToBeListExercise
            step={step}
            setStep={setStep}
            data={data}
            setData={setData}
            onComplete={(content) => handleSaveAndComplete('to-be-list', content)}
          />
        );

      case 'acceptance-control-lists':
        return (
          <AcceptanceControlExercise
            step={step}
            setStep={setStep}
            data={data}
            setData={setData}
            onComplete={(acceptContent, controlContent) => {
              handleSaveAndComplete('acceptance-list', acceptContent);
              // Also save control list
              const state = getUserState();
              saveCroweySnax({
                type: 'control-list',
                title: CROWEY_SNAX_NAMES['control-list'],
                content: controlContent as ControlListContent,
                painPoint: state.painPoint!,
              });
            }}
          />
        );

      case 'success-list':
        return (
          <SuccessListExercise
            step={step}
            setStep={setStep}
            data={data}
            setData={setData}
            onComplete={(content) => handleSaveAndComplete('success-list', content)}
          />
        );

      case 'just-admit-it':
        return (
          <JustAdmitItExercise
            step={step}
            setStep={setStep}
            data={data}
            setData={setData}
            onComplete={(content) => handleSaveAndComplete('just-admit-it', content)}
          />
        );

      case 'mantras':
        return (
          <MantrasExercise
            step={step}
            setStep={setStep}
            data={data}
            setData={setData}
            onComplete={(content) => handleSaveAndComplete('mantras', content)}
          />
        );

      default:
        return (
          <div className="text-center py-12">
            <p className="text-white/70 mb-6">
              This exercise is coming soon.
            </p>
            <Link href="/deep-work">
              <Button>Back to Deep Work</Button>
            </Link>
          </div>
        );
    }
  };

  if (isComplete) {
    return (
      <>
        <Header />
        <PageContainer>
          <CelebrationScreen
            snaxName={CROWEY_SNAX_NAMES[exercise.produces]}
            message="This is yours forever. Use it whenever you need it."
          />
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
          href="/deep-work"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
        >
          ← Back to Deep Work
        </Link>

        {/* Warning if already exists */}
        {existingSnax && step === 0 && (
          <Card variant="warm" padding="md" className="mb-6">
            <p className="text-sm text-white">
              <span className="font-medium">Note:</span> You've already created this Crowey Snax.
              Completing it again will update your existing one.
            </p>
          </Card>
        )}

        {renderExercise()}
      </PageContainer>
    </>
  );
}

// A-Game Words Exercise
function AGameWordsExercise({
  step,
  setStep,
  data,
  setData,
  onComplete,
}: {
  step: number;
  setStep: (s: number) => void;
  data: Record<string, string>;
  setData: (d: Record<string, string>) => void;
  onComplete: (content: AGameWordsContent) => void;
}) {
  const content = A_GAME_WORDS_EXERCISE;
  const [words, setWords] = useState<string[]>(['', '', '', '', '']);

  const handleWordChange = (index: number, value: string) => {
    const newWords = [...words];
    newWords[index] = value;
    setWords(newWords);
  };

  const handleComplete = () => {
    onComplete({
      words: words.filter((w) => w.trim()),
      peakMemory: data.memory || '',
    });
  };

  const steps = [
    // Step 0: Intro
    <div key="intro" className="text-center py-8">
      <span className="text-5xl mb-6 block">{content.intro.title.includes('A-Game') ? '⭐' : '📝'}</span>
      <h1 className="text-2xl font-bold text-white mb-4">{content.intro.title}</h1>
      <p className="text-white/70 mb-8 whitespace-pre-line">{content.intro.description}</p>
      <Button onClick={() => setStep(1)}>Begin</Button>
    </div>,

    // Step 1: Peak Memory
    <div key="step1">
      <ProgressIndicator currentStep={1} totalSteps={4} className="mb-6" />
      <h2 className="text-xl font-semibold text-white mb-2">{content.steps[0].title}</h2>
      <p className="text-white/70 mb-4">{content.steps[0].description}</p>
      <p className="text-sm text-white/70 mb-4 italic">{content.steps[0].example}</p>
      <TextArea
        value={data.memory || ''}
        onChange={(e) => setData({ ...data, memory: e.target.value })}
        placeholder="Describe your peak performance moment..."
        rows={6}
      />
      <div className="flex gap-4 mt-6">
        <Button variant="secondary" onClick={() => setStep(0)}>Back</Button>
        <Button onClick={() => setStep(2)} disabled={!data.memory?.trim()}>Continue</Button>
      </div>
    </div>,

    // Step 2: Feelings
    <div key="step2">
      <ProgressIndicator currentStep={2} totalSteps={4} className="mb-6" />
      <h2 className="text-xl font-semibold text-white mb-2">{content.steps[1].title}</h2>
      <p className="text-white/70 mb-4">{content.steps[1].description}</p>
      <p className="text-sm text-white/70 mb-4 italic">{content.steps[1].example}</p>
      <TextArea
        value={data.feelings || ''}
        onChange={(e) => setData({ ...data, feelings: e.target.value })}
        placeholder="What words describe how you felt?"
        rows={6}
      />
      <div className="flex gap-4 mt-6">
        <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
        <Button onClick={() => setStep(3)} disabled={!data.feelings?.trim()}>Continue</Button>
      </div>
    </div>,

    // Step 3: Choose 5 Words
    <div key="step3">
      <ProgressIndicator currentStep={3} totalSteps={4} className="mb-6" />
      <h2 className="text-xl font-semibold text-white mb-2">{content.steps[2].title}</h2>
      <p className="text-white/70 mb-6">{content.steps[2].description}</p>

      <Card variant="warm" padding="md" className="mb-6">
        <p className="text-sm text-white/70 mb-2">From your reflection:</p>
        <p className="text-white italic">"{data.feelings}"</p>
      </Card>

      <div className="space-y-3 mb-6">
        {words.map((word, index) => (
          <div key={index} className="flex items-center gap-3">
            <span className="text-accent font-bold w-6">{index + 1}.</span>
            <input
              type="text"
              value={word}
              onChange={(e) => handleWordChange(index, e.target.value)}
              placeholder={`Word ${index + 1}...`}
              className="flex-1 px-4 py-3 border-2 border-white/30 rounded-xl focus:border-white/60 focus:outline-none text-lg"
            />
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <Button variant="secondary" onClick={() => setStep(2)}>Back</Button>
        <Button onClick={() => setStep(4)} disabled={words.filter(w => w.trim()).length < 3}>
          Continue
        </Button>
      </div>
    </div>,

    // Step 4: Final Review
    <div key="step4">
      <ProgressIndicator currentStep={4} totalSteps={4} className="mb-6" />
      <h2 className="text-xl font-semibold text-white mb-2">{content.steps[3].title}</h2>
      <p className="text-white/70 mb-6">{content.steps[3].description}</p>

      <Card variant="glow" padding="lg" className="mb-8">
        <h3 className="text-lg font-semibold text-accent mb-4 text-center">Your A-Game Words</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {words.filter(w => w.trim()).map((word, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-accent/20 text-accent rounded-full font-medium text-lg"
            >
              {word}
            </span>
          ))}
        </div>
      </Card>

      <div className="flex gap-4">
        <Button variant="secondary" onClick={() => setStep(3)}>Back</Button>
        <Button onClick={handleComplete}>Create My Crowey Snax</Button>
      </div>
    </div>,
  ];

  return steps[step] || steps[0];
}

// To Be List Exercise
function ToBeListExercise({
  step,
  setStep,
  data,
  setData,
  onComplete,
}: {
  step: number;
  setStep: (s: number) => void;
  data: Record<string, string>;
  setData: (d: Record<string, string>) => void;
  onComplete: (content: ToBeListContent) => void;
}) {
  const content = TO_BE_LIST_EXERCISE;

  const handleComplete = () => {
    const allQualities = [
      ...(data.qualities || '').split('\n').filter(q => q.trim()),
      ...(data.relationshipQualities || '').split('\n').filter(q => q.trim()),
    ];
    onComplete({ qualities: allQualities });
  };

  const steps = [
    // Intro
    <div key="intro" className="text-center py-8">
      <span className="text-5xl mb-6 block">📝</span>
      <h1 className="text-2xl font-bold text-white mb-4">{content.intro.title}</h1>
      <p className="text-white/70 mb-8 whitespace-pre-line">{content.intro.description}</p>
      <Button onClick={() => setStep(1)}>Begin</Button>
    </div>,

    // Step 1
    <div key="step1">
      <ProgressIndicator currentStep={1} totalSteps={3} className="mb-6" />
      <h2 className="text-xl font-semibold text-white mb-2">{content.steps[0].title}</h2>
      <p className="text-white/70 mb-4">{content.steps[0].description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {content.steps[0].examples?.map((ex) => (
          <button
            key={ex}
            onClick={() => {
              const current = data.qualities || '';
              if (!current.includes(ex)) {
                setData({ ...data, qualities: current + (current ? '\n' : '') + ex });
              }
            }}
            className="px-3 py-1.5 bg-white/20 hover:bg-accent/20 rounded-full text-sm transition-colors"
          >
            {ex}
          </button>
        ))}
      </div>

      <TextArea
        value={data.qualities || ''}
        onChange={(e) => setData({ ...data, qualities: e.target.value })}
        placeholder="List qualities, one per line..."
        rows={6}
      />
      <div className="flex gap-4 mt-6">
        <Button variant="secondary" onClick={() => setStep(0)}>Back</Button>
        <Button onClick={() => setStep(2)} disabled={!data.qualities?.trim()}>Continue</Button>
      </div>
    </div>,

    // Step 2
    <div key="step2">
      <ProgressIndicator currentStep={2} totalSteps={3} className="mb-6" />
      <h2 className="text-xl font-semibold text-white mb-2">{content.steps[1].title}</h2>
      <p className="text-white/70 mb-4">{content.steps[1].description}</p>
      <TextArea
        value={data.relationshipQualities || ''}
        onChange={(e) => setData({ ...data, relationshipQualities: e.target.value })}
        placeholder="How do you want to BE in relationships?"
        rows={6}
      />
      <div className="flex gap-4 mt-6">
        <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
        <Button onClick={() => setStep(3)}>Continue</Button>
      </div>
    </div>,

    // Final
    <div key="final">
      <ProgressIndicator currentStep={3} totalSteps={3} className="mb-6" />
      <h2 className="text-xl font-semibold text-white mb-2">{content.steps[2].title}</h2>
      <p className="text-white/70 mb-6">{content.steps[2].celebration}</p>

      <Card variant="glow" padding="lg" className="mb-8">
        <h3 className="text-lg font-semibold text-accent mb-4 text-center">Your "To Be" List</h3>
        <ul className="space-y-2">
          {[
            ...(data.qualities || '').split('\n').filter(q => q.trim()),
            ...(data.relationshipQualities || '').split('\n').filter(q => q.trim()),
          ].map((quality, index) => (
            <li key={index} className="flex items-center gap-2">
              <span className="text-accent">•</span>
              <span>{quality}</span>
            </li>
          ))}
        </ul>
      </Card>

      <div className="flex gap-4">
        <Button variant="secondary" onClick={() => setStep(2)}>Back</Button>
        <Button onClick={handleComplete}>Create My Crowey Snax</Button>
      </div>
    </div>,
  ];

  return steps[step] || steps[0];
}

// Acceptance & Control Exercise
function AcceptanceControlExercise({
  step,
  setStep,
  data,
  setData,
  onComplete,
}: {
  step: number;
  setStep: (s: number) => void;
  data: Record<string, string>;
  setData: (d: Record<string, string>) => void;
  onComplete: (accept: AcceptanceListContent, control: ControlListContent) => void;
}) {
  const content = ACCEPTANCE_CONTROL_EXERCISE;

  const handleComplete = () => {
    onComplete(
      { items: (data.uncontrollables || '').split('\n').filter(i => i.trim()) },
      { items: (data.controllables || '').split('\n').filter(i => i.trim()) }
    );
  };

  const steps = [
    // Intro
    <div key="intro" className="text-center py-8">
      <span className="text-5xl mb-6 block">☯️</span>
      <h1 className="text-2xl font-bold text-white mb-4">{content.intro.title}</h1>
      <p className="text-white/70 mb-8 whitespace-pre-line">{content.intro.description}</p>
      <Button onClick={() => setStep(1)}>Begin</Button>
    </div>,

    // Situation
    <div key="step1">
      <ProgressIndicator currentStep={1} totalSteps={4} className="mb-6" />
      <h2 className="text-xl font-semibold text-white mb-2">{content.steps[0].title}</h2>
      <p className="text-white/70 mb-4">{content.steps[0].description}</p>
      <TextArea
        value={data.situation || ''}
        onChange={(e) => setData({ ...data, situation: e.target.value })}
        placeholder="Describe the situation..."
        rows={4}
      />
      <div className="flex gap-4 mt-6">
        <Button variant="secondary" onClick={() => setStep(0)}>Back</Button>
        <Button onClick={() => setStep(2)} disabled={!data.situation?.trim()}>Continue</Button>
      </div>
    </div>,

    // Uncontrollables
    <div key="step2">
      <ProgressIndicator currentStep={2} totalSteps={4} className="mb-6" />
      <h2 className="text-xl font-semibold text-white mb-2">{content.steps[1].title}</h2>
      <p className="text-white/70 mb-4">{content.steps[1].description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {content.steps[1].examples?.map((ex) => (
          <button
            key={ex}
            onClick={() => {
              const current = data.uncontrollables || '';
              if (!current.includes(ex)) {
                setData({ ...data, uncontrollables: current + (current ? '\n' : '') + ex });
              }
            }}
            className="px-3 py-1.5 bg-white/20 hover:bg-red-50 rounded-full text-sm transition-colors"
          >
            {ex}
          </button>
        ))}
      </div>

      <TextArea
        value={data.uncontrollables || ''}
        onChange={(e) => setData({ ...data, uncontrollables: e.target.value })}
        placeholder="List what you can't control, one per line..."
        rows={6}
      />
      <div className="flex gap-4 mt-6">
        <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
        <Button onClick={() => setStep(3)} disabled={!data.uncontrollables?.trim()}>Continue</Button>
      </div>
    </div>,

    // Controllables
    <div key="step3">
      <ProgressIndicator currentStep={3} totalSteps={4} className="mb-6" />
      <h2 className="text-xl font-semibold text-white mb-2">{content.steps[2].title}</h2>
      <p className="text-white/70 mb-4">{content.steps[2].description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {content.steps[2].examples?.map((ex) => (
          <button
            key={ex}
            onClick={() => {
              const current = data.controllables || '';
              if (!current.includes(ex)) {
                setData({ ...data, controllables: current + (current ? '\n' : '') + ex });
              }
            }}
            className="px-3 py-1.5 bg-white/20 hover:bg-green-50 rounded-full text-sm transition-colors"
          >
            {ex}
          </button>
        ))}
      </div>

      <TextArea
        value={data.controllables || ''}
        onChange={(e) => setData({ ...data, controllables: e.target.value })}
        placeholder="List what you CAN control, one per line..."
        rows={6}
      />
      <div className="flex gap-4 mt-6">
        <Button variant="secondary" onClick={() => setStep(2)}>Back</Button>
        <Button onClick={() => setStep(4)} disabled={!data.controllables?.trim()}>Continue</Button>
      </div>
    </div>,

    // Final
    <div key="final">
      <ProgressIndicator currentStep={4} totalSteps={4} className="mb-6" />
      <h2 className="text-xl font-semibold text-white mb-2">{content.steps[3].title}</h2>
      <p className="text-white/70 mb-6">{content.steps[3].celebration}</p>

      <div className="grid gap-4 sm:grid-cols-2 mb-8">
        <Card padding="md" className="border-2 border-red-100">
          <h3 className="font-semibold text-red-500 mb-3">Accept & Release</h3>
          <ul className="space-y-1 text-sm">
            {(data.uncontrollables || '').split('\n').filter(i => i.trim()).map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
        </Card>
        <Card padding="md" className="border-2 border-green-100">
          <h3 className="font-semibold text-green-500 mb-3">Control & Act</h3>
          <ul className="space-y-1 text-sm">
            {(data.controllables || '').split('\n').filter(i => i.trim()).map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="flex gap-4">
        <Button variant="secondary" onClick={() => setStep(3)}>Back</Button>
        <Button onClick={handleComplete}>Create My Crowey Snax</Button>
      </div>
    </div>,
  ];

  return steps[step] || steps[0];
}

// Success List Exercise
function SuccessListExercise({
  step,
  setStep,
  data,
  setData,
  onComplete,
}: {
  step: number;
  setStep: (s: number) => void;
  data: Record<string, string>;
  setData: (d: Record<string, string>) => void;
  onComplete: (content: { definitions: string[] }) => void;
}) {
  const handleComplete = () => {
    onComplete({
      definitions: (data.definitions || '').split('\n').filter(d => d.trim()),
    });
  };

  const steps = [
    // Intro
    <div key="intro" className="text-center py-8">
      <span className="text-5xl mb-6 block">🎯</span>
      <h1 className="text-2xl font-bold text-white mb-4">Define Your Success</h1>
      <p className="text-white/70 mb-8">
        Forget society's definition. What does success mean to YOU?
        This exercise helps you create your own measures.
      </p>
      <Button onClick={() => setStep(1)}>Begin</Button>
    </div>,

    // Questions
    <div key="step1">
      <ProgressIndicator currentStep={1} totalSteps={2} className="mb-6" />
      <h2 className="text-xl font-semibold text-white mb-4">
        "I know I'm being successful when..."
      </h2>
      <p className="text-white/70 mb-4">
        Complete this sentence in as many ways as feel true for you.
        Think about relationships, feelings, actions—not just achievements.
      </p>

      <TextArea
        value={data.definitions || ''}
        onChange={(e) => setData({ ...data, definitions: e.target.value })}
        placeholder="I know I'm being successful when...&#10;• I feel at peace&#10;• My kids want to spend time with me&#10;• I'm learning something new"
        rows={10}
      />
      <div className="flex gap-4 mt-6">
        <Button variant="secondary" onClick={() => setStep(0)}>Back</Button>
        <Button onClick={() => setStep(2)} disabled={!data.definitions?.trim()}>Continue</Button>
      </div>
    </div>,

    // Final
    <div key="final">
      <ProgressIndicator currentStep={2} totalSteps={2} className="mb-6" />
      <h2 className="text-xl font-semibold text-white mb-4">Your Success List</h2>
      <p className="text-white/70 mb-6">
        These are YOUR measures of success. Review them when you doubt yourself.
      </p>

      <Card variant="glow" padding="lg" className="mb-8">
        <h3 className="text-lg font-semibold text-accent mb-4">I know I'm being successful when...</h3>
        <ul className="space-y-2">
          {(data.definitions || '').split('\n').filter(d => d.trim()).map((def, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-accent">✓</span>
              <span>{def.replace(/^[•\-\*]\s*/, '')}</span>
            </li>
          ))}
        </ul>
      </Card>

      <div className="flex gap-4">
        <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
        <Button onClick={handleComplete}>Create My Crowey Snax</Button>
      </div>
    </div>,
  ];

  return steps[step] || steps[0];
}

// Just Admit It Exercise
function JustAdmitItExercise({
  step,
  setStep,
  data,
  setData,
  onComplete,
}: {
  step: number;
  setStep: (s: number) => void;
  data: Record<string, string>;
  setData: (d: Record<string, string>) => void;
  onComplete: (content: { truths: string[] }) => void;
}) {
  const handleComplete = () => {
    onComplete({
      truths: (data.truths || '').split('\n').filter(t => t.trim()),
    });
  };

  const steps = [
    // Intro
    <div key="intro" className="text-center py-8">
      <span className="text-5xl mb-6 block">🪞</span>
      <h1 className="text-2xl font-bold text-white mb-4">"Just Admit It" List</h1>
      <p className="text-white/70 mb-8">
        Sometimes we need radical honesty with ourselves.
        Name the truths you've been avoiding. Once externalized, they lose their power.
      </p>
      <Button onClick={() => setStep(1)}>Begin</Button>
    </div>,

    // Truths
    <div key="step1">
      <ProgressIndicator currentStep={1} totalSteps={2} className="mb-6" />
      <h2 className="text-xl font-semibold text-white mb-4">
        Just Admit It...
      </h2>
      <p className="text-white/70 mb-4">
        What are you avoiding? What fears haven't you named? What truths are you dancing around?
        This is just for you. Be radically honest.
      </p>

      <TextArea
        value={data.truths || ''}
        onChange={(e) => setData({ ...data, truths: e.target.value })}
        placeholder="Just admit it...&#10;• I'm scared of failing&#10;• I want to be loved&#10;• I don't have all the answers"
        rows={10}
      />
      <div className="flex gap-4 mt-6">
        <Button variant="secondary" onClick={() => setStep(0)}>Back</Button>
        <Button onClick={() => setStep(2)} disabled={!data.truths?.trim()}>Continue</Button>
      </div>
    </div>,

    // Final
    <div key="final">
      <ProgressIndicator currentStep={2} totalSteps={2} className="mb-6" />
      <h2 className="text-xl font-semibold text-white mb-4">Your Truths</h2>
      <p className="text-white/70 mb-6">
        By naming these, you've taken away some of their power. You're human. These are human truths.
      </p>

      <Card variant="warm" padding="lg" className="mb-8">
        <ul className="space-y-2">
          {(data.truths || '').split('\n').filter(t => t.trim()).map((truth, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-accent">•</span>
              <span>{truth.replace(/^[•\-\*]\s*/, '')}</span>
            </li>
          ))}
        </ul>
      </Card>

      <div className="flex gap-4">
        <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
        <Button onClick={handleComplete}>Create My Crowey Snax</Button>
      </div>
    </div>,
  ];

  return steps[step] || steps[0];
}

// Mantras Exercise
function MantrasExercise({
  step,
  setStep,
  data: _data,
  setData: _setData,
  onComplete,
}: {
  step: number;
  setStep: (s: number) => void;
  data: Record<string, string>;
  setData: (d: Record<string, string>) => void;
  onComplete: (content: { mantras: Array<{ situation: string; mantra: string }> }) => void;
}) {
  const [mantras, setMantras] = useState<Array<{ situation: string; mantra: string }>>([
    { situation: '', mantra: '' },
  ]);

  const addMantra = () => {
    setMantras([...mantras, { situation: '', mantra: '' }]);
  };

  const updateMantra = (index: number, field: 'situation' | 'mantra', value: string) => {
    const updated = [...mantras];
    updated[index][field] = value;
    setMantras(updated);
  };

  const handleComplete = () => {
    onComplete({
      mantras: mantras.filter(m => m.situation.trim() || m.mantra.trim()),
    });
  };

  const steps = [
    // Intro
    <div key="intro" className="text-center py-8">
      <span className="text-5xl mb-6 block">💫</span>
      <h1 className="text-2xl font-bold text-white mb-4">Create Your Mantras</h1>
      <p className="text-white/70 mb-8">
        Personal power phrases for when pressure rises.
        These become your anchors in difficult moments.
      </p>
      <Button onClick={() => setStep(1)}>Begin</Button>
    </div>,

    // Questions
    <div key="step1">
      <ProgressIndicator currentStep={1} totalSteps={2} className="mb-6" />
      <h2 className="text-xl font-semibold text-white mb-4">When anxiety rises...</h2>
      <p className="text-white/70 mb-4">
        Think about situations where you feel anxious or nervous.
        What could you say to yourself to feel grounded and powerful?
      </p>

      {mantras.map((m, index) => (
        <Card key={index} padding="md" className="mb-4">
          <div className="space-y-3">
            <input
              type="text"
              value={m.situation}
              onChange={(e) => updateMantra(index, 'situation', e.target.value)}
              placeholder="When I feel..."
              className="w-full px-4 py-2 border-2 border-white/30 rounded-lg focus:border-white/60 focus:outline-none"
            />
            <input
              type="text"
              value={m.mantra}
              onChange={(e) => updateMantra(index, 'mantra', e.target.value)}
              placeholder="I tell myself..."
              className="w-full px-4 py-2 border-2 border-white/30 rounded-lg focus:border-white/60 focus:outline-none"
            />
          </div>
        </Card>
      ))}

      <button
        onClick={addMantra}
        className="text-accent hover:text-accent-dark text-sm font-medium mb-6"
      >
        + Add another mantra
      </button>

      <div className="flex gap-4 mt-6">
        <Button variant="secondary" onClick={() => setStep(0)}>Back</Button>
        <Button
          onClick={() => setStep(2)}
          disabled={!mantras.some(m => m.mantra.trim())}
        >
          Continue
        </Button>
      </div>
    </div>,

    // Final
    <div key="final">
      <ProgressIndicator currentStep={2} totalSteps={2} className="mb-6" />
      <h2 className="text-xl font-semibold text-white mb-4">Your Mantras</h2>
      <p className="text-white/70 mb-6">
        Use these when pressure rises. Say them out loud or in your head.
      </p>

      <div className="space-y-4 mb-8">
        {mantras.filter(m => m.mantra.trim()).map((m, i) => (
          <Card key={i} variant="glow" padding="md">
            {m.situation && (
              <p className="text-sm text-white/70 mb-2">When {m.situation}...</p>
            )}
            <p className="text-lg font-semibold text-accent">"{m.mantra}"</p>
          </Card>
        ))}
      </div>

      <div className="flex gap-4">
        <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
        <Button onClick={handleComplete}>Create My Crowey Snax</Button>
      </div>
    </div>,
  ];

  return steps[step] || steps[0];
}
