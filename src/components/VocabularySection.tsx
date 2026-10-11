import React, { useState } from 'react';
import { VocabItem } from '../types';
import { VOCABULARY_LIST } from '../data/curriculum';
import { Volume2, Search, Layers, BookOpen, Sparkles } from 'lucide-react';
import { sound, speakSentence } from '../utils/audio';

export const VocabularySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeWordId, setActiveWordId] = useState<string | null>(null);
  const [isFlashcardMode, setIsFlashcardMode] = useState<boolean>(false);
  const [flashcardFlipped, setFlashcardFlipped] = useState<Record<string, boolean>>({});

  const categories = ['All', 'Classroom', 'Recess', 'Rules & Exams', 'Science & Labs'];

  const filteredItems = VOCABULARY_LIST.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handlePronounce = (text: string, id: string) => {
    sound.playClick();
    setActiveWordId(id);
    speakSentence(text, {
      onEnd: () => setActiveWordId(null)
    });
  };

  const toggleFlip = (id: string) => {
    sound.playClick();
    setFlashcardFlipped((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Control Deck */}
      <div className="cyber-card rounded-3xl border border-cyan-500/30 shadow-xl p-6 sm:p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 bg-cyan-500/15 px-3 py-1 rounded-full border border-cyan-400/30 mb-2">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>Vocabulary Bank & School Context</span>
            </div>
            <div className="animate-title-float">
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight flex items-center gap-2">
                <span>School Words & Conditional Sentences</span>
                <span className="text-2xl animate-gentle-wiggle">📚</span>
              </h2>
            </div>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Familiarize yourself with these core verbs and classroom nouns first. Every word includes native audio and contextual examples for both Zero and First conditionals!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playClick();
                setIsFlashcardMode(!isFlashcardMode);
              }}
              className={`px-4 py-2.5 text-xs font-semibold rounded-xl border transition-all flex items-center gap-2 ${
                isFlashcardMode
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-cyan-400/50 shadow-md shadow-cyan-500/30'
                  : 'bg-slate-800/80 text-slate-200 border-slate-700 hover:bg-slate-700/80'
              }`}
            >
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>{isFlashcardMode ? 'Standard List View' : 'Flashcard Flip Mode'}</span>
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sound.playClick();
                  setSelectedCategory(cat);
                }}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-cyan-500/30 border border-cyan-400/50'
                    : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700/80 border border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search words or definitions..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-white placeholder-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Vocabulary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => {
          const isFlipped = flashcardFlipped[item.id] || false;

          if (isFlashcardMode) {
            return (
              <div
                key={item.id}
                onClick={() => toggleFlip(item.id)}
                className={`min-h-[260px] cursor-pointer rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 select-none ${
                  isFlipped
                    ? 'bg-blue-50/70 border-blue-300 shadow-md'
                    : 'bg-white border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-md'
                }`}
              >
                {!isFlipped ? (
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                        <span className="font-semibold text-violet-700 bg-violet-50 px-2 py-0.5 rounded-md border border-violet-200">
                          {item.category}
                        </span>
                        <span className="italic">{item.partOfSpeech}</span>
                      </div>
                      <h3 className="text-2xl font-bold font-display text-slate-900 tracking-tight mt-4">
                        {item.word}
                      </h3>
                      <p className="text-xs font-mono text-slate-500 mt-1">{item.phonetic}</p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600">
                      <span>Click to flip card</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePronounce(item.word, item.id);
                        }}
                        className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600"
                        title="Listen"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col justify-between h-full text-left">
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                        <span className="font-bold text-slate-900">{item.word}</span>
                        <span className="text-[11px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-semibold">Flipped</span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed mb-3">
                        {item.definition}
                      </p>

                      <div className="space-y-2 text-xs">
                        <div className="p-2.5 rounded-xl bg-slate-900 text-slate-100 border border-slate-800">
                          <span className="font-bold text-violet-300 block text-[10px] uppercase">Zero Conditional:</span>
                          <span className="italic">"{item.exampleZero}"</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-blue-900 text-blue-100 border border-blue-800">
                          <span className="font-bold text-amber-300 block text-[10px] uppercase">First Conditional:</span>
                          <span className="italic">"{item.exampleFirst}"</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-700">
                      <span>Click to flip back</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePronounce(`${item.exampleZero}. ${item.exampleFirst}`, item.id);
                        }}
                        className="p-1.5 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-800"
                        title="Listen to examples"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          }

          /* Standard List View */
          return (
            <div
              key={item.id}
              className="cyber-card cyber-card-hover rounded-2xl border border-cyan-500/25 p-6 text-white shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-bold font-display text-white tracking-tight">
                      {item.word}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-cyan-300/80 mt-0.5">
                      <span className="font-mono">{item.phonetic}</span>
                      <span aria-hidden="true">·</span>
                      <span className="italic">{item.partOfSpeech}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handlePronounce(item.word, item.id)}
                    className={`p-2 rounded-xl transition-all ${
                      activeWordId === item.id
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white'
                        : 'bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-400/30'
                    }`}
                    title={`Pronounce "${item.word}"`}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {item.definition}
                </p>

                {/* Conditional Examples Box */}
                <div className="space-y-2.5">
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-violet-500/30 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[11px] text-violet-300">
                        Zero Conditional (Rule/Fact):
                      </span>
                      <button
                        onClick={() => handlePronounce(item.exampleZero, `${item.id}-zero`)}
                        className="text-violet-300 hover:text-violet-100 p-0.5"
                        title="Pronounce sentence"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-slate-100 italic leading-snug">
                      "{item.exampleZero}"
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[11px] text-cyan-300">
                        First Conditional (Future Prediction):
                      </span>
                      <button
                        onClick={() => handlePronounce(item.exampleFirst, `${item.id}-first`)}
                        className="text-cyan-300 hover:text-cyan-100 p-0.5"
                        title="Pronounce sentence"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-slate-100 italic leading-snug">
                      "{item.exampleFirst}"
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-700/60 flex items-center justify-between text-[11px]">
                <span className="font-semibold text-cyan-300 bg-cyan-500/15 px-2.5 py-0.5 rounded-full border border-cyan-400/30 font-mono">
                  {item.category}
                </span>
                <span className="text-slate-400">School Context</span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500 shadow-sm">
          <p className="text-base font-semibold text-slate-800">No words match your search or filter.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="mt-3 px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-sm"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
