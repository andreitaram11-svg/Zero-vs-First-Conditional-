import {
  VocabItem,
  MatchQuestion,
  OrderQuestion,
  ChoiceQuestion,
  CompleteQuestion,
  VideoLesson
} from '../types';

export const VOCABULARY_LIST: VocabItem[] = [
  {
    id: 'vocab-1',
    word: 'School Bell',
    partOfSpeech: 'noun / verb',
    phonetic: '/skuːl bɛl/',
    definition: 'The chime or chime system indicating the start, end of classes, or recess period.',
    category: 'Classroom',
    exampleZero: 'If the school bell rings, every student walks immediately to the next classroom.',
    exampleFirst: 'If the school bell rings early today, we will start our recess soccer match ahead of schedule.'
  },
  {
    id: 'vocab-2',
    word: 'Recess',
    partOfSpeech: 'noun',
    phonetic: '/ˈriːsɛs/',
    definition: 'A designated break period between school lessons for playing, eating, and resting.',
    category: 'Recess',
    exampleZero: 'If students have recess, they usually go out to the courtyard.',
    exampleFirst: 'If it stops drizzling before noon, the principal will allow outdoor recess.'
  },
  {
    id: 'vocab-3',
    word: 'Detention',
    partOfSpeech: 'noun',
    phonetic: '/dɪˈtɛnʃən/',
    definition: 'A disciplinary consequence requiring a student to stay after class or during break.',
    category: 'Rules & Exams',
    exampleZero: 'If you arrive late without an excuse note, the dean gives you detention.',
    exampleFirst: 'If Lucas interrupts Mr. Harrison again, he will receive an after-school detention.'
  },
  {
    id: 'vocab-4',
    word: 'Pop Quiz',
    partOfSpeech: 'noun',
    phonetic: '/pɒp kwɪz/',
    definition: 'A short surprise test given to students without advance announcement.',
    category: 'Rules & Exams',
    exampleZero: 'If a teacher gives a pop quiz, students close their notebooks.',
    exampleFirst: 'If you study the biology chapter tonight, you will pass tomorrow’s pop quiz easily.'
  },
  {
    id: 'vocab-5',
    word: 'Cafeteria',
    partOfSpeech: 'noun',
    phonetic: '/ˌkæfɪˈtɪəriə/',
    definition: 'The dining hall where students buy or eat packed lunches and snacks.',
    category: 'Recess',
    exampleZero: 'If you spill juice in the cafeteria, you clean it up with napkins.',
    exampleFirst: 'If the line at the cafeteria is too long, we will buy a sandwich from the kiosk.'
  },
  {
    id: 'vocab-6',
    word: 'Lab Coat & Goggles',
    partOfSpeech: 'noun phrase',
    phonetic: '/læb koʊt ænd ˈɡɒɡəlz/',
    definition: 'Protective gear required inside the chemistry or biology school laboratory.',
    category: 'Science & Labs',
    exampleZero: 'If students mix chemical reagents, they always wear safety goggles.',
    exampleFirst: 'If Emma forgets her lab coat, Professor Hoot will not permit her to start the experiment.'
  },
  {
    id: 'vocab-7',
    word: 'Bunsen Burner',
    partOfSpeech: 'noun',
    phonetic: '/ˈbʌnsən ˈbɜːnər/',
    definition: 'A gas burner used in school science classrooms to heat test tubes and beakers.',
    category: 'Science & Labs',
    exampleZero: 'If you heat pure water to 100°C over a Bunsen burner, it boils.',
    exampleFirst: 'If you touch the metal stand right after turning off the burner, you will burn your fingers.'
  },
  {
    id: 'vocab-8',
    word: 'Hall Pass',
    partOfSpeech: 'noun',
    phonetic: '/hɔːl pɑːs/',
    definition: 'A badge or token permitting a student to walk in school corridors during class.',
    category: 'Classroom',
    exampleZero: 'If you leave the classroom to visit the nurse, you need a hall pass.',
    exampleFirst: 'If the hall monitor stops you without a hall pass, he will escort you back to room 204.'
  },
  {
    id: 'vocab-9',
    word: 'Locker',
    partOfSpeech: 'noun',
    phonetic: '/ˈlɒkər/',
    definition: 'A metal storage compartment where students keep coats, gym equipment, and textbooks.',
    category: 'Classroom',
    exampleZero: 'If you enter the wrong combination on your locker, it stays locked.',
    exampleFirst: 'If I leave my heavy math textbook in the locker, my backpack will feel much lighter.'
  },
  {
    id: 'vocab-10',
    word: 'Hand In / Submit',
    partOfSpeech: 'phrasal verb',
    phonetic: '/hænd ɪn/',
    definition: 'To deliver homework, a report, or an exam paper to the educator.',
    category: 'Rules & Exams',
    exampleZero: 'If you hand in your assignment late, the system deducts five penalty points.',
    exampleFirst: 'If we finish this history slide deck together today, we will hand it in before midnight.'
  },
  {
    id: 'vocab-11',
    word: 'Cheating',
    partOfSpeech: 'noun / verb',
    phonetic: '/ˈtʃiːtɪŋ/',
    definition: 'Dishonest conduct during a test, such as copying notes or looking at peers’ answers.',
    category: 'Rules & Exams',
    exampleZero: 'If a student cheats on an exam, the teacher cancels the paper.',
    exampleFirst: 'If anyone whispers during the finals, Mr. Clarke will confiscate the exam sheets.'
  },
  {
    id: 'vocab-12',
    word: 'Gym Shoes (Sneakers)',
    partOfSpeech: 'noun',
    phonetic: '/dʒɪm ʃuːz/',
    definition: 'Footwear required for physical education lessons on the basketball court.',
    category: 'Recess',
    exampleZero: 'If students wear leather boots on the polished gym floor, it causes scuff marks.',
    exampleFirst: 'If you bring your gym shoes tomorrow, coach will let you join the volleyball scrimmage.'
  }
];

