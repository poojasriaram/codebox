/**
 * 7 Worlds and Quests for CodeQuest 360
 */

export const WORLDS_DATA = [
  {
    id: 1,
    name: 'World 1 — Code Village',
    subtitle: 'Foundations of the Cyber Realm',
    icon: 'Home',
    color: '#10b981',
    description: 'Master variables, basic input/output, and primary data structures.',
    topics: ['Variables', 'Data types', 'Input/output', 'Type casting'],
    unlocked: true,
    completed: true,
    questsCount: 4,
    completedQuests: 4,
    quests: [
      {
        id: 'w1-q1',
        title: 'The Echo Gateway',
        difficulty: 'Easy',
        xp: 80,
        time: '5 mins',
        topic: 'Input / Output',
        skills: ['Console IO', 'String Formatting'],
        isBoss: false,
        testCasesCount: 4,
      },
      {
        id: 'w1-q2',
        title: 'Cyber Currency Converter',
        difficulty: 'Easy',
        xp: 100,
        time: '8 mins',
        topic: 'Variables & Types',
        skills: ['Floats', 'Arithmetic'],
        isBoss: false,
        testCasesCount: 5,
      },
    ],
  },
  {
    id: 2,
    name: 'World 2 — Logic Forest',
    subtitle: 'The Branching Wilds',
    icon: 'TreePine',
    color: '#06b6d4',
    description: 'Navigate conditions, branching boolean operators, and iterative loops.',
    topics: ['If/else', 'Loops', 'Conditions', 'Logical Operators'],
    unlocked: true,
    completed: true,
    questsCount: 5,
    completedQuests: 5,
    quests: [
      {
        id: 'w2-q1',
        title: 'Sentinel of the Gate',
        difficulty: 'Easy',
        xp: 120,
        time: '10 mins',
        topic: 'Conditions',
        skills: ['Conditionals', 'Boolean Logic'],
        isBoss: false,
        testCasesCount: 6,
      },
      {
        id: 'w2-q2',
        title: 'The Eternal Loop of Chronos',
        difficulty: 'Medium',
        xp: 150,
        time: '12 mins',
        topic: 'Loops',
        skills: ['While Loops', 'Invariants'],
        isBoss: false,
        testCasesCount: 5,
      },
    ],
  },
  {
    id: 3,
    name: 'World 3 — Function City',
    subtitle: 'Modular Metropolis',
    icon: 'Building2',
    color: '#3b82f6',
    description: 'Construct reusable architectural modules, manage scope, and handle return values.',
    topics: ['Functions', 'Parameters', 'Return values', 'Scope'],
    unlocked: true,
    completed: true,
    questsCount: 4,
    completedQuests: 4,
    quests: [
      {
        id: 'w3-q1',
        title: 'The Matrix Transformer',
        difficulty: 'Medium',
        xp: 180,
        time: '15 mins',
        topic: 'Functions',
        skills: ['Parameters', 'Scope'],
        isBoss: false,
        testCasesCount: 6,
      },
    ],
  },
  {
    id: 4,
    name: 'World 4 — Bug Valley',
    subtitle: 'The Corrupted Swamps',
    icon: 'Bug',
    color: '#f59e0b',
    description: 'Hunt syntax flaws, resolve off-by-one indices, and conquer runtime anomalies.',
    topics: ['Syntax errors', 'Runtime errors', 'Logical errors', 'Debugging'],
    unlocked: true,
    completed: true,
    questsCount: 6,
    completedQuests: 5,
    quests: [
      {
        id: 'w4-q1',
        title: 'The Off-by-One Specter',
        difficulty: 'Medium',
        xp: 220,
        time: '12 mins',
        topic: 'Debugging',
        skills: ['Index Range', 'Loop Bounds'],
        isBoss: false,
        testCasesCount: 6,
      },
    ],
  },
  {
    id: 5,
    name: 'World 5 — Testing Arena',
    subtitle: 'Colosseum of Edge Cases',
    icon: 'ShieldAlert',
    color: '#8b5cf6',
    description: 'Subject code to rigorous torture tests, boundary constraints, and edge monsters.',
    topics: ['Test cases', 'Boundary conditions', 'Edge cases', 'Stress testing'],
    unlocked: true,
    completed: false,
    isCurrent: true,
    questsCount: 5,
    completedQuests: 2,
    quests: [
      {
        id: 'empty-array-monster',
        title: '🔥 The Empty Array Monster',
        difficulty: 'Hard (Boss)',
        xp: 450,
        time: '15 mins',
        topic: 'Edge Cases & Defensive Guards',
        skills: ['Boundary Conditions', 'Defensive Coding', 'Error Handling'],
        isBoss: true,
        testCasesCount: 5,
        description: 'You defeated normal inputs. But can you defeat the empty input? Guard against unchecked index 0 lookups.',
      },
      {
        id: 'w5-q2',
        title: 'The Single-Element Paradox',
        difficulty: 'Medium',
        xp: 240,
        time: '10 mins',
        topic: 'Boundary Conditions',
        skills: ['Single Element', 'Boundaries'],
        isBoss: false,
        testCasesCount: 5,
      },
    ],
  },
  {
    id: 6,
    name: 'World 6 — Algorithm Castle',
    subtitle: 'Citadel of Asymptotics',
    icon: 'Castle',
    color: '#ec4899',
    description: 'Master binary search, merge sort, call-stack recursion, and Big-O efficiency.',
    topics: ['Searching', 'Sorting', 'Recursion', 'Complexity'],
    unlocked: false,
    completed: false,
    questsCount: 6,
    completedQuests: 0,
    quests: [
      {
        id: 'recursion-boss',
        title: '👾 THE RECURSION BOSS',
        difficulty: 'Very Hard (Boss)',
        xp: 500,
        time: '20 mins',
        topic: 'Recursion Base Cases',
        skills: ['Call Stack', 'Base Case Validation', 'Depth Limit'],
        isBoss: true,
        testCasesCount: 7,
        description: 'A labyrinth of self-calling functions. Defeat the infinite call stack without exceeding recursion limits!',
      },
    ],
  },
  {
    id: 7,
    name: 'World 7 — AI Arena',
    subtitle: 'The Neural Nexus',
    icon: 'Bot',
    color: '#38bdf8',
    description: 'Harness AI copilots, audit hallucinations, verify generated proofs, and master prompt engineering.',
    topics: ['AI-assisted coding', 'Prompting', 'Code verification', 'AI hallucination detection'],
    unlocked: false,
    completed: false,
    questsCount: 4,
    completedQuests: 0,
    quests: [
      {
        id: 'w7-q1',
        title: 'Hallucination Sifter',
        difficulty: 'Expert',
        xp: 600,
        time: '25 mins',
        topic: 'AI Verification',
        skills: ['Hallucination Catching', 'Formal Verification'],
        isBoss: true,
        testCasesCount: 6,
      },
    ],
  },
];

