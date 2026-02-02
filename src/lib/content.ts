import { PainPoint, PainPointInfo, QuickWin, DeepWorkExercise, CroweySnaxType } from './types';

// Pain Point definitions
export const PAIN_POINTS: PainPointInfo[] = [
  {
    id: 'pressure',
    label: "I choke under pressure",
    description: "High-stakes moments feel overwhelming. Your performance suffers when it matters most.",
    icon: "🎯",
  },
  {
    id: 'burnout',
    label: "I'm burned out",
    description: "Running on empty. The tank is dry and you're not sure how to refill it.",
    icon: "🔥",
  },
  {
    id: 'identity',
    label: "I don't know who I am",
    description: "Questioning your identity. Unsure who you are beneath the roles you play.",
    icon: "🪞",
  },
  {
    id: 'self-critical',
    label: "I'm too hard on myself",
    description: "Your inner critic never rests. You beat yourself up for every mistake.",
    icon: "⚖️",
  },
  {
    id: 'stuck',
    label: "I'm stuck or lost",
    description: "Feeling directionless. Not sure which way to go or how to move forward.",
    icon: "🧭",
  },
  {
    id: 'empty',
    label: "I'm successful but empty",
    description: "You've achieved the goals, but something's missing. Success feels hollow.",
    icon: "🏆",
  },
  {
    id: 'anxious',
    label: "I'm anxious all the time",
    description: "Constant low-grade worry. Your mind won't stop spinning.",
    icon: "💭",
  },
  {
    id: 'joyless',
    label: "I've lost my spark",
    description: "The joy has faded. You're going through the motions without feeling alive.",
    icon: "✨",
  },
];

// Quick Wins - Universal daily tools
export const QUICK_WINS: QuickWin[] = [
  {
    id: 'box-breathing',
    name: 'Box Breathing',
    description: '4-4-4-4 breathing cycle to calm your nervous system instantly.',
    duration: '2-5 min',
    icon: '🌬️',
    category: 'breathing',
    painPoints: ['pressure', 'anxious', 'burnout'],
  },
  {
    id: '478-breathing',
    name: '4-7-8 Breathing',
    description: 'Inhale 4, hold 7, exhale 8. Activates your calm response.',
    duration: '2-5 min',
    icon: '🌊',
    category: 'breathing',
    painPoints: ['pressure', 'anxious', 'burnout'],
  },
  {
    id: 'two-wolves',
    name: 'Two Wolves Check-in',
    description: 'Which wolf are you feeding right now? The good wolf or the bad wolf?',
    duration: '1 min',
    icon: '🐺',
    category: 'awareness',
    painPoints: ['self-critical', 'anxious', 'joyless', 'stuck'],
  },
  {
    id: 'get-to-language',
    name: '"Get To" Reframe',
    description: 'Change "I\'ve got to..." to "I get to..." and feel the shift.',
    duration: '1 min',
    icon: '💬',
    category: 'reframe',
    painPoints: ['burnout', 'stuck', 'empty'],
  },
  {
    id: 'three-wins',
    name: 'Three Wins',
    description: '3 wins from today + 3 wins for tomorrow. Rewire your negativity bias.',
    duration: '3 min',
    icon: '🏅',
    category: 'awareness',
    painPoints: ['burnout', 'joyless', 'stuck', 'self-critical'],
  },
  {
    id: 'i-am-enough',
    name: '"I Am Enough" Affirmation',
    description: 'Ground yourself in unconditional worthiness. You are enough.',
    duration: '1 min',
    icon: '💪',
    category: 'reframe',
    painPoints: ['self-critical', 'pressure', 'identity', 'anxious'],
  },
  {
    id: 'play-microdose',
    name: 'Play Micro-dose',
    description: '5 minutes of pure play. Curiosity, spontaneity, or nonsense.',
    duration: '5 min',
    icon: '🎮',
    category: 'play',
    painPoints: ['burnout', 'joyless', 'stuck', 'empty'],
  },
  {
    id: 'this-too-shall-pass',
    name: '"This Too Shall Pass"',
    description: 'Anchor yourself in the temporary nature of all things.',
    duration: '1 min',
    icon: '🌅',
    category: 'reframe',
    painPoints: ['anxious', 'pressure', 'stuck'],
  },
  {
    id: 'humming',
    name: 'Humming Technique',
    description: 'Hum any tune. Calms the mind, improves oxygen flow, creates playful inner tone.',
    duration: '2 min',
    icon: '🎵',
    category: 'breathing',
    painPoints: ['anxious', 'pressure'],
  },
  {
    id: 'rule-number-6',
    name: 'Rule Number 6',
    description: '"Don\'t take yourself so goddamn seriously." Instant lightness.',
    duration: '1 min',
    icon: '😄',
    category: 'play',
    painPoints: ['burnout', 'joyless', 'empty', 'self-critical'],
  },
];

