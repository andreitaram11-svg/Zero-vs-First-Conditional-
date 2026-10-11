import React, { useState } from 'react';
import { MatchQuestion } from '../../types';
import { MATCH_QUESTIONS } from '../../data/curriculum';
import { Volume2, CheckCircle2, RotateCcw, Sparkles, Star } from 'lucide-react';
import { sound, speakSentence } from '../../utils/audio';

interface MatchMeaningGameProps {
  onScoreUpdate: (points: number) => void;
  onOwlFeedback: (quote: string, reaction: 'happy' | 'thinking' | 'explaining') => void;
}

export const MatchMeaningGame: React.FC<MatchMeaningGameProps> = ({
  onScoreUpdate,
  onOwlFeedback
}) => {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({});
  const [incorrectPair, setIncorrectPair] = useState<{ left: string; right: string } | null>(null);
  const [latestExplanation, setLatestExplanation] = useState<string | null>(null);
  const [gameFinished, setGameFinished] = useState<boolean>(false);

  const rightTargets = React.useMemo(() => {
    return [...MATCH_QUESTIONS].sort((a, b) => a.matchTarget.localeCompare(b.matchTarget));
  }, []);

  const handleSelectLeft = (id: string) => {
    sound.playClick();
    if (matchedPairs[id]) return;
    setSelectedLeft(id);
    setIncorrectPair(null);
  };

  const handleSelectRight = (targetId: string) => {
    if (!selectedLeft) return;
    sound.playClick();

    const currentLeftQuestion = MATCH_QUESTIONS.find((q) => q.id === selectedLeft);
    if (!currentLeftQuestion) return;

    if (currentLeftQuestion.id === targetId) {
      sound.playCorrect();
      const newMatches = { ...matchedPairs, [selectedLeft]: targetId };
      setMatchedPairs(newMatches);
      setSelectedLeft(null);
      setLatestExplanation(currentLeftQuestion.explanation);
      onScoreUpdate(15);
      onOwlFeedback(
        `Splendid match! ${currentLeftQuestion.explanation}`,
        'happy'
      );

      if (Object.keys(newMatches).length === MATCH_QUESTIONS.length) {
        sound.playFanfare();
        setGameFinished(true);
      }
    } else {
      sound.playWrong();
      setIncorrectPair({ left: selectedLeft, right: targetId });
      onOwlFeedback(
        "Careful scholar! Look closely at the verb tense and whether it's an automatic rule (Zero) or a future plan (First)!",
        'thinking'
      );
      setTimeout(() => {
        setIncorrectPair(null);
      }, 1000);
    }
  };

  const handleReset = () => {
    sound.playClick();
    setSelectedLeft(null);
    setMatchedPairs({});
    setIncorrectPair(null);
    setLatestExplanation(null);
    setGameFinished(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Deck: Cyber Card */}
      <div className="cyber-card rounded-3xl border border-cyan-500/30 p-6 sm:p-8 shadow-xl text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/60 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 bg-cyan-500/15 px-3 py-1 rounded-full border border-cyan-400/30 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Game 1 · Conditional Connection</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              Match the Meaning & Result
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              Select an IF-clause on the left, then click the logically matching consequence on the right.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Cyan Badge with Electric Progress */}
            <span className="text-xs font-bold font-mono text-cyan-300 bg-cyan-500/20 border border-cyan-400/40 px-3 py-1.5 rounded-xl">
              Matched: {Object.keys(matchedPairs).length} / {MATCH_QUESTIONS.length}
            </span>
            <button
              onClick={handleReset}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors border border-slate-700"
              title="Reset Game"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live Detailed Feedback Banner */}
        {latestExplanation && (
          <div className="mt-4 p-4 rounded-2xl bg-cyan-950/70 border border-cyan-500/40 text-xs text-cyan-100 flex items-start justify-between gap-3 animate-fade-in">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-cyan-300">Feedback: </span>
                <span className="text-slate-200">{latestExplanation}</span>
              </div>
            </div>
            <button
              onClick={() => speakSentence(latestExplanation)}
              className="text-cyan-400 hover:text-cyan-200 p-1 shrink-0"
              title="Listen to feedback"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Matching Columns Grid: Cyber Cards */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column A: IF-Clauses */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Column A: Condition (If-Clause)</span>
            </h4>
            {MATCH_QUESTIONS.map((q) => {
              const isMatched = !!matchedPairs[q.id];
              const isSelected = selectedLeft === q.id;
              const isWrong = incorrectPair?.left === q.id;

              let style = 'bg-slate-900/90 border-slate-700/80 text-slate-100 hover:border-cyan-400 hover:bg-slate-800/90';
              if (isMatched) {
                style = 'bg-emerald-950/50 border-emerald-500/50 text-emerald-300 line-through opacity-65';
              } else if (isWrong) {
                style = 'bg-rose-950/70 border-rose-500 text-rose-200';
              } else if (isSelected) {
                style = 'bg-cyan-500/20 border-cyan-400 text-white font-semibold ring-2 ring-cyan-400/50 shadow-lg shadow-cyan-500/20';
              }

              return (
                <button
                  key={q.id}
                  disabled={isMatched}
                  onClick={() => handleSelectLeft(q.id)}
                  className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 shadow-md ${style}`}
                >
                  <span className="leading-snug">{q.clause}</span>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-400/30 shrink-0">
                    {q.type.toUpperCase()}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Column B: Consequences */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span>Column B: Result (Main Clause)</span>
            </h4>
            {rightTargets.map((target) => {
              const isMatched = Object.values(matchedPairs).includes(target.id);
              const isWrong = incorrectPair?.right === target.id;

              let style = 'bg-slate-900/90 border-slate-700/80 text-slate-100 hover:border-cyan-400 hover:bg-slate-800/90';
              if (isMatched) {
                style = 'bg-emerald-950/50 border-emerald-500/50 text-emerald-300 line-through opacity-65';
              } else if (isWrong) {
                style = 'bg-rose-950/70 border-rose-500 text-rose-200';
              } else if (selectedLeft) {
                style = 'bg-cyan-950/40 border-cyan-500/50 text-cyan-100 hover:border-cyan-400 cursor-pointer shadow-md';
              }

              return (
                <button
                  key={target.id}
                  disabled={isMatched || !selectedLeft}
                  onClick={() => handleSelectRight(target.id)}
                  className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 shadow-md ${style}`}
                >
                  <span className="leading-snug">{target.matchTarget}</span>
                  {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {gameFinished && (
          <div className="mt-8 p-6 rounded-3xl bg-linear-to-r from-blue-950 via-indigo-950 to-violet-950 border border-blue-500/40 text-center space-y-3 text-white shadow-xl">
            <div className="flex items-center justify-center gap-1.5 text-amber-400">
              <Star className="w-6 h-6 fill-current" />
              <Star className="w-8 h-8 fill-current" />
              <Star className="w-6 h-6 fill-current" />
            </div>
            <h4 className="text-xl font-bold font-display text-white">
              Outstanding! All 8 Pairs Matched!
            </h4>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              You earned +120 points! Professor Hoot is thrilled with your grammatical accuracy.
            </p>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
