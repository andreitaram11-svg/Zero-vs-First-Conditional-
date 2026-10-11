export type NavSection = 'instructions' | 'vocabulary' | 'grammar' | 'video' | 'practice' | 'certificate';

export type GameType = 'match' | 'order' | 'choice' | 'complete';

export type ConditionalType = 'zero' | 'first';

export interface VocabItem {
  id: string;
  word: string;
  partOfSpeech: string;
  phonetic: string;
  definition: string;
  category: 'Classroom' | 'Recess' | 'Rules & Exams' | 'Science & Labs';
  exampleZero: string;
  exampleFirst: string;
}

export interface MatchQuestion {
  id: string;
  clause: string;
  matchTarget: string;
  type: ConditionalType;
  context: string;
  explanation: string;
}

export interface OrderQuestion {
  id: string;
  prompt: string;
  type: ConditionalType;
  tokens: string[]; // Correct order
  scrambled: string[];
  context: string;
  explanation: string;
}

export interface ChoiceQuestion {
  id: string;
  scenario: string;
  question: string;
  options: string[];
  correctIndex: number;
  type: ConditionalType;
  explanation: string;
}

export interface CompleteQuestion {
  id: string;
  scenario: string;
  sentenceTemplate: string; // e.g. "If the teacher {blank1} the classroom, students {blank2} quiet."
  verb1Hint: string;
  verb2Hint: string;
  correct1: string; // e.g. "enters"
  correct2: string; // e.g. "become" / "will become"
  acceptableAlternatives1?: string[];
  acceptableAlternatives2?: string[];
  type: ConditionalType;
  explanation: string;
}

export interface VideoScene {
  id: string;
  timestamp: string;
  speaker: string;
  avatarRole: 'teacher' | 'student1' | 'student2' | 'coach';
  text: string;
  conditionalType?: ConditionalType;
  ruleCallout?: string;
}

export interface VideoLesson {
  id: string;
  title: string;
  description: string;
  focus: ConditionalType;
  image: string;
  scenes: VideoScene[];
  checkpointQuestion: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface GameScore {
  matchScore: number;
  matchTotal: number;
  orderScore: number;
  orderTotal: number;
  choiceScore: number;
  choiceTotal: number;
  completeScore: number;
  completeTotal: number;
}