export const VIDEO_LESSONS: VideoLesson[] = [
  {
    id: 'lesson-1',
    title: 'Episode 1: The Chemistry Lab Rules (Zero Conditional)',
    description: 'Learn how school laboratory safety rules and scientific facts always use Zero Conditional (If + Present Simple, Present Simple).',
    focus: 'zero',
    image: '/src/assets/images/hero_school_classroom_1791681771085.jpg',
    scenes: [
      {
        id: 's1-1',
        timestamp: '0:00',
        speaker: 'Professor Hoot',
        avatarRole: 'teacher',
        text: 'Welcome to Chemistry Lab 101, scholars! Before we light any burner, listen carefully to our permanent lab rules.',
        ruleCallout: 'Permanent rules are universal facts: they always happen!'
      },
      {
        id: 's1-2',
        timestamp: '0:12',
        speaker: 'Professor Hoot',
        avatarRole: 'teacher',
        text: 'If you touch hot glassware without safety tongs, you burn your skin.',
        conditionalType: 'zero',
        ruleCallout: 'Notice both verbs: "touch" (present) and "burn" (present). 100% true every time!'
      },
      {
        id: 's1-3',
        timestamp: '0:25',
        speaker: 'Maya (Student)',
        avatarRole: 'student1',
        text: 'Professor, what happens if water reaches 100 degrees Celsius in this glass beaker?',
        conditionalType: 'zero'
      },
      {
        id: 's1-4',
        timestamp: '0:36',
        speaker: 'Professor Hoot',
        avatarRole: 'teacher',
        text: 'If water boils, it transforms into steam. That is a scientific fact. We always use Zero Conditional for laws of nature and strict school rules!',
        conditionalType: 'zero',
        ruleCallout: 'Formula: If + Present Simple, Present Simple.'
      }
    ],
    checkpointQuestion: {
      question: 'Why do we use the Zero Conditional for laboratory safety rules?',
      options: [
        'Because the consequence is a permanent truth or automatic rule every time the condition happens.',
        'Because it only happens once in the distant future.',
        'Because we are uncertain whether hot glass hurts.',
        'Because it requires the modal verb "would" in past form.'
      ],
      correctIndex: 0,
      explanation: 'Zero Conditional expresses automatic facts, rules, and cause-and-effect that are consistently true in every instance.'
    }
  },
  {
    id: 'lesson-2',
    title: 'Episode 2: The Rainy Recess Dilemma (First Conditional)',
    description: 'Explore how students talk about specific future possibilities, weather predictions, and real plans for tomorrow’s break.',
    focus: 'first',
    image: '/src/assets/images/school_recess_yard_1791681782303.jpg',
    scenes: [
      {
        id: 's2-1',
        timestamp: '0:00',
        speaker: 'Leo (Student)',
        avatarRole: 'student2',
        text: 'Look at those dark storm clouds gathering over the football pitch! What are we going to do during break?',
        ruleCallout: 'Talking about a specific situation in the near future!'
      },
      {
        id: 's2-2',
        timestamp: '0:14',
        speaker: 'Coach Ramirez',
        avatarRole: 'coach',
        text: 'If it rains during recess tomorrow, we will move the entire soccer tournament inside the gymnasium.',
        conditionalType: 'first',
        ruleCallout: 'Notice: "If it rains" (Present Simple), "we will move" (will + base verb).'
      },
      {
        id: 's2-3',
        timestamp: '0:28',
        speaker: 'Maya (Student)',
        avatarRole: 'student1',
        text: 'Awesome! And if our squad wins the semifinal tomorrow, will we receive the golden trophy?',
        conditionalType: 'first'
      },
      {
        id: 's2-4',
        timestamp: '0:40',
        speaker: 'Professor Hoot',
        avatarRole: 'teacher',
        text: 'Hoot hoot! Yes indeed! Remember: First conditional is for real, specific future possibilities. If you practice hard, you will succeed!',
        conditionalType: 'first',
        ruleCallout: 'Formula: If + Present Simple, WILL / WON\'T + Base Verb.'
      }
    ],
    checkpointQuestion: {
      question: 'Which sentence correctly represents the First Conditional for a future recess plan?',
      options: [
        'If the sun shines tomorrow, we will eat our lunch on the grass.',
        'If the sun shines, we ate our lunch on the grass.',
        'If the sun will shine tomorrow, we will eat lunch.',
        'If the sun shined, we eat lunch.'
      ],
      correctIndex: 0,
      explanation: 'In the First Conditional, the "if" clause takes the Present Simple ("shines"), while the result clause uses "will + base verb" ("will eat"). Never put "will" inside the if-clause!'
    }
  }
];

