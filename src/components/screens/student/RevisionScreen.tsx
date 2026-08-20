import React, { useState } from 'react';
import {
  RotateCcw,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Lightbulb,
  Sparkles,
  Layers,
  HelpCircle,
  Clock,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { ScreenId } from '../../../types';
import { Badge } from '../../ui/Badge';
import { soundFX } from '../../../utils/soundFX';
import confetti from 'canvas-confetti';

interface RevisionScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const RevisionScreen: React.FC<RevisionScreenProps> = ({
  onNavigate,
}) => {
  const [activeSubject, setActiveSubject] = useState('O‘zbekiston Tarixi');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [solvedMistakes, setSolvedMistakes] = useState(38);

  const subjects = ['O‘zbekiston Tarixi', 'Jahon Tarixi', 'Barcha xatolar'];

  const question = {
    id: 'rev_q1',
    topic: 'XONLIKLAR DAVRI (Buxoro Amirligi)',
    mistakeCount: 2,
    lastWrongDate: 'Kecha, 18:20',
    questionText: 'Buxoro amirligi moliya tizimida "Xiroj" solig‘i qanday tartibda undirilgan?',
    options: [
      'Chorva mollaridan 1/40 ulushda (Zakot)',
      'Hosilning 1/5 dan 1/3 qismigacha bo‘lgan asosiy yer solig‘i',
      'Musulmon bo‘lmagan aholidan jon boshiga olinadigan soliq (Jizya)',
      'Faqat shahar hunarmandlaridan olinadigan to‘lov',
    ],
    correctAnswer: 1,
    explanation:
      'Xiroj — dehqonchilik mahsulotlaridan olinadigan asosiy yer solig‘i bo‘lib, sug‘orish sharoiti va hosil miqdoriga qarab hosilning 1/5 dan 1/3 qismigacha belgilangan.',
    tip: '💡 Eslab qolish mnemonikasi: Xiroj = Hosil (X & H mosligi). Zakot = Chorva va boylik.',
  };

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === question.correctAnswer) {
      soundFX.playCorrect();
      setSolvedMistakes((prev) => prev + 1);
      try {
        confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
      } catch {}
    } else {
      soundFX.playIncorrect();
    }
  };

  const handleNextQuestion = () => {
    soundFX.playClick();
    setSelectedOption(null);
    setIsAnswered(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* 1. Header Banner */}
      <div className="bento-card p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#1b1517] via-[#14171d] to-[#181c24] border-rose-500/20">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/25 flex items-center gap-1">
              <RotateCcw className="w-3 h-3 text-rose-400" />
              Spaced Repetition
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#f0f1f3] tracking-tight font-voice">
            Xatolar Ustida Ishlash
          </h1>
          <p className="text-xs sm:text-sm text-[#a3a7ae] mt-1 max-w-xl">
            Duolingo va Anki algoritmi: imtihonlarda adashgan savollaringizni to‘liq o‘zlashtirmaguningizcha takrorlash tizimi.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#14171d] border border-[rgba(255,255,255,0.08)] self-start sm:self-auto text-xs space-y-1 font-mono shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
            <span className="text-[#a3a7ae]">Faol xatolar:</span>
            <strong className="text-rose-400">14 ta</strong>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#52a86b]" />
            <span className="text-[#a3a7ae]">Tuzatilgan:</span>
            <strong className="text-[#7ad192]">{solvedMistakes} ta</strong>
          </div>
        </div>
      </div>

      {/* 2. Subject Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {subjects.map((s) => (
          <button
            key={s}
            onClick={() => {
              soundFX.playClick();
              setActiveSubject(s);
            }}
            className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all tactile-btn ${
              activeSubject === s
                ? 'bg-[#2fb3a3] text-[#07090b] shadow-md shadow-[#2fb3a3]/20 font-bold'
                : 'bento-card bg-[#14171d] text-[#8d9094] hover:text-[#f0f1f3]'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* 3. Interactive Mistake Question Card */}
      <div className="bento-card p-6 sm:p-7 bg-[#14171d] border border-[rgba(255,255,255,0.08)] space-y-5">
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-[rgba(255,255,255,0.06)]">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 font-mono">
              {question.topic}
            </span>
            <span className="text-[11px] text-rose-400 font-mono flex items-center gap-1">
              ⚠️ {question.mistakeCount} marta xato qilingan
            </span>
          </div>

          <span className="text-[11px] text-[#8d9094] font-mono">
            Oxirgi xato: {question.lastWrongDate}
          </span>
        </div>

        <h2 className="text-base sm:text-lg font-bold text-[#f0f1f3] leading-relaxed font-voice">
          {question.questionText}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === question.correctAnswer;

            let btnStyle =
              'bg-[#1a1e26] border border-[rgba(255,255,255,0.07)] text-[#a3a7ae] hover:border-[rgba(255,255,255,0.18)] hover:text-[#f0f1f3]';

            if (isAnswered) {
              if (isCorrect) {
                btnStyle =
                  'bg-[#52a86b]/20 border-2 border-[#52a86b] text-[#7ad192] font-semibold';
              } else if (isSelected && !isCorrect) {
                btnStyle =
                  'bg-rose-500/20 border-2 border-rose-500 text-rose-300 font-semibold';
              } else {
                btnStyle = 'bg-[#1a1e26]/50 text-[#4b4f57] opacity-60';
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelect(idx)}
                className={`w-full p-4 rounded-2xl text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-3 tactile-btn ${btnStyle}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-6 h-6 rounded-xl bg-[rgba(255,255,255,0.05)] text-[11px] font-mono font-bold flex items-center justify-center shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-snug">{opt}</span>
                </div>

                {isAnswered && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-[#7ad192] shrink-0" />
                )}
                {isAnswered && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Answer Explanation & Memory Tip */}
        {isAnswered && (
          <div className="pt-4 space-y-3 animate-fadeIn">
            <div className="p-4 rounded-2xl bg-[#52a86b]/10 border border-[#52a86b]/25 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#7ad192]">
                <CheckCircle2 className="w-4 h-4" />
                <span>To‘liq Ilmiy Tushuntirish:</span>
              </div>
              <p className="text-xs text-[#a3a7ae] leading-relaxed">
                {question.explanation}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-2.5 text-xs text-amber-300">
              <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{question.tip}</span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-[#8d9094]">
                Ushbu savol 3 kundan keyin yana takrorlanadi.
              </span>
              <button
                onClick={handleNextQuestion}
                className="px-6 py-3 rounded-2xl bg-[#2fb3a3] hover:bg-[#269488] text-[#07090b] text-xs font-bold flex items-center gap-2 shadow-md shadow-[#2fb3a3]/20 tactile-btn"
              >
                <span>Keyingi Xatoga O‘tish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
