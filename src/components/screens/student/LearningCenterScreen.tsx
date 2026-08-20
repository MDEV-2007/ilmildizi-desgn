import React, { useState } from 'react';
import {
  BookOpen,
  Star,
  PlayCircle,
  Volume2,
  Lock,
  ChevronRight,
  Sparkles,
  Layers,
  CheckCircle2,
  Pause,
} from 'lucide-react';
import { ScreenId } from '../../../types';
import { Badge } from '../../ui/Badge';
import { soundFX } from '../../../utils/soundFX';

interface LearningCenterScreenProps {
  isPremium: boolean;
  onNavigate: (screen: ScreenId) => void;
}

export const LearningCenterScreen: React.FC<LearningCenterScreenProps> = ({
  isPremium,
  onNavigate,
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState('t1');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const topics = [
    { id: 't1', title: 'Temuriylar davlati va madaniyati', lessons: 5, active: true },
    { id: 't2', title: 'Qadimgi Baqtriya va So‘g‘diyona', lessons: 4 },
    { id: 't3', title: 'Xonliklar davri (Xiva, Qo‘qon, Buxoro)', lessons: 6 },
    { id: 't4', title: 'Turkistonda Jadidchilik harakati', lessons: 5 },
    { id: 't5', title: 'Ikkinchi jahon urushida O‘zbekiston', lessons: 3 },
  ];

  const flashcards = [
    { front: 'Mirzo Ulug‘bek rasadxonasi qaysi yilda barpo etilgan?', back: '1424–1429-yillarda Samarqandda (Ko‘hak tepaligida).' },
    { front: '“Temur tuzuklari” asarining asosiy g‘oyasi nima?', back: '“Kuch — adolatdadir” shiori ostida davlatni adolatli boshqarish qoidalari.' },
    { front: 'Shohruhiya shahriga kim tomonidan asos solingan?', back: 'Amir Temur tomonidan o‘g‘li Shohruh sharafiga (Sirdaryo bo‘yida).' },
    { front: 'Alisher Navoiy qaysi yillarda vazirlik lavozimida xizmat qilgan?', back: '1472-yildan Husayn Boyqaro saroyida muhrdor va bosh vazir.' },
  ];

  const toggleFlip = (idx: number) => {
    soundFX.playClick();
    setFlippedCards({ ...flippedCards, [idx]: !flippedCards[idx] });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner if not premium */}
      {!isPremium && (
        <div
          onClick={() => {
            soundFX.playClick();
            onNavigate('premium');
          }}
          className="bento-card p-4 bg-amber-500/10 border-amber-500/20 text-amber-300 text-xs flex items-center justify-between cursor-pointer hover:bg-amber-500/15 transition-colors tactile-btn"
        >
          <div className="flex items-center gap-2.5">
            <Lock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Premium imtiyozi:</strong> Barcha audio konspektlar, xronologik xaritalar va ekspert darslariga to‘liq kirish imkoniyati.
            </span>
          </div>
          <span className="font-bold underline text-amber-400 font-mono">Tariflar →</span>
        </div>
      )}

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Topics Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8d9094]">
            Mavzular & Modullar
          </h3>
          <div className="space-y-2">
            {topics.map((top) => (
              <button
                key={top.id}
                onClick={() => {
                  soundFX.playClick();
                  setSelectedTopicId(top.id);
                }}
                className={`w-full p-4 rounded-2xl text-left text-xs transition-all flex items-center justify-between tactile-btn ${
                  selectedTopicId === top.id
                    ? 'bg-[#2fb3a3] text-[#07090b] font-bold shadow-md shadow-[#2fb3a3]/20'
                    : 'bento-card bg-[#14171d] text-[#a3a7ae] hover:text-[#f0f1f3]'
                }`}
              >
                <div className="min-w-0 pr-2">
                  <p className="truncate font-semibold">{top.title}</p>
                  <span
                    className={`text-[10px] block mt-0.5 ${
                      selectedTopicId === top.id
                        ? 'text-[#07090b]/80'
                        : 'text-[#8d9094]'
                    }`}
                  >
                    {top.lessons} ta dars · 4 flashcard
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 shrink-0 opacity-70" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Main Content (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Lesson Header & Bookmark */}
          <div className="bento-card p-6 bg-[#14171d] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-[#5cc4b6] bg-[#2fb3a3]/10 px-2.5 py-1 rounded-md border border-[#2fb3a3]/20">
                1-Dars · Temuriylar Davri
              </span>
              <button
                onClick={() => {
                  soundFX.playClick();
                  setIsBookmarked(!isBookmarked);
                }}
                className={`p-2.5 rounded-xl transition-colors tactile-btn ${
                  isBookmarked
                    ? 'bg-amber-500/20 text-amber-400'
                    : 'bg-[#1a1e26] text-[#8d9094] hover:text-[#f0f1f3]'
                }`}
                title="Saqlab qo‘yish"
              >
                <Star className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
              </button>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-[#f0f1f3] font-voice leading-snug">
              Amir Temur davlati boshqaruv tizimi va 'Temur tuzuklari'
            </h1>

            <div className="text-xs text-[#a3a7ae] leading-relaxed space-y-3 pt-3 border-t border-[rgba(255,255,255,0.06)]">
              <p>
                Amir Temur davlat boshqaruvida markazlashgan hokimiyatni mustahkamlashga alohida e’tibor qaratdi. Mamlakat viloyat va tumanlarga bo‘lingan bo‘lib, ularni Temuriy shahzodalar (suyurg‘ol egalari) va sadoqatli amirlar boshqargan.
              </p>
              <p>
                <strong className="text-[#f0f1f3]">Devonbegi (Bosh vazir)</strong> — davlatning moliya va ma’muriy ishlariga mas’ul bo‘lgan. <strong className="text-[#f0f1f3]">Tavochi</strong> lavozimidagi shaxslar esa qo‘shin yig‘ish, harbiy ko‘riklarni o‘tkazish va o‘lponlarni taqsimlash bilan shug‘ullangan.
              </p>
            </div>

            {/* Audio Player Widget */}
            <div className="p-4 rounded-2xl bg-[#1a1e26] border border-[rgba(255,255,255,0.06)] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#2fb3a3]/15 text-[#5cc4b6] flex items-center justify-center">
                  <Volume2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#f0f1f3]">
                    Audio Dars: Davlat tuzilishi konspekti
                  </p>
                  <p className="text-[10px] text-[#8d9094]">
                    Davomiyligi: 08:45 daqiqa · Professional suxandon ovozida
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  soundFX.playClick();
                  setIsPlayingAudio(!isPlayingAudio);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 tactile-btn ${
                  isPlayingAudio
                    ? 'bg-amber-500 text-black'
                    : 'bg-[#2fb3a3] text-[#07090b] hover:bg-[#269488]'
                }`}
              >
                {isPlayingAudio ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>To‘xtatish</span>
                  </>
                ) : (
                  <>
                    <PlayCircle className="w-3.5 h-3.5" />
                    <span>Tinglash</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Flashcards 2-Column Grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#8d9094] flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#5cc4b6]" />
                <span>Interaktiv Flashcardlar (Xotira kartalari)</span>
              </h3>
              <span className="text-[11px] text-[#8d9094]">
                Kartani bosib javobni tekshiring
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {flashcards.map((card, idx) => {
                const isFlipped = !!flippedCards[idx];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleFlip(idx)}
                    className={`bento-card p-5 transition-all cursor-pointer min-h-[130px] flex flex-col justify-between tactile-btn ${
                      isFlipped
                        ? 'border-[#2fb3a3] bg-[rgba(47,179,163,0.12)]'
                        : 'bg-[#14171d] hover:border-[rgba(255,255,255,0.14)]'
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[#8d9094] block mb-1.5 font-mono">
                        {isFlipped ? 'Javob / Izoh' : 'Savol'}
                      </span>
                      <p className={`text-xs font-semibold leading-relaxed ${isFlipped ? 'text-[#5cc4b6]' : 'text-[#f0f1f3]'}`}>
                        {isFlipped ? card.back : card.front}
                      </p>
                    </div>
                    <span className="text-[10px] text-[#8d9094] text-right font-medium">
                      {isFlipped ? 'Qaytarish ↺' : 'Javobni ko‘rish ↷'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
