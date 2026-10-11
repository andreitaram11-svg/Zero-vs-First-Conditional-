import React, { useState, useEffect } from 'react';
import { VideoLesson } from '../types';
import { VIDEO_LESSONS } from '../data/curriculum';
import { Play, Pause, SkipForward, SkipBack, Volume2, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
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
      <div className="cyber-card rounded-3xl border border-cyan-500/30 shadow-xl p-6 sm:p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 bg-cyan-500/15 px-3 py-1 rounded-full border border-cyan-400/30 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Multimedia Video & Classroom Dialogue</span>
            </div>
            <div className="animate-title-float">
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight flex items-center gap-2">
                <span>Interactive Video Classroom</span>
                <span className="text-2xl animate-gentle-wiggle">🎬</span>
              </h2>
            </div>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Experience situational dialogues with synchronized spoken audio, visual school settings, and real-time comprehension checkpoints!
            </p>
          </div>

          {/* Episode Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800">
            {VIDEO_LESSONS.map((vLesson, idx) => (
              <button
                key={vLesson.id}
                onClick={() => handleSwitchLesson(idx)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                  activeLessonIndex === idx
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-cyan-500/30 border border-cyan-400/50'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                Episode {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Video Stage Frame */}
        <div className="mt-6 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-xl">
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
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-950/85 text-white backdrop-blur-md border border-white/20">
                {lesson.title}
              </span>
              <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-blue-500 text-white shadow-sm">
                Scene {currentSceneIndex + 1} of {lesson.scenes.length}
              </span>
            </div>

            {/* Dialogue Bubble Overlay on Top of Scene */}
            <div className="absolute bottom-4 left-4 right-4 z-20 bg-slate-950/90 backdrop-blur-md border border-slate-800 rounded-2xl p-4 sm:p-5 text-white shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
                  <span className="font-bold text-sm text-blue-300 font-display">
                    {scene.speaker}
                  </span>
                  {scene.conditionalType && (
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                      {scene.conditionalType === 'zero' ? 'ZERO CONDITIONAL' : 'FIRST CONDITIONAL'}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => {
                    sound.playClick();
                    speakSentence(scene.text);
                  }}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-300 transition-colors flex items-center gap-1.5 text-xs"
                  title="Listen to this line again"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline font-semibold">Replay Line</span>
                </button>
              </div>

              <p className="text-sm sm:text-base text-slate-100 font-sans leading-relaxed">
                "{scene.text}"
              </p>

              {scene.ruleCallout && (
                <div className="mt-2.5 pt-2 border-t border-slate-800 text-xs text-blue-300/90 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0" />
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
                className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                  isPlaying
                    ? 'bg-amber-400 text-slate-950 hover:bg-amber-300'
                    : 'bg-blue-600 text-white hover:bg-blue-500 shadow-md shadow-blue-600/30'
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
                      ? 'w-8 bg-blue-400'
                      : 'w-2.5 bg-slate-700 hover:bg-slate-600'
                  }`}
                  title={`Go to scene ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Checkpoint Question Section: Consistent White Card */}
        <div className="mt-8 border border-slate-200 rounded-2xl p-6 sm:p-7 bg-slate-50 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold font-display text-slate-900">
              Interactive Checkpoint Challenge (+25 pts)
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 mb-4 font-sans leading-relaxed">
            {lesson.checkpointQuestion.question}
          </p>

          <div className="space-y-2.5 mb-5">
            {lesson.checkpointQuestion.options.map((opt, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = idx === lesson.checkpointQuestion.correctIndex;

              let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:border-blue-400';
              if (checkpointSubmitted) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-50 border-rose-400 text-rose-950 font-semibold';
                }
              } else if (isSelected) {
                btnStyle = 'bg-blue-50 border-blue-500 text-blue-950 font-semibold';
              }

              return (
                <button
                  key={idx}
                  disabled={checkpointSubmitted}
                  onClick={() => {
                    sound.playClick();
                    setSelectedAnswer(idx);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 ${btnStyle}`}
                >
                  <span className="w-5 h-5 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-relaxed">{opt}</span>
                </button>
              );
            })}
          </div>

          {!checkpointSubmitted ? (
            /* Golden Yellow CTA Button */
            <button
              onClick={handleCheckpointSubmit}
              disabled={selectedAnswer === null}
              className="px-6 py-3 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 text-xs font-bold rounded-xl transition-all shadow-md shadow-amber-400/20 active:scale-95"
            >
              Verify Answer
            </button>
          ) : (
            <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs shadow-2xs">
              <div className="flex items-center gap-2 mb-1.5">
                {selectedAnswer === lesson.checkpointQuestion.correctIndex ? (
                  <span className="text-emerald-700 font-bold flex items-center gap-1.5 text-sm">
                    <CheckCircle2 className="w-4 h-4" /> Correct deduction! (+25 bonus points)
                  </span>
                ) : (
                  <span className="text-rose-700 font-bold flex items-center gap-1.5 text-sm">
                    <AlertCircle className="w-4 h-4" /> Review the Rule:
                  </span>
                )}
              </div>
              <p className="text-slate-600 leading-relaxed pl-5">
                {lesson.checkpointQuestion.explanation}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
