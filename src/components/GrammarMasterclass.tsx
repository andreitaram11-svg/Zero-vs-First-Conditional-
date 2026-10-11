import React, { useState } from 'react';
import { Volume2, Sparkles, BookOpen, CheckCircle2, ArrowRight, Lightbulb, AlertTriangle } from 'lucide-react';
import { sound, speakSentence } from '../utils/audio';

export const GrammarMasterclass: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'comparison' | 'laboratory' | 'comma'>('comparison');
  const [labCondition, setLabCondition] = useState<number>(0);
  const [isReverseClause, setIsReverseClause] = useState<boolean>(false);

  const labScenarios = [
    {
      context: 'School Fire Alarm Drill',
      ifClause: 'If the fire alarm sounds',
      zeroResult: 'everyone vacates the classroom immediately.',
      firstResult: 'we will walk out to the athletic field with Mrs. Jensen.',
      zeroExplain: 'Zero Conditional: This is an unchanging emergency safety protocol that happens 100% of the time.',
      firstExplain: 'First Conditional: A specific drill planned for tomorrow’s 4th period.'
    },
    {
      context: 'Rain During Recess Break',
      ifClause: 'If rain falls during break time',
      zeroResult: 'the playground supervisor directs students into the gym.',
      firstResult: 'our squad will challenge the seniors in indoor table tennis.',
      zeroExplain: 'Zero Conditional: General school weather policy.',
      firstExplain: 'First Conditional: Our team’s personal plan for today’s lunch break.'
    },
    {
      context: 'Cheating During an Examination',
      ifClause: 'If a student copies exam answers',
      zeroResult: 'the teacher gives an automatic zero score.',
      firstResult: 'Mr. Clarke will summon their parents to school tomorrow.',
      zeroExplain: 'Zero Conditional: Standing academic integrity regulation.',
      firstExplain: 'First Conditional: A specific consequence for tomorrow’s history midterm.'
    }
  ];

  const currentLab = labScenarios[labCondition];

  const handlePronounce = (text: string) => {
    sound.playClick();
    speakSentence(text);
  };

  return (
    <div className="space-y-6">
      {/* Header Deck */}
      <div className="cyber-card rounded-3xl border border-cyan-500/30 shadow-xl p-6 sm:p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 bg-cyan-500/15 px-3 py-1 rounded-full border border-cyan-400/30 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Theory, Formulas & Rules</span>
            </div>
            <div className="animate-title-float">
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight flex items-center gap-2">
                <span>Grammar Masterclass: Zero vs. First Conditional</span>
                <span className="text-2xl animate-gentle-wiggle">⚡</span>
              </h2>
            </div>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Understand the core logic: when an event is a permanent fact or school rule versus when it is a specific real future possibility!
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('comparison');
              }}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'comparison'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-cyan-500/30 border border-cyan-400/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Side-by-Side Matrix
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('laboratory');
              }}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'laboratory'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-cyan-500/30 border border-cyan-400/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Interactive Sentence Lab
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('comma');
              }}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'comma'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-cyan-500/30 border border-cyan-400/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              The Comma Rule
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: SIDE-BY-SIDE MATRIX */}
      {activeTab === 'comparison' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Zero Conditional Column */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold font-display text-slate-900">
                      Zero Conditional
                    </h3>
                    <p className="text-xs text-violet-700 font-medium mt-0.5">
                      General Truths, Scientific Laws & Standing School Rules
                    </p>
                  </div>
                  <span className="text-xs font-bold text-violet-700 bg-violet-50 px-3 py-1 rounded-full border border-violet-200">
                    100% Constant
                  </span>
                </div>

                {/* Formula Board */}
                <div className="bg-[#0B132B] text-slate-100 rounded-2xl p-4 mb-5 font-mono text-xs border border-blue-900/60 shadow-inner">
                  <div className="text-[10px] uppercase tracking-wider text-blue-400 font-bold mb-1">
                    Standard Formula:
                  </div>
                  <div className="text-sm font-bold text-white">
                    If + <span className="text-amber-300">Present Simple</span>,{' '}
                    <span className="text-blue-300">Present Simple</span>.
                  </div>
                </div>

                {/* Core Properties */}
                <ul className="space-y-3 text-xs text-slate-600 mb-6">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>When to use:</strong> Whenever the outcome is inevitable or an established routine. If X occurs, Y always follows.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>Can substitute "When":</strong> You can often replace "If" with "When" without altering the meaning. (<em>When the bell rings, we exit.</em>)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>No "will":</strong> You NEVER use "will" in a Zero conditional sentence!</span>
                  </li>
                </ul>

                {/* Concrete School Examples */}
                <div className="space-y-2.5">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <div className="flex items-center justify-between font-semibold text-slate-900 mb-1">
                      <span>Classroom Rule #1:</span>
                      <button
                        onClick={() => handlePronounce("If the bell rings, class ends.")}
                        className="text-blue-600 hover:text-blue-800"
                        title="Listen"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="italic text-slate-700">"If the bell rings, class ends."</p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <div className="flex items-center justify-between font-semibold text-slate-900 mb-1">
                      <span>Science Lab Fact:</span>
                      <button
                        onClick={() => handlePronounce("If you mix oil and water in the beaker, they separate.")}
                        className="text-blue-600 hover:text-blue-800"
                        title="Listen"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="italic text-slate-700">"If you mix oil and water in the beaker, they separate."</p>
                  </div>
                </div>
              </div>
            </div>

            {/* First Conditional Column */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold font-display text-slate-900">
                      First Conditional
                    </h3>
                    <p className="text-xs text-blue-700 font-medium mt-0.5">
                      Specific Future Possibilities, Promises, Warnings & Plans
                    </p>
                  </div>
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                    Real Future Possibility
                  </span>
                </div>

                {/* Formula Board */}
                <div className="bg-[#0B132B] text-slate-100 rounded-2xl p-4 mb-5 font-mono text-xs border border-blue-900/60 shadow-inner">
                  <div className="text-[10px] uppercase tracking-wider text-amber-300 font-bold mb-1">
                    Standard Formula:
                  </div>
                  <div className="text-sm font-bold text-white">
                    If + <span className="text-blue-300">Present Simple</span>,{' '}
                    <span className="text-amber-300">WILL / WON'T + Base Verb</span>.
                  </div>
                </div>

                {/* Core Properties */}
                <ul className="space-y-3 text-xs text-slate-600 mb-6">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>When to use:</strong> For a concrete, specific event that may happen in the future (tomorrow, tonight, next week).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>Golden Rule:</strong> Never place "will" inside the "if" clause! (<em>Say: If it rains, not: If it will rain</em>).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span><strong>Modals allowed:</strong> You can also use <em>can, might, or should</em> in the result clause instead of <em>will</em>.</span>
                  </li>
                </ul>

                {/* Concrete School Examples */}
                <div className="space-y-2.5">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <div className="flex items-center justify-between font-semibold text-slate-900 mb-1">
                      <span>Tomorrow’s Recess Plan:</span>
                      <button
                        onClick={() => handlePronounce("If the weather is sunny tomorrow, we will play basketball.")}
                        className="text-blue-600 hover:text-blue-800"
                        title="Listen"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="italic text-slate-700">"If the weather is sunny tomorrow, we will play basketball."</p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <div className="flex items-center justify-between font-semibold text-slate-900 mb-1">
                      <span>Midterm Exam Warning:</span>
                      <button
                        onClick={() => handlePronounce("If you study these grammar notes tonight, you will score an A on the test.")}
                        className="text-blue-600 hover:text-blue-800"
                        title="Listen"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="italic text-slate-700">"If you study these grammar notes tonight, you will score an A on the test."</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Quick Summary Comparison Table */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
              <h4 className="font-bold font-display text-slate-900 text-base">
                At a Glance: Contrast Matrix
              </h4>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Feature</th>
                    <th className="py-3 px-4 text-violet-700 font-bold">Zero Conditional</th>
                    <th className="py-3 px-4 text-blue-700 font-bold">First Conditional</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">Timeframe</td>
                    <td className="py-3.5 px-4">All the time / Routine / Standing rule</td>
                    <td className="py-3.5 px-4">Specific future time (tomorrow, later)</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">Certainty</td>
                    <td className="py-3.5 px-4">100% Guaranteed / Inevitable fact</td>
                    <td className="py-3.5 px-4">Real possibility / Conditional promise</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">If-Clause Verb</td>
                    <td className="py-3.5 px-4 font-mono text-violet-700 font-bold">Present Simple</td>
                    <td className="py-3.5 px-4 font-mono text-blue-700 font-bold">Present Simple</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">Result-Clause Verb</td>
                    <td className="py-3.5 px-4 font-mono text-violet-700 font-bold">Present Simple</td>
                    <td className="py-3.5 px-4 font-mono text-amber-600 font-bold">WILL / WON'T + Base Verb</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE SENTENCE LABORATORY */}
      {activeTab === 'laboratory' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-xl font-bold font-display text-slate-900">
              Interactive Grammar Workbench
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Select a school scenario to compare how the identical condition transforms into a standing rule (Zero) versus a future event (First).
            </p>
          </div>

          {/* Scenario Selector */}
          <div className="flex flex-wrap gap-2">
            {labScenarios.map((item, idx) => (
              <button
                key={item.context}
                onClick={() => {
                  sound.playClick();
                  setLabCondition(idx);
                }}
                className={`px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all ${
                  labCondition === idx
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {item.context}
              </button>
            ))}
          </div>

          {/* Workbench Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Zero Conditional Construction */}
            <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50/70 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-violet-900 uppercase tracking-wide">
                    Zero Conditional Form
                  </span>
                  <span className="text-[11px] font-semibold text-violet-700 bg-violet-100 px-2 py-0.5 rounded">
                    School Routine
                  </span>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2">
                  <p className="text-sm font-medium text-slate-900 leading-relaxed">
                    <span className="text-violet-700 font-bold">{currentLab.ifClause},</span>{' '}
                    <span className="text-slate-900 font-bold">{currentLab.zeroResult}</span>
                  </p>
                </div>

                <div className="mt-3 text-xs text-slate-600">
                  <p className="font-semibold text-slate-800">Grammar breakdown:</p>
                  <p className="mt-0.5">{currentLab.zeroExplain}</p>
                </div>
              </div>

              <button
                onClick={() => handlePronounce(`${currentLab.ifClause}, ${currentLab.zeroResult}`)}
                className="mt-4 px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-xl text-xs hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors shadow-2xs"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Hear Zero Sentence</span>
              </button>
            </div>

            {/* First Conditional Construction */}
            <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50/70 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-blue-900 uppercase tracking-wide">
                    First Conditional Form
                  </span>
                  <span className="text-[11px] font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                    Specific Future Plan
                  </span>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2">
                  <p className="text-sm font-medium text-slate-900 leading-relaxed">
                    <span className="text-blue-700 font-bold">{currentLab.ifClause},</span>{' '}
                    <span className="text-amber-600 font-bold">{currentLab.firstResult}</span>
                  </p>
                </div>

                <div className="mt-3 text-xs text-slate-600">
                  <p className="font-semibold text-slate-800">Grammar breakdown:</p>
                  <p className="mt-0.5">{currentLab.firstExplain}</p>
                </div>
              </div>

              <button
                onClick={() => handlePronounce(`${currentLab.ifClause}, ${currentLab.firstResult}`)}
                className="mt-4 px-4 py-2.5 bg-amber-400 text-slate-950 font-bold rounded-xl text-xs hover:bg-amber-300 flex items-center justify-center gap-2 transition-colors shadow-2xs"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Hear First Sentence</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: THE COMMA RULE */}
      {activeTab === 'comma' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-xl font-bold font-display text-slate-900">
              The Comma Rule: Clause Order Visualizer
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              One of the most common mistakes in English exams! Notice when a comma is required and when it must be omitted.
            </p>
          </div>

          <div className="flex items-center justify-center py-4">
            <button
              onClick={() => {
                sound.playClick();
                setIsReverseClause(!isReverseClause);
              }}
              className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl text-xs hover:bg-blue-700 shadow-sm flex items-center gap-2 transition-all active:scale-95"
            >
              <span>Switch Clause Order</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive Clause Demonstration */}
          <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50 text-center space-y-4">
            {!isReverseClause ? (
              <div>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-2">
                  Order A: "IF" Clause First → COMMA REQUIRED!
                </span>
                <div className="inline-flex flex-wrap items-center justify-center gap-2 text-base sm:text-lg font-bold font-sans">
                  <span className="bg-blue-100 text-blue-900 px-3 py-1.5 rounded-xl border border-blue-200">
                    If students arrive late
                  </span>
                  <span className="text-rose-600 font-extrabold text-2xl animate-pulse">,</span>
                  <span className="bg-violet-100 text-violet-900 px-3 py-1.5 rounded-xl border border-violet-200">
                    they need a hall pass.
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium mt-3">
                  ✓ Rule: When the condition comes first, separate the two clauses with a comma.
                </p>
              </div>
            ) : (
              <div>
                <span className="text-xs font-bold text-violet-700 uppercase tracking-wider block mb-2">
                  Order B: Main Clause First → NO COMMA!
                </span>
                <div className="inline-flex flex-wrap items-center justify-center gap-2 text-base sm:text-lg font-bold font-sans">
                  <span className="bg-violet-100 text-violet-900 px-3 py-1.5 rounded-xl border border-violet-200">
                    Students need a hall pass
                  </span>
                  <span className="bg-blue-100 text-blue-900 px-3 py-1.5 rounded-xl border border-blue-200">
                    if they arrive late.
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium mt-3">
                  ✓ Rule: When the main clause comes first, "if" acts as the connector, so no comma is needed!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
