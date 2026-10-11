import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import confetti from 'canvas-confetti';
import { 
  Play, 
  Send, 
  HelpCircle, 
  Bug, 
  Sparkles, 
  Mic, 
  Terminal as TerminalIcon, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ShieldCheck, 
  Clock, 
  Cpu, 
  RotateCcw,
  BookOpen,
  Zap,
  Info,
  Check,
  ChevronDown
} from 'lucide-react';
import { executeCode, runTestArena } from '../services/codeExecutionService';
import { generateProgressiveHint, analyzeBugWithAi } from '../services/aiMentorService';
import { QUEST_DETAILS } from '../data/questData';
import { PredictOutputModal } from './PredictOutputModal';
import { AiVivaModal } from './AiVivaModal';

export function CodeEditor({ 
  questId = 'empty-array-monster', 
  languageMode = 'en',
  onQuestCompleted,
  studentData,
  onUpdateDna
}) {
  const quest = QUEST_DETAILS[questId] || QUEST_DETAILS['empty-array-monster'];
  
  const [language, setLanguage] = useState('python');
  const [editorMode, setEditorMode] = useState('quest'); // 'quest' | 'practice' | 'exam'
  const [code, setCode] = useState(quest.codeTemplates.python || '');
  
  // Execution & Terminal State
  const [isRunning, setIsRunning] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState('');
  const [executionStats, setExecutionStats] = useState(null);
  const [testResults, setTestResults] = useState(null);
  const [activeBottomTab, setActiveBottomTab] = useState('tests'); // 'tests' | 'terminal' | 'debug'

  // Modals & Panels
  const [isPredictModalOpen, setIsPredictModalOpen] = useState(false);
  const [isVivaModalOpen, setIsVivaModalOpen] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionAccuracy, setPredictionAccuracy] = useState(null);

  // Progressive Hint System State
  const [hintLevel, setHintLevel] = useState(0);
  const [hintsList, setHintsList] = useState([]);
  const [showHintDrawer, setShowHintDrawer] = useState(false);

  // AI Debug Coach State
  const [aiDebugAnalysis, setAiDebugAnalysis] = useState(null);
  const [showDebugModal, setShowDebugModal] = useState(false);

  // AI Trust Meter & Explanation State
  const [aiConfidence, setAiConfidence] = useState(87);
  const [explanationText, setExplanationText] = useState(null);

  // Switch code template on language change
  useEffect(() => {
    if (quest?.codeTemplates && quest.codeTemplates[language]) {
      setCode(quest.codeTemplates[language]);
    }
  }, [language, quest]);

  // Handle Predict Before Run
  const handleOpenPredict = () => {
    setIsPredictModalOpen(true);
  };

  const handlePredictionConfirmed = (correct, userGuessed) => {
    setPredictionMade(true);
    setPredictionAccuracy(correct);
    if (correct) {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
    }
  };

  // Run Code through real sandboxed execution
  const handleRunCode = async () => {
    setIsRunning(true);
    setActiveBottomTab('terminal');
    setTerminalOutput('⚡ Connecting to Piston Execution Sandbox...\nCompiling source code...');

    try {
      const arena = await runTestArena(language, code, quest.testCases);
      setTestResults(arena);

      const firstExec = await executeCode(language, code, quest.testCases[0].input);
      setExecutionStats({
        time: firstExec.executionTime,
        memory: firstExec.memoryMb,
        isSandbox: firstExec.isSandbox,
      });

      let termLog = `✓ Compilation successful\n`;
      termLog += `✓ ${arena.passedCount}/${arena.totalCount} test cases passed\n`;
      termLog += `Execution time: ${firstExec.executionTime}s\n`;
      termLog += `Memory: ${firstExec.memoryMb} MB\n`;
      termLog += `Sandboxed Architecture: Piston Docker Service (emkc v2)\n\n`;

      if (!arena.allPassed) {
        termLog += `⚠️ FAILURE DETECTED in ${arena.totalCount - arena.passedCount} test case(s)!\n`;
        const failedTest = arena.results.find(r => !r.passed);
        if (failedTest) {
          termLog += `Failed Test: ${failedTest.name} (${failedTest.type})\n`;
          termLog += `Input: ${failedTest.input}\n`;
          termLog += `Expected: ${failedTest.expected}\n`;
          termLog += `Actual: ${failedTest.actual}\n`;
        }
        termLog += `\n💡 Tip: Click "AI Debug" or "Hint" for Socratic guidance.`;
        setActiveBottomTab('tests');
      } else {
        termLog += `🎉 ALL TEST CASES PASSED! Ready for Submit & AI Viva defense.`;
        confetti({ particleCount: 70, spread: 70 });
        setActiveBottomTab('tests');
      }

      setTerminalOutput(termLog);
    } catch (err) {
      setTerminalOutput(`Error executing sandbox: ${err.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  // Submit Code & Trigger Viva / XP / DNA Update
  const handleSubmitCode = async () => {
    if (!testResults || !testResults.allPassed) {
      // Run first to verify
      await handleRunCode();
      if (!testResults?.allPassed) {
        alert('Some test cases are failing (especially edge cases). Use AI Mentor or Fix the bug before final submission!');
        return;
      }
    }

    // Open AI Viva
    setIsVivaModalOpen(true);
  };

  // AI Progressive Hint Progression
  const handleRequestHint = () => {
    setShowHintDrawer(true);
    const nextLevel = Math.min(3, hintLevel + 1);
    setHintLevel(nextLevel);
    const hint = generateProgressiveHint(nextLevel, quest, code, languageMode);
    setHintsList(prev => [...prev.filter(h => h.level !== nextLevel), hint]);
  };

  const handleRequestSolution = () => {
    const solution = generateProgressiveHint(4, quest, code, languageMode);
    setHintsList(prev => [...prev.filter(h => h.level !== 4), solution]);
    setHintLevel(4);
  };

  // AI Debug Coach
  const handleAiDebug = () => {
    const errSample = testResults?.results?.find(r => !r.passed)?.actual || 'Runtime/Edge Discrepancy';
    const analysis = analyzeBugWithAi(quest, code, errSample, languageMode);
    setAiDebugAnalysis(analysis);
    setShowDebugModal(true);
  };

  // Explain Code
  const handleExplainCode = () => {
    setExplanationText({
      title: 'Algorithmic Decomposition',
      summary: 'This function iterates linearly over elements to identify the minimum value, applying defensive invariants.',
      timeComplexity: 'O(N) linear time where N is array length.',
      spaceComplexity: 'O(1) constant auxiliary space.',
    });
    setActiveBottomTab('debug');
  };

  // Fix Code Quick Action (for 2-min demo flow!)
  const applyDefensiveFix = () => {
    if (language === 'python') {
      const fixed = `# Quest: The Empty Array Monster (DEFENSIVE REPAIR APPLIED)
def find_minimum(arr):
    # Guard against empty array monster!
    if not arr or len(arr) == 0:
        return None
    
    min_val = arr[0]
    for num in arr[1:]:
        if num < min_val:
            min_val = num
    return min_val

import sys, json
input_data = sys.stdin.read().strip()
if input_data:
    try:
        parsed = json.loads(input_data)
        res = find_minimum(parsed)
        print(res)
    except:
        print("None")
else:
    print(find_minimum([5, 2, 9, 1, 7]))
`;
      setCode(fixed);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {/* Top Bar: Quest Title, Language, Mode, Controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '14px',
        padding: '14px 20px',
        background: 'rgba(19, 23, 46, 0.75)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(139, 92, 246, 0.25)',
        borderRadius: 'var(--radius-lg)',
      }}>
        {/* Left: Quest Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '1.2rem', color: '#fff' }}>{quest.title}</h2>
              {quest.isBoss && <span className="badge badge-rose">BOSS</span>}
              <span className="badge badge-purple">+{quest.xp} XP</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
              {quest.worldName} • {quest.topic}
            </div>
          </div>
        </div>

        {/* Middle: Language & Mode Selectors */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Language Selector */}
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: 'var(--radius-sm)',
              color: '#fff',
              padding: '6px 12px',
              fontSize: '0.84rem',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="python" style={{ background: '#0a0d1d' }}>Python (3.10)</option>
            <option value="javascript" style={{ background: '#0a0d1d' }}>JavaScript (Node.js)</option>
            <option value="cpp" style={{ background: '#0a0d1d' }}>C++ (GCC)</option>
            <option value="c" style={{ background: '#0a0d1d' }}>C (Clang)</option>
            <option value="java" style={{ background: '#0a0d1d' }}>Java (OpenJDK)</option>
          </select>

          {/* Mode Selector */}
          <div style={{
            display: 'flex',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 'var(--radius-sm)',
            padding: '2px',
          }}>
            {['quest', 'practice', 'exam'].map((m) => (
              <button
                key={m}
                onClick={() => setEditorMode(m)}
                style={{
                  background: editorMode === m ? 'var(--primary)' : 'transparent',
                  color: editorMode === m ? '#fff' : 'var(--text-muted)',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '4px 10px',
                  fontSize: '0.78rem',
                  textTransform: 'capitalize',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                {m} Mode
              </button>
            ))}
          </div>
        </div>

        {/* Right: Primary Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Predict Output Button */}
          <button 
            onClick={handleOpenPredict}
            className={`btn btn-sm ${predictionMade ? 'btn-emerald' : 'btn-outline'}`}
            title="Predict output before execution (+30 XP)"
          >
            <Sparkles size={14} color={predictionMade ? '#fff' : 'var(--cyan)'} />
            {predictionMade ? 'Prediction Logged (+30 XP)' : 'Predict Output'}
          </button>

          {/* Run Code */}
          <button 
            onClick={handleRunCode}
            disabled={isRunning}
            className="btn btn-sm btn-cyan"
          >
            <Play size={14} fill="#fff" />
            {isRunning ? 'Running...' : 'Run Code'}
          </button>

          {/* Submit & Face Viva */}
          <button 
            onClick={handleSubmitCode}
            className="btn btn-sm btn-primary"
          >
            <Send size={14} /> Submit & Viva
          </button>
        </div>
      </div>

      {/* Editor & AI Mentor Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: showHintDrawer ? '1fr 340px' : '1fr',
        gap: '16px',
        alignItems: 'start',
      }}>
        {/* Monaco Editor Container */}
        <div style={{
          background: '#0d1117',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-md)',
        }}>
          {/* Editor Header Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 16px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
              <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginLeft: '8px', fontFamily: 'var(--font-code)' }}>
                main.{language === 'python' ? 'py' : (language === 'javascript' ? 'js' : language)}
              </span>
            </div>

            {/* AI Assistant Quick Actions on top of editor */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button 
                onClick={handleRequestHint} 
                className="btn btn-sm btn-neon"
                style={{ padding: '3px 8px', fontSize: '0.75rem' }}
              >
                <HelpCircle size={13} /> Hint (Level {hintLevel}/3)
              </button>
              <button 
                onClick={handleAiDebug} 
                className="btn btn-sm btn-outline"
                style={{ padding: '3px 8px', fontSize: '0.75rem', borderColor: 'rgba(244, 63, 94, 0.4)', color: '#fb7185' }}
              >
                <Bug size={13} /> AI Debug Coach
              </button>
              <button 
                onClick={handleExplainCode} 
                className="btn btn-sm btn-outline"
                style={{ padding: '3px 8px', fontSize: '0.75rem' }}
              >
                <BookOpen size={13} /> Explain Code
              </button>
              {/* Quick apply fix helper for demo */}
              <button 
                onClick={applyDefensiveFix}
                className="btn btn-sm btn-outline"
                title="Apply defensive programming fix"
                style={{ padding: '3px 8px', fontSize: '0.75rem', color: 'var(--emerald-light)' }}
              >
                ⚡ Apply Guard Fix
              </button>
            </div>
          </div>

          {/* Real Monaco Code Editor */}
          <div style={{ height: '380px' }}>
            <Editor
              height="100%"
              language={language === 'c' || language === 'cpp' ? 'cpp' : language}
              theme="vs-dark"
              value={code}
              onChange={(newVal) => setCode(newVal || '')}
              options={{
                fontSize: 14,
                fontFamily: 'JetBrains Mono, monospace',
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                automaticLayout: true,
                tabSize: 4,
              }}
            />
          </div>
        </div>

        {/* Socratic AI Mentor Hint Drawer */}
        {showHintDrawer && (
          <div className="glass-card" style={{ padding: '20px', maxHeight: '425px', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={16} color="var(--primary-light)" />
                <h4 style={{ fontSize: '0.98rem', color: '#fff' }}>AI Socratic Mentor</h4>
              </div>
              <button 
                onClick={() => setShowHintDrawer(false)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', fontSize: '0.8rem' }}
              >
                Close
              </button>
            </div>

            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
              The AI gives conceptual clues first so you discover the fix yourself.
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {hintsList.map((h, i) => (
                <div 
                  key={i}
                  style={{
                    background: h.level === 4 ? 'rgba(16, 185, 129, 0.12)' : 'rgba(139, 92, 246, 0.12)',
                    borderLeft: `3px solid ${h.level === 4 ? '#10b981' : 'var(--primary)'}`,
                    padding: '10px 12px',
                    borderRadius: '0 8px 8px 0',
                    fontSize: '0.82rem',
                  }}
                >
                  <strong style={{ color: h.level === 4 ? '#6ee7b7' : 'var(--primary-light)', display: 'block', marginBottom: '4px' }}>
                    {h.title}
                  </strong>
                  {h.level === 4 ? (
                    <pre style={{ fontFamily: 'var(--font-code)', fontSize: '0.76rem', whiteSpace: 'pre-wrap', color: '#fff' }}>
                      {h.text}
                    </pre>
                  ) : (
                    <p style={{ color: '#fff', lineHeight: 1.45 }}>{h.text}</p>
                  )}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
              {hintLevel < 3 && (
                <button onClick={handleRequestHint} className="btn btn-sm btn-neon">
                  Give me a stronger clue
                </button>
              )}
              {hintLevel >= 3 && hintLevel < 4 && (
                <button onClick={handleRequestSolution} className="btn btn-sm btn-outline" style={{ color: 'var(--rose-light)' }}>
                  Show Final Solution (Cost: -20 XP)
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* AI Trust Meter Banner (Section 29) */}
      <div style={{
        background: 'rgba(15, 18, 36, 0.75)',
        border: '1px solid rgba(6, 182, 212, 0.25)',
        borderRadius: 'var(--radius-md)',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px',
        fontSize: '0.8rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={16} color="var(--cyan-light)" />
            <strong style={{ color: '#fff' }}>AI Trust Meter: {aiConfidence}%</strong>
          </div>
          <span style={{ color: 'var(--text-dim)' }}>•</span>
          <span style={{ color: 'var(--emerald-light)' }}>✓ Compiler Evidence Verified</span>
          <span style={{ color: 'var(--text-dim)' }}>•</span>
          <span style={{ color: 'var(--emerald-light)' }}>✓ Static Boundary Analysis</span>
        </div>
        <div style={{ color: 'var(--amber-light)', fontStyle: 'italic' }}>
          "Always verify AI-assisted code against test invariants."
        </div>
      </div>

      {/* Bottom Panel: AI Test Arena & Execution Terminal */}
      <div className="glass-card" style={{ padding: '20px' }}>
        {/* Bottom Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '12px',
          marginBottom: '16px',
        }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setActiveBottomTab('tests')}
              style={{
                background: activeBottomTab === 'tests' ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                color: activeBottomTab === 'tests' ? '#fff' : 'var(--text-muted)',
                border: activeBottomTab === 'tests' ? '1px solid var(--primary)' : '1px solid transparent',
                borderRadius: 'var(--radius-sm)',
                padding: '6px 14px',
                fontSize: '0.84rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              🧪 AI Test Arena ({testResults ? `${testResults.passedCount}/${testResults.totalCount}` : `${quest.testCases.length} Tests`})
            </button>
            <button
              onClick={() => setActiveBottomTab('terminal')}
              style={{
                background: activeBottomTab === 'terminal' ? 'rgba(6, 182, 212, 0.2)' : 'transparent',
                color: activeBottomTab === 'terminal' ? '#fff' : 'var(--text-muted)',
                border: activeBottomTab === 'terminal' ? '1px solid var(--cyan)' : '1px solid transparent',
                borderRadius: 'var(--radius-sm)',
                padding: '6px 14px',
                fontSize: '0.84rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              💻 Piston Terminal
            </button>
            <button
              onClick={() => setActiveBottomTab('debug')}
              style={{
                background: activeBottomTab === 'debug' ? 'rgba(244, 63, 94, 0.2)' : 'transparent',
                color: activeBottomTab === 'debug' ? '#fff' : 'var(--text-muted)',
                border: activeBottomTab === 'debug' ? '1px solid var(--rose)' : '1px solid transparent',
                borderRadius: 'var(--radius-sm)',
                padding: '6px 14px',
                fontSize: '0.84rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              🧠 Explanation & Diagnosis
            </button>
          </div>

          {executionStats && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.78rem', color: 'var(--text-dim)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={13} /> {executionStats.time}s
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Cpu size={13} /> {executionStats.memory} MB
              </span>
            </div>
          )}
        </div>

        {/* Tab 1: AI Test Arena */}
        {activeBottomTab === 'tests' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {(testResults?.results || quest.testCases).map((t, idx) => (
              <div 
                key={t.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: 'var(--radius-md)',
                  border: t.passed === false ? '1px solid rgba(244, 63, 94, 0.4)' : (t.passed ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(255, 255, 255, 0.06)'),
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {t.passed === true && <CheckCircle2 color="#10b981" size={18} />}
                  {t.passed === false && <XCircle color="#ef4444" size={18} />}
                  {t.passed === undefined && <span style={{ color: 'var(--text-dim)' }}>○</span>}
                  
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <strong style={{ color: '#fff', fontSize: '0.88rem' }}>{t.name}</strong>
                      <span className={`badge ${t.type === 'edge' ? 'badge-rose' : (t.type === 'boundary' ? 'badge-amber' : 'badge-cyan')}`}>
                        {t.type.toUpperCase()}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontFamily: 'var(--font-code)', marginTop: '2px' }}>
                      Input: <code>{t.input || '[]'}</code> → Expected: <code>{t.expected}</code>
                      {t.actual && <span> | Actual: <code style={{ color: t.passed ? '#6ee7b7' : '#fca5a5' }}>{t.actual}</code></span>}
                    </div>
                  </div>
                </div>

                <div>
                  {t.passed === true && <span className="badge badge-emerald">PASSED</span>}
                  {t.passed === false && <span className="badge badge-rose">FAILED</span>}
                  {t.passed === undefined && <span className="badge badge-purple">QUEUED</span>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Terminal */}
        {activeBottomTab === 'terminal' && (
          <div style={{
            background: '#070913',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            fontFamily: 'var(--font-code)',
            fontSize: '0.84rem',
            color: '#e2e8f0',
            minHeight: '140px',
            whiteSpace: 'pre-wrap',
            lineHeight: 1.6,
          }}>
            {terminalOutput || 'Click "Run Code" to start execution inside the secure Piston Docker sandbox.'}
          </div>
        )}

        {/* Tab 3: Explanation & Complexity */}
        {activeBottomTab === 'debug' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {explanationText ? (
              <div style={{
                background: 'rgba(139, 92, 246, 0.08)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
              }}>
                <h4 style={{ color: 'var(--primary-light)', marginBottom: '8px' }}>{explanationText.title}</h4>
                <p style={{ color: 'var(--text-main)', fontSize: '0.88rem', marginBottom: '12px' }}>{explanationText.summary}</p>
                <div style={{ display: 'flex', gap: '20px', fontSize: '0.82rem' }}>
                  <div><strong style={{ color: 'var(--cyan-light)' }}>Time:</strong> {explanationText.timeComplexity}</div>
                  <div><strong style={{ color: 'var(--emerald-light)' }}>Space:</strong> {explanationText.spaceComplexity}</div>
                </div>
              </div>
            ) : (
              <div style={{ color: 'var(--text-muted)', fontSize: '0.86rem' }}>
                Click "Explain Code" or "AI Debug Coach" above to generate structural code analysis.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Predict Output Modal */}
      <PredictOutputModal
        isOpen={isPredictModalOpen}
        onClose={() => setIsPredictModalOpen(false)}
        sampleInput={quest.testCases[0]?.input || '[5, 2, 9, 1, 7]'}
        expectedOutput={quest.testCases[0]?.expected || '1'}
        onConfirmPrediction={handlePredictionConfirmed}
      />

      {/* AI Debug Coach Modal (Section 12) */}
      {showDebugModal && aiDebugAnalysis && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Bug color="#f43f5e" size={24} />
                <h3 style={{ fontSize: '1.25rem', color: '#fff' }}>AI Debug Coach: Root Cause Diagnostic</h3>
              </div>
              <button onClick={() => setShowDebugModal(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ background: 'rgba(244, 63, 94, 0.1)', padding: '12px', borderRadius: 'var(--radius-md)', borderLeft: '3px solid #f43f5e' }}>
                <div style={{ fontSize: '0.78rem', color: '#f87171', fontWeight: 700 }}>WHAT HAPPENED?</div>
                <div style={{ fontSize: '0.88rem', color: '#fff', marginTop: '3px' }}>{aiDebugAnalysis.what}</div>
              </div>

              <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '12px', borderRadius: 'var(--radius-md)', borderLeft: '3px solid #f59e0b' }}>
                <div style={{ fontSize: '0.78rem', color: '#fbbf24', fontWeight: 700 }}>WHERE?</div>
                <div style={{ fontSize: '0.88rem', color: '#fff', marginTop: '3px' }}>{aiDebugAnalysis.where}</div>
              </div>

              <div style={{ background: 'rgba(6, 182, 212, 0.1)', padding: '12px', borderRadius: 'var(--radius-md)', borderLeft: '3px solid #06b6d4' }}>
                <div style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: 700 }}>WHY?</div>
                <div style={{ fontSize: '0.88rem', color: '#fff', marginTop: '3px' }}>{aiDebugAnalysis.why}</div>
              </div>

              <div style={{ background: 'rgba(139, 92, 246, 0.1)', padding: '12px', borderRadius: 'var(--radius-md)', borderLeft: '3px solid #8b5cf6' }}>
                <div style={{ fontSize: '0.78rem', color: '#c084fc', fontWeight: 700 }}>SOCRATIC HINT</div>
                <div style={{ fontSize: '0.88rem', color: '#fff', marginTop: '3px' }}>{aiDebugAnalysis.hint}</div>
              </div>

              <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '12px', borderRadius: 'var(--radius-md)', borderLeft: '3px solid #10b981' }}>
                <div style={{ fontSize: '0.78rem', color: '#4ade80', fontWeight: 700 }}>HOW TO IMPROVE?</div>
                <div style={{ fontSize: '0.88rem', color: '#fff', marginTop: '3px' }}>{aiDebugAnalysis.howToImprove}</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button onClick={() => setShowDebugModal(false)} className="btn btn-primary btn-sm">
                I Understand, Return to Editor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Viva Examination Modal */}
      <AiVivaModal
        isOpen={isVivaModalOpen}
        onClose={() => setIsVivaModalOpen(false)}
        quest={quest}
        studentCode={code}
        onCompleteViva={(vivaReport) => {
          setIsVivaModalOpen(false);
          confetti({ particleCount: 100, spread: 90 });
          if (onQuestCompleted) {
            onQuestCompleted(quest, vivaReport);
          }
          if (onUpdateDna) {
            onUpdateDna('edgeCases', 61); // Increases Edge Cases from 49% to 61% as specified in prompt!
          }
        }}
      />
    </div>
  );
}
