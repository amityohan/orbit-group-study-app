export interface User {
  id: string;
  name: string;
  avatar: string;
  initials: string;
  color: string;
  university?: string;
  bio?: string;
  streak: number;
  focusHours: number;
  rank: number;
  status?: "Focusing" | "On break" | "Away" | "Offline";
  currentTask?: string;
}

export interface Room {
  id: string;
  name: string;
  subject: "Computer Science" | "Mathematics" | "Biology" | "Languages" | "Law" | "Physics" | "Literature";
  description: string;
  isPrivate: boolean;
  code: string;
  membersCount: number;
  maxMembers: number;
  activePomodoro: {
    mode: "focus" | "shortBreak" | "longBreak";
    timeLeft: number; // in seconds
    isRunning: boolean;
  };
  members: User[];
  gradient: string;
  tags: string[];
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  hint?: string;
  difficulty?: "easy" | "medium" | "hard";
}

export interface FlashcardDeck {
  id: string;
  title: string;
  subject: string;
  description: string;
  cardCount: number;
  masteryPercentage: number;
  dueToday: number;
  gradient: string;
  cards: Flashcard[];
}

export interface LeaderboardUser {
  rank: number;
  prevRank: number;
  user: User;
  focusHours: number;
  studySessions: number;
  isCurrentUser?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  dateUnlocked?: string;
  progress?: { current: number; total: number };
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "streak" | "invite" | "achievement" | "room";
}

// Current Mock User
export const currentUser: User = {
  id: "usr_orbit_01",
  name: "Alex Rivera",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  initials: "AR",
  color: "from-violet-500 to-cyan-500",
  university: "Stanford University • Cognitive Science & CS",
  bio: "Exploring neural interfaces, spaced repetition, and deep focus rituals. Let's conquer algorithms together 🚀",
  streak: 14,
  focusHours: 128.5,
  rank: 4,
  status: "Focusing",
  currentTask: "Distributed Systems & Raft Consensus",
};

// Mock Users
export const mockUsers: User[] = [
  currentUser,
  {
    id: "usr_orbit_02",
    name: "Elena Rostova",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    initials: "ER",
    color: "from-pink-500 to-rose-500",
    university: "ETH Zürich • Quantum Physics",
    streak: 28,
    focusHours: 194.2,
    rank: 1,
    status: "Focusing",
    currentTask: "Schrödinger Equation Proofs",
  },
  {
    id: "usr_orbit_03",
    name: "Kenji Sato",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    initials: "KS",
    color: "from-amber-400 to-orange-500",
    university: "University of Tokyo • Machine Learning",
    streak: 21,
    focusHours: 172.0,
    rank: 2,
    status: "Focusing",
    currentTask: "Attention Mechanism Experiments",
  },
  {
    id: "usr_orbit_04",
    name: "Maya Chen",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
    initials: "MC",
    color: "from-cyan-400 to-blue-600",
    university: "UC Berkeley • Molecular Biology",
    streak: 18,
    focusHours: 145.8,
    rank: 3,
    status: "On break",
    currentTask: "CRISPR-Cas9 Gene Editing Case Studies",
  },
  {
    id: "usr_orbit_05",
    name: "Marcus Vance",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    initials: "MV",
    color: "from-emerald-400 to-teal-600",
    university: "Oxford University • Constitutional Law",
    streak: 9,
    focusHours: 112.4,
    rank: 5,
    status: "Away",
    currentTask: "Appellate Briefing Prep",
  },
  {
    id: "usr_orbit_06",
    name: "Sofia Al-Mansoor",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    initials: "SA",
    color: "from-purple-500 to-indigo-600",
    university: "Sorbonne • Comparative Linguistics",
    streak: 12,
    focusHours: 98.7,
    rank: 6,
    status: "Focusing",
    currentTask: "Romantic Dialect Semantics",
  },
  {
    id: "usr_orbit_07",
    name: "Liam O'Connor",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    initials: "LO",
    color: "from-blue-500 to-indigo-500",
    university: "MIT • Aerospace Engineering",
    streak: 7,
    focusHours: 89.1,
    rank: 7,
    status: "Focusing",
    currentTask: "Orbital Mechanics Simulations",
  },
  {
    id: "usr_orbit_08",
    name: "Zara Patel",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    initials: "ZP",
    color: "from-fuchsia-500 to-rose-500",
    university: "Cambridge • Organic Chemistry",
    streak: 15,
    focusHours: 84.3,
    rank: 8,
    status: "On break",
    currentTask: "Stereochemistry Reaction Mechanisms",
  },
];

