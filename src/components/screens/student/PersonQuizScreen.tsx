import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, Sparkles, ArrowRight } from 'lucide-react';
import { ScreenId } from '../../../types';
import confetti from 'canvas-confetti';

interface PersonQuizScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onEarnRewards: (xp: number, coins: number) => void;
}

export const PersonQuizScreen: React.FC<PersonQuizScreenProps> = ({
  onNavigate,
  onEarnRewards,
}) => {
  const [guess, setGuess] = useState('');
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const quiz = {
    title: 'Sirli Tarixiy Shaxsni Toping',
    clues: [
      '1. 1875-yilda Samarqand yaqinidagi Baxshitepa qishlog\'ida tavallud topgan.',
      '2. 1911-yilda Turkistonda birinchi bo\'lib "Padarkush" milliy dramasini yozgan.',
      '3. 1913-yilda "Samarqand" gazetasi va "Oyna" jurnaliga asos solgan jadidchilik yetakchisi.',
    ],
    correctNames: ['mahmudxo\'ja behbudiy', 'behbudiy', 'mahmudxoja behbudiy', 'mahmudhoja behbudiy'],
    personFull: 'Mahmudxo\'ja Behbudiy (1875–1919)',
    desc: 'Turkiston jadidchilik harakatining otasi, dramaturg, publitsist va ma\'rifatparvar olim.',
  };

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guess.trim() || checked) return;

    const normalized = guess.trim().toLowerCase();
    const match = quiz.correctNames.some((n) => normalized.includes(n) || n.includes(normalized));

    setChecked(true);
    setIsCorrect(match);

    if (match) {
      confetti({ particleCount: 75, spread: 60, origin: { y: 0.6 } });
      onEarnRewards(90, 25);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#e9eaeb] flex items-center gap-2.5">
            <HelpCircle className="w-6 h-6 text-amber-400" />
            <span>Tarixiy Shaxsni Toping</span>
          </h1>
          <p className="text-xs text-[#8d9094] mt-0.5">
            3 ta sirli maslahat (clue) orqali buyuk ajdodimizni aniqlang
          </p>
        </div>

        <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20 self-start">
          Mukofot: +90 XP · +25 🪙
        </span>
      </div>

      <div className="glass-card p-6 sm:p-7 rounded-3xl border border-[rgba(255,255,255,0.09)] bg-[#202226] space-y-5">
        <h2 className="text-base font-bold text-[#e9eaeb]">
          Kim bu tarixiy shaxs?
        </h2>

        {/* 3 Numbered Clues */}
        <div className="space-y-2.5">
          {quiz.clues.map((clue, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-[#25272b] border border-[rgba(255,255,255,0.06)] text-xs text-[#e9eaeb] leading-relaxed flex items-start gap-2.5"
            >
              <span className="w-5 h-5 rounded-md bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span>{clue.substring(3)}</span>
            </div>
          ))}
        </div>

        {/* Input Form */}
        {!checked ? (
          <form onSubmit={handleCheck} className="flex gap-2 pt-2">
            <input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Tarixiy shaxs ismini yozing (masalan: Behbudiy)..."
              className="flex-1 px-4 py-3 rounded-2xl bg-[#25272b] border border-[rgba(255,255,255,0.08)] text-xs text-[#e9eaeb] placeholder-[#8d9094] focus:outline-none focus:border-[#2fb3a3]"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-2xl bg-[#2fb3a3] hover:bg-[#269488] text-[#0d1416] text-xs font-bold shrink-0 transition-all shadow-md shadow-[#2fb3a3]/20"
            >
              Tekshirish
            </button>
          </form>
        ) : (
          <div className="space-y-3 pt-2">
            <div
              className={`p-4 rounded-2xl text-xs ${
                isCorrect
                  ? 'bg-[#6b9b6f]/20 border border-[#6b9b6f] text-[#93bf96]'
                  : 'bg-rose-500/20 border border-rose-500 text-rose-300'
              }`}
            >
              <p className="font-bold text-sm mb-1">
                {isCorrect ? '✓ Barakalla, to\'g\'ri topdingiz!' : '✕ Afsus, noto\'g\'ri.'}
              </p>
              <p className="text-[#e9eaeb] font-semibold">
                To'g'ri javob: <strong>{quiz.personFull}</strong>
              </p>
              <p className="text-[#8d9094] text-xs mt-1">
                {quiz.desc}
              </p>
            </div>

            <button
              onClick={() => {
                setGuess('');
                setChecked(false);
              }}
              className="w-full py-3 rounded-xl bg-[#2fb3a3] text-[#0d1416] text-xs font-bold"
            >
              Keyingi shaxsni topish
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
