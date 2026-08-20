import React from 'react';
import {
  Flame,
  Coins,
  Trophy,
  Zap,
  FileCheck2,
  Swords,
  BookOpen,
  Bot,
  ArrowRight,
  History,
  MapPin,
  HelpCircle,
  Crown,
  ChevronRight,
  Sparkles,
  Award,
  GraduationCap,
  Play,
  TrendingUp,
  Target,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { UserProfile, DailyMission, ScreenId } from '../../../types';
import { INITIAL_MISSIONS } from '../../../data/mockData';
import { StatTile } from '../../ui/StatCard';
import { Badge } from '../../ui/Badge';
import { LivePresenceBar } from '../../ui/LivePresenceBar';
import { soundFX } from '../../../utils/soundFX';

interface DashboardScreenProps {
  user: UserProfile;
  missions?: DailyMission[];
  onNavigate: (screen: ScreenId) => void;
  onClaimMission?: (missionId: string) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  user,
  missions = INITIAL_MISSIONS,
  onNavigate,
  onClaimMission,
}) => {
  const xpPercentage = Math.min(100, Math.round((user.xp / user.xpToNextLevel) * 100));

  const quickAccess = [
    {
      id: 'tests' as ScreenId,
      title: 'BBA & Sertifikat Testlari',
      desc: '30+ ta rasmiy mock testlar',
      icon: FileCheck2,
      badge: 'BBA',
      color: 'text-[#2fb3a3]',
      bg: 'bg-[#2fb3a3]/10',
    },
    {
      id: 'arena' as ScreenId,
      title: '1v1 Battle Arena',
      desc: 'Jonli intellektual jang',
      icon: Swords,
      badge: 'Live',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
    },
    {
      id: 'learning' as ScreenId,
      title: 'Darslar & Konspektlar',
      desc: '6-11 sinf audio darslari',
      icon: BookOpen,
      badge: 'Audio',
      color: 'text-sky-400',
      bg: 'bg-sky-500/10',
    },
    {
      id: 'ai_mentor' as ScreenId,
      title: 'Tarixchi AI Mentor',
      desc: 'Savollarga 24/7 tahliliy javob',
      icon: Bot,
      badge: 'AI',
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10',
    },
  ];

  const miniGames = [
    {
      id: 'game_timeline' as ScreenId,
      title: 'Xronologik Ketma-ketlik',
      desc: 'Voqealarni asrlar bo‘yicha to‘g‘ri joylashtiring',
      icon: History,
      reward: '+80 XP',
      accent: 'text-sky-400',
      border: 'hover:border-sky-500/40',
    },
    {
      id: 'game_map' as ScreenId,
      title: 'Xarita & Qal’alar Tahlili',
      desc: 'Qadimgi davlatlar va jang maydonlarini toping',
      icon: MapPin,
      reward: '+75 XP',
      accent: 'text-emerald-400',
      border: 'hover:border-emerald-500/40',
    },
    {
      id: 'game_person' as ScreenId,
      title: 'Tarixiy Shaxsni Toping',
      desc: '3 ta maslahat orqali sarkarda yoki allomani toping',
      icon: HelpCircle,
      reward: '+90 XP',
      accent: 'text-amber-400',
      border: 'hover:border-amber-500/40',
    },
  ];

  const recentExams = [
    {
      title: 'Milliy Sertifikat #4 (Tarix)',
      score: 86,
      date: 'Kecha, 14:30',
      status: 'A+',
      badgeColor: 'bg-[#52a86b]/15 text-[#7ad192] border-[#52a86b]/30',
    },
    {
      title: 'BBA Tarix Diagnostika #12',
      score: 92,
      date: '17-avgust',
      status: 'A+',
      badgeColor: 'bg-[#52a86b]/15 text-[#7ad192] border-[#52a86b]/30',
    },
    {
      title: 'Temuriylar Davri Maxsus Test',
      score: 74,
      date: '15-avgust',
      status: 'B',
      badgeColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Live Social Presence & Motivational Ticker */}
      <LivePresenceBar />

      {/* 2. Apple / Linear Bento-Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* HERO COMMAND CARD (Full Width on Mobile, 8 cols on desktop) */}
        <div className="lg:col-span-8 bento-card p-6 sm:p-7 flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#181c24] via-[#13161c] to-[#161a22] border border-[rgba(255,255,255,0.09)]">
          {/* Ambient Glow in background */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#2fb3a3]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#2fb3a3]/15 text-[#5cc4b6] border border-[#2fb3a3]/25 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#5cc4b6]" />
                  Bugungi Tavsiya
                </span>
                {user.isPremium && (
                  <Badge variant="gold" size="sm">
                    <Crown className="w-3 h-3 text-amber-400" />
                    <span>Premium PRO</span>
                  </Badge>
                )}
              </div>

              <span className="text-xs text-[#8d9094] flex items-center gap-1 font-mono">
                <Target className="w-3.5 h-3.5 text-[#5cc4b6]" />
                Maqsad: 189.0 Ball (Grant)
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-[#f0f1f3] leading-snug font-voice">
              Temuriylar davri me’morchiligi va ilm-fan taraqqiyoti
            </h1>
            <p className="text-xs sm:text-sm text-[#a3a7ae] mt-2 max-w-xl leading-relaxed">
              Mirzo Ulug‘bek rasadxonasi, Samarqand va Hirot madrasalari hamda Alisher Navoiy davri madaniyatini o‘zlashtirish orqali +120 XP to‘plang.
            </p>
          </div>

          {/* Action Row */}
          <div className="mt-6 pt-5 border-t border-[rgba(255,255,255,0.07)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs text-[#a3a7ae]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>30 ta test savoli</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#8d9094]" />
                <span>45 daqiqa</span>
              </div>
            </div>

            <button
              onClick={() => {
                soundFX.playSelect();
                onNavigate('test_active');
              }}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#2fb3a3] to-[#269488] hover:from-[#269488] hover:to-[#1e7a70] text-[#07090b] text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#2fb3a3]/25 tactile-btn transition-all group"
            >
              <span>Testni Boshlash</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* BILIM ILDIZI (GROWTH AVATAR & LEVEL CARD) (4 cols on desktop) */}
        <div className="lg:col-span-4 bento-card p-6 flex flex-col justify-between bg-gradient-to-b from-[#161a22] to-[#121419] border border-[rgba(255,255,255,0.08)]">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-2xl object-cover border border-[rgba(255,255,255,0.12)] shadow-md"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute -bottom-1 -right-1 text-xs">🌱</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#f0f1f3]">{user.name} {user.surname}</h3>
                <p className="text-xs text-[#8d9094] mt-0.5">
                  Bilim Ildizi: <span className="text-[#5cc4b6] font-bold">Daraja {user.level}</span>
                </p>
              </div>
            </div>

            <div className="w-10 h-10 rounded-xl bg-[#2fb3a3]/15 border border-[#2fb3a3]/30 flex items-center justify-center text-xl shadow-inner">
              🌿
            </div>
          </div>

          {/* XP Level Bar with high aesthetic finish */}
          <div className="my-4">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span className="text-[#a3a7ae]">Keyingi darajagacha</span>
              <span className="text-[#5cc4b6] tabular-nums font-mono font-bold">
                {user.xp} / {user.xpToNextLevel} XP ({xpPercentage}%)
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-[#1e222c] overflow-hidden p-0.5 border border-[rgba(255,255,255,0.06)]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#2fb3a3] via-[#45d4c2] to-[#5cc4b6] transition-all duration-500 shadow-sm"
                style={{ width: `${xpPercentage}%` }}
              />
            </div>
          </div>

          <div className="pt-3 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between text-[11px] text-[#8d9094]">
            <span>Arena ELO: <strong className="text-[#f0f1f3] font-mono">{user.elo}</strong></span>
            <button
              onClick={() => onNavigate('profile')}
              className="text-[#5cc4b6] hover:underline font-medium flex items-center gap-0.5"
            >
              <span>Profil</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Key Stat Tiles (Streak, Coins, Level, Prediction) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bento-card p-4 flex items-center gap-3.5 bg-[#14171d]">
          <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-2xl animate-flame-pulse shrink-0">
            🔥
          </div>
          <div>
            <p className="text-[11px] font-medium text-[#8d9094]">Kunlik Uzluksizlik</p>
            <p className="text-base sm:text-lg font-bold text-[#f0f1f3] tabular-nums font-mono">
              {user.streak} kun
            </p>
          </div>
        </div>

        <div
          onClick={() => onNavigate('shop')}
          className="bento-card p-4 flex items-center gap-3.5 bg-[#14171d] cursor-pointer hover:border-amber-500/30 transition-all"
        >
          <div className="w-11 h-11 rounded-2xl bg-yellow-500/10 border border-yellow-500/25 flex items-center justify-center text-2xl shrink-0">
            🪙
          </div>
          <div>
            <p className="text-[11px] font-medium text-[#8d9094]">Tarixiy Tangalar</p>
            <p className="text-base sm:text-lg font-bold text-amber-400 tabular-nums font-mono">
              {user.coins}
            </p>
          </div>
        </div>

        <div className="bento-card p-4 flex items-center gap-3.5 bg-[#14171d]">
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-2xl shrink-0">
            📈
          </div>
          <div>
            <p className="text-[11px] font-medium text-[#8d9094]">DTB Prognozi</p>
            <p className="text-base sm:text-lg font-bold text-[#7ad192] tabular-nums font-mono">
              184.2 / 189
            </p>
          </div>
        </div>

        <div
          onClick={() => onNavigate('arena')}
          className="bento-card p-4 flex items-center gap-3.5 bg-[#14171d] cursor-pointer hover:border-rose-500/30 transition-all"
        >
          <div className="w-11 h-11 rounded-2xl bg-rose-500/10 border border-rose-500/25 flex items-center justify-center text-2xl shrink-0">
            ⚔️
          </div>
          <div>
            <p className="text-[11px] font-medium text-[#8d9094]">Arena Unvoni</p>
            <p className="text-base sm:text-lg font-bold text-rose-300">
              Yuzboshi
            </p>
          </div>
        </div>
      </div>

      {/* 4. Quick Access 4-Column Modern Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8d9094]">
            Asosiy O‘quv Bo‘limlari
          </h3>
          <span className="text-[11px] text-[#5cc4b6] font-medium">Barcha vositalar</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {quickAccess.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  soundFX.playClick();
                  onNavigate(item.id);
                }}
                className="bento-card p-4 text-left hover:border-[#2fb3a3]/50 transition-all group bg-[#14171d]"
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-11 h-11 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[rgba(255,255,255,0.06)] text-[#a3a7ae]">
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs font-bold text-[#f0f1f3] group-hover:text-[#5cc4b6] transition-colors">
                  {item.title}
                </p>
                <p className="text-[11px] text-[#8d9094] mt-1 line-clamp-1">
                  {item.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Bottom 2-Column: Mini Games (Left) + Missions & Exam History (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Interactive Mini Games (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8d9094]">
              Interaktiv Mini O‘yinlar & Bellashuv
            </h3>
            <span className="text-[11px] text-amber-400 font-semibold">Bonus XP</span>
          </div>

          <div className="space-y-3">
            {miniGames.map((game) => {
              const Icon = game.icon;
              return (
                <div
                  key={game.id}
                  onClick={() => {
                    soundFX.playSelect();
                    onNavigate(game.id);
                  }}
                  className={`bento-card p-4 flex items-center justify-between gap-4 cursor-pointer transition-all ${game.border} bg-[#14171d] tactile-btn`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className={`w-11 h-11 rounded-2xl bg-[rgba(255,255,255,0.04)] ${game.accent} flex items-center justify-center shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#f0f1f3] truncate">{game.title}</p>
                      <p className="text-[11px] text-[#8d9094] mt-0.5 truncate">{game.desc}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-[rgba(47,179,163,0.12)] text-[#5cc4b6] border border-[#2fb3a3]/20 font-mono">
                      {game.reward}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#8d9094]" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Daily Missions & Recent Exams (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Daily Missions */}
          <div className="bento-card p-5 bg-[#14171d]">
            <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-[rgba(255,255,255,0.06)]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#8d9094]">
                Kunlik Missiyalar
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#2fb3a3]/10 text-[#5cc4b6]">
                3 ta vazifa
              </span>
            </div>

            <div className="space-y-3">
              {(missions || []).map((m) => (
                <div key={m.id} className="p-2.5 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-semibold ${m.completed ? 'line-through text-[#8d9094]' : 'text-[#f0f1f3]'}`}>
                      {m.title}
                    </span>
                    <span className="text-[10px] font-mono text-[#5cc4b6] font-bold">
                      +{m.xpReward} XP
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1 text-[10px] text-[#8d9094]">
                    <span>{m.description}</span>
                    <span className="font-mono">{m.progress}/{m.total}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Exams */}
          <div className="bento-card p-5 bg-[#14171d]">
            <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-[rgba(255,255,255,0.06)]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#8d9094]">
                Oxirgi Natijalar
              </h3>
              <button
                onClick={() => onNavigate('test_history')}
                className="text-[11px] text-[#5cc4b6] hover:underline font-medium"
              >
                Barchasi
              </button>
            </div>

            <div className="space-y-2">
              {recentExams.map((exam, i) => (
                <div
                  key={i}
                  onClick={() => onNavigate('test_feedback')}
                  className="p-2.5 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] hover:border-[#2fb3a3]/30 transition-colors cursor-pointer flex items-center justify-between tactile-btn"
                >
                  <div className="min-w-0 pr-2">
                    <p className="text-xs font-semibold text-[#f0f1f3] truncate">{exam.title}</p>
                    <p className="text-[10px] text-[#8d9094]">{exam.date}</p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-lg border font-mono ${exam.badgeColor}`}>
                    {exam.score}% ({exam.status})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
