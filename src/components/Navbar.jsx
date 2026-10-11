import React from 'react';
import { 
  Flame, 
  Sparkles, 
  Play, 
  Map, 
  Code2, 
  Dna, 
  Mic, 
  GraduationCap, 
  Trophy, 
  Briefcase, 
  BookOpen, 
  LayoutDashboard,
  Languages,
  UserCheck,
  ShieldAlert
} from 'lucide-react';

export function Navbar({ 
  activeTab, 
  setActiveTab, 
  userRole, 
  setUserRole, 
  studentData, 
  languageMode, 
  setLanguageMode,
  onStartDemoWalkthrough
}) {
  return (
    <header className="navbar-container" style={{
      background: 'rgba(10, 12, 26, 0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(139, 92, 246, 0.2)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      padding: '12px 24px',
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px',
      }}>
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('landing')}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'var(--purple-cyan-grad)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px var(--primary-glow)',
          }}>
            <Code2 size={24} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ 
                fontFamily: 'var(--font-heading)', 
                fontWeight: 800, 
                fontSize: '1.25rem',
                letterSpacing: '-0.02em',
                color: '#ffffff'
              }}>
                CodeQuest <span className="gradient-text">360</span>
              </span>
              <span className="badge badge-purple" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                AI ADVENTURE
              </span>
            </div>
            <p style={{ fontSize: '0.74rem', color: 'var(--text-dim)', letterSpacing: '0.02em' }}>
              Don't just learn coding. Play your way to mastery.
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', overflowX: 'auto', padding: '4px 0' }}>
          {userRole === 'student' ? (
            <>
              <button 
                onClick={() => setActiveTab('dashboard')} 
                className={`btn btn-sm ${activeTab === 'dashboard' ? 'btn-neon' : 'btn-outline'}`}
              >
                <LayoutDashboard size={15} /> Dashboard
              </button>
              <button 
                onClick={() => setActiveTab('adventure-map')} 
                className={`btn btn-sm ${activeTab === 'adventure-map' ? 'btn-neon' : 'btn-outline'}`}
              >
                <Map size={15} /> Adventure Map
              </button>
              <button 
                onClick={() => setActiveTab('code-lab')} 
                className={`btn btn-sm ${activeTab === 'code-lab' ? 'btn-primary' : 'btn-outline'}`}
              >
                <Code2 size={15} /> Code Lab
              </button>
              <button 
                onClick={() => setActiveTab('coding-dna')} 
                className={`btn btn-sm ${activeTab === 'coding-dna' ? 'btn-neon' : 'btn-outline'}`}
              >
                <Dna size={15} /> Coding DNA
              </button>
              <button 
                onClick={() => setActiveTab('ai-viva')} 
                className={`btn btn-sm ${activeTab === 'ai-viva' ? 'btn-neon' : 'btn-outline'}`}
              >
                <Mic size={15} /> AI Viva
              </button>
              <button 
                onClick={() => setActiveTab('college-lab')} 
                className={`btn btn-sm ${activeTab === 'college-lab' ? 'btn-neon' : 'btn-outline'}`}
              >
                <GraduationCap size={15} /> College Lab
              </button>
              <button 
                onClick={() => setActiveTab('exam-mode')} 
                className={`btn btn-sm ${activeTab === 'exam-mode' ? 'btn-neon' : 'btn-outline'}`}
              >
                <ShieldAlert size={15} /> Exam
              </button>
              <button 
                onClick={() => setActiveTab('leaderboard')} 
                className={`btn btn-sm ${activeTab === 'leaderboard' ? 'btn-neon' : 'btn-outline'}`}
              >
                <Trophy size={15} /> Rank
              </button>
              <button 
                onClick={() => setActiveTab('career')} 
                className={`btn btn-sm ${activeTab === 'career' ? 'btn-neon' : 'btn-outline'}`}
              >
                <Briefcase size={15} /> Career
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => setActiveTab('teacher-dashboard')} 
                className={`btn btn-sm ${activeTab === 'teacher-dashboard' ? 'btn-primary' : 'btn-outline'}`}
              >
                <LayoutDashboard size={15} /> Command Center
              </button>
              <button 
                onClick={() => setActiveTab('college-lab')} 
                className={`btn btn-sm ${activeTab === 'college-lab' ? 'btn-neon' : 'btn-outline'}`}
              >
                <GraduationCap size={15} /> Lab Submissions
              </button>
              <button 
                onClick={() => setActiveTab('teacher-recommendations')} 
                className={`btn btn-sm ${activeTab === 'teacher-recommendations' ? 'btn-neon' : 'btn-outline'}`}
              >
                <Sparkles size={15} /> AI Recommendations
              </button>
            </>
          )}
        </nav>

        {/* Right Controls: Role Switcher, Tanglish toggle, Demo Walkthrough */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Quick Guided Demo Tour Button */}
          <button 
            onClick={onStartDemoWalkthrough}
            className="btn btn-sm btn-cyan pulsing-glow"
            title="Launch 2-3 minute guided product demonstration"
          >
            <Play size={14} fill="#ffffff" /> 2-Min Demo Tour
          </button>

          {/* Language / Tanglish Toggle */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            background: 'rgba(255, 255, 255, 0.05)', 
            border: '1px solid rgba(255, 255, 255, 0.1)', 
            borderRadius: 'var(--radius-md)',
            padding: '2px 4px'
          }}>
            <Languages size={14} color="var(--cyan-light)" style={{ marginLeft: '4px' }} />
            <select
              value={languageMode}
              onChange={(e) => setLanguageMode(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-main)',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-body)',
                padding: '4px 6px',
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              <option value="en" style={{ background: '#0f1225' }}>English</option>
              <option value="tanglish" style={{ background: '#0f1225' }}>Tanglish Mode 🚀</option>
              <option value="ta" style={{ background: '#0f1225' }}>தமிழ் (Tamil)</option>
            </select>
          </div>

          {/* Role Switcher */}
          <div style={{
            display: 'flex',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: 'var(--radius-md)',
            padding: '3px',
          }}>
            <button
              onClick={() => { setUserRole('student'); setActiveTab('dashboard'); }}
              style={{
                background: userRole === 'student' ? 'var(--primary)' : 'transparent',
                color: userRole === 'student' ? '#fff' : 'var(--text-muted)',
                border: 'none',
                padding: '4px 10px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.2s',
              }}
            >
              <UserCheck size={13} /> Student
            </button>
            <button
              onClick={() => { setUserRole('teacher'); setActiveTab('teacher-dashboard'); }}
              style={{
                background: userRole === 'teacher' ? 'var(--cyan)' : 'transparent',
                color: userRole === 'teacher' ? '#fff' : 'var(--text-muted)',
                border: 'none',
                padding: '4px 10px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.2s',
              }}
            >
              <GraduationCap size={13} /> Teacher
            </button>
          </div>

          {/* Student Status Quick Pill */}
          {userRole === 'student' && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px 10px',
              background: 'rgba(139, 92, 246, 0.1)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              borderRadius: 'var(--radius-full)',
            }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-light)' }}>
                Lv.{studentData.level}
              </span>
              <span style={{ color: 'var(--text-dim)' }}>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.8rem', color: 'var(--amber-light)', fontWeight: 600 }}>
                <Flame size={13} fill="currentColor" /> {studentData.streak}d
              </span>
              <span style={{ color: 'var(--text-dim)' }}>•</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--cyan-light)', fontWeight: 700 }}>
                {studentData.xp} XP
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
