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
    <div className="min-h-screen flex flex-col relative bg-linear-to-b from-amber-100/90 via-sky-50/70 to-emerald-50/70 text-slate-800 overflow-x-hidden">
      {/* Playful School Classroom Background with Doodles, Sun, Pencils & Pennants */}
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
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 relative z-10">
        {/* Interactive Guide Mascot (Professor Hoot) - Present across all sessions! */}
        <ProfessorHoot
          currentTip={owlTip}
          reaction={owlReaction}
          onNewTipRequested={() => sound.playOwlHoot()}
        />

        {/* Section Views */}
        {currentSection === 'instructions' && (
          <InstructionsSection onStartLearning={handleNavigate} />
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

      {/* Footer */}
      <footer className="border-t border-amber-300/80 bg-white/90 backdrop-blur-xs py-6 text-xs text-amber-950 text-center relative z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-semibold flex items-center justify-center gap-1.5">
            <span>© Professor Hoot’s Grammar Academy</span>
            <span>·</span>
            <span>Zero vs. First Conditional Masterclass</span>
          </p>
          <div className="flex items-center gap-4 text-amber-900/90 font-medium">
            <span>🏫 Classroom Context</span>
            <span aria-hidden="true">·</span>
            <span>🇬🇧 All Lessons in English</span>
            <span aria-hidden="true">·</span>
            <span>🔔 Interactive Audio & Games</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
