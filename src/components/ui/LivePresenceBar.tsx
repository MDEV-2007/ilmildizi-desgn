import React, { useState, useEffect } from 'react';
import { Users, Sparkles, Trophy, Zap, ShieldCheck } from 'lucide-react';

export const LivePresenceBar: React.FC = () => {
  const [onlineCount, setOnlineCount] = useState(148);
  const [recentAchiever, setRecentAchiever] = useState({
    name: 'Jasurbek M.',
    action: 'Milliy Sertifikat testida 94% natija ko‘rsatdi',
    time: 'Hozirgina',
  });

  const ACHIEVERS = [
    { name: 'Jasurbek M.', action: 'Milliy Sertifikat testida 94% natija ko‘rsatdi' },
    { name: 'Madinabonu K.', action: 'Temuriylar davri xronologiyasini 100% yechdi' },
    { name: 'Otabek R.', action: '1v1 Arena jangida 5-ketma-ket g‘alaba qozondi' },
    { name: 'Shahzoda T.', action: '7 kunlik olovli streakka erishdi 🔥' },
    { name: 'Boburjon S.', action: 'BBA Tarix Diagnostikasidan 96 ball oldi' },
  ];

  // Subtle live fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineCount((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(120, prev + delta);
      });
    }, 6000);

    const achieverInterval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * ACHIEVERS.length);
      setRecentAchiever({
        name: ACHIEVERS[randomIdx].name,
        action: ACHIEVERS[randomIdx].action,
        time: 'Hozirgina',
      });
    }, 9000);

    return () => {
      clearInterval(interval);
      clearInterval(achieverInterval);
    };
  }, []);

  return (
    <div className="w-full rounded-2xl bg-gradient-to-r from-[rgba(47,179,163,0.08)] via-[rgba(255,255,255,0.02)] to-[rgba(217,154,56,0.08)] border border-[rgba(255,255,255,0.07)] p-3 px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
      {/* Left: Active Online Learners */}
      <div className="flex items-center gap-2.5">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <span className="text-[#b7b9bc]">
          Ayni daqiqada <strong className="text-[#e9eaeb] tabular-nums font-mono">{onlineCount} nafar</strong> abituriyent tayyorlanmoqda
        </span>
      </div>

      {/* Right: Social Proof ticker */}
      <div className="flex items-center gap-2 text-[11px] text-[#8d9094] overflow-hidden">
        <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span className="text-[#5cc4b6] font-semibold">{recentAchiever.name}</span>
        <span className="truncate text-[#e9eaeb]/80">{recentAchiever.action}</span>
        <span className="text-[10px] bg-[rgba(255,255,255,0.06)] px-1.5 py-0.5 rounded text-[#8d9094] shrink-0">
          {recentAchiever.time}
        </span>
      </div>
    </div>
  );
};
