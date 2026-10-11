import React, { useState } from 'react';
import { 
  Dna, 
  ShieldAlert, 
  TrendingUp, 
  History, 
  HelpCircle, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Zap,
  Target,
  BrainCircuit,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function CodingDnaView({ studentData, onStartQuest, onUpdateDna }) {
  const [activeStep, setActiveStep] = useState(1);
  const [reassessing, setReassessing] = useState(false);

  const skills = studentData.skillsDNA;
  const edgeCaseScore = skills.edgeCases.score;

  // Radar chart coordinates calculation
  const radarMetrics = [
    { label: 'Loops', value: skills.loops.score },
    { label: 'Functions', value: skills.functions.score },
    { label: 'Arrays', value: skills.arrays.score },
    { label: 'Debugging', value: skills.debugging.score },
    { label: 'Edge Cases', value: skills.edgeCases.score },
    { label: 'Recursion', value: skills.recursion.score },
  ];

  const size = 280;
  const center = size / 2;
  const radius = center - 40;
  const angleStep = (Math.PI * 2) / radarMetrics.length;

  const points = radarMetrics.map((m, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const r = (m.value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  const handleSimulateReassessment = () => {
    setReassessing(true);
    setTimeout(() => {
      setReassessing(false);
      const nextScore = edgeCaseScore < 60 ? 61 : 74;
      if (onUpdateDna) {
        onUpdateDna('edgeCases', nextScore);
      }
      confetti({ particleCount: 80, spread: 70 });
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span className="badge badge-purple">ALGORITHMIC GENOTYPE</span>
          <span className="badge badge-cyan">DYNAMIC ADAPTATION</span>
        </div>
        <h1 style={{ fontSize: '2.2rem', color: '#fff' }}>
          Coding <span className="gradient-text">DNA</span> Profile
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          A continuous biometric model of your computational intuition. Built on real test failures, hint reliance, oral defense, and output predictions.
        </p>
      </div>

      {/* Main Grid: Radar Skill Graph + Skill Progress Bars */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px',
        alignItems: 'start',
      }}>
        {/* Radar Visualization Card */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#fff' }}>Cognitive Skill Polygon</h3>
            <span className="badge badge-emerald">Composite {studentData.dnaScore}%</span>
          </div>

          <div style={{ position: 'relative', width: `${size}px`, height: `${size}px` }}>
            <svg width={size} height={size}>
              {/* Background Concentric Webs */}
              {[0.25, 0.5, 0.75, 1].map((scale, i) => (
                <circle
                  key={i}
                  cx={center}
                  cy={center}
                  r={radius * scale}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeDasharray="4 4"
                />
              ))}

              {/* Axis Lines */}
              {radarMetrics.map((_, i) => {
                const angle = i * angleStep - Math.PI / 2;
                const x = center + radius * Math.cos(angle);
                const y = center + radius * Math.sin(angle);
                return (
                  <line
                    key={i}
                    x1={center}
                    y1={center}
                    x2={x}
                    y2={y}
                    stroke="rgba(255, 255, 255, 0.12)"
                  />
                );
              })}

              {/* Data Polygon */}
              <polygon
                points={points}
                fill="rgba(139, 92, 246, 0.35)"
                stroke="#06b6d4"
                strokeWidth="2.5"
                style={{ filter: 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.5))' }}
              />

              {/* Node Dots & Labels */}
              {radarMetrics.map((m, i) => {
                const angle = i * angleStep - Math.PI / 2;
                const r = (m.value / 100) * radius;
                const x = center + r * Math.cos(angle);
                const y = center + r * Math.sin(angle);

                const labelX = center + (radius + 24) * Math.cos(angle);
                const labelY = center + (radius + 18) * Math.sin(angle);

                return (
                  <g key={i}>
                    <circle cx={x} cy={y} r="4" fill="#a78bfa" />
                    <text
                      x={labelX}
                      y={labelY}
                      textAnchor="middle"
                      fill={m.value < 55 ? '#f43f5e' : '#cbd5e1'}
                      fontSize="10"
                      fontWeight="600"
                      fontFamily="var(--font-heading)"
                    >
                      {m.label} ({m.value}%)
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textAlign: 'center', marginTop: '16px' }}>
            Data based on {studentData.completedQuestsCount} quests, 42 automated test runs, and 4 AI Viva defenses.
          </div>
        </div>

        {/* Detailed Metrics List */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '16px' }}>
            Competency Breakdown & Error Rates
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {Object.entries(skills).map(([key, item]) => (
              <div key={key}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <div>
                    <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.92rem' }}>{item.name}</span>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)', marginLeft: '8px' }}>
                      ({item.testsTaken} tests taken • {item.errorRate} error rate)
                    </span>
                  </div>
                  <strong style={{ color: item.score < 55 ? '#f43f5e' : (item.score > 80 ? '#10b981' : 'var(--cyan-light)') }}>
                    {item.score}%
                  </strong>
                </div>

                <div className="progress-container" style={{ height: '10px' }}>
                  <div
                    className="progress-fill"
                    style={{
                      width: `${item.score}%`,
                      background: item.score < 55 
                        ? 'linear-gradient(90deg, #e11d48, #f43f5e)' 
                        : (item.score > 80 ? 'linear-gradient(90deg, #059669, #10b981)' : 'var(--purple-cyan-grad)'),
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Personalized Weakness Detection & Remediation Engine (Section 15) */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(20, 24, 56, 0.9) 0%, rgba(35, 18, 40, 0.9) 100%)',
        border: '1px solid rgba(244, 63, 94, 0.4)',
        borderRadius: 'var(--radius-xl)',
        padding: '30px',
        boxShadow: '0 0 35px rgba(244, 63, 94, 0.15)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              background: 'rgba(244, 63, 94, 0.2)',
              padding: '10px',
              borderRadius: 'var(--radius-md)',
            }}>
              <ShieldAlert size={26} color="#f43f5e" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge badge-rose">DETECTED RECURRING WEAKNESS</span>
                <span className="badge badge-purple">AUTO-GENERATED CURRICULUM</span>
              </div>
              <h2 style={{ fontSize: '1.35rem', color: '#fff', marginTop: '4px' }}>
                Boundary Conditions & Defensive Guards
              </h2>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>TRAJECTORY</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
                <span style={{ color: '#f43f5e' }}>49%</span> ➔ <span style={{ color: 'var(--cyan-light)' }}>{edgeCaseScore}%</span> ➔ <span style={{ color: '#10b981' }}>74%</span>
              </div>
            </div>
          </div>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '24px', lineHeight: 1.5 }}>
          Our neural diagnostics analyzed your 4 recent runtime errors: you repeatedly access index 0 or execute loops without guarding against empty collections `[]` or null pointers. CodeQuest 360 generated a 6-step personalized recovery sequence:
        </p>

        {/* 6-Step Remediation Pathway */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '14px',
          marginBottom: '24px',
        }}>
          {[
            { step: 1, title: '1. 3-Min Concept', desc: 'Defensive guard fundamentals', status: 'Completed ✓' },
            { step: 2, title: '2. Easy Challenge', desc: 'Single element array validation', status: 'Completed ✓' },
            { step: 3, title: '3. Medium Challenge', desc: 'Off-by-one boundary check', status: 'Completed ✓' },
            { step: 4, title: '4. Boss Challenge', desc: 'The Empty Array Monster', status: edgeCaseScore > 50 ? 'Defeated ✓' : 'In Progress 🔥' },
            { step: 5, title: '5. AI Viva Defense', desc: 'Explain guard invariants', status: edgeCaseScore > 50 ? 'Passed (8.5/10)' : 'Pending' },
            { step: 6, title: '6. Reassessment', desc: 'Re-calibrate Coding DNA', status: edgeCaseScore >= 74 ? 'Mastered 74%' : 'Ready' },
          ].map((s) => (
            <div 
              key={s.step}
              style={{
                background: s.status.includes('✓') || s.status.includes('Passed') 
                  ? 'rgba(16, 185, 129, 0.12)' 
                  : (s.status.includes('In Progress') ? 'rgba(244, 63, 94, 0.15)' : 'rgba(255, 255, 255, 0.04)'),
                border: s.status.includes('In Progress') ? '1px solid #f43f5e' : '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 'var(--radius-md)',
                padding: '14px',
              }}
            >
              <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', marginBottom: '4px' }}>PHASE {s.step}</div>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>{s.title}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '8px' }}>{s.desc}</div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: s.status.includes('✓') ? '#6ee7b7' : (s.status.includes('🔥') ? '#fca5a5' : 'var(--cyan-light)') }}>
                {s.status}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '14px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => onStartQuest('empty-array-monster')} 
            className="btn btn-primary"
          >
            Launch Empty Array Monster <ArrowRight size={15} />
          </button>
          <button 
            onClick={handleSimulateReassessment} 
            disabled={reassessing}
            className="btn btn-emerald"
          >
            {reassessing ? 'Recalculating DNA...' : `Execute DNA Reassessment (${edgeCaseScore}% ➔ ${edgeCaseScore < 60 ? '61%' : '74%'})`}
          </button>
        </div>
      </div>
    </div>
  );
}
