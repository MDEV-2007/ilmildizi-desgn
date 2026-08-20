import React, { useState } from 'react';
import { History, ChevronLeft, ChevronRight, FileCheck2, ArrowRight } from 'lucide-react';
import { ScreenId } from '../../../types';

interface TestHistoryScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const TestHistoryScreen: React.FC<TestHistoryScreenProps> = ({
  onNavigate,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const historyItems = [
    {
      id: 'h1',
      title: 'Milliy Sertifikat: O\'zbekiston va Jahon Tarixi (Variant #4)',
      score: 86,
      date: '19-avgust 2026, 14:30',
      correct: 26,
      incorrect: 3,
      unanswered: 1,
    },
    {
      id: 'h2',
      title: 'BBA Tarix Diagnostika Test #12',
      score: 92,
      date: '17-avgust 2026, 10:15',
      correct: 28,
      incorrect: 2,
      unanswered: 0,
    },
    {
      id: 'h3',
      title: 'Temuriylar Davri Maxsus Test',
      score: 74,
      date: '15-avgust 2026, 18:00',
      correct: 18,
      incorrect: 6,
      unanswered: 1,
    },
    {
      id: 'h4',
      title: 'Qadimgi Dunyo Tarixi & Baqtriya Imtihoni',
      score: 88,
      date: '12-avgust 2026, 16:45',
      correct: 22,
      incorrect: 3,
      unanswered: 0,
    },
    {
      id: 'h5',
      title: 'Xonliklar davri ma\'muriy va harbiy tuzilishi',
      score: 68,
      date: '08-avgust 2026, 11:20',
      correct: 14,
      incorrect: 5,
      unanswered: 1,
    },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-[#e9eaeb] flex items-center gap-2.5">
          <History className="w-6 h-6 text-[#5cc4b6]" />
          <span>Topshirilgan Testlar Tarixi</span>
        </h1>
        <p className="text-xs text-[#8d9094] mt-0.5">
          Barcha topshirilgan imtihonlaringiz va ularning to'liq tahliliy hisoboti
        </p>
      </div>

      {/* History List */}
      <div className="space-y-3">
        {historyItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onNavigate('test_feedback')}
            className="glass-card p-5 rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[#202226] hover:border-[#2fb3a3]/40 transition-all cursor-pointer group flex items-center justify-between gap-4"
          >
            <div className="min-w-0 space-y-1">
              <h3 className="text-sm font-bold text-[#e9eaeb] group-hover:text-[#5cc4b6] transition-colors truncate">
                {item.title}
              </h3>
              <p className="text-xs text-[#8d9094]">
                {item.date} · <span className="text-[#93bf96]">{item.correct} to'g'ri</span>, <span className="text-[#dd8781]">{item.incorrect} xato</span>, <span className="text-[#8d9094]">{item.unanswered} javobsiz</span>
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span
                className={`text-base font-black px-3 py-1 rounded-xl ${
                  item.score >= 80
                    ? 'bg-[#6b9b6f]/20 text-[#93bf96]'
                    : item.score >= 50
                    ? 'bg-amber-500/20 text-amber-300'
                    : 'bg-rose-500/20 text-rose-300'
                }`}
              >
                {item.score}%
              </span>
              <ArrowRight className="w-4 h-4 text-[#8d9094] group-hover:text-[#5cc4b6] transition-colors" />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-xl bg-[#202226] text-xs font-semibold text-[#b7b9bc] border border-[rgba(255,255,255,0.08)] disabled:opacity-40 flex items-center gap-1"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Oldingi</span>
        </button>

        <span className="text-xs text-[#8d9094] font-medium">
          Sahifa 1 dan 3 gacha
        </span>

        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-4 py-2 rounded-xl bg-[#202226] text-xs font-semibold text-[#b7b9bc] border border-[rgba(255,255,255,0.08)] flex items-center gap-1"
        >
          <span>Keyingi</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
