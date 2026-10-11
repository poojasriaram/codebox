import React from 'react';
import { 
  Flame, 
  Trophy, 
  Sparkles, 
  Target, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  Zap, 
  Play, 
  Dna,
  ShieldAlert,
  Clock,
  TrendingUp,
  BrainCircuit
} from 'lucide-react';

export function StudentDashboard({ 
  studentData, 
  onStartQuest, 
  onNavigateTab 
}) {
  const xpPercentage = Math.round((studentData.xp / studentData.nextLevelXp) * 100);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Welcome Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px',
        padding: '28px',
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.18) 0%, rgba(6, 182, 212, 0.12) 100%)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid rgba(139, 92, 246, 0.3)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <img 
            src={studentData.avatar} 
            alt={studentData.name}
            style={{
              width: '68px',
              height: '68px',
              borderRadius: 'var(--radius-full)',
              border: '2px solid var(--cyan)',
              boxShadow: '0 0 16px var(--cyan-glow)',
              objectFit: 'cover',
            }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <h1 style={{ fontSize: '1.8rem', color: '#fff' }}>
                Welcome back, {studentData.name} 👋
              </h1>
              <span className="badge badge-purple">
                Level {studentData.level} — {studentData.levelTitle}
              </span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Your next mission is waiting. The Empty Array Monster is destabilizing World 5.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={() => onStartQuest('empty-array-monster')} 
            className="btn btn-primary pulsing-glow"
          >
            <Play size={16} fill="#fff" /> Resume Boss Mission
          </button>
          <button 
            onClick={() => onNavigateTab('adventure-map')} 
            className="btn btn-outline"
          >
            View World Map <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '18px',
      }}>
        {/* XP & Level Card */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-dim)', fontWeight: 600 }}>XP PROGRESS</span>
            <span className="badge badge-cyan">{xpPercentage}%</span>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
            {studentData.xp} <span style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>/ {studentData.nextLevelXp}</span>
          </div>
          <div className="progress-container">
            <div className="progress-fill" style={{ width: `${xpPercentage}%` }} />
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', marginTop: '8px' }}>
            340 XP until Level 7 (Code Architect)
          </div>
        </div>

        {/* Streak */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-dim)', fontWeight: 600 }}>ACTIVE STREAK</span>
            <Flame size={18} color="#f59e0b" fill="#f59e0b" />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--amber-light)', marginBottom: '8px' }}>
            🔥 {studentData.streak} Days
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Uninterrupted problem solving streak!
          </div>
        </div>

        {/* Class Rank */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-dim)', fontWeight: 600 }}>CLASS 2A RANK</span>
            <Trophy size={18} color="#fbbf24" />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
            #{studentData.rank} <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>/ {studentData.totalStudentsInClass}</span>
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Top 10% in Class • Global Rank #{studentData.globalRank}
          </div>
        </div>

        {/* Quests Completed */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-dim)', fontWeight: 600 }}>QUESTS CONQUERED</span>
            <CheckCircle2 size={18} color="#10b981" />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--emerald-light)', marginBottom: '8px' }}>
            {studentData.completedQuestsCount} Quests
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            4 Bosses defeated across 5 Worlds
          </div>
        </div>
      </div>

      {/* Weakest Skill Alert Banner & Recommended Action */}
      <div style={{
        background: 'rgba(244, 63, 94, 0.09)',
        border: '1px solid rgba(244, 63, 94, 0.35)',
        borderRadius: 'var(--radius-lg)',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            background: 'rgba(244, 63, 94, 0.2)',
            padding: '12px',
            borderRadius: 'var(--radius-md)',
          }}>
            <ShieldAlert size={28} color="#f43f5e" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="badge badge-rose">DETECTED WEAKNESS</span>
              <strong style={{ color: '#fff' }}>Boundary Conditions & Defensive Guards (49%)</strong>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              You repeatedly pass normal test cases but encounter runtime index faults when input arrays or collections are empty.
            </p>
          </div>
        </div>

        <button 
          onClick={() => onStartQuest('empty-array-monster')}
          className="btn btn-rose"
          style={{ background: 'linear-gradient(135deg, #e11d48, #f43f5e)', color: '#fff' }}
        >
          Remediate Now (+450 XP) <ArrowRight size={15} />
        </button>
      </div>

      {/* Two Column Layout: Coding DNA Preview + Daily Challenge & Quests */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '24px',
      }}>
        {/* Coding DNA Summary Card */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Dna size={20} color="var(--primary-light)" />
              <h2 style={{ fontSize: '1.2rem', color: '#fff' }}>Coding DNA Profile</h2>
            </div>
            <button 
              onClick={() => onNavigateTab('coding-dna')} 
              className="btn btn-sm btn-outline"
            >
              Full DNA Graph <ArrowRight size={13} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {Object.entries(studentData.skillsDNA).map(([key, item]) => (
              <div key={key}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', marginBottom: '6px' }}>
                  <span style={{ color: '#fff', fontWeight: 500 }}>{item.name}</span>
                  <span style={{ color: item.color, fontWeight: 700 }}>
                    {item.score}% {item.isWeakest && <span style={{ color: '#f43f5e', fontSize: '0.75rem' }}>(Needs Practice)</span>}
                  </span>
                </div>
                <div className="progress-container">
                  <div 
                    className="progress-fill" 
                    style={{ 
                      width: `${item.score}%`, 
                      background: item.score < 50 ? 'linear-gradient(90deg, #e11d48, #f43f5e)' : (item.score > 80 ? 'linear-gradient(90deg, #059669, #10b981)' : 'var(--purple-cyan-grad)') 
                    }} 
                  />
                </div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: '20px',
            padding: '12px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
          }}>
            <span>Composite DNA Mastery</span>
            <strong style={{ color: 'var(--cyan-light)', fontSize: '0.95rem' }}>{studentData.dnaScore}%</strong>
          </div>
        </div>

        {/* Daily Challenge & Active Boss Quest */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Daily CodeQuest Card */}
          <div className="glass-card glass-card-cyan" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span className="badge badge-amber">
                <Zap size={12} /> ⚡ DAILY CODEQUEST
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={13} /> 5 min challenge
              </span>
            </div>

            <h3 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '8px' }}>
              The Inverted String Siphon
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Reverse words in an encrypted transmission while preserving boundary characters. Complete to keep your 7-day streak alive!
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="badge badge-purple">+100 XP & 🔥 Streak</span>
              <button onClick={() => onStartQuest('daily-quest')} className="btn btn-sm btn-cyan">
                Accept Daily Challenge
              </button>
            </div>
          </div>

          {/* Featured Boss Mission */}
          <div className="glass-card" style={{
            background: 'linear-gradient(135deg, rgba(20, 16, 45, 0.85) 0%, rgba(35, 15, 30, 0.85) 100%)',
            border: '1px solid rgba(244, 63, 94, 0.4)',
            padding: '22px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span className="badge badge-rose">🔥 WORLD 5 BOSS BATTLE</span>
              <span className="badge badge-purple">+450 XP REWARD</span>
            </div>

            <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '8px' }}>
              The Empty Array Monster
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              "You defeated normal inputs. But can you defeat the empty input?"
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--cyan-light)' }}>
                Targeting your weakest skill
              </span>
              <button onClick={() => onStartQuest('empty-array-monster')} className="btn btn-sm btn-primary">
                Face Boss <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
