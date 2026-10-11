import React, { useState } from 'react';
import { GameType } from '../types';
import { MatchMeaningGame } from './games/MatchMeaningGame';
import { OrderSentenceGame } from './games/OrderSentenceGame';
import { MultipleChoiceGame } from './games/MultipleChoiceGame';
import { CompleteSentenceGame } from './games/CompleteSentenceGame';
import { sound } from '../utils/audio';
import { Gamepad2, ListOrdered, CheckSquare, Edit3 } from 'lucide-react';

interface PracticeHubProps {
  onScoreUpdate: (points: number) => void;
  onOwlFeedback: (quote: string, reaction: 'happy' | 'thinking' | 'explaining') => void;
}

export const PracticeHub: React.FC<PracticeHubProps> = ({
  onScoreUpdate,
  onOwlFeedback
}) => {
  const [activeGame, setActiveGame] = useState<GameType>('match');

  return (
    <div className="space-y-6">
      {/* Game Selector Sub-bar */}
      <div className="bg-white rounded-3xl border border-amber-200/90 p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Gamepad2 className="w-5 h-5 text-amber-700" />
          <span className="font-bold font-display text-slate-900 text-sm sm:text-base">
            Graded Practice Arcade
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <button
            onClick={() => {
              sound.playClick();
              setActiveGame('match');
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeGame === 'match'
                ? 'bg-amber-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span>1. Match the Meaning</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveGame('order');
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeGame === 'order'
                ? 'bg-amber-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <ListOrdered className="w-3.5 h-3.5" />
            <span>2. Sentence Order</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveGame('choice');
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeGame === 'choice'
                ? 'bg-amber-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>3. Choose Correct</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveGame('complete');
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeGame === 'complete'
                ? 'bg-amber-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>4. Complete Blanks</span>
          </button>
        </div>
      </div>

      {/* Render active game */}
      {activeGame === 'match' && (
        <MatchMeaningGame
          onScoreUpdate={onScoreUpdate}
          onOwlFeedback={onOwlFeedback}
        />
      )}

      {activeGame === 'order' && (
        <OrderSentenceGame
          onScoreUpdate={onScoreUpdate}
          onOwlFeedback={onOwlFeedback}
        />
      )}

      {activeGame === 'choice' && (
        <MultipleChoiceGame
          onScoreUpdate={onScoreUpdate}
          onOwlFeedback={onOwlFeedback}
        />
      )}

      {activeGame === 'complete' && (
        <CompleteSentenceGame
          onScoreUpdate={onScoreUpdate}
          onOwlFeedback={onOwlFeedback}
        />
      )}
    </div>
  );
};
