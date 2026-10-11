/**
 * Teacher Command Center Data (Class 2A)
 */

export const INITIAL_TEACHER_DATA = {
  teacherName: 'Prof. Anitha Ramanathan',
  department: 'Department of Computer Science & Engineering',
  currentClass: 'Class 2A (Batch 2026)',
  totalStudents: 38,
  activeQuestsCount: 8,
  pendingLabReports: 6,
  averageClassXp: 1640,

  // Class Weakness Map
  classWeaknessMap: {
    loops: { name: 'Loops & Iterations', score: 88, status: 'Strong', color: '#10b981' },
    functions: { name: 'Functions & Modularity', score: 76, status: 'Proficient', color: '#06b6d4' },
    arrays: { name: 'Arrays & Slicing', score: 72, status: 'Proficient', color: '#3b82f6' },
    edgeCases: { name: 'Edge Cases & Guards', score: 49, status: 'Critical Weakness', color: '#f43f5e', alert: true },
    recursion: { name: 'Recursion & Call Stacks', score: 42, status: 'Critical Weakness', color: '#ec4899', alert: true },
  },

  // AI Teaching Recommendations
  recommendations: [
    {
      id: 'rec-1',
      title: '🚨 Boundary Condition Boss Battle Needed',
      trigger: '12 students are repeatedly failing boundary-condition and empty input tests.',
      recommendation: 'Create a 10-minute Boundary Condition Boss Battle.',
      actionLabel: 'Generate Remedial Quest',
      topic: 'Defensive Programming',
      type: 'remedial_quest',
      status: 'pending',
    },
    {
      id: 'rec-2',
      title: '🎤 Viva Articulation Gap Detected',
      trigger: '7 students can solve the code syntax but cannot explain invariants during AI Viva.',
      recommendation: 'Assign Explain-Your-Code Quest with oral defense.',
      actionLabel: 'Deploy Viva Assignment',
      topic: 'Technical Communication',
      type: 'viva_assignment',
      status: 'pending',
    },
    {
      id: 'rec-3',
      title: '📉 Call Stack Recursion Pitfalls',
      trigger: '18 students incurred stack overflow errors in Lab Experiment 5.',
      recommendation: 'Deploy visual call-stack trace practice with step-by-step memory visualization.',
      actionLabel: 'Assign Trace Mission',
      topic: 'Recursion Base Guards',
      type: 'trace_mission',
      status: 'pending',
    },
  ],

  // Lab Experiments
  labExperiments: [
    {
      id: 'lab-exp-4',
      title: 'Lab 4: Array Searching, Bounds & Invariants',
      deadline: 'Tomorrow, 5:00 PM',
      submissionsCount: 32,
      totalStudents: 38,
      status: 'In Progress',
      avgScore: '84%',
    },
    {
      id: 'lab-exp-3',
      title: 'Lab 3: Modular Matrix Multiplication',
      deadline: 'Completed',
      submissionsCount: 38,
      totalStudents: 38,
      status: 'Graded',
      avgScore: '89%',
    },
  ],

  // Detailed Student Submissions for Lab 4
  recentSubmissions: [
    {
      studentId: 'cs-04',
      studentName: 'Rivetha',
      experiment: 'Array Searching & Bounds',
      submittedAt: 'Today, 11:20 AM',
      correctness: '92%',
      testCases: '9/10 passed',
      codeQuality: '88%',
      understandingScore: '82%',
      vivaScore: '8/10',
      finalScore: '86%',
      weakness: 'Boundary Conditions (Empty array handled late)',
      recommendation: 'Practice Edge Cases in World 5',
      status: 'Verified',
    },
    {
      studentId: 'cs-01',
      studentName: 'Aarav Sharma',
      experiment: 'Array Searching & Bounds',
      submittedAt: 'Today, 10:45 AM',
      correctness: '88%',
      testCases: '8/10 passed',
      codeQuality: '85%',
      understandingScore: '79%',
      vivaScore: '7/10',
      finalScore: '81%',
      weakness: 'Off-by-one loop boundary',
      recommendation: 'Review Loop Invariants',
      status: 'Verified',
    },
    {
      studentId: 'cs-07',
      studentName: 'Kaviya Sundaram',
      experiment: 'Array Searching & Bounds',
      submittedAt: 'Today, 9:55 AM',
      correctness: '95%',
      testCases: '10/10 passed',
      codeQuality: '94%',
      understandingScore: '92%',
      vivaScore: '9/10',
      finalScore: '93%',
      weakness: 'Minor time complexity optimization',
      recommendation: 'Ready for World 6 Algorithm Castle',
      status: 'Verified',
    },
  ],
};
