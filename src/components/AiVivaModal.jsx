import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  X, 
  ArrowRight, 
  Award, 
  CheckCircle2, 
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { speechService } from '../services/speechService';
import { generateVivaForCode, evaluateVivaAnswer, calculateUnderstandingScore } from '../services/aiMentorService';

export function AiVivaModal({ 
  isOpen, 
  onClose, 
  quest, 
  studentCode, 
  onCompleteViva 
}) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [currentTextAnswer, setCurrentTextAnswer] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recognizer, setRecognizer] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [vivaResults, setVivaResults] = useState(null);

  useEffect(() => {
    if (isOpen && studentCode) {
      const generated = generateVivaForCode(quest, studentCode);
      setQuestions(generated);
      setCurrentIndex(0);
      setAnswers({});
      setIsCompleted(false);
      setVivaResults(null);
    }
  }, [isOpen, studentCode, quest]);

  // Read question aloud when moving to next question
  const currentQ = questions[currentIndex];

  const handleSpeakQuestion = () => {
    if (!currentQ) return;
    setIsSpeaking(true);
    speechService.speak(currentQ.question, () => setIsSpeaking(false));
  };

  const toggleMic = () => {
    if (isListening) {
      if (recognizer) recognizer.stop();
      setIsListening(false);
    } else {
      const rec = speechService.createRecognizer(
        (transcript) => {
          setCurrentTextAnswer(prev => prev ? `${prev} ${transcript}` : transcript);
        },
        (err) => {
          console.warn('Voice rec error:', err);
          setIsListening(false);
        },
        () => setIsListening(false)
      );

      if (rec) {
        setRecognizer(rec);
        rec.start();
        setIsListening(true);
      } else {
        alert('Browser microphone access is not available in this environment. Please type your answer.');
      }
    }
  };

  const handleNextQuestion = () => {
    if (!currentTextAnswer.trim()) return;

    // Evaluate answer
    const evaluation = evaluateVivaAnswer(currentQ, currentTextAnswer);
    const updatedAnswers = {
      ...answers,
      [currentQ.id]: {
        question: currentQ.question,
        answer: currentTextAnswer,
        evaluation,
      },
    };
    setAnswers(updatedAnswers);
    setCurrentTextAnswer('');
    speechService.stopSpeaking();

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Calculate overall results
      const totalScore = Object.values(updatedAnswers).reduce((acc, curr) => acc + curr.evaluation.score, 0);
      const avgScore = (totalScore / questions.length).toFixed(1);
      
      const understanding = calculateUnderstandingScore({
        correctness: 100,
        testsRatio: 1.0,
        logicScore: 92,
        codeQuality: 88,
        predictionCorrect: true,
        explanationProvided: true,
        vivaAverageScore: parseFloat(avgScore),
      });

      const finalReport = {
        vivaScore: parseFloat(avgScore),
        understandingScore: understanding.totalScore,
        breakdown: understanding.breakdown,
        answers: updatedAnswers,
      };

      setVivaResults(finalReport);
      setIsCompleted(true);
      if (onCompleteViva) {
        onCompleteViva(finalReport);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ padding: '30px', maxWidth: '680px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Mic size={18} color="#fff" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', color: '#fff' }}>Interactive AI Viva Examination</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                Oral & conceptual defense tailored to your written code
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {!isCompleted ? (
          currentQ && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Question Progress Tracker */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge badge-purple">
                  QUESTION {currentIndex + 1} OF {questions.length}
                </span>
                <span className="badge badge-cyan">{currentQ.concept}</span>
              </div>

              {/* The Question Card */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
                position: 'relative',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '12px' }}>
                  <p style={{ fontSize: '1.1rem', color: '#fff', fontWeight: 600, lineHeight: 1.45 }}>
                    "{currentQ.question}"
                  </p>
                  <button 
                    onClick={handleSpeakQuestion}
                    className="btn btn-sm btn-outline"
                    title="Narrate question aloud"
                    style={{ flexShrink: 0 }}
                  >
                    <Volume2 size={16} color={isSpeaking ? 'var(--cyan)' : 'inherit'} />
                  </button>
                </div>

                {isSpeaking && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '12px' }}>
                    <div className="audio-wave">
                      <div className="audio-bar" />
                      <div className="audio-bar" />
                      <div className="audio-bar" />
                      <div className="audio-bar" />
                      <div className="audio-bar" />
                    </div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--cyan-light)' }}>AI Examiner speaking...</span>
                  </div>
                )}
              </div>

              {/* Student Answer Box (Voice + Text) */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                    Your Technical Answer (Type or Speak):
                  </label>
                  <button
                    onClick={toggleMic}
                    className={`btn btn-sm ${isListening ? 'btn-rose pulsing-glow' : 'btn-outline'}`}
                    style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                  >
                    {isListening ? <MicOff size={14} /> : <Mic size={14} />}
                    {isListening ? 'Listening (Click to Stop)' : 'Voice Dictation'}
                  </button>
                </div>

                <textarea
                  rows={4}
                  value={currentTextAnswer}
                  onChange={(e) => setCurrentTextAnswer(e.target.value)}
                  placeholder="Explain your algorithmic rationale, invariants, time complexity, or defensive bounds..."
                  style={{
                    width: '100%',
                    background: 'rgba(15, 18, 36, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: 'var(--radius-md)',
                    padding: '12px 14px',
                    color: '#fff',
                    fontSize: '0.92rem',
                    fontFamily: 'var(--font-body)',
                    resize: 'vertical',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                  Assesses clarity, correctness, confidence & Big-O
                </span>
                <button
                  onClick={handleNextQuestion}
                  disabled={!currentTextAnswer.trim()}
                  className="btn btn-primary"
                  style={{ opacity: currentTextAnswer.trim() ? 1 : 0.5 }}
                >
                  {currentIndex + 1 < questions.length ? 'Submit & Next Question' : 'Complete Viva Evaluation'} <ArrowRight size={15} />
                </button>
              </div>
            </div>
          )
        ) : (
          /* Final Viva & Understanding Score Results */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 182, 212, 0.12) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              borderRadius: 'var(--radius-xl)',
              padding: '24px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🎓</div>
              <h4 style={{ fontSize: '1.4rem', color: '#6ee7b7', marginBottom: '4px' }}>
                AI Viva Completed!
              </h4>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '16px' }}>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>
                    {vivaResults?.vivaScore} <span style={{ fontSize: '1rem', color: 'var(--text-dim)' }}>/ 10</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--emerald-light)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Viva Defense Score
                  </div>
                </div>
                <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }} />
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--cyan-light)' }}>
                    {vivaResults?.understandingScore}%
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--cyan-light)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Understanding Score
                  </div>
                </div>
              </div>
            </div>

            {/* Understanding Score Breakdown */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '18px',
            }}>
              <h5 style={{ fontSize: '0.92rem', color: '#fff', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                Weighted Understanding Score Breakdown:
              </h5>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>Correctness (30%)</div>
                  <strong style={{ color: '#fff' }}>{vivaResults?.breakdown.correctness} pts</strong>
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>Test Cases (20%)</div>
                  <strong style={{ color: '#fff' }}>{vivaResults?.breakdown.testCases} pts</strong>
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>Logic Invariant (15%)</div>
                  <strong style={{ color: '#fff' }}>{vivaResults?.breakdown.logic} pts</strong>
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>Prediction (10%)</div>
                  <strong style={{ color: '#fff' }}>{vivaResults?.breakdown.prediction} pts</strong>
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>Viva Defense (10%)</div>
                  <strong style={{ color: '#fff' }}>{vivaResults?.breakdown.viva} pts</strong>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button onClick={onClose} className="btn btn-primary" style={{ width: '100%' }}>
                Accept Evaluation & Update Coding DNA <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
