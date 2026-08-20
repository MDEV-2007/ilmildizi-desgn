import React, { useState, useEffect, useRef } from 'react';
import {
  Clock,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Volume2,
  VolumeX,
  ZoomIn,
  ZoomOut,
  X,
  Maximize2,
  Sparkles,
  BookOpen,
  Bookmark,
  Scroll,
  Layers,
  Pause,
  Play,
  RotateCcw,
  SlidersHorizontal,
  Flame,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Question, ScreenId } from '../../../types';
import { MOCK_QUESTIONS } from '../../../data/mockData';
import { Badge } from '../../ui/Badge';
import { soundFX } from '../../../utils/soundFX';

interface ActiveTestScreenProps {
  onFinishTest: (answers: Record<string, any>) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const ActiveTestScreen: React.FC<ActiveTestScreenProps> = ({
  onFinishTest,
  onNavigate,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3540); // 59 mins
  const [isPaused, setIsPaused] = useState(false);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [showExitModal, setShowExitModal] = useState(false);
  const [showQuestionsDrawer, setShowQuestionsDrawer] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [zoomScale, setZoomScale] = useState(1);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<number[]>([]);
  const [comboCount, setComboCount] = useState(3);

  // Touch swipe support for mobile
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const [answers, setAnswers] = useState<Record<string, any>>({
    q1: 1,
    q2: 0,
    q3: 2,
    q4: { 0: 'Bityan shahri', 1: 'Ershi shahri', 2: 'Tuproqqal\'a / Kazalikir', 3: 'Dalvarzintepa / Peshovar' },
    q5: { sq1: 1, sq2: 0 },
    q6: { a: '"Samarqand" gazetasi va "Oyna" jurnali', b: '"Adibi avval"' },
  });

  // Countdown timer
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const currentQ = MOCK_QUESTIONS[currentIdx];

  // Hotkey keyboard listener (A/B/C/D, 1/2/3/4, Arrow keys, Enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when typing in a textarea or input
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      const key = e.key.toLowerCase();

      if (key === 'a' || key === '1') {
        if (currentQ.options && currentQ.options.length > 0) {
          handleSelectOption(0);
        }
      } else if (key === 'b' || key === '2') {
        if (currentQ.options && currentQ.options.length > 1) {
          handleSelectOption(1);
        }
      } else if (key === 'c' || key === '3') {
        if (currentQ.options && currentQ.options.length > 2) {
          handleSelectOption(2);
        }
      } else if (key === 'd' || key === '4') {
        if (currentQ.options && currentQ.options.length > 3) {
          handleSelectOption(3);
        }
      } else if (e.key === 'ArrowRight' || (e.key === 'Enter' && !e.shiftKey)) {
        if (currentIdx < MOCK_QUESTIONS.length - 1) {
          setCurrentIdx((prev) => prev + 1);
          soundFX.playClick();
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentIdx > 0) {
          setCurrentIdx((prev) => prev - 1);
          soundFX.playClick();
        }
      } else if (key === 'm') {
        toggleBookmark(currentIdx);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIdx, currentQ]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(answers).length;

  const handleSelectOption = (optIdx: number) => {
    soundFX.playSelect();
    setAnswers((prev) => ({ ...prev, [currentQ.id]: optIdx }));
  };

  const handleMatchingChange = (pairIdx: number, val: string) => {
    soundFX.playClick();
    const currentPairAnswers = answers[currentQ.id] || {};
    setAnswers({
      ...answers,
      [currentQ.id]: { ...currentPairAnswers, [pairIdx]: val },
    });
  };

  const handleGroupedChange = (subId: string, optIdx: number) => {
    soundFX.playSelect();
    const currentGroup = answers[currentQ.id] || {};
    setAnswers({
      ...answers,
      [currentQ.id]: { ...currentGroup, [subId]: optIdx },
    });
  };

  const handleWrittenChange = (key: string, val: string) => {
    const currentWritten = answers[currentQ.id] || {};
    setAnswers({
      ...answers,
      [currentQ.id]: { ...currentWritten, [key]: val },
    });
  };

  const toggleBookmark = (idx: number) => {
    soundFX.playClick();
    if (bookmarkedQuestions.includes(idx)) {
      setBookmarkedQuestions(bookmarkedQuestions.filter((i) => i !== idx));
    } else {
      setBookmarkedQuestions([...bookmarkedQuestions, idx]);
    }
  };

  const handleTriggerFinish = () => {
    soundFX.playCorrect();
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // Confetti fallback
    }
    onFinishTest(answers);
  };