// Deep Work Exercises - Done once to create Crowey Snax
export const DEEP_WORK_EXERCISES: DeepWorkExercise[] = [
  {
    id: 'a-game-words',
    name: 'Discover Your A-Game Words',
    description: 'Find the 5 words that describe you at your absolute best.',
    produces: 'a-game-words',
    icon: '⭐',
    steps: 4,
    painPoints: ['pressure', 'identity', 'anxious'],
  },
  {
    id: 'to-be-list',
    name: 'Create Your "To Be" List',
    description: 'Define who you want to BE, not just what you want to DO.',
    produces: 'to-be-list',
    icon: '📝',
    steps: 3,
    painPoints: ['burnout', 'identity', 'stuck', 'empty'],
  },
  {
    id: 'acceptance-control-lists',
    name: 'Acceptance & Control Lists',
    description: 'Separate what to release from what to act on.',
    produces: 'acceptance-list',
    icon: '☯️',
    steps: 4,
    painPoints: ['pressure', 'anxious', 'burnout', 'stuck'],
  },
  {
    id: 'success-list',
    name: 'Define Your Success',
    description: '"I know I\'m being successful when..." Define it YOUR way.',
    produces: 'success-list',
    icon: '🎯',
    steps: 3,
    painPoints: ['empty', 'burnout', 'stuck'],
  },
  {
    id: 'mantras',
    name: 'Create Your Mantras',
    description: 'Personal power phrases for when pressure rises.',
    produces: 'mantras',
    icon: '💫',
    steps: 3,
    painPoints: ['pressure', 'anxious', 'self-critical'],
  },
  {
    id: 'just-admit-it',
    name: '"Just Admit It" List',
    description: 'Radical honesty with yourself. Name your truths.',
    produces: 'just-admit-it',
    icon: '🪞',
    steps: 2,
    painPoints: ['stuck', 'anxious', 'self-critical'],
  },
  {
    id: 'dedication',
    name: 'Choose Your Dedication',
    description: 'Who do you dedicate your efforts to? Remove ego from performance.',
    produces: 'dedication',
    icon: '❤️',
    steps: 2,
    painPoints: ['pressure', 'empty'],
  },
  {
    id: 'who-am-i',
    name: '"Who Am I?" Exercise',
    description: '7 deep questions to discover your authentic self.',
    produces: 'who-am-i',
    icon: '🌟',
    steps: 7,
    painPoints: ['identity', 'stuck', 'empty'],
  },
  {
    id: 'dreams',
    name: 'Identify Your Dreams',
    description: 'Dream BIG. What are your biggest and wildest dreams?',
    produces: 'dreams',
    icon: '🚀',
    steps: 2,
    painPoints: ['stuck', 'joyless', 'empty'],
  },
  {
    id: 'not-enough-stories',
    name: 'Identify "Not Enough" Stories',
    description: 'Name the limiting beliefs. Then reframe them.',
    produces: 'not-enough-stories',
    icon: '📖',
    steps: 4,
    painPoints: ['self-critical', 'anxious', 'identity'],
  },
];

// Get Quick Wins for a specific pain point
export function getQuickWinsForPainPoint(painPoint: PainPoint): QuickWin[] {
  return QUICK_WINS.filter(qw => qw.painPoints.includes(painPoint));
}

