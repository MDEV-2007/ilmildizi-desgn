import React, { useState } from 'react';
import {
  FilePlus2,
  Plus,
  Trash2,
  CheckCircle2,
  Save,
  Clock,
  Layers,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { ScreenId, QuestionType } from '../../../types';
import { Badge } from '../../ui/Badge';
import confetti from 'canvas-confetti';

interface TeacherTestBuilderScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const TeacherTestBuilderScreen: React.FC<TeacherTestBuilderScreenProps> = ({
  onNavigate,
}) => {
  const [testTitle, setTestTitle] = useState('Milliy Sertifikat: Temuriylar Davri Diagnostika Testi');
  const [durationMins, setDurationMins] = useState(45);
  const [subject, setSubject] = useState('O\'zbekiston Tarixi');
  const [questions, setQuestions] = useState([
    {
      id: 'q_build_1',
      type: 'single_choice' as QuestionType,
      text: 'Amir Temurning "Kuch — adolatdadir" shiori qaysi asarda bayon etilgan?',
      options: ['Temur tuzuklari', 'Zafarnoma', 'Tarixi Rashidiy', 'Boburnoma'],
      correct: 0,
      points: 2.1,
    },
    {
      id: 'q_build_2',
      type: 'single_choice' as QuestionType,
      text: 'Mirzo Ulug\'bek rasadxonasida nechanchi yillarda ilmiy tadqiqotlar olib borilgan?',
      options: ['1424–1429-yillar', '1370–1380-yillar', '1501–1510-yillar', '1400–1405-yillar'],
      correct: 0,
      points: 2.1,
    },
  ]);

  const handleAddQuestion = () => {
    const newQ = {
      id: `q_build_${Date.now()}`,
      type: 'single_choice' as QuestionType,
      text: 'Yangi savol matnini kiriting...',
      options: ['A varianti', 'B varianti', 'C varianti', 'D varianti'],
      correct: 0,
      points: 2.1,
    };
    setQuestions([...questions, newQ]);
  };

  const handleRemoveQuestion = (idx: number) => {
    setQuestions(questions.filter((_, i) => i !== idx));
  };

  const handlePublish = () => {
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    alert('Test muvaffaqiyatli nashr qilindi va o\'quvchilar guruhiga biriktirildi!');
    onNavigate('teacher_dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#e9eaeb] flex items-center gap-2.5">
            <FilePlus2 className="w-6 h-6 text-[#2fb3a3]" />
            <span>Yangi Test & Imtihon Konstruktori</span>
          </h1>
          <p className="text-xs text-[#8d9094] mt-0.5">
            Milliy Sertifikat va BBA formatidagi yangi testlarni yaratish va guruhlarga yuborish
          </p>
        </div>

        <button
          onClick={handlePublish}
          className="px-5 py-2.5 rounded-xl bg-[#2fb3a3] hover:bg-[#269488] text-[#0d1416] text-xs font-bold flex items-center gap-2 shadow-md shadow-[#2fb3a3]/20 self-start sm:self-auto transition-all"
        >
          <Save className="w-4 h-4" />
          <span>Testni Nashr Qilish</span>
        </button>
      </div>

      {/* Test Meta Configuration Card */}
      <div className="glass-card p-6 rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[#202226] space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8d9094]">
          Asosiy Parametrlar
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-xs font-bold text-[#e9eaeb]">Test Nomi</label>
            <input
              type="text"
              value={testTitle}
              onChange={(e) => setTestTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#25272b] border border-[rgba(255,255,255,0.08)] text-xs text-[#e9eaeb] focus:outline-none focus:border-[#2fb3a3]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#e9eaeb]">Vaqt Limiti (Daqiqa)</label>
            <input
              type="number"
              value={durationMins}
              onChange={(e) => setDurationMins(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl bg-[#25272b] border border-[rgba(255,255,255,0.08)] text-xs text-[#e9eaeb] focus:outline-none focus:border-[#2fb3a3]"
            />
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#e9eaeb] flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#5cc4b6]" />
            <span>Savollar Ro'yxati ({questions.length} ta savol)</span>
          </h3>
          <button
            onClick={handleAddQuestion}
            className="px-3.5 py-1.5 rounded-xl bg-[rgba(255,255,255,0.05)] hover:bg-[#2fb3a3] hover:text-[#0d1416] text-[#e9eaeb] text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Savol Qo'shish</span>
          </button>
        </div>

        {questions.map((q, idx) => (
          <div
            key={q.id}
            className="glass-card p-5 sm:p-6 rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[#202226] space-y-4 relative group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#5cc4b6]">
                Savol #{idx + 1}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#8d9094] font-semibold">
                  {q.points} Ball
                </span>
                <button
                  onClick={() => handleRemoveQuestion(idx)}
                  className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <textarea
              rows={2}
              value={q.text}
              onChange={(e) => {
                const newQs = [...questions];
                newQs[idx].text = e.target.value;
                setQuestions(newQs);
              }}
              className="w-full p-3 rounded-2xl bg-[#25272b] border border-[rgba(255,255,255,0.08)] text-xs text-[#e9eaeb] focus:outline-none focus:border-[#2fb3a3]"
            />

            {/* Options */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-[#8d9094] uppercase tracking-wider">
                Variantlar (To'g'ri variantni belgilang):
              </label>
              {q.options.map((opt, oIdx) => (
                <div key={oIdx} className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const newQs = [...questions];
                      newQs[idx].correct = oIdx;
                      setQuestions(newQs);
                    }}
                    className={`w-7 h-7 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 transition-colors ${
                      q.correct === oIdx
                        ? 'bg-[#6b9b6f] text-white'
                        : 'bg-[#25272b] text-[#8d9094]'
                    }`}
                  >
                    {['A', 'B', 'C', 'D'][oIdx]}
                  </button>
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => {
                      const newQs = [...questions];
                      newQs[idx].options[oIdx] = e.target.value;
                      setQuestions(newQs);
                    }}
                    className="flex-1 px-3 py-2 rounded-xl bg-[#25272b] border border-[rgba(255,255,255,0.06)] text-xs text-[#e9eaeb] focus:outline-none focus:border-[#2fb3a3]"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
