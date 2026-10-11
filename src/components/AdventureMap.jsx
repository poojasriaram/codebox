import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  Zap, 
  ArrowRight, 
  Flame, 
  ShieldAlert, 
  Home, 
  TreePine, 
  Building2, 
  Bug, 
  Castle, 
  Bot,
  Play,
  Clock,
  Layers
} from 'lucide-react';
import { WORLDS_DATA } from '../data/questData';

export function AdventureMap({ onSelectQuest }) {
  const [selectedWorld, setSelectedWorld] = useState(WORLDS_DATA[4]); // Default to World 5 (Testing Arena)

  const getIcon = (iconName) => {
    switch(iconName) {
      case 'Home': return <Home size={22} />;
      case 'TreePine': return <TreePine size={22} />;
      case 'Building2': return <Building2 size={22} />;
      case 'Bug': return <Bug size={22} />;
      case 'ShieldAlert': return <ShieldAlert size={22} />;
      case 'Castle': return <Castle size={22} />;
      case 'Bot': return <Bot size={22} />;
      default: return <Layers size={22} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-purple">CYBER LEARNING PATHWAY</span>
            <span className="badge badge-cyan">WORLD 5 ACTIVE</span>
          </div>
          <h1 style={{ fontSize: '2.2rem', color: '#fff' }}>
            Coding <span className="gradient-text">Adventure Map</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Progress from Code Village foundations to the high-stakes Neural AI Arena. Defeat bosses to unlock new worlds.
          </p>
        </div>

        <div style={{
          display: 'flex',
          gap: '16px',
          padding: '12px 20px',
          background: 'rgba(255, 255, 255, 0.04)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
            <span>Completed (4)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#06b6d4', boxShadow: '0 0 8px #06b6d4' }} />
            <span>Current Arena (1)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#64748b' }} />
            <span>Locked (2)</span>
          </div>
        </div>
      </div>

      {/* Visual Map Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '32px',
        alignItems: 'start',
      }}>
        {/* World Nodes Path */}
        <div style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
        }}>
          {WORLDS_DATA.map((world, idx) => {
            const isSelected = selectedWorld?.id === world.id;
            let nodeStyle = {
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '16px 20px',
              borderRadius: 'var(--radius-xl)',
              cursor: world.unlocked ? 'pointer' : 'not-allowed',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
            };

            if (world.completed) {
              nodeStyle = {
                ...nodeStyle,
                background: isSelected ? 'rgba(16, 185, 129, 0.22)' : 'rgba(16, 185, 129, 0.08)',
                border: isSelected ? '2px solid #10b981' : '1px solid rgba(16, 185, 129, 0.3)',
                boxShadow: isSelected ? '0 0 25px rgba(16, 185, 129, 0.35)' : 'none',
              };
            } else if (world.isCurrent) {
              nodeStyle = {
                ...nodeStyle,
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.25) 0%, rgba(6, 182, 212, 0.2) 100%)',
                border: '2px solid var(--cyan)',
                boxShadow: '0 0 30px var(--cyan-glow), 0 0 15px var(--primary-glow)',
                transform: isSelected ? 'scale(1.02)' : 'scale(1)',
              };
            } else {
              nodeStyle = {
                ...nodeStyle,
                background: 'rgba(15, 18, 36, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                opacity: 0.65,
              };
            }

            return (
              <div 
                key={world.id}
                onClick={() => world.unlocked && setSelectedWorld(world)}
                style={nodeStyle}
              >
                {/* Node Status Indicator */}
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: world.completed 
                    ? 'linear-gradient(135deg, #059669, #10b981)' 
                    : (world.isCurrent ? 'var(--purple-cyan-grad)' : 'rgba(255,255,255,0.06)'),
                  color: '#fff',
                  boxShadow: world.isCurrent ? '0 0 15px var(--cyan-glow)' : 'none',
                  flexShrink: 0,
                }}>
                  {world.completed ? (
                    <CheckCircle2 size={24} />
                  ) : (world.isCurrent ? (
                    getIcon(world.icon)
                  ) : (
                    <Lock size={20} color="#64748b" />
                  ))}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                    <h3 style={{ fontSize: '1.05rem', color: world.unlocked ? '#fff' : 'var(--text-dim)' }}>
                      {world.name}
                    </h3>
                    {world.isCurrent && (
                      <span className="badge badge-cyan" style={{ fontSize: '0.65rem', padding: '2px 6px' }}>
                        CURRENT STAGE
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {world.subtitle} • {world.completedQuests}/{world.questsCount} Quests
                  </div>
                </div>

                {world.unlocked && (
                  <ArrowRight size={18} color={isSelected ? 'var(--cyan-light)' : 'var(--text-dim)'} />
                )}
              </div>
            );
          })}
        </div>

        {/* Selected World Details & Quests List Panel */}
        {selectedWorld && (
          <div className="glass-card" style={{
            position: 'sticky',
            top: '90px',
            border: selectedWorld.isCurrent ? '1px solid rgba(6, 182, 212, 0.4)' : 'var(--neon-border)',
            boxShadow: selectedWorld.isCurrent ? '0 0 30px rgba(6, 182, 212, 0.2)' : 'var(--shadow-md)',
            padding: '28px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span className="badge badge-purple">
                {selectedWorld.completed ? 'WORLD COMPLETED ✓' : 'ACTIVE SECTOR'}
              </span>
              <span style={{ fontSize: '0.84rem', color: 'var(--text-dim)' }}>
                Sector {selectedWorld.id} / 7
              </span>
            </div>

            <h2 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '6px' }}>
              {selectedWorld.name}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '18px', lineHeight: 1.5 }}>
              {selectedWorld.description}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
              {selectedWorld.topics.map((t, idx) => (
                <span key={idx} style={{
                  fontSize: '0.76rem',
                  padding: '3px 8px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--cyan-light)',
                }}>
                  #{t}
                </span>
              ))}
            </div>

            <h4 style={{ fontSize: '0.95rem', color: '#fff', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Available Quests in Sector:
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {selectedWorld.quests.map((q) => (
                <div 
                  key={q.id}
                  style={{
                    background: q.isBoss ? 'rgba(244, 63, 94, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                    border: q.isBoss ? '1px solid rgba(244, 63, 94, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: 'var(--radius-md)',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {q.isBoss ? (
                        <span className="badge badge-rose">🔥 BOSS MISSION</span>
                      ) : (
                        <span className="badge badge-cyan">{q.difficulty}</span>
                      )}
                      <span className="badge badge-purple">+{q.xp} XP</span>
                    </div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} /> {q.time}
                    </span>
                  </div>

                  <div>
                    <h5 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: '4px' }}>
                      {q.title}
                    </h5>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      {q.description || `Skills tested: ${q.skills.join(', ')}`}
                    </p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '4px' }}>
                    <span style={{ fontSize: '0.76rem', color: 'var(--cyan-light)' }}>
                      {q.testCasesCount} Test Cases (Normal, Boundary, Edge)
                    </span>
                    <button 
                      onClick={() => onSelectQuest(q.id)}
                      className={`btn btn-sm ${q.isBoss ? 'btn-primary pulsing-glow' : 'btn-outline'}`}
                    >
                      <Play size={13} fill="currentColor" /> Start Quest
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
