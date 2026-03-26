// ============================================================
// BeReading — Mock Data Layer
// Structured for easy migration to Supabase
// ============================================================

export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  coverUrl?: string;
  genre: string;
  totalChapters: number;
  description: string;
  difficulty: "easy" | "medium" | "challenging";
  isbn?: string;
  type?: "physical" | "digital";
}

export interface Mission {
  id: string;
  bookId: string;
  title: string;
  description: string;
  type: "checkpoint" | "reflection" | "challenge" | "discussion";
  chapter: number;
  xpReward: number;
  isCompleted?: boolean;
}

export interface StudentProfile {
  id: string;
  name: string;
  avatar: string;
  email?: string;
  grade: string;
  xp: number;
  level: number;
  streak: number;
  booksCompleted: number;
  currentBookId: string;
  currentChapter: number;
  badges: Badge[];
  joinedAt?: string;
  totalReadingMinutes?: number;
  missionsCompleted?: number;
  averageScore?: number;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedAt?: string;
}

export interface ClassRoom {
  id: string;
  name: string;
  grade: string;
  teacherId: string;
  studentCount: number;
  activeBook: string;
  averageProgress: number;
  engagementScore: number;
  inviteCode?: string;
  inviteExpiry?: string;
}

export interface TeacherProfile {
  id: string;
  name: string;
  avatar: string;
  school: string;
  classes: ClassRoom[];
}

export interface Exercise {
  id: string;
  classId: string;
  title: string;
  description: string;
  bookId: string;
  chapter: number;
  dueDate: string;
  totalPoints: number;
  questions: ExerciseQuestion[];
  submissions: ExerciseSubmission[];
  status: "draft" | "published" | "closed";
}

export interface ExerciseQuestion {
  id: string;
  text: string;
  type: "multiple_choice" | "open_ended" | "true_false";
  options?: string[];
  correctAnswer?: string;
  points: number;
}

export interface ExerciseSubmission {
  id: string;
  studentId: string;
  studentName: string;
  submittedAt: string;
  answers: Record<string, string>;
  score?: number;
  feedback?: string;
  status: "submitted" | "graded";
}

export interface LiteraryOlympiad {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  classes: string[];
  status: "upcoming" | "active" | "completed";
  rounds: OlympiadRound[];
  leaderboard: OlympiadEntry[];
}

export interface OlympiadRound {
  id: string;
  name: string;
  type: "quiz" | "essay" | "debate" | "creative";
  bookId?: string;
  maxPoints: number;
  status: "pending" | "active" | "completed";
}

export interface OlympiadEntry {
  studentId: string;
  studentName: string;
  avatar: string;
  classId: string;
  className: string;
  totalPoints: number;
  roundScores: Record<string, number>;
}

// ---- Books ----
export const books: Book[] = [
  {
    id: "b1",
    title: "O Doador de Memórias",
    author: "Lois Lowry",
    cover: "📘",
    genre: "Ficção Distópica",
    totalChapters: 23,
    description: "Em uma comunidade aparentemente perfeita, Jonas descobre a verdade sombria sob a superfície.",
    difficulty: "medium",
    type: "physical",
  },
  {
    id: "b2",
    title: "Extraordinário",
    author: "R.J. Palacio",
    cover: "🌟",
    genre: "Ficção Realista",
    totalChapters: 8,
    description: "August Pullman nasceu com uma diferença facial. Esta é sua história de aceitação e bondade.",
    difficulty: "easy",
    type: "physical",
  },
  {
    id: "b3",
    title: "O Pequeno Príncipe",
    author: "Antoine de Saint-Exupéry",
    cover: "🌹",
    genre: "Fábula",
    totalChapters: 27,
    description: "Um piloto encontra um menino vindo de um pequeno asteroide que ensina sobre amor e amizade.",
    difficulty: "easy",
    type: "digital",
  },
  {
    id: "b4",
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    cover: "📕",
    genre: "Ficção Científica",
    totalChapters: 3,
    description: "Em um futuro onde livros são proibidos, um bombeiro começa a questionar tudo.",
    difficulty: "challenging",
    type: "physical",
  },
  {
    id: "b5",
    title: "A Droga da Obediência",
    author: "Pedro Bandeira",
    cover: "🔍",
    genre: "Aventura",
    totalChapters: 15,
    description: "Os Karas enfrentam um misterioso vilão que ameaça controlar os alunos de um colégio.",
    difficulty: "easy",
    type: "digital",
  },
];

