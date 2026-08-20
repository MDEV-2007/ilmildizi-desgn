import React, { useState } from 'react';
import {
  FileCheck2,
  Shuffle,
  Search,
  Clock,
  HelpCircle,
  Lock,
  ArrowRight,
  Sparkles,
  Award,
  Layers,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';
import { ScreenId } from '../../../types';
import { Badge } from '../../ui/Badge';
import { soundFX } from '../../../utils/soundFX';

interface TestCenterScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onStartTest: (testId: string) => void;
}

export const TestCenterScreen: React.FC<TestCenterScreenProps> = ({
  onNavigate,
  onStartTest,
}) => {
  const [selectedSubject, setSelectedSubject] = useState('O‘zbekiston Tarixi');
  const [selectedCategory, setSelectedCategory] = useState('Barchasi');
  const [searchQuery, setSearchQuery] = useState('');

  const subjects = [
    'O‘zbekiston Tarixi',
    'Jahon Tarixi',
    'Milliy Sertifikat (Kompleks)',
    'Ona tili & Adabiyot',
  ];
  const categories = ['Barchasi', 'Milliy Sertifikat', 'Tarix', 'BBA'];

  const testList = [
    {
      id: 't_history_cert_01',
      title: 'Milliy Sertifikat: O‘zbekiston va Jahon Tarixi (Variant #4)',
      category: 'Milliy Sertifikat',
      subject: 'O‘zbekiston Tarixi',
      duration: '60 daqiqa',
      questionCount: 30,
      description:
        'Qadimgi davrdan to yangi davrgacha bo‘lgan 6 xil formatdagi rasmli, jadvalli va ochiq savollar to‘plami.',
      isPremium: false,
      difficulty: 'O‘rta-Qiyin',
      diffColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      badge: 'Rasmiy Format',
    },
    {
      id: 't_temurids_02',
      title: 'Temuriylar Davlati va Madaniyati Maxsus Diagnostika',
      category: 'Tarix',
      subject: 'O‘zbekiston Tarixi',
      duration: '45 daqiqa',
      questionCount: 25,
      description:
        'Amir Temur harbiy san’ati, Mirzo Ulug‘bek ilmiy merosi va Temuriy me’moriy yodgorliklari tahlili.',
      isPremium: false,
      difficulty: 'O‘rta',
      diffColor: 'text-[#7ad192] bg-[#52a86b]/10 border-[#52a86b]/20',
      badge: 'Mavzulashtirilgan',
    },
    {
      id: 't_bba_full_03',
      title: 'BBA 2026 Standart Tarix Blok Testi #7',
      category: 'BBA',
      subject: 'O‘zbekiston Tarixi',
      duration: '40 daqiqa',
      questionCount: 30,
      description:
        'Davlat Test Markazi (BBA) andozasidagi majburiy va asosiy blok savollari va xronologiya.',
      isPremium: false,
      difficulty: 'Standart',
      diffColor: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
      badge: 'DTB 2026',
    },
    {
      id: 't_khanates_04',
      title: 'Xiva, Qo‘qon va Buxoro Xonliklari Maxsus Imtihon',
      category: 'Tarix',
      subject: 'O‘zbekiston Tarixi',
      duration: '35 daqiqa',
      questionCount: 20,
      description:
        'Xonliklar davri ma’muriy tuzilishi, soliqlar tizimi va tashqi aloqalar tahlili.',
      isPremium: true,
      difficulty: 'Qiyin',
      diffColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
      badge: 'Ekspert',
    },
    {
      id: 't_jadid_05',
      title: 'Jadidchilik Harakati va Matbuoti Ekspert Testi',
      category: 'Milliy Sertifikat',
      subject: 'O‘zbekiston Tarixi',
      duration: '30 daqiqa',
      questionCount: 15,
      description:
        'Behbudiy, Munavvarqori, Fitrat va Avloniy faoliyatiga oid chuqurlashtirilgan savollar.',
      isPremium: true,
      difficulty: 'Ekspert',
      diffColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      badge: 'PRO',
    },
  ];

  const filteredTests = testList.filter((t) => {
    const matchCategory =
      selectedCategory === 'Barchasi' || t.category === selectedCategory;
    const matchSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header Banner */}
      <div className="bento-card p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#181c24] via-[#14171d] to-[#181c24]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#2fb3a3]/15 text-[#5cc4b6] border border-[#2fb3a3]/25">
              BBA & Milliy Sertifikat
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#f0f1f3] tracking-tight font-voice">
            Test va Imtihonlar Markazi
          </h1>
          <p className="text-xs sm:text-sm text-[#a3a7ae] mt-1 max-w-xl">
            Davlat imtihonlariga 100% moslashgan vaqt me’yori, baholash mezonlari va xatolar ustida ishlash tizimi.
          </p>
        </div>

        <button
          onClick={() => {
            soundFX.playSelect();
            onStartTest('t_history_cert_01');
          }}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#2fb3a3] to-[#269488] hover:from-[#269488] hover:to-[#1e7a70] text-[#07090b] text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#2fb3a3]/20 self-start sm:self-auto tactile-btn transition-all shrink-0"
        >
          <Shuffle className="w-4 h-4" />
          <span>Tasodifiy Test Boshlash</span>
        </button>
      </div>

      {/* 2. Fanlar Tanlash Qatori */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {subjects.map((sub) => (
          <button
            key={sub}
            onClick={() => {
              soundFX.playClick();
              setSelectedSubject(sub);
            }}
            className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all tactile-btn ${
              selectedSubject === sub
                ? 'bg-[#2fb3a3] text-[#07090b] shadow-md shadow-[#2fb3a3]/20 font-bold'
                : 'bg-[#14171d] text-[#8d9094] hover:text-[#f0f1f3] border border-[rgba(255,255,255,0.07)]'
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      {/* 3. Kategoriya Filtr Tugmalari + Qidiruv Input */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-[#14171d] border border-[rgba(255,255,255,0.08)] rounded-2xl self-start">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundFX.playClick();
                setSelectedCategory(cat);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#2fb3a3]/20 text-[#5cc4b6] border border-[#2fb3a3]/40'
                  : 'text-[#8d9094] hover:text-[#f0f1f3]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8d9094]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Test nomi bo‘yicha qidirish..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#14171d] border border-[rgba(255,255,255,0.08)] text-xs text-[#f0f1f3] placeholder-[#737882] focus:outline-none focus:border-[#2fb3a3] transition-colors"
          />
        </div>
      </div>

      {/* 4. Statistika Bar */}
      <div className="flex items-center justify-between text-xs text-[#8d9094] px-1 font-mono">
        <span>
          Jami urinishlar: <strong className="text-[#f0f1f3]">148 ta</strong> · O‘rtacha:{' '}
          <strong className="text-[#5cc4b6]">86.4% (A+)</strong>
        </span>
        <span>{filteredTests.length} ta test topildi</span>
      </div>

      {/* 5. Modern Bento Test Kartalari */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTests.map((test) => (
          <div
            key={test.id}
            className="bento-card p-5 flex flex-col justify-between bg-[#14171d] border border-[rgba(255,255,255,0.08)] group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-[#2fb3a3]/10 text-[#5cc4b6] border border-[#2fb3a3]/20">
                  {test.badge}
                </span>
                <span className="text-[11px] text-[#8d9094] flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  {test.duration}
                </span>
              </div>

              <h3 className="text-sm sm:text-base font-bold text-[#f0f1f3] group-hover:text-[#5cc4b6] transition-colors leading-snug mb-2 font-voice">
                {test.title}
              </h3>

              <p className="text-xs text-[#8d9094] line-clamp-2 leading-relaxed mb-4">
                {test.description}
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between text-[11px] py-2.5 border-t border-[rgba(255,255,255,0.06)] mb-3 text-[#8d9094]">
                <span className="flex items-center gap-1 font-mono">
                  <HelpCircle className="w-3.5 h-3.5 text-[#5cc4b6]" />
                  {test.questionCount} ta savol
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${test.diffColor}`}>
                  {test.difficulty}
                </span>
              </div>

              {test.isPremium ? (
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-rose-400 font-semibold flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" />
                    Premium kerak
                  </span>
                  <button
                    onClick={() => {
                      soundFX.playClick();
                      onNavigate('premium');
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-colors shadow-sm"
                  >
                    Ochish
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    soundFX.playSelect();
                    onStartTest(test.id);
                  }}
                  className="w-full py-3 rounded-2xl bg-[rgba(255,255,255,0.04)] hover:bg-[#2fb3a3] hover:text-[#07090b] text-[#f0f1f3] text-xs font-bold flex items-center justify-center gap-2 border border-[rgba(255,255,255,0.08)] transition-all group-hover:bg-[#2fb3a3] group-hover:text-[#07090b] group-hover:border-transparent tactile-btn shadow-sm"
                >
                  <span>Testni Boshlash</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
