import React, { useState } from 'react';
import { OrderQuestion } from '../../types';
import { ORDER_QUESTIONS } from '../../data/curriculum';
import { Volume2, CheckCircle2, AlertCircle, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { sound, speakSentence } from '../../utils/audio';

interface OrderSentenceGameProps {
  onScoreUpdate: (points: number) => void;
  onOwlFeedback: (quote: string, reaction: 'happy' | 'thinking' | 'explaining') => void;
}

export const OrderSentenceGame: React.FC<OrderSentenceGameProps> = ({
  onScoreUpdate,
  onOwlFeedback
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const [availableTokens, setAvailableTokens] = useState<string[]>(() => [
    ...ORDER_QUESTIONS[0].scrambled
  ]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const currentQ = ORDER_QUESTIONS[currentIndex];

  const handleSelectToken = (token: string, tokenIdx: number) => {
    if (isSubmitted) return;
    sound.playClick();
    setSelectedTokens([...selectedTokens, token]);
    setAvailableTokens(availableTokens.filter((_, idx) => idx !== tokenIdx));
  };

  const handleRemoveToken = (token: string, tokenIdx: number) => {
    if (isSubmitted) return;
    sound.playClick();
    setSelectedTokens(selectedTokens.filter((_, idx) => idx !== tokenIdx));
    setAvailableTokens([...availableTokens, token]);
  };

  const currentSentenceText = currentQ.tokens.join(' ');

  const handleCheckOrder = () => {
    if (selectedTokens.length === 0) return;
    sound.playClick();

    const userSentence = selectedTokens.join(' ').trim();
    const correctSentence = currentQ.tokens.join(' ').trim();
    const correct = userSentence.toLowerCase() === correctSentence.toLowerCase();

    setIsSubmitted(true);
    setIsCorrect(correct);

    if (correct) {
      sound.playCorrect();
      onScoreUpdate(20);
      onOwlFeedback(
        `Impeccable syntax! "${currentSentenceText}" - ${currentQ.explanation}`,
        'happy'
      );
    } else {
      sound.playWrong();
      onOwlFeedback(
        `Not quite in the right order. Remember: If + Present Simple comes first (or main clause first with no comma)! ${currentQ.explanation}`,
        'thinking'
      );
    }
  };

  const handleNext = () => {
    sound.playClick();
    if (currentIndex < ORDER_QUESTIONS.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setSelectedTokens([]);
      setAvailableTokens([...ORDER_QUESTIONS[nextIdx].scrambled]);
      setIsSubmitted(false);
      setIsCorrect(false);
    }
  };

  const handleResetCurrent = () => {
    sound.playClick();
    setSelectedTokens([]);
    setAvailableTokens([...currentQ.scrambled]);
    setIsSubmitted(false);
    setIsCorrect(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Deck: Cyber Card */}
      <div className="cyber-card rounded-3xl border border-cyan-500/30 p-6 sm:p-8 shadow-xl text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/60 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 bg-cyan-500/15 px-3 py-1 rounded-full border border-cyan-400/30 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Game 2 · Syntax & Scrambled Words</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              Put the Sentences in Order
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              Click the word blocks in the right sequence to form an accurate conditional sentence.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-500/20 border border-cyan-400/40 px-3.5 py-1.5 rounded-xl">
              Question {currentIndex + 1} / {ORDER_QUESTIONS.length}
            </span>
            <button
              onClick={handleResetCurrent}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors border border-slate-700"
              title="Reset current sentence"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Challenge Prompt */}
        <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm flex items-center justify-between gap-3">
          <div>
            <span className="font-bold text-slate-900 font-display block text-sm">
              Scenario: {currentQ.context}
            </span>
            <span className="text-slate-600">{currentQ.prompt}</span>
          </div>
          <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 uppercase font-bold shrink-0">
            {currentQ.type} Conditional
          </span>
        </div>

        {/* Assembly Area (Answer Slot) */}
        <div className="mt-6">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
            Your Sentence Assembly:
          </label>
          <div
            className={`min-h-[76px] p-4 rounded-2xl border-2 flex flex-wrap items-center gap-2 transition-all ${
              isSubmitted
                ? isCorrect
                  ? 'bg-emerald-50/70 border-emerald-400'
                  : 'bg-rose-50/70 border-rose-400'
                : 'bg-slate-50 border-dashed border-blue-300'
            }`}
          >
            {selectedTokens.length === 0 ? (
              <span className="text-xs text-slate-400 italic">
                Click the word blocks below to construct your sentence here...
              </span>
            ) : (
              selectedTokens.map((token, idx) => (
                <button
                  key={`${token}-${idx}`}
                  disabled={isSubmitted}
                  onClick={() => handleRemoveToken(token, idx)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl border shadow-2xs transition-transform active:scale-95 ${
                    isSubmitted
                      ? isCorrect
                        ? 'bg-emerald-100 text-emerald-950 border-emerald-300'
                        : 'bg-rose-100 text-rose-950 border-rose-300'
                      : 'bg-white text-slate-900 border-slate-200 hover:border-blue-400 hover:bg-blue-50'
                  }`}
                  title="Click to remove from sentence"
                >
                  {token}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Available Word Blocks Bank */}
        <div className="mt-6">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
            Word Bank (Click to place in sentence):
          </label>
          <div className="flex flex-wrap items-center gap-2 p-4 bg-slate-50 rounded-2xl border border-slate-200">
            {availableTokens.map((token, idx) => (
              <button
                key={`${token}-${idx}`}
                disabled={isSubmitted}
                onClick={() => handleSelectToken(token, idx)}
                className="px-3.5 py-2 text-xs sm:text-sm font-medium bg-white text-slate-800 border border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 hover:text-blue-950 transition-all shadow-2xs active:scale-95 disabled:opacity-50"
              >
                {token}
              </button>
            ))}
            {availableTokens.length === 0 && (
              <span className="text-xs text-slate-400 italic py-1">
                All words placed in sentence!
              </span>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {!isSubmitted ? (
            /* Primary Golden Yellow Action Button */
            <button
              onClick={handleCheckOrder}
              disabled={selectedTokens.length === 0}
              className="px-7 py-3 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 text-xs font-bold rounded-xl transition-all shadow-md shadow-amber-400/20 active:scale-95"
            >
              Verify Sequence
            </button>
          ) : (
            <div className="flex items-center gap-3">
              {currentIndex < ORDER_QUESTIONS.length - 1 ? (
                /* Electric Blue Button */
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-blue-600/30 flex items-center gap-2 active:scale-95"
                >
                  <span>Next Sentence</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleResetCurrent}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all shadow-md"
                >
                  Completed! Play Again
                </button>
              )}

              <button
                onClick={() => speakSentence(currentSentenceText)}
                className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium rounded-xl transition-colors flex items-center gap-2 border border-slate-200"
                title="Pronounce correct sentence"
              >
                <Volume2 className="w-4 h-4 text-blue-600" />
                <span>Hear Full Sentence</span>
              </button>
            </div>
          )}
        </div>

        {/* Detailed Feedback Container */}
        {isSubmitted && (
          <div
            className={`mt-6 p-4 rounded-2xl border text-xs sm:text-sm animate-fade-in ${
              isCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-rose-50 border-rose-300 text-rose-950'
            }`}
          >
            <div className="flex items-start gap-2.5 mb-1.5">
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-bold text-sm">
                  {isCorrect ? 'Well done! (+20 pts)' : 'Order Error! Here is the correct sentence:'}
                </p>
                <p className="italic text-slate-800 font-sans mt-0.5">
                  "{currentSentenceText}"
                </p>
              </div>
            </div>
            <p className="mt-2 text-xs text-slate-600 pl-7 leading-relaxed">
              {currentQ.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
