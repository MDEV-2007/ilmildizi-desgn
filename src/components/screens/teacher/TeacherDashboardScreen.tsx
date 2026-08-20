import React, { useState } from 'react';
import {
  Users,
  GraduationCap,
  TrendingUp,
  FileSpreadsheet,
  Plus,
  ArrowRight,
  Sparkles,
  BookOpen,
  Send,
  MoreVertical,
} from 'lucide-react';
import { UserProfile, ScreenId } from '../../../types';
import { Badge } from '../../ui/Badge';

interface TeacherDashboardScreenProps {
  user: UserProfile;
  onNavigate: (screen: ScreenId) => void;
}

export const TeacherDashboardScreen: React.FC<TeacherDashboardScreenProps> = ({
  user,
  onNavigate,
}) => {
  const [groups, setGroups] = useState([
    { id: 'g1', name: 'Milliy Sertifikat Tarix — A+ Intensiv 2026', studentsCount: 28, avgScore: 88.4, testAssigned: 'Variant #4' },
    { id: 'g2', name: 'BBA 1-Blok Tarix Asosiy Guruh', studentsCount: 34, avgScore: 82.1, testAssigned: 'Diagnostika #12' },
    { id: 'g3', name: 'Tarix Olimpiada va Maxsus Tayyorgarlik', studentsCount: 16, avgScore: 94.6, testAssigned: 'Temuriylar Ekspert' },
  ]);

  const recentStudents = [
    { name: 'Sardorbek Rahimov', group: 'A+ Intensiv', score: 92, status: 'Topshirdi', date: 'Bugun, 14:10' },
    { name: 'Shahnoza Alimova', group: 'BBA 1-Blok', score: 86, status: 'Topshirdi', date: 'Bugun, 13:45' },
    { name: 'Jasur Mirzayev', group: 'A+ Intensiv', score: 74, status: 'Xatolik ko\'p', date: 'Kecha, 18:20' },
    { name: 'Dilnoza Karimova', group: 'Olimpiada', score: 98, status: 'Maksimal', date: 'Kecha, 16:30' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#e9eaeb] flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-[#2fb3a3]" />
              <span>O'qituvchi & Repetitor Kabineti</span>
            </h1>
            <Badge variant="accent">USTOZ</Badge>
          </div>
          <p className="text-xs text-[#8d9094] mt-0.5">
            O'quvchilar guruhlari, test topshiriqlari va jonli o'zlashtirish tahlillari
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('teacher_builder')}
            className="px-4 py-2.5 rounded-xl bg-[#2fb3a3] hover:bg-[#269488] text-[#0d1416] text-xs font-bold flex items-center gap-2 shadow-md shadow-[#2fb3a3]/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Yangi Test Tuzish</span>
          </button>
        </div>
      </div>

      {/* 2. 4-Column Stat Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="glass-card p-4 rounded-2xl border border-blue-500/20 bg-blue-500/5">
          <span className="text-[10px] font-bold uppercase text-blue-400">Jami O'quvchilar</span>
          <p className="text-2xl font-black text-[#e9eaeb] mt-1">78 nafar</p>
        </div>
        <div className="glass-card p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
          <span className="text-[10px] font-bold uppercase text-[#93bf96]">Faol Guruhlar</span>
          <p className="text-2xl font-black text-[#93bf96] mt-1">3 ta</p>
        </div>
        <div className="glass-card p-4 rounded-2xl border border-amber-500/20 bg-amber-500/5">
          <span className="text-[10px] font-bold uppercase text-amber-400">O'rtacha Natija</span>
          <p className="text-2xl font-black text-amber-300 mt-1">87.2%</p>
        </div>
        <div className="glass-card p-4 rounded-2xl border border-purple-500/20 bg-purple-500/5">
          <span className="text-[10px] font-bold uppercase text-purple-400">Topshirilgan Testlar</span>
          <p className="text-2xl font-black text-purple-300 mt-1">426 ta</p>
        </div>
      </div>

      {/* 3. Guruhlarim (Group Cards) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#e9eaeb] flex items-center gap-2">
            <Users className="w-4 h-4 text-[#5cc4b6]" />
            <span>O'quv Guruhlarim</span>
          </h2>
          <button
            onClick={() => onNavigate('teacher_groups')}
            className="text-xs text-[#5cc4b6] hover:underline font-bold"
          >
            Barcha guruhlar ({groups.length}) →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {groups.map((grp) => (
            <div
              key={grp.id}
              onClick={() => onNavigate('teacher_groups')}
              className="glass-card p-5 rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[#202226] hover:border-[#2fb3a3]/40 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <h3 className="text-sm font-bold text-[#e9eaeb] group-hover:text-[#5cc4b6] transition-colors mb-2">
                  {grp.name}
                </h3>
                <p className="text-xs text-[#8d9094] mb-3">
                  Faol vazifa: <strong className="text-[#e9eaeb]">{grp.testAssigned}</strong>
                </p>
              </div>

              <div className="flex items-center justify-between text-xs pt-3 border-t border-[rgba(255,255,255,0.06)]">
                <span className="text-[#8d9094]">{grp.studentsCount} o'quvchi</span>
                <span className="font-bold text-[#93bf96]">{grp.avgScore}% o'rtacha</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. O'quvchilarning Oxirgi Faolligi */}
      <div className="glass-card p-5 sm:p-6 rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[#202226] space-y-4">
        <h3 className="text-sm font-bold text-[#e9eaeb] flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span>O'quvchilarning Oxirgi Natijalari va Xatolari</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="text-[#8d9094] border-b border-[rgba(255,255,255,0.08)]">
              <tr>
                <th className="py-2.5 font-bold">O'quvchi</th>
                <th className="py-2.5 font-bold">Guruh</th>
                <th className="py-2.5 font-bold">Natija</th>
                <th className="py-2.5 font-bold">Holat</th>
                <th className="py-2.5 font-bold">Vaqt</th>
                <th className="py-2.5 font-bold text-right">Harakat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(255,255,255,0.04)] text-[#e9eaeb]">
              {recentStudents.map((st, i) => (
                <tr key={i} className="hover:bg-[rgba(255,255,255,0.02)]">
                  <td className="py-3 font-semibold">{st.name}</td>
                  <td className="py-3 text-[#8d9094]">{st.group}</td>
                  <td className="py-3 font-bold text-[#5cc4b6]">{st.score}%</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        st.score >= 90
                          ? 'bg-[#6b9b6f]/20 text-[#93bf96]'
                          : st.score >= 80
                          ? 'bg-blue-500/20 text-blue-300'
                          : 'bg-rose-500/20 text-rose-300'
                      }`}
                    >
                      {st.status}
                    </span>
                  </td>
                  <td className="py-3 text-[#8d9094]">{st.date}</td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => onNavigate('test_feedback')}
                      className="px-2.5 py-1 rounded-lg bg-[#25272b] hover:bg-[#2fb3a3] hover:text-[#0d1416] text-[#b7b9bc] text-[11px] font-semibold transition-colors"
                    >
                      Tahlil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
