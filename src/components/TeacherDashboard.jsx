import React, { useState } from 'react';
import { 
  GraduationCap, 
  Users, 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight, 
  Plus, 
  FileText, 
  Flame, 
  AlertTriangle,
  Zap,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function TeacherDashboard({ teacherData, onGenerateRemedialQuest }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'create' | 'submissions'
  const [recommendations, setRecommendations] = useState(teacherData.recommendations);
  const [createdQuestToast, setCreatedQuestToast] = useState(null);

  // New Quest Creator Form State
  const [newQuest, setNewQuest] = useState({
    title: 'Boundary Armor: The Null Shield',
    difficulty: 'Medium',
    language: 'python',
    topic: 'Defensive Guards',
    deadline: 'Friday, 11:59 PM',
    testCases: '[1, 2, 3] -> 1\n[] -> None',
    hiddenCases: '[-999] -> -999\n[0, 0, 0] -> 0',
    vivaPrompt: 'Explain how you handled the boundary condition without crashing.',
  });

  const handleApplyRecommendation = (recId) => {
    setRecommendations(prev => prev.map(r => r.id === recId ? { ...r, status: 'deployed' } : r));
    setCreatedQuestToast('Remedial Quest Successfully Deployed to Class 2A Curriculum!');
    confetti({ particleCount: 70, spread: 60 });
    if (onGenerateRemedialQuest) {
      onGenerateRemedialQuest();
    }
  };

  const handleCreateQuestSubmit = (e) => {
    e.preventDefault();
    setCreatedQuestToast(`Quest "${newQuest.title}" deployed to all 38 students in Class 2A!`);
    confetti({ particleCount: 80, spread: 70 });
    setActiveTab('overview');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Toast Alert */}
      {createdQuestToast && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          borderRadius: 'var(--radius-lg)',
          padding: '14px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#fff',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CheckCircle2 color="#10b981" size={20} />
            <strong>{createdQuestToast}</strong>
          </div>
          <button 
            onClick={() => setCreatedQuestToast(null)} 
            style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px',
        padding: '28px',
        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(59, 130, 246, 0.12) 100%)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid rgba(6, 182, 212, 0.3)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '16px',
            background: 'var(--purple-cyan-grad)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px var(--cyan-glow)',
          }}>
            <GraduationCap size={32} color="#fff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <h1 style={{ fontSize: '1.8rem', color: '#fff' }}>
                Teacher Command Center
              </h1>
              <span className="badge badge-cyan">{teacherData.currentClass}</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
              {teacherData.teacherName} • {teacherData.department}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={() => setActiveTab('create')} 
            className="btn btn-primary"
          >
            <Plus size={16} /> Create Custom Quest
          </button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '18px',
      }}>
        <div className="glass-card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 600, marginBottom: '6px' }}>
            ENROLLED STUDENTS
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>
            {teacherData.totalStudents} Students
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--emerald-light)', marginTop: '4px' }}>
            94% Active Quest Engagement
          </div>
        </div>

        <div className="glass-card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 600, marginBottom: '6px' }}>
            CLASS AVERAGE XP
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--cyan-light)' }}>
            {teacherData.averageClassXp} XP
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '4px' }}>
            Top student: Rivetha (1,860 XP)
          </div>
        </div>

        <div className="glass-card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 600, marginBottom: '6px' }}>
            PENDING LAB REPORTS
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--amber-light)' }}>
            {teacherData.pendingLabReports} Submissions
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '4px' }}>
            Lab 4: Array Searching & Bounds
          </div>
        </div>

        <div className="glass-card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 600, marginBottom: '6px' }}>
            AI INTERVENTIONS PENDING
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f43f5e' }}>
            2 High Urgency
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--rose-light)', marginTop: '4px' }}>
            12 students failing boundary tests
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
        <button 
          onClick={() => setActiveTab('overview')} 
          className={`btn btn-sm ${activeTab === 'overview' ? 'btn-cyan' : 'btn-outline'}`}
        >
          Class Weakness Map & Recommendations
        </button>
        <button 
          onClick={() => setActiveTab('create')} 
          className={`btn btn-sm ${activeTab === 'create' ? 'btn-cyan' : 'btn-outline'}`}
        >
          Quest & Lab Creator
        </button>
        <button 
          onClick={() => setActiveTab('submissions')} 
          className={`btn btn-sm ${activeTab === 'submissions' ? 'btn-cyan' : 'btn-outline'}`}
        >
          Student Lab Reports (Rivetha & Class)
        </button>
      </div>

      {/* Tab 1: Overview & Weakness Map */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {/* Class Weakness Map (Section 23) */}
          <div className="glass-card" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <span className="badge badge-rose">NEURAL CLASSROOM HEATMAP</span>
                <h2 style={{ fontSize: '1.4rem', color: '#fff', marginTop: '6px' }}>
                  Class 2A Skill Mastery & Weakness Analysis
                </h2>
              </div>
              <span style={{ fontSize: '0.84rem', color: 'var(--text-dim)' }}>
                Sampled from 38 student profiles
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {Object.entries(teacherData.classWeaknessMap).map(([key, item]) => (
                <div key={key}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <strong style={{ color: '#fff', fontSize: '0.92rem' }}>{item.name}</strong>
                      <span className={`badge ${item.alert ? 'badge-rose' : 'badge-emerald'}`}>
                        {item.status}
                      </span>
                    </div>
                    <strong style={{ color: item.alert ? '#f43f5e' : (item.score > 80 ? '#10b981' : 'var(--cyan-light)') }}>
                      {item.score}%
                    </strong>
                  </div>

                  <div className="progress-container" style={{ height: '10px' }}>
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${item.score}%`,
                        background: item.alert ? 'linear-gradient(90deg, #e11d48, #f43f5e)' : 'linear-gradient(90deg, #059669, #10b981)',
                      }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Teaching Recommendation Engine (Section 24) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Sparkles size={22} color="var(--primary-light)" />
              <h3 style={{ fontSize: '1.3rem', color: '#fff' }}>
                AI Pedagogical Teaching Recommendations
              </h3>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '-10px' }}>
              Actionable interventions recommended by the system when collective student errors cross significance thresholds.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '18px',
            }}>
              {recommendations.map((rec) => (
                <div 
                  key={rec.id}
                  className="glass-card glass-card-hover"
                  style={{
                    border: rec.status === 'deployed' ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(244, 63, 94, 0.4)',
                    padding: '22px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span className={`badge ${rec.status === 'deployed' ? 'badge-emerald' : 'badge-rose'}`}>
                        {rec.status === 'deployed' ? 'DEPLOYED TO CLASS ✓' : 'URGENT ACTION'}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                        {rec.topic}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '8px' }}>
                      {rec.title}
                    </h4>

                    <div style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.84rem',
                      color: 'var(--text-muted)',
                      marginBottom: '14px',
                      borderLeft: '3px solid #f43f5e',
                    }}>
                      <strong style={{ color: '#fff' }}>Trigger:</strong> {rec.trigger}
                    </div>

                    <p style={{ fontSize: '0.86rem', color: 'var(--cyan-light)', marginBottom: '18px' }}>
                      <strong>AI Suggestion:</strong> {rec.recommendation}
                    </p>
                  </div>

                  <button 
                    onClick={() => handleApplyRecommendation(rec.id)}
                    disabled={rec.status === 'deployed'}
                    className={`btn btn-sm ${rec.status === 'deployed' ? 'btn-outline' : 'btn-primary'}`}
                    style={{ width: '100%' }}
                  >
                    {rec.status === 'deployed' ? 'Quest Active in World 5' : rec.actionLabel}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Create Custom Quest */}
      {activeTab === 'create' && (
        <div className="glass-card" style={{ padding: '28px', maxWidth: '800px' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '16px' }}>
            Create New Lab Quest / Exam Assignment
          </h2>

          <form onSubmit={handleCreateQuestSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  Quest Title
                </label>
                <input 
                  type="text"
                  value={newQuest.title}
                  onChange={(e) => setNewQuest({ ...newQuest, title: e.target.value })}
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '10px 14px',
                    color: '#fff',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  Target Language
                </label>
                <select
                  value={newQuest.language}
                  onChange={(e) => setNewQuest({ ...newQuest, language: e.target.value })}
                  style={{
                    width: '100%',
                    background: '#0e1124',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '10px 14px',
                    color: '#fff',
                    outline: 'none',
                  }}
                >
                  <option value="python">Python</option>
                  <option value="c">C</option>
                  <option value="cpp">C++</option>
                  <option value="java">Java</option>
                  <option value="javascript">JavaScript</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                Open Automated Test Cases (Input &rarr; Output)
              </label>
              <textarea
                rows={3}
                value={newQuest.testCases}
                onChange={(e) => setNewQuest({ ...newQuest, testCases: e.target.value })}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '10px 14px',
                  color: '#fff',
                  fontFamily: 'var(--font-code)',
                  fontSize: '0.86rem',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                Hidden Test Cases (Executed during Final Submission)
              </label>
              <textarea
                rows={2}
                value={newQuest.hiddenCases}
                onChange={(e) => setNewQuest({ ...newQuest, hiddenCases: e.target.value })}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '10px 14px',
                  color: '#fff',
                  fontFamily: 'var(--font-code)',
                  fontSize: '0.86rem',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button type="button" onClick={() => setActiveTab('overview')} className="btn btn-outline">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Deploy Assignment to Class 2A
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 3: Student Lab Reports (Section 25) */}
      {activeTab === 'submissions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.3rem', color: '#fff' }}>
              Lab Experiment 4: Array Searching, Bounds & Invariants Reports
            </h2>
            <span className="badge badge-emerald">32/38 Verified</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {teacherData.recentSubmissions.map((sub, i) => (
              <div 
                key={i}
                className="glass-card"
                style={{
                  padding: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '16px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <h4 style={{ fontSize: '1.1rem', color: '#fff' }}>{sub.studentName}</h4>
                    <span className="badge badge-purple">{sub.studentId}</span>
                    <span className="badge badge-emerald">{sub.status}</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-dim)', marginBottom: '8px' }}>
                    {sub.experiment} • Submitted {sub.submittedAt}
                  </div>
                  <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                    <strong>Detected Weakness:</strong> <span style={{ color: '#f43f5e' }}>{sub.weakness}</span>
                  </div>
                </div>

                {/* Score Breakdown Pills */}
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>TESTS</div>
                    <strong style={{ color: '#fff' }}>{sub.testCases}</strong>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>UNDERSTANDING</div>
                    <strong style={{ color: 'var(--cyan-light)' }}>{sub.understandingScore}</strong>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>VIVA</div>
                    <strong style={{ color: 'var(--primary-light)' }}>{sub.vivaScore}</strong>
                  </div>
                  <div style={{ textAlign: 'center', background: 'rgba(16, 185, 129, 0.1)', padding: '6px 12px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.74rem', color: 'var(--emerald-light)' }}>FINAL</div>
                    <strong style={{ color: '#10b981', fontSize: '1.2rem' }}>{sub.finalScore}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
