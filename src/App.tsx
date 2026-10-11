/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NavSection } from './types';
import { Header } from './components/Header';
import { ProfessorHoot } from './components/ProfessorHoot';
import { InstructionsSection } from './components/InstructionsSection';
import { VocabularySection } from './components/VocabularySection';
import { GrammarMasterclass } from './components/GrammarMasterclass';
import { InteractiveVideoLesson } from './components/InteractiveVideoLesson';
import { PracticeHub } from './components/PracticeHub';
import { CertificateModal } from './components/CertificateModal';
import { ClassroomBackground } from './components/ClassroomBackground';
import { sound } from './utils/audio';
import { OWL_QUOTES } from './data/curriculum';

export default function App() {
  const [currentSection, setCurrentSection] = useState<NavSection>('instructions');
  const [totalScore, setTotalScore] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);

  // Professor Hoot state
  const [owlTip, setOwlTip] = useState<string>(OWL_QUOTES.welcome);
  const [owlReaction, setOwlReaction] = useState<'idle' | 'happy' | 'thinking' | 'explaining'>('idle');

  const MAX_ACADEMY_SCORE = 300;

  const handleNavigate = (section: NavSection) => {
    setCurrentSection(section);
    // Contextual owl quip per section
    if (section === 'instructions') {
      setOwlTip(OWL_QUOTES.welcome);
      setOwlReaction('idle');
    } else if (section === 'vocabulary') {
      setOwlTip("Vocabulary is power! Click any word to hear natural pronunciation and conditional examples!");
      setOwlReaction('explaining');
    } else if (section === 'grammar') {
      setOwlTip(OWL_QUOTES.zeroTip);
      setOwlReaction('explaining');
    } else if (section === 'video') {
      setOwlTip("Watch our school episodes! Notice how students use conditionals during break time!");
      setOwlReaction('idle');
    } else if (section === 'practice') {
      setOwlTip("Time to test your knowledge! Complete all 4 games to earn maximum honors on your report card!");
      setOwlReaction('happy');
    }
  };

  const handleScoreUpdate = (points: number) => {
    setTotalScore((prev) => Math.min(prev + points, MAX_ACADEMY_SCORE));
  };

  const handleOwlFeedback = (quote: string, reaction: 'happy' | 'thinking' | 'explaining') => {
    setOwlTip(quote);
    setOwlReaction(reaction);
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sound.setMuted(nextMuted);
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-[#070C1B] text-slate-100 overflow-x-hidden selection:bg-[#00F0FF] selection:text-[#070C1B]">
      {/* Interactive Electronic Cyber Network Connections Background */}
      <ClassroomBackground />

      {/* Top Bar Navigation */}
      <Header
        currentSection={currentSection}
        onNavigate={handleNavigate}
        totalScore={totalScore}
        maxScore={MAX_ACADEMY_SCORE}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenCertificate={() => setIsCertificateOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 relative z-10">
        {/* Interactive Guide Mascot (Professor Hoot) - Present across all sessions */}
        <ProfessorHoot
          currentTip={owlTip}
          reaction={owlReaction}
          onNewTipRequested={() => sound.playOwlHoot()}
        />

        {/* Section Views */}
        {currentSection === 'instructions' && (
          <InstructionsSection
            onStartLearning={handleNavigate}
            totalScore={totalScore}
            maxScore={MAX_ACADEMY_SCORE}
          />
        )}

        {currentSection === 'vocabulary' && (
          <VocabularySection />
        )}

        {currentSection === 'grammar' && (
          <GrammarMasterclass />
        )}

        {currentSection === 'video' && (
          <InteractiveVideoLesson onEarnBonus={handleScoreUpdate} />
        )}

        {currentSection === 'practice' && (
          <PracticeHub
            onScoreUpdate={handleScoreUpdate}
            onOwlFeedback={handleOwlFeedback}
          />
        )}
      </main>

      {/* Official Certificate & Report Card Modal */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        totalScore={totalScore}
        maxScore={MAX_ACADEMY_SCORE}
      />

      {/* Footer in #111827 matching the Academy Header */}
      <footer className="border-t border-slate-800 bg-[#111827] text-slate-300 py-6 text-xs text-center relative z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-semibold flex items-center justify-center gap-1.5 text-slate-200">
            <span>© Professor Hoot’s Digital Academy</span>
            <span className="text-slate-500">·</span>
            <span className="text-[#3B82F6]">Zero vs. First Conditional Masterclass</span>
          </p>
          <div className="flex items-center gap-3 text-slate-400 font-medium">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#2563EB] inline-block" />
              Digital ESL Academy
            </span>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <span>🇬🇧 100% English Curriculum</span>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <span>🏆 Interactive Audio & Games</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
