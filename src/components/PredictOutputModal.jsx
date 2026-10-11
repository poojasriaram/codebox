import React, { useState } from 'react';
import { Sparkles, X, CheckCircle2, HelpCircle, ArrowRight } from 'lucide-react';

export function PredictOutputModal({ 
  isOpen, 
  onClose, 
  sampleInput = '[5, 2, 9, 1, 7]', 
  expectedOutput = '1',
  onConfirmPrediction 
}) {
  const [prediction, setPrediction] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanPred = prediction.trim();
    const cleanExp = expectedOutput.trim();
    const correct = cleanPred === cleanExp || cleanPred.toLowerCase() === cleanExp.toLowerCase();
    
    setIsCorrect(correct);
    setSubmitted(true);
    if (onConfirmPrediction) {
      onConfirmPrediction(correct, cleanPred);
    }
  };

  const handleProceedToRun = () => {
    setSubmitted(false);
    setPrediction('');
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.4rem' }}>🔮</span>
            <h3 style={{ fontSize: '1.25rem', color: '#fff' }}>Predict Before Run</h3>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.5 }}>
              Expert programmers form a mental model of execution <strong style={{ color: '#fff' }}>before</strong> pressing run.
              What will your code return for this input?
            </p>

            <div style={{
              background: '#0a0d1d',
              padding: '14px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              fontFamily: 'var(--font-code)',
              fontSize: '0.86rem',
            }}>
              <div style={{ color: 'var(--text-dim)', marginBottom: '4px' }}>// Input passed to find_minimum():</div>
              <div style={{ color: 'var(--cyan-light)', fontWeight: 600 }}>{sampleInput}</div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.84rem', color: '#fff', marginBottom: '6px', fontWeight: 600 }}>
                Your Output Prediction:
              </label>
              <input 
                type="text"
                value={prediction}
                onChange={(e) => setPrediction(e.target.value)}
                placeholder="e.g. 1, or None, or IndexError"
                required
                autoFocus
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(139, 92, 246, 0.4)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px 16px',
                  color: '#fff',
                  fontSize: '0.95rem',
                  fontFamily: 'var(--font-code)',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{
              background: 'rgba(6, 182, 212, 0.1)',
              border: '1px solid rgba(6, 182, 212, 0.25)',
              borderRadius: 'var(--radius-md)',
              padding: '10px 14px',
              fontSize: '0.8rem',
              color: 'var(--cyan-light)',
            }}>
              💡 <strong>Prediction Reward:</strong> Correct guess awards <strong>+30 XP</strong> and boosts your Coding DNA Intuition rating.
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button type="button" onClick={onClose} className="btn btn-outline btn-sm">
                Skip Prediction
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                Confirm & Lock Prediction
              </button>
            </div>
          </form>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {isCorrect ? (
              <div style={{
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '2.4rem', marginBottom: '8px' }}>🎯</div>
                <h4 style={{ fontSize: '1.25rem', color: '#6ee7b7', marginBottom: '6px' }}>
                  Spot-on Prediction! +30 XP
                </h4>
                <p style={{ color: 'var(--text-main)', fontSize: '0.88rem' }}>
                  Your mental simulation matched execution reality: <code style={{ color: '#6ee7b7' }}>{prediction}</code>.
                </p>
              </div>
            ) : (
              <div style={{
                background: 'rgba(245, 158, 11, 0.12)',
                border: '1px solid rgba(245, 158, 11, 0.35)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <HelpCircle color="#f59e0b" size={24} />
                  <h4 style={{ fontSize: '1.15rem', color: '#fcd34d' }}>
                    Prediction Divergence Detected
                  </h4>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', lineHeight: 1.5, marginBottom: '10px' }}>
                  You predicted <code>{prediction}</code>, but the invariant produces <code>{expectedOutput}</code>.
                </p>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-dim)', fontStyle: 'italic' }}>
                  "CodeQuest never punishes mistakes. Every unexpected result reveals a hidden assumption in your logic."
                </div>
              </div>
            )}

            <button onClick={handleProceedToRun} className="btn btn-cyan" style={{ width: '100%' }}>
              Run Code & Evaluate Tests <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
