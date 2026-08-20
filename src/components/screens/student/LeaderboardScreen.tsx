import React, { useState } from 'react';
import {
  Trophy,
  Crown,
  Medal,
  Award,
  Flame,
  Search,
  ChevronRight,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import { MOCK_LEADERBOARD } from '../../../data/mockData';
import { ScreenId } from '../../../types';
import { soundFX } from '../../../utils/soundFX';

interface LeaderboardScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const LeaderboardScreen: React.FC<LeaderboardScreenProps> = () => {
  const [activeSubject, setActiveSubject] = useState('Umumiy');
  const subjects = [
    'Umumiy',
    'O‘zbekiston Tarixi',
    'Jahon Tarixi',
    'Milliy Sertifikat',
    'Ona tili',
  ];

  const top3 = MOCK_LEADERBOARD.slice(0, 3);
  const remaining = MOCK_LEADERBOARD.slice(3);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* 1. Header Banner */}
      <div className="bento-card p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#201a14] via-[#14171d] to-[#181c24] border-amber-500/20">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/25 flex items-center gap-1">
              <Trophy className="w-3 h-3 text-amber-400" />
              Haftalik Liderlar Ligasi
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#f0f1f3] tracking-tight font-voice">
            Respublika Reyting Jadvali
          </h1>
          <p className="text-xs sm:text-sm text-[#a3a7ae] mt-1 max-w-xl">
            Har hafta eng ko‘p XP to‘plagan top 3 talabaga 1 oylik bepul Pro obuna va sertifikatlar taqdim etiladi.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#14171d] border border-[rgba(255,255,255,0.08)] self-start sm:self-auto text-xs space-y-1 font-mono shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[#a3a7ae]">Mavsum tugashi:</span>
            <strong className="text-amber-400">2 kun, 14 soat</strong>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#a3a7ae]">Sizning o‘rningiz:</span>
            <strong className="text-[#5cc4b6]">#4 (Top 1%)</strong>
          </div>
        </div>
      </div>

      {/* 2. Subject Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {subjects.map((sub) => (
          <button
            key={sub}
            onClick={() => {
              soundFX.playClick();
              setActiveSubject(sub);
            }}
            className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all tactile-btn ${
              activeSubject === sub
                ? 'bg-[#2fb3a3] text-[#07090b] shadow-md shadow-[#2fb3a3]/20 font-bold'
                : 'bento-card bg-[#14171d] text-[#8d9094] hover:text-[#f0f1f3]'
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      {/* 3. Top 3 Podium Cards (Duolingo / EdTech Champions) */}
      <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 pb-2 items-end">
        {/* #2 Silver (Left) */}
        <div className="bento-card p-4 sm:p-5 rounded-3xl text-center border-slate-400/30 bg-[#14171d] flex flex-col items-center relative order-1">
          <span className="absolute -top-3 px-3 py-0.5 rounded-full bg-slate-300 text-slate-900 text-[10px] font-black shadow-md font-mono">
            #2 KUMUSH
          </span>
          <img
            src={top3[1]?.avatar}
            alt={top3[1]?.name}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2 border-slate-300 mb-2 mt-2 object-cover"
            referrerPolicy="no-referrer"
          />
          <h4 className="font-bold text-xs sm:text-sm text-[#f0f1f3] truncate w-full">
            {top3[1]?.name}
          </h4>
          <span className="text-[10px] text-[#8d9094] font-mono">
            Level {top3[1]?.level}
          </span>
          <div className="mt-2 text-xs font-bold text-slate-300 font-mono">
            ⚡ {top3[1]?.xp} XP
          </div>
        </div>

        {/* #1 Gold (Center - Higher) */}
        <div className="bento-card p-5 sm:p-6 rounded-3xl text-center border-amber-500/40 bg-gradient-to-b from-[#221c15] to-[#14171d] flex flex-col items-center relative order-2 transform -translate-y-4 shadow-xl shadow-amber-500/10">
          <span className="absolute -top-3.5 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-[11px] font-black shadow-lg font-mono flex items-center gap-1">
            <Crown className="w-3.5 h-3.5" />
            #1 CHEMPION
          </span>
          <img
            src={top3[0]?.avatar}
            alt={top3[0]?.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-amber-400 mb-2 mt-3 object-cover shadow-md shadow-amber-500/30"
            referrerPolicy="no-referrer"
          />
          <h4 className="font-bold text-sm sm:text-base text-[#f0f1f3] truncate w-full">
            {top3[0]?.name}
          </h4>
          <span className="text-[10px] text-amber-300/80 font-mono">
            Level {top3[0]?.level}
          </span>
          <div className="mt-2 text-sm font-black text-amber-400 font-mono bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/20">
            ⚡ {top3[0]?.xp} XP
          </div>
        </div>

        {/* #3 Bronze (Right) */}
        <div className="bento-card p-4 sm:p-5 rounded-3xl text-center border-amber-700/30 bg-[#14171d] flex flex-col items-center relative order-3">
          <span className="absolute -top-3 px-3 py-0.5 rounded-full bg-amber-700 text-amber-100 text-[10px] font-black shadow-md font-mono">
            #3 BRONZA
          </span>
          <img
            src={top3[2]?.avatar}
            alt={top3[2]?.name}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2 border-amber-700 mb-2 mt-2 object-cover"
            referrerPolicy="no-referrer"
          />
          <h4 className="font-bold text-xs sm:text-sm text-[#f0f1f3] truncate w-full">
            {top3[2]?.name}
          </h4>
          <span className="text-[10px] text-[#8d9094] font-mono">
            Level {top3[2]?.level}
          </span>
          <div className="mt-2 text-xs font-bold text-amber-600 font-mono">
            ⚡ {top3[2]?.xp} XP
          </div>
        </div>
      </div>

      {/* 4. Full Leaderboard Ranking List */}
      <div className="bento-card p-4 sm:p-6 bg-[#14171d] space-y-2 border border-[rgba(255,255,255,0.08)]">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8d9094] mb-3">
          Barcha Ishtirokchilar
        </h3>

        <div className="space-y-2">
          {remaining.map((player, idx) => {
            const rank = idx + 4;
            const isMe = player.isCurrentUser || rank === 4;

            return (
              <div
                key={player.id}
                className={`p-3.5 rounded-2xl flex items-center justify-between gap-3 transition-all ${
                  isMe
                    ? 'bg-[#2fb3a3]/15 border border-[#2fb3a3]/40 shadow-sm'
                    : 'bg-[#1a1e26] border border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.12)]'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <span
                    className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                      isMe
                        ? 'bg-[#2fb3a3] text-[#07090b]'
                        : 'bg-[#14171d] text-[#8d9094]'
                    }`}
                  >
                    #{rank}
                  </span>

                  <img
                    src={player.avatar}
                    alt={player.name}
                    className="w-10 h-10 rounded-xl object-cover shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-[#f0f1f3] truncate">
                      {player.name} {isMe && <span className="text-[#5cc4b6] font-mono">(Siz)</span>}
                    </p>
                    <span className="text-[10px] text-[#8d9094] font-mono">
                      Level {player.level} · {player.subject}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs sm:text-sm font-bold text-[#5cc4b6] font-mono">
                    ⚡ {player.xp} XP
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
