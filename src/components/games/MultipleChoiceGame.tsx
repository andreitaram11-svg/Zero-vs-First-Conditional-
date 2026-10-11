import React, { useState } from 'react';
import { ChoiceQuestion } from '../../types';
import { CHOICE_QUESTIONS } from '../../data/curriculum';
import { Volume2, CheckCircle2, AlertCircle, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { sound, speakSentence } from '../../utils/audio';

interface MultipleChoiceGameProps {
  onScoreUpdate: (points: number) => void;
  onOwlFeedback: (quote: string, reaction: 'happy' | 'thinking' | 'explaining') => void;
}

export const MultipleChoiceGame: React.FC<MultipleChoiceGameProps> = ({
  onScoreUpdate,
  onOwlFeedback
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  const currentQ = CHOICE_QUESTIONS[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    sound.playClick();
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      sound.playCorrect();
      onScoreUpdate(15);
      onOwlFeedback(
        `Brilliant choice! ${currentQ.explanation}`,
        'happy'
      );
    } else {
      sound.playWrong();
      onOwlFeedback(
        `Not quite! ${currentQ.explanation}`,
        'thinking'
      );
    }
  };

  const handleNext = () => {
    sound.playClick();
    if (currentIndex < CHOICE_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    }
  };

  const handleRestart = () => {
    sound.playClick();
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Deck */}
      <div className="bg-white rounded-3xl border border-amber-200/90 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-800 bg-sky-100/70 px-2.5 py-0.5 rounded-md mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Game 3 · Precision & Grammar Dilemmas</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
              Choose the Correct Answer
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Read the school scenario and select the grammatically correct conditional form.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-900 bg-amber-100 px-3 py-1.5 rounded-xl">
              Question {currentIndex + 1} / {CHOICE_QUESTIONS.length}
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

        {/* Question Card */}
        <div className="mt-6">
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm mb-4">
            <span className="font-bold text-amber-950 font-display block text-sm">
              Context: {currentQ.scenario}
            </span>
            <p className="text-slate-800 font-medium mt-2 text-sm sm:text-base font-sans">
              {currentQ.question}
            </p>
          </div>

          {/* Options Grid */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let style = 'bg-slate-50 border-slate-200 text-slate-800 hover:border-amber-400 hover:bg-white';
              if (isAnswered) {
                if (isCorrect) {
                  style = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold';
                } else if (isSelected) {
                  style = 'bg-rose-100 border-rose-400 text-rose-950 font-bold';
                } else {
                  style = 'bg-slate-50/50 border-slate-200 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm transition-all flex items-start gap-3 ${style}`}
                >
                  <span className="w-6 h-6 rounded-full bg-white border border-slate-300 flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-relaxed flex-1">{option}</span>
                  {isAnswered && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback Section */}
        {isAnswered && (
          <div
            className={`mt-6 p-4 rounded-2xl border text-xs sm:text-sm animate-fade-in ${
              selectedOption === currentQ.correctIndex
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-rose-50 border-rose-300 text-rose-950'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-bold text-sm mb-1">
                  {selectedOption === currentQ.correctIndex
                    ? 'Correct Deduction! (+15 pts)'
                    : 'Review the Rule:'}
                </p>
                <p className="text-slate-700 leading-relaxed font-sans">
                  {currentQ.explanation}
                </p>
              </div>

              <button
                onClick={() => speakSentence(currentQ.explanation)}
                className="p-1.5 rounded-lg bg-white/80 hover:bg-white text-slate-700 shrink-0"
                title="Listen to explanation"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Pattern: {currentQ.type === 'zero' ? 'Zero (Present + Present)' : 'First (Present + WILL)'}
              </span>

              {currentIndex < CHOICE_QUESTIONS.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-colors"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleRestart}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                >
                  Completed! Restart
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
