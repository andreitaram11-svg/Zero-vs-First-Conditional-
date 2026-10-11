import React, { useState } from 'react';
import { Volume2, Sparkles, MessageCircle, RefreshCw } from 'lucide-react';
import { sound, speakSentence } from '../utils/audio';
import { OWL_QUOTES } from '../data/curriculum';

interface ProfessorHootProps {
  currentTip?: string;
  reaction?: 'idle' | 'happy' | 'thinking' | 'explaining';
  onNewTipRequested?: () => void;
  className?: string;
}

export const ProfessorHoot: React.FC<ProfessorHootProps> = ({
  currentTip = OWL_QUOTES.welcome,
  reaction = 'idle',
  onNewTipRequested,
  className = ''
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);

  const tipsList = [
    OWL_QUOTES.welcome,
    OWL_QUOTES.zeroTip,
    OWL_QUOTES.firstTip,
    OWL_QUOTES.commonMistake,
    "Rule Reminder: In Zero Conditional, both parts use the Present Simple because the rule is 100% constant!",
    "Future Possibility: In First Conditional, use 'will + verb' only in the result clause. Never say 'if it will rain'!",
    "Comma Tip: If the 'if' clause comes first, use a comma! E.g. 'If the bell rings, we exit.' But: 'We exit if the bell rings' has no comma!"
  ];

  const activeMessage = currentTip || tipsList[tipIndex % tipsList.length];

  const handleSpeak = () => {
    sound.playOwlHoot();
    setIsSpeaking(true);
    speakSentence(activeMessage, {
      pitch: 1.15, // slightly wise scholarly pitch
      rate: 0.92,
      onEnd: () => setIsSpeaking(false)
    });
  };

  const handleNextTip = () => {
    sound.playClick();
    setTipIndex((prev) => (prev + 1) % tipsList.length);
    if (onNewTipRequested) {
      onNewTipRequested();
    }
  };

  return (
    <aside
      className={`bg-amber-100/90 border border-amber-300 rounded-2xl p-4 shadow-sm backdrop-blur-xs flex flex-col sm:flex-row items-center gap-4 transition-all ${className}`}
      aria-label="Professor Hoot Interactive Mascot"
    >
      {/* Freestanding Owl Character - Out of the circle & 1cm larger */}
      <div className="relative shrink-0 flex flex-col items-center">
        <div
          onClick={handleSpeak}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleSpeak();
          }}
          className={`relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 cursor-pointer group transition-all duration-300 filter drop-shadow-md select-none ${
            isSpeaking
              ? 'animate-gentle-bounce scale-105'
              : 'hover:scale-105 hover:-rotate-2'
          }`}
          title="Click Professor Hoot to hear him speak!"
        >
          {/* Owl Character cut out cleanly without circle */}
          <img
            src="/src/assets/images/professor_hoot_avatar_1791681790591.jpg"
            alt="Professor Hoot, academic owl professor guide"
            className="w-full h-full object-contain mix-blend-multiply"
            referrerPolicy="no-referrer"
          />

          {/* Sound waves indicator when speaking */}
          {isSpeaking && (
            <div className="absolute -top-1 -right-1 flex items-center gap-1 bg-amber-400 text-amber-950 font-bold px-2 py-0.5 rounded-full text-[10px] shadow-sm animate-pulse">
              <span>Hoot!</span>
            </div>
          )}
        </div>

        {/* Mascot Name Banner */}
        <div className="mt-0 text-center">
          <p className="text-xs sm:text-sm font-extrabold text-amber-950 font-display flex items-center gap-1 justify-center">
            <span>Prof. Hoot</span>
            <span className="text-amber-600 animate-gentle-wiggle">🎓</span>
          </p>
          <p className="text-[10px] text-amber-800/90 font-medium">Click to hear advice!</p>
        </div>
      </div>

      {/* Mascot Speech Bubble */}
      <div className="flex-1 w-full bg-white/95 rounded-xl p-3.5 border border-amber-200/90 shadow-2xs relative">
        {/* Little Speech Triangle */}
        <div className="hidden sm:block absolute -left-2 top-6 w-3 h-3 bg-white border-l border-b border-amber-200 rotate-45" />

        <div className="flex items-start justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-900">
            <MessageCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Professor’s Advice:</span>
            {reaction === 'happy' && (
              <span className="text-emerald-700 font-medium text-[11px] bg-emerald-50 px-1.5 py-0.5 rounded">
                Great job!
              </span>
            )}
            {reaction === 'thinking' && (
              <span className="text-amber-700 font-medium text-[11px] bg-amber-50 px-1.5 py-0.5 rounded">
                Thinking...
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleSpeak}
              className={`p-1.5 rounded-lg text-xs flex items-center gap-1 transition-colors ${
                isSpeaking
                  ? 'bg-amber-600 text-white font-medium'
                  : 'text-amber-800 hover:bg-amber-100 hover:text-amber-950'
              }`}
              title="Listen to Professor Hoot read this tip aloud"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span className="text-[11px] hidden sm:inline">{isSpeaking ? 'Speaking...' : 'Listen'}</span>
            </button>

            <button
              onClick={handleNextTip}
              className="p-1.5 rounded-lg text-amber-800 hover:bg-amber-100 hover:text-amber-950 transition-colors"
              title="Next Grammar Tip"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
          "{activeMessage}"
        </p>

        <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-amber-800/80">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>Interactive Academy Companion</span>
          </span>
          <button
            onClick={handleSpeak}
            className="text-amber-900 font-semibold underline decoration-amber-400 hover:text-amber-950"
          >
            Hoot at me!
          </button>
        </div>
      </div>
    </aside>
  );
};
