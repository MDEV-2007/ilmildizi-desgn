import React, { useState } from 'react';
import { MapPin, CheckCircle2, XCircle, RotateCcw, Award } from 'lucide-react';
import { ScreenId } from '../../../types';
import confetti from 'canvas-confetti';

interface MapChallengeScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onEarnRewards: (xp: number, coins: number) => void;
}

export const MapChallengeScreen: React.FC<MapChallengeScreenProps> = ({
  onNavigate,
  onEarnRewards,
}) => {
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const challenge = {
    title: 'Qadimgi Ipak Yo\'li va So\'g\'diyona Shaharlari',
    desc: 'Xaritada ko\'rsatilgan Zarafshon vohasining markaziy qadimiy poytaxti — Afrosiyob (Samarqand) qaysi raqam ostida belgilangan?',
    mapUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80',
    options: [
      '1-raqam (Buxoro vohasi / Poykand)',
      '2-raqam (Afrosiyob / Samarqand)',
      '3-raqam (Chach / Toshkent)',
      '4-raqam (Ershi / Farg\'ona vodiysi)',
    ],
    correct: 1,
    explanation: 'Afrosiyob (qadimgi Samarqand) Zarafshon vodiysining o\'rta oqimida joylashgan bo\'lib, So\'g\'diyona davlatining asosiy iqtisodiy va madaniy markazi hisoblangan.',
  };

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelectedOpt(idx);
    setAnswered(true);

    if (idx === challenge.correct) {
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
      onEarnRewards(75, 15);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#e9eaeb] flex items-center gap-2.5">
            <MapPin className="w-6 h-6 text-emerald-400" />
            <span>Tarixiy Xarita Challenge</span>
          </h1>
          <p className="text-xs text-[#8d9094] mt-0.5">
            Xarita orqali qadimiy davlatlar va poytaxtlarni aniqlang
          </p>
        </div>

        <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 self-start">
          Mukofot: +75 XP · +15 🪙
        </span>
      </div>

      <div className="glass-card p-6 rounded-3xl border border-[rgba(255,255,255,0.09)] bg-[#202226] space-y-4">
        <h2 className="text-base font-bold text-[#e9eaeb]">
          {challenge.title}
        </h2>
        <p className="text-xs text-[#b7b9bc] leading-relaxed">
          {challenge.desc}
        </p>

        {/* Map Image */}
        <div className="relative rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.08)] bg-black/40">
          <img
            src={challenge.mapUrl}
            alt="Tarixiy xarita"
            className="w-full max-h-64 object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-bold text-[#5cc4b6]">
            🗺️ Movarounnahr va Xuroson xaritasi
          </div>
        </div>

        {/* 2-Column Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
          {challenge.options.map((opt, idx) => {
            const isCorrect = idx === challenge.correct;
            const isSelected = selectedOpt === idx;

            let btnClass = 'bg-[#25272b] border border-[rgba(255,255,255,0.06)] text-[#b7b9bc] hover:border-[rgba(255,255,255,0.15)]';
            if (answered) {
              if (isCorrect) btnClass = 'bg-[#6b9b6f]/20 border-2 border-[#6b9b6f] text-[#93bf96] font-bold';
              else if (isSelected && !isCorrect) btnClass = 'bg-rose-500/20 border-2 border-rose-500 text-rose-300 font-bold';
              else btnClass = 'bg-[#25272b]/50 text-[#5a5d63] opacity-60';
            }

            return (
              <button
                key={idx}
                disabled={answered}
                onClick={() => handleSelect(idx)}
                className={`p-3.5 rounded-2xl text-left text-xs font-medium transition-all ${btnClass}`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {/* Answer Reveal */}
        {answered && (
          <div className="p-4 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] space-y-2 pt-3">
            <p className="text-xs font-bold text-[#e9eaeb]">
              {selectedOpt === challenge.correct
                ? '✓ To\'g\'ri javob! (+75 XP berildi)'
                : '✕ Noto\'g\'ri javob.'}
            </p>
            <p className="text-xs text-[#8d9094] leading-relaxed">
              {challenge.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
