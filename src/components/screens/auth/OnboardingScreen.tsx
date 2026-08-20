import React, { useState } from 'react';
import { Sprout, Swords, Trophy, Sparkles, ArrowRight, Check } from 'lucide-react';
import { ScreenId } from '../../../types';

interface OnboardingScreenProps {
  onComplete: () => void;
  onNavigate: (screen: ScreenId) => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      badge: 'ILMIY GAMIFIKATSIYA',
      icon: '🌱',
      title: 'Har bir to\'g\'ri javob — bilim ildizingizni mustahkamlaydi',
      description:
        'Tarix, Milliy Sertifikat va BBA imtihonlariga tayyorlanishda XP to\'plang, darajalarni oching, streak (ketma-ketlik) saqlang va do\'stlar bilan bellashing.',
      points: [
        'Haqiqiy Milliy Sertifikat formatidagi savollar',
        'AI xatolar tahlili va shaxsiy o\'rganish yo\'l xaritasi',
      ],
    },
    {
      badge: 'BATTLE ARENA & MENTOR',
      icon: '⚔️',
      title: 'Jonli duellar va 24/7 shaxsiy AI Tarix Mentor',
      description:
        'Boshqa abituriyentlar bilan 1v1 intellektual janglarda kuch sinashing, tangalar yuting va avatar ramkalarini kolleksiya qiling.',
      points: [
        'Mini-o\'yinlar: Xronologiya, Xarita va Tarixiy Shaxsni topish',
        'Imtihon topshirish uchun eng aniq prognoz sertifikat balli',
      ],
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const stepData = steps[currentStep];

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center p-4 relative">
      {/* Top Skip button */}
      <div className="w-full max-w-lg flex justify-between items-center mb-6">
        {/* Progress Dots */}
        <div className="flex items-center gap-2">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentStep
                  ? 'w-8 bg-[#2fb3a3]'
                  : 'w-2 bg-[rgba(255,255,255,0.15)]'
              }`}
            />
          ))}
        </div>

        <button
          onClick={onComplete}
          className="text-xs font-semibold text-[#8d9094] hover:text-[#e9eaeb] transition-colors"
        >
          O'tkazib yuborish
        </button>
      </div>

      {/* Main Slide Card */}
      <div className="w-full max-w-lg glass-card p-8 rounded-3xl border border-[rgba(255,255,255,0.09)] shadow-2xl text-center flex flex-col items-center relative overflow-hidden">
        <div className="text-5xl mb-5 p-4 rounded-2xl bg-[rgba(47,179,163,0.12)] border border-[rgba(47,179,163,0.25)]">
          {stepData.icon}
        </div>

        <span className="text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-[rgba(47,179,163,0.16)] text-[#5cc4b6] border border-[rgba(47,179,163,0.35)] mb-3">
          {stepData.badge}
        </span>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#e9eaeb] font-voice mb-3 leading-snug">
          {stepData.title}
        </h1>

        <p className="text-sm text-[#b7b9bc] leading-relaxed max-w-md mb-6">
          {stepData.description}
        </p>

        <div className="w-full space-y-2 mb-8 text-left">
          {stepData.points.map((pt, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]"
            >
              <div className="w-5 h-5 rounded-full bg-[#2fb3a3]/20 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-[#2fb3a3]" />
              </div>
              <span className="text-xs text-[#e9eaeb] font-medium">{pt}</span>
            </div>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-full py-3.5 rounded-2xl bg-[#2fb3a3] hover:bg-[#269488] text-[#0d1416] text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#2fb3a3]/25 transition-all"
        >
          <span>
            {currentStep === steps.length - 1 ? "O'qishni boshlash" : 'Keyingisi'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
