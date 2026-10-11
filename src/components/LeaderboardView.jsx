import React, { useState } from 'react';
import { Trophy, Medal, Flame, Sparkles, UserCheck } from 'lucide-react';

export function LeaderboardView({ currentStudent }) {
  const [scope, setScope] = useState('class'); // 'class' | 'public'

  const classLeaderboard = [
    { rank: 1, name: 'Kaviya Sundaram', level: 7, xp: 2150, streak: 12, title: 'Code Architect', badges: 9 },
    { rank: 2, name: 'Aarav Sharma', level: 7, xp: 2040, streak: 9, title: 'Algorithm Warrior', badges: 8 },
    { rank: 3, name: 'Sanjay Kumar', level: 6, xp: 1920, streak: 8, title: 'Debug Master', badges: 7 },
    { rank: 4, name: 'Rivetha (You)', level: 6, xp: 1860, streak: 7, title: 'Bug Hunter', badges: 7, isCurrent: true },
    { rank: 5, name: 'Sneha Patel', level: 6, xp: 1780, streak: 5, title: 'Bug Hunter', badges: 6 },
    { rank: 6, name: 'Vignesh Raj', level: 5, xp: 1610, streak: 4, title: 'Code Builder', badges: 5 },
  ];

  const publicLeaderboard = [
    { rank: 1, name: 'Alex Chen (MIT)', level: 10, xp: 5400, streak: 42, title: 'Supreme Architect', badges: 22 },
    { rank: 2, name: 'Priya N (IIT Madras)', level: 9, xp: 4850, streak: 35, title: 'Quantum Coder', badges: 19 },
    { rank: 3, name: 'Marcus V (Stanford)', level: 9, xp: 4720, streak: 28, title: 'Kernel Slayer', badges: 18 },
    { rank: 42, name: 'Rivetha (You)', level: 6, xp: 1860, streak: 7, title: 'Bug Hunter', badges: 7, isCurrent: true },
  ];

  const displayList = scope === 'class' ? classLeaderboard : publicLeaderboard;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-purple">COMMUNITY REPUTATION</span>
            <span className="badge badge-amber">WEEKLY RANKINGS</span>
          </div>
          <h1 style={{ fontSize: '2.2rem', color: '#fff' }}>
            Quest <span className="gradient-text">Leaderboard</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Celebrate mastery, consistency, and debug achievements. Rankings emphasize understanding over superficial speed.
          </p>
        </div>

        {/* Toggle Scope: Class vs Global */}
        <div style={{
          display: 'flex',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 'var(--radius-md)',
          padding: '4px',
        }}>
          <button
            onClick={() => setScope('class')}
            className={`btn btn-sm ${scope === 'class' ? 'btn-primary' : 'btn-outline'}`}
            style={{ border: 'none' }}
          >
            Class 2A Leaderboard
          </button>
          <button
            onClick={() => setScope('public')}
            className={`btn btn-sm ${scope === 'public' ? 'btn-cyan' : 'btn-outline'}`}
            style={{ border: 'none' }}
          >
            Global Collegiate Realm
          </button>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {displayList.map((entry) => (
            <div 
              key={entry.rank}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 20px',
                borderRadius: 'var(--radius-lg)',
                background: entry.isCurrent 
                  ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.25) 0%, rgba(6, 182, 212, 0.2) 100%)' 
                  : 'rgba(255, 255, 255, 0.02)',
                border: entry.isCurrent ? '1px solid var(--cyan)' : '1px solid rgba(255, 255, 255, 0.06)',
                boxShadow: entry.isCurrent ? '0 0 20px var(--cyan-glow)' : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: entry.rank === 1 ? '#fbbf24' : (entry.rank === 2 ? '#94a3b8' : (entry.rank === 3 ? '#d97706' : 'rgba(255,255,255,0.08)')),
                  color: entry.rank <= 3 ? '#0f172a' : '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                }}>
                  {entry.rank}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <strong style={{ color: '#fff', fontSize: '1rem' }}>{entry.name}</strong>
                    {entry.isCurrent && <span className="badge badge-cyan">YOU</span>}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                    Level {entry.level} • {entry.title}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.84rem', color: 'var(--amber-light)' }}>
                  <Flame size={14} fill="currentColor" /> {entry.streak}d streak
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary-light)' }}>
                  {entry.xp} <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>XP</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
