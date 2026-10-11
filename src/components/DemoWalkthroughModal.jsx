import React, { useState } from 'react';
import { 
  Play, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  X, 
  Sparkles, 
  ShieldAlert, 
  Bug, 
  Mic, 
  Dna, 
  GraduationCap,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function DemoWalkthroughModal({ 
  isOpen, 
  onClose, 
  onNavigateTab, 
  onStartQuest, 
  setUserRole,
  onUpdateDna
}) {
  const [currentStep, setCurrentStep] = useState(0);

  const demoSteps = [
    {
      step: 1,
      title: '1. Open Student Adventure Map',
      narration: 'We begin on Rivetha\'s 7-world futuristic adventure map. Worlds 1 through 4 are cleared, and World 5 (Testing Arena) is active.',
      actionLabel: 'Go to Adventure Map',
      action: () => {
        setUserRole('student');
        onNavigateTab('adventure-map');
      },
    },
    {
      step: 2,
      title: '2. Select Boss Mission',
      narration: 'Rivetha enters World 5 Boss Mission: "The Empty Array Monster". Target: Defend against empty input lists that crash unguarded index 0 references.',
      actionLabel: 'Open Empty Array Monster',
      action: () => {
        onStartQuest('empty-array-monster');
      },
    },
    {
      step: 3,
      title: '3. Run Unchecked Code in Monaco',
      narration: 'The student runs starter code `min_val = arr[0]`. The isolated Piston Docker sandbox compiles the program.',
      actionLabel: 'Simulate Code Execution',
      action: () => {
        onNavigateTab('code-lab');
      },
    },
    {
      step: 4,
      title: '4. AI Detects Edge-Case Bug',
      narration: 'Normal tests pass, but Test 4 (Empty Array `[]`) crashes with `IndexError: list index out of range`. The Empty Array Monster strikes!',
      actionLabel: 'Inspect Bug Analysis',
      action: () => {
        onNavigateTab('code-lab');
      },
    },
    {
      step: 5,
      title: '5. Socratic AI Mentor Hint Request',
      narration: 'Student clicks "Hint". Notice that the AI does NOT immediately spoon-feed the code answer.',
      actionLabel: 'View Socratic Hint',
      action: () => {
        onNavigateTab('code-lab');
      },
    },
    {
      step: 6,
      title: '6. AI Gives Conceptual Clue (Level 1)',
      narration: '"Look carefully at your entry conditions. Does your function check whether input exists before index 0?"',
      actionLabel: 'Advance to Prediction',
      action: () => {},
    },
    {
      step: 7,
      title: '7. Predict Output (+30 XP)',
      narration: 'Before re-running, Rivetha predicts the return value for an empty list: "None". System awards +30 XP and boosts intuition score.',
      actionLabel: 'Record Prediction',
      action: () => {
        confetti({ particleCount: 30, spread: 50 });
      },
    },
    {
      step: 8,
      title: '8. Run Torture & Boundary Tests',
      narration: 'The AI Test Arena runs Normal, Boundary, Edge, and Stress suites to stress-test collection invariants.',
      actionLabel: 'Review Test Arena',
      action: () => {},
    },
    {
      step: 9,
      title: '9. Apply Defensive Guard Fix',
      narration: 'Student inserts the guard: `if not arr: return None`. All 5 test cases turn glowing green!',
      actionLabel: 'Apply Defensive Guard',
      action: () => {
        confetti({ particleCount: 50, spread: 60 });
      },
    },
    {
      step: 10,
      title: '10. Explain Why The Fix Works',
      narration: 'CodeQuest asks: "Why did adding a defensive return prevent runtime termination?" The student articulates defensive programming principles.',
      actionLabel: 'Proceed to Oral Defense',
      action: () => {},
    },
    {
      step: 11,
      title: '11. AI Viva Oral Examination',
      narration: 'The interactive AI Viva launches using speech synthesis & speech recognition. The AI evaluates conceptual grasp, Big-O, and confidence.',
      actionLabel: 'Inspect Viva Evaluation',
      action: () => {
        onNavigateTab('ai-viva');
      },
    },
    {
      step: 12,
      title: '12. Understanding Score Generated',
      narration: 'Understanding Score: 86%! Calculated from Correctness (30%), Tests (20%), Logic (15%), Prediction (10%), and Viva (10%).',
      actionLabel: 'View Understanding Score',
      action: () => {},
    },
    {
      step: 13,
      title: '13. Coding DNA Updates in Real-Time',
      narration: 'Rivetha\'s Coding DNA updates: Edge Cases improves from 49% ➔ 61%! The composite radar graph recalibrates automatically.',
      actionLabel: 'View Coding DNA Update',
      action: () => {
        if (onUpdateDna) onUpdateDna('edgeCases', 61);
        onNavigateTab('coding-dna');
        confetti({ particleCount: 70, spread: 70 });
      },
    },
    {
      step: 14,
      title: '14. Personalized Challenge Recommended',
      narration: 'System detects remaining room for growth and suggests a 10-minute follow-up: "The Single-Element Paradox".',
      actionLabel: 'Check Recommendation',
      action: () => {},
    },
    {
      step: 15,
      title: '15. Switch to Teacher Command Center',
      narration: 'Now we step into Prof. Anitha\'s shoes. Open the Teacher Command Center for Class 2A.',
      actionLabel: 'Open Teacher Command Center',
      action: () => {
        setUserRole('teacher');
        onNavigateTab('teacher-dashboard');
      },
    },
    {
      step: 16,
      title: '16. Class Weakness Heatmap Analysis',
      narration: 'The teacher immediately sees the class alert: "12 students are repeatedly failing boundary-condition and empty input tests."',
      actionLabel: 'Inspect Weakness Map',
      action: () => {
        setUserRole('teacher');
        onNavigateTab('teacher-dashboard');
      },
    },
    {
      step: 17,
      title: '17. One-Click Remedial Quest Generator',
      narration: 'Teacher clicks "Generate Remedial Quest". The AI instantly crafts and assigns a targeted 10-minute Boundary Condition Boss Battle to all 38 students!',
      actionLabel: 'Generate Remedial Quest',
      action: () => {
        setUserRole('teacher');
        onNavigateTab('teacher-dashboard');
        confetti({ particleCount: 120, spread: 100 });
      },
    },
  ];

  if (!isOpen) return null;

  const current = demoSteps[currentStep];

  const handleNext = () => {
    if (current.action) current.action();
    if (currentStep + 1 < demoSteps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 2000 }}>
      <div className="modal-content" style={{ maxWidth: '640px', padding: '30px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-cyan">2-MINUTE GUIDED TOUR</span>
            <span style={{ fontSize: '0.84rem', color: 'var(--text-dim)' }}>
              Step {current.step} / {demoSteps.length}
            </span>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="progress-container" style={{ marginBottom: '22px' }}>
          <div 
            className="progress-fill" 
            style={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }} 
          />
        </div>

        {/* Main Content */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          marginBottom: '24px',
        }}>
          <h3 style={{ fontSize: '1.35rem', color: '#fff', marginBottom: '12px' }}>
            {current.title}
          </h3>
          <p style={{ color: 'var(--text-main)', fontSize: '1rem', lineHeight: 1.6 }}>
            {current.narration}
          </p>
        </div>

        {currentStep === demoSteps.length - 1 && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)',
            border: '1px solid rgba(6, 182, 212, 0.4)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            marginBottom: '20px',
            fontStyle: 'italic',
            textAlign: 'center',
            color: '#fff',
            fontSize: '0.98rem',
            fontWeight: 600,
          }}>
            «"CodeQuest 360 doesn't just check whether students can code. It helps them become better programmers."»
          </div>
        )}

        {/* Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button 
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="btn btn-outline btn-sm"
            style={{ opacity: currentStep === 0 ? 0.4 : 1 }}
          >
            <ArrowLeft size={15} /> Previous
          </button>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => {
                if (current.action) current.action();
              }}
              className="btn btn-cyan btn-sm"
            >
              {current.actionLabel}
            </button>
            <button 
              onClick={handleNext}
              className="btn btn-primary btn-sm"
            >
              {currentStep + 1 < demoSteps.length ? 'Next Step' : 'Finish Tour'} <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