// Mock Rooms
export const mockRooms: Room[] = [
  {
    id: "room-cs-algorithms",
    name: "Deep Algorithms & LeetCode Hard",
    subject: "Computer Science",
    description: "Quiet co-working for competitive programming, dynamic programming graphs, and distributed systems architecture.",
    isPrivate: false,
    code: "ALG-902",
    membersCount: 6,
    maxMembers: 12,
    activePomodoro: {
      mode: "focus",
      timeLeft: 1420,
      isRunning: true,
    },
    members: [mockUsers[0], mockUsers[1], mockUsers[2], mockUsers[6]],
    gradient: "from-violet-600/30 via-indigo-600/20 to-cyan-500/10",
    tags: ["Graph Theory", "DP", "Quiet Co-work", "Pomodoro 25/5"],
  },
  {
    id: "room-cellular-bio",
    name: "Molecular Bio & MCAT Sprint",
    subject: "Biology",
    description: "Pre-med squad grinding cellular respiration, amino acid pathways, and organ physiology flashcard reviews.",
    isPrivate: false,
    code: "BIO-441",
    membersCount: 8,
    maxMembers: 10,
    activePomodoro: {
      mode: "focus",
      timeLeft: 890,
      isRunning: true,
    },
    members: [mockUsers[3], mockUsers[7], mockUsers[4]],
    gradient: "from-emerald-600/30 via-teal-600/20 to-cyan-500/10",
    tags: ["Pre-Med", "Biochemistry", "MCAT", "Active Recall"],
  },
  {
    id: "room-quantum-mechanics",
    name: "Quantum Field Theory & PDEs",
    subject: "Mathematics",
    description: "Deriving differential equations and particle physics wave equations. Shared whiteboard open for derivations.",
    isPrivate: false,
    code: "QNT-318",
    membersCount: 4,
    maxMembers: 8,
    activePomodoro: {
      mode: "focus",
      timeLeft: 1200,
      isRunning: true,
    },
    members: [mockUsers[1], mockUsers[2]],
    gradient: "from-cyan-600/30 via-blue-600/20 to-violet-500/10",
    tags: ["Calculus IV", "Hamiltonians", "Whiteboard"],
  },
  {
    id: "room-polyglot-spanish",
    name: "Spanish DELE C1 Immersion",
    subject: "Languages",
    description: "Habla solo en español. Vocabulary drilling, subjunctive moods, and essay outline peer-reviews.",
    isPrivate: false,
    code: "ESP-552",
    membersCount: 5,
    maxMembers: 8,
    activePomodoro: {
      mode: "shortBreak",
      timeLeft: 240,
      isRunning: true,
    },
    members: [mockUsers[5], mockUsers[0], mockUsers[3]],
    gradient: "from-amber-600/30 via-orange-600/20 to-rose-500/10",
    tags: ["DELE C1", "Subjunctive", "Audio Chat"],
  },
  {
    id: "room-constitutional-law",
    name: "SCOTUS Precedents & Torts",
    subject: "Law",
    description: "1L and 2L law study table. Briefing landmark decisions, analyzing strict scrutiny, and tort doctrines.",
    isPrivate: true,
    code: "LAW-773",
    membersCount: 3,
    maxMembers: 6,
    activePomodoro: {
      mode: "focus",
      timeLeft: 1500,
      isRunning: false,
    },
    members: [mockUsers[4], mockUsers[0]],
    gradient: "from-rose-600/30 via-pink-600/20 to-violet-500/10",
    tags: ["1L Prep", "Case Briefs", "Private Room"],
  },
  {
    id: "room-orbital-mechanics",
    name: "Orbital Mechanics & Astrodynamics",
    subject: "Physics",
    description: "Keplerian orbits, Hohmann transfers, and interplanetary trajectory calculations. LaTeX notes shared.",
    isPrivate: false,
    code: "AST-104",
    membersCount: 7,
    maxMembers: 12,
    activePomodoro: {
      mode: "focus",
      timeLeft: 620,
      isRunning: true,
    },
    members: [mockUsers[6], mockUsers[1]],
    gradient: "from-blue-600/30 via-indigo-600/20 to-teal-500/10",
    tags: ["Astrophysics", "Kerbal Club", "Derivations"],
  },
  {
    id: "room-organic-chem",
    name: "Organic Chemistry Mechanisms",
    subject: "Biology",
    description: "SN1/SN2, E1/E2, and retro-synthetic analysis. Daily deck battles and reaction roadmap sketching.",
    isPrivate: false,
    code: "CHM-808",
    membersCount: 5,
    maxMembers: 10,
    activePomodoro: {
      mode: "focus",
      timeLeft: 940,
      isRunning: true,
    },
    members: [mockUsers[7], mockUsers[3]],
    gradient: "from-purple-600/30 via-pink-600/20 to-emerald-500/10",
    tags: ["Orgo II", "Reaction Maps", "Synthesis"],
  },
  {
    id: "room-world-literature",
    name: "Modernist Literature & Critique",
    subject: "Literature",
    description: "Close textual analysis of Joyce, Woolf, and Marquez. Deep silent reading block followed by 10m discussion.",
    isPrivate: true,
    code: "LIT-219",
    membersCount: 4,
    maxMembers: 6,
    activePomodoro: {
      mode: "focus",
      timeLeft: 1350,
      isRunning: true,
    },
    members: [mockUsers[5], mockUsers[4]],
    gradient: "from-amber-600/30 via-yellow-600/20 to-violet-500/10",
    tags: ["Literary Theory", "Silent Reading", "Thesis"],
  },
];

