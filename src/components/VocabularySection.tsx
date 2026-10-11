import React, { useState } from 'react';
import { VocabItem } from '../types';
import { VOCABULARY_LIST } from '../data/curriculum';
import { Volume2, Search, Filter, Layers, BookOpen, CheckCircle } from 'lucide-react';
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
      <div className="bg-white rounded-3xl border border-amber-200/90 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 bg-amber-100/70 px-2.5 py-0.5 rounded-md mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Vocabulary Bank & School Context</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 tracking-tight">
              School Words & Conditional Sentences
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Familiarize yourself with these core verbs and classroom nouns first. Every word includes native audio and contextual examples for both Zero and First conditionals!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playClick();
                setIsFlashcardMode(!isFlashcardMode);
              }}
              className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all flex items-center gap-2 ${
                isFlashcardMode
                  ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                  : 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
              }`}
            >
              <Layers className="w-4 h-4" />
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
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-amber-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search words or rules..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white text-slate-800 placeholder-slate-400"
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
                className={`min-h-[260px] cursor-pointer rounded-2xl border-2 p-5 flex flex-col justify-between transition-all duration-300 transform select-none ${
                  isFlipped
                    ? 'bg-amber-50/90 border-amber-400 shadow-md rotate-y-180'
                    : 'bg-white border-amber-200 hover:border-amber-300 hover:shadow-md'
                }`}
              >
                {!isFlipped ? (
                  /* Front of card */
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                        <span className="font-semibold text-amber-800">{item.category}</span>
                        <span className="italic">{item.partOfSpeech}</span>
                      </div>
                      <h3 className="text-2xl font-bold font-display text-slate-900 tracking-tight mt-4">
                        {item.word}
                      </h3>
                      <p className="text-xs font-mono text-slate-500 mt-1">{item.phonetic}</p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-amber-800">
                      <span>Click to flip card</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePronounce(item.word, item.id);
                        }}
                        className="p-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900"
                        title="Listen"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Back of card */
                  <div className="flex flex-col justify-between h-full text-left">
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                        <span className="font-bold text-amber-900">{item.word}</span>
                        <span className="text-[11px] bg-amber-200/70 text-amber-900 px-1.5 py-0.5 rounded">Flipped</span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed mb-3">
                        {item.definition}
                      </p>

                      <div className="space-y-2 text-xs">
                        <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-950">
                          <span className="font-bold text-emerald-800 block text-[10px] uppercase">Zero:</span>
                          <span className="italic">"{item.exampleZero}"</span>
                        </div>
                        <div className="p-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-950">
                          <span className="font-bold text-amber-800 block text-[10px] uppercase">First:</span>
                          <span className="italic">"{item.exampleFirst}"</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-amber-200 flex items-center justify-between text-xs text-amber-900">
                      <span>Click to flip back</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePronounce(`${item.exampleZero}. ${item.exampleFirst}`, item.id);
                        }}
                        className="p-1.5 rounded-lg bg-amber-200 hover:bg-amber-300"
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
              className="bg-white rounded-2xl border border-amber-200 p-5 shadow-xs hover:border-amber-300 hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-xl font-bold font-display text-slate-900 tracking-tight">
                      {item.word}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span className="font-mono">{item.phonetic}</span>
                      <span aria-hidden="true">·</span>
                      <span className="italic">{item.partOfSpeech}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handlePronounce(item.word, item.id)}
                    className={`p-2 rounded-xl transition-all ${
                      activeWordId === item.id
                        ? 'bg-amber-600 text-white'
                        : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
                    }`}
                    title={`Pronounce "${item.word}"`}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed mb-4">
                  {item.definition}
                </p>

                {/* Conditional Examples Box */}
                <div className="space-y-2">
                  {/* Zero Conditional Example */}
                  <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[11px] text-emerald-800">
                        Zero Conditional (School Rule/Fact):
                      </span>
                      <button
                        onClick={() => handlePronounce(item.exampleZero, `${item.id}-zero`)}
                        className="text-emerald-700 hover:text-emerald-900 p-0.5"
                        title="Pronounce sentence"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-slate-800 italic leading-snug">
                      "{item.exampleZero}"
                    </p>
                  </div>

                  {/* First Conditional Example */}
                  <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[11px] text-amber-800">
                        First Conditional (Future Possibility):
                      </span>
                      <button
                        onClick={() => handlePronounce(item.exampleFirst, `${item.id}-first`)}
                        className="text-amber-700 hover:text-amber-900 p-0.5"
                        title="Pronounce sentence"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-slate-800 italic leading-snug">
                      "{item.exampleFirst}"
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                  {item.category}
                </span>
                <span className="text-slate-400">School Context</span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500">
          <p className="text-base font-semibold">No words match your search or filter.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="mt-3 px-4 py-2 text-xs font-semibold text-amber-900 bg-amber-100 rounded-lg hover:bg-amber-200"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
