import React from 'react';
import { Sprout, LayoutDashboard, FileCheck2, BookOpen, Trophy, ArrowLeft } from 'lucide-react';
import { ScreenId } from '../../../types';

interface Error404ScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const Error404Screen: React.FC<Error404ScreenProps> = ({ onNavigate }) => {
  const quickLinks = [
    { id: 'dashboard' as ScreenId, label: 'Asosiy Dashboard', icon: LayoutDashboard },
    { id: 'tests' as ScreenId, label: 'Test Markazi', icon: FileCheck2 },
    { id: 'learning' as ScreenId, label: 'Darslar & O\'qish', icon: BookOpen },
    { id: 'leaderboard' as ScreenId, label: 'Reyting Jadvali', icon: Trophy },
  ];

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-xl text-center flex flex-col items-center">
        {/* Giant 404 with sprouting seed overlay */}
        <div className="relative mb-2 select-none">
          <span className="text-8xl sm:text-[140px] font-black tracking-tighter bg-gradient-to-b from-[#5cc4b6] via-[#2fb3a3] to-[#186f64] bg-clip-text text-transparent leading-none inline-block">
            404
          </span>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-12 p-3 rounded-full bg-[#2fb3a3] text-[#0d1416] shadow-xl border-4 border-[#17181a] animate-bounce">
            <Sprout className="w-8 h-8" />
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#e9eaeb] mb-2 font-voice">
          Bu yo'l hali ildiz otmagan
        </h2>

        <p className="text-sm text-[#8d9094] max-w-md mb-8 leading-relaxed">
          Siz qidirayotgan sahifa ko'chirilgan, o'chirilgan yoki hali yaratilmagan bo'lishi mumkin. Quyidagi asosiy bo'limlarga o'ting:
        </p>

        {/* 4 Column Mini Grid */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {quickLinks.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="glass-card p-4 rounded-2xl flex flex-col items-center gap-2.5 hover:border-[#2fb3a3] hover:scale-105 transition-all text-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-[rgba(47,179,163,0.14)] text-[#5cc4b6] flex items-center justify-center group-hover:bg-[#2fb3a3] group-hover:text-[#0d1416] transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-[#b7b9bc] group-hover:text-[#e9eaeb]">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onNavigate('dashboard')}
          className="px-6 py-3 rounded-xl bg-[#2fb3a3] hover:bg-[#269488] text-[#0d1416] text-xs font-bold flex items-center gap-2 shadow-lg shadow-[#2fb3a3]/20 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Bosh sahifaga qaytish</span>
        </button>
      </div>
    </div>
  );
};
