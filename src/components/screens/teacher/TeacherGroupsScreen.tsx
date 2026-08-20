import React, { useState } from 'react';
import { Users, Plus, BookOpen, Clock, Send, CheckCircle2, ChevronRight, Search } from 'lucide-react';
import { ScreenId } from '../../../types';
import { Badge } from '../../ui/Badge';

interface TeacherGroupsScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const TeacherGroupsScreen: React.FC<TeacherGroupsScreenProps> = ({
  onNavigate,
}) => {
  const [selectedGroupId, setSelectedGroupId] = useState('g1');

  const groups = [
    { id: 'g1', name: 'Milliy Sertifikat Tarix — A+ Intensiv 2026', code: 'HIST-2026-A', students: 28, avgScore: 88.4 },
    { id: 'g2', name: 'BBA 1-Blok Tarix Asosiy Guruh', code: 'BBA-HIST-01', students: 34, avgScore: 82.1 },
    { id: 'g3', name: 'Tarix Olimpiada va Maxsus Tayyorgarlik', code: 'OLIMP-HIST', students: 16, avgScore: 94.6 },
  ];

  const studentsList = [
    { name: 'Sardorbek Rahimov', phone: '+998 90 123-45-67', score: 92, testsDone: 14, lastActive: 'Bugun' },
    { name: 'Shahnoza Alimova', phone: '+998 91 987-65-43', score: 88, testsDone: 12, lastActive: 'Bugun' },
    { name: 'Jasur Mirzayev', phone: '+998 93 456-78-90', score: 76, testsDone: 9, lastActive: 'Kecha' },
    { name: 'Malika Umarova', phone: '+998 97 111-22-33', score: 95, testsDone: 15, lastActive: 'Bugun' },
    { name: 'Bobur Yoqubov', phone: '+998 94 333-44-55', score: 84, testsDone: 11, lastActive: '3 kun oldin' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#e9eaeb] flex items-center gap-2.5">
            <Users className="w-6 h-6 text-[#2fb3a3]" />
            <span>O'quv Guruhlari Boshqaruvi</span>
          </h1>
          <p className="text-xs text-[#8d9094] mt-0.5">
            Guruhlar ro'yxati, o'quvchilar reytingi va maxsus topshiriqlar taqsimoti
          </p>
        </div>

        <button className="px-4 py-2.5 rounded-xl bg-[#2fb3a3] hover:bg-[#269488] text-[#0d1416] text-xs font-bold flex items-center gap-2 shadow-md shadow-[#2fb3a3]/20 self-start sm:self-auto">
          <Plus className="w-4 h-4" />
          <span>Yangi Guruh Qo'shish</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Groups List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8d9094]">
            Guruhlar ({groups.length})
          </h3>
          <div className="space-y-2">
            {groups.map((grp) => (
              <button
                key={grp.id}
                onClick={() => setSelectedGroupId(grp.id)}
                className={`w-full p-4 rounded-2xl text-left text-xs transition-all flex flex-col justify-between ${
                  selectedGroupId === grp.id
                    ? 'border-2 border-[#2fb3a3] bg-[rgba(47,179,163,0.12)]'
                    : 'glass-card border border-[rgba(255,255,255,0.08)] bg-[#202226] text-[#b7b9bc] hover:border-[rgba(255,255,255,0.15)]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-[#5cc4b6] font-bold">
                    {grp.code}
                  </span>
                  <span className="text-xs font-bold text-[#93bf96]">{grp.avgScore}%</span>
                </div>
                <h4 className="text-sm font-bold text-[#e9eaeb] mb-2">{grp.name}</h4>
                <div className="flex items-center justify-between text-[11px] text-[#8d9094] pt-2 border-t border-[rgba(255,255,255,0.05)]">
                  <span>{grp.students} ta o'quvchi</span>
                  <span className="text-[#5cc4b6] font-semibold">Tahrirlash →</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Students in Group (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="glass-card p-5 sm:p-6 rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[#202226] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-[#e9eaeb]">
                  Guruh O'quvchilari Ro'yxati
                </h3>
                <p className="text-xs text-[#8d9094]">
                  Guruh kodi: <strong className="text-[#5cc4b6]">HIST-2026-A</strong> (O'quvchilar ulanishi uchun)
                </p>
              </div>

              <button
                onClick={() => onNavigate('teacher_builder')}
                className="px-3.5 py-2 rounded-xl bg-[rgba(255,255,255,0.06)] hover:bg-[#2fb3a3] hover:text-[#0d1416] text-[#e9eaeb] text-xs font-bold transition-colors flex items-center gap-1.5 self-start sm:self-auto"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Guruhga Test Biriktirish</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="text-[#8d9094] border-b border-[rgba(255,255,255,0.08)]">
                  <tr>
                    <th className="py-2.5 font-bold">O'quvchi</th>
                    <th className="py-2.5 font-bold">Telefon</th>
                    <th className="py-2.5 font-bold">O'rtacha Ball</th>
                    <th className="py-2.5 font-bold">Testlar</th>
                    <th className="py-2.5 font-bold">Faollik</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(255,255,255,0.04)] text-[#e9eaeb]">
                  {studentsList.map((st, i) => (
                    <tr key={i} className="hover:bg-[rgba(255,255,255,0.02)]">
                      <td className="py-3 font-semibold">{st.name}</td>
                      <td className="py-3 text-[#8d9094] font-mono">{st.phone}</td>
                      <td className="py-3 font-bold text-[#5cc4b6]">{st.score}%</td>
                      <td className="py-3">{st.testsDone} ta</td>
                      <td className="py-3 text-[#8d9094]">{st.lastActive}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