// Mock Flashcard Decks
export const mockDecks: FlashcardDeck[] = [
  {
    id: "deck-javascript-internals",
    title: "JavaScript Engine & Event Loop",
    subject: "Computer Science",
    description: "V8 memory heaps, call stacks, microtask queues, garbage collection mark-and-sweep, and prototype chains.",
    cardCount: 10,
    masteryPercentage: 84,
    dueToday: 4,
    gradient: "from-amber-500/20 to-violet-500/20",
    cards: [
      {
        id: "c1",
        front: "What is the difference between the Call Stack and the Task Queue in V8?",
        back: "The Call Stack executes synchronous code frame by frame (LIFO). The Task (Macro) Queue holds asynchronous callbacks (like setTimeout or DOM events) waiting for the stack to clear.",
        hint: "Think LIFO vs FIFO execution",
        difficulty: "medium",
      },
      {
        id: "c2",
        front: "How do Microtasks (Promises, queueMicrotask) differ in priority from Macrotasks?",
        back: "Microtasks always execute immediately after the current operation finishes and before the Event Loop yields to the next macrotask or renders.",
        hint: "Promises run before setTimeout(0)",
        difficulty: "easy",
      },
      {
        id: "c3",
        front: "Explain the 'Mark and Sweep' garbage collection algorithm.",
        back: "V8 starts from roots (global objects, active stack vars), marks every reachable object in memory, and then frees (sweeps) all unreferenced allocated memory.",
        hint: "Reachability from roots",
        difficulty: "medium",
      },
      {
        id: "c4",
        front: "What is the purpose of the Hidden Class (Maps) optimization in V8?",
        back: "V8 creates internal hidden classes dynamically so objects with identical shapes can share inline caches for fast property lookups without dictionary overhead.",
        hint: "Avoiding dynamic hashtable lookups",
        difficulty: "hard",
      },
      {
        id: "c5",
        front: "What does WeakMap prevent in relation to memory management?",
        back: "WeakMap holds weak references to key objects. If no other strong references exist, the key-value pair can be collected by GC, preventing memory leaks.",
        hint: "Keys must be objects and non-enumerable",
        difficulty: "medium",
      },
      {
        id: "c6",
        front: "What is Temporal Dead Zone (TDZ)?",
        back: "The period between entering the scope where a let/const variable is bound and when it is actually initialized with a value. Accessing it triggers a ReferenceError.",
        hint: "let and const are hoisted without initialization",
        difficulty: "easy",
      },
      {
        id: "c7",
        front: "How does 'this' binding work in arrow functions?",
        back: "Arrow functions do not define their own 'this'. They lexically capture 'this' from their enclosing execution context at definition time.",
        hint: "Lexical scoping instead of dynamic call site",
        difficulty: "easy",
      },
      {
        id: "c8",
        front: "What is an Inline Cache (IC)?",
        back: "A compiler optimization where the machine code caches the memory offset of an object property based on past lookups, bypassing hash table lookups.",
        hint: "Speeds up obj.x repeatedly",
        difficulty: "hard",
      },
      {
        id: "c9",
        front: "What triggers an unhandled promise rejection?",
        back: "When a Promise rejects and there is no .catch() handler or try/catch around an await attached before the microtask cycle completes.",
        hint: "process.on('unhandledRejection')",
        difficulty: "easy",
      },
      {
        id: "c10",
        front: "Explain Structured Cloning vs JSON.parse(JSON.stringify()).",
        back: "structuredClone() supports circular references, Sets, Maps, Dates, RegExps, and TypedArrays, which standard JSON serialization either drops or corrupts.",
        hint: "Native browser deep clone API",
        difficulty: "medium",
      },
    ],
  },
  {
    id: "deck-cellular-biology",
    title: "Cellular Respiration & Krebs Cycle",
    subject: "Biology",
    description: "Glycolysis, pyruvate oxidation, the citric acid cycle, ATP synthase proton gradients, and electron transport chain.",
    cardCount: 10,
    masteryPercentage: 72,
    dueToday: 6,
    gradient: "from-emerald-500/20 to-cyan-500/20",
    cards: [
      {
        id: "cb1",
        front: "What is the net yield of ATP and NADH per glucose molecule in Glycolysis?",
        back: "2 net ATP (4 produced minus 2 consumed in investment phase), 2 NADH, and 2 Pyruvate molecules.",
        hint: "Cytoplasm pathway",
        difficulty: "easy",
      },
      {
        id: "cb2",
        front: "Where does the Citric Acid (Krebs) Cycle occur in eukaryotic cells?",
        back: "In the mitochondrial matrix. (Electron Transport Chain complexes are embedded in the inner mitochondrial membrane).",
        hint: "Inner compartment",
        difficulty: "easy",
      },
      {
        id: "cb3",
        front: "What is the final electron acceptor in aerobic respiration?",
        back: "Molecular Oxygen (O2), which accepts electrons and combines with protons to form water (H2O).",
        hint: "Reduced to water at Complex IV",
        difficulty: "easy",
      },
      {
        id: "cb4",
        front: "What enzyme catalyzes the generation of ATP via chemiosmosis?",
        back: "ATP Synthase, powered by the proton-motive force (H+ gradient) across the inner mitochondrial membrane into the matrix.",
        hint: "Rotary motor mechanism",
        difficulty: "medium",
      },
      {
        id: "cb5",
        front: "What molecule initiates the Krebs cycle by combining with Oxaloacetate?",
        back: "Acetyl-CoA (2 carbons) binds with Oxaloacetate (4 carbons) to form Citrate (6 carbons).",
        hint: "Formed from Pyruvate dehydrogenase",
        difficulty: "medium",
      },
      {
        id: "cb6",
        front: "How does Complex II (Succinate Dehydrogenase) differ from Complexes I, III, and IV?",
        back: "Complex II does NOT pump protons across the membrane; it directly transfers electrons from FADH2 to ubiquinone (CoQ).",
        hint: "Does not pump H+",
        difficulty: "hard",
      },
      {
        id: "cb7",
        front: "What happens during Lactic Acid Fermentation when oxygen is absent?",
        back: "Pyruvate is reduced to Lactate by lactate dehydrogenase, oxidizing NADH back into NAD+ so glycolysis can continue generating 2 ATP.",
        hint: "Regenerates NAD+",
        difficulty: "medium",
      },
      {
        id: "cb8",
        front: "What is the role of Cytochrome C in the electron transport chain?",
        back: "It is a mobile peripheral membrane protein that transports single electrons from Complex III to Complex IV.",
        hint: "Also a trigger for apoptosis if released",
        difficulty: "hard",
      },
      {
        id: "cb9",
        front: "How many total ATP are typically produced from 1 molecule of glucose aerobically?",
        back: "Approximately 30 to 32 ATP, depending on the NADH transport shuttle used (Malate-Aspartate vs Glycerol-3-Phosphate).",
        hint: "Theoretical maximum around 36-38, actual ~30-32",
        difficulty: "medium",
      },
      {
        id: "cb10",
        front: "Which allosteric enzyme is the primary rate-limiting step in Glycolysis?",
        back: "Phosphofructokinase-1 (PFK-1), inhibited by high ATP and Citrate, and activated by AMP and Fructose 2,6-bisphosphate.",
        hint: "Converts F6P to F-1,6-BP",
        difficulty: "hard",
      },
    ],
  },
  {
    id: "deck-spanish-advanced",
    title: "Spanish Subjunctive & Idiomatic Mastery",
    subject: "Languages",
    description: "Subjunctive moods for doubt, desire, hypothetical past conditionals, and colloquial native expressions.",
    cardCount: 10,
    masteryPercentage: 65,
    dueToday: 8,
    gradient: "from-rose-500/20 to-amber-500/20",
    cards: [
      {
        id: "sp1",
        front: "Translate & conjugate: 'I hope that you have a great day' using Ojalá.",
        back: "'Ojalá que tengas un gran día.' (Uses present subjunctive 'tengas' from tener).",
        hint: "WEIRDO: Wishes / Hope",
        difficulty: "easy",
      },
      {
        id: "sp2",
        front: "When do you use the imperfect subjunctive instead of the present subjunctive?",
        back: "When the main clause verb is in the past (pretérito, imperfecto, condicional) or when expressing hypothetical contrary-to-fact 'if' clauses (e.g. 'Si tuviera dinero...').",
        hint: "-ra or -se endings",
        difficulty: "medium",
      },
      {
        id: "sp3",
        front: "Translate: 'Although it might rain tomorrow, we will go.'",
        back: "'Aunque llueva mañana, iremos.' (Subjunctive 'llueva' because rain tomorrow is uncertain/hypothetical).",
        hint: "Aunque + subjunctive for uncertainty",
        difficulty: "medium",
      },
      {
        id: "sp4",
        front: "What is the meaning of the idiom 'Costar un ojo de la cara'?",
        back: "'To cost an arm and a leg' (literally: to cost an eye from the face — extremely expensive).",
        hint: "Idiomatic cost",
        difficulty: "easy",
      },
      {
        id: "sp5",
        front: "Complete the conditional clause: 'Si yo _____ (saber) la respuesta, te la diría.'",
        back: "'supiera' or 'supiese' (Imperfect subjunctive of saber).",
        hint: "Hypothetical condition in present",
        difficulty: "hard",
      },
      {
        id: "sp6",
        front: "Why does 'Dudo que él sea culpable' take subjunctive, but 'Sé que él es culpable' does not?",
        back: "Dudar introduces doubt/uncertainty (requires subjunctive 'sea'). Saber introduces certainty/fact (requires indicative 'es').",
        hint: "Doubt vs Certainty",
        difficulty: "medium",
      },
      {
        id: "sp7",
        front: "What does 'Estar hasta las narices' mean?",
        back: "To be fed up or sick and tired of something (literally 'to be up to one's nostrils').",
        hint: "Synonym of 'Estar harto'",
        difficulty: "easy",
      },
      {
        id: "sp8",
        front: "Translate with subjunctive: 'I need an assistant who speaks German.'",
        back: "'Necesito un asistente que hable alemán.' (Subjunctive 'hable' because the specific person is hypothetical/unknown).",
        hint: "Non-existent or indefinite antecedent",
        difficulty: "hard",
      },
      {
        id: "sp9",
        front: "What is the difference between 'Por fin' and 'Al final'?",
        back: "'Por fin' means 'at last / finally' (expressing relief). 'Al final' means 'in the end / ultimately' (referring to the conclusion of an event).",
        hint: "Relief vs Conclusion",
        difficulty: "medium",
      },
      {
        id: "sp10",
        front: "How do you form the negative imperative for 'tú'?",
        back: "Use 'no' + present subjunctive form of the verb (e.g. '¡No hables!', '¡No comas!', '¡No vengas!').",
        hint: "Uses subjunctive endings",
        difficulty: "medium",
      },
    ],
  },
  {
    id: "deck-quantum-physics",
    title: "Quantum Mechanics & Wave Functions",
    subject: "Physics",
    description: "Schrödinger equations, Dirac notation, Heisenberg uncertainty, spin operators, and quantum tunneling.",
    cardCount: 10,
    masteryPercentage: 58,
    dueToday: 5,
    gradient: "from-cyan-500/20 to-indigo-500/20",
    cards: [
      {
        id: "qp1",
        front: "State the Time-Dependent Schrödinger Equation in operator form.",
        back: "iħ ∂/∂t |Ψ(t)⟩ = Ĥ |Ψ(t)⟩, where Ĥ is the Hamiltonian operator and ħ is the reduced Planck constant.",
        hint: "Energy operator on state ket",
        difficulty: "medium",
      },
      {
        id: "qp2",
        front: "What is the physical interpretation of |Ψ(x,t)|²?",
        back: "Born's rule: it represents the probability density of finding the particle at position x at time t.",
        hint: "Max Born probability density",
        difficulty: "easy",
      },
      {
        id: "qp3",
        front: "What is the Heisenberg Uncertainty Principle for position and momentum?",
        back: "Δx · Δp ≥ ħ / 2. You cannot simultaneously know both position and momentum to arbitrary precision.",
        hint: "Standard deviations product",
        difficulty: "easy",
      },
      {
        id: "qp4",
        front: "What is a Hermitian operator in quantum mechanics, and why is it essential?",
        back: "An operator equal to its own conjugate transpose (Â† = Â). Essential because its eigenvalues are guaranteed to be real numbers, matching measurable physical observables.",
        hint: "Real eigenvalues",
        difficulty: "hard",
      },
      {
        id: "qp5",
        front: "Explain the phenomenon of Quantum Tunneling.",
        back: "A quantum particle has a finite probability of passing through a potential energy barrier higher than its kinetic energy, due to the decaying exponential wave function inside the barrier.",
        hint: "Barrier penetration",
        difficulty: "medium",
      },
      {
        id: "qp6",
        front: "What are the Pauli spin matrices (σx, σy, σz)?",
        back: "Three 2x2 complex Hermitian matrices representing the spin angular momentum observables for spin-1/2 particles like electrons.",
        hint: "Spin-1/2 basis",
        difficulty: "hard",
      },
      {
        id: "qp7",
        front: "What is quantum entanglement (EPR paradox)?",
        back: "A state where two or more particles cannot be described independently; measuring the quantum state of one instantaneously determines the other, regardless of spatial distance.",
        hint: "Spooky action at a distance",
        difficulty: "medium",
      },
      {
        id: "qp8",
        front: "What does the commutator [A, B] = 0 imply about two observables?",
        back: "The observables commute, share a common set of eigenstates, and can be measured simultaneously without quantum uncertainty limit.",
        hint: "Simultaneous eigenstates",
        difficulty: "hard",
      },
      {
        id: "qp9",
        front: "What are the energy eigenvalues of the Quantum Harmonic Oscillator?",
        back: "En = ħω(n + 1/2), where n = 0, 1, 2, ... Zero-point ground state energy is (1/2)ħω.",
        hint: "Ladder operators a and a†",
        difficulty: "hard",
      },
      {
        id: "qp10",
        front: "What does the de Broglie relation connect?",
        back: "Wavelength λ and momentum p: λ = h / p. Shows wave-particle duality applies to matter.",
        hint: "Wavelength of matter",
        difficulty: "easy",
      },
    ],
  },
  {
    id: "deck-constitutional-law",
    title: "Constitutional Law & Landmark Precedents",
    subject: "Law",
    description: "Due process, equal protection tiers of scrutiny, commerce clause, Marbury v. Madison, and First Amendment doctrines.",
    cardCount: 10,
    masteryPercentage: 91,
    dueToday: 2,
    gradient: "from-violet-500/20 to-rose-500/20",
    cards: [
      {
        id: "cl1",
        front: "What doctrine was established in Marbury v. Madison (1803)?",
        back: "Judicial Review: The Supreme Court has the authority to declare acts of Congress unconstitutional.",
        hint: "Chief Justice John Marshall",
        difficulty: "easy",
      },
      {
        id: "cl2",
        front: "What are the requirements for Strict Scrutiny review under Equal Protection?",
        back: "The law must be narrowly tailored to achieve a compelling governmental interest and use the least restrictive means available.",
        hint: "Applied to suspect classifications like race",
        difficulty: "medium",
      },
      {
        id: "cl3",
        front: "What does the dormant Commerce Clause restrict?",
        back: "Prohibits states from passing legislation that discriminates against or excessively burdens interstate commerce, even when Congress has not acted.",
        hint: "Negative implication of Article I Commerce Clause",
        difficulty: "hard",
      },
      {
        id: "cl4",
        front: "What standard governs Intermediate Scrutiny?",
        back: "The law must be substantially related to an important governmental interest (commonly applied to gender classifications).",
        hint: "Exceedingly persuasive justification",
        difficulty: "medium",
      },
      {
        id: "cl5",
        front: "What is the holding of McCulloch v. Maryland (1819)?",
        back: "Congress has implied powers under the Necessary and Proper Clause to create the Second Bank of the US, and states cannot tax federal instrumentalities.",
        hint: "The power to tax involves the power to destroy",
        difficulty: "medium",
      },
      {
        id: "cl6",
        front: "What is the Lemon Test for the Establishment Clause?",
        back: "Three prongs: 1) Secular legislative purpose, 2) Primary effect must neither advance nor inhibit religion, 3) Must not foster excessive government entanglement with religion.",
        hint: "Establishment Clause 3-part inquiry",
        difficulty: "hard",
      },
      {
        id: "cl7",
        front: "What test did Brandenburg v. Ohio establish for inflammatory speech?",
        back: "Speech can only be prohibited if it is directed to inciting 'imminent lawless action' and is likely to produce such action.",
        hint: "Imminent lawless action",
        difficulty: "easy",
      },
      {
        id: "cl8",
        front: "What are the three categories of Commerce Clause power outlined in US v. Lopez?",
        back: "1) Channels of interstate commerce, 2) Instrumentalities or persons/things in interstate commerce, 3) Activities having a substantial relation to interstate commerce.",
        hint: "Lopez 3 categories",
        difficulty: "hard",
      },
      {
        id: "cl9",
        front: "What is Substantive Due Process?",
        back: "A principle allowing courts to protect certain fundamental rights from government interference, even if procedural rights are present (e.g. privacy, marriage).",
        hint: "14th and 5th Amendments",
        difficulty: "medium",
      },
      {
        id: "cl10",
        front: "What is the Rational Basis test standard?",
        back: "The law is presumed valid and will be upheld if it is rationally related to a legitimate governmental interest. Burden is on the challenger.",
        hint: "Most deferential tier of judicial review",
        difficulty: "easy",
      },
    ],
  },
];

