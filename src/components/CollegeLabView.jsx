import React, { useState } from 'react';
import { GraduationCap, CheckCircle2, Clock, FileText, Download, ArrowRight, ShieldCheck } from 'lucide-react';

export function CollegeLabView({ studentData, onOpenExperiment }) {
  const [activeReport, setActiveReport] = useState('lab-4');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span className="badge badge-purple">ACADEMIC LAB AUTOMATION</span>
          <span className="badge badge-emerald">SMART EVALUATION</span>
        </div>
        <h1 style={{ fontSize: '2.2rem', color: '#fff' }}>
          Smart <span className="gradient-text">Programming Lab</span> Mode
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Laboratory workflow with automated hidden test evaluation, Socratic hints, oral AI viva grading, and instant laboratory report generation.
        </p>
      </div>

      {/* Lab Report Display (Section 25) */}
      <div className="glass-card" style={{
        padding: '30px',
        border: '1px solid rgba(16, 185, 129, 0.35)',
        background: 'linear-gradient(145deg, rgba(16, 22, 44, 0.9) 0%, rgba(12, 28, 38, 0.9) 100%)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '24px' }}>
          <div>
            <span className="badge badge-cyan" style={{ marginBottom: '8px' }}>
              OFFICIAL LABORATORY ASSESSMENT SHEET
            </span>
            <h2 style={{ fontSize: '1.5rem', color: '#fff' }}>
              Experiment 4: Array Searching, Bounds & Invariants
            </h2>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-dim)', marginTop: '4px' }}>
              Department of Computer Science & Engineering • Verified by Prof. Anitha Ramanathan
            </div>
          </div>

          <div style={{
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            borderRadius: 'var(--radius-lg)',
            padding: '12px 24px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--emerald-light)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              FINAL COMPOSITE GRADE
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#10b981' }}>
              86% <span style={{ fontSize: '1rem', color: 'var(--text-dim)' }}>(Grade A)</span>
            </div>
          </div>
        </div>

        {/* Detailed Assessment Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '28px',
        }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>CANDIDATE</div>
            <strong style={{ color: '#fff', fontSize: '1.1rem' }}>Rivetha</strong>
            <div style={{ fontSize: '0.75rem', color: 'var(--cyan-light)' }}>Roll CS-2026-04</div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>SYNTAX CORRECTNESS</div>
            <strong style={{ color: '#10b981', fontSize: '1.1rem' }}>92%</strong>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Zero compiler faults</div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>AUTOMATED TEST CASES</div>
            <strong style={{ color: '#fff', fontSize: '1.1rem' }}>9 / 10 Passed</strong>
            <div style={{ fontSize: '0.75rem', color: 'var(--rose-light)' }}>1 Empty Array Fail</div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>CODE QUALITY & INVARIANTS</div>
            <strong style={{ color: '#38bdf8', fontSize: '1.1rem' }}>88%</strong>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Linear O(N) time</div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>UNDERSTANDING SCORE</div>
            <strong style={{ color: 'var(--primary-light)', fontSize: '1.1rem' }}>82%</strong>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Holistic comprehension</div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>ORAL AI VIVA DEFENSE</div>
            <strong style={{ color: '#fbbf24', fontSize: '1.1rem' }}>8 / 10</strong>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Voice defense verified</div>
          </div>
        </div>

        {/* Diagnosis & Pedagogical Recommendation */}
        <div style={{
          background: 'rgba(244, 63, 94, 0.08)',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          borderRadius: 'var(--radius-md)',
          padding: '16px 20px',
          marginBottom: '24px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <strong style={{ color: '#f43f5e', fontSize: '0.92rem' }}>Automatic Weakness Diagnostic:</strong>
            <span className="badge badge-rose">Boundary Conditions</span>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
            Candidate successfully traverses general arrays, but accesses index 0 before validating collection bounds when passed an empty list `[]`.
          </p>
          <div style={{ marginTop: '8px', fontSize: '0.82rem', color: 'var(--cyan-light)' }}>
            <strong>Recommendation:</strong> Complete World 5 Boss Mission ("The Empty Array Monster") to earn defensive guard mastery.
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button onClick={() => window.print()} className="btn btn-outline btn-sm">
            <Download size={15} /> Export Lab Report (PDF)
          </button>
          <button onClick={() => onOpenExperiment('empty-array-monster')} className="btn btn-primary btn-sm">
            Practice Recommended Remedial Mission <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
