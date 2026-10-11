import React, { useState } from 'react';
import { NavSection } from '../types';
import { BookOpen, Sparkles, Play, Gamepad2, ArrowRight, Volume2, HelpCircle, Star, Terminal, Cpu } from 'lucide-react';
import { sound, speakSentence } from '../utils/audio';
import { techOwlUrl } from '../utils/assets';

interface InstructionsSectionProps {
  onStartLearning: (target: NavSection) => void;
  progressPercent?: number;
  totalScore?: number;
  maxScore?: number;
}

export const InstructionsSection: React.FC<InstructionsSectionProps> = ({
  onStartLearning,
  totalScore = 0,
  maxScore = 300
}) => {
  const [quickPrompt, setQuickPrompt] = useState('If the school bell rings, class starts.');
  const percentage = Math.max(5, Math.min(100, Math.round((totalScore / maxScore) * 100)));

  return (
    <div className="space-y-12">
      {/* Hero Welcome Showcase: Sucee-Inspired Electric Blue Technological Hub */}
      <section className="relative rounded-3xl lg:rounded-4xl overflow-hidden border border-cyan-400/30 shadow-[0_20px_60px_rgba(0,82,254,0.35)] bg-gradient-to-br from-[#0052FE] via-[#0062FF] to-[#0A4BD6] text-white p-6 sm:p-10 lg:p-12">
        {/* Tech Dot Matrix Overlay (matches reference mockup) */}
        <div className="absolute inset-0 tech-dot-matrix pointer-events-none opacity-20" />
        
        {/* Soft Ambient Cyan Lighting Orbs */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-cyan-400/30 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300/25 rounded-full blur-[120px] pointer-events-none" />

        {/* Top Mini Tech Bar */}
        <div className="relative z-10 flex items-center justify-between pb-6 mb-4 border-b border-white/15">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-white text-xs font-bold backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-cyan-300 animate-pulse" />
              <span>AI Neural Academy v2.4</span>
            </div>
            <span className="hidden sm:inline-block text-xs text-blue-100 font-mono">
              // ZERO_VS_FIRST_CONDITIONAL
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-blue-100">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="hidden sm:inline">Online Mentor:</span>
            <span className="text-white font-bold">Professor Hoot</span>
          </div>
        </div>

        {/* Main 2-Column Hero Showcase */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Typography, Prompt Pill, and Specifications */}
          <div className="lg:col-span-7 text-left space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/20 text-cyan-200 text-xs font-bold mb-3 border border-cyan-300/30">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                <span>Choose your educational mentor & master English grammar</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-[1.08] filter drop-shadow-md">
                Professor Hoot
              </h1>
              <p className="text-xl sm:text-2xl font-bold text-cyan-200 mt-2 font-display">
                Zero Conditional <span className="text-amber-300">vs.</span> First Conditional
              </p>
            </div>

            <p className="text-sm sm:text-base text-blue-100 leading-relaxed font-sans max-w-xl">
              Master unconditional school rules & universal scientific facts (Zero), alongside realistic future recess possibilities & predictions (First) through interactive voice and 4 graded arcade games.
            </p>

            {/* Sucee-style Interactive Input / CTA Pill */}
            <div className="p-1.5 bg-white/95 rounded-2xl sm:rounded-full shadow-2xl flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-xl border border-white">
              <div className="flex-1 px-4 py-2 text-xs sm:text-sm text-slate-800 font-mono truncate flex items-center gap-2">
                <Terminal className="w-4 h-4 text-blue-600 shrink-0" />
                <input
                  type="text"
                  value={quickPrompt}
                  onChange={(e) => setQuickPrompt(e.target.value)}
                  placeholder="Type an English conditional sentence..."
                  className="w-full bg-transparent text-slate-900 font-sans text-xs sm:text-sm font-semibold focus:outline-none placeholder-slate-400"
                />
              </div>

              {/* Vibrant Amber/Orange CTA Action (matches Sucee orange pill button) */}
              <button
                onClick={() => {
                  sound.playClick();
                  onStartLearning('vocabulary');
                }}
                className="px-6 py-3.5 bg-gradient-to-r from-amber-400 to-[#F59E0B] hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm rounded-xl sm:rounded-full shadow-lg shadow-amber-500/30 transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95 group"
              >
                <span>Start Learning</span>
                <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Client Specs & Badges (from Sucee mockup) */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-blue-100 font-semibold">
              <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl backdrop-blur-md border border-white/15">
                <span className="text-lg">🖥️</span>
                <div>
                  <p className="text-white font-bold text-xs">Web Client</p>
                  <p className="text-[10px] text-cyan-200">Interactive Suite Active</p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl backdrop-blur-md border border-white/15">
                <span className="text-lg">⚡</span>
                <div>
                  <p className="text-white font-bold text-xs">Neural Grammar</p>
                  <p className="text-[10px] text-cyan-200">Real-time Audio & Games</p>
                </div>
              </div>

              <button
                onClick={() => {
                  sound.playBell();
                  speakSentence("Welcome to the Academy! Let's conquer Zero and First Conditional!");
                }}
                className="p-3 bg-white/15 hover:bg-white/25 text-white rounded-xl transition-all border border-white/20"
                title="Hear Audio Welcome"
              >
                <Volume2 className="w-5 h-5 text-cyan-200" />
              </button>
            </div>
          </div>

          {/* Right Column: 3D Robot Owl Mentor with Floating Waveform and Grade Card */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            
            {/* Floating Audio Waveform Pill (matches Sucee mockup speech bubble) */}
            <div className="absolute -top-4 -left-4 sm:left-4 z-20 bg-white rounded-2xl px-4 py-3 shadow-xl border border-slate-100 flex items-center gap-3 animate-gentle-bounce text-slate-900 select-none">
              <div className="w-8 h-8 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-500">
                <Volume2 className="w-4 h-4 text-cyan-600" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400">Speech Synth</p>
                {/* Animated Waveform equalizer bars */}
                <div className="flex items-center gap-1 h-5 pt-1">
                  <span className="w-1 bg-cyan-500 rounded-full animate-wave-1" />
                  <span className="w-1 bg-cyan-400 rounded-full animate-wave-2" />
                  <span className="w-1 bg-blue-600 rounded-full animate-wave-3" />
                  <span className="w-1 bg-cyan-400 rounded-full animate-wave-4" />
                  <span className="w-1 bg-cyan-500 rounded-full animate-wave-5" />
                </div>
              </div>
            </div>

            {/* Floating Course Grade Card (matches Sucee mockup rating) */}
            <div className="absolute top-8 -right-2 sm:right-2 z-20 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-3 shadow-xl border border-white/80 text-left text-slate-900 animate-gentle-wiggle select-none">
              <span className="text-[10px] font-bold text-slate-500 block">Course Grade</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xl font-black font-display text-slate-900">4.8</span>
                <div className="flex items-center text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
              </div>
            </div>

            {/* Center Robot Owl Avatar (High-res 3D character) */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 flex items-center justify-center filter drop-shadow-[0_25px_40px_rgba(0,0,0,0.45)] transition-transform hover:scale-105 duration-300">
              <img
                src={techOwlUrl}
                alt="Professor Hoot, futuristic 3D educational mentor robot owl"
                className="w-full h-full object-contain filter drop-shadow-2xl rounded-3xl"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Blueprint Wireframe Cards underneath (matches Sucee mockup front/side/back) */}
            <div className="mt-4 flex items-center gap-3 bg-white/10 px-4 py-2 rounded-2xl backdrop-blur-md border border-white/20">
              <div className="text-center px-2 py-1 rounded-lg bg-white/10">
                <span className="text-[10px] font-mono text-cyan-200 block font-bold">MODE 0</span>
                <span className="text-xs font-bold text-white">Zero Cond.</span>
              </div>
              <span className="text-white/40 font-bold">⇄</span>
              <div className="text-center px-2 py-1 rounded-lg bg-white/20 border border-cyan-400/50">
                <span className="text-[10px] font-mono text-amber-300 block font-bold">FRONT</span>
                <span className="text-xs font-bold text-white">Prof. Hoot</span>
              </div>
              <span className="text-white/40 font-bold">⇄</span>
              <div className="text-center px-2 py-1 rounded-lg bg-white/10">
                <span className="text-[10px] font-mono text-cyan-200 block font-bold">MODE 1</span>
                <span className="text-xs font-bold text-white">First Cond.</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Learning Path (Ruta de Aprendizaje): 4 Cyber Cards with Visible Numbers & Circuit Accents */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1.5">
              <Cpu className="w-4 h-4" />
              <span>Step-by-Step Curriculum</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-white tracking-tight">
              Learning Path (Ruta de Aprendizaje)
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Master both conditionals through 4 progressive stages designed for ESL students.
            </p>
          </div>

          {/* Overall Progress Badge */}
          <div className="cyber-card rounded-2xl px-5 py-3 flex items-center gap-3.5 shadow-lg border border-cyan-500/30">
            <span className="text-xs font-semibold text-slate-300">Academy Score:</span>
            <div className="w-28 bg-slate-800 rounded-full h-2.5 overflow-hidden border border-slate-700">
              <div
                className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="text-xs font-extrabold text-cyan-400 font-mono tabular-nums">
              {totalScore} / {maxScore} pts ({percentage}%)
            </span>
          </div>
        </div>

        {/* 4 Large High-Tech Cyber Cards with Consistent Borders, Prominent Icons and Visible Numbers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          
          {/* Card 1: Vocabulary */}
          <div className="cyber-card cyber-card-hover rounded-3xl p-7 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-3xl font-black font-mono text-cyan-400 drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]">
                  01
                </span>
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  <BookOpen className="w-7 h-7" />
                </div>
              </div>

              <h3 className="font-extrabold font-display text-xl text-white mb-2">
                Vocabulary
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                School, classroom & recess terms (bell, locker, lab coat, detention) with audio pronunciation and interactive flashcards.
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-slate-700/60">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-medium">
                <span>Database Status</span>
                <span className="font-bold text-cyan-400 font-mono">12 Words Loaded</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 mb-5 overflow-hidden border border-slate-700">
                <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full w-full" />
              </div>

              <button
                onClick={() => onStartLearning('vocabulary')}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-95"
              >
                <span>Explore Vocabulary</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: Grammar Masterclass */}
          <div className="cyber-card cyber-card-hover rounded-3xl p-7 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-3xl font-black font-mono text-violet-400 drop-shadow-[0_0_8px_rgba(139,92,246,0.4)]">
                  02
                </span>
                <div className="w-14 h-14 rounded-2xl bg-violet-500/15 border border-violet-400/30 text-violet-300 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  <Sparkles className="w-7 h-7" />
                </div>
              </div>

              <h3 className="font-extrabold font-display text-xl text-white mb-2">
                Grammar
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Side-by-side comparison matrix, verb tense formulas, sentence laboratory simulator, and the comma punctuation rule.
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-slate-700/60">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-medium">
                <span>Rules Explored</span>
                <span className="font-bold text-violet-400 font-mono">3 Core Modules</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 mb-5 overflow-hidden border border-slate-700">
                <div className="bg-gradient-to-r from-violet-500 to-purple-500 h-2 rounded-full w-4/5" />
              </div>

              <button
                onClick={() => onStartLearning('grammar')}
                className="w-full py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-violet-500/20 active:scale-95"
              >
                <span>Study Grammar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 3: Videos & Audio */}
          <div className="cyber-card cyber-card-hover rounded-3xl p-7 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-3xl font-black font-mono text-cyan-400 drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]">
                  03
                </span>
                <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-400/30 text-blue-300 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  <Play className="w-7 h-7" />
                </div>
              </div>

              <h3 className="font-extrabold font-display text-xl text-white mb-2">
                Videos & Audio
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Watch school laboratory and playground soccer episodes with live voice narration, subtitles, and interactive quiz stops.
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-slate-700/60">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-medium">
                <span>Episodes</span>
                <span className="font-bold text-cyan-400 font-mono">2 Video Lessons</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 mb-5 overflow-hidden border border-slate-700">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full w-3/5" />
              </div>

              <button
                onClick={() => onStartLearning('video')}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-95"
              >
                <span>Watch Episodes</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 4: Games & Practice */}
          <div className="cyber-card cyber-card-hover rounded-3xl p-7 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-3xl font-black font-mono text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]">
                  04
                </span>
                <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-400/30 text-amber-300 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  <Gamepad2 className="w-7 h-7" />
                </div>
              </div>

              <h3 className="font-extrabold font-display text-xl text-white mb-2">
                Games
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                4 graded games: Match Meaning, Sentence Order, Multiple Choice, and Complete Blanks to earn report card honors.
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-slate-700/60">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-medium">
                <span>Current Score</span>
                <span className="font-bold text-amber-400 font-mono">{totalScore} / {maxScore} pts</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 mb-5 overflow-hidden border border-slate-700">
                <div
                  className="bg-gradient-to-r from-amber-400 to-amber-500 h-2 rounded-full transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <button
                onClick={() => onStartLearning('practice')}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-[#F59E0B] hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 active:scale-95"
              >
                <span>Play Games</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Quick Comparison Cheat Sheet with Cyber Terminal Cards */}
      <section className="cyber-card rounded-3xl p-7 sm:p-9 shadow-xl border border-cyan-500/20">
        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="w-6 h-6 text-cyan-400" />
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
            Quick Cheat Sheet: Zero vs. First Conditional
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Zero Box */}
          <div className="border border-violet-500/30 rounded-2xl p-6 bg-slate-900/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-white text-lg font-display">Zero Conditional</span>
                <span className="text-xs font-bold text-violet-300 bg-violet-500/20 px-3 py-1 rounded-full border border-violet-400/40">
                  100% Constant / General Rule
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
                Used for permanent facts, laws of nature, standing school rules, and automatic habits.
              </p>
              
              <div className="p-4 bg-[#070C1B] rounded-xl text-xs sm:text-sm font-mono text-slate-100 mb-4 border border-violet-500/30">
                <span className="text-cyan-400 font-bold">Formula:</span> If + Present Simple, Present Simple.
              </div>

              <div className="text-xs sm:text-sm text-slate-200 space-y-1.5 bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                <p className="font-bold text-cyan-300">School Example:</p>
                <p className="italic text-slate-100">"If the school bell rings, students walk to their classrooms."</p>
                <p className="text-[11px] text-slate-400 mt-1">→ Standing policy: happens every single school day!</p>
              </div>
            </div>
          </div>

          {/* First Box */}
          <div className="border border-cyan-500/30 rounded-2xl p-6 bg-slate-900/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-white text-lg font-display">First Conditional</span>
                <span className="text-xs font-bold text-cyan-300 bg-cyan-500/20 px-3 py-1 rounded-full border border-cyan-400/40">
                  Real Future Possibility
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
                Used for specific future situations, realistic plans, warnings, and predictions.
              </p>

              <div className="p-4 bg-[#070C1B] rounded-xl text-xs sm:text-sm font-mono text-slate-100 mb-4 border border-cyan-500/30">
                <span className="text-amber-400 font-bold">Formula:</span> If + Present Simple, WILL / WON'T + Base Verb.
              </div>

              <div className="text-xs sm:text-sm text-slate-200 space-y-1.5 bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                <p className="font-bold text-cyan-300">School Example:</p>
                <p className="italic text-slate-100">"If it rains during recess tomorrow, we will play basketball inside."</p>
                <p className="text-[11px] text-slate-400 mt-1">→ A specific real prediction for tomorrow’s break!</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
