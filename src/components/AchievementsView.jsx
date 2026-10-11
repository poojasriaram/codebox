import React from 'react';
import { 
  Trophy, 
  Medal, 
  Bug, 
  Sparkles, 
  ShieldCheck, 
  Mic, 
  Flame, 
  Dna, 
  Lock, 
  CheckCircle2,
  Award,
  Zap
} from 'lucide-react';

export function AchievementsView({ studentData }) {
  const getBadgeIcon = (iconName) => {
    switch (iconName) {
      case 'Medal': return <Medal size={24} color="#fbbf24" />;
      case 'Bug': return <Bug size={24} color="#f43f5e" />;
      case 'Sparkles': return <Sparkles size={24} color="#38bdf8" />;
      case 'ShieldCheck': return <ShieldCheck size={24} color="#10b981" />;
      case 'Mic': return <Mic size={24} color="#a855f7" />;
      case 'Flame': return <Flame size={24} color="#f59e0b" fill="#f59e0b" />;
      case 'Dna': return <Dna size={24} color="#06b6d4" />;
      case 'Trophy': return <Trophy size={24} color="#ec4899" />;
      default: return <Award size={24} color="#fff" />;
    }
  };

  const levelTiers = [
    { level: 1, title: 'Code Rookie', minXp: 0, current: false },
    { level: 2, title: 'Logic Learner', minXp: 300, current: false },
    { level: 3, title: 'Code Builder', minXp: 700, current: false },
    { level: 4, title: 'Bug Hunter', minXp: 1200, current: false },
    { level: 5, title: 'Debug Master', minXp: 1500, current: false },
    { level: 6, title: 'Algorithm Warrior', minXp: 1800, current: true },
    { level: 7, title: 'AI Collaborator', minXp: 2200, current: false },
    { level: 8, title: 'Code Architect', minXp: 2800, current: false },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span className="badge badge-purple">HALL OF ACHIEVEMENTS</span>
          <span className="badge badge-amber">7 / 8 UNLOCKED</span>
        </div>
        <h1 style={{ fontSize: '2.2rem', color: '#fff' }}>
          Badges & <span className="gradient-text">Level Hierarchy</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Earn badges by demonstrating authentic programming discipline: output prediction, oral defense, and root-cause debugging.
        </p>
      </div>

      {/* Level Hierarchy Ladder */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '16px' }}>
          Mastery Ladder Progression
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '12px',
        }}>
          {levelTiers.map((t) => (
            <div 
              key={t.level}
              style={{
                padding: '14px',
                borderRadius: 'var(--radius-md)',
                background: t.current 
                  ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(6, 182, 212, 0.25) 100%)' 
                  : (studentData.level > t.level ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.02)'),
                border: t.current ? '2px solid var(--cyan)' : (studentData.level > t.level ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(255, 255, 255, 0.06)'),
                textAlign: 'center',
                boxShadow: t.current ? '0 0 15px var(--cyan-glow)' : 'none',
              }}
            >
              <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', marginBottom: '4px' }}>
                LV.{t.level}
              </div>
              <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
                {t.title}
              </div>
              <div style={{ fontSize: '0.72rem', color: t.current ? 'var(--cyan-light)' : 'var(--text-dim)' }}>
                {t.current ? 'ACTIVE' : (studentData.level > t.level ? 'PASSED ✓' : `${t.minXp} XP`)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges Gallery */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
      }}>
        {studentData.badges.map((badge) => (
          <div 
            key={badge.id}
            className="glass-card glass-card-hover"
            style={{
              padding: '22px',
              display: 'flex',
              alignItems: 'start',
              gap: '16px',
              opacity: badge.unlocked ? 1 : 0.65,
            }}
          >
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '16px',
              background: badge.unlocked ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0,0,0,0.4)',
              border: badge.unlocked ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(255, 255, 255, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              {badge.unlocked ? getBadgeIcon(badge.icon) : <Lock size={22} color="#64748b" />}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <h4 style={{ fontSize: '1.05rem', color: '#fff' }}>{badge.name}</h4>
                {badge.unlocked ? (
                  <span className="badge badge-emerald" style={{ fontSize: '0.68rem', padding: '2px 6px' }}>UNLOCKED</span>
                ) : (
                  <span className="badge badge-rose" style={{ fontSize: '0.68rem', padding: '2px 6px' }}>LOCKED</span>
                )}
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '8px', lineHeight: 1.45 }}>
                {badge.desc}
              </p>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>
                {badge.unlocked ? `Unlocked on ${badge.unlockedAt}` : badge.progress}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
