import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, X, Printer, CheckCircle2, Star, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalScore: number;
  maxScore: number;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  totalScore,
  maxScore
}) => {
  const [studentName, setStudentName] = useState<string>('Alex Johnson');
  const [isEditingName, setIsEditingName] = useState<boolean>(false);

  const percentage = Math.round((totalScore / maxScore) * 100);
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  useEffect(() => {
    if (isOpen) {
      sound.playFanfare();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Fallback gracefully
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  let gradeTitle = 'Apprentice Scholar';
  if (percentage >= 80) gradeTitle = 'Distinguished Grammar Laureate';
  else if (percentage >= 50) gradeTitle = 'Proficient Conditional Master';

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border-4 border-amber-300 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Action Bar */}
        <div className="bg-amber-100/90 border-b border-amber-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-950">
            <Award className="w-4 h-4 text-amber-700" />
            <span>Official Academy Report Card & Certificate</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-1.5 rounded-lg bg-white text-slate-700 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1 shadow-2xs"
              title="Print Certificate"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / Save</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-amber-200/60"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-6">
          {/* Printable Certificate Frame */}
          <div className="relative border-8 border-double border-amber-600/60 rounded-2xl p-6 sm:p-10 bg-amber-50/40 text-center space-y-5">
            {/* Corner Embellishments */}
            <div className="absolute top-2 left-2 text-amber-400 text-lg">✦</div>
            <div className="absolute top-2 right-2 text-amber-400 text-lg">✦</div>
            <div className="absolute bottom-2 left-2 text-amber-400 text-lg">✦</div>
            <div className="absolute bottom-2 right-2 text-amber-400 text-lg">✦</div>

            {/* Title */}
            <div>
              <p className="text-xs uppercase tracking-widest text-amber-800 font-bold">
                Professor Hoot's Grammar Academy
              </p>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight mt-1">
                Certificate of Mastery
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Zero Conditional & First Conditional Proficiency
              </p>
            </div>

            {/* Recipient */}
            <div className="py-2">
              <p className="text-xs text-slate-500 italic">This is proudly awarded to:</p>
              {isEditingName ? (
                <div className="inline-flex items-center gap-2 mt-1">
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="border border-amber-400 rounded-lg px-3 py-1 text-center font-bold font-display text-xl text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    onClick={() => setIsEditingName(false)}
                    className="text-xs bg-amber-600 text-white px-2 py-1 rounded"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => setIsEditingName(true)}
                  className="cursor-pointer group inline-block"
                  title="Click to edit student name"
                >
                  <h3 className="text-2xl sm:text-3xl font-bold font-display text-amber-950 underline decoration-amber-300 underline-offset-4 group-hover:text-amber-800">
                    {studentName}
                  </h3>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    (Click to edit name)
                  </span>
                </div>
              )}
            </div>

            {/* Body Prose */}
            <p className="text-xs sm:text-sm text-slate-700 max-w-lg mx-auto leading-relaxed">
              For exemplary completion of school situational syntax modules, classroom regulations (Zero Conditional), and future recess contingency formulations (First Conditional).
            </p>

            {/* Score & Honors Badge */}
            <div className="inline-flex flex-wrap items-center justify-center gap-6 py-2 px-6 rounded-2xl bg-white border border-amber-200 shadow-2xs">
              <div className="text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Points</span>
                <span className="text-lg font-bold font-mono text-amber-900">{totalScore} / {maxScore}</span>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div className="text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Proficiency</span>
                <span className="text-lg font-bold font-mono text-emerald-800">{percentage}%</span>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div className="text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Honor Rank</span>
                <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">{gradeTitle}</span>
              </div>
            </div>

            {/* Signatures & Seal */}
            <div className="pt-6 border-t border-amber-200/80 flex items-center justify-between text-xs text-slate-600">
              <div className="text-left">
                <p className="font-bold text-slate-900">Date Issued:</p>
                <p className="font-mono text-slate-600">{currentDate}</p>
              </div>

              {/* Gold Seal */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full border-2 border-amber-500 bg-amber-300/80 flex items-center justify-center shadow-inner text-amber-950 font-bold text-[10px] text-center leading-tight">
                  ACADEMY<br/>VERIFIED
                </div>
              </div>

              <div className="text-right">
                <p className="font-bold text-slate-900 font-display">Professor Hoot, Ph.D.</p>
                <p className="italic text-[11px] text-amber-800">Chief Grammar Dean</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
