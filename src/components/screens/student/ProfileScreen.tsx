import React, { useState } from 'react';
import {
  User,
  Coins,
  Trophy,
  Zap,
  Gift,
  Copy,
  Check,
  Award,
  Crown,
  Swords,
  FileCheck2,
  Share2,
  Flame,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { UserProfile, ScreenId } from '../../../types';
import { Badge } from '../../ui/Badge';
import { soundFX } from '../../../utils/soundFX';

interface ProfileScreenProps {
  user: UserProfile;
  onNavigate: (screen: ScreenId) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  onNavigate,
}) => {
  const [copied, setCopied] = useState(false);
  const referralUrl = `https://ilmildizi.uz/register?ref=${user.referralCode}`;

  const handleCopy = () => {
    soundFX.playClick();
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const badges = [
    {
      name: 'Tarix Bilimdoni',
      rarity: 'epic' as const,
      icon: '📜',
      desc: 'Tarixdan 100+ test muvaffaqiyatli yechilgan',
    },
    {
      name: '14-Kunlik Olov',
      rarity: 'rare' as const,
      icon: '🔥',
      desc: '14 kun ketma-ket dars qoldirilmagan',
    },
    {
      name: 'Arena Chempioni',
      rarity: 'legendary' as const,
      icon: '⚔️',
      desc: '1v1 jangda 25 marta g‘alaba qozonilgan',
    },
    {
      name: 'Sertifikat A+',
      rarity: 'epic' as const,
      icon: '🏅',
      desc: 'Diagnostika testida 85%+ ball olingan',
    },
  ];

  const recentTests = [
    { title: 'Milliy Sertifikat #4 (Tarix)', score: '86%', date: '19-avgust' },
    { title: 'BBA Tarix Diagnostika Test #12', score: '92%', date: '17-avgust' },
    { title: 'Temuriylar Davri Maxsus Test', score: '74%', date: '15-avgust' },
  ];

  const recentBattles = [
    { opponent: 'Shahzod Aliyev', result: 'win', score: '8 - 5', date: 'Bugun' },
    { opponent: 'Javohir Rustamov', result: 'win', score: '7 - 6', date: 'Kecha' },
    { opponent: 'Madinabonu Karimova', result: 'loss', score: '6 - 8', date: '16-avgust' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* 1. Header Profile Card (Bento Modern) */}
      <div className="bento-card p-6 sm:p-8 bg-gradient-to-br from-[#1b1e26] via-[#14171d] to-[#12151b] flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left border border-[rgba(255,255,255,0.08)]">
        <div className="relative">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-2 border-[#2fb3a3] shadow-lg shadow-[#2fb3a3]/20"
            referrerPolicy="no-referrer"
          />
          {user.isPremium && (
            <span className="absolute -bottom-2 -right-2 p-1.5 rounded-xl bg-amber-500 text-black shadow-md">
              <Crown className="w-4 h-4" />
            </span>
          )}
        </div>

        <div className="flex-1 space-y-1.5 min-w-0">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-[#f0f1f3] font-voice">
              {user.name}
            </h1>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#2fb3a3]/15 text-[#5cc4b6] border border-[#2fb3a3]/30 font-mono">
              Daraja: {user.level} · {user.targetUniversity}
            </span>
          </div>

          <p className="text-xs text-[#8d9094] font-mono">
            ID: {user.id} · Viloyat: {user.region} · Qo‘shilgan: Avgust 2026
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs font-mono">
            <span className="text-amber-400 font-bold flex items-center gap-1">
              🔥 {user.streakDays} kunlik streak
            </span>
            <span className="text-yellow-400 font-bold flex items-center gap-1">
              🪙 {user.coins} tanga
            </span>
            <span className="text-[#5cc4b6] font-bold flex items-center gap-1">
              ⚡ {user.xp} XP
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            soundFX.playClick();
            onNavigate('premium');
          }}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-black text-xs font-bold shadow-lg shadow-amber-500/20 hover:scale-105 transition-all tactile-btn shrink-0 flex items-center gap-2"
        >
          <Crown className="w-4 h-4" />
          <span>{user.isPremium ? 'PRO Obuna Faol' : 'PRO-ga O‘tish'}</span>
        </button>
      </div>

      {/* 2. Referral Viral Box */}
      <div className="bento-card p-6 bg-gradient-to-r from-[#17221d] via-[#14171d] to-[#141d24] border border-[#2fb3a3]/25 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <Gift className="w-4 h-4 text-[#5cc4b6]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#5cc4b6]">
              Do‘stlarni Taklif Qiling & Tanga Yuting
            </h3>
          </div>
          <p className="text-xs text-[#a3a7ae]">
            Har bir taklif qilingan abituriyent uchun sizga <strong>+50 Tanga</strong> va <strong>+100 XP</strong> beriladi!
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <input
            type="text"
            readOnly
            value={referralUrl}
            className="flex-1 sm:w-56 px-3.5 py-2 rounded-xl bg-[#14171d] border border-[rgba(255,255,255,0.08)] text-[11px] font-mono text-[#a3a7ae]"
          />
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-xl bg-[#2fb3a3] text-[#07090b] text-xs font-bold flex items-center gap-1.5 hover:bg-[#269488] transition-all tactile-btn shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Nusxalandi!' : 'Ulashish'}</span>
          </button>
        </div>
      </div>

      {/* 3. Badges Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8d9094] flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Erishilgan Yutuqlar & Nishonlar</span>
          </h3>
          <span className="text-[11px] text-[#8d9094] font-mono">4 / 12 ochilgan</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {badges.map((b, idx) => (
            <div
              key={idx}
              className="bento-card p-4 bg-[#14171d] text-center space-y-2 hover:border-[#2fb3a3]/30 transition-all tactile-btn"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#1a1e26] border border-[rgba(255,255,255,0.08)] text-2xl flex items-center justify-center mx-auto shadow-inner">
                {b.icon}
              </div>
              <div>
                <p className="text-xs font-bold text-[#f0f1f3]">{b.name}</p>
                <p className="text-[10px] text-[#8d9094] mt-0.5 leading-tight">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Recent Activity Lists (2 Cols) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Recent Tests */}
        <div className="bento-card p-5 bg-[#14171d] space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8d9094] flex items-center gap-1.5">
            <FileCheck2 className="w-4 h-4 text-[#5cc4b6]" />
            <span>So‘nggi Test Natijalari</span>
          </h3>
          <div className="space-y-2">
            {recentTests.map((t, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-[#1a1e26] border border-[rgba(255,255,255,0.06)] flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-semibold text-[#f0f1f3]">{t.title}</p>
                  <span className="text-[10px] text-[#8d9094]">{t.date}</span>
                </div>
                <span className="font-bold text-[#5cc4b6] font-mono text-sm">
                  {t.score}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Battles */}
        <div className="bento-card p-5 bg-[#14171d] space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8d9094] flex items-center gap-1.5">
            <Swords className="w-4 h-4 text-rose-400" />
            <span>So‘nggi Arena Duellari</span>
          </h3>
          <div className="space-y-2">
            {recentBattles.map((b, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-[#1a1e26] border border-[rgba(255,255,255,0.06)] flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-semibold text-[#f0f1f3]">vs {b.opponent}</p>
                  <span className="text-[10px] text-[#8d9094]">{b.date}</span>
                </div>
                <div className="text-right">
                  <span
                    className={`font-bold font-mono text-xs px-2 py-0.5 rounded-md ${
                      b.result === 'win'
                        ? 'bg-[#52a86b]/15 text-[#7ad192]'
                        : 'bg-rose-500/15 text-rose-300'
                    }`}
                  >
                    {b.result === 'win' ? 'G‘alaba' : 'Mag‘lubiyat'}
                  </span>
                  <p className="text-[10px] text-[#8d9094] font-mono mt-0.5">
                    {b.score}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
