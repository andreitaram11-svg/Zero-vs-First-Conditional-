import React, { useState, useEffect } from 'react';
import { VideoLesson } from '../types';
import { VIDEO_LESSONS } from '../data/curriculum';
import { Play, Pause, SkipForward, SkipBack, Volume2, Sparkles, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { sound, speakSentence, stopSpeaking } from '../utils/audio';

interface InteractiveVideoLessonProps {
  onEarnBonus: (points: number) => void;
}

export const InteractiveVideoLesson: React.FC<InteractiveVideoLessonProps> = ({ onEarnBonus }) => {
  const [activeLessonIndex, setActiveLessonIndex] = useState<number>(0);
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [checkpointSubmitted, setCheckpointSubmitted] = useState<boolean>(false);
  const [checkpointRewarded, setCheckpointRewarded] = useState<boolean>(false);

  const lesson = VIDEO_LESSONS[activeLessonIndex];
  const scene = lesson.scenes[currentSceneIndex];
  const isLastScene = currentSceneIndex === lesson.scenes.length - 1;

  // Speak current dialogue when playing
  const speakCurrentScene = () => {
    sound.playClick();
    speakSentence(`${scene.speaker} says: ${scene.text}`, {
      onEnd: () => {
        if (isPlaying && !isLastScene) {
          setTimeout(() => {
            setCurrentSceneIndex((prev) => prev + 1);
          }, 1200);
        } else if (isLastScene) {
          setIsPlaying(false);
        }
      }
    });
  };

  useEffect(() => {
    if (isPlaying) {
      speakCurrentScene();
    }
    return () => {
      stopSpeaking();
    };
  }, [isPlaying, currentSceneIndex, activeLessonIndex]);

  const handleTogglePlay = () => {
    sound.playClick();
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const handleNextScene = () => {
    sound.playClick();
    stopSpeaking();
    if (!isLastScene) {
      setCurrentSceneIndex((prev) => prev + 1);
    }
  };

  const handlePrevScene = () => {
    sound.playClick();
    stopSpeaking();
    if (currentSceneIndex > 0) {
      setCurrentSceneIndex((prev) => prev - 1);
    }
  };

  const handleSwitchLesson = (index: number) => {
    sound.playClick();
    stopSpeaking();
    setIsPlaying(false);
    setActiveLessonIndex(index);
    setCurrentSceneIndex(0);
    setSelectedAnswer(null);
    setCheckpointSubmitted(false);
  };

  const handleCheckpointSubmit = () => {
    if (selectedAnswer === null) return;
    setCheckpointSubmitted(true);
    if (selectedAnswer === lesson.checkpointQuestion.correctIndex) {
      sound.playCorrect();
      if (!checkpointRewarded) {
        onEarnBonus(25);
        setCheckpointRewarded(true);
      }
    } else {
      sound.playWrong();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Deck */}
      <div className="bg-white rounded-3xl border border-amber-200/90 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-800 bg-sky-100/70 px-2.5 py-0.5 rounded-md mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Multimedia Video & Classroom Dialogue</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 tracking-tight">
              Interactive Video Classroom
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Experience situational dialogues with synchronized spoken audio, visual school settings, and real-time comprehension checkpoints!
            </p>
          </div>

          {/* Episode Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-amber-100/80 rounded-xl">
            {VIDEO_LESSONS.map((vLesson, idx) => (
              <button
                key={vLesson.id}
                onClick={() => handleSwitchLesson(idx)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeLessonIndex === idx
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-amber-900 hover:text-amber-950'
                }`}
              >
                Episode {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Video Stage Frame */}
        <div className="mt-6 rounded-2xl overflow-hidden border-2 border-slate-800 bg-slate-950 shadow-md">
          {/* Visual Scene Canvas */}
          <div className="relative aspect-video max-h-[460px] w-full overflow-hidden bg-slate-900 flex items-center justify-center">
            <img
              src={lesson.image}
              alt={lesson.title}
              className="w-full h-full object-cover opacity-85 transition-opacity"
              referrerPolicy="no-referrer"
            />

            {/* Top Scene Overlay Badge */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900/85 text-white backdrop-blur-md border border-white/20">
                {lesson.title}
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/90 text-amber-950">
                Scene {currentSceneIndex + 1} of {lesson.scenes.length}
              </span>
            </div>

            {/* Dialogue Bubble Overlay on Top of Scene */}
            <div className="absolute bottom-4 left-4 right-4 z-20 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-2xl p-4 sm:p-5 text-white shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                  <span className="font-bold text-sm text-amber-300 font-display">
                    {scene.speaker}
                  </span>
                  {scene.conditionalType && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                      {scene.conditionalType === 'zero' ? 'ZERO CONDITIONAL' : 'FIRST CONDITIONAL'}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => {
                    sound.playClick();
                    speakSentence(scene.text);
                  }}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 transition-colors flex items-center gap-1 text-xs"
                  title="Listen to this line again"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Replay Line</span>
                </button>
              </div>

              <p className="text-sm sm:text-base text-slate-100 font-sans leading-relaxed">
                "{scene.text}"
              </p>

              {scene.ruleCallout && (
                <div className="mt-2.5 pt-2 border-t border-slate-700/80 text-xs text-amber-200/90 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{scene.ruleCallout}</span>
                </div>
              )}
            </div>
          </div>

          {/* Video Control Bar */}
          <div className="bg-slate-900 border-t border-slate-800 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevScene}
                disabled={currentSceneIndex === 0}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Previous Scene"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={handleTogglePlay}
                className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                  isPlaying
                    ? 'bg-amber-500 text-amber-950 hover:bg-amber-400'
                    : 'bg-white text-slate-950 hover:bg-slate-200'
                }`}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? 'Pause Narration' : 'Play Narration'}</span>
              </button>

              <button
                onClick={handleNextScene}
                disabled={isLastScene}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Next Scene"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Scene Indicators */}
            <div className="flex items-center gap-1.5">
              {lesson.scenes.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    sound.playClick();
                    stopSpeaking();
                    setCurrentSceneIndex(idx);
                  }}
                  className={`h-2.5 rounded-full transition-all ${
                    currentSceneIndex === idx
                      ? 'w-8 bg-amber-400'
                      : 'w-2.5 bg-slate-700 hover:bg-slate-600'
                  }`}
                  title={`Go to scene ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Checkpoint Question Section */}
        <div className="mt-8 border-2 border-dashed border-amber-300 rounded-2xl p-6 bg-amber-50/50">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-amber-700" />
            <h3 className="text-base font-bold font-display text-slate-900">
              Interactive Checkpoint Challenge (+25 pts)
            </h3>
          </div>
          <p className="text-xs text-slate-700 mb-4 font-sans">
            {lesson.checkpointQuestion.question}
          </p>

          <div className="space-y-2 mb-4">
            {lesson.checkpointQuestion.options.map((opt, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = idx === lesson.checkpointQuestion.correctIndex;

              let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:border-amber-400';
              if (checkpointSubmitted) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-semibold';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-100 border-rose-400 text-rose-950 font-semibold';
                }
              } else if (isSelected) {
                btnStyle = 'bg-amber-100 border-amber-500 text-amber-950 font-semibold';
              }

              return (
                <button
                  key={idx}
                  disabled={checkpointSubmitted}
                  onClick={() => {
                    sound.playClick();
                    setSelectedAnswer(idx);
                  }}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-start gap-2.5 ${btnStyle}`}
                >
                  <span className="w-5 h-5 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center font-bold text-[10px] shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-relaxed">{opt}</span>
                </button>
              );
            })}
          </div>

          {!checkpointSubmitted ? (
            <button
              onClick={handleCheckpointSubmit}
              disabled={selectedAnswer === null}
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl transition-all shadow-xs"
            >
              Verify Answer
            </button>
          ) : (
            <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs">
              <div className="flex items-center gap-2 mb-1">
                {selectedAnswer === lesson.checkpointQuestion.correctIndex ? (
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Correct deduction! (+25 bonus points)
                  </span>
                ) : (
                  <span className="text-rose-700 font-bold flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> Not quite right!
                  </span>
                )}
              </div>
              <p className="text-slate-600 leading-relaxed">
                {lesson.checkpointQuestion.explanation}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