// Leaderboard Mock Data
export const mockLeaderboard: LeaderboardUser[] = [
  {
    rank: 1,
    prevRank: 1,
    user: mockUsers[1], // Elena Rostova
    focusHours: 194.2,
    studySessions: 52,
  },
  {
    rank: 2,
    prevRank: 3,
    user: mockUsers[2], // Kenji Sato
    focusHours: 172.0,
    studySessions: 46,
  },
  {
    rank: 3,
    prevRank: 2,
    user: mockUsers[3], // Maya Chen
    focusHours: 145.8,
    studySessions: 39,
  },
  {
    rank: 4,
    prevRank: 6,
    user: currentUser, // Alex Rivera
    focusHours: 128.5,
    studySessions: 34,
    isCurrentUser: true,
  },
  {
    rank: 5,
    prevRank: 4,
    user: mockUsers[4], // Marcus Vance
    focusHours: 112.4,
    studySessions: 31,
  },
  {
    rank: 6,
    prevRank: 7,
    user: mockUsers[5], // Sofia Al-Mansoor
    focusHours: 98.7,
    studySessions: 26,
  },
  {
    rank: 7,
    prevRank: 5,
    user: mockUsers[6], // Liam O'Connor
    focusHours: 89.1,
    studySessions: 24,
  },
  {
    rank: 8,
    prevRank: 8,
    user: mockUsers[7], // Zara Patel
    focusHours: 84.3,
    studySessions: 22,
  },
];

