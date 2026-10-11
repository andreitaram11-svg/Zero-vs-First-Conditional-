import React, { useState } from 'react';
import { MatchQuestion } from '../../types';
import { MATCH_QUESTIONS } from '../../data/curriculum';
import { Volume2, CheckCircle2, XCircle, RotateCcw, Sparkles } from 'lucide-react';
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

  // Targets shuffled or static list
  const rightTargets = React.useMemo(() => {
    return [...MATCH_QUESTIONS].sort((a, b) => a.matchTarget.localeCompare(b.matchTarget));
  }, []);

  const handleSelectLeft = (id: string) => {
    sound.playClick();
    if (matchedPairs[id]) return; // already solved
    setSelectedLeft(id);
    setIncorrectPair(null);
  };

  const handleSelectRight = (targetId: string) => {
    if (!selectedLeft) return;
    sound.playClick();

    const currentLeftQuestion = MATCH_QUESTIONS.find((q) => q.id === selectedLeft);
    if (!currentLeftQuestion) return;

    if (currentLeftQuestion.id === targetId) {
      // Correct match!
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

      // Check if all matched
      if (Object.keys(newMatches).length === MATCH_QUESTIONS.length) {
        sound.playFanfare();
        setGameFinished(true);
      }
    } else {
      // Incorrect match
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
      {/* Header Deck */}
      <div className="bg-white rounded-3xl border border-amber-200/90 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 bg-amber-100/70 px-2.5 py-0.5 rounded-md mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Game 1 · Conditional Connection</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
              Match the Meaning & Result
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Select an IF-clause on the left, then click the logically matching consequence on the right.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold font-mono text-amber-900 bg-amber-100 px-3 py-1.5 rounded-xl">
              Matched: {Object.keys(matchedPairs).length} / {MATCH_QUESTIONS.length}
            </span>
            <button
              onClick={handleReset}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
              title="Reset Game"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live Detailed Feedback Banner */}
        {latestExplanation && (
          <div className="mt-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-start justify-between gap-3 animate-fade-in">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-emerald-900">Feedback: </span>
                <span>{latestExplanation}</span>
              </div>
            </div>
            <button
              onClick={() => speakSentence(latestExplanation)}
              className="text-emerald-700 hover:text-emerald-900 p-1 shrink-0"
              title="Listen to feedback"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Matching Columns Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column A: IF-Clauses */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Column A: Condition (If-Clause)
            </h4>
            {MATCH_QUESTIONS.map((q) => {
              const isMatched = !!matchedPairs[q.id];
              const isSelected = selectedLeft === q.id;
              const isWrong = incorrectPair?.left === q.id;

              let style = 'bg-slate-50 border-slate-200 text-slate-800 hover:border-amber-400 hover:bg-white';
              if (isMatched) {
                style = 'bg-emerald-50/80 border-emerald-300 text-emerald-900 line-through opacity-75';
              } else if (isWrong) {
                style = 'bg-rose-50 border-rose-400 text-rose-950 animate-shake';
              } else if (isSelected) {
                style = 'bg-amber-100 border-amber-500 text-amber-950 font-semibold shadow-xs ring-2 ring-amber-400/50';
              }

              return (
                <button
                  key={q.id}
                  disabled={isMatched}
                  onClick={() => handleSelectLeft(q.id)}
                  className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${style}`}
                >
                  <span className="leading-snug">{q.clause}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-200/50 text-amber-900 shrink-0">
                    {q.type.toUpperCase()}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Column B: Consequences */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Column B: Result (Main Clause)
            </h4>
            {rightTargets.map((target) => {
              const isMatched = Object.values(matchedPairs).includes(target.id);
              const isWrong = incorrectPair?.right === target.id;

              let style = 'bg-slate-50 border-slate-200 text-slate-800 hover:border-amber-400 hover:bg-white';
              if (isMatched) {
                style = 'bg-emerald-50/80 border-emerald-300 text-emerald-900 line-through opacity-75';
              } else if (isWrong) {
                style = 'bg-rose-50 border-rose-400 text-rose-950';
              } else if (selectedLeft) {
                style = 'bg-amber-50/50 border-amber-300 text-slate-800 hover:bg-amber-100 hover:border-amber-500 cursor-pointer';
              }

              return (
                <button
                  key={target.id}
                  disabled={isMatched || !selectedLeft}
                  onClick={() => handleSelectRight(target.id)}
                  className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${style}`}
                >
                  <span className="leading-snug">{target.matchTarget}</span>
                  {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {gameFinished && (
          <div className="mt-8 p-6 rounded-3xl bg-amber-100 border-2 border-amber-400 text-center space-y-3">
            <span className="text-3xl" role="img" aria-label="Celebration">🎉</span>
            <h4 className="text-xl font-bold font-display text-amber-950">
              Outstanding! All 8 Pairs Matched!
            </h4>
            <p className="text-xs text-amber-900 max-w-md mx-auto">
              You earned +120 points! Professor Hoot is thrilled with your grammatical accuracy.
            </p>
            <button
              onClick={handleReset}
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