  // Swipe handlers for ergonomic touch navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 55;

    if (distance > minSwipeDistance) {
      // Swiped Left -> Next Question
      if (currentIdx < MOCK_QUESTIONS.length - 1) {
        setCurrentIdx((prev) => prev + 1);
      }
    } else if (distance < -minSwipeDistance) {
      // Swiped Right -> Previous Question
      if (currentIdx > 0) {
        setCurrentIdx((prev) => prev - 1);
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const fontSizeClasses = {
    sm: 'text-sm leading-relaxed',
    base: 'text-base leading-relaxed sm:text-lg sm:leading-8',
    lg: 'text-lg leading-loose sm:text-xl sm:leading-9',
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="min-h-screen flex flex-col justify-between max-w-4xl mx-auto space-y-5 pb-24 sm:pb-12"
    >
      {/* 1. ZEN MODE TOP CONTROL BAR */}
      <div className="sticky top-2 z-20 glass-card p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl border border-[rgba(255,255,255,0.09)] bg-[#1c1e21]/95 backdrop-blur-xl shadow-lg flex items-center justify-between gap-3">
        {/* Left: Exit & Question Index */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowExitModal(true)}
            className="p-2 rounded-xl bg-[rgba(255,255,255,0.05)] hover:bg-rose-500/20 text-[#8d9094] hover:text-rose-300 transition-colors"
            title="Imtihondan chiqish"
          >
            <X className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowQuestionsDrawer(!showQuestionsDrawer)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.06)] text-xs font-bold text-[#e9eaeb] transition-all"
          >
            <Layers className="w-3.5 h-3.5 text-[#5cc4b6]" />
            <span>
              Savol <span className="tabular-nums font-mono text-[#5cc4b6]">{currentIdx + 1}</span> / {MOCK_QUESTIONS.length}
            </span>
          </button>

          {/* Bookmark Toggle */}
          <button
            onClick={() => toggleBookmark(currentIdx)}
            className={`p-2 rounded-xl border transition-colors ${
              bookmarkedQuestions.includes(currentIdx)
                ? 'bg-amber-500/20 border-amber-500/30 text-amber-300'
                : 'bg-[rgba(255,255,255,0.03)] border-transparent text-[#8d9094] hover:text-amber-300'
            }`}
            title="Keyinroq qaytish uchun belgilash"
          >
            <Bookmark className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Center: Clean Progress Mini Dots (Desktop) */}
        <div className="hidden md:flex items-center gap-1.5">
          {MOCK_QUESTIONS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIdx(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentIdx
                  ? 'w-7 bg-[#2fb3a3]'
                  : answers[MOCK_QUESTIONS[i].id] !== undefined
                  ? 'w-3 bg-[#2fb3a3]/40'
                  : 'w-2 bg-[rgba(255,255,255,0.12)]'
              }`}
              title={`Savol #${i + 1}`}
            />
          ))}
        </div>

        {/* Right: Text Size & Countdown Timer */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Font Size Tuner */}
          <div className="hidden sm:flex items-center p-1 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] text-xs">
            <button
              onClick={() => setFontSize('sm')}
              className={`px-2 py-0.5 rounded-lg font-bold text-[11px] transition-colors ${fontSize === 'sm' ? 'bg-[#2fb3a3] text-[#0d1416]' : 'text-[#8d9094]'}`}
            >
              A-
            </button>
            <button
              onClick={() => setFontSize('base')}
              className={`px-2 py-0.5 rounded-lg font-bold text-xs transition-colors ${fontSize === 'base' ? 'bg-[#2fb3a3] text-[#0d1416]' : 'text-[#8d9094]'}`}
            >
              A
            </button>
            <button
              onClick={() => setFontSize('lg')}
              className={`px-2 py-0.5 rounded-lg font-bold text-sm transition-colors ${fontSize === 'lg' ? 'bg-[#2fb3a3] text-[#0d1416]' : 'text-[#8d9094]'}`}
            >
              A+
            </button>
          </div>

          {/* Countdown Timer with Tabular Numbers */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-bold tabular-nums border transition-colors ${
              timeLeft < 300
                ? 'bg-rose-500/15 border-rose-500/30 text-rose-300 animate-pulse'
                : 'bg-[rgba(47,179,163,0.1)] border-[rgba(47,179,163,0.25)] text-[#5cc4b6]'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      {/* QUESTION QUICK JUMP DRAWER (When open) */}
      {showQuestionsDrawer && (
        <div className="glass-card p-4 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#202226] space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between text-xs font-bold text-[#8d9094]">
            <span>Barcha savollar bo'yicha tezkor o'tish:</span>
            <span>{answeredCount} / {MOCK_QUESTIONS.length} ta yechildi</span>
          </div>
          <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
            {MOCK_QUESTIONS.map((q, i) => {
              const isAnswered = answers[q.id] !== undefined;
              const isBookmarked = bookmarkedQuestions.includes(i);
              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setCurrentIdx(i);
                    setShowQuestionsDrawer(false);
                  }}
                  className={`py-2 rounded-xl text-xs font-bold relative transition-all tactile-btn ${
                    i === currentIdx
                      ? 'bg-[#2fb3a3] text-[#0d1416] shadow-md shadow-[#2fb3a3]/30 ring-2 ring-[#5cc4b6]'
                      : isAnswered
                      ? 'bg-[#2fb3a3]/15 text-[#5cc4b6] border border-[#2fb3a3]/30'
                      : 'bg-[#25272b] text-[#8d9094] border border-[rgba(255,255,255,0.05)]'
                  }`}
                >
                  {i + 1}
                  {isBookmarked && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 absolute top-1 right-1" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. MAIN QUESTION CANVAS (Measure constrained 65-75ch) */}
      <div className="glass-card p-5 sm:p-8 rounded-3xl border border-[rgba(255,255,255,0.09)] bg-[#202226] space-y-6">
        {/* Meta Header */}
        <div className="flex items-center justify-between text-xs text-[#8d9094] border-b border-[rgba(255,255,255,0.06)] pb-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#b7b9bc] bg-[rgba(255,255,255,0.06)] px-2.5 py-0.5 rounded-full">
              {currentQ.topic}
            </span>
            <span className="text-[#8d9094]">• {currentQ.subject}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#5cc4b6] tabular-nums">
              {currentQ.points} Ball
            </span>
            <Badge
              variant={
                currentQ.difficulty === 'hard'
                  ? 'danger'
                  : currentQ.difficulty === 'medium'
                  ? 'warning'
                  : 'accent'
              }
              size="sm"
            >
              {currentQ.difficulty.toUpperCase()}
            </Badge>
          </div>
        </div>

        {/* Question Text (Typography with Measure constraint) */}
        <div className="max-w-[70ch]">
          <h2 className={`font-bold text-[#e9eaeb] ${fontSizeClasses[fontSize]}`}>
            {currentQ.questionText}
          </h2>
        </div>

        {/* PARCHMENT HISTORICAL DOCUMENT BLOCK (If instruction / passage present) */}
        {currentQ.instruction && (
          <div className="parchment-source p-5 sm:p-6 rounded-2xl relative space-y-2.5 max-w-[70ch]">
            <div className="flex items-center justify-between text-xs font-bold text-amber-400">
              <span className="flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                <Scroll className="w-3.5 h-3.5" />
                <span>Tarixiy Manba / Hujjat Parchasi</span>
              </span>
              <span className="text-[10px] opacity-75 font-mono">Arxiv Guvohnomasi</span>
            </div>
            <p className="text-xs sm:text-sm text-[#e9eaeb] italic leading-relaxed whitespace-pre-line">
              {currentQ.instruction}
            </p>
          </div>
        )}

        {/* IMAGE / MAP WITH LIGHTBOX ZOOM */}
        {currentQ.imageUrl && (
          <div className="relative rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.08)] bg-black/40 group">
            <img
              src={currentQ.imageUrl}
              alt="Savolga oid tasvir"
              className="max-h-72 w-full object-contain rounded-2xl transition-transform duration-300 group-hover:scale-[1.01]"
              referrerPolicy="no-referrer"
            />
            <button
              onClick={() => {
                setZoomedImage(currentQ.imageUrl || null);
                setZoomScale(1);
              }}
              className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-black/70 hover:bg-black/90 text-white text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md transition-all shadow-md"
            >
              <Maximize2 className="w-3.5 h-3.5 text-[#5cc4b6]" />
              <span>Kattalashtirish (Zoom)</span>
            </button>
          </div>
        )}

        {/* SOURCE DATA TABLE (If present) */}
        {currentQ.tableData && (
          <div className="overflow-x-auto rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#1c1e21]">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#25272b] text-[#b7b9bc] border-b border-[rgba(255,255,255,0.08)]">
                <tr>
                  {currentQ.tableData.headers.map((h, i) => (
                    <th key={i} className="p-3.5 font-bold uppercase text-[11px] tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(255,255,255,0.04)] text-[#e9eaeb]">
                {currentQ.tableData.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-[rgba(255,255,255,0.02)]">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="p-3.5 font-medium">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TYPE 1, 2, 3: MULTIPLE CHOICE OPTIONS (With Tactile Feedback) */}
        {currentQ.options && (
          <div className="space-y-3 pt-2">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = answers[currentQ.id] === optIdx;
              const optionLetters = ['A', 'B', 'C', 'D'];
              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full p-4 sm:p-4.5 rounded-2xl text-left text-xs sm:text-sm font-medium flex items-center justify-between gap-3.5 transition-all duration-150 tactile-btn ${
                    isSelected
                      ? 'bg-[rgba(47,179,163,0.16)] border-2 border-[#2fb3a3] text-[#e9eaeb] shadow-md shadow-[#2fb3a3]/15'
                      : 'bg-[#25272b] border border-[rgba(255,255,255,0.06)] text-[#b7b9bc] hover:text-[#e9eaeb] hover:border-[rgba(255,255,255,0.15)] hover:bg-[#282a2e]'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-[#2fb3a3] text-[#0d1416]'
                          : 'bg-[rgba(255,255,255,0.06)] text-[#8d9094]'
                      }`}
                    >
                      {optionLetters[optIdx]}
                    </span>
                    <span className="leading-snug">{opt}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[10px] font-mono text-[#8d9094]">
                      {optionLetters[optIdx]}
                    </kbd>
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-[#5cc4b6] shrink-0 animate-scaleIn" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* TYPE 4: MATCHING PAIRS */}
        {currentQ.type === 'matching' && currentQ.matchingPairs && (
          <div className="space-y-3 pt-2">
            <p className="text-xs text-[#8d9094]">
              Chap ustundagi tushunchaga o'ng tomondan to'g'ri moslikni tanlang:
            </p>
            {currentQ.matchingPairs.map((pair, pIdx) => {
              const selectedRight = (answers[currentQ.id] || {})[pIdx] || '';
              return (
                <div
                  key={pIdx}
                  className="p-3.5 rounded-2xl bg-[#25272b] border border-[rgba(255,255,255,0.06)] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <span className="text-xs sm:text-sm font-semibold text-[#e9eaeb]">
                    {pair.left}
                  </span>
                  <select
                    value={selectedRight}
                    onChange={(e) => handleMatchingChange(pIdx, e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl bg-[#1c1e21] border border-[rgba(255,255,255,0.1)] text-xs text-[#5cc4b6] font-medium focus:outline-none focus:border-[#2fb3a3]"
                  >
                    <option value="">— Mos javobni tanlang —</option>
                    {currentQ.matchingPairs?.map((p, i) => (
                      <option key={i} value={p.right}>
                        {p.right}
                      </option>
                    ))}
                  </select>
                </div>
              );
            })}
          </div>
        )}

        {/* TYPE 5: GROUPED PASSAGE SUB-QUESTIONS */}
        {currentQ.type === 'grouped' && currentQ.subQuestions && (
          <div className="space-y-4 pt-2">
            {currentQ.subQuestions.map((subQ, sIdx) => {
              const selectedOpt = (answers[currentQ.id] || {})[subQ.id];
              return (
                <div
                  key={subQ.id}
                  className="p-4 sm:p-5 rounded-2xl bg-[#1c1e21] border border-[rgba(255,255,255,0.06)] space-y-3"
                >
                  <p className="text-xs sm:text-sm font-bold text-[#e9eaeb]">
                    {sIdx + 1}. {subQ.text}
                  </p>
                  <div className="space-y-2">
                    {subQ.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => handleGroupedChange(subQ.id, oIdx)}
                        className={`w-full p-3 rounded-xl text-left text-xs flex items-center justify-between gap-2.5 transition-all tactile-btn ${
                          selectedOpt === oIdx
                            ? 'bg-[rgba(47,179,163,0.16)] border border-[#2fb3a3] text-[#e9eaeb] font-semibold'
                            : 'bg-[#25272b] text-[#b7b9bc] hover:text-[#e9eaeb]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-md bg-[rgba(255,255,255,0.06)] flex items-center justify-center text-[10px] font-bold">
                            {['A', 'B', 'C', 'D'][oIdx]}
                          </span>
                          <span>{opt}</span>
                        </div>
                        {selectedOpt === oIdx && (
                          <CheckCircle2 className="w-4 h-4 text-[#5cc4b6] shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TYPE 6: WRITTEN OPEN-ENDED PROMPTS */}
        {currentQ.type === 'written' && currentQ.subPrompts && (
          <div className="space-y-4 pt-2">
            {currentQ.subPrompts.map((sp, idx) => {
              const writtenKey = idx === 0 ? 'a' : 'b';
              const textVal = (answers[currentQ.id] || {})[writtenKey] || '';
              return (
                <div key={idx} className="space-y-2">
                  <label className="block text-xs font-bold text-[#e9eaeb]">
                    <span className="text-[#5cc4b6]">{sp.label}:</span> {sp.prompt}
                  </label>
                  <textarea
                    rows={2}
                    value={textVal}
                    onChange={(e) => handleWrittenChange(writtenKey, e.target.value)}
                    placeholder="Javobingizni asoslab, bu yerga yozing..."
                    className="w-full p-3.5 rounded-2xl bg-[#25272b] border border-[rgba(255,255,255,0.08)] text-xs text-[#e9eaeb] placeholder-[#8d9094] focus:outline-none focus:border-[#2fb3a3] transition-colors"
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. ERGONOMIC BOTTOM ACTION BAR (THUMB ZONE OPTIMIZED) */}
      <div className="fixed sm:static bottom-0 left-0 right-0 z-30 p-3 sm:p-0 bg-[#1c1e21]/95 sm:bg-transparent backdrop-blur-lg sm:backdrop-blur-none border-t border-[rgba(255,255,255,0.08)] sm:border-t-0 flex items-center justify-between gap-3">
        {/* Previous Question Button */}
        <button
          onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
          disabled={currentIdx === 0}
          className="px-4 sm:px-5 py-3 rounded-2xl bg-[#202226] text-[#b7b9bc] hover:text-[#e9eaeb] text-xs font-bold flex items-center gap-2 border border-[rgba(255,255,255,0.08)] disabled:opacity-30 tactile-btn min-h-[48px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Oldingi</span>
        </button>

        {/* Mobile Swipe Hint */}
        <span className="sm:hidden text-[11px] text-[#8d9094] font-medium">
          ← Surish →
        </span>

        {/* Next or Finish Primary CTA */}
        {currentIdx < MOCK_QUESTIONS.length - 1 ? (
          <button
            onClick={() => {
              setCurrentIdx((prev) => prev + 1);
              soundFX.playClick();
            }}
            className="px-6 sm:px-7 py-3 rounded-2xl bg-[#2fb3a3] hover:bg-[#269488] text-[#0d1416] text-xs font-bold flex items-center gap-2 shadow-lg shadow-[#2fb3a3]/25 tactile-btn min-h-[48px]"
          >
            <span>Keyingi</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleTriggerFinish}
            className="px-6 sm:px-7 py-3 rounded-2xl bg-[#6b9b6f] hover:bg-[#5a865e] text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-[#6b9b6f]/35 tactile-btn min-h-[48px] animate-pulse"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Imtihonni Yakunlash</span>
          </button>
        )}
      </div>

      {/* 4. IMAGE LIGHTBOX / ZOOM MODAL */}
      {zoomedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4">
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={() => setZoomScale((prev) => Math.min(2.5, prev + 0.25))}
              className="p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
              title="Kattalashtirish"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button
              onClick={() => setZoomScale((prev) => Math.max(0.75, prev - 0.25))}
              className="p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
              title="Kichraytirish"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <button
              onClick={() => setZoomedImage(null)}
              className="p-2.5 rounded-xl bg-rose-500/20 text-rose-300 hover:bg-rose-500/40 transition-colors"
              title="Yopish"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="overflow-auto max-h-[85vh] max-w-[90vw] flex items-center justify-center p-4">
            <img
              src={zoomedImage}
              alt="Kattalashtirilgan tasvir"
              style={{ transform: `scale(${zoomScale})` }}
              className="max-h-[75vh] max-w-[85vw] object-contain rounded-2xl transition-transform duration-200"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}

      {/* 5. SAFETY EXIT CONFIRMATION MODAL */}
      {showExitModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card max-w-sm w-full p-6 rounded-3xl border border-[rgba(255,255,255,0.1)] bg-[#202226] space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 mx-auto flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#e9eaeb]">
                Imtihondan chiqmoqchimisiz?
              </h3>
              <p className="text-xs text-[#8d9094] mt-1 leading-relaxed">
                Joriy javoblaringiz saqlanadi, ammo imtihon taymeri to'xtatilmaydi.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setShowExitModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-[#25272b] text-[#b7b9bc] hover:text-[#e9eaeb] text-xs font-bold"
              >
                Davom etish
              </button>
              <button
                onClick={() => onNavigate('tests')}
                className="flex-1 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold"
              >
                Chiqish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