// Achievements Mock Data
export const mockAchievements: Achievement[] = [
  {
    id: "ach-1",
    title: "Orbital Insertion",
    description: "Completed first 2-hour synchronous focus session.",
    icon: "Rocket",
    unlocked: true,
    dateUnlocked: "2 weeks ago",
  },
  {
    id: "ach-2",
    title: "14-Day Orbit",
    description: "Maintained a continuous daily study streak for 14 days.",
    icon: "Flame",
    unlocked: true,
    dateUnlocked: "Today",
  },
  {
    id: "ach-3",
    title: "Deep Space Scholar",
    description: "Accumulated 100+ lifetime focus hours on Orbit.",
    icon: "Sparkles",
    unlocked: true,
    dateUnlocked: "3 days ago",
  },
  {
    id: "ach-4",
    title: "Recall Master",
    description: "Reviewed 500 flashcards with >80% accuracy.",
    icon: "Brain",
    unlocked: true,
    dateUnlocked: "Yesterday",
  },
  {
    id: "ach-5",
    title: "Supernova Synchrony",
    description: "Host a study room with 8 active participants simultaneously.",
    icon: "Users",
    unlocked: false,
    progress: { current: 6, total: 8 },
  },
  {
    id: "ach-6",
    title: "Cosmic Voyager",
    description: "Study across 5 different subjects in a single week.",
    icon: "Compass",
    unlocked: false,
    progress: { current: 3, total: 5 },
  },
];

