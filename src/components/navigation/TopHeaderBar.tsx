import React, { useState } from 'react';
import {
  ShieldAlert,
  GraduationCap,
  UserCheck,
  Moon,
  Sun,
  Smartphone,
  Monitor,
  Flame,
  Coins,
  Snowflake,
  Compass,
  Sparkles,
  ChevronDown,
  Command,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { ScreenId, UserProfile, UserRole } from '../../types';
import { soundFX } from '../../utils/soundFX';

interface TopHeaderBarProps {
  user: UserProfile;
  activeRole: UserRole;
  onChangeRole: (role: UserRole) => void;
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
  deviceMode?: 'desktop' | 'mobile';
  onToggleDeviceMode?: () => void;
  onOpenCommandPalette?: () => void;
}

export const TopHeaderBar: React.FC<TopHeaderBarProps> = ({
  user,
  activeRole = 'student',
  onChangeRole,
  currentScreen = 'dashboard',
  onNavigate,
  isDarkMode = true,
  onToggleTheme,
  deviceMode = 'desktop',
  onToggleDeviceMode,
  onOpenCommandPalette,
}) => {
  const [screenMenuOpen, setScreenMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(soundFX.isEnabled());

  const handleToggleSound = () => {
    const next = soundFX.toggleSound();
    setSoundActive(next);
  };

  const screenCategories: { title: string; screens: { id: ScreenId; label: string }[] }[] = [
    {
      title: "Kirish & Auth & Xatoliklar",
      screens: [
        { id: 'login', label: '1.1 Kirish (Login)' },
        { id: 'register', label: '1.2 Ro\'yxatdan o\'tish' },
        { id: 'onboarding', label: '1.3 Onboarding slayder' },
        { id: 'error404', label: '1.4 404 — Topilmadi' },
        { id: 'error500', label: '1.5 500 — Server xatosi' },
        { id: 'offline', label: '1.6 Offline — Internet yo\'q' },
      ],
    },
    {
      title: "O'quvchi (Student) Moduli",
      screens: [
        { id: 'dashboard', label: '2.1 Dashboard (Bosh sahifa)' },
        { id: 'profile', label: '2.2 Profil & Referal' },
        { id: 'leaderboard', label: '2.3 Reyting (Podium)' },
        { id: 'analytics', label: '2.4 Analitika (14-kun grafik)' },
        { id: 'tests', label: '3.1 Test Markazi' },
        { id: 'test_active', label: '3.2 Test yechish (6 xil tur)' },
        { id: 'test_feedback', label: '3.3 Natija & AI Tahlil' },
        { id: 'test_history', label: '3.4 Test tarixi' },
        { id: 'revision', label: '3.5 Xatolar ustida ishlash' },
        { id: 'arena', label: '4.1 Battle Arena (1v1 duel)' },
        { id: 'game_timeline', label: '4.2 Mini o\'yin: Timeline' },
        { id: 'game_map', label: '4.3 Mini o\'yin: Xarita' },
        { id: 'game_person', label: '4.4 Mini o\'yin: Shaxsni top' },
        { id: 'learning', label: '4.5 O\'qish & Flashcard' },
        { id: 'ai_mentor', label: '4.6 AI Mentor (Chat)' },
        { id: 'shop', label: '5.1 Coin Do\'kon' },
        { id: 'inventory', label: '5.2 Inventar' },
        { id: 'premium', label: '5.3 Premium Tariflar' },
        { id: 'checkout', label: '5.4 To\'lov (Checkout)' },
        { id: 'payment_status', label: '5.5 To\'lov holati (Real-time)' },
        { id: 'my_payments', label: '5.6 To\'lovlarim tarixi' },
      ],
    },
    {
      title: "O'qituvchi (Teacher) Moduli",
      screens: [
        { id: 'teacher_dashboard', label: '6.1 Teacher Dashboard' },
        { id: 'teacher_tests', label: '6.2 Testlarim ro\'yxati' },
        { id: 'teacher_builder', label: '6.3 Savol qurish (Builder)' },
        { id: 'teacher_preview', label: '6.4 Test preview' },
        { id: 'teacher_grading', label: '6.5 Yozma baholash' },
        { id: 'teacher_lessons', label: '6.6 Darslar boshqaruvi' },
        { id: 'teacher_games', label: '6.7 O\'yinlar yaratish' },
      ],
    },
    {
      title: "Super Admin Moduli",
      screens: [
        { id: 'admin_dashboard', label: '7.1 Admin Dashboard' },
        { id: 'admin_users', label: '7.2 Foydalanuvchilar (Bulk)' },
        { id: 'admin_user_detail', label: '7.2.1 Foydalanuvchi detali' },
        { id: 'admin_teachers', label: '7.3 O\'qituvchilar' },
        { id: 'admin_subjects', label: '7.4 Fanlar boshqaruvi' },
        { id: 'admin_shop', label: '7.5 Do\'kon mahsulotlari' },
        { id: 'admin_tests', label: '7.6 Testlar boshqaruvi' },
        { id: 'admin_lessons', label: '7.7 Darslar boshqaruvi' },
        { id: 'admin_games', label: '7.8 O\'yinlar boshqaruvi' },
        { id: 'admin_results', label: '7.9 Natijalar (Attempts)' },
        { id: 'admin_payments', label: '7.10 To\'lovlar tekshiruvi' },
        { id: 'admin_broadcast', label: '7.11 Xabar yuborish (Push)' },
        { id: 'admin_audit', label: '7.12 Audit jurnali' },
        { id: 'admin_settings', label: '7.13 Tizim sozlamalari' },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#17181a]/90 backdrop-blur-md border-b border-[rgba(255,255,255,0.08)] px-4 py-2.5 flex items-center justify-between gap-3 text-xs">
      {/* Left: Role Switcher Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-[#202226] border border-[rgba(255,255,255,0.08)] rounded-xl">
        <button
          onClick={() => {
            onChangeRole('student');
            if (currentScreen.startsWith('teacher_') || currentScreen.startsWith('admin_')) {
              onNavigate('dashboard');
            }
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
            activeRole === 'student'
              ? 'bg-[#2fb3a3] text-[#0d1416] font-semibold shadow-sm'
              : 'text-[#8d9094] hover:text-[#e9eaeb]'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>O'quvchi</span>
        </button>

        <button
          onClick={() => {
            onChangeRole('teacher');
            onNavigate('teacher_dashboard');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
            activeRole === 'teacher'
              ? 'bg-amber-500 text-black font-semibold shadow-sm'
              : 'text-[#8d9094] hover:text-[#e9eaeb]'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>O'qituvchi</span>
        </button>

        <button
          onClick={() => {
            onChangeRole('admin');
            onNavigate('admin_dashboard');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
            activeRole === 'admin'
              ? 'bg-rose-500 text-white font-semibold shadow-sm'
              : 'text-[#8d9094] hover:text-[#e9eaeb]'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Super Admin</span>
        </button>
      </div>

      {/* Center: Realtime Gamification Stats Pill (Student) */}
      <div className="hidden md:flex items-center gap-3">
        <div
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 font-semibold cursor-pointer hover:bg-orange-500/20 transition-colors"
          title="Ketma-ketlik (Streak)"
        >
          <Flame className="w-3.5 h-3.5 text-orange-400" />
          <span>{user.streak} kun</span>
        </div>

        <div
          onClick={() => onNavigate('shop')}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 font-semibold cursor-pointer hover:bg-amber-500/20 transition-colors"
          title="Tanga balansi"
        >
          <Coins className="w-3.5 h-3.5 text-amber-400" />
          <span>{user.coins} 🪙</span>
        </div>

        {user.streakFreezes > 0 && (
          <div
            onClick={() => onNavigate('inventory')}
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 cursor-pointer"
            title="Streak muzlatish himoyasi mavjud"
          >
            <Snowflake className="w-3.5 h-3.5 text-blue-400" />
            <span>{user.streakFreezes} muzlatish</span>
          </div>
        )}
      </div>

      {/* Right Controls: Command Palette, Sound Toggle, Screen Navigator Dropdown, Device Toggle, Theme Toggle */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Command Palette Button (Cmd + K) */}
        <button
          onClick={onOpenCommandPalette}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#202226] border border-[rgba(255,255,255,0.08)] hover:border-[#2fb3a3] text-[#b7b9bc] hover:text-[#e9eaeb] transition-all text-xs"
          title="Tezkor qidiruv va buyruqlar (Ctrl + K / Cmd + K)"
        >
          <Command className="w-3.5 h-3.5 text-[#5cc4b6]" />
          <span className="font-medium">Qidiruv</span>
          <kbd className="px-1.5 py-0.5 rounded bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] text-[10px] font-mono text-[#8d9094]">
            ⌘K
          </kbd>
        </button>

        {/* Audio FX Sound Toggle */}
        <button
          onClick={handleToggleSound}
          title={soundActive ? "Ovozli effektlarni o'chirish" : "Ovozli effektlarni yoqish (Audio FX)"}
          className={`p-2 rounded-xl border transition-colors ${
            soundActive
              ? 'bg-[#2fb3a3]/10 border-[#2fb3a3]/30 text-[#5cc4b6]'
              : 'bg-[#202226] border-[rgba(255,255,255,0.08)] text-[#8d9094] hover:text-[#e9eaeb]'
          }`}
        >
          {soundActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Quick Screen Selector */}
        <div className="relative">
          <button
            onClick={() => setScreenMenuOpen(!screenMenuOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#202226] border border-[rgba(255,255,255,0.1)] text-[#e9eaeb] hover:border-[#2fb3a3] transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-[#5cc4b6]" />
            <span className="font-medium hidden sm:inline">Barcha Sahifalar</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#8d9094]" />
          </button>

          {screenMenuOpen && (
            <div className="absolute right-0 mt-2 w-80 max-h-[75vh] overflow-y-auto rounded-2xl bg-[#1c1e21] border border-[rgba(255,255,255,0.15)] shadow-2xl p-2 z-50">
              <div className="p-2 border-b border-[rgba(255,255,255,0.08)] mb-2 flex items-center justify-between">
                <span className="font-semibold text-xs text-[#e9eaeb] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#2fb3a3]" />
                  Tezkor Sahifalar (50+ ekran)
                </span>
                <span className="text-[10px] text-[#8d9094]">Figma Spetsifikatsiyasi</span>
              </div>
              {screenCategories.map((cat, idx) => (
                <div key={idx} className="mb-3">
                  <p className="px-2 py-1 text-[10px] font-bold text-[#8d9094] uppercase tracking-wider">
                    {cat.title}
                  </p>
                  <div className="space-y-0.5">
                    {cat.screens.map((sc) => (
                      <button
                        key={sc.id}
                        onClick={() => {
                          onNavigate(sc.id);
                          setScreenMenuOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                          currentScreen === sc.id
                            ? 'bg-[rgba(47,179,163,0.18)] text-[#5cc4b6] font-semibold'
                            : 'text-[#b7b9bc] hover:bg-[rgba(255,255,255,0.05)] hover:text-[#e9eaeb]'
                        }`}
                      >
                        <span>{sc.label}</span>
                        {currentScreen === sc.id && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2fb3a3]"></span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Device View Frame Toggle (1440px desktop vs 390px mobile) */}
        <button
          onClick={onToggleDeviceMode}
          title={deviceMode === 'desktop' ? "Mobil rejimiga o'tish (390px)" : "Desktop rejimiga o'tish (1440px)"}
          className="p-1.5 rounded-xl bg-[#202226] border border-[rgba(255,255,255,0.08)] text-[#b7b9bc] hover:text-[#e9eaeb] transition-colors"
        >
          {deviceMode === 'desktop' ? (
            <Smartphone className="w-4 h-4 text-[#5cc4b6]" />
          ) : (
            <Monitor className="w-4 h-4 text-[#5cc4b6]" />
          )}
        </button>

        {/* Dark/Light Theme Toggle */}
        <button
          onClick={onToggleTheme}
          title="Mavzuni almashtirish (Dark / Light)"
          className="p-1.5 rounded-xl bg-[#202226] border border-[rgba(255,255,255,0.08)] text-[#b7b9bc] hover:text-[#e9eaeb] transition-colors"
        >
          {isDarkMode ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-[#5cc4b6]" />
          )}
        </button>
      </div>
    </header>
  );
};
