// ============================================================
// BeReading — Mock Data Layer
// Structured for easy migration to Supabase
// ============================================================

export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string; // emoji placeholder — replace with real covers
  genre: string;
  totalChapters: number;
  description: string;
  difficulty: "easy" | "medium" | "challenging";
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
  grade: string;
  xp: number;
  level: number;
  streak: number;
  booksCompleted: number;
  currentBookId: string;
  currentChapter: number;
  badges: Badge[];
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
}

export interface TeacherProfile {
  id: string;
  name: string;
  avatar: string;
  school: string;
  classes: ClassRoom[];
}

// ---- Books ----
export const books: Book[] = [
  {
    id: "b1",
    title: "The Giver",
    author: "Lois Lowry",
    cover: "📘",
    genre: "Dystopian Fiction",
    totalChapters: 23,
    description:
      "In a seemingly perfect community, Jonas discovers the dark truth beneath the surface.",
    difficulty: "medium",
  },
  {
    id: "b2",
    title: "Wonder",
    author: "R.J. Palacio",
    cover: "🌟",
    genre: "Realistic Fiction",
    totalChapters: 8,
    description:
      "August Pullman was born with a facial difference. This is his story of acceptance and kindness.",
    difficulty: "easy",
  },
  {
    id: "b3",
    title: "The Outsiders",
    author: "S.E. Hinton",
    cover: "🔥",
    genre: "Coming of Age",
    totalChapters: 12,
    description:
      "Two rival groups in 1960s Oklahoma discover they're not so different after all.",
    difficulty: "medium",
  },
  {
    id: "b4",
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    cover: "📕",
    genre: "Science Fiction",
    totalChapters: 3,
    description:
      "In a future where books are banned, one fireman begins to question everything.",
    difficulty: "challenging",
  },
  {
    id: "b5",
    title: "Holes",
    author: "Louis Sachar",
    cover: "🏜️",
    genre: "Adventure",
    totalChapters: 50,
    description:
      "Sent to a desert detention camp, Stanley Yelnats uncovers a family mystery.",
    difficulty: "easy",
  },
];

// ---- Missions ----
export const missions: Mission[] = [
  {
    id: "m1",
    bookId: "b1",
    title: "First Impressions",
    description:
      "What do you think about Jonas's community after reading chapters 1-3? Write 3 sentences about what feels unusual.",
    type: "reflection",
    chapter: 3,
    xpReward: 50,
    isCompleted: true,
  },
  {
    id: "m2",
    bookId: "b1",
    title: "Memory Checkpoint",
    description:
      "Quick quiz: What was the first memory the Giver transmitted to Jonas?",
    type: "checkpoint",
    chapter: 11,
    xpReward: 30,
    isCompleted: true,
  },
  {
    id: "m3",
    bookId: "b1",
    title: "The Weight of Knowing",
    description:
      "Jonas now carries memories no one else has. If you could carry one memory for your entire community, what would it be and why?",
    type: "challenge",
    chapter: 15,
    xpReward: 80,
    isCompleted: false,
  },
  {
    id: "m4",
    bookId: "b1",
    title: "Debate: Release",
    description:
      "After learning the truth about 'release,' discuss with a classmate: Is ignorance really bliss?",
    type: "discussion",
    chapter: 19,
    xpReward: 100,
    isCompleted: false,
  },
  {
    id: "m5",
    bookId: "b1",
    title: "The Escape",
    description:
      "Predict what happens after the last page. Write your own ending in 5 sentences.",
    type: "challenge",
    chapter: 23,
    xpReward: 120,
    isCompleted: false,
  },
];

// ---- Badges ----
export const allBadges: Badge[] = [
  {
    id: "bg1",
    name: "First Chapter",
    icon: "📖",
    description: "Completed your first chapter checkpoint",
  },
  {
    id: "bg2",
    name: "Week Warrior",
    icon: "🔥",
    description: "7-day reading streak",
  },
  {
    id: "bg3",
    name: "Deep Thinker",
    icon: "🧠",
    description: "Completed 5 reflection missions",
  },
  {
    id: "bg4",
    name: "Bookworm",
    icon: "📚",
    description: "Finished your first book",
  },
  {
    id: "bg5",
    name: "Discussion Leader",
    icon: "💬",
    description: "Participated in 3 class discussions",
  },
  {
    id: "bg6",
    name: "Speed Reader",
    icon: "⚡",
    description: "Finished a book ahead of schedule",
  },
];

// ---- Student ----
export const currentStudent: StudentProfile = {
  id: "s1",
  name: "Sofia Martinez",
  avatar: "SM",
  grade: "7th Grade",
  xp: 840,
  level: 5,
  streak: 12,
  booksCompleted: 2,
  currentBookId: "b1",
  currentChapter: 14,
  badges: [
    { ...allBadges[0], earnedAt: "2025-02-10" },
    { ...allBadges[1], earnedAt: "2025-02-18" },
    { ...allBadges[3], earnedAt: "2025-03-01" },
  ],
};

