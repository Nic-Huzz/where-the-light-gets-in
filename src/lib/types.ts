// Pain Points - the entry points for users
export type PainPoint =
  | 'pressure'      // "I choke under pressure"
  | 'burnout'       // "I'm burned out / exhausted"
  | 'identity'      // "I don't know who I am"
  | 'self-critical' // "I'm too hard on myself"
  | 'stuck'         // "I'm stuck / lost"
  | 'empty'         // "I'm successful but empty"
  | 'anxious'       // "I'm anxious all the time"
  | 'joyless';      // "I've lost my spark / joy"

// User readiness level
export type Readiness = 'quick-wins' | 'deep-work';

// User state stored in local storage
export interface UserState {
  onboarded: boolean;
  painPoint: PainPoint | null;
  readiness: Readiness | null;
  createdAt: string;
}

// Crowey Snax types - the artifacts users create
export type CroweySnaxType =
  | 'a-game-words'
  | 'to-be-list'
  | 'acceptance-list'
  | 'control-list'
  | 'success-list'
  | 'mantras'
  | 'fear-archetype'
  | 'who-am-i'
  | 'ikigai'
  | 'happiness-index'
  | 'just-admit-it'
  | 'dedication'
  | 'touchstone-word'
  | 'not-enough-stories'
  | 'dreams';

// Individual Crowey Snax item
export interface CroweySnax {
  id: string;
  type: CroweySnaxType;
  title: string;
  content: CroweySnaxContent;
  createdAt: string;
  updatedAt: string;
  painPoint: PainPoint;
}

// Content types for different Crowey Snax
export type CroweySnaxContent =
  | AGameWordsContent
  | ToBeListContent
  | AcceptanceListContent
  | ControlListContent
  | SuccessListContent
  | MantrasContent
  | FearArchetypeContent
  | WhoAmIContent
  | IkigaiContent
  | JustAdmitItContent
  | DedicationContent
  | TouchstoneWordContent
  | NotEnoughStoriesContent
  | DreamsContent;

export interface AGameWordsContent {
  words: string[]; // 5 words
  peakMemory: string;
}

export interface ToBeListContent {
  qualities: string[];
}

export interface AcceptanceListContent {
  items: string[];
}

export interface ControlListContent {
  items: string[];
}

export interface SuccessListContent {
  definitions: string[];
}

export interface MantrasContent {
  mantras: Array<{
    situation: string;
    mantra: string;
  }>;
}

export interface FearArchetypeContent {
  archetype: 'lone-wolf' | 'pleaser' | 'impostor' | 'deflector' | 'self-promoter';
  insights: string;
}

export interface WhoAmIContent {
  answers: Record<string, string>;
}

export interface IkigaiContent {
  love: string[];
  goodAt: string[];
  worldNeeds: string[];
  paidFor: string[];
  intersection: string;
}

export interface JustAdmitItContent {
  truths: string[];
}

export interface DedicationContent {
  person: string;
  reason: string;
}

export interface TouchstoneWordContent {
  word: string;
  meaning: string;
}

export interface NotEnoughStoriesContent {
  stories: Array<{
    belief: string;
    origin: string;
    reframe: string;
  }>;
}

export interface DreamsContent {
  dreams: string[];
}

// Mojo Score for weekly check-ins
export interface MojoScore {
  id: string;
  date: string;
  play: number;      // 1-5
  purpose: number;   // 1-5
  potential: number; // 1-5
  pressure?: number; // 1-5 (optional)
  inertia?: number;  // 1-5 (optional)
  reflection?: string;
}

// Three Wins practice
export interface ThreeWins {
  id: string;
  date: string;
  todayWins: string[];
  tomorrowWins: string[];
}

// Quick Win tools
export interface QuickWin {
  id: string;
  name: string;
  description: string;
  duration: string;
  icon: string;
  category: 'breathing' | 'reframe' | 'awareness' | 'play';
  painPoints: PainPoint[]; // which pain points this helps with
}

// Deep Work exercises
export interface DeepWorkExercise {
  id: string;
  name: string;
  description: string;
  produces: CroweySnaxType;
  icon: string;
  steps: number;
  painPoints: PainPoint[];
}

// Pain point display info
export interface PainPointInfo {
  id: PainPoint;
  label: string;
  description: string;
  icon: string;
}
