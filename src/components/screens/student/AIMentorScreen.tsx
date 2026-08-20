import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  User,
  Sparkles,
  HelpCircle,
  Lightbulb,
  Zap,
  Bookmark,
  RefreshCw,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { UserProfile, ScreenId } from '../../../types';
import { Badge } from '../../ui/Badge';
import { soundFX } from '../../../utils/soundFX';

interface AIMentorScreenProps {
  user: UserProfile;
  onNavigate: (screen: ScreenId) => void;
}

export const AIMentorScreen: React.FC<AIMentorScreenProps> = ({
  user,
  onNavigate,
}) => {
  const [messages, setMessages] = useState<
    { sender: 'user' | 'ai'; text: string; time: string }[]
  >([
    {
      sender: 'ai',
      text: `Assalomu alaykum, ${user.name}! Men IlmIldizi platformasining Tarix va Milliy Sertifikat bo‘yicha ixtisoslashgan AI Mentoriman. O‘zbekiston va Jahon tarixining qiyin davrlari, xronologiya, me’moriy obidalar yoki BBA testlari bo‘yicha savollaringiz bormi?`,
      time: '14:20',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const samplePrompts = [
    'Somoniylar davlatida qaysi 10 ta devon faoliyat yuritgan?',
    'Milliy Sertifikatda me’morchilik va xaritali savollarni yechish sirlari',
    'Amir Temurning 5 yillik yurishi davomida qaysi hududlar egallangan?',
    'Jadidchilik harakatida "Usuli savtiya" maktablarining ahamiyati nima?',
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    soundFX.playClick();
    const newMsg = {
      sender: 'user' as const,
      text: query,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponse =
        'Ajoyib savol! Tarixiy manbalar va Milliy Sertifikat imtihoni mezonlariga ko‘ra, ushbu mavzuni o‘rganishda quyidagi 3 ta jihatga e’tibor qaratish lozim:\n\n1. Voqeaning aniq yillari va davriy chegaralari.\n2. Sabab-oqibat zanjiri va ijtimoiy-iqtisodiy natijalari.\n3. Tarixiy allomalar va asarlar nomlari.';

      if (query.toLowerCase().includes('somoniy')) {
        aiResponse =
          'Somoniylar davlati (875–999-yillar) davrida Buxoroda 10 ta devon tashkil etilgan: Devon al-Vazir (Bosh vazir), Devon al-Mustavfiy (Moliya), Devon ar-Rasoil (Kotibiyat), Devon al-Mushrif (Nazorat), Devon ash-Shurta (Politsiya/Ichki tartib), Devon al-Jund (Harbiy ishlar) va boshqalar. Bu markazlashgan boshqaruvning mustahkamligini ta’minlagan.';
      } else if (query.toLowerCase().includes('temur')) {
        aiResponse =
          'Amir Temurning 5 yillik yurishi (1392–1396-yillar) davomida G‘arbiy Eron, Iroq, Janubiy Kavkaz (Gruziya, Armaniston) va Oltin O‘rda bo‘ysundirildi. 1395-yil 15-apreldagi Terek daryosi bo‘yidagi jangda To‘xtamishxon butunlay tor-mor etilgan.';
      } else if (query.toLowerCase().includes('sertifikat') || query.toLowerCase().includes('me’mor')) {
        aiResponse =
          'Milliy Sertifikatda me’morchilik savollari bo‘yicha maslahat:\n- Qaysi hukmdor tomonidan qurilgani;\n- Joylashgan shahri (Samarqand, Buxoro, Xiva, Shahrisabz);\n- Gumbaz va peshtoqlarining me’moriy uslubi va asriga e’tibor bering (masalan: Bibixonim jome masjidi — 1399–1404-yillar, Amir Temur farmoni bilan).';
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: aiResponse,
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ]);
      setIsTyping(false);
      soundFX.playCorrect();
    }, 900);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5 pb-12">
      {/* Top Header Banner */}
      <div className="bento-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#171824] via-[#14171d] to-[#181c24] border-indigo-500/20">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-[#f0f1f3] font-voice">
                Tarixchi AI Mentor 24/7
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#52a86b]/15 text-[#7ad192] border border-[#52a86b]/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#52a86b] animate-ping" />
                Online
              </span>
            </div>
            <p className="text-xs text-[#a3a7ae] mt-0.5">
              O‘zbekiston va Jahon tarixi bo‘yicha savol-javob, konspekt va tahliliy ko‘makchi.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            soundFX.playClick();
            setMessages([
              {
                sender: 'ai',
                text: 'Suhbat tarixi tozalandi. Yangi savolingizni berishingiz mumkin!',
                time: new Date().toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                }),
              },
            ]);
          }}
          className="px-3.5 py-2 rounded-xl bg-[#1a1e26] text-[#8d9094] hover:text-[#f0f1f3] text-xs font-semibold flex items-center gap-1.5 border border-[rgba(255,255,255,0.08)] self-start sm:self-auto tactile-btn"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Tozalash</span>
        </button>
      </div>

      {/* Recommended Prompt Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {samplePrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(p)}
            className="bento-card px-3.5 py-2 text-xs text-[#a3a7ae] hover:text-[#f0f1f3] hover:border-indigo-500/40 whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 bg-[#14171d] tactile-btn"
          >
            <Sparkles className="w-3 h-3 text-indigo-400" />
            <span>{p}</span>
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div className="bento-card p-5 sm:p-6 bg-[#14171d] min-h-[420px] max-h-[550px] overflow-y-auto space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 ${
              msg.sender === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div
              className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-[#2fb3a3] text-[#07090b] font-bold text-xs'
                  : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
              }`}
            >
              {msg.sender === 'user' ? 'Siz' : <Bot className="w-5 h-5" />}
            </div>

            <div
              className={`max-w-[82%] sm:max-w-[70%] p-4 rounded-3xl text-xs sm:text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-[#2fb3a3] text-[#07090b] font-medium rounded-tr-sm'
                  : 'bg-[#1a1e26] text-[#f0f1f3] border border-[rgba(255,255,255,0.07)] rounded-tl-sm whitespace-pre-line'
              }`}
            >
              <p>{msg.text}</p>
              <span
                className={`text-[10px] block mt-1.5 text-right font-mono ${
                  msg.sender === 'user'
                    ? 'text-[#07090b]/70'
                    : 'text-[#8d9094]'
                }`}
              >
                {msg.time}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div className="p-3.5 rounded-2xl bg-[#1a1e26] border border-[rgba(255,255,255,0.07)] flex items-center gap-1.5 text-xs text-[#8d9094]">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce delay-100" />
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce delay-200" />
              <span className="ml-1 font-mono">Tarixiy manbalar tahlil qilinmoqda...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Box */}
      <div className="bento-card p-2.5 bg-[#14171d] border border-[rgba(255,255,255,0.08)] flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Tarix yoki test savolini yozing (masalan: '1370-yil Balx qurultoyida...')"
          className="flex-1 px-4 py-3 bg-transparent text-xs sm:text-sm text-[#f0f1f3] placeholder-[#737882] focus:outline-none"
        />
        <button
          onClick={() => handleSend()}
          disabled={!inputText.trim()}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#2fb3a3] to-[#269488] hover:from-[#269488] hover:to-[#1e7a70] disabled:opacity-40 text-[#07090b] text-xs font-bold flex items-center gap-2 shadow-md shadow-[#2fb3a3]/20 transition-all tactile-btn shrink-0"
        >
          <span>Yuborish</span>
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