export const MATCH_QUESTIONS: MatchQuestion[] = [
  {
    id: 'm-1',
    clause: 'If you speak during a silent reading session,',
    matchTarget: 'the teacher asks you to put your head down.',
    type: 'zero',
    context: 'Classroom Rule',
    explanation: 'Zero Conditional: This is a consistent classroom rule that happens every single time.'
  },
  {
    id: 'm-2',
    clause: 'If I pass my algebra test tomorrow morning,',
    matchTarget: 'my parents will let me join the school robotics club.',
    type: 'first',
    context: 'Future Promise',
    explanation: 'First Conditional: A specific, real future possibility with "will let".'
  },
  {
    id: 'm-3',
    clause: 'If the cafeteria runs out of pizza slices today,',
    matchTarget: 'we will buy vegetable sandwiches instead.',
    type: 'first',
    context: 'Lunchtime Plan',
    explanation: 'First Conditional: A specific future scenario about today’s lunch contingency.'
  },
  {
    id: 'm-4',
    clause: 'If students leave ice cubes in the sunny school yard,',
    matchTarget: 'they melt into water puddles.',
    type: 'zero',
    context: 'Natural Fact',
    explanation: 'Zero Conditional: A universal scientific fact (present simple + present simple).'
  },
  {
    id: 'm-5',
    clause: 'If you arrive after the morning warning chime,',
    matchTarget: 'the school secretary marks you tardy.',
    type: 'zero',
    context: 'Attendance Policy',
    explanation: 'Zero Conditional: Automatic school policy that applies whenever you arrive late.'
  },
  {
    id: 'm-6',
    clause: 'If our soccer team practices every afternoon this week,',
    matchTarget: 'we will win the inter-school championship on Saturday.',
    type: 'first',
    context: 'Sports Prediction',
    explanation: 'First Conditional: Realistic future prediction using "will win".'
  },
  {
    id: 'm-7',
    clause: 'If you do not wear safety goggles in the woodshop,',
    matchTarget: 'flying wood chips hurt your eyes.',
    type: 'zero',
    context: 'Workshop Safety',
    explanation: 'Zero Conditional: General physical cause-and-effect principle.'
  },
  {
    id: 'm-8',
    clause: 'If Sophia forgets her locker combination tomorrow,',
    matchTarget: 'the janitor will bring the master key to open it.',
    type: 'first',
    context: 'Contingency Action',
    explanation: 'First Conditional: Specific future solution ("will bring") for tomorrow’s possible problem.'
  }
];