// ---- Missions ----
export const missions: Mission[] = [
  {
    id: "m1", bookId: "b1", title: "Primeiras Impressões",
    description: "O que você acha da comunidade de Jonas após ler os capítulos 1-3? Escreva 3 frases sobre o que parece incomum.",
    type: "reflection", chapter: 3, xpReward: 50, isCompleted: true,
  },
  {
    id: "m2", bookId: "b1", title: "Checkpoint de Memória",
    description: "Quiz rápido: Qual foi a primeira memória que o Doador transmitiu a Jonas?",
    type: "checkpoint", chapter: 11, xpReward: 30, isCompleted: true,
  },
  {
    id: "m3", bookId: "b1", title: "O Peso de Saber",
    description: "Jonas agora carrega memórias que ninguém mais tem. Se você pudesse carregar uma memória para toda a sua comunidade, qual seria e por quê?",
    type: "challenge", chapter: 15, xpReward: 80, isCompleted: false,
  },
  {
    id: "m4", bookId: "b1", title: "Debate: Liberação",
    description: "Após descobrir a verdade sobre a 'liberação', discuta com um colega: Ignorância é realmente uma bênção?",
    type: "discussion", chapter: 19, xpReward: 100, isCompleted: false,
  },
  {
    id: "m5", bookId: "b1", title: "A Fuga",
    description: "Preveja o que acontece após a última página. Escreva seu próprio final em 5 frases.",
    type: "challenge", chapter: 23, xpReward: 120, isCompleted: false,
  },
];

// ---- Badges ----
export const allBadges: Badge[] = [
  { id: "bg1", name: "Primeiro Capítulo", icon: "📖", description: "Completou seu primeiro checkpoint" },
  { id: "bg2", name: "Guerreiro da Semana", icon: "🔥", description: "7 dias consecutivos lendo" },
  { id: "bg3", name: "Pensador Profundo", icon: "🧠", description: "Completou 5 missões de reflexão" },
  { id: "bg4", name: "Devorador de Livros", icon: "📚", description: "Terminou seu primeiro livro" },
  { id: "bg5", name: "Líder de Discussão", icon: "💬", description: "Participou de 3 discussões" },
  { id: "bg6", name: "Leitor Veloz", icon: "⚡", description: "Terminou um livro antes do prazo" },
];

// ---- Student ----
export const currentStudent: StudentProfile = {
  id: "s1",
  name: "Sofia Martinez",
  avatar: "SM",
  email: "sofia.martinez@escola.com",
  grade: "7º Ano",
  xp: 840,
  level: 5,
  streak: 12,
  booksCompleted: 2,
  currentBookId: "b1",
  currentChapter: 14,
  totalReadingMinutes: 1280,
  missionsCompleted: 12,
  averageScore: 87,
  joinedAt: "2026-02-01",
  badges: [
    { ...allBadges[0], earnedAt: "2026-02-10" },
    { ...allBadges[1], earnedAt: "2026-02-18" },
    { ...allBadges[3], earnedAt: "2026-03-01" },
  ],
};

