'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header, PageContainer } from '@/components/layout';
import { Card, Button } from '@/components/ui';
import { getUserState, getCroweySnax } from '@/lib/storage';
import { CROWEY_SNAX_NAMES, DEEP_WORK_EXERCISES } from '@/lib/content';
import { CroweySnax, AGameWordsContent, ToBeListContent, AcceptanceListContent, ControlListContent, SuccessListContent, MantrasContent, JustAdmitItContent } from '@/lib/types';

export default function CroweySnaxPage() {
  const router = useRouter();
  const [snax, setSnax] = useState<CroweySnax[]>([]);
  const [selectedSnax, setSelectedSnax] = useState<CroweySnax | null>(null);

  useEffect(() => {
    const state = getUserState();
    if (!state.onboarded) {
      router.replace('/');
      return;
    }

    setSnax(getCroweySnax());
  }, [router]);

  const renderSnaxContent = (snax: CroweySnax) => {
    switch (snax.type) {
      case 'a-game-words': {
        const content = snax.content as AGameWordsContent;
        return (
          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {content.words.map((word, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-primary/10 text-primary rounded-full font-medium text-lg"
                >
                  {word}
                </span>
              ))}
            </div>
            {content.peakMemory && (
              <div className="text-left">
                <h4 className="font-medium text-text mb-2">Peak Memory:</h4>
                <p className="text-text-light text-sm italic">"{content.peakMemory}"</p>
              </div>
            )}
          </div>
        );
      }

      case 'to-be-list': {
        const content = snax.content as ToBeListContent;
        return (
          <ul className="space-y-2">
            {content.qualities.map((q, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="text-primary">•</span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
        );
      }

      case 'acceptance-list': {
        const content = snax.content as AcceptanceListContent;
        return (
          <div>
            <h4 className="font-medium text-red-500 mb-3">Accept & Release</h4>
            <ul className="space-y-2">
              {content.items.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-red-400">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      }

      case 'control-list': {
        const content = snax.content as ControlListContent;
        return (
          <div>
            <h4 className="font-medium text-green-500 mb-3">Control & Act</h4>
            <ul className="space-y-2">
              {content.items.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-400">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      }

      case 'success-list': {
        const content = snax.content as SuccessListContent;
        return (
          <div>
            <h4 className="font-medium text-text mb-3">I know I'm being successful when...</h4>
            <ul className="space-y-2">
              {content.definitions.map((def, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  <span>{def}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      }

      case 'mantras': {
        const content = snax.content as MantrasContent;
        return (
          <div className="space-y-4">
            {content.mantras.map((m, i) => (
              <div key={i}>
                {m.situation && (
                  <p className="text-sm text-text-light mb-1">When {m.situation}...</p>
                )}
                <p className="text-lg font-semibold text-primary">"{m.mantra}"</p>
              </div>
            ))}
          </div>
        );
      }

      case 'just-admit-it': {
        const content = snax.content as JustAdmitItContent;
        return (
          <ul className="space-y-2">
            {content.truths.map((truth, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>{truth}</span>
              </li>
            ))}
          </ul>
        );
      }

      default:
        return (
          <p className="text-text-light">
            Content preview not available.
          </p>
        );
    }
  };

  if (snax.length === 0) {
    return (
      <>
        <Header />
        <PageContainer centered>
          <div className="text-center">
            <span className="text-6xl mb-6 block">🍪</span>
            <h1 className="text-2xl font-bold text-text mb-4">
              Your Crowey Snax Collection
            </h1>
            <p className="text-text-light mb-8 max-w-md mx-auto">
              You haven't created any Crowey Snax yet.
              Complete Deep Work exercises to create personal artifacts you can use forever.
            </p>
            <Link href="/deep-work">
              <Button>Start Creating</Button>
            </Link>
          </div>
        </PageContainer>
      </>
    );
  }

  return (
    <>
      <Header />
      <PageContainer>
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🍪</span>
            <h1 className="text-2xl sm:text-3xl font-bold text-text">
              Your Crowey Snax
            </h1>
          </div>
          <p className="text-text-light">
            Personal artifacts created from your Deep Work. Use them whenever you need them.
          </p>
        </div>

        {/* Snax Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {snax.map((s) => (
            <Card
              key={s.id}
              variant="warm"
              padding="md"
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedSnax(s)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="crowey-snax-badge">
                  <span>🍪</span>
                  <span>{CROWEY_SNAX_NAMES[s.type]}</span>
                </div>
                <span className="text-xs text-text-light">
                  {new Date(s.createdAt).toLocaleDateString()}
                </span>
              </div>

              {/* Preview */}
              <div className="text-sm text-text-light line-clamp-3">
                {s.type === 'a-game-words' && (
                  <span className="text-primary font-medium">
                    {(s.content as AGameWordsContent).words.join(' • ')}
                  </span>
                )}
                {s.type === 'to-be-list' && (
                  <span>{(s.content as ToBeListContent).qualities.slice(0, 3).join(', ')}...</span>
                )}
                {s.type === 'mantras' && (
                  <span className="italic">"{(s.content as MantrasContent).mantras[0]?.mantra}"</span>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Add More CTA */}
        <div className="mt-8 text-center">
          <Link href="/deep-work">
            <Button variant="secondary">Create More Crowey Snax</Button>
          </Link>
        </div>

        {/* Detail Modal */}
        {selectedSnax && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedSnax(null)}
          >
            <Card
              variant="glow"
              padding="lg"
              className="max-w-lg w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="crowey-snax-badge">
                  <span>🍪</span>
                  <span>{CROWEY_SNAX_NAMES[selectedSnax.type]}</span>
                </div>
                <button
                  onClick={() => setSelectedSnax(null)}
                  className="text-text-light hover:text-text"
                >
                  ✕
                </button>
              </div>

              {renderSnaxContent(selectedSnax)}

              <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-xs text-text-light">
                  Created {new Date(selectedSnax.createdAt).toLocaleDateString()}
                </span>
                <Link href={`/deep-work/${DEEP_WORK_EXERCISES.find(e => e.produces === selectedSnax.type)?.id}`}>
                  <Button variant="secondary" size="sm">
                    Update
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        )}
      </PageContainer>
    </>
  );
}