export const ORDER_QUESTIONS: OrderQuestion[] = [
  {
    id: 'ord-1',
    prompt: 'Construct a Zero Conditional sentence about the school fire alarm:',
    type: 'zero',
    tokens: ['If', 'the fire alarm', 'rings,', 'students', 'evacuate', 'the school building.'],
    scrambled: ['evacuate', 'rings,', 'If', 'the school building.', 'students', 'the fire alarm'],
    context: 'Emergency Drill',
    explanation: 'Both verbs use Present Simple ("rings" and "evacuate") because emergency drill rules are always true.'
  },
  {
    id: 'ord-2',
    prompt: 'Construct a First Conditional sentence about tomorrow’s homework:',
    type: 'first',
    tokens: ['If', 'you submit', 'the homework', 'tomorrow,', 'Mr. Davis', 'will give', 'you full credit.'],
    scrambled: ['tomorrow,', 'you submit', 'will give', 'If', 'you full credit.', 'Mr. Davis', 'the homework'],
    context: 'Classwork Due Date',
    explanation: 'First Conditional structure: "If you submit" (Present Simple), "Mr. Davis will give" (will + base verb).'
  },
  {
    id: 'ord-3',
    prompt: 'Construct a Zero Conditional sentence about the school library:',
    type: 'zero',
    tokens: ['If', 'you borrow', 'a library book,', 'you return', 'it within', 'two weeks.'],
    scrambled: ['it within', 'you return', 'If', 'two weeks.', 'a library book,', 'you borrow'],
    context: 'Library Regulations',
    explanation: 'Library regulations represent habitual standing policies: Present Simple in both clauses.'
  },
  {
    id: 'ord-4',
    prompt: 'Construct a First Conditional sentence about the upcoming recess game:',
    type: 'first',
    tokens: ['If', 'Liam misses', 'the free throw,', 'the opposing team', 'will grab', 'the rebound.'],
    scrambled: ['will grab', 'the free throw,', 'the rebound.', 'the opposing team', 'If', 'Liam misses'],
    context: 'Basketball Match',
    explanation: 'Specific future event during a basketball match: "misses" (Present Simple) + "will grab" (Future).'
  },
  {
    id: 'ord-5',
    prompt: 'Construct a Zero Conditional sentence about hot lunch cafeteria policy:',
    type: 'zero',
    tokens: ['If', 'you press', 'the water dispenser button,', 'cold water', 'pours', 'into the cup.'],
    scrambled: ['cold water', 'the water dispenser button,', 'into the cup.', 'If', 'pours', 'you press'],
    context: 'Machine Operation',
    explanation: 'Machine operation is an invariable cause-and-effect rule: Present Simple + Present Simple.'
  },
  {
    id: 'ord-6',
    prompt: 'Construct a First Conditional sentence warning a classmate about detention:',
    type: 'first',
    tokens: ['If', 'you do not listen', 'to the teacher,', 'she will send', 'you to', 'the principal office.'],
    scrambled: ['the principal office.', 'you to', 'If', 'she will send', 'to the teacher,', 'you do not listen'],
    context: 'Disciplinary Warning',
    explanation: 'Warning for a specific immediate future outcome: "do not listen" + "will send".'
  }
];

