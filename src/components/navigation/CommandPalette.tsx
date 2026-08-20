import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  BookOpen,
  Trophy,
  Flame,
  Swords,
  Layers,
  Sparkles,
  User,
  ShoppingBag,
  History,
  Compass,
  ArrowRight,
  Command,
  X,
  FileQuestion,
  GraduationCap,
} from 'lucide-react';
import { ScreenId } from '../../types';
import { soundFX } from '../../utils/soundFX';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: ScreenId) => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  shortcut?: string;
  action: () => void;
  badge?: string;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commandItems: CommandItem[] = [
    {
      id: 'tests',
      title: 'BBA & Milliy Sertifikat Testlari',
      category: 'Asosiy Testlar',
      icon: <FileQuestion className="w-4 h-4 text-[#5cc4b6]" />,
      shortcut: 'T',
      badge: '30 ta yangi',
      action: () => onNavigate('tests'),
    },
    {
      id: 'active_test',
      title: 'Hozirgi Mock Testni Boshlash (Zen Mode)',
      category: 'Asosiy Testlar',
      icon: <Sparkles className="w-4 h-4 text-amber-400" />,
      shortcut: '↵',
      badge: 'Fokus',
      action: () => onNavigate('test_active'),
    },
    {
      id: 'arena',
      title: 'Jonli Tarixiy Jang Maydoni (1v1 PvP)',
      category: 'O‘yinlar & Bellashuv',
      icon: <Swords className="w-4 h-4 text-rose-400" />,
      shortcut: 'B',
      badge: 'Live',
      action: () => onNavigate('arena'),
    },
    {
      id: 'timeline',
      title: 'Xronologiya & Voqealar Zanjiri O‘yini',
      category: 'O‘yinlar & Bellashuv',
      icon: <History className="w-4 h-4 text-purple-400" />,
      action: () => onNavigate('game_timeline'),
    },
    {
      id: 'map_game',
      title: 'Tarixiy Xarita & Qal’alar Tahlili',
      category: 'O‘yinlar & Bellashuv',
      icon: <Compass className="w-4 h-4 text-sky-400" />,
      action: () => onNavigate('game_map'),
    },
    {
      id: 'revision',
      title: 'Spaced Repetition: Xatolar Ustida Ishlash',
      category: 'O‘quv & Tahlil',
      icon: <Layers className="w-4 h-4 text-emerald-400" />,
      shortcut: 'R',
      badge: '18 ta xato',
      action: () => onNavigate('revision'),
    },
    {
      id: 'ai_mentor',
      title: 'Tarixchi AI - Savol va Tahlil Berish',
      category: 'O‘quv & Tahlil',
      icon: <GraduationCap className="w-4 h-4 text-indigo-400" />,
      shortcut: 'AI',
      badge: 'Gemini',
      action: () => onNavigate('ai_mentor'),
    },
    {
      id: 'analytics',
      title: 'Shaxsiy Natijalar & DTB Bashorati',
      category: 'Statistika',
      icon: <Trophy className="w-4 h-4 text-amber-300" />,
      action: () => onNavigate('analytics'),
    },
    {
      id: 'leaderboard',
      title: 'Respublika Reytingi & Liderlar Jadvali',
      category: 'Statistika',
      icon: <Flame className="w-4 h-4 text-orange-400" />,
      action: () => onNavigate('leaderboard'),
    },
    {
      id: 'shop',
      title: 'Unvonlar & Artefaktlar Do‘koni',
      category: 'Do‘kon & Profil',
      icon: <ShoppingBag className="w-4 h-4 text-emerald-400" />,
      action: () => onNavigate('shop'),
    },
    {
      id: 'profile',
      title: 'Shaxsiy Kabinet & Sozlamalar',
      category: 'Do‘kon & Profil',
      icon: <User className="w-4 h-4 text-[#8d9094]" />,
      action: () => onNavigate('profile'),
    },
  ];

  const filteredItems = commandItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      soundFX.playClick();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
        soundFX.playClick();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
        soundFX.playClick();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          soundFX.playSelect();
          filteredItems[selectedIndex].action();
          onClose();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-start justify-center pt-[12vh] px-4 animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Palette Container */}
      <div className="relative w-full max-w-xl bg-[#1c1e21] border border-[rgba(255,255,255,0.12)] rounded-2xl shadow-2xl overflow-hidden z-10 animate-scaleIn">
        {/* Search Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[rgba(255,255,255,0.08)] bg-[#202226]">
          <Search className="w-5 h-5 text-[#5cc4b6] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Qidirish yoki buyruq kiritish... (Masalan: Test, Xarita, Reyting)"
            className="w-full bg-transparent text-sm text-[#e9eaeb] placeholder-[#8d9094] focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] text-[#8d9094] hover:text-[#e9eaeb] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#8d9094]">
              Hech qanday bo‘lim yoki buyruq topilmadi
            </div>
          ) : (
            filteredItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  soundFX.playSelect();
                  item.action();
                  onClose();
                }}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs text-left transition-all ${
                  idx === selectedIndex
                    ? 'bg-[#2fb3a3]/15 text-[#e9eaeb] border border-[#2fb3a3]/40'
                    : 'text-[#b7b9bc] hover:bg-[rgba(255,255,255,0.03)] border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`p-2 rounded-lg ${
                      idx === selectedIndex ? 'bg-[#2fb3a3]/20' : 'bg-[#25272b]'
                    }`}
                  >
                    {item.icon}
                  </div>
                  <div className="truncate">
                    <p className="font-semibold text-[#e9eaeb] truncate">{item.title}</p>
                    <p className="text-[10px] text-[#8d9094]">{item.category}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {item.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-[rgba(255,255,255,0.06)] text-[#5cc4b6] font-medium">
                      {item.badge}
                    </span>
                  )}
                  {item.shortcut ? (
                    <kbd className="px-1.5 py-0.5 rounded bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.1)] text-[10px] font-mono text-[#8d9094]">
                      {item.shortcut}
                    </kbd>
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 text-[#8d9094] opacity-0 group-hover:opacity-100" />
                  )}
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer Hotkey Guide */}
        <div className="px-4 py-2.5 bg-[#17181a] border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between text-[11px] text-[#8d9094]">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-[rgba(255,255,255,0.06)] font-mono text-[10px] text-[#e9eaeb]">↑↓</kbd> navigatsiya
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-[rgba(255,255,255,0.06)] font-mono text-[10px] text-[#e9eaeb]">↵</kbd> tanlash
            </span>
          </div>
          <span>
            <kbd className="px-1.5 py-0.5 rounded bg-[rgba(255,255,255,0.06)] font-mono text-[10px] text-[#e9eaeb]">ESC</kbd> yopish
          </span>
        </div>
      </div>
    </div>
  );
};