// Notifications Mock Data
export const mockNotifications: NotificationItem[] = [
  {
    id: "n1",
    title: "Streak Preserved! 🔥",
    message: "You've extended your study streak to 14 days. 1 more day until Bronze Orbit trophy!",
    time: "20 min ago",
    read: false,
    type: "streak",
  },
  {
    id: "n2",
    title: "Elena joined Deep Algorithms",
    message: "Elena Rostova started a 25m Pomodoro focus sprint in your favorite room.",
    time: "1 hour ago",
    read: false,
    type: "room",
  },
  {
    id: "n3",
    title: "Achievement Unlocked! 🚀",
    message: "You unlocked '14-Day Orbit' for uninterrupted consistency.",
    time: "3 hours ago",
    read: false,
    type: "achievement",
  },
  {
    id: "n4",
    title: "Flashcard Deck Due",
    message: "4 cards are due for spaced repetition review in JavaScript Engine.",
    time: "Yesterday",
    read: true,
    type: "room",
  },
];

// Heatmap mock data for 12 weeks (84 days) with deterministic values
export const mockStreakHeatmap = Array.from({ length: 84 }, (_, i) => {
  const intensities = [0, 1, 2, 3, 2, 3, 1, 0, 2, 3, 1, 2, 3, 3];
  const intensity = i > 70 ? (i % 2 === 0 ? 3 : 2) : intensities[i % intensities.length];
  const hours = intensity === 0 ? 0 : Number((2.5 + (i % 4) * 1.2).toFixed(1));
  const dayNum = ((i % 28) + 1).toString().padStart(2, "0");
  const monthNum = (Math.floor(i / 28) + 1).toString().padStart(2, "0");
  return {
    date: `2026-${monthNum}-${dayNum}`,
    intensity,
    hours,
  };
});

// Weekly focus hours chart data (Mon to Sun)
export const mockWeeklyFocusData = [
  { day: "Mon", hours: 4.8, target: 4.0 },
  { day: "Tue", hours: 5.5, target: 4.0 },
  { day: "Wed", hours: 3.2, target: 4.0 },
  { day: "Thu", hours: 6.1, target: 4.0 },
  { day: "Fri", hours: 4.4, target: 4.0 },
  { day: "Sat", hours: 7.2, target: 4.0 },
  { day: "Sun", hours: 5.8, target: 4.0 },
];