export const CHOICE_QUESTIONS: ChoiceQuestion[] = [
  {
    id: 'ch-1',
    scenario: 'School Rule: Every Friday, the teacher checks homework folders.',
    question: 'Complete the Zero Conditional rule: "If a student _______ homework, the teacher marks a red checkmark."',
    options: ['forgets', 'will forget', 'forgot', 'would forget'],
    correctIndex: 0,
    type: 'zero',
    explanation: 'In the Zero Conditional "if" clause, we always use the Present Simple (3rd person singular: "forgets"). No "will" in condition clauses!'
  },
  {
    id: 'ch-2',
    scenario: 'Tomorrow’s Weather & Outdoor PE: The forecast predicts a thunderstorm tomorrow at 2:00 PM.',
    question: 'Complete the First Conditional: "If it _______ tomorrow afternoon, coach _______ the class inside the sports hall."',
    options: [
      'rains / will keep',
      'will rain / keeps',
      'rains / keeps',
      'rained / would keep'
    ],
    correctIndex: 0,
    type: 'first',
    explanation: 'First Conditional pattern: If + Present Simple ("rains"), will + base verb ("will keep"). Remember: never put "will" inside the if-clause!'
  },
  {
    id: 'ch-3',
    scenario: 'Science Lab Fact: Water and heat experiment.',
    question: 'Identify the correct Zero Conditional sentence:',
    options: [
      'If you heat ice on the lab table, it melts into liquid.',
      'If you heat ice on the lab table, it will melted.',
      'If you will heat ice, it melts.',
      'If you heat ice, it would melt into water.'
    ],
    correctIndex: 0,
    type: 'zero',
    explanation: 'Universal scientific law: "If you heat... it melts." Both verbs are in the Present Simple tense.'
  },
  {
    id: 'ch-4',
    scenario: 'Upcoming School Dance: The tickets go on sale on Wednesday.',
    question: 'Complete the sentence: "If tickets _______ cheap on Wednesday, I _______ two for my best friend and me."',
    options: [
      'are / will buy',
      'will be / buy',
      'are / buy',
      'were / bought'
    ],
    correctIndex: 0,
    type: 'first',
    explanation: 'This refers to a specific future purchase on Wednesday: "are" (Present Simple) + "will buy" (Future).'
  },
  {
    id: 'ch-5',
    scenario: 'Hallway Conduct Rule: School handbook regulation #4.',
    question: 'Choose the correct sentence following the handbook regulation (Zero Conditional):',
    options: [
      'If students run in the corridor, they risk tripping.',
      'If students run in the corridor, they will risked tripping.',
      'If students will run, they trip.',
      'If students ran, they trip.'
    ],
    correctIndex: 0,
    type: 'zero',
    explanation: 'School regulations use Zero Conditional: "run" (Present Simple) and "risk" (Present Simple).'
  },
  {
    id: 'ch-6',
    scenario: 'Pop Quiz Warning: The history teacher notices the class is distracted.',
    question: '"If you _______ attention to this slide, you _______ the surprise pop quiz in ten minutes!"',
    options: [
      'do not pay / will fail',
      'will not pay / fail',
      'did not pay / would fail',
      'not pay / will fail'
    ],
    correctIndex: 0,
    type: 'first',
    explanation: 'Warning for an impending future event: "do not pay" (Present Simple negative) + "will fail" (will + base verb).'
  },
  {
    id: 'ch-7',
    scenario: 'Distinction Check: General Truth vs Future Prediction.',
    question: 'Which sentence is a FIRST CONDITIONAL (specific future possibility)?',
    options: [
      'If I see Carlos at the cafeteria today, I will invite him to study with us.',
      'If the cafeteria bell rings, students line up.',
      'If you mix red and yellow paint in art class, you get orange.',
      'If plants do not get sunlight in the classroom, they wither.'
    ],
    correctIndex: 0,
    type: 'first',
    explanation: 'The sentence about Carlos is a specific future possibility ("today, I will invite"). The other three are general facts and standing rules (Zero Conditional).'
  },
  {
    id: 'ch-8',
    scenario: 'Lost & Found Policy: What happens when an item is found.',
    question: '"If the janitor finds a stray jacket on the playground bench, he _______ it to the Lost & Found office."',
    options: [
      'takes',
      'will taken',
      'would took',
      'taking'
    ],
    correctIndex: 0,
    type: 'zero',
    explanation: 'This is the standard procedure/habitual routine of the school janitor: Present Simple ("takes").'
  }
];