// Get Deep Work exercises for a specific pain point
export function getDeepWorkForPainPoint(painPoint: PainPoint): DeepWorkExercise[] {
  return DEEP_WORK_EXERCISES.filter(ex => ex.painPoints.includes(painPoint));
}

// Get all Quick Wins
export function getAllQuickWins(): QuickWin[] {
  return QUICK_WINS;
}

// Get all Deep Work exercises
export function getAllDeepWork(): DeepWorkExercise[] {
  return DEEP_WORK_EXERCISES;
}

// Get pain point info
export function getPainPointInfo(painPoint: PainPoint): PainPointInfo | undefined {
  return PAIN_POINTS.find(pp => pp.id === painPoint);
}

// Crowey Snax display names
export const CROWEY_SNAX_NAMES: Record<CroweySnaxType, string> = {
  'a-game-words': 'A-Game Words',
  'to-be-list': '"To Be" List',
  'acceptance-list': 'Acceptance List',
  'control-list': 'Control List',
  'success-list': 'Success List',
  'mantras': 'Personal Mantras',
  'fear-archetype': 'Fear Archetype',
  'who-am-i': '"Who Am I?" Answers',
  'ikigai': 'Ikigai',
  'happiness-index': 'Happiness Index',
  'just-admit-it': '"Just Admit It" List',
  'dedication': 'Dedication',
  'touchstone-word': 'Touchstone Word',
  'not-enough-stories': '"Not Enough" Stories',
  'dreams': 'Dreams',
};

// Mojo Score questions
export const MOJO_QUESTIONS = {
  play: {
    question: "This week, how much did you do things purely because you enjoyed them?",
    low: "Almost nothing",
    high: "A lot",
  },
  purpose: {
    question: "This week, how connected did you feel to something meaningful?",
    low: "Disconnected",
    high: "Deeply connected",
  },
  potential: {
    question: "This week, how much did you feel like you were growing or learning?",
    low: "Stagnant",
    high: "Growing",
  },
  pressure: {
    question: "This week, how much were you driven by fear, anxiety, or needing to prove yourself?",
    low: "Not at all",
    high: "Constantly",
  },
  inertia: {
    question: "This week, how much did you do things just because you 'had to' or out of habit?",
    low: "Rarely",
    high: "Most of the time",
  },
};

// Two Wolves content
export const TWO_WOLVES_CONTENT = {
  title: "The Tale of Two Wolves",
  story: `An old Cherokee told his grandson: "A fight is going on inside me. It's a terrible fight between two wolves.

One is evil—he is anger, envy, sorrow, regret, greed, arrogance, self-pity, guilt, resentment, inferiority, lies, false pride, superiority, and ego.

The other is good—he is joy, peace, love, hope, serenity, humility, kindness, benevolence, empathy, generosity, truth, compassion, and faith.

The same fight is going on inside you—and inside every other person, too."

The grandson thought about it for a minute and then asked: "Which wolf will win?"

The old Cherokee simply replied: "The one you feed."`,
  question: "Which wolf are you feeding right now?",
  options: {
    good: "The Good Wolf",
    bad: "The Bad Wolf",
    both: "A bit of both",
  },
};

// Breathing exercise configurations
export const BREATHING_EXERCISES = {
  box: {
    name: 'Box Breathing',
    description: 'Used by Navy SEALs to stay calm under pressure. A complete cycle takes 16 seconds.',
    phases: [
      { name: 'Inhale', duration: 4, instruction: 'Breathe in slowly through your nose' },
      { name: 'Hold', duration: 4, instruction: 'Hold your breath gently' },
      { name: 'Exhale', duration: 4, instruction: 'Breathe out slowly through your mouth' },
      { name: 'Hold', duration: 4, instruction: 'Hold empty, stay relaxed' },
    ],
    cycles: 4,
  },
  '478': {
    name: '4-7-8 Breathing',
    description: 'Dr. Andrew Weil\'s calming breath. Activates your parasympathetic nervous system.',
    phases: [
      { name: 'Inhale', duration: 4, instruction: 'Breathe in quietly through your nose' },
      { name: 'Hold', duration: 7, instruction: 'Hold your breath' },
      { name: 'Exhale', duration: 8, instruction: 'Exhale completely through your mouth' },
    ],
    cycles: 4,
  },
};