// ---- Teacher ----
export const currentTeacher: TeacherProfile = {
  id: "t1",
  name: "Profa. Oliveira",
  avatar: "MO",
  school: "Colégio Premium São Paulo",
  classes: [
    {
      id: "c1", name: "7A — Literatura", grade: "7º",
      teacherId: "t1", studentCount: 28, activeBook: "O Doador de Memórias",
      averageProgress: 62, engagementScore: 87,
      inviteCode: "BR7A2026", inviteExpiry: "2026-04-30",
    },
    {
      id: "c2", name: "7B — Literatura", grade: "7º",
      teacherId: "t1", studentCount: 25, activeBook: "O Doador de Memórias",
      averageProgress: 48, engagementScore: 72,
      inviteCode: "BR7B2026", inviteExpiry: "2026-04-30",
    },
    {
      id: "c3", name: "8A — Literatura", grade: "8º",
      teacherId: "t1", studentCount: 30, activeBook: "Fahrenheit 451",
      averageProgress: 35, engagementScore: 91,
      inviteCode: "BR8A2026", inviteExpiry: "2026-04-30",
    },
  ],
};

// ---- Class students (detailed for teacher analytics) ----
export const classStudents: (StudentProfile & { status: "ahead" | "on-track" | "behind"; classId: string })[] = [
  {
    id: "s1", name: "Sofia Martinez", avatar: "SM", email: "sofia@escola.com", grade: "7º", xp: 840, level: 5, streak: 12,
    booksCompleted: 2, currentBookId: "b1", currentChapter: 14, missionsCompleted: 12, averageScore: 87,
    totalReadingMinutes: 1280, joinedAt: "2026-02-01", badges: [], status: "on-track", classId: "c1",
  },
  {
    id: "s2", name: "Lucas Pereira", avatar: "LP", email: "lucas@escola.com", grade: "7º", xp: 1020, level: 6, streak: 8,
    booksCompleted: 3, currentBookId: "b1", currentChapter: 18, missionsCompleted: 18, averageScore: 92,
    totalReadingMinutes: 1560, joinedAt: "2026-02-01", badges: [], status: "ahead", classId: "c1",
  },
  {
    id: "s3", name: "Ana Costa", avatar: "AC", email: "ana@escola.com", grade: "7º", xp: 620, level: 4, streak: 5,
    booksCompleted: 1, currentBookId: "b1", currentChapter: 12, missionsCompleted: 8, averageScore: 78,
    totalReadingMinutes: 920, joinedAt: "2026-02-05", badges: [], status: "on-track", classId: "c1",
  },
  {
    id: "s4", name: "Pedro Santos", avatar: "PS", email: "pedro@escola.com", grade: "7º", xp: 340, level: 2, streak: 0,
    booksCompleted: 0, currentBookId: "b1", currentChapter: 8, missionsCompleted: 4, averageScore: 55,
    totalReadingMinutes: 380, joinedAt: "2026-02-10", badges: [], status: "behind", classId: "c1",
  },
  {
    id: "s5", name: "Maria Silva", avatar: "MS", email: "maria@escola.com", grade: "7º", xp: 1180, level: 7, streak: 15,
    booksCompleted: 3, currentBookId: "b1", currentChapter: 20, missionsCompleted: 22, averageScore: 95,
    totalReadingMinutes: 1840, joinedAt: "2026-02-01", badges: [], status: "ahead", classId: "c1",
  },
  {
    id: "s6", name: "Gabriel Oliveira", avatar: "GO", email: "gabriel@escola.com", grade: "7º", xp: 480, level: 3, streak: 2,
    booksCompleted: 1, currentBookId: "b1", currentChapter: 10, missionsCompleted: 6, averageScore: 62,
    totalReadingMinutes: 540, joinedAt: "2026-02-08", badges: [], status: "behind", classId: "c1",
  },
  {
    id: "s7", name: "Beatriz Souza", avatar: "BS", email: "beatriz@escola.com", grade: "7º", xp: 920, level: 5, streak: 9,
    booksCompleted: 2, currentBookId: "b1", currentChapter: 16, missionsCompleted: 14, averageScore: 84,
    totalReadingMinutes: 1180, joinedAt: "2026-02-03", badges: [], status: "on-track", classId: "c1",
  },
  {
    id: "s8", name: "Rafael Lima", avatar: "RL", email: "rafael@escola.com", grade: "7º", xp: 780, level: 4, streak: 6,
    booksCompleted: 2, currentBookId: "b1", currentChapter: 15, missionsCompleted: 10, averageScore: 80,
    totalReadingMinutes: 1050, joinedAt: "2026-02-04", badges: [], status: "on-track", classId: "c1",
  },
];

