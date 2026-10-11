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
      pitch: 1.15,
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
      className={`cyber-card border border-cyan-500/30 rounded-3xl p-5 sm:p-6 shadow-[0_15px_35px_rgba(0,0,0,0.6)] backdrop-blur-xl flex flex-col sm:flex-row items-center gap-6 transition-all ${className}`}
      aria-label="Professor Hoot Interactive Mascot"
    >
      {/* Freestanding Owl Character - 3D Robot Mentor */}
      <div className="relative shrink-0 flex flex-col items-center">
        <div
          onClick={handleSpeak}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleSpeak();
          }}
          className={`relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 cursor-pointer group transition-all duration-300 filter drop-shadow-[0_12px_24px_rgba(0,240,255,0.3)] select-none flex items-center justify-center ${
            isSpeaking
              ? 'animate-gentle-bounce scale-105'
              : 'hover:scale-105 hover:-rotate-2'
          }`}
          title="Click Professor Hoot to hear him speak!"
        >
          {!imgError ? (
            <img
              src={owlAvatarUrl}
              alt="Professor Hoot, academic robot mentor owl"
              className="w-full h-full object-contain filter drop-shadow-md rounded-2xl"
              referrerPolicy="no-referrer"
              onError={() => {
                setImgError(true);
              }}
            />
          ) : (
            <svg
              viewBox="0 0 120 120"
              className="w-full h-full drop-shadow-sm select-none"
              fill="none"
            >
              <ellipse cx="48" cy="110" rx="9" ry="5" fill="#D97706" />
              <ellipse cx="72" cy="110" rx="9" ry="5" fill="#D97706" />
              <ellipse cx="60" cy="72" rx="34" ry="38" fill="#B45309" />
              <ellipse cx="60" cy="76" rx="24" ry="26" fill="#FDE68A" />
              <path d="M 28 62 Q 20 78 28 94 Q 38 82 34 68 Z" fill="#92400E" />
              <path d="M 92 62 Q 100 78 92 94 Q 82 82 86 68 Z" fill="#92400E" />
              <line x1="90" y1="72" x2="114" y2="42" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M 44 68 L 60 88 L 76 68 L 72 88 L 48 88 Z" fill="#78350F" opacity="0.4" />
              <circle cx="60" cy="76" r="2" fill="#FEF3C7" />
              <circle cx="60" cy="83" r="2" fill="#FEF3C7" />
              <circle cx="46" cy="52" r="13" fill="#FFFFFF" stroke="#92400E" strokeWidth="2" />
              <circle cx="74" cy="52" r="13" fill="#FFFFFF" stroke="#92400E" strokeWidth="2" />
              <circle cx="46" cy="52" r="7" fill="#451A03" />
              <circle cx="74" cy="52" r="7" fill="#451A03" />
              <circle cx="48" cy="50" r="2.5" fill="#FFFFFF" />
              <circle cx="76" cy="50" r="2.5" fill="#FFFFFF" />
              <circle cx="46" cy="52" r="14" stroke="#00F0FF" strokeWidth="3" fill="none" />
              <circle cx="74" cy="52" r="14" stroke="#00F0FF" strokeWidth="3" fill="none" />
              <line x1="60" y1="52" x2="60" y2="52" stroke="#00F0FF" strokeWidth="3" />
              <polygon points="60,56 54,64 66,64" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
              <polygon points="54,68 66,68 60,72" fill="#EF4444" />
              <polygon points="54,76 66,76 60,72" fill="#EF4444" />
              <circle cx="60" cy="72" r="2.5" fill="#DC2626" />
              <polygon points="60,20 18,34 60,42 102,34" fill="#1E293B" />
              <polygon points="46,38 74,38 70,47 50,47" fill="#0F172A" />
              <line x1="60" y1="31" x2="94" y2="40" stroke="#FBBF24" strokeWidth="2.5" />
              <circle cx="94" cy="42" r="3" fill="#FBBF24" />
            </svg>
          )}

          {isSpeaking && (
            <div className="absolute -top-1 -right-1 flex items-center gap-1 bg-cyan-400 text-slate-950 font-black px-2 py-0.5 rounded-full text-[10px] shadow-lg animate-pulse">
              <span>Transmitting...</span>
            </div>
          )}
        </div>

        <div className="mt-2 text-center">
          <p className="text-xs sm:text-sm font-extrabold text-white font-display flex items-center gap-1 justify-center">
            <span>Prof. Hoot AI</span>
            <span className="text-cyan-400">⚡</span>
          </p>
          <p className="text-[10px] text-cyan-300 font-semibold">Click to hear neural voice!</p>
        </div>
      </div>

      {/* Crisp White Speech Bubble (High Contrast for Easy Reading) */}
      <div className="flex-1 w-full bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xl relative text-left text-slate-900">
        <div className="hidden sm:block absolute -left-2.5 top-8 w-4 h-4 bg-white border-l border-b border-slate-200 rotate-45" />

        <div className="flex items-start justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
            <MessageCircle className="w-4 h-4 text-[#2563EB]" />
            <span>Professor’s Neural Advice:</span>
            {reaction === 'happy' && (
              <span className="text-emerald-700 font-bold text-[11px] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Correct logic!
              </span>
            )}
            {reaction === 'thinking' && (
              <span className="text-[#8B5CF6] font-bold text-[11px] bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                Rule Analysis
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Sucee-style Waveform indicator */}
            {isSpeaking && (
              <div className="flex items-center gap-0.5 h-4 px-2 py-0.5 bg-cyan-50 rounded-full border border-cyan-200">
                <span className="w-0.5 bg-cyan-500 rounded-full animate-wave-1" />
                <span className="w-0.5 bg-cyan-500 rounded-full animate-wave-2" />
                <span className="w-0.5 bg-blue-600 rounded-full animate-wave-3" />
                <span className="w-0.5 bg-cyan-500 rounded-full animate-wave-4" />
              </div>
            )}

            <button
              onClick={handleSpeak}
              className={`px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-colors ${
                isSpeaking
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow-md'
                  : 'text-[#2563EB] hover:bg-blue-50 border border-blue-200 font-semibold'
              }`}
              title="Listen to Professor Hoot read this tip aloud"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span className="text-[11px] font-semibold">{isSpeaking ? 'Speaking...' : 'Listen'}</span>
            </button>

            <button
              onClick={handleNextTip}
              className="p-1.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
              title="Next Grammar Tip"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans font-medium">
          "{activeMessage}"
        </p>

        <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1 text-[#8B5CF6] font-semibold">
            <Sparkles className="w-3 h-3 text-[#8B5CF6]" />
            <span>High-Tech ESL Academy Companion</span>
          </span>
          <button
            onClick={handleSpeak}
            className="text-cyan-600 font-bold hover:underline"
          >
            Hoot advice!
          </button>
        </div>
      </div>
    </aside>
  );
};
