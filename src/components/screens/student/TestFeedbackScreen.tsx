import React from 'react';
import {
  Award,
  Crown,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Compass,
  Lightbulb,
} from 'lucide-react';
import { MOCK_TEST_ATTEMPTS, MOCK_QUESTIONS } from '../../../data/mockData';
import { ScreenId } from '../../../types';
import { Badge } from '../../ui/Badge';

interface TestFeedbackScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const TestFeedbackScreen: React.FC<TestFeedbackScreenProps> = ({
  onNavigate,
}) => {
  const attempt = MOCK_TEST_ATTEMPTS[0];

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      {/* 1. Top Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => onNavigate('tests')}
          className="px-3.5 py-2 rounded-xl bg-[#202226] text-[#b7b9bc] hover:text-[#e9eaeb] text-xs font-semibold border border-[rgba(255,255,255,0.08)] flex items-center gap-1.5"
        >
          <span>← Testlar ro'yxati</span>
        </button>

        <button
          onClick={() => onNavigate('revision')}
          className="px-4 py-2 rounded-xl bg-[#c9645c]/20 hover:bg-[#c9645c]/30 text-[#dd8781] text-xs font-bold flex items-center gap-1.5 border border-[#c9645c]/30 shadow-sm"
        >
          <RotateCcw className="w-4 h-4" />
          <span>🎯 Xatolar ustida ishlash</span>
        </button>
      </div>

      {/* 2. Ball Karta (Score Card) */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-[rgba(255,255,255,0.09)] bg-gradient-to-b from-[#25272b] to-[#1c1e21] text-center flex flex-col items-center relative overflow-hidden">
        <div className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-[#2fb3a3] via-[#5cc4b6] to-[#6b9b6f] bg-clip-text text-transparent mb-1">
          {attempt.scorePercentage}%
        </div>
        <p className="text-sm font-bold text-[#e9eaeb] mb-2">
          {attempt.testTitle}
        </p>
        <p className="text-xs text-[#8d9094]">
          {attempt.correctCount} to'g'ri · {attempt.incorrectCount} xato · {attempt.unansweredCount} javobsiz · ⚡ +{attempt.xpEarned} XP
        </p>

        {attempt.predictedCertificateLevel && (
          <div className="mt-4 px-4 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold flex items-center gap-2">
            <Crown className="w-4 h-4 text-amber-400" />
            <span>Prognoz Sertifikat: {attempt.predictedCertificateLevel}</span>
          </div>
        )}
      </div>

      {/* 3. AI Xulosa Karta (AI Summary) */}
      <div className="glass-card p-5 sm:p-6 rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[#202226] space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#5cc4b6]">
          <Sparkles className="w-4 h-4 text-[#2fb3a3]" />
          <span>Sun'iy Intellekt Tahlili & Tavsiyasi</span>
        </div>
        <p className="text-xs sm:text-sm text-[#e9eaeb] leading-relaxed">
          {attempt.aiSummary}
        </p>
        <div className="p-3 rounded-2xl bg-[rgba(255,255,255,0.03)] border-l-4 border-l-[#2fb3a3] text-xs text-[#b7b9bc] italic">
          {attempt.motivationalQuote}
        </div>
      </div>

      {/* 4. 2-Column Grid: Kuchli & Kuchsiz Mavzular */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="glass-card p-4 sm:p-5 rounded-2xl border border-[#6b9b6f]/20 bg-[#6b9b6f]/5">
          <h3 className="text-xs font-bold text-[#93bf96] mb-2 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>👍 Kuchli mavzular</span>
          </h3>
          <div className="space-y-1.5">
            {attempt.strongTopics.map((st, i) => (
              <div key={i} className="text-xs text-[#e9eaeb] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6b9b6f]"></span>
                <span>{st}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-4 sm:p-5 rounded-2xl border border-[#c9645c]/20 bg-[#c9645c]/5">
          <h3 className="text-xs font-bold text-[#dd8781] mb-2 flex items-center gap-1.5">
            <XCircle className="w-4 h-4" />
            <span>⚠️ Kuchsiz mavzular</span>
          </h3>
          <div className="space-y-1.5">
            {attempt.weakTopics.map((wt, i) => (
              <div key={i} className="text-xs text-[#e9eaeb] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c9645c]"></span>
                <span>{wt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. "Aynan qayerda xato qildingiz" (Deep Mistake Breakdown) */}
      <div className="glass-card p-5 sm:p-6 rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[#202226] space-y-4">
        <h3 className="text-sm font-bold text-[#e9eaeb] flex items-center gap-2">
          <XCircle className="w-4 h-4 text-[#c9645c]" />
          <span>Aynan qayerda xato qildingiz?</span>
        </h3>

        {/* Mistake Card */}
        <div className="p-4 rounded-2xl bg-[#1c1e21] border border-[rgba(255,255,255,0.06)] space-y-3">
          <div className="flex items-center justify-between">
            <Badge variant="accent" size="sm">
              XONLIKLAR DAVRI
            </Badge>
            <span className="text-[10px] text-rose-400 font-bold">Xato javob</span>
          </div>

          <p className="text-xs sm:text-sm font-bold text-[#e9eaeb]">
            Buxoro amirligi soliq turlari va ularning mazmuni bo'yicha qaysi qatorda ma'lumot xato juftlangan?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs">
              <span className="text-[10px] uppercase font-bold text-rose-400 block mb-1">
                Sizning javobingiz:
              </span>
              <p className="text-[#dd8781] font-semibold">
                Tanobona to'g'risidagi ma'lumot (xato tanlov)
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-[#6b9b6f]/10 border border-[#6b9b6f]/20 text-xs">
              <span className="text-[10px] uppercase font-bold text-[#93bf96] block mb-1">
                To'g'ri javob:
              </span>
              <p className="text-[#93bf96] font-semibold">
                Jizya to'g'risidagi ma'lumot (musulmon emas, g'ayrimusulmon)
              </p>
            </div>
          </div>

          <p className="text-xs text-[#8d9094] leading-relaxed pt-1">
            <strong>Izoh:</strong> Jizya — musulmon davlatlarida g'ayridin (g'ayrimusulmon) aholidan jon boshiga olinadigan soliq bo'lgan, musulmonlardan emas.
          </p>

          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center gap-2 italic">
            <Lightbulb className="w-4 h-4 shrink-0 text-amber-400" />
            <span>Eslab qoling: Jizya = faqat g'ayrimusulmon erkaklardan himoya evaziga olingan soliq.</span>
          </div>
        </div>
      </div>

      {/* 6. "Tavsiya etilgan amallar" */}
      <div className="glass-card p-5 rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[#202226]">
        <h3 className="text-sm font-bold text-[#e9eaeb] mb-3">
          Tavsiya etilgan amallar
        </h3>
        <div className="space-y-2">
          {attempt.recommendations.map((rec, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs text-[#e9eaeb]">
              <span className="text-[#5cc4b6] font-bold text-sm leading-none mt-0.5">›</span>
              <span>{rec}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 7. "Bosqichma-bosqich yo'l xaritasi" */}
      <div className="glass-card p-5 rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[#202226]">
        <h3 className="text-sm font-bold text-[#e9eaeb] mb-3 flex items-center gap-2">
          <Compass className="w-4 h-4 text-[#5cc4b6]" />
          <span>Bosqichma-bosqich yo'l xaritasi</span>
        </h3>
        <div className="space-y-2.5">
          {attempt.roadmap.map((step) => (
            <div
              key={step.step}
              className="p-3 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-[#2fb3a3]/20 text-[#5cc4b6] text-xs font-bold flex items-center justify-center shrink-0">
                  {step.step}
                </span>
                <span className="text-xs font-semibold text-[#e9eaeb]">
                  {step.title}
                </span>
              </div>
              <Badge variant="neutral" size="sm">
                {step.duration}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
