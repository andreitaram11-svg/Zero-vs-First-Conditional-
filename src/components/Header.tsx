import React from 'react';
import { NavSection } from '../types';
import { Volume2, VolumeX, Award, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

interface HeaderProps {
  currentSection: NavSection;
  onNavigate: (section: NavSection) => void;
  totalScore: number;
  maxScore: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenCertificate: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSection,
  onNavigate,
  totalScore,
  maxScore,
  isMuted,
  onToggleMute,
  onOpenCertificate
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#070D1F]/90 backdrop-blur-xl border-b border-cyan-500/20 shadow-[0_4px_25px_rgba(0,0,0,0.6)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        
        {/* Zone 1: Wordmark with Futuristic Tech Owl Icon */}
        <button
          onClick={() => {
            sound.playClick();
            onNavigate('instructions');
          }}
          className="text-left font-display text-lg sm:text-xl font-extrabold tracking-tight text-white hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-3 group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5 shadow-[0_0_12px_rgba(0,240,255,0.4)] flex items-center justify-center">
            <span className="text-xl inline-block group-hover:scale-110 transition-transform animate-gentle-bounce" role="img" aria-label="Owl">🦉</span>
          </div>
          <span className="animate-title-float flex items-center gap-1.5">
            <span>Professor Hoot</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-mono font-bold tracking-wider">
              AI
            </span>
          </span>
        </button>

        {/* Zone 2: Navigation Links with Tech Pill Indicators (as seen in Sucee reference) */}
        <nav className="hidden md:flex items-center gap-2 text-xs font-semibold">
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('instructions');
            }}
            className={`whitespace-nowrap shrink-0 transition-all px-4 py-2 rounded-xl ${
              currentSection === 'instructions'
                ? 'bg-gradient-to-r from-cyan-500/25 to-blue-600/35 text-white font-bold border border-cyan-400/60 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent'
            }`}
          >
            Instructions
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('vocabulary');
            }}
            className={`whitespace-nowrap shrink-0 transition-all px-4 py-2 rounded-xl ${
              currentSection === 'vocabulary'
                ? 'bg-gradient-to-r from-cyan-500/25 to-blue-600/35 text-white font-bold border border-cyan-400/60 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent'
            }`}
          >
            Vocabulary Bank
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('grammar');
            }}
            className={`whitespace-nowrap shrink-0 transition-all px-4 py-2 rounded-xl ${
              currentSection === 'grammar'
                ? 'bg-gradient-to-r from-cyan-500/25 to-blue-600/35 text-white font-bold border border-cyan-400/60 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent'
            }`}
          >
            Grammar Masterclass
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('video');
            }}
            className={`whitespace-nowrap shrink-0 transition-all px-4 py-2 rounded-xl ${
              currentSection === 'video'
                ? 'bg-gradient-to-r from-cyan-500/25 to-blue-600/35 text-white font-bold border border-cyan-400/60 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent'
            }`}
          >
            Videos & Audio
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('practice');
            }}
            className={`whitespace-nowrap shrink-0 transition-all px-4 py-2 rounded-xl ${
              currentSection === 'practice'
                ? 'bg-gradient-to-r from-cyan-500/25 to-blue-600/35 text-white font-bold border border-cyan-400/60 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent'
            }`}
          >
            Graded Games
          </button>
        </nav>

        {/* Zone 3: Mute toggle + Primary Golden Yellow CTA Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleMute}
            aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-xl transition-colors border border-slate-700/80 hover:border-cyan-500/40"
            title={isMuted ? 'Audio Muted' : 'Audio Enabled'}
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-slate-400" /> : <Volume2 className="w-5 h-5 text-cyan-400 animate-pulse" />}
          </button>

          {/* Golden Yellow #FBBF24 Primary Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenCertificate();
            }}
            className="flex items-center gap-2 px-4 py-2 text-xs font-black text-[#070C1B] bg-gradient-to-r from-amber-400 to-[#FBBF24] hover:from-amber-300 hover:to-amber-400 border border-amber-300/80 rounded-xl transition-all shadow-md shadow-amber-400/25 whitespace-nowrap shrink-0 active:scale-95"
          >
            <Award className="w-4 h-4 text-[#070C1B]" />
            <span className="hidden sm:inline">Report Card</span>
            <span className="font-mono tabular-nums bg-slate-950/20 px-1.5 py-0.5 rounded text-[11px] font-black">
              {totalScore}/{maxScore}
            </span>
          </button>
        </div>

      </div>

      {/* Mobile Navigation Sub-bar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-800 px-2 py-2 overflow-x-auto text-xs font-medium bg-[#070D1F]">
        <button
          onClick={() => onNavigate('instructions')}
          className={`px-3 py-1 rounded-lg whitespace-nowrap transition-colors ${
            currentSection === 'instructions'
              ? 'bg-cyan-500 text-slate-950 font-bold'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          Guide
        </button>
        <button
          onClick={() => onNavigate('vocabulary')}
          className={`px-3 py-1 rounded-lg whitespace-nowrap transition-colors ${
            currentSection === 'vocabulary'
              ? 'bg-cyan-500 text-slate-950 font-bold'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          Vocab
        </button>
        <button
          onClick={() => onNavigate('grammar')}
          className={`px-3 py-1 rounded-lg whitespace-nowrap transition-colors ${
            currentSection === 'grammar'
              ? 'bg-cyan-500 text-slate-950 font-bold'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          Grammar
        </button>
        <button
          onClick={() => onNavigate('video')}
          className={`px-3 py-1 rounded-lg whitespace-nowrap transition-colors ${
            currentSection === 'video'
              ? 'bg-cyan-500 text-slate-950 font-bold'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          Videos
        </button>
        <button
          onClick={() => onNavigate('practice')}
          className={`px-3 py-1 rounded-lg whitespace-nowrap transition-colors ${
            currentSection === 'practice'
              ? 'bg-cyan-500 text-slate-950 font-bold'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          Games
        </button>
      </div>
    </header>
  );
};
