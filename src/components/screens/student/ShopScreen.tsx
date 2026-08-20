import React, { useState } from 'react';
import {
  ShoppingBag,
  Coins,
  Shield,
  Palette,
  Sparkles,
  Check,
  Crown,
  Flame,
  Zap,
} from 'lucide-react';
import { UserProfile, ScreenId } from '../../../types';
import { Badge } from '../../ui/Badge';
import confetti from 'canvas-confetti';
import { soundFX } from '../../../utils/soundFX';

interface ShopScreenProps {
  user: UserProfile;
  onBuyItem: (itemId: string, cost: number) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const ShopScreen: React.FC<ShopScreenProps> = ({
  user,
  onBuyItem,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'frames' | 'streak' | 'themes'>('frames');
  const [purchasedItems, setPurchasedItems] = useState<string[]>(['f1']);
  const [equippedFrame, setEquippedFrame] = useState('f1');

  const frames = [
    {
      id: 'f1',
      name: 'Klassik Bronza Hoshiya',
      price: 0,
      preview: 'border-2 border-[#8d9094]',
    },
    {
      id: 'f2',
      name: 'Zarhallangan Oltin Ramka',
      price: 300,
      preview: 'border-2 border-amber-400 shadow-md shadow-amber-500/20',
    },
    {
      id: 'f3',
      name: 'Neon Zumrad Afsungar',
      price: 500,
      preview: 'border-2 border-[#2fb3a3] shadow-md shadow-[#2fb3a3]/30',
    },
    {
      id: 'f4',
      name: 'Temuriy Qalqon Ramkasi',
      price: 800,
      preview: 'border-2 border-purple-500 shadow-md shadow-purple-500/20',
    },
  ];

  const streakBoosts = [
    {
      id: 's1',
      name: 'Muzlatish Qalqoni (Streak Freeze 24h)',
      desc: 'Agar bir kun test yecha olmasangiz ham, ketma-ketlik olovingiz o‘chmaydi.',
      price: 150,
      icon: Shield,
    },
    {
      id: 's2',
      name: 'Super Streak Tiklagich (7 kun)',
      desc: 'Tasodifan uzilgan 7 kunlik tarixingizni to‘liq tiklab beradi.',
      price: 450,
      icon: Sparkles,
    },
  ];

  const themes = [
    {
      id: 't_dark',
      name: 'Obsidian Slate (Tavsiya)',
      desc: 'Ko‘zga qulay chuqur qorong‘ulik va zumrad yoritgichlar',
      price: 0,
      active: true,
    },
    {
      id: 't_amber',
      name: 'Qadimgi Samarqand Oltini',
      desc: 'Zarhal va qum ranglar uyg‘unligi',
      price: 350,
    },
    {
      id: 't_emerald',
      name: 'Buxoro Minorasi Zumradi',
      desc: 'Sokin zumrad yashil palitrasi',
      price: 400,
    },
  ];

  const handlePurchase = (id: string, price: number) => {
    soundFX.playClick();
    if (purchasedItems.includes(id)) {
      setEquippedFrame(id);
      return;
    }

    if (user.coins >= price) {
      onBuyItem(id, price);
      setPurchasedItems([...purchasedItems, id]);
      setEquippedFrame(id);
      soundFX.playCorrect();
      try {
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
      } catch {}
    } else {
      soundFX.playIncorrect();
      alert('Tangalaringiz yetarli emas! Testlar yechib tanga to‘plang.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bento-card p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#221c15] via-[#14171d] to-[#181c24] border-yellow-500/20">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-yellow-500/15 text-yellow-300 border border-yellow-500/25 flex items-center gap-1">
              <ShoppingBag className="w-3 h-3 text-yellow-400" />
              Duolingo Style Gamifikatsiya
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#f0f1f3] tracking-tight font-voice">
            Artefaktlar & Do‘kon
          </h1>
          <p className="text-xs sm:text-sm text-[#a3a7ae] mt-1 max-w-xl">
            Testlar va 1v1 arenalarda topgan tangalaringiz evaziga avatar ramkalari, streak himoyasi va mavzularni sotib oling.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#14171d] border border-[rgba(255,255,255,0.08)] flex items-center gap-3 shrink-0 self-start sm:self-auto">
          <div className="w-10 h-10 rounded-xl bg-yellow-500/15 text-yellow-400 flex items-center justify-center">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase text-[#8d9094] font-mono">
              Sizdagi Tangalar
            </span>
            <p className="text-xl font-black text-yellow-400 font-mono">
              🪙 {user.coins}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'frames', label: 'Avatar Hoshiyalari', icon: Crown },
          { id: 'streak', label: 'Streak Qalqonlari', icon: Shield },
          { id: 'themes', label: 'Maxsus Mavzular', icon: Palette },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => {
                soundFX.playClick();
                setActiveTab(tab.id as any);
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 tactile-btn ${
                activeTab === tab.id
                  ? 'bg-[#2fb3a3] text-[#07090b] shadow-md shadow-[#2fb3a3]/20 font-bold'
                  : 'bento-card bg-[#14171d] text-[#8d9094] hover:text-[#f0f1f3]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Frames Grid */}
      {activeTab === 'frames' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {frames.map((frame) => {
            const isPurchased = purchasedItems.includes(frame.id);
            const isEquipped = equippedFrame === frame.id;

            return (
              <div
                key={frame.id}
                className="bento-card p-5 bg-[#14171d] flex flex-col justify-between items-center text-center space-y-4"
              >
                <div className="relative my-2">
                  <div
                    className={`w-16 h-16 rounded-full bg-[#1a1e26] p-1 flex items-center justify-center ${frame.preview}`}
                  >
                    <img
                      src={user.avatar}
                      alt="Avatar"
                      className="w-full h-full rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                <div className="w-full">
                  <h3 className="font-bold text-xs text-[#f0f1f3]">{frame.name}</h3>
                  <span className="text-[11px] font-mono text-yellow-400 font-semibold block mt-1">
                    {frame.price === 0 ? 'Bepul' : `🪙 ${frame.price} tanga`}
                  </span>
                </div>

                <button
                  onClick={() => handlePurchase(frame.id, frame.price)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all tactile-btn ${
                    isEquipped
                      ? 'bg-[#52a86b]/20 border border-[#52a86b] text-[#7ad192]'
                      : isPurchased
                      ? 'bg-[#1a1e26] text-[#f0f1f3] hover:bg-[#2fb3a3] hover:text-[#07090b]'
                      : 'bg-[#2fb3a3] text-[#07090b] hover:bg-[#269488]'
                  }`}
                >
                  {isEquipped ? 'Taqilgan ✓' : isPurchased ? 'Taqish' : 'Sotib Olish'}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Streak Boosts */}
      {activeTab === 'streak' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {streakBoosts.map((boost) => {
            const Icon = boost.icon;
            return (
              <div
                key={boost.id}
                className="bento-card p-6 bg-[#14171d] flex flex-col justify-between space-y-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/15 text-sky-400 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#f0f1f3]">{boost.name}</h3>
                    <p className="text-xs text-[#8d9094] mt-1 leading-relaxed">
                      {boost.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[rgba(255,255,255,0.06)]">
                  <span className="text-sm font-bold font-mono text-yellow-400">
                    🪙 {boost.price} tanga
                  </span>
                  <button
                    onClick={() => handlePurchase(boost.id, boost.price)}
                    className="px-5 py-2.5 rounded-xl bg-[#2fb3a3] hover:bg-[#269488] text-[#07090b] text-xs font-bold tactile-btn"
                  >
                    Faollashtirish
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 3: Themes */}
      {activeTab === 'themes' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {themes.map((th) => (
            <div
              key={th.id}
              className="bento-card p-5 bg-[#14171d] flex flex-col justify-between space-y-4"
            >
              <div>
                <span className="text-[10px] font-bold uppercase text-[#8d9094] font-mono">
                  {th.price === 0 ? 'STANDART' : 'PREMIUM PALITRA'}
                </span>
                <h3 className="text-sm font-bold text-[#f0f1f3] mt-1">{th.name}</h3>
                <p className="text-xs text-[#8d9094] mt-1 leading-relaxed">
                  {th.desc}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[rgba(255,255,255,0.06)]">
                <span className="text-xs font-bold font-mono text-yellow-400">
                  {th.price === 0 ? 'Ochiq' : `🪙 ${th.price}`}
                </span>
                <button
                  onClick={() => handlePurchase(th.id, th.price)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold tactile-btn ${
                    th.active
                      ? 'bg-[#52a86b]/20 border border-[#52a86b] text-[#7ad192]'
                      : 'bg-[#2fb3a3] text-[#07090b]'
                  }`}
                >
                  {th.active ? 'Faol ✓' : 'Tanlash'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
