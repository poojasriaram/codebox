import React from 'react';
import { Briefcase, CheckCircle2, ArrowRight, Sparkles, TrendingUp, Cpu } from 'lucide-react';

export function CareerSkillView({ studentData, onStartQuest }) {
  const roles = [
    {
      id: 'backend',
      title: 'Backend Systems Developer',
      matchScore: 79,
      status: 'Primary Match',
      color: '#10b981',
      description: 'Design robust APIs, defensive database drivers, and invariant business logic.',
      matchingSkills: ['Loop Invariants (91%)', 'Modular Functions (84%)', 'Array Indexing (72%)'],
      growthSkills: ['Defensive Boundary Validation (49%)'],
      recommendedProject: 'The Empty Array Monster & Null Pointer Guard Suite',
    },
    {
      id: 'ai-engineer',
      title: 'AI / LLM Systems Engineer',
      matchScore: 71,
      status: 'High Potential',
      color: '#38bdf8',
      description: 'Prompt architecture, hallucination verification, and high-throughput vector pipelines.',
      matchingSkills: ['Function Modularity (84%)', 'Prediction Verification (78%)'],
      growthSkills: ['Call Stack Recursion (42%)'],
      recommendedProject: 'World 7 Neural Hallucination Sifter',
    },
    {
      id: 'algo',
      title: 'Competitive Programmer / Interview SDE',
      matchScore: 65,
      status: 'Developing',
      color: '#a855f7',
      description: 'Asymptotic optimization, dynamic programming, and binary search mastery.',
      matchingSkills: ['Loop Bounds (91%)', 'Array Processing (72%)'],
      growthSkills: ['Recursion Tree Invariants (42%)', 'Edge Case Stress Tests (49%)'],
      recommendedProject: 'The Recursion Boss & Matrix Transformer',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span className="badge badge-purple">CAREER TRAJECTORY</span>
          <span className="badge badge-cyan">INDUSTRY ALIGNMENT</span>
        </div>
        <h1 style={{ fontSize: '2.2rem', color: '#fff' }}>
          Career <span className="gradient-text">Skill Map</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Real-time mapping of your Coding DNA competencies to modern software engineering roles.
        </p>
      </div>

      {/* Featured Primary Career Banner */}
      <div className="glass-card" style={{
        padding: '28px',
        border: '1px solid rgba(16, 185, 129, 0.4)',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(6, 182, 212, 0.1) 100%)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span className="badge badge-emerald" style={{ marginBottom: '8px' }}>
              CURRENT #1 CAREER MATCH
            </span>
            <h2 style={{ fontSize: '1.6rem', color: '#fff' }}>
              Backend Systems Developer (79% Match)
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '4px', maxWidth: '600px' }}>
              Your strong mastery in Loops (91%) and Functions (84%) positions you well for junior backend engineering roles.
            </p>
          </div>

          <button 
            onClick={() => onStartQuest('empty-array-monster')}
            className="btn btn-emerald"
          >
            Bridge Defensive Guard Gap (+15% Match) <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* Roles Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px',
      }}>
        {roles.map((role) => (
          <div 
            key={role.id}
            className="glass-card glass-card-hover"
            style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span className="badge badge-purple">{role.status}</span>
                <strong style={{ fontSize: '1.25rem', color: role.color }}>
                  {role.matchScore}% Match
                </strong>
              </div>

              <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '8px' }}>
                {role.title}
              </h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '18px', lineHeight: 1.5 }}>
                {role.description}
              </p>

              <div style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '4px' }}>CURRENT STRENGTHS</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {role.matchingSkills.map((s, i) => (
                    <span key={i} className="badge badge-cyan" style={{ fontSize: '0.74rem' }}>
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '4px' }}>KEY GROWTH AREA</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {role.growthSkills.map((s, i) => (
                    <span key={i} className="badge badge-rose" style={{ fontSize: '0.74rem' }}>
                      ⚠️ {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={() => onStartQuest('empty-array-monster')}
              className="btn btn-sm btn-outline"
              style={{ width: '100%' }}
            >
              Start Recommended Quest <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