// ---- Exercises ----
export const exercises: Exercise[] = [
  {
    id: "ex1",
    classId: "c1",
    title: "Compreensão — Cap. 1-5",
    description: "Avaliação de compreensão dos primeiros capítulos de O Doador de Memórias.",
    bookId: "b1",
    chapter: 5,
    dueDate: "2026-03-28",
    totalPoints: 100,
    status: "published",
    questions: [
      { id: "q1", text: "Qual é a principal regra da comunidade de Jonas?", type: "multiple_choice", options: ["Precisão na linguagem", "Não sair de casa à noite", "Nunca mentir", "Todas as anteriores"], correctAnswer: "Todas as anteriores", points: 25 },
      { id: "q2", text: "O que acontece na Cerimônia dos Doze?", type: "open_ended", points: 25 },
      { id: "q3", text: "Jonas ficou animado com sua atribuição.", type: "true_false", correctAnswer: "false", points: 25 },
      { id: "q4", text: "Descreva o que torna a comunidade de Jonas diferente da nossa sociedade.", type: "open_ended", points: 25 },
    ],
    submissions: [
      { id: "sub1", studentId: "s1", studentName: "Sofia Martinez", submittedAt: "2026-03-25", answers: { q1: "Todas as anteriores", q2: "Recebem atribuições de trabalho", q3: "false", q4: "Não há escolhas individuais..." }, score: 88, feedback: "Ótima análise, Sofia!", status: "graded" },
      { id: "sub2", studentId: "s2", studentName: "Lucas Pereira", submittedAt: "2026-03-24", answers: { q1: "Todas as anteriores", q2: "Os jovens recebem suas funções", q3: "false", q4: "A comunidade controla tudo..." }, score: 95, feedback: "Excelente!", status: "graded" },
      { id: "sub3", studentId: "s3", studentName: "Ana Costa", submittedAt: "2026-03-26", answers: { q1: "Precisão na linguagem", q2: "Ganham trabalhos", q3: "true", q4: "É tudo controlado" }, score: undefined, feedback: undefined, status: "submitted" },
    ],
  },
];

// ---- Literary Olympiad ----
export const olympiads: LiteraryOlympiad[] = [
  {
    id: "ol1",
    name: "I Olimpíada Literária — O Doador de Memórias",
    description: "Competição entre turmas sobre o livro O Doador de Memórias. 4 rodadas de desafios!",
    startDate: "2026-03-20",
    endDate: "2026-04-20",
    classes: ["c1", "c2"],
    status: "active",
    rounds: [
      { id: "r1", name: "Quiz Relâmpago", type: "quiz", bookId: "b1", maxPoints: 100, status: "completed" },
      { id: "r2", name: "Redação Criativa", type: "essay", bookId: "b1", maxPoints: 150, status: "active" },
      { id: "r3", name: "Debate em Equipe", type: "debate", bookId: "b1", maxPoints: 120, status: "pending" },
      { id: "r4", name: "Projeto Artístico", type: "creative", bookId: "b1", maxPoints: 130, status: "pending" },
    ],
    leaderboard: [
      { studentId: "s5", studentName: "Maria Silva", avatar: "MS", classId: "c1", className: "7A", totalPoints: 95, roundScores: { r1: 95 } },
      { studentId: "s2", studentName: "Lucas Pereira", avatar: "LP", classId: "c1", className: "7A", totalPoints: 88, roundScores: { r1: 88 } },
      { studentId: "s7", studentName: "Beatriz Souza", avatar: "BS", classId: "c1", className: "7A", totalPoints: 82, roundScores: { r1: 82 } },
      { studentId: "s1", studentName: "Sofia Martinez", avatar: "SM", classId: "c1", className: "7A", totalPoints: 78, roundScores: { r1: 78 } },
      { studentId: "s8", studentName: "Rafael Lima", avatar: "RL", classId: "c1", className: "7A", totalPoints: 75, roundScores: { r1: 75 } },
      { studentId: "s3", studentName: "Ana Costa", avatar: "AC", classId: "c1", className: "7A", totalPoints: 70, roundScores: { r1: 70 } },
    ],
  },
];

