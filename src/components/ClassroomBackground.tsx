import React from 'react';

export const ClassroomBackground: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Cheerful School Pennants / Bunting Garland across the very top */}
      <div className="absolute top-0 left-0 right-0 flex justify-between overflow-hidden opacity-90">
        {[
          '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#06B6D4',
          '#F97316', '#84CC16', '#6366F1', '#D946EF', '#14B8A6', '#FBBF24', '#E11D48',
          '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
        ].map((color, i) => (
          <div
            key={i}
            className="w-8 h-10 sm:w-12 sm:h-14 transition-transform duration-500 hover:rotate-6"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              backgroundColor: color,
              marginTop: `${(i % 3) * -3}px`,
            }}
          />
        ))}
      </div>

      {/* Garland String line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-amber-400/80 shadow-xs" />

      {/* Floating School Icons & Doodles Scattered Across the Classroom */}
      {/* 1. Smiling Sun in Top Right */}
      <div className="absolute top-12 right-6 sm:right-16 opacity-80 animate-sun-spin">
        <svg width="84" height="84" viewBox="0 0 100 100" fill="none">
          {/* Sun Rays */}
          <g stroke="#F59E0B" strokeWidth="4" strokeLinecap="round">
            <line x1="50" y1="8" x2="50" y2="22" />
            <line x1="50" y1="78" x2="50" y2="92" />
            <line x1="8" y1="50" x2="22" y2="50" />
            <line x1="78" y1="50" x2="92" y2="50" />
            <line x1="20" y1="20" x2="30" y2="30" />
            <line x1="70" y1="70" x2="80" y2="80" />
            <line x1="20" y1="80" x2="30" y2="70" />
            <line x1="70" y1="30" x2="80" y2="20" />
          </g>
          {/* Sun Core */}
          <circle cx="50" cy="50" r="26" fill="#FBBF24" stroke="#F59E0B" strokeWidth="3" />
          {/* Cheerful Sunglasses or Eyes */}
          <circle cx="42" cy="46" r="3.5" fill="#78350F" />
          <circle cx="58" cy="46" r="3.5" fill="#78350F" />
          {/* Cheerful Smile */}
          <path d="M 40 55 Q 50 64 60 55" stroke="#78350F" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Rosy Cheeks */}
          <circle cx="36" cy="53" r="3" fill="#F87171" opacity="0.7" />
          <circle cx="64" cy="53" r="3" fill="#F87171" opacity="0.7" />
        </svg>
      </div>

      {/* 2. Paper Airplane Gliding (Top Left) */}
      <div className="absolute top-20 left-6 sm:left-14 opacity-75 animate-plane-glide">
        <svg width="68" height="68" viewBox="0 0 80 80" fill="none">
          {/* Dashed flight trail */}
          <path
            d="M 5 65 Q 25 55 40 40"
            stroke="#38BDF8"
            strokeWidth="2.5"
            strokeDasharray="4 4"
            fill="none"
          />
          {/* Paper plane body */}
          <path d="M 40 40 L 72 20 L 52 56 L 46 45 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
          <path d="M 46 45 L 72 20 L 40 40 Z" fill="#7DD3FC" stroke="#0284C7" strokeWidth="2" />
        </svg>
      </div>

      {/* 3. Big Yellow School Pencil (Mid Left) */}
      <div className="absolute top-1/3 left-4 sm:left-10 opacity-70 transform -rotate-12 animate-gentle-wiggle">
        <svg width="60" height="90" viewBox="0 0 50 100" fill="none">
          {/* Eraser */}
          <rect x="15" y="5" width="20" height="15" rx="4" fill="#F472B6" stroke="#DB2777" strokeWidth="2" />
          {/* Metal Band */}
          <rect x="15" y="20" width="20" height="8" fill="#CBD5E1" stroke="#64748B" strokeWidth="1.5" />
          {/* Pencil Shaft */}
          <rect x="15" y="28" width="6" height="50" fill="#F59E0B" />
          <rect x="21" y="28" width="8" height="50" fill="#FBBF24" />
          <rect x="29" y="28" width="6" height="50" fill="#F59E0B" />
          {/* Wood Tip */}
          <polygon points="15,78 35,78 25,95" fill="#FED7AA" stroke="#F97316" strokeWidth="1.5" />
          {/* Lead Tip */}
          <polygon points="22,90 28,90 25,97" fill="#334155" />
        </svg>
      </div>

      {/* 4. Alphabet Block "A B C" (Mid Right) */}
      <div className="absolute top-1/4 right-8 sm:right-16 opacity-75 transform rotate-6 animate-letter-pop">
        <svg width="74" height="74" viewBox="0 0 90 90" fill="none">
          {/* Block 1 (A) */}
          <rect x="10" y="20" width="36" height="36" rx="8" fill="#EF4444" stroke="#DC2626" strokeWidth="3" />
          <text x="28" y="46" textAnchor="middle" fill="#FFFFFF" fontSize="22" fontWeight="bold" fontFamily="sans-serif">
            A
          </text>
          {/* Block 2 (B) */}
          <rect x="36" y="38" width="36" height="36" rx="8" fill="#3B82F6" stroke="#2563EB" strokeWidth="3" />
          <text x="54" y="64" textAnchor="middle" fill="#FFFFFF" fontSize="22" fontWeight="bold" fontFamily="sans-serif">
            B
          </text>
        </svg>
      </div>

      {/* 5. Red School Apple with Leaf (Mid-Bottom Left) */}
      <div className="absolute top-2/3 left-6 sm:left-14 opacity-75 transform rotate-8 animate-gentle-bounce">
        <svg width="65" height="65" viewBox="0 0 80 80" fill="none">
          {/* Stem */}
          <path d="M 40 22 Q 43 14 47 10" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" />
          {/* Green Leaf */}
          <path d="M 42 18 Q 55 12 56 22 Q 46 25 42 18 Z" fill="#22C55E" stroke="#16A34A" strokeWidth="1.5" />
          {/* Apple Heart */}
          <path
            d="M 40 24 C 30 20 18 28 20 45 C 22 62 38 68 40 68 C 42 68 58 62 60 45 C 62 28 50 20 40 24 Z"
            fill="#EF4444"
            stroke="#DC2626"
            strokeWidth="3"
          />
          {/* Apple Shine */}
          <ellipse cx="30" cy="36" rx="4" ry="8" fill="#FCA5A5" opacity="0.6" transform="rotate(-25 30 36)" />
        </svg>
      </div>

      {/* 6. School Bell with Chime Waves (Mid-Bottom Right) */}
      <div className="absolute top-3/5 right-6 sm:right-14 opacity-75 transform -rotate-6 animate-gentle-wiggle">
        <svg width="64" height="64" viewBox="0 0 80 80" fill="none">
          {/* Bell Top Loop */}
          <circle cx="40" cy="20" r="5" stroke="#D97706" strokeWidth="3" fill="none" />
          {/* Bell Body */}
          <path
            d="M 24 50 C 24 32 30 24 40 24 C 50 24 56 32 56 50 L 62 55 L 18 55 Z"
            fill="#FBBF24"
            stroke="#D97706"
            strokeWidth="3"
          />
          {/* Clapper */}
          <ellipse cx="40" cy="57" rx="5" ry="4" fill="#B45309" />
          {/* Sound waves */}
          <path d="M 66 42 Q 72 46 66 52" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 14 42 Q 8 46 14 52" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* 7. Numbers Block "1 2 3" (Bottom Left) */}
      <div className="absolute bottom-16 left-8 sm:left-20 opacity-70 animate-letter-pop">
        <svg width="70" height="70" viewBox="0 0 90 90" fill="none">
          <rect x="8" y="16" width="34" height="34" rx="8" fill="#10B981" stroke="#059669" strokeWidth="2.5" />
          <text x="25" y="40" textAnchor="middle" fill="#FFFFFF" fontSize="20" fontWeight="bold" fontFamily="sans-serif">
            1
          </text>
          <rect x="34" y="34" width="34" height="34" rx="8" fill="#F59E0B" stroke="#D97706" strokeWidth="2.5" />
          <text x="51" y="58" textAnchor="middle" fill="#FFFFFF" fontSize="20" fontWeight="bold" fontFamily="sans-serif">
            2
          </text>
        </svg>
      </div>

      {/* 8. Math Symbols "+", "=", "÷" (Bottom Right) */}
      <div className="absolute bottom-20 right-8 sm:right-20 opacity-70 transform rotate-12 animate-cloud-drift">
        <svg width="75" height="75" viewBox="0 0 100 100" fill="none">
          <circle cx="28" cy="30" r="18" fill="#8B5CF6" />
          <text x="28" y="37" textAnchor="middle" fill="#FFFFFF" fontSize="22" fontWeight="bold" fontFamily="sans-serif">
            +
          </text>
          <circle cx="68" cy="58" r="18" fill="#EC4899" />
          <text x="68" y="65" textAnchor="middle" fill="#FFFFFF" fontSize="22" fontWeight="bold" fontFamily="sans-serif">
            =
          </text>
        </svg>
      </div>

      {/* 9. Colorful Star Stickers Scattered */}
      <div className="absolute top-1/2 right-1/4 opacity-65 animate-gentle-bounce">
        <span className="text-3xl filter drop-shadow-sm select-none">⭐</span>
      </div>
      <div className="absolute top-1/4 left-1/4 opacity-60 animate-gentle-wiggle">
        <span className="text-2xl filter drop-shadow-sm select-none">✨</span>
      </div>
      <div className="absolute bottom-1/3 right-1/3 opacity-60 animate-pulse-glow">
        <span className="text-3xl filter drop-shadow-sm select-none">🌟</span>
      </div>
      <div className="absolute top-3/4 left-1/3 opacity-65 animate-gentle-bounce">
        <span className="text-3xl filter drop-shadow-sm select-none">🎨</span>
      </div>

      {/* Subtle school paper grid overlay */}
      <div className="absolute inset-0 school-grid-bg opacity-35" />
    </div>
  );
};