// A-Game Words exercise content
export const A_GAME_WORDS_EXERCISE = {
  intro: {
    title: "Discover Your A-Game Words",
    description: `Your A-Game Words are the 5 words that describe you when you're absolutely at your best—in the zone, unstoppable.

These words become your mental anchor. Before any performance or high-pressure moment, you can use them to reconnect with your peak state.`,
  },
  steps: [
    {
      title: "Find Your Peak Memory",
      description: "Think of a specific time when you were at your absolute best. You were in the zone, unstoppable.",
      prompt: "Describe that moment. What were you doing? Where were you? What made it special?",
      example: "It could be a sports performance, a presentation, a creative breakthrough, or even a conversation where you felt completely yourself.",
    },
    {
      title: "Name the Feelings",
      description: "Close your eyes and go back to that moment.",
      prompt: "How did you FEEL? What words describe your state of mind and body?",
      example: "Words like: calm, present, free, sharp, confident, focused, alive, powerful, light, fearless...",
    },
    {
      title: "Choose Your 5 Words",
      description: "From everything you've written, select exactly 5 words that capture your A-Game state.",
      prompt: "These are YOUR A-Game Words. Choose the ones that resonate most deeply.",
    },
    {
      title: "Your A-Game Words",
      description: "These are your anchors. Before any performance, close your eyes and connect with each word.",
      celebration: "You just created your first Crowey Snax!",
    },
  ],
};

// To Be List exercise content
export const TO_BE_LIST_EXERCISE = {
  intro: {
    title: 'Create Your "To Be" List',
    description: `Most of us live by "To Do" lists—endless tasks that define our worth by what we accomplish.

Your "To Be" list is different. It defines who you want to BE, not what you want to DO. It's about showing up as the human you want to be.`,
  },
  steps: [
    {
      title: "Who Do You Want to Be?",
      description: "Think about the kind of human you want to be, not the things you want to achieve.",
      prompt: "List the qualities you want to embody. How do you want to show up in the world?",
      examples: ["Present", "Curious", "Kind", "Playful", "Brave", "Patient", "Generous", "Authentic", "Calm", "Joyful"],
    },
    {
      title: "In Your Key Relationships",
      description: "Think about your most important relationships—partner, family, friends, colleagues.",
      prompt: "How do you want to BE in these relationships? What qualities matter most?",
    },
    {
      title: "Your 'To Be' List",
      description: "Review your answers and create your personal 'To Be' list.",
      celebration: "This is your compass. Each morning, you can ask: 'Who will I BE today?'",
    },
  ],
};

// Acceptance & Control Lists exercise content
export const ACCEPTANCE_CONTROL_EXERCISE = {
  intro: {
    title: "Acceptance & Control Lists",
    description: `The Serenity Prayer asks for wisdom to know the difference between what we can change and what we cannot.

This exercise creates two clear lists: things to ACCEPT (and release) and things you can CONTROL (and act on).`,
  },
  steps: [
    {
      title: "Name the Situation",
      description: "Think about a situation that's causing you stress, anxiety, or pressure.",
      prompt: "What's the situation you're facing?",
    },
    {
      title: "The Uncontrollables",
      description: "List everything about this situation that you CANNOT control.",
      prompt: "What outcomes, opinions, circumstances, or events are outside your control?",
      examples: ["Other people's reactions", "The economy", "Past events", "The weather", "Others' opinions of you"],
    },
    {
      title: "The Controllables",
      description: "Now list everything you CAN control.",
      prompt: "What actions, attitudes, efforts, and choices are within your power?",
      examples: ["Your effort", "Your attitude", "How you prepare", "How you respond", "Your self-talk"],
    },
    {
      title: "Your Lists",
      description: "You now have two powerful tools.",
      celebration: "Accept and release what you can't control. Focus your energy on what you can.",
    },
  ],
};
