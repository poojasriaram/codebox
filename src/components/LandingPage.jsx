import React from 'react';
import { 
  Play, 
  Sparkles, 
  ShieldAlert, 
  Terminal, 
  Dna, 
  Mic, 
  GraduationCap, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  Flame,
  Zap,
  Target,
  BrainCircuit,
  Bot
} from 'lucide-react';

export function LandingPage({ onStartQuest, onExploreDemo }) {
  const steps = [
    { num: 1, icon: '🎯', title: 'Accept Mission', desc: 'Pick real-world coding quests & boss battles.' },
    { num: 2, icon: '💻', title: 'Write Code', desc: 'Code in Python, C, C++, Java or JavaScript in Monaco.' },
    { num: 3, icon: '🔮', title: 'Predict Output', desc: 'Test your mental model before executing (+30 XP).' },
    { num: 4, icon: '🧪', title: 'Run Test Arena', desc: 'Face normal, boundary, edge and stress tests.' },
    { num: 5, icon: '🤖', title: 'Debug with AI', desc: 'Socratic 3-tier hints guide you without spoonfeeding.' },
    { num: 6, icon: '🧠', title: 'Explain Logic', desc: 'Articulate why your fix resolves root causes.' },
    { num: 7, icon: '🎤', title: 'Face AI Viva', desc: 'Defend your code in interactive audio viva examination.' },
    { num: 8, icon: '🏆', title: 'Earn XP & Level Up', desc: 'Unlock achievements, streaks and cyber badges.' },
    { num: 9, icon: '📈', title: 'Master Weak Skills', desc: 'System automatically personalizes practice missions.' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', padding: '20px 0 60px 0' }}>
      {/* Hero Section */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '40px',
        alignItems: 'center',
        padding: '30px 0',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-purple">
              <Zap size={13} /> NEXT-GEN AI CODING ADVENTURE
            </span>
            <span className="badge badge-cyan">
              <Flame size={13} /> COLLEGE LAB 2.0
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.6rem)', lineHeight: 1.15 }}>
            Turn every coding mistake into your <span className="gradient-text">next level.</span>
          </h1>

          <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '580px' }}>
            An AI-powered coding adventure that helps college students and interview prep coders write, debug, predict, explain, and master programming.
          </p>

          <p style={{ fontSize: '0.95rem', color: 'var(--cyan-light)', fontStyle: 'italic', fontWeight: 500 }}>
            "Every bug is a mission. Every mistake makes you stronger."
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', paddingTop: '10px' }}>
            <button onClick={onStartQuest} className="btn btn-lg btn-primary">
              <Zap size={18} /> Start Your Quest
            </button>
            <button onClick={onExploreDemo} className="btn btn-lg btn-cyan pulsing-glow">
              <Play size={18} fill="#ffffff" /> Explore 2-Min Demo
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', paddingTop: '10px' }}>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>7 Worlds</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>From Village to AI</div>
            </div>
            <div style={{ width: '1px', height: '30px', background: 'rgba(255,255,255,0.1)' }} />
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--cyan-light)' }}>Live Piston</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Isolated Sandboxes</div>
            </div>
            <div style={{ width: '1px', height: '30px', background: 'rgba(255,255,255,0.1)' }} />
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--emerald-light)' }}>AI Viva</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Oral Defense Engine</div>
            </div>
          </div>
        </div>

        {/* Hero Interactive Quest Preview Card */}
        <div className="glass-card glass-card-hover floating" style={{
          border: '1px solid rgba(6, 182, 212, 0.4)',
          boxShadow: '0 0 35px rgba(6, 182, 212, 0.25)',
          background: 'linear-gradient(145deg, rgba(16, 20, 48, 0.9) 0%, rgba(26, 18, 52, 0.9) 100%)',
          padding: '24px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-rose">🔥 WORLD 5 BOSS MISSION</span>
              <span className="badge badge-purple">+450 XP</span>
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontFamily: 'var(--font-code)' }}>
              find_minimum(arr)
            </span>
          </div>

          <h3 style={{ fontSize: '1.3rem', marginBottom: '8px', color: '#fff' }}>
            The Empty Array Monster
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            "You defeated normal inputs. But can you defeat the empty input?"
          </p>

          {/* Mini Code Terminal */}
          <div style={{
            background: '#090b16',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '14px',
            fontFamily: 'var(--font-code)',
            fontSize: '0.82rem',
            marginBottom: '16px',
            lineHeight: 1.5,
          }}>
            <div style={{ color: '#64748b' }}># Bug Hunt: Accessing arr[0] without guard</div>
            <div style={{ color: '#f43f5e' }}>- min_val = arr[0]  # Crashes on []</div>
            <div style={{ color: '#10b981' }}>+ if not arr: return None  # Defensive Guard!</div>
            <div style={{ color: '#38bdf8' }}>+ min_val = arr[0]</div>
          </div>

          {/* AI Mentor Clue Bubble */}
          <div style={{
            background: 'rgba(139, 92, 246, 0.12)',
            borderLeft: '3px solid var(--primary)',
            padding: '10px 14px',
            borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
            marginBottom: '16px',
            fontSize: '0.82rem',
            color: 'var(--text-main)',
          }}>
            <strong style={{ color: 'var(--primary-light)' }}>AI Mentor (Hint 1):</strong> "Look carefully at your entry conditions. Does your function check whether input exists?"
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-emerald">4/5 Passed</span>
              <span className="badge badge-rose">1 Edge Fail</span>
            </div>
            <button onClick={onStartQuest} className="btn btn-sm btn-primary">
              Defeat Monster <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* Philosophy / Central Differentiator: Why CodeQuest? */}
      <section style={{
        background: 'rgba(17, 21, 46, 0.6)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid rgba(139, 92, 246, 0.25)',
        padding: '40px 32px',
        position: 'relative',
      }}>
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 36px auto' }}>
          <span className="badge badge-cyan" style={{ marginBottom: '10px' }}>
            THE PARADIGM SHIFT
          </span>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '12px' }}>
            Why <span className="gradient-text">CodeQuest 360</span>?
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            The problem with traditional compilers is that students guess until tests turn green—without comprehending the underlying concept.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
        }}>
          {/* Traditional Way */}
          <div style={{
            background: 'rgba(239, 68, 68, 0.05)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <XCircle color="#ef4444" size={22} />
              <h3 style={{ fontSize: '1.15rem', color: '#fca5a5' }}>Traditional Coding Platforms</h3>
            </div>
            <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>
              "Does your code work?"
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Students copy snippets, guess and check, or rely on LLM solutions without building real mental models. When an interview or exam changes one parameter, they fail.
            </p>
            <div style={{ fontFamily: 'var(--font-code)', fontSize: '0.8rem', color: '#f87171' }}>
              CODE ➔ RUN ➔ RESULT
            </div>
          </div>

          {/* CodeQuest 360 Way */}
          <div style={{
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
            boxShadow: '0 0 25px rgba(16, 185, 129, 0.15)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <CheckCircle2 color="#10b981" size={22} />
              <h3 style={{ fontSize: '1.15rem', color: '#6ee7b7' }}>CodeQuest 360 Philosophy</h3>
            </div>
            <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>
              "Does your code work, and do YOU understand why?"
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Predict outputs, debug with Socratic AI mentors, defend invariants in oral AI Viva exams, and automatically track personalized Coding DNA strengths and weaknesses.
            </p>
            <div style={{ fontFamily: 'var(--font-code)', fontSize: '0.8rem', color: 'var(--cyan-light)', fontWeight: 600 }}>
              PLAY ➔ PREDICT ➔ CODE ➔ TEST ➔ DEBUG ➔ EXPLAIN ➔ VIVA ➔ LEVEL UP
            </div>
          </div>
        </div>
      </section>

      {/* How It Works: 9-Step Interactive Pathway */}
      <section>
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 40px auto' }}>
          <span className="badge badge-purple" style={{ marginBottom: '10px' }}>
            THE 9-STEP QUEST SYSTEM
          </span>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '12px' }}>
            How <span className="gradient-text">CodeQuest</span> Works
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>
            Every assignment is engineered as a game level that tests both syntax execution and conceptual defense.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '18px',
        }}>
          {steps.map((st) => (
            <div 
              key={st.num} 
              className="glass-card glass-card-hover"
              style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '1.8rem' }}>{st.icon}</span>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: 'var(--primary-light)',
                  background: 'rgba(139, 92, 246, 0.15)',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-full)',
                }}>
                  STEP {st.num}
                </span>
              </div>
              <h3 style={{ fontSize: '1.05rem', color: '#fff' }}>{st.title}</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{st.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Signature Pillars */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        <div className="glass-card glass-card-hover">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <Dna size={24} color="var(--primary-light)" />
            <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>Coding DNA Skill Graph</h3>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
            Dynamic skill bars for Loops, Functions, Arrays, Debugging, Edge Cases, and Recursion. Updates continuously as you test and defend your solutions.
          </p>
          <div className="badge badge-purple">Real Interactive Data</div>
        </div>

        <div className="glass-card glass-card-hover">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <Mic size={24} color="var(--cyan-light)" />
            <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>Interactive AI Viva</h3>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
            After code compiles, face voice or text viva questions tailored to YOUR actual code lines. Assesses conceptual grasp, complexity, and invariants.
          </p>
          <div className="badge badge-cyan">Web Speech Audio Enabled</div>
        </div>

        <div className="glass-card glass-card-hover">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <GraduationCap size={24} color="var(--emerald-light)" />
            <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>Teacher Command Center</h3>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
            Real-time class weakness heatmaps and an AI recommendation engine that generates remedial boss quests when students struggle with boundary errors.
          </p>
          <div className="badge badge-emerald">Class 2A Analytics</div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.25) 0%, rgba(6, 182, 212, 0.2) 100%)',
        border: '1px solid rgba(139, 92, 246, 0.4)',
        borderRadius: 'var(--radius-xl)',
        padding: '48px 32px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
      }}>
        <h2 style={{ fontSize: '2.2rem', color: '#fff' }}>
          Ready to turn bugs into your superpowers?
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', fontSize: '1.05rem' }}>
          Join Rivetha and thousands of college students leveling up their algorithmic intuition.
        </p>
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={onStartQuest} className="btn btn-lg btn-primary">
            Start Your Quest Now
          </button>
          <button onClick={onExploreDemo} className="btn btn-lg btn-outline">
            Launch 2-Min Demo Walkthrough
          </button>
        </div>
      </section>
    </div>
  );
}
