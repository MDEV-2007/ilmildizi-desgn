import React, { useState } from 'react';
import { Database, Plus, Search, Filter, Trash2, CheckCircle2, Edit2 } from 'lucide-react';
import { ScreenId } from '../../../types';
import { Badge } from '../../ui/Badge';
import { MOCK_QUESTIONS } from '../../../data/mockData';

interface AdminQuestionsScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const AdminQuestionsScreen: React.FC<AdminQuestionsScreenProps> = ({
  onNavigate,
}) => {
  const [questions, setQuestions] = useState(MOCK_QUESTIONS);
  const [search, setSearch] = useState('');

  const filtered = questions.filter((q) =>
    q.questionText.toLowerCase().includes(search.toLowerCase()) ||
    q.topic.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#e9eaeb] flex items-center gap-2.5">
            <Database className="w-6 h-6 text-[#2fb3a3]" />
            <span>Savollar Banki & Ekspert Audit</span>
          </h1>
          <p className="text-xs text-[#8d9094] mt-0.5">
            Barcha 6 xil formatdagi 14,000+ imtihon savollarini nazorat qilish va yangilash
          </p>
        </div>

        <button
          onClick={() => onNavigate('teacher_builder')}
          className="px-4 py-2.5 rounded-xl bg-[#2fb3a3] hover:bg-[#269488] text-[#0d1416] text-xs font-bold flex items-center gap-2 shadow-md shadow-[#2fb3a3]/20 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi Savol Kiritish</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative w-full sm:w-80">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8d9094]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Mavzu yoki savol matni bo'yicha qidiruv..."
          className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#202226] border border-[rgba(255,255,255,0.08)] text-xs text-[#e9eaeb] placeholder-[#8d9094] focus:outline-none focus:border-[#2fb3a3]"
        />
      </div>

      {/* Question Cards List */}
      <div className="space-y-3">
        {filtered.map((q, idx) => (
          <div
            key={q.id}
            className="glass-card p-5 rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[#202226] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#5cc4b6] bg-[#2fb3a3]/10 px-2 py-0.5 rounded">
                  {q.type.toUpperCase()}
                </span>
                <span className="text-xs text-[#8d9094]">{q.topic}</span>
                <Badge variant={q.difficulty === 'hard' ? 'danger' : 'accent'} size="sm">
                  {q.points} Ball
                </Badge>
              </div>
              <h3 className="text-sm font-bold text-[#e9eaeb] line-clamp-2">
                {q.questionText}
              </h3>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              <button className="p-2 rounded-xl bg-[#25272b] hover:bg-[#2fb3a3] hover:text-[#0d1416] text-[#b7b9bc] transition-colors">
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setQuestions(questions.filter((item) => item.id !== q.id))}
                className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
