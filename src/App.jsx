import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { StudentDashboard } from './components/StudentDashboard';
import { AdventureMap } from './components/AdventureMap';
import { CodeEditor } from './components/CodeEditor';
import { CodingDnaView } from './components/CodingDnaView';
import { AiVivaModal } from './components/AiVivaModal';
import { TeacherDashboard } from './components/TeacherDashboard';
import { CollegeLabView } from './components/CollegeLabView';
import { ExamModeView } from './components/ExamModeView';
import { LeaderboardView } from './components/LeaderboardView';
import { CareerSkillView } from './components/CareerSkillView';
import { AchievementsView } from './components/AchievementsView';
import { DemoWalkthroughModal } from './components/DemoWalkthroughModal';

import { INITIAL_STUDENT_DATA } from './data/demoStudentData';
import { INITIAL_TEACHER_DATA } from './data/teacherData';
import { QUEST_DETAILS } from './data/questData';
import confetti from 'canvas-confetti';

export function App() {
  const [activeTab, setActiveTab] = useState('landing');
  const [userRole, setUserRole] = useState('student'); // 'student' | 'teacher'
  const [languageMode, setLanguageMode] = useState('en'); // 'en' | 'tanglish' | 'ta'
  const [studentData, setStudentData] = useState(INITIAL_STUDENT_DATA);
  const [teacherData, setTeacherData] = useState(INITIAL_TEACHER_DATA);
  const [activeQuestId, setActiveQuestId] = useState('empty-array-monster');
  const [isDemoWalkthroughOpen, setIsDemoWalkthroughOpen] = useState(false);
  const [standaloneVivaOpen, setStandaloneVivaOpen] = useState(false);

  // Start any quest
  const handleStartQuest = (questId) => {
    setActiveQuestId(questId);
    setActiveTab('code-lab');
  };

  // Update Coding DNA in real-time
  const handleUpdateDna = (skillKey, newScore) => {
    setStudentData((prev) => {
      const updatedSkills = { ...prev.skillsDNA };
      if (updatedSkills[skillKey]) {
        updatedSkills[skillKey] = {
          ...updatedSkills[skillKey],
          score: newScore,
          isWeakest: newScore < 55,
        };
      }
      return {
        ...prev,
        skillsDNA: updatedSkills,
        weakestSkill: newScore >= 60 ? 'Recursion & Call Stacks (42%)' : 'Edge Cases & Guards',
        dnaScore: Math.round(
          Object.values(updatedSkills).reduce((acc, curr) => acc + curr.score, 0) / Object.keys(updatedSkills).length
        ),
      };
    });
  };

  // Handle quest completion & XP rewards
  const handleQuestCompleted = (quest, vivaReport) => {
    const gainedXp = quest.xp || 450;
    setStudentData((prev) => {
      const newXp = prev.xp + gainedXp;
      const isLevelUp = newXp >= prev.nextLevelXp;
      if (isLevelUp) {
        confetti({ particleCount: 150, spread: 100 });
      }
      return {
        ...prev,
        xp: newXp,
        level: isLevelUp ? prev.level + 1 : prev.level,
        levelTitle: isLevelUp ? 'Code Architect' : prev.levelTitle,
        completedQuestsCount: prev.completedQuestsCount + 1,
      };
    });
  };

  return (
    <div className="app-container">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        setUserRole={setUserRole}
        studentData={studentData}
        languageMode={languageMode}
        setLanguageMode={setLanguageMode}
        onStartDemoWalkthrough={() => setIsDemoWalkthroughOpen(true)}
      />

      {/* Main Body Content */}
      <main className="main-content">
        {activeTab === 'landing' && (
          <LandingPage
            onStartQuest={() => handleStartQuest('empty-array-monster')}
            onExploreDemo={() => setIsDemoWalkthroughOpen(true)}
          />
        )}

        {activeTab === 'dashboard' && (
          <StudentDashboard
            studentData={studentData}
            onStartQuest={handleStartQuest}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'adventure-map' && (
          <AdventureMap onSelectQuest={handleStartQuest} />
        )}

        {activeTab === 'code-lab' && (
          <CodeEditor
            questId={activeQuestId}
            languageMode={languageMode}
            studentData={studentData}
            onQuestCompleted={handleQuestCompleted}
            onUpdateDna={handleUpdateDna}
          />
        )}

        {activeTab === 'coding-dna' && (
          <CodingDnaView
            studentData={studentData}
            onStartQuest={handleStartQuest}
            onUpdateDna={handleUpdateDna}
          />
        )}

        {activeTab === 'ai-viva' && (
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', padding: '40px 20px' }}>
            <div className="glass-card" style={{ padding: '36px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🎤</div>
              <h2 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '10px' }}>
                AI Viva Technical Defense Arena
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '24px', maxWidth: '580px', margin: '0 auto 24px auto' }}>
                Experience interactive oral examinations tailored directly to your written code using Web Speech voice synthesis and real-time audio transcription.
              </p>
              <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
                <button 
                  onClick={() => setStandaloneVivaOpen(true)}
                  className="btn btn-lg btn-primary"
                >
                  Launch Interactive Audio Viva
                </button>
                <button 
                  onClick={() => handleStartQuest('empty-array-monster')}
                  className="btn btn-lg btn-outline"
                >
                  Write Code in Lab First
                </button>
              </div>
            </div>

            <AiVivaModal
              isOpen={standaloneVivaOpen}
              onClose={() => setStandaloneVivaOpen(false)}
              quest={QUEST_DETAILS['empty-array-monster']}
              studentCode={`def find_minimum(arr):\n    if not arr:\n        return None\n    min_val = arr[0]\n    for x in arr[1:]:\n        if x < min_val: min_val = x\n    return min_val`}
              onCompleteViva={(res) => {
                setStandaloneVivaOpen(false);
                handleUpdateDna('edgeCases', 61);
              }}
            />
          </div>
        )}

        {activeTab === 'college-lab' && (
          <CollegeLabView
            studentData={studentData}
            onOpenExperiment={handleStartQuest}
          />
        )}

        {activeTab === 'exam-mode' && (
          <ExamModeView onExitExam={() => setActiveTab('dashboard')} />
        )}

        {activeTab === 'leaderboard' && (
          <LeaderboardView currentStudent={studentData} />
        )}

        {activeTab === 'career' && (
          <CareerSkillView
            studentData={studentData}
            onStartQuest={handleStartQuest}
          />
        )}

        {activeTab === 'achievements' && (
          <AchievementsView studentData={studentData} />
        )}

        {(activeTab === 'teacher-dashboard' || activeTab === 'teacher-recommendations') && (
          <TeacherDashboard
            teacherData={teacherData}
            onGenerateRemedialQuest={() => {
              // Add remedial quest notice
              handleStartQuest('empty-array-monster');
            }}
          />
        )}
      </main>

      {/* 2-3 Minute Guided Interactive Product Demo Walkthrough (Section 37) */}
      <DemoWalkthroughModal
        isOpen={isDemoWalkthroughOpen}
        onClose={() => setIsDemoWalkthroughOpen(false)}
        onNavigateTab={setActiveTab}
        onStartQuest={handleStartQuest}
        setUserRole={setUserRole}
        onUpdateDna={handleUpdateDna}
      />
    </div>
  );
}

export default App;
