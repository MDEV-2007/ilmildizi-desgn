import React, { useState } from 'react';
import {
  Crown,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Sparkles,
  CreditCard,
  ArrowRight,
  HelpCircle,
  Clock,
  Flame,
  Award,
} from 'lucide-react';
import { ScreenId } from '../../../types';
import { Badge } from '../../ui/Badge';
import confetti from 'canvas-confetti';
import { soundFX } from '../../../utils/soundFX';

interface PremiumScreenProps {
  isPremium: boolean;
  onUpgrade: () => void;
  onNavigate: (screen: ScreenId) => void;
}

export const PremiumScreen: React.FC<PremiumScreenProps> = ({
  isPremium,
  onUpgrade,
  onNavigate,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'month' | 'six_month' | 'year'>('six_month');
  const [showModal, setShowModal] = useState(false);
  const [paymentProvider, setPaymentProvider] = useState<'click' | 'payme' | 'uzum'>('click');

  const plans = [
    {
      id: 'month',
      name: '1 Oylik Sinov',
      price: '49,000 UZS',
      sub: 'Oylik to‘lov',
      desc: 'Tezkor tayyorgarlik va barcha test bazasini ochish uchun',
    },
    {
      id: 'six_month',
      name: '6 Oylik Intensiv',
      price: '199,000 UZS',
      popular: true,
      sub: 'Oyiga atigi 33,000 UZS',
      desc: 'Milliy Sertifikat va Davlat Granti uchun to‘liq tayyorgarlik kursi',
    },
    {
      id: 'year',
      name: '1 Yillik Cheksiz',
      price: '349,000 UZS',
      bestValue: true,
      sub: 'Oyiga atigi 29,000 UZS',
      desc: 'Barcha yangilanishlar, 24/7 AI Mentor va repetitor nazorati',
    },
  ];

  const comparison = [
    { feature: 'Kundalik standart testlar', free: '5 ta/kun', premium: 'Cheksiz' },
    { feature: 'Milliy Sertifikat rasmiy variantlari', free: 'Faqat 2 ta', premium: 'Barcha 40+ variantlar' },
    { feature: 'AI Tahlil & Davlat Granti ehtimoli', free: 'Qisqa', premium: 'To‘liq ilmiy tahlil' },
    { feature: 'Audio darslar va xronologiya xaritasi', free: '—', premium: 'To‘liq ochiq' },
    { feature: 'Xatolar ustida ishlash algoritmi', free: 'Cheklangan', premium: 'Avtomatlashtirilgan' },
    { feature: 'Battle Arena 1v1 cheksiz duellari', free: '3 ta/kun', premium: 'Cheksiz' },
  ];

  const handlePaymentSuccess = () => {
    soundFX.playFanfare();
    setShowModal(false);
    onUpgrade();
    try {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    } catch {}
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* 1. Header Hero Banner */}
      <div className="bento-card p-6 sm:p-10 text-center bg-gradient-to-b from-[#221c12] via-[#14171d] to-[#12151b] border-amber-500/30 relative overflow-hidden space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold font-mono">
          <Crown className="w-3.5 h-3.5" />
          <span>ILMILDIZI PRO — DAVLAT GRANTIGA YO‘L</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-[#f0f1f3] tracking-tight font-voice max-w-2xl mx-auto leading-tight">
          Tarixdan 100% Natija va Milliy Sertifikatni Kafolatlang
        </h1>

        <p className="text-xs sm:text-sm text-[#a3a7ae] max-w-xl mx-auto leading-relaxed">
          Cheksiz BBA testlari, barcha audio darslar, AI Mentorning 24/7 yordami va shaxsiy xatolar ustida ishlash xaritasi.
        </p>
      </div>

      {/* 2. Pricing Plan Cards (3 Cols) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {plans.map((p) => {
          const isSelected = selectedPlan === p.id;
          return (
            <div
              key={p.id}
              onClick={() => {
                soundFX.playClick();
                setSelectedPlan(p.id as any);
              }}
              className={`bento-card p-6 flex flex-col justify-between transition-all cursor-pointer relative tactile-btn ${
                isSelected
                  ? 'border-amber-400 bg-gradient-to-b from-[#221c15] to-[#14171d] shadow-xl shadow-amber-500/10'
                  : 'bg-[#14171d] hover:border-[rgba(255,255,255,0.15)]'
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-[10px] font-black tracking-wide uppercase font-mono shadow-md">
                  Eng Ommabop
                </span>
              )}
              {p.bestValue && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#2fb3a3] text-black text-[10px] font-black tracking-wide uppercase font-mono shadow-md">
                  Eng Foydali (-40%)
                </span>
              )}

              <div className="space-y-3">
                <div>
                  <h3 className="text-base font-bold text-[#f0f1f3]">{p.name}</h3>
                  <p className="text-[11px] text-[#8d9094] mt-0.5">{p.sub}</p>
                </div>

                <div className="pt-2">
                  <span className="text-2xl font-black text-[#f0f1f3] font-mono">
                    {p.price}
                  </span>
                </div>

                <p className="text-xs text-[#a3a7ae] leading-relaxed border-t border-[rgba(255,255,255,0.06)] pt-3">
                  {p.desc}
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  soundFX.playClick();
                  setSelectedPlan(p.id as any);
                  setShowModal(true);
                }}
                className={`w-full mt-6 py-3 rounded-2xl text-xs font-bold transition-all tactile-btn flex items-center justify-center gap-1.5 ${
                  isSelected
                    ? 'bg-amber-400 hover:bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                    : 'bg-[#1a1e26] text-[#f0f1f3] hover:bg-[#2fb3a3] hover:text-[#07090b]'
                }`}
              >
                <span>Obunani Boshlash</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      {/* 3. Comparison Table */}
      <div className="bento-card p-6 bg-[#14171d] space-y-4 border border-[rgba(255,255,255,0.08)]">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8d9094]">
          Oddiy vs Pro Tarif Taqqoslashi
        </h3>

        <div className="divide-y divide-[rgba(255,255,255,0.06)]">
          {comparison.map((item, idx) => (
            <div key={idx} className="py-3 flex items-center justify-between text-xs gap-4">
              <span className="font-semibold text-[#f0f1f3]">{item.feature}</span>
              <div className="flex items-center gap-6 font-mono shrink-0">
                <span className="text-[#8d9094] w-28 text-right">{item.free}</span>
                <span className="text-[#5cc4b6] font-bold w-36 text-right flex items-center justify-end gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#5cc4b6]" />
                  {item.premium}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bento-card max-w-md w-full p-6 sm:p-7 bg-[#14171d] border-amber-500/40 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base text-[#f0f1f3]">
                  To‘lov Tizimini Tanlang
                </h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-[#8d9094] hover:text-[#f0f1f3] text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#a3a7ae]">
              Tanlangan tarif: <strong>{plans.find((p) => p.id === selectedPlan)?.name}</strong> (
              {plans.find((p) => p.id === selectedPlan)?.price})
            </p>

            {/* Providers */}
            <div className="space-y-2.5">
              {[
                { id: 'click', name: 'Click Up', desc: 'Tezkor 1-click to‘lov' },
                { id: 'payme', name: 'Payme', desc: 'Karta orqali xavfsiz to‘lov' },
                { id: 'uzum', name: 'Uzum Bank / Nasiya', desc: '0% muddatli to‘lov' },
              ].map((prov) => (
                <div
                  key={prov.id}
                  onClick={() => {
                    soundFX.playClick();
                    setPaymentProvider(prov.id as any);
                  }}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    paymentProvider === prov.id
                      ? 'border-[#2fb3a3] bg-[#2fb3a3]/10'
                      : 'border-[rgba(255,255,255,0.08)] bg-[#1a1e26]'
                  }`}
                >
                  <div>
                    <p className="text-xs font-bold text-[#f0f1f3]">{prov.name}</p>
                    <span className="text-[10px] text-[#8d9094]">{prov.desc}</span>
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      paymentProvider === prov.id
                        ? 'border-[#2fb3a3] bg-[#2fb3a3]'
                        : 'border-[#8d9094]'
                    }`}
                  >
                    {paymentProvider === prov.id && (
                      <div className="w-1.5 h-1.5 rounded-full bg-black" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handlePaymentSuccess}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-black text-xs font-black shadow-lg shadow-amber-500/25 tactile-btn flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              <span>To‘lovni Tasdiqlash</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