export const COMPLETE_QUESTIONS: CompleteQuestion[] = [
  {
    id: 'cmp-1',
    scenario: 'Permanent School Rule: Entering the computer lab.',
    sentenceTemplate: 'If a student {blank1} sticky snacks into the computer lab, the technician {blank2} the computer workstation.',
    verb1Hint: 'bring',
    verb2Hint: 'lock',
    correct1: 'brings',
    correct2: 'locks',
    type: 'zero',
    explanation: 'Zero Conditional (permanent rule): If a student brings (3rd person singular -s), the technician locks.'
  },
  {
    id: 'cmp-2',
    scenario: 'Tomorrow’s Recess Soccer Match: Weather dependent.',
    sentenceTemplate: 'If the playground {blank1} muddy tomorrow morning, we {blank2} table tennis in the recreation lounge.',
    verb1Hint: 'be',
    verb2Hint: 'play (future)',
    correct1: 'is',
    correct2: 'will play',
    acceptableAlternatives2: ['’ll play', '\'ll play'],
    type: 'first',
    explanation: 'First Conditional: "If the playground is" (Present Simple of be), "we will play" (will + base verb).'
  },
  {
    id: 'cmp-3',
    scenario: 'Library Rule: Returning overdue books.',
    sentenceTemplate: 'If you {blank1} a library book late, the school librarian {blank2} a fifty-cent fine per day.',
    verb1Hint: 'return',
    verb2Hint: 'charge',
    correct1: 'return',
    correct2: 'charges',
    type: 'zero',
    explanation: 'Zero Conditional: Habitual library policy. "If you return... the librarian charges."'
  },
  {
    id: 'cmp-4',
    scenario: 'Friday Science Project: Due this coming Friday at 3 PM.',
    sentenceTemplate: 'If Liam and Maya {blank1} their robot prototype on time, they {blank2} first prize at the school science fair.',
    verb1Hint: 'finish',
    verb2Hint: 'win (future)',
    correct1: 'finish',
    correct2: 'will win',
    acceptableAlternatives2: ['’ll win', '\'ll win'],
    type: 'first',
    explanation: 'First Conditional: Specific future possibility this Friday. "finish" + "will win".'
  },
  {
    id: 'cmp-5',
    scenario: 'Habitual Fact: Skipping morning breakfast.',
    sentenceTemplate: 'If students {blank1} breakfast before morning classes, their stomach {blank2} during the silent reading hour.',
    verb1Hint: 'skip',
    verb2Hint: 'growl',
    correct1: 'skip',
    correct2: 'growls',
    type: 'zero',
    explanation: 'Zero Conditional: Natural human biological reaction: "skip" + "growls".'
  },
  {
    id: 'cmp-6',
    scenario: 'Exam Preparation: Final exam next Monday.',
    sentenceTemplate: 'If you {blank1} the grammar flashcards every night, you {blank2} 100% on Professor Hoot’s exam.',
    verb1Hint: 'review',
    verb2Hint: 'score (future)',
    correct1: 'review',
    correct2: 'will score',
    acceptableAlternatives2: ['’ll score', '\'ll score'],
    type: 'first',
    explanation: 'First Conditional: Realistic prediction for the upcoming test: "review" + "will score".'
  }
];

export const OWL_QUOTES = {
  welcome: "Hoot hoot! Welcome to my Grammar Academy! Today we conquer the Zero and First Conditionals through real school situations!",
  zeroTip: "Wise Owl Rule #1: Use Zero Conditional for permanent facts, natural laws, and strict school rules. Formula: If + Present Simple, Present Simple!",
  firstTip: "Wise Owl Rule #2: Use First Conditional for specific future possibilities and real predictions. Formula: If + Present Simple, WILL + verb!",
  commonMistake: "Watch out! Never put 'will' inside the 'if' clause! We say 'If it rains tomorrow, I will take my umbrella', NOT 'If it will rain'!",
  correctCheer: [
    "Splendid deduction, scholar! 10 points to your report card!",
    "Hoot hoot! Spot on! Your grammar instincts are razor sharp!",
    "Brilliant work! That sentence flows like a well-structured essay!",
    "Magnificent! Even the principal would applaud that grammar mastery!"
  ],
  encourageTry: [
    "Keep your feathers up! Review the verb tense rule and try again!",
    "Close one! Remember: Check if it's an automatic rule (Zero) or a future event (First)!",
    "Every mistake is a stepping stone to fluency! Let’s review together."
  ]
};
