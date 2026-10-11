import React, { useState } from 'react';
import { CompleteQuestion } from '../../types';
import { COMPLETE_QUESTIONS } from '../../data/curriculum';
import { Volume2, CheckCircle2, AlertCircle, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { sound, speakSentence } from '../../utils/audio';

interface CompleteSentenceGameProps {
  onScoreUpdate: (points: number) => void;
  onOwlFeedback: (quote: string, reaction: 'happy' | 'thinking' | 'explaining') => void;
}

export const CompleteSentenceGame: React.FC<CompleteSentenceGameProps> = ({
  onScoreUpdate,
  onOwlFeedback
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [blank1Input, setBlank1Input] = useState<string>('');
  const [blank2Input, setBlank2Input] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const currentQ = COMPLETE_QUESTIONS[currentIndex];

  const handleVerify = () => {
    if (!blank1Input.trim() || !blank2Input.trim()) return;
    sound.playClick();

    const clean1 = blank1Input.trim().toLowerCase();
    const clean2 = blank2Input.trim().toLowerCase();

    const check1 =
      clean1 === currentQ.correct1.toLowerCase() ||
      (currentQ.acceptableAlternatives1 &&
        currentQ.acceptableAlternatives1.some((alt) => alt.toLowerCase() === clean1));

    const check2 =
      clean2 === currentQ.correct2.toLowerCase() ||
      (currentQ.acceptableAlternatives2 &&
        currentQ.acceptableAlternatives2.some((alt) => alt.toLowerCase() === clean2));

    const allGood = !!(check1 && check2);

    setIsSubmitted(true);
    setIsCorrect(allGood);

    if (allGood) {
      sound.playCorrect();
      onScoreUpdate(20);
      onOwlFeedback(
        `Masterful conjugation! ${currentQ.explanation}`,
        'happy'
      );
    } else {
      sound.playWrong();
      onOwlFeedback(
        `Review the verb forms! ${currentQ.explanation}`,
        'thinking'
      );
    }
  };

  const handleNext = () => {
    sound.playClick();
    if (currentIndex < COMPLETE_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setBlank1Input('');
      setBlank2Input('');
      setIsSubmitted(false);
      setIsCorrect(false);
    }
  };

  const handleRestart = () => {
    sound.playClick();
    setCurrentIndex(0);
    setBlank1Input('');
    setBlank2Input('');
    setIsSubmitted(false);
    setIsCorrect(false);
  };

  // Reconstructed completed sentence for pronunciation
  const completedSentence = currentQ.sentenceTemplate
    .replace('{blank1}', currentQ.correct1)
    .replace('{blank2}', currentQ.correct2);

  return (
    <div className="space-y-6">
      {/* Header Deck */}
      <div className="bg-white rounded-3xl border border-amber-200/90 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-800 bg-indigo-100/70 px-2.5 py-0.5 rounded-md mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Game 4 · Conjugation & Fill the Blanks</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
              Complete the Sentences
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Conjugate the base verbs in brackets to complete the correct Zero or First conditional clauses.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-900 bg-amber-100 px-3 py-1.5 rounded-xl">
              Question {currentIndex + 1} / {COMPLETE_QUESTIONS.length}
            </span>
            <button
              onClick={handleRestart}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
              title="Restart Quiz"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Challenge Box */}
        <div className="mt-6">
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm mb-6">
            <span className="font-bold text-amber-950 font-display block text-sm">
              Context: {currentQ.scenario}
            </span>
            <div className="mt-1 flex items-center gap-2 text-xs text-amber-800">
              <span className="font-bold uppercase tracking-wide">Type:</span>
              <span className="bg-amber-200/70 px-2 py-0.5 rounded font-mono font-bold">
                {currentQ.type.toUpperCase()} CONDITIONAL
              </span>
            </div>
          </div>

          {/* Fill-in-the-Blank Sentence Form */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="text-sm sm:text-base text-slate-800 font-sans leading-relaxed">
              <span>If ... </span>
              {/* Template split presentation */}
              <div className="inline-block mx-1">
                <div className="flex items-center gap-1.5 inline-flex">
                  <input
                    type="text"
                    disabled={isSubmitted}
                    value={blank1Input}
                    onChange={(e) => setBlank1Input(e.target.value)}
                    placeholder={`[${currentQ.verb1Hint}]`}
                    className={`px-3 py-1.5 text-xs sm:text-sm font-bold rounded-xl border text-center min-w-[120px] focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors ${
                      isSubmitted
                        ? blank1Input.trim().toLowerCase() === currentQ.correct1.toLowerCase()
                          ? 'bg-emerald-100 border-emerald-400 text-emerald-950'
                          : 'bg-rose-100 border-rose-400 text-rose-950'
                        : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                  <span className="text-[11px] text-slate-500 italic">
                    ({currentQ.verb1Hint})
                  </span>
                </div>
              </div>

              <span> ... </span>

              <div className="inline-block mx-1">
                <div className="flex items-center gap-1.5 inline-flex">
                  <input
                    type="text"
                    disabled={isSubmitted}
                    value={blank2Input}
                    onChange={(e) => setBlank2Input(e.target.value)}
                    placeholder={`[${currentQ.verb2Hint}]`}
                    className={`px-3 py-1.5 text-xs sm:text-sm font-bold rounded-xl border text-center min-w-[130px] focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors ${
                      isSubmitted
                        ? blank2Input.trim().toLowerCase() === currentQ.correct2.toLowerCase()
                          ? 'bg-emerald-100 border-emerald-400 text-emerald-950'
                          : 'bg-rose-100 border-rose-400 text-rose-950'
                        : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                  <span className="text-[11px] text-slate-500 italic">
                    ({currentQ.verb2Hint})
                  </span>
                </div>
              </div>
            </div>

            {/* Quick helper shortcuts */}
            {!isSubmitted && (
              <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">Quick suggestions:</span>
                <button
                  type="button"
                  onClick={() => setBlank1Input(currentQ.correct1)}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                >
                  Insert "{currentQ.correct1}"
                </button>
                <button
                  type="button"
                  onClick={() => setBlank2Input(currentQ.correct2)}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                >
                  Insert "{currentQ.correct2}"
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {!isSubmitted ? (
            <button
              onClick={handleVerify}
              disabled={!blank1Input.trim() || !blank2Input.trim()}
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl transition-all shadow-xs"
            >
              Check Conjugations
            </button>
          ) : (
            <div className="flex items-center gap-3">
              {currentIndex < COMPLETE_QUESTIONS.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-2"
                >
                  <span>Next Sentence</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleRestart}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
                >
                  Completed! Restart
                </button>
              )}

              <button
                onClick={() => speakSentence(completedSentence)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium rounded-xl transition-colors flex items-center gap-1.5"
                title="Pronounce complete sentence"
              >
                <Volume2 className="w-4 h-4" />
                <span>Hear Correct Sentence</span>
              </button>
            </div>
          )}
        </div>

        {/* Feedback Container */}
        {isSubmitted && (
          <div
            className={`mt-6 p-4 rounded-2xl border text-xs sm:text-sm animate-fade-in ${
              isCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-rose-50 border-rose-300 text-rose-950'
            }`}
          >
            <div className="flex items-start gap-2 mb-2">
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-bold text-sm">
                  {isCorrect ? 'Well done! (+20 pts)' : 'Conjugation Check:'}
                </p>
                <p className="mt-1 font-semibold text-slate-800">
                  Correct answers: Blank 1 = <span className="underline font-mono">{currentQ.correct1}</span> | Blank 2 = <span className="underline font-mono">{currentQ.correct2}</span>
                </p>
              </div>
            </div>
            <p className="mt-2 text-xs text-slate-600 pl-7 leading-relaxed font-sans">
              {currentQ.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
