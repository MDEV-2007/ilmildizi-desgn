import React from 'react';
import {
  BarChart3,
  Flame,
  Coins,
  Trophy,
  Target,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  TrendingUp,
  Award,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { UserProfile, ScreenId } from '../../../types';
import { Badge } from '../../ui/Badge';
import { soundFX } from '../../../utils/soundFX';

interface AnalyticsScreenProps {
  user: UserProfile;
  onNavigate: (screen: ScreenId) => void;
}

export const AnalyticsScreen: React.FC<AnalyticsScreenProps> = ({
  user,
  onNavigate,
}) => {
  // 14 days activity data
  const activity14Days = [
    { day: '08', tests: 4, height: 40 },
    { day: '09', tests: 7, height: 70 },
    { day: '10', tests: 5, height: 50 },
    { day: '11', tests: 8, height: 80 },
    { day: '12', tests: 6, height: 60 },
    { day: '13', tests: 3, height: 30 },
    { day: '14', tests: 9, height: 90 },
    { day: '15', tests: 10, height: 100 },
    { day: '16', tests: 8, height: 80 },
    { day: '17', tests: 12, height: 100 },
    { day: '18', tests: 9, height: 85 },
    { day: '19', tests: 11, height: 95 },
    { day: '20', tests: 14, height: 100 },
    { day: 'Bugun', tests: 8, height: 75 },
  ];

  // 8 weeks progress data
  const weeklyProgress = [
    { week: 'W1', score: 68, xp: 450 },
    { week: 'W2', score: 72, xp: 580 },
    { week: 'W3', score: 75, xp: 620 },
    { week: 'W4', score: 81, xp: 740 },
    { week: 'W5', score: 79, xp: 700 },
    { week: 'W6', score: 84, xp: 820 },
    { week: 'W7', score: 88, xp: 910 },
    { week: 'W8', score: 92, xp: 1050 },
  ];

  const subjectMastery = [
    {
      name: 'O‘zbekiston Tarixi (Qadimgi & O‘rta asrlar)',
      percent: 88,
      color: 'from-[#2fb3a3] to-[#45d4c2]',
      level: 'A+',
    },
    {
      name: 'Temuriylar & Xonliklar Davri',
      percent: 82,
      color: 'from-[#52a86b] to-[#7ad192]',
      level: 'A',
    },
    {
      name: 'Turkiston Jadidchilik Harakati',
      percent: 74,
      color: 'from-amber-500 to-yellow-400',
      level: 'B+',
    },
    {
      name: 'Jahon Tarixi (Yangi & Eng Yangi davr)',
      percent: 79,
      color: 'from-sky-500 to-indigo-400',
      level: 'B+',
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header Banner */}
      <div className="bento-card p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#181c24] via-[#14171d] to-[#181c24] border border-[rgba(255,255,255,0.08)]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#2fb3a3]/15 text-[#5cc4b6] border border-[#2fb3a3]/25 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-[#5cc4b6]" />
              AI Analitika & Prognoz
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#f0f1f3] tracking-tight font-voice">
            Akademik O‘sish va Natijalar
          </h1>
          <p className="text-xs sm:text-sm text-[#a3a7ae] mt-1 max-w-xl">
            BBA va Milliy Sertifikat ehtimolligi, mavzular bo‘yicha o‘zlashtirish va kunlik faollik tahlili.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#2fb3a3]/15 to-[#52a86b]/10 border border-[#2fb3a3]/30 text-center shrink-0">
          <p className="text-[11px] font-bold text-[#5cc4b6] uppercase font-mono">
            DTB Kirish Ehtimoli
          </p>
          <p className="text-2xl font-black text-[#f0f1f3] font-mono mt-0.5">
            94.8% <span className="text-xs font-semibold text-[#7ad192]">(Grant)</span>
          </p>
        </div>
      </div>

      {/* 2. Key Metric Bento Grid (4 Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bento-card p-4 bg-[#14171d] space-y-1">
          <span className="text-[11px] text-[#8d9094] font-medium">Jami Testlar</span>
          <p className="text-xl font-bold text-[#f0f1f3] font-mono">148 ta</p>
          <span className="text-[10px] text-[#7ad192] font-semibold flex items-center gap-0.5">
            ↑ +12 bu hafta
          </span>
        </div>

        <div className="bento-card p-4 bg-[#14171d] space-y-1">
          <span className="text-[11px] text-[#8d9094] font-medium">O‘rtacha Aniqlik</span>
          <p className="text-xl font-bold text-[#5cc4b6] font-mono">86.4%</p>
          <span className="text-[10px] text-[#7ad192] font-semibold flex items-center gap-0.5">
            ↑ +4.2% o‘sish
          </span>
        </div>

        <div className="bento-card p-4 bg-[#14171d] space-y-1">
          <span className="text-[11px] text-[#8d9094] font-medium">Sarf Etilgan Vaqt</span>
          <p className="text-xl font-bold text-amber-400 font-mono">34.5 soat</p>
          <span className="text-[10px] text-[#8d9094]">O‘rtacha: 28 daq/kun</span>
        </div>

        <div className="bento-card p-4 bg-[#14171d] space-y-1">
          <span className="text-[11px] text-[#8d9094] font-medium">DTB Prognoz Ball</span>
          <p className="text-xl font-bold text-[#7ad192] font-mono">184.2 / 189</p>
          <span className="text-[10px] text-[#7ad192] font-semibold">ToshDavYur (Grant)</span>
        </div>
      </div>

      {/* 3. Main 2-Column: Activity Chart (7 cols) + Subject Mastery (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: 14 Days Activity Bar Chart (7 cols) */}
        <div className="lg:col-span-7 bento-card p-6 bg-[#14171d] space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#8d9094]">
                14 Kunlik Faollik Dinamikasi
              </h3>
              <p className="text-xs text-[#a3a7ae] mt-0.5">
                Kunlik yechilgan test savollari soni
              </p>
            </div>
            <span className="text-xs font-bold text-[#5cc4b6] font-mono">
              Jami: 114 test
            </span>
          </div>

          {/* Bar Visualizer */}
          <div className="flex items-end justify-between gap-1.5 h-44 pt-6 pb-2 border-b border-[rgba(255,255,255,0.06)]">
            {activity14Days.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 group">
                <span className="text-[9px] font-mono text-[#8d9094] opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.tests}
                </span>
                <div className="w-full bg-[#1a1e26] rounded-t-lg h-28 flex items-end overflow-hidden">
                  <div
                    style={{ height: `${item.height}%` }}
                    className="w-full rounded-t-lg bg-gradient-to-t from-[#2fb3a3] to-[#5cc4b6] group-hover:from-amber-400 group-hover:to-yellow-300 transition-all duration-300 shadow-sm"
                  />
                </div>
                <span className="text-[10px] font-mono text-[#8d9094]">
                  {item.day}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-[#8d9094]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#2fb3a3]" />
              Kunlik maqsad: 8+ test
            </span>
            <span>Uzluksizlik: 🔥 14 kun</span>
          </div>
        </div>

        {/* Right: Subject Mastery Progress Bars (5 cols) */}
        <div className="lg:col-span-5 bento-card p-6 bg-[#14171d] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8d9094]">
              Fanlar O‘zlashtirilishi
            </h3>
            <span className="text-[11px] text-[#5cc4b6] font-medium font-mono">
              4 ta modul
            </span>
          </div>

          <div className="space-y-4 pt-1">
            {subjectMastery.map((sub, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#f0f1f3] font-semibold truncate pr-2">
                    {sub.name}
                  </span>
                  <span className="text-[#5cc4b6] font-bold font-mono">
                    {sub.percent}% ({sub.level})
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-[#1e222c] overflow-hidden p-0.5">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${sub.color} transition-all duration-500`}
                    style={{ width: `${sub.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              soundFX.playClick();
              onNavigate('revision');
            }}
            className="w-full py-3 rounded-2xl bg-[rgba(255,255,255,0.04)] hover:bg-[#2fb3a3] hover:text-[#07090b] text-[#f0f1f3] text-xs font-bold flex items-center justify-center gap-2 border border-[rgba(255,255,255,0.08)] transition-all tactile-btn mt-3"
          >
            <span>Zaif Mavzular Ustida Ishlash</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
