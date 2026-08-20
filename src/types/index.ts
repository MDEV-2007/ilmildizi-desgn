export type UserRole = 'student' | 'teacher' | 'admin';

export type ScreenId =
  // Auth & General
  | 'login'
  | 'register'
  | 'onboarding'
  | 'auth_login'
  | 'auth_register'
  | 'auth_onboarding'
  | 'error404'
  | 'error500'
  | 'error_404'
  | 'error_500'
  | 'offline'
  // Student
  | 'dashboard'
  | 'profile'
  | 'leaderboard'
  | 'analytics'
  | 'tests'
  | 'test_active'
  | 'test_feedback'
  | 'test_history'
  | 'revision'
  | 'arena'
  | 'game_timeline'
  | 'game_map'
  | 'game_person'
  | 'learning'
  | 'ai_mentor'
  | 'shop'
  | 'inventory'
  | 'premium'
  | 'checkout'
  | 'payment_status'
  | 'my_payments'
  // Teacher
  | 'teacher_dashboard'
  | 'teacher_tests'
  | 'teacher_groups'
  | 'teacher_builder'
  | 'teacher_preview'
  | 'teacher_grading'
  | 'teacher_lessons'
  | 'teacher_games'
  // Admin
  | 'admin_dashboard'
  | 'admin_users'
  | 'admin_user_detail'
  | 'admin_teachers'
  | 'admin_subjects'
  | 'admin_shop'
  | 'admin_tests'
  | 'admin_questions'
  | 'admin_lessons'
  | 'admin_games'
  | 'admin_results'
  | 'admin_payments'
  | 'admin_broadcast'
  | 'admin_audit'
  | 'admin_settings';

export type QuestionType =
  | 'single_choice'
  | 'image_based'
  | 'table_based'
  | 'matching'
  | 'grouped'
  | 'written';

export type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface UserProfile {
  id: string;
  name: string;
  surname: string;
  username: string;
  email: string;
  role: UserRole;
  avatar: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  coins: number;
  streak: number;
  streakFreezes: number;
  elo: number;
  isPremium: boolean;
  premiumExpiryDate?: string;
  referralCode: string;
  referralCount: number;
  referralCoinsEarned: number;
  equippedTheme?: string;
  equippedAvatarFrame?: string;
  equippedBadge?: string;
  equippedTitle?: string;
  status: 'active' | 'blocked';
  createdAt: string;
  phone?: string;
  telegramLinked?: boolean;
}

export interface DailyMission {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  coinReward: number;
  completed: boolean;
  progress: number;
  total: number;
}

export interface Question {
  id: string;
  type: QuestionType;
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  questionText: string;
  imageUrl?: string;
  tableData?: { headers: string[]; rows: string[][] };
  audioUrl?: string;
  options?: string[]; // for single_choice, image_based, table_based
  correctAnswer?: number | string; // index or string
  // For matching:
  matchingPairs?: { left: string; right: string }[];
  // For grouped:
  instruction?: string;
  subQuestions?: { id: string; text: string; options: string[]; correctAnswer: number }[];
  // For written:
  subPrompts?: { label: string; prompt: string; sampleAnswer: string }[];
  explanation: string;
  memoryTip?: string;
}

export interface TestAttempt {
  id: string;
  testId: string;
  testTitle: string;
  subject: string;
  date: string;
  scorePercentage: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  totalQuestions: number;
  xpEarned: number;
  predictedCertificateLevel?: string;
  aiSummary: string;
  motivationalQuote: string;
  strongTopics: string[];
  weakTopics: string[];
  recommendations: string[];
  roadmap: { step: number; title: string; duration: string }[];
  userAnswers: { [questionId: string]: any };
}

export interface ShopItem {
  id: string;
  name: string;
  category: 'consumable' | 'title' | 'frame' | 'theme' | 'avatar' | 'badge';
  rarity: Rarity;
  price: number;
  description: string;
  icon: string;
  isEquippable: boolean;
  owned: boolean;
  equipped: boolean;
  quantity?: number;
  previewColor?: string;
}

export interface PaymentRecord {
  id: string;
  userId: string;
  userName: string;
  userUsername: string;
  planName: string;
  amount: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected' | 'awaiting_screenshot';
  screenshotUrl?: string;
  adminNote?: string;
}

export interface LeaderboardUser {
  rank: number;
  id: string;
  name: string;
  username: string;
  avatar: string;
  xp: number;
  level: number;
  subject: string;
  isCurrentUser?: boolean;
}

export interface AuditLog {
  id: string;
  adminName: string;
  action: 'created' | 'updated' | 'deleted' | 'impersonated';
  model: string;
  targetObject: string;
  timestamp: string;
  ip: string;
}
