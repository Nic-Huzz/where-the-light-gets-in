'use client';

import { UserState, CroweySnax, MojoScore, ThreeWins, PainPoint, Readiness } from './types';

// Storage keys
const STORAGE_KEYS = {
  USER_STATE: 'wtlgi_user_state',
  CROWEY_SNAX: 'wtlgi_crowey_snax',
  MOJO_SCORES: 'wtlgi_mojo_scores',
  THREE_WINS: 'wtlgi_three_wins',
} as const;

// Generate unique ID
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Safe JSON parse with fallback
function safeJsonParse<T>(json: string | null, fallback: T): T {
  if (!json) return fallback;
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

// Check if we're in the browser
function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

// ============================================
// User State
// ============================================

const DEFAULT_USER_STATE: UserState = {
  onboarded: false,
  painPoint: null,
  readiness: null,
  createdAt: '',
};

export function getUserState(): UserState {
  if (!isBrowser()) return DEFAULT_USER_STATE;
  const stored = localStorage.getItem(STORAGE_KEYS.USER_STATE);
  return safeJsonParse(stored, DEFAULT_USER_STATE);
}

export function saveUserState(state: Partial<UserState>): UserState {
  if (!isBrowser()) return DEFAULT_USER_STATE;
  const current = getUserState();
  const updated = {
    ...current,
    ...state,
    createdAt: current.createdAt || new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEYS.USER_STATE, JSON.stringify(updated));
  return updated;
}

export function completeOnboarding(painPoint: PainPoint, readiness: Readiness): UserState {
  return saveUserState({
    onboarded: true,
    painPoint,
    readiness,
    createdAt: new Date().toISOString(),
  });
}

export function resetUserState(): void {
  if (!isBrowser()) return;
  localStorage.removeItem(STORAGE_KEYS.USER_STATE);
}

// ============================================
// Crowey Snax
// ============================================

export function getCroweySnax(): CroweySnax[] {
  if (!isBrowser()) return [];
  const stored = localStorage.getItem(STORAGE_KEYS.CROWEY_SNAX);
  return safeJsonParse(stored, []);
}

export function saveCroweySnax(snax: Omit<CroweySnax, 'id' | 'createdAt' | 'updatedAt'>): CroweySnax {
  if (!isBrowser()) throw new Error('Cannot save in SSR');

  const existing = getCroweySnax();
  const now = new Date().toISOString();

  // Check if we already have one of this type
  const existingIndex = existing.findIndex(s => s.type === snax.type);

  const newSnax: CroweySnax = {
    ...snax,
    id: existingIndex >= 0 ? existing[existingIndex].id : generateId(),
    createdAt: existingIndex >= 0 ? existing[existingIndex].createdAt : now,
    updatedAt: now,
  };

  if (existingIndex >= 0) {
    existing[existingIndex] = newSnax;
  } else {
    existing.push(newSnax);
  }

  localStorage.setItem(STORAGE_KEYS.CROWEY_SNAX, JSON.stringify(existing));
  return newSnax;
}

export function getCroweySnaxByType(type: CroweySnax['type']): CroweySnax | undefined {
  return getCroweySnax().find(s => s.type === type);
}

export function deleteCroweySnax(id: string): void {
  if (!isBrowser()) return;
  const existing = getCroweySnax();
  const filtered = existing.filter(s => s.id !== id);
  localStorage.setItem(STORAGE_KEYS.CROWEY_SNAX, JSON.stringify(filtered));
}

// ============================================
// Mojo Scores
// ============================================

export function getMojoScores(): MojoScore[] {
  if (!isBrowser()) return [];
  const stored = localStorage.getItem(STORAGE_KEYS.MOJO_SCORES);
  return safeJsonParse(stored, []);
}

export function saveMojoScore(score: Omit<MojoScore, 'id'>): MojoScore {
  if (!isBrowser()) throw new Error('Cannot save in SSR');

  const existing = getMojoScores();

  const newScore: MojoScore = {
    ...score,
    id: generateId(),
  };

  existing.push(newScore);
  localStorage.setItem(STORAGE_KEYS.MOJO_SCORES, JSON.stringify(existing));
  return newScore;
}

export function getLatestMojoScore(): MojoScore | undefined {
  const scores = getMojoScores();
  if (scores.length === 0) return undefined;
  return scores.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];
}

export function calculateMojoAverage(score: MojoScore): number {
  return (score.play + score.purpose + score.potential) / 3;
}

// ============================================
// Three Wins
// ============================================

export function getThreeWins(): ThreeWins[] {
  if (!isBrowser()) return [];
  const stored = localStorage.getItem(STORAGE_KEYS.THREE_WINS);
  return safeJsonParse(stored, []);
}

export function saveThreeWins(wins: Omit<ThreeWins, 'id'>): ThreeWins {
  if (!isBrowser()) throw new Error('Cannot save in SSR');

  const existing = getThreeWins();

  // Check if we already have one for today
  const today = new Date().toISOString().split('T')[0];
  const todayIndex = existing.findIndex(w => w.date.startsWith(today));

  const newWins: ThreeWins = {
    ...wins,
    id: todayIndex >= 0 ? existing[todayIndex].id : generateId(),
  };

  if (todayIndex >= 0) {
    existing[todayIndex] = newWins;
  } else {
    existing.push(newWins);
  }

  localStorage.setItem(STORAGE_KEYS.THREE_WINS, JSON.stringify(existing));
  return newWins;
}

export function getTodayThreeWins(): ThreeWins | undefined {
  const today = new Date().toISOString().split('T')[0];
  return getThreeWins().find(w => w.date.startsWith(today));
}

// ============================================
// Clear All Data
// ============================================

export function clearAllData(): void {
  if (!isBrowser()) return;
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
}
