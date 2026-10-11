/**
 * Demo Student Profile: Rivetha
 */

export const INITIAL_STUDENT_DATA = {
  name: 'Rivetha',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
  level: 6,
  levelTitle: 'Bug Hunter',
  xp: 1860,
  nextLevelXp: 2200,
  streak: 7,
  rank: 4,
  totalStudentsInClass: 38,
  globalRank: 42,
  completedQuestsCount: 19,
  weakestSkill: 'Edge Cases (49%)',
  dnaScore: 68, // composite overall

  // Coding DNA breakdown (Signature feature)
  skillsDNA: {
    loops: { name: 'Loops & Iterations', score: 91, color: '#10b981', testsTaken: 42, errorRate: '4%' },
    functions: { name: 'Functions & Modularity', score: 84, color: '#06b6d4', testsTaken: 36, errorRate: '7%' },
    arrays: { name: 'Arrays & Slicing', score: 72, color: '#3b82f6', testsTaken: 50, errorRate: '12%' },
    debugging: { name: 'Debugging & Diagnosis', score: 68, color: '#f59e0b', testsTaken: 28, errorRate: '16%' },
    edgeCases: { name: 'Edge Cases & Guards', score: 49, color: '#f43f5e', testsTaken: 33, errorRate: '38%', isWeakest: true },
    recursion: { name: 'Recursion & Call Stacks', score: 42, color: '#a855f7', testsTaken: 19, errorRate: '44%' },
  },

  // Error history log
  errorLog: [
    { id: 1, type: 'IndexError', desc: 'Attempted to read index 0 on empty array `[]`', date: 'Yesterday', quest: 'Empty Array Monster', resolved: false },
    { id: 2, type: 'OffByOne', desc: 'Loop ran `i <= len(arr)` instead of `<`', date: '2 days ago', quest: 'The Off-by-One Specter', resolved: true },
    { id: 3, type: 'NullPointer', desc: 'Missing null check before member access', date: '3 days ago', quest: 'The Matrix Transformer', resolved: true },
    { id: 4, type: 'StackOverflow', desc: 'Missing base condition for `n <= 0`', date: '5 days ago', quest: 'Recursion Castle', resolved: false },
  ],

  // Badges
  badges: [
    { id: 'b1', name: 'First Quest', icon: 'Medal', desc: 'Completed the maiden voyage in Code Village', unlocked: true, unlockedAt: 'Oct 1' },
    { id: 'b2', name: 'Bug Hunter', icon: 'Bug', desc: 'Crushed 10 runtime exceptions with AI Debug Coach', unlocked: true, unlockedAt: 'Oct 4' },
    { id: 'b3', name: 'Prediction Master', icon: 'Sparkles', desc: 'Correctly predicted output 15 times before running code', unlocked: true, unlockedAt: 'Oct 7' },
    { id: 'b4', name: 'Test Engineer', icon: 'ShieldCheck', desc: 'Executed over 50 automated boundary test suites', unlocked: true, unlockedAt: 'Oct 8' },
    { id: 'b5', name: 'Viva Champion', icon: 'Mic', desc: 'Achieved 8+ score in oral AI technical defense', unlocked: true, unlockedAt: 'Oct 9' },
    { id: 'b6', name: '7-Day Streak', icon: 'Flame', desc: 'Maintained uninterrupted daily coding quest streak', unlocked: true, unlockedAt: 'Oct 11' },
    { id: 'b7', name: 'Skill Master', icon: 'Dna', desc: 'Achieved 90%+ in at least one Coding DNA category', unlocked: true, unlockedAt: 'Oct 10' },
    { id: 'b8', name: 'Debugging Legend', icon: 'Trophy', desc: 'Defeat all 5 World Boss Monsters', unlocked: false, progress: '3/5 Bosses Defeated' },
  ],

  // Career match
  careerMatch: {
    recommendedRole: 'Backend Systems Developer',
    matchPercentage: 79,
    strengths: ['Loop Invariants', 'Array Manipulation', 'Modular Functions'],
    growthAreas: ['Defensive Boundary Handling', 'Recursive Call-Stack Analysis'],
    recommendedQuests: ['The Empty Array Monster', 'The Recursion Boss', 'Concurrency Lock Simulator'],
  },
};
