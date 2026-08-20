import React from 'react';
import { LayoutDashboard, FileCheck2, BookOpen, Swords, User } from 'lucide-react';
import { ScreenId } from '../../types';

interface MobileTabBarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
}

export const MobileTabBar: React.FC<MobileTabBarProps> = ({
  currentScreen,
  onNavigate,
}) => {
  const tabs = [
    { id: 'dashboard' as ScreenId, label: 'Bosh sahifa', icon: LayoutDashboard },
    { id: 'tests' as ScreenId, label: 'Testlar', icon: FileCheck2 },
    { id: 'learning' as ScreenId, label: 'O\'qish', icon: BookOpen },
    { id: 'arena' as ScreenId, label: 'Arena', icon: Swords },
    { id: 'profile' as ScreenId, label: 'Profil', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#1c1e21]/95 backdrop-blur-lg border-t border-[rgba(255,255,255,0.08)] px-3 py-2 flex items-center justify-around">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive =
          currentScreen === tab.id ||
          (tab.id === 'tests' &&
            ['test_active', 'test_feedback', 'test_history', 'revision'].includes(
              currentScreen
            )) ||
          (tab.id === 'arena' &&
            ['game_timeline', 'game_map', 'game_person'].includes(currentScreen));

        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all ${
              isActive
                ? 'text-[#5cc4b6] font-semibold'
                : 'text-[#8d9094] hover:text-[#e9eaeb]'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'text-[#2fb3a3]' : ''}`} />
            <span className="text-[10px] tracking-tight">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