// ---- Family data (enriched) ----
export const familyData = {
  studentName: "Sofia",
  parentName: "Carolina Martinez",
  studentProfile: currentStudent,
  weeklyReadingMinutes: 145,
  weeklyGoalMinutes: 180,
  monthlyReadingMinutes: [120, 140, 180, 145],
  currentBook: books[0],
  currentChapter: 14,
  totalChapters: 23,
  classRank: 4,
  classSize: 28,
  nextMilestone: "Completar Capítulo 15",
  teacherName: "Profa. Oliveira",
  className: "7A — Literatura",
  recentMissions: [
    { title: "Reflexão Pessoal — Cap. 14", completed: true, score: 88, xp: 60, date: "2026-03-25" },
    { title: "Checkpoint — Cap. 12", completed: true, score: 100, xp: 30, date: "2026-03-23" },
    { title: "Desafio Criativo — Cap. 11", completed: true, score: 75, xp: 80, date: "2026-03-21" },
  ],
  recentActivity: [
    { date: "2026-03-25", action: "Completou missão de reflexão", book: "O Doador de Memórias", chapter: 14, xp: 60 },
    { date: "2026-03-24", action: "Leu capítulos 13-14", book: "O Doador de Memórias", chapter: 14, xp: 0 },
    { date: "2026-03-23", action: "Completou quiz checkpoint", book: "O Doador de Memórias", chapter: 12, xp: 30 },
    { date: "2026-03-22", action: "Leu capítulos 11-12", book: "O Doador de Memórias", chapter: 12, xp: 0 },
    { date: "2026-03-20", action: "Iniciou missão de discussão", book: "O Doador de Memórias", chapter: 10, xp: 50 },
  ],
  weeklyStreakData: [
    { day: "Seg", minutes: 25 },
    { day: "Ter", minutes: 30 },
    { day: "Qua", minutes: 20 },
    { day: "Qui", minutes: 35 },
    { day: "Sex", minutes: 15 },
    { day: "Sáb", minutes: 0 },
    { day: "Dom", minutes: 20 },
  ],
  comparisons: {
    readingVsClass: { student: 145, classAvg: 120 },
    xpVsClass: { student: 840, classAvg: 720 },
    missionsVsClass: { student: 12, classAvg: 9 },
  },
};

// ---- Admin data ----
export const adminData = {
  schoolName: "Colégio Premium São Paulo",
  totalStudents: 312,
  totalTeachers: 14,
  totalClasses: 12,
  activeBooksCount: 8,
  platformEngagement: 84,
  weeklyActiveUsers: 278,
  averageSessionMinutes: 18,
  classMetrics: [
    { class: "7A", teacher: "Profa. Oliveira", students: 28, engagement: 87, avgProgress: 62 },
    { class: "7B", teacher: "Profa. Oliveira", students: 25, engagement: 72, avgProgress: 48 },
    { class: "8A", teacher: "Profa. Oliveira", students: 30, engagement: 91, avgProgress: 35 },
    { class: "6A", teacher: "Prof. Santos", students: 26, engagement: 79, avgProgress: 55 },
    { class: "6B", teacher: "Prof. Santos", students: 24, engagement: 68, avgProgress: 41 },
    { class: "9A", teacher: "Profa. Ferreira", students: 32, engagement: 85, avgProgress: 70 },
  ],
  topBooks: [
    { title: "O Doador de Memórias", classes: 3, avgEngagement: 83 },
    { title: "Extraordinário", classes: 2, avgEngagement: 91 },
    { title: "Fahrenheit 451", classes: 1, avgEngagement: 88 },
    { title: "A Droga da Obediência", classes: 2, avgEngagement: 76 },
  ],
};