/**
 * Detailed Quest Definitions
 */
export const QUEST_DETAILS = {
  'empty-array-monster': {
    id: 'empty-array-monster',
    title: '🔥 The Empty Array Monster',
    worldId: 5,
    worldName: 'World 5 — Testing Arena',
    isBoss: true,
    difficulty: 'Hard (Boss)',
    xp: 450,
    time: '15 mins',
    topic: 'Edge Cases & Defensive Guards',
    skills: ['Boundary Conditions', 'Defensive Coding', 'Error Handling'],
    description: 'You defeated normal inputs. But can you defeat the empty input?',
    storyline: 'The ancient Empty Array Monster feeds on programs that blindly assume lists are never empty! In this trial, implement `find_minimum(arr)` that returns the smallest integer in an array, OR returns `None` (or "None") if the input array is empty.',
    codeTemplates: {
      python: `# Quest: The Empty Array Monster
# Task: Return the minimum element, or None if the array is empty.

def find_minimum(arr):
    # DANGER: What happens if arr is empty []?
    min_val = arr[0]
    for num in arr[1:]:
        if num < min_val:
            min_val = num
    return min_val

# Test harness runner
import sys, json
input_data = sys.stdin.read().strip()
if input_data:
    try:
        parsed = json.loads(input_data)
        res = find_minimum(parsed)
        print(res)
    except:
        print("None")
else:
    print(find_minimum([5, 2, 9, 1, 7]))
`,
      javascript: `// Quest: The Empty Array Monster
// Task: Return the minimum element, or null/None if the array is empty.

function findMinimum(arr) {
  // DANGER: What happens if arr is empty []?
  let minVal = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < minVal) {
      minVal = arr[i];
    }
  }
  return minVal;
}

// Harness
const input = typeof input !== 'undefined' ? input : '[5, 2, 9, 1, 7]';
try {
  const parsed = JSON.parse(input);
  console.log(findMinimum(parsed));
} catch(e) {
  console.log("None");
}
`,
      cpp: `// Quest: The Empty Array Monster (C++)
#include <iostream>
#include <vector>
#include <optional>

std::optional<int> findMinimum(const std::vector<int>& arr) {
    if (arr.empty()) return std::nullopt;
    int minVal = arr[0];
    for (size_t i = 1; i < arr.size(); ++i) {
        if (arr[i] < minVal) minVal = arr[i];
    }
    return minVal;
}

int main() {
    std::cout << "1" << std::endl;
    return 0;
}
`,
      java: `// Quest: The Empty Array Monster (Java)
public class Main {
    public static Integer findMinimum(int[] arr) {
        if (arr == null || arr.length == 0) return null;
        int min = arr[0];
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] < min) min = arr[i];
        }
        return min;
    }

    public static void main(String[] args) {
        System.out.println(1);
    }
}
`,
      c: `// Quest: The Empty Array Monster (C)
#include <stdio.h>

int main() {
    printf("1\\n");
    return 0;
}
`
    },
    testCases: [
      {
        id: 'tc-1',
        name: 'Normal Case #1',
        type: 'normal',
        input: '[5, 2, 9, 1, 7]',
        expected: '1',
        description: 'Standard mixed positive integers',
      },
      {
        id: 'tc-2',
        name: 'Normal Case #2',
        type: 'normal',
        input: '[100, 45, 88, 12]',
        expected: '12',
        description: 'All values > 10',
      },
      {
        id: 'tc-3',
        name: 'Boundary: Single Element',
        type: 'boundary',
        input: '[42]',
        expected: '42',
        description: 'Array with exactly one element',
      },
      {
        id: 'tc-4',
        name: '⚠️ BOSS EDGE CASE: Empty Array',
        type: 'edge',
        input: '[]',
        expected: 'None',
        description: 'Zero elements! Crashes unguarded index 0 references.',
      },
      {
        id: 'tc-5',
        name: 'Stress Test: Large Array',
        type: 'stress',
        input: '[99, 88, 77, 66, 55, 44, 33, 22, 11, 5, 999]',
        expected: '5',
        description: 'Unsorted large sample',
      },
    ],
  },

  'recursion-boss': {
    id: 'recursion-boss',
    title: '👾 THE RECURSION BOSS',
    worldId: 6,
    worldName: 'World 6 — Algorithm Castle',
    isBoss: true,
    difficulty: 'Very Hard (Boss)',
    xp: 500,
    time: '20 mins',
    topic: 'Recursion Base Cases',
    skills: ['Call Stack', 'Base Case Validation', 'Depth Limit'],
    description: 'Solve the Staircase Problem recursively without stack overflow.',
    storyline: 'You stand at the summit of Algorithm Castle. The Recursion Boss fires infinite recursive calls. Implement memoized climb_stairs(n) that prevents exponential stack blowup.',
    codeTemplates: {
      python: `# Quest: The Recursion Boss
# Task: Compute distinct ways to climb n stairs taking 1 or 2 steps.
# Handle n=0, negative values, and prevent stack overflow.

def climb_stairs(n, memo={}):
    if n < 0:
        return 0
    if n == 0 or n == 1:
        return 1
    if n in memo:
        return memo[n]
    
    memo[n] = climb_stairs(n - 1, memo) + climb_stairs(n - 2, memo)
    return memo[n]

import sys
input_val = sys.stdin.read().strip()
n = int(input_val) if input_val else 4
print(climb_stairs(n))
`,
      javascript: `function climbStairs(n, memo = {}) {
  if (n < 0) return 0;
  if (n <= 1) return 1;
  if (memo[n]) return memo[n];
  memo[n] = climbStairs(n - 1, memo) + climbStairs(n - 2, memo);
  return memo[n];
}
console.log(climbStairs(4));
`,
    },
    testCases: [
      { id: 'rb-1', name: 'Base Step', type: 'normal', input: '1', expected: '1' },
      { id: 'rb-2', name: 'Four Steps', type: 'normal', input: '4', expected: '5' },
      { id: 'rb-3', name: 'Boundary: Zero Steps', type: 'boundary', input: '0', expected: '1' },
      { id: 'rb-4', name: 'Edge: Negative Steps', type: 'edge', input: '-3', expected: '0' },
      { id: 'rb-5', name: 'Stress: Deep Recursion (30)', type: 'stress', input: '30', expected: '1346269' },
    ],
  },

  'daily-quest': {
    id: 'daily-quest',
    title: '⚡ Daily CodeQuest: The Inverted String Siphon',
    worldId: 2,
    worldName: 'Daily Speed Challenge',
    isBoss: false,
    difficulty: '⭐⭐⭐ (Medium)',
    xp: 100,
    time: '5 mins',
    topic: 'String Manipulation & Slicing',
    skills: ['Two Pointers', 'String Slicing', 'Edge Cases'],
    description: 'Reverse words in a cyber transmission while maintaining punctuation order.',
    codeTemplates: {
      python: `# Daily CodeQuest: Reverse transmission words
def reverse_transmission(s):
    words = s.split()
    return " ".join(reversed(words))

import sys
inp = sys.stdin.read().strip() or "cyber world ready"
print(reverse_transmission(inp))
`,
      javascript: `function reverseTransmission(s) {
  return s.split(' ').reverse().join(' ');
}
console.log(reverseTransmission("cyber world ready"));
`,
    },
    testCases: [
      { id: 'dq-1', name: 'Normal', type: 'normal', input: 'hello world', expected: 'world hello' },
      { id: 'dq-2', name: 'Single Word', type: 'boundary', input: 'matrix', expected: 'matrix' },
      { id: 'dq-3', name: 'Empty Transmission', type: 'edge', input: '', expected: '' },
    ],
  },
};
