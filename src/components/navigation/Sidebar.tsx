import React from 'react';
import {
  LayoutDashboard,
  FileCheck2,
  BookOpen,
  Swords,
  Bot,
  ShoppingBag,
  Crown,
  BarChart3,
  Trophy,
  User,
  LogOut,
  FolderKanban,
  GraduationCap,
  Gamepad2,
  Users,
  ShieldCheck,
  CreditCard,
  Send,
  ScrollText,
  Settings,
  Sparkles,
  Layers,
  Sprout,
} from 'lucide-react';
import { ScreenId, UserProfile, UserRole } from '../../types';
import { soundFX } from '../../utils/soundFX';

interface SidebarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  role: UserRole;
  isPremium?: boolean;
  user?: UserProfile;
  onLogout: () => void;
}

interface NavItem {
  id: ScreenId;
  label: string;
  icon: any;
  highlight?: boolean;
  alert?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onNavigate,
  role,
  isPremium = true,
  user,
  onLogout,
}) => {
  // Student navigation
  const studentNav: NavItem[] = [
    { id: 'dashboard', label: 'Boshqaruv', icon: LayoutDashboard },
    { id: 'tests', label: 'Test Markazi', icon: FileCheck2 },
    { id: 'learning', label: 'O‘quv Markazi', icon: BookOpen },
    { id: 'arena', label: '1v1 Duel Arena', icon: Swords },
    { id: 'ai_mentor', label: 'AI Mentor 24/7', icon: Bot },
    { id: 'shop', label: 'Do‘kon & Sovg‘a', icon: ShoppingBag },
    { id: 'premium', label: 'Premium PRO', icon: Crown, highlight: true },
    { id: 'analytics', label: 'Analitika', icon: BarChart3 },
    { id: 'leaderboard', label: 'Liderlar Ligasi', icon: Trophy },
    { id: 'profile', label: 'Mening Profilim', icon: User },
  ];

  // Teacher navigation
  const teacherNav: NavItem[] = [
    { id: 'teacher_dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'teacher_groups', label: 'Guruhlarim', icon: Users },
    { id: 'teacher_builder', label: 'Test Tuzish', icon: FolderKanban },
  ];

  // Admin navigation
  const adminNav: NavItem[] = [
    { id: 'admin_dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'admin_users', label: 'Foydalanuvchilar', icon: Users },
    { id: 'admin_questions', label: 'Savollar Banki', icon: FileCheck2 },
    { id: 'admin_settings', label: 'Sozlamalar', icon: Settings },
  ];

  const currentNav =
    role === 'admin'
      ? adminNav
      : role === 'teacher'
      ? teacherNav
      : studentNav;

  return (
    <aside className="hidden md:flex w-64 shrink-0 h-screen fixed top-0 left-0 flex-col justify-between bg-[#14171d] border-r border-[rgba(255,255,255,0.07)] select-none z-30">
      {/* Brand Header */}
      <div className="p-5 pb-3">
        <div
          onClick={() => {
            soundFX.playClick();
            if (role === 'admin') onNavigate('admin_dashboard');
            else if (role === 'teacher') onNavigate('teacher_dashboard');
            else onNavigate('dashboard');
          }}
          className="flex items-center gap-3 cursor-pointer group tactile-btn"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2fb3a3] to-[#186f64] flex items-center justify-center shadow-lg shadow-[#2fb3a3]/20 group-hover:scale-105 transition-transform">
            <Sprout className="w-5 h-5 text-[#07090b]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg tracking-tight text-[#f0f1f3] group-hover:text-[#5cc4b6] transition-colors font-voice">
                IlmIldizi
              </span>
              <span className="text-[10px] uppercase font-mono font-bold px-1.5 py-0.5 rounded bg-[rgba(47,179,163,0.18)] text-[#5cc4b6]">
                Pro
              </span>
            </div>
            <p className="text-[11px] text-[#8d9094] font-medium tracking-wide">
              Milliy Sertifikat & BBA
            </p>
          </div>
        </div>

        {/* Role Header Banner */}
        {role === 'teacher' && (
          <div className="mt-3 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold flex items-center gap-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>O‘QITUVCHI PANELI</span>
          </div>
        )}
        {role === 'admin' && (
          <div className="mt-3 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs font-semibold flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>SUPER ADMIN REJIMI</span>
          </div>
        )}
      </div>

      {/* Nav Items List */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        {currentNav.map((item) => {
          const Icon = item.icon;
          const isActive =
            currentScreen === item.id ||
            (item.id === 'tests' &&
              ['test_active', 'test_feedback', 'test_history', 'revision'].includes(
                currentScreen
              )) ||
            (item.id === 'arena' &&
              ['game_timeline', 'game_map', 'game_person'].includes(
                currentScreen
              ));

          return (
            <button
              key={item.id}
              onClick={() => {
                soundFX.playClick();
                onNavigate(item.id);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-medium transition-all duration-150 group tactile-btn ${
                isActive
                  ? 'bg-[#2fb3a3] text-[#07090b] font-bold shadow-md shadow-[#2fb3a3]/20'
                  : 'text-[#a3a7ae] hover:text-[#f0f1f3] hover:bg-[rgba(255,255,255,0.05)]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive
                      ? 'text-[#07090b]'
                      : 'text-[#8d9094] group-hover:text-[#f0f1f3]'
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {item.highlight && !isActive && (
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-black shadow-sm">
                  PRO
                </span>
              )}
              {item.alert && (
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {/* User Profile Bottom Widget */}
      <div className="p-3 border-t border-[rgba(255,255,255,0.07)] bg-[#101217]">
        <div
          onClick={() => {
            soundFX.playClick();
            onNavigate(role === 'student' ? 'profile' : 'dashboard');
          }}
          className="flex items-center justify-between p-2 rounded-2xl hover:bg-[rgba(255,255,255,0.05)] transition-colors cursor-pointer group tactile-btn"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative shrink-0">
              <img
                src={
                  user?.avatar ||
                  'https://api.dicebear.com/7.x/adventurer/svg?seed=Azizbek'
                }
                alt="Avatar"
                className="w-9 h-9 rounded-xl bg-slate-800 border border-[rgba(255,255,255,0.12)] object-cover"
                referrerPolicy="no-referrer"
              />
              {isPremium && (
                <span
                  className="absolute -top-1.5 -right-1.5 text-[10px]"
                  title="Premium foydalanuvchi"
                >
                  👑
                </span>
              )}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[#f0f1f3] truncate group-hover:text-[#5cc4b6] transition-colors">
                {user?.name || 'Azizbek'} {user?.surname || ''}
              </p>
              <p className="text-[10px] text-[#8d9094] truncate font-mono">
                Lvl {user?.level || 8} ·{' '}
                <span className="text-[#5cc4b6]">{user?.xp || 3420} XP</span>
              </p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              soundFX.playClick();
              onLogout();
            }}
            title="Tizimdan chiqish"
            className="p-1.5 text-[#8d9094] hover:text-rose-400 rounded-xl hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
