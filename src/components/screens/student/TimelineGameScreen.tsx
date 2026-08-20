import React, { useState } from 'react';
import {
  History,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  RotateCcw,
  Award,
  Sparkles,
  ArrowRight,
  Info,
  Trophy,
} from 'lucide-react';
import { ScreenId } from '../../../types';
import confetti from 'canvas-confetti';
import { soundFX } from '../../../utils/soundFX';

interface TimelineGameScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onEarnRewards: (xp: number, coins: number) => void;
}

export const TimelineGameScreen: React.FC<TimelineGameScreenProps> = ({
  onNavigate,
  onEarnRewards,
}) => {
  const initialEvents = [
    { id: 'e1', text: 'Amir Temurning Hindiston (Dehli) yurishi', year: 1398 },
    {
      id: 'e2',
      text: 'Balx qurultoyi va Temurning Movarounnahr oliy hukmdori deb e’lon qilinishi',
      year: 1370,
    },
    {
      id: 'e3',
      text: 'Anqara jangi (Amir Temur va Boyazid Yildirim to‘qnashuvi)',
      year: 1402,
    },
    {
      id: 'e4',
      text: 'Amir Temurning Oltin O‘rda xoni To‘xtamish ustidan Qunduzcha g‘alabasi',
      year: 1391,
    },
  ];

  const [items, setItems] = useState(initialEvents);
  const [checked, setChecked] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (checked) return;
    soundFX.playClick();
    const newItems = [...items];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;

    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;
    setItems(newItems);
  };

  const handleCheck = () => {
    const correct = items.every(
      (val, i, arr) => !i || arr[i - 1].year <= val.year
    );
    setChecked(true);
    setIsSuccess(correct);

    if (correct) {
      soundFX.playFanfare();
      try {
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      } catch {}
      onEarnRewards(80, 20);
    } else {
      soundFX.playIncorrect();
    }
  };

  const handleReset = () => {
    soundFX.playClick();
    setItems([...initialEvents].sort(() => Math.random() - 0.5));
    setChecked(false);
    setIsSuccess(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bento-card p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#141d24] via-[#14171d] to-[#181c24] border-sky-500/20">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sky-500/15 text-sky-300 border border-sky-500/25 flex items-center gap-1">
              <History className="w-3 h-3 text-sky-400" />
              Xronologik Ketma-ketlik
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#f0f1f3] tracking-tight font-voice">
            Tarixiy Voqealar Zanjiri
          </h1>
          <p className="text-xs sm:text-sm text-[#a3a7ae] mt-1">
            Voqealarni eng qadimgisidan boshlab to‘g‘ri xronologik tartibda (yuqoridan pastga) joylashtiring.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-amber-400 font-bold bg-[#14171d] px-3.5 py-2 rounded-2xl border border-[rgba(255,255,255,0.08)] self-start sm:self-auto">
          <span>Mukofot: +80 XP · 🪙 20</span>
        </div>
      </div>

      {/* Interactive Timeline List */}
      <div className="space-y-3">
        {items.map((ev, idx) => {
          let cardBorder = 'border-[rgba(255,255,255,0.08)]';
          if (checked) {
            const isCorrectPosition =
              idx === 0
                ? ev.year === 1370
                : idx === 1
                ? ev.year === 1391
                : idx === 2
                ? ev.year === 1398
                : ev.year === 1402;
            cardBorder = isCorrectPosition
              ? 'border-[#52a86b] bg-[#52a86b]/10'
              : 'border-rose-500 bg-rose-500/10';
          }

          return (
            <div
              key={ev.id}
              className={`bento-card p-4 sm:p-5 flex items-center justify-between gap-4 transition-all bg-[#14171d] ${cardBorder}`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <span className="w-8 h-8 rounded-2xl bg-[#1a1e26] border border-[rgba(255,255,255,0.08)] text-xs font-mono font-bold text-[#5cc4b6] flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>

                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-semibold text-[#f0f1f3] leading-snug">
                    {ev.text}
                  </p>
                  {checked && (
                    <p className="text-xs font-bold text-[#5cc4b6] mt-1 font-mono">
                      📅 {ev.year}-yil
                    </p>
                  )}
                </div>
              </div>

              {!checked && (
                <div className="flex flex-col gap-1 shrink-0">
                  <button
                    disabled={idx === 0}
                    onClick={() => moveItem(idx, 'up')}
                    className="p-2 rounded-xl bg-[#1a1e26] text-[#8d9094] hover:text-[#f0f1f3] disabled:opacity-30 disabled:hover:text-[#8d9094] transition-all tactile-btn"
                    title="Yuqoriga surish"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    disabled={idx === items.length - 1}
                    onClick={() => moveItem(idx, 'down')}
                    className="p-2 rounded-xl bg-[#1a1e26] text-[#8d9094] hover:text-[#f0f1f3] disabled:opacity-30 disabled:hover:text-[#8d9094] transition-all tactile-btn"
                    title="Pastga surish"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-2">
        {!checked ? (
          <button
            onClick={handleCheck}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#2fb3a3] to-[#269488] hover:from-[#269488] hover:to-[#1e7a70] text-[#07090b] text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#2fb3a3]/25 tactile-btn"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Ketma-ketlikni Tekshirish</span>
          </button>
        ) : (
          <div className="w-full space-y-4">
            <div
              className={`p-4 rounded-2xl border text-center text-xs font-semibold ${
                isSuccess
                  ? 'bg-[#52a86b]/15 border-[#52a86b]/30 text-[#7ad192]'
                  : 'bg-rose-500/15 border-rose-500/30 text-rose-300'
              }`}
            >
              {isSuccess
                ? '🎉 Barakalla! Tarixiy sanalar xronologiyasi 100% to‘g‘ri joylashtirildi!'
                : '❌ Ketma-ketlikda xatolik bor. Yillar ko‘rsatildi, qayta urinib ko‘ring!'}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleReset}
                className="flex-1 py-3.5 rounded-2xl bg-[#1a1e26] hover:bg-[#202530] text-[#f0f1f3] text-xs font-bold flex items-center justify-center gap-2 border border-[rgba(255,255,255,0.08)] tactile-btn"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Qayta O‘ynash</span>
              </button>
              <button
                onClick={() => {
                  soundFX.playClick();
                  onNavigate('dashboard');
                }}
                className="px-6 py-3.5 rounded-2xl bg-[#2fb3a3] text-[#07090b] text-xs font-bold tactile-btn"
              >
                Bosh sahifa
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
