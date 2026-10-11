import React from 'react';
import { NavSection } from '../types';
import { Volume2, VolumeX, Award } from 'lucide-react';
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
    <header className="sticky top-0 z-40 bg-amber-50/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark with playful motion */}
        <button
          onClick={() => {
            sound.playClick();
            onNavigate('instructions');
          }}
          className="text-left font-display text-xl font-extrabold tracking-tight text-amber-950 hover:text-amber-800 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 group"
        >
          <span className="text-2xl inline-block group-hover:scale-125 transition-transform animate-gentle-bounce" role="img" aria-label="Owl">🦉</span>
          <span className="animate-title-float">Professor Hoot’s Academy</span>
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-amber-900">
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('instructions');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 ${
              currentSection === 'instructions'
                ? 'border-amber-600 text-amber-900 font-semibold'
                : 'border-transparent text-amber-800/80 hover:text-amber-950'
            }`}
          >
            Instructions
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('vocabulary');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 ${
              currentSection === 'vocabulary'
                ? 'border-amber-600 text-amber-900 font-semibold'
                : 'border-transparent text-amber-800/80 hover:text-amber-950'
            }`}
          >
            Vocabulary Bank
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('grammar');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 ${
              currentSection === 'grammar'
                ? 'border-amber-600 text-amber-900 font-semibold'
                : 'border-transparent text-amber-800/80 hover:text-amber-950'
            }`}
          >
            Grammar Masterclass
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('video');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 ${
              currentSection === 'video'
                ? 'border-amber-600 text-amber-900 font-semibold'
                : 'border-transparent text-amber-800/80 hover:text-amber-950'
            }`}
          >
            Video Lessons
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('practice');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 ${
              currentSection === 'practice'
                ? 'border-amber-600 text-amber-900 font-semibold'
                : 'border-transparent text-amber-800/80 hover:text-amber-950'
            }`}
          >
            Graded Practice
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleMute}
            aria-label={isMuted ? 'Unmute voice and audio effects' : 'Mute audio'}
            className="p-2 text-amber-800 hover:text-amber-950 hover:bg-amber-100 rounded-lg transition-colors"
            title={isMuted ? 'Audio Muted' : 'Audio Enabled'}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onOpenCertificate();
            }}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-amber-950 bg-amber-200/90 hover:bg-amber-300 border border-amber-300/80 rounded-lg transition-all shadow-xs whitespace-nowrap shrink-0 active:scale-95"
          >
            <Award className="w-4 h-4 text-amber-800" />
            <span className="hidden sm:inline">Report Card</span>
            <span className="font-mono tabular-nums bg-amber-900/10 px-1.5 py-0.5 rounded text-[11px]">
              {totalScore}/{maxScore}
            </span>
          </button>
        </div>

      </div>

      {/* Mobile Navigation Sub-bar */}
      <div className="md:hidden flex items-center justify-around border-t border-amber-200/60 px-2 py-2 overflow-x-auto text-xs font-medium text-amber-900">
        <button
          onClick={() => onNavigate('instructions')}
          className={`px-2 py-1 rounded whitespace-nowrap ${currentSection === 'instructions' ? 'bg-amber-200 font-bold' : ''}`}
        >
          Guide
        </button>
        <button
          onClick={() => onNavigate('vocabulary')}
          className={`px-2 py-1 rounded whitespace-nowrap ${currentSection === 'vocabulary' ? 'bg-amber-200 font-bold' : ''}`}
        >
          Vocab
        </button>
        <button
          onClick={() => onNavigate('grammar')}
          className={`px-2 py-1 rounded whitespace-nowrap ${currentSection === 'grammar' ? 'bg-amber-200 font-bold' : ''}`}
        >
          Grammar
        </button>
        <button
          onClick={() => onNavigate('video')}
          className={`px-2 py-1 rounded whitespace-nowrap ${currentSection === 'video' ? 'bg-amber-200 font-bold' : ''}`}
        >
          Video
        </button>
        <button
          onClick={() => onNavigate('practice')}
          className={`px-2 py-1 rounded whitespace-nowrap ${currentSection === 'practice' ? 'bg-amber-200 font-bold' : ''}`}
        >
          Games
        </button>
      </div>
    </header>
  );
};
