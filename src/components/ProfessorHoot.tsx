import React, { useState } from 'react';
import { Volume2, Sparkles, MessageCircle, RefreshCw } from 'lucide-react';
import { sound, speakSentence } from '../utils/audio';
import { OWL_QUOTES } from '../data/curriculum';
import { owlAvatarUrl } from '../utils/assets';

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
  const [imgError, setImgError] = useState(false);

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
          className={`relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 cursor-pointer group transition-all duration-300 filter drop-shadow-md select-none flex items-center justify-center ${
            isSpeaking
              ? 'animate-gentle-bounce scale-105'
              : 'hover:scale-105 hover:-rotate-2'
          }`}
          title="Click Professor Hoot to hear him speak!"
        >
          {!imgError ? (
            /* Owl Character cut out cleanly without circle - using bundled asset */
            <img
              src={owlAvatarUrl}
              alt="Professor Hoot, academic owl professor guide"
              className="w-full h-full object-contain mix-blend-multiply"
              referrerPolicy="no-referrer"
              onError={() => {
                setImgError(true);
              }}
            />
          ) : (
            /* Resilient SVG Owl Fallback ensuring zero broken image frames */
            <svg
              viewBox="0 0 120 120"
              className="w-full h-full drop-shadow-sm select-none"
              fill="none"
            >
              {/* Feet */}
              <ellipse cx="48" cy="110" rx="9" ry="5" fill="#D97706" />
              <ellipse cx="72" cy="110" rx="9" ry="5" fill="#D97706" />
              {/* Body */}
              <ellipse cx="60" cy="72" rx="34" ry="38" fill="#B45309" />
              {/* Belly */}
              <ellipse cx="60" cy="76" rx="24" ry="26" fill="#FDE68A" />
              {/* Wings */}
              <path d="M 28 62 Q 20 78 28 94 Q 38 82 34 68 Z" fill="#92400E" />
              <path d="M 92 62 Q 100 78 92 94 Q 82 82 86 68 Z" fill="#92400E" />
              {/* Pointer Stick */}
              <line x1="90" y1="72" x2="114" y2="42" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" />
              {/* Tweed Vest */}
              <path d="M 44 68 L 60 88 L 76 68 L 72 88 L 48 88 Z" fill="#78350F" opacity="0.4" />
              <circle cx="60" cy="76" r="2" fill="#FEF3C7" />
              <circle cx="60" cy="83" r="2" fill="#FEF3C7" />
              {/* Eyes */}
              <circle cx="46" cy="52" r="13" fill="#FFFFFF" stroke="#92400E" strokeWidth="2" />
              <circle cx="74" cy="52" r="13" fill="#FFFFFF" stroke="#92400E" strokeWidth="2" />
              <circle cx="46" cy="52" r="7" fill="#451A03" />
              <circle cx="74" cy="52" r="7" fill="#451A03" />
              <circle cx="48" cy="50" r="2.5" fill="#FFFFFF" />
              <circle cx="76" cy="50" r="2.5" fill="#FFFFFF" />
              {/* Round Spectacles */}
              <circle cx="46" cy="52" r="14" stroke="#F59E0B" strokeWidth="3" fill="none" />
              <circle cx="74" cy="52" r="14" stroke="#F59E0B" strokeWidth="3" fill="none" />
              <line x1="60" y1="52" x2="60" y2="52" stroke="#F59E0B" strokeWidth="3" />
              {/* Beak */}
              <polygon points="60,56 54,64 66,64" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
              {/* Red Bowtie */}
              <polygon points="54,68 66,68 60,72" fill="#EF4444" />
              <polygon points="54,76 66,76 60,72" fill="#EF4444" />
              <circle cx="60" cy="72" r="2.5" fill="#DC2626" />
              {/* Mortarboard Graduation Cap */}
              <polygon points="60,20 18,34 60,42 102,34" fill="#1E293B" />
              <polygon points="46,38 74,38 70,47 50,47" fill="#0F172A" />
              {/* Tassel */}
              <line x1="60" y1="31" x2="94" y2="40" stroke="#F59E0B" strokeWidth="2.5" />
              <circle cx="94" cy="42" r="3" fill="#F59E0B" />
            </svg>
          )}

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
