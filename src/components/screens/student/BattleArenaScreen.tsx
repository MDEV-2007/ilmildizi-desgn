import React, { useState, useEffect } from 'react';
import { Swords, Bot, UserCheck, Trophy, Zap, Shield, Crown, RefreshCw, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { UserProfile, ScreenId } from '../../../types';
import { Badge } from '../../ui/Badge';
import confetti from 'canvas-confetti';
import { soundFX } from '../../../utils/soundFX';

interface BattleArenaScreenProps {
  user: UserProfile;
  onNavigate: (screen: ScreenId) => void;
  onEarnRewards: (xp: number, coins: number) => void;
}

type ArenaState = 'lobby' | 'searching' | 'battle' | 'result';

export const BattleArenaScreen: React.FC<BattleArenaScreenProps> = ({
  user,
  onNavigate,
  onEarnRewards,
}) => {
  const [arenaState, setArenaState] = useState<ArenaState>('lobby');
  const [opponentName, setOpponentName] = useState('AI Tarixchi Bot');
  const [round, setRound] = useState(1);
  const [playerScore, setPlayerScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [battleResult, setBattleResult] = useState<'win' | 'loss'>('win');

  const arenaStats = {
    elo: user.elo,
    totalBattles: 42,
    wins: 31,
    draws: 3,
    losses: 8,
  };

  const battleQuestions = [
    {
      q: '1370-yil Amir Temur qaysi qurultoyda Movarounnahrning oliy hukmdori deb e\'lon qilindi?',
      options: ['Qarshi qurultoyida', 'Balx qurultoyida', 'Samarqand qurultoyida', 'Kesh qurultoyida'],
      correct: 1,
    },
    {
      q: 'Mirzo Ulug\'bekning "Ziji jadidi Ko\'ragoniy" asarida nechta yulduzning o\'rni aniqlangan?',
      options: ['1018 ta yulduz', '984 ta yulduz', '1250 ta yulduz', '1000 ta yulduz'],
      correct: 0,
    },
    {
      q: '1507-yil Hirot shahrini kim boshchiligidagi qo\'shin egallagan?',
      options: ['Shayboniyxon', 'Bobur Mirzo', 'Shoh Ismoil Safaviy', 'Husayn Boyqaro'],
      correct: 0,
    },
  ];

  const currentQ = battleQuestions[round - 1] || battleQuestions[0];

  const handleStartSearch = (isLive: boolean) => {
    soundFX.playSelect();
    setOpponentName(isLive ? 'Madinabonu K. (Toshkent)' : 'AI Tarixchi Bot');
    setArenaState('searching');
    setTimeout(() => {
      setRound(1);
      setPlayerScore(0);
      setOpponentScore(0);
      setSelectedAnswer(null);
      setArenaState('battle');
      soundFX.playClick();
    }, 1500);
  };

  const handleAnswer = (optIdx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(optIdx);

    const isCorrect = optIdx === currentQ.correct;
    if (isCorrect) {
      soundFX.playCorrect();
    } else {
      soundFX.playIncorrect();
    }

    const newPlayerScore = isCorrect ? playerScore + 1 : playerScore;
    const oppCorrect = Math.random() > 0.35;
    const newOppScore = oppCorrect ? opponentScore + 1 : opponentScore;

    setPlayerScore(newPlayerScore);
    setOpponentScore(newOppScore);

    setTimeout(() => {
      if (round < battleQuestions.length) {
        setRound(round + 1);
        setSelectedAnswer(null);
      } else {
        const isWin = newPlayerScore >= newOppScore;
        setBattleResult(isWin ? 'win' : 'loss');
        setArenaState('result');
        if (isWin) {
          soundFX.playFanfare();
          try {
            confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
          } catch {}
          onEarnRewards(150, 30);
        }
      }
    }, 1200);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      {/* State 1: Lobby */}
      {arenaState === 'lobby' && (
        <div className="space-y-6">
          <div className="bento-card p-6 bg-gradient-to-r from-[#181c24] via-[#14171d] to-[#181c24] border border-[rgba(255,255,255,0.08)]">
            <h1 className="text-2xl font-bold text-[#f0f1f3] flex items-center gap-2.5 font-voice">
              <Swords className="w-6 h-6 text-amber-400" />
              <span>Battle Arena: 1v1 Intellektual Duel</span>
            </h1>
            <p className="text-xs text-[#8d9094] mt-1">
              Tezkor Tarix savollarida raqiblaringizdan ustun keling va ELO ballingizni oshiring.
            </p>
          </div>

          {/* 5-Column Stat Grid */}
          <div className="grid grid-cols-5 gap-2">
            <div className="bento-card p-3 rounded-2xl text-center border border-blue-500/20 bg-blue-500/5">
              <span className="text-[10px] font-bold text-blue-400 uppercase">ELO</span>
              <p className="text-sm sm:text-base font-black text-[#f0f1f3] mt-0.5 font-mono">{arenaStats.elo}</p>
            </div>
            <div className="bento-card p-3 rounded-2xl text-center bg-[#14171d]">
              <span className="text-[10px] font-bold text-[#8d9094] uppercase">Janglar</span>
              <p className="text-sm sm:text-base font-bold text-[#f0f1f3] mt-0.5 font-mono">{arenaStats.totalBattles}</p>
            </div>
            <div className="bento-card p-3 rounded-2xl text-center border border-[#52a86b]/20 bg-[#52a86b]/5">
              <span className="text-[10px] font-bold text-[#7ad192] uppercase">G‘alaba</span>
              <p className="text-sm sm:text-base font-bold text-[#7ad192] mt-0.5 font-mono">{arenaStats.wins}</p>
            </div>
            <div className="bento-card p-3 rounded-2xl text-center bg-[#14171d]">
              <span className="text-[10px] font-bold text-amber-400 uppercase">Durang</span>
              <p className="text-sm sm:text-base font-bold text-amber-300 mt-0.5 font-mono">{arenaStats.draws}</p>
            </div>
            <div className="bento-card p-3 rounded-2xl text-center border border-rose-500/20 bg-rose-500/5">
              <span className="text-[10px] font-bold text-rose-400 uppercase">Mag‘lub</span>
              <p className="text-sm sm:text-base font-bold text-rose-300 mt-0.5 font-mono">{arenaStats.losses}</p>
            </div>
          </div>

          {/* 2 Big Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <button
              onClick={() => handleStartSearch(false)}
              className="bento-card p-6 border-2 border-[#2fb3a3]/40 bg-[#14171d] hover:border-[#2fb3a3] transition-all text-left group tactile-btn"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#2fb3a3]/20 text-[#2fb3a3] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#f0f1f3] group-hover:text-[#5cc4b6] transition-colors">
                AI bilan mashg‘ulot jangi
              </h3>
              <p className="text-xs text-[#8d9094] mt-1 leading-relaxed">
                Tarixchi AI bilan 3 ta tezkor savolda mashq qiling. Xavf yo‘q, yangi bilimlarni mustahkamlang.
              </p>
              <span className="inline-block mt-4 text-xs font-bold text-[#5cc4b6]">
                Boshlash (Tezkor) →
              </span>
            </button>

            <button
              onClick={() => handleStartSearch(true)}
              className="bento-card p-6 border-2 border-amber-500/30 bg-[#14171d] hover:border-amber-500 transition-all text-left group tactile-btn"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Swords className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#f0f1f3] group-hover:text-amber-400 transition-colors">
                Jonli Abituriyent bilan duel
              </h3>
              <p className="text-xs text-[#8d9094] mt-1 leading-relaxed">
                Onlayn o‘quvchilar bilan real vaqtda bellashing. G‘alaba uchun +150 XP, +30 tanga va ELO reyting!
              </p>
              <span className="inline-block mt-4 text-xs font-bold text-amber-400">
                Raqib topish →
              </span>
            </button>
          </div>
        </div>
      )}

      {/* State 2: Searching */}
      {arenaState === 'searching' && (
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="bento-card p-8 text-center flex flex-col items-center max-w-sm w-full bg-[#14171d]">
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-full border-4 border-[#2fb3a3]/20 border-t-[#2fb3a3] animate-spin flex items-center justify-center"></div>
              <Swords className="w-8 h-8 text-amber-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <h3 className="text-lg font-bold text-[#f0f1f3] mb-1">
              Raqib qidirilmoqda...
            </h3>
            <p className="text-xs text-[#8d9094]">
              Sizning darajangizga mos bilimdon ulanmoqda
            </p>
          </div>
        </div>
      )}

      {/* State 3: Live Battle Screen */}
      {arenaState === 'battle' && (
        <div className="space-y-5">
          {/* Top Battle Header */}
          <div className="bento-card p-4 bg-[#14171d] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src={user.avatar}
                alt="Siz"
                className="w-10 h-10 rounded-xl border border-[#2fb3a3]"
                referrerPolicy="no-referrer"
              />
              <div>
                <p className="text-xs font-bold text-[#f0f1f3]">Siz ({user.name})</p>
                <p className="text-sm font-black text-[#5cc4b6] font-mono">{playerScore} ball</p>
              </div>
            </div>

            <div className="text-center">
              <span className="text-[10px] font-bold uppercase text-[#8d9094] block font-mono">
                Raund {round} / 3
              </span>
              <span className="text-xs font-black text-amber-400">VS</span>
            </div>

            <div className="flex items-center gap-2.5 text-right">
              <div>
                <p className="text-xs font-bold text-[#f0f1f3]">{opponentName}</p>
                <p className="text-sm font-black text-amber-400 font-mono">{opponentScore} ball</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#1e222c] border border-amber-400 flex items-center justify-center text-base font-bold text-amber-300">
                🤖
              </div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bento-card p-6 bg-[#14171d] space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#5cc4b6] bg-[#2fb3a3]/10 px-2.5 py-1 rounded-md border border-[#2fb3a3]/20">
              TEZKOR DUEL SAVOLI
            </span>
            <h2 className="text-base sm:text-lg font-bold text-[#f0f1f3] leading-snug font-voice">
              {currentQ.q}
            </h2>

            <div className="space-y-2.5 pt-2">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedAnswer === idx;
                const isCorrect = idx === currentQ.correct;

                let btnClass = 'bg-[#1a1e26] border border-[rgba(255,255,255,0.06)] text-[#a3a7ae] hover:border-[rgba(255,255,255,0.15)]';
                if (selectedAnswer !== null) {
                  if (isCorrect) btnClass = 'bg-[#52a86b]/20 border-2 border-[#52a86b] text-[#7ad192] font-bold';
                  else if (isSelected && !isCorrect) btnClass = 'bg-rose-500/20 border-2 border-rose-500 text-rose-300 font-bold';
                  else btnClass = 'bg-[#1a1e26]/50 text-[#4b4f57] opacity-60';
                }

                return (
                  <button
                    key={idx}
                    disabled={selectedAnswer !== null}
                    onClick={() => handleAnswer(idx)}
                    className={`w-full p-4 rounded-2xl text-left text-xs sm:text-sm font-medium transition-all tactile-btn ${btnClass}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* State 4: Result */}
      {arenaState === 'result' && (
        <div className="bento-card p-8 text-center bg-[#14171d] flex flex-col items-center max-w-md mx-auto space-y-4">
          <div className="text-5xl mb-2">
            {battleResult === 'win' ? '🏆' : '🛡️'}
          </div>

          <h2 className="text-2xl font-bold text-[#f0f1f3] font-voice">
            {battleResult === 'win' ? 'G‘alaba qozondingiz!' : 'Munosib kurash!'}
          </h2>

          <p className="text-xs text-[#8d9094] font-mono">
            Yakuniy hisob: <strong className="text-[#f0f1f3]">{playerScore} — {opponentScore}</strong>
          </p>

          {battleResult === 'win' ? (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold w-full flex items-center justify-around font-mono">
              <span>⚡ +150 XP</span>
              <span>🪙 +30 Tanga</span>
              <span>📈 +25 ELO</span>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-[rgba(255,255,255,0.04)] text-xs text-[#a3a7ae] w-full font-mono">
              Mashg‘ulot uchun: <span className="text-[#5cc4b6] font-bold">+40 XP</span> olindi.
            </div>
          )}

          <div className="w-full flex gap-3 pt-3">
            <button
              onClick={() => {
                soundFX.playClick();
                setArenaState('lobby');
              }}
              className="flex-1 py-3.5 rounded-2xl bg-[#2fb3a3] hover:bg-[#269488] text-[#07090b] text-xs font-bold transition-all shadow-md shadow-[#2fb3a3]/20 tactile-btn"
            >
              Yana o‘ynash
            </button>
            <button
              onClick={() => {
                soundFX.playClick();
                onNavigate('dashboard');
              }}
              className="px-5 py-3.5 rounded-2xl bg-[#1a1e26] text-xs font-semibold text-[#a3a7ae] hover:text-[#f0f1f3] tactile-btn"
            >
              Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
