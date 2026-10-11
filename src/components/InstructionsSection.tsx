import React from 'react';
import { NavSection } from '../types';
import { BookOpen, CheckCircle2, Play, Award, Volume2, Sparkles, HelpCircle } from 'lucide-react';
import { sound, speakSentence } from '../utils/audio';
import { classroomUrl } from '../utils/assets';

interface InstructionsSectionProps {
  onStartLearning: (target: NavSection) => void;
}

export const InstructionsSection: React.FC<InstructionsSectionProps> = ({ onStartLearning }) => {
  return (
    <div className="space-y-8">
      {/* Hero Welcome Banner */}
      <section className="relative rounded-3xl overflow-hidden border border-amber-300 shadow-md bg-linear-to-r from-amber-900/90 via-amber-800/90 to-amber-950 text-white">
        <div className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none">
          <img
            src={classroomUrl}
            alt="Classroom background"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative p-6 sm:p-10 z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-200 text-xs font-semibold mb-4 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>ESL Mastery Course: School & Recess Edition</span>
          </div>

          {/* Moving Animated Title */}
          <div className="animate-title-float">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white leading-tight filter drop-shadow-md">
              <span className="inline-block animate-letter-pop hover:scale-105 transition-transform text-white">
                Zero Conditional
              </span>{' '}
              <span className="inline-block mx-1.5 px-3 py-1 rounded-2xl bg-amber-400 text-amber-950 font-black text-2xl sm:text-3xl align-middle shadow-md transform -rotate-3 animate-gentle-wiggle">
                vs.
              </span>{' '}
              <span className="inline-block animate-letter-pop [animation-delay:400ms] hover:scale-105 transition-transform text-amber-200">
                First Conditional
              </span>
            </h1>
          </div>

          <p className="mt-4 text-base sm:text-lg text-amber-100/90 leading-relaxed font-sans">
            Welcome to high school grammar made clear, practical, and fun! Learn how to talk about permanent school rules, habitual consequences, and exciting future recess plans with Professor Hoot.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <button
              onClick={() => {
                sound.playClick();
                onStartLearning('vocabulary');
              }}
              className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold rounded-xl shadow-sm transition-all flex items-center gap-2 active:scale-95 text-sm"
            >
              <BookOpen className="w-4 h-4" />
              <span>Step 1: Explore Vocabulary</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onStartLearning('grammar');
              }}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold rounded-xl transition-all flex items-center gap-2 active:scale-95 text-sm"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Step 2: Grammar Masterclass</span>
            </button>

            <button
              onClick={() => {
                sound.playBell();
                speakSentence("Welcome to the Academy! Let's conquer Zero and First Conditional!");
              }}
              className="px-4 py-3 bg-amber-600/40 hover:bg-amber-600/60 text-amber-100 border border-amber-400/30 font-medium rounded-xl transition-all flex items-center gap-2 text-sm"
              title="Test audio"
            >
              <Volume2 className="w-4 h-4" />
              <span>Hear Welcome Chime</span>
            </button>
          </div>
        </div>
      </section>

      {/* Academy Roadmap (4 Steps) */}
      <section className="bg-white rounded-3xl border border-amber-200/90 p-6 sm:p-8 shadow-xs">
        <div className="animate-title-float">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 tracking-tight mb-2 flex items-center gap-2">
            <span>Your 4-Step Learning Path</span>
            <span className="text-xl animate-gentle-wiggle">🎒</span>
          </h2>
        </div>
        <p className="text-sm text-slate-600 mb-6">
          Follow these structured stages to build vocabulary, understand grammatical logic, watch realistic school scenarios, and achieve mastery.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="border border-amber-200 rounded-2xl p-5 bg-amber-50/50 flex flex-col justify-between hover:border-amber-400 transition-colors">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-sm mb-3">
                01
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-1">Vocabulary Bank</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Discover school and recess words (bell, recess, locker, cafeteria, lab coat, detention) with native audio pronunciation.
              </p>
            </div>
            <button
              onClick={() => onStartLearning('vocabulary')}
              className="mt-4 text-xs font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1"
            >
              <span>Open Vocab Bank</span>
              <span>→</span>
            </button>
          </div>

          {/* Card 2 */}
          <div className="border border-emerald-200 rounded-2xl p-5 bg-emerald-50/50 flex flex-col justify-between hover:border-emerald-400 transition-colors">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-200 text-emerald-900 flex items-center justify-center font-bold text-sm mb-3">
                02
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-1">Grammar Masterclass</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Master the distinction: Zero Conditional for 100% constant rules vs. First Conditional for realistic future possibilities.
              </p>
            </div>
            <button
              onClick={() => onStartLearning('grammar')}
              className="mt-4 text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
            >
              <span>Explore Rules</span>
              <span>→</span>
            </button>
          </div>

          {/* Card 3 */}
          <div className="border border-sky-200 rounded-2xl p-5 bg-sky-50/50 flex flex-col justify-between hover:border-sky-400 transition-colors">
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-200 text-sky-900 flex items-center justify-center font-bold text-sm mb-3">
                03
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-1">Video & Audio Lessons</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Watch two school episodes: "The Chemistry Lab Rules" and "The Recess Soccer Dilemma" with interactive speech and quizzes.
              </p>
            </div>
            <button
              onClick={() => onStartLearning('video')}
              className="mt-4 text-xs font-semibold text-sky-800 hover:text-sky-950 flex items-center gap-1"
            >
              <span>Watch Episodes</span>
              <span>→</span>
            </button>
          </div>

          {/* Card 4 */}
          <div className="border border-indigo-200 rounded-2xl p-5 bg-indigo-50/50 flex flex-col justify-between hover:border-indigo-400 transition-colors">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-200 text-indigo-900 flex items-center justify-center font-bold text-sm mb-3">
                04
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-1">4 Graded Games</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Match Meanings, Put Sentences in Order, Multiple Choice, and Complete Blanks to earn your Mastery Certificate!
              </p>
            </div>
            <button
              onClick={() => onStartLearning('practice')}
              className="mt-4 text-xs font-semibold text-indigo-800 hover:text-indigo-950 flex items-center gap-1"
            >
              <span>Play & Earn Points</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Quick Comparison Cheat Sheet */}
      <section className="bg-white rounded-3xl border border-amber-200/90 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 mb-4 animate-title-float">
          <HelpCircle className="w-6 h-6 text-amber-700 animate-gentle-wiggle" />
          <h2 className="text-xl sm:text-2xl font-extrabold font-display text-slate-900 tracking-tight">
            Quick Cheat Sheet: What’s the difference?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Zero Box */}
          <div className="border-2 border-emerald-300 rounded-2xl p-5 bg-emerald-50/30">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-emerald-950 text-base font-display">Zero Conditional</span>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md">
                100% Certain / General Truth
              </span>
            </div>
            <p className="text-xs text-slate-600 mb-3">
              Used for permanent facts, laws of nature, standing school rules, and automatic habits.
            </p>
            <div className="p-3 bg-white rounded-xl border border-emerald-200 text-xs font-mono text-emerald-950 mb-3">
              <span className="font-bold text-emerald-700">Formula:</span> If + Present Simple, Present Simple.
            </div>
            <div className="text-xs text-slate-700 space-y-1 bg-emerald-100/40 p-3 rounded-xl border border-emerald-200/60">
              <p className="font-semibold text-emerald-900">School Example:</p>
              <p className="italic">"If the school bell rings, students walk to their classrooms."</p>
              <p className="text-[11px] text-slate-500 mt-1">→ This happens every single school day!</p>
            </div>
          </div>

          {/* First Box */}
          <div className="border-2 border-amber-300 rounded-2xl p-5 bg-amber-50/30">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-amber-950 text-base font-display">First Conditional</span>
              <span className="text-xs font-semibold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-md">
                Real Future Possibility
              </span>
            </div>
            <p className="text-xs text-slate-600 mb-3">
              Used for specific future situations, realistic plans, warnings, and predictions.
            </p>
            <div className="p-3 bg-white rounded-xl border border-amber-200 text-xs font-mono text-amber-950 mb-3">
              <span className="font-bold text-amber-700">Formula:</span> If + Present Simple, WILL / WON'T + Base Verb.
            </div>
            <div className="text-xs text-slate-700 space-y-1 bg-amber-100/40 p-3 rounded-xl border border-amber-200/60">
              <p className="font-semibold text-amber-900">School Example:</p>
              <p className="italic">"If it rains during recess tomorrow, we will play basketball inside."</p>
              <p className="text-[11px] text-slate-500 mt-1">→ A specific real prediction for tomorrow’s break!</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