// ---- Teacher ----
export const currentTeacher: TeacherProfile = {
  id: "t1",
  name: "Ms. Oliveira",
  avatar: "MO",
  school: "Colégio Premium São Paulo",
  classes: [
    {
      id: "c1",
      name: "7A — Literature",
      grade: "7th",
      teacherId: "t1",
      studentCount: 28,
      activeBook: "The Giver",
      averageProgress: 62,
      engagementScore: 87,
    },
    {
      id: "c2",
      name: "7B — Literature",
      grade: "7th",
      teacherId: "t1",
      studentCount: 25,
      activeBook: "The Giver",
      averageProgress: 48,
      engagementScore: 72,
    },
    {
      id: "c3",
      name: "8A — Literature",
      grade: "8th",
      teacherId: "t1",
      studentCount: 30,
      activeBook: "Fahrenheit 451",
      averageProgress: 35,
      engagementScore: 91,
    },
  ],
};

// ---- Class students (for teacher view) ----
export const classStudents = [
  { id: "s1", name: "Sofia Martinez", avatar: "SM", progress: 61, xp: 840, streak: 12, missionsCompleted: 2, status: "on-track" as const },
  { id: "s2", name: "Lucas Pereira", avatar: "LP", progress: 78, xp: 1020, streak: 8, missionsCompleted: 3, status: "ahead" as const },
  { id: "s3", name: "Ana Costa", avatar: "AC", progress: 52, xp: 620, streak: 5, missionsCompleted: 2, status: "on-track" as const },
  { id: "s4", name: "Pedro Santos", avatar: "PS", progress: 35, xp: 340, streak: 0, missionsCompleted: 1, status: "behind" as const },
  { id: "s5", name: "Maria Silva", avatar: "MS", progress: 87, xp: 1180, streak: 15, missionsCompleted: 4, status: "ahead" as const },
  { id: "s6", name: "Gabriel Oliveira", avatar: "GO", progress: 44, xp: 480, streak: 2, missionsCompleted: 1, status: "behind" as const },
  { id: "s7", name: "Beatriz Souza", avatar: "BS", progress: 70, xp: 920, streak: 9, missionsCompleted: 3, status: "on-track" as const },
  { id: "s8", name: "Rafael Lima", avatar: "RL", progress: 65, xp: 780, streak: 6, missionsCompleted: 2, status: "on-track" as const },
];

// ---- Family data ----
export const familyData = {
  studentName: "Sofia",
  parentName: "Carolina Martinez",
  weeklyReadingMinutes: 145,
  weeklyGoalMinutes: 180,
  currentBook: books[0],
  currentChapter: 14,
  totalChapters: 23,
  recentActivity: [
    { date: "2025-03-25", action: "Completed reflection mission", book: "The Giver", chapter: 14 },
    { date: "2025-03-24", action: "Read chapters 13-14", book: "The Giver", chapter: 14 },
    { date: "2025-03-23", action: "Completed checkpoint quiz", book: "The Giver", chapter: 12 },
    { date: "2025-03-22", action: "Read chapters 11-12", book: "The Giver", chapter: 12 },
    { date: "2025-03-20", action: "Started discussion mission", book: "The Giver", chapter: 10 },
  ],
  weeklyStreakData: [
    { day: "Mon", minutes: 25 },
    { day: "Tue", minutes: 30 },
    { day: "Wed", minutes: 20 },
    { day: "Thu", minutes: 35 },
    { day: "Fri", minutes: 15 },
    { day: "Sat", minutes: 0 },
    { day: "Sun", minutes: 20 },
  ],
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
    { class: "7A", teacher: "Ms. Oliveira", students: 28, engagement: 87, avgProgress: 62 },
    { class: "7B", teacher: "Ms. Oliveira", students: 25, engagement: 72, avgProgress: 48 },
    { class: "8A", teacher: "Ms. Oliveira", students: 30, engagement: 91, avgProgress: 35 },
    { class: "6A", teacher: "Mr. Santos", students: 26, engagement: 79, avgProgress: 55 },
    { class: "6B", teacher: "Mr. Santos", students: 24, engagement: 68, avgProgress: 41 },
    { class: "9A", teacher: "Ms. Ferreira", students: 32, engagement: 85, avgProgress: 70 },
  ],
  topBooks: [
    { title: "The Giver", classes: 3, avgEngagement: 83 },
    { title: "Wonder", classes: 2, avgEngagement: 91 },
    { title: "Fahrenheit 451", classes: 1, avgEngagement: 88 },
    { title: "Holes", classes: 2, avgEngagement: 76 },
  ],
};
