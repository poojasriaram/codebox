import React, { useState, useEffect } from 'react';
import { ShieldAlert, Clock, AlertTriangle, EyeOff, Send, CheckCircle2, ArrowRight } from 'lucide-react';

export function ExamModeView({ onExitExam }) {
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes
  const [tabSwitchWarnings, setTabSwitchWarnings] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0 || isSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isSubmitted]);

  // Anti-cheating blur listener
  useEffect(() => {
    const handleBlur = () => {
      if (!isSubmitted) {
        setTabSwitchWarnings(prev => prev + 1);
      }
    };
    window.addEventListener('blur', handleBlur);
    return () => window.removeEventListener('blur', handleBlur);
  }, [isSubmitted]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Exam Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        padding: '20px 24px',
        background: 'rgba(239, 68, 68, 0.08)',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        borderRadius: 'var(--radius-xl)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ShieldAlert size={28} color="#ef4444" />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-rose">CONTROLLED EXAM MODE</span>
              <span className="badge badge-purple">MID-TERM LAB PRACTICAL</span>
            </div>
            <h2 style={{ fontSize: '1.3rem', color: '#fff', marginTop: '4px' }}>
              CS301: Data Structures & Defensive Programming
            </h2>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Active Timer */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            padding: '8px 16px',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <Clock size={16} color="#f87171" />
            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f87171', fontFamily: 'var(--font-code)' }}>
              {formatTime(timeLeft)}
            </span>
          </div>

          {/* Anti-cheat tab monitor */}
          <div style={{
            background: tabSwitchWarnings > 0 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.05)',
            padding: '8px 14px',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.82rem',
            color: tabSwitchWarnings > 0 ? '#fca5a5' : 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <EyeOff size={14} />
            Tab Focus Breaches: {tabSwitchWarnings} / 3 Max
          </div>
        </div>
      </div>

      {tabSwitchWarnings > 0 && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.15)',
          border: '1px solid #ef4444',
          borderRadius: 'var(--radius-md)',
          padding: '12px 18px',
          fontSize: '0.84rem',
          color: '#fca5a5',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          <AlertTriangle size={18} color="#ef4444" />
          <span>
            <strong>Anti-Cheating Security Alert:</strong> You navigated away from the exam window ({tabSwitchWarnings} times). This violation has been logged to Prof. Anitha's proctoring dashboard.
          </span>
        </div>
      )}

      {/* Exam Content */}
      {!isSubmitted ? (
        <div className="glass-card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span className="badge badge-cyan">QUESTION {currentQuestion} OF 3</span>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>
              AI Solution Assistant: <span style={{ color: '#ef4444' }}>LOCKED BY EXAMINER</span>
            </div>
          </div>

          <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '8px' }}>
            Problem 1: Robust Sliding Window Median with Empty Segment Recovery
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '20px' }}>
            Given a data stream array of length N and window size K, compute the rolling median. You MUST handle empty segments, negative values, and zero window sizes without triggering unhandled exceptions.
          </p>

          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '16px',
            fontFamily: 'var(--font-code)',
            fontSize: '0.84rem',
            color: '#cbd5e1',
            marginBottom: '24px',
          }}>
            <div style={{ color: '#64748b' }}># Proctored Exam Scratchpad</div>
            <div>def sliding_median_defensive(nums, k):</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;if not nums or k &lt;= 0: return []</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;# Implement O(N log K) two-heap solution below:</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;pass</div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
              Hidden test cases will be run upon final submission.
            </span>
            <button 
              onClick={() => setIsSubmitted(true)}
              className="btn btn-emerald"
            >
              <Send size={15} /> Finalize Exam Submission
            </button>
          </div>
        </div>
      ) : (
        /* Post-Exam Review Mode */
        <div className="glass-card" style={{ padding: '32px', textAlign: 'center' }}>
          <CheckCircle2 size={48} color="#10b981" style={{ margin: '0 auto 16px auto' }} />
          <h2 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '6px' }}>
            Exam Successfully Submitted
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '24px', maxWidth: '520px', margin: '0 auto 24px auto' }}>
            Your code has been securely evaluated against 12 hidden stress test cases. Post-exam AI analysis is now unlocked for review.
          </p>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
            <button onClick={onExitExam} className="btn btn-outline">
              Return to Student Dashboard
            </button>
            <button onClick={onExitExam} className="btn btn-primary">
              Review Mistakes with AI Coach <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
