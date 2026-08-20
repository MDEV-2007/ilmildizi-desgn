import React, { useState } from 'react';
import { Users, Search, Shield, Ban, CheckCircle2, Edit3, MoreVertical } from 'lucide-react';
import { ScreenId, UserRole } from '../../../types';
import { Badge } from '../../ui/Badge';

interface AdminUsersScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const AdminUsersScreen: React.FC<AdminUsersScreenProps> = ({
  onNavigate,
}) => {
  const [roleFilter, setRoleFilter] = useState<'all' | UserRole>('all');
  const [search, setSearch] = useState('');

  const [usersList, setUsersList] = useState([
    { id: 'u1', name: 'Azizbek Temurov', phone: '+998 90 123-45-67', role: 'student' as UserRole, xp: 2450, coins: 420, isPremium: true, status: 'active' },
    { id: 'u2', name: 'Olimjon Qodirov', phone: '+998 91 234-56-78', role: 'teacher' as UserRole, xp: 8900, coins: 1200, isPremium: true, status: 'active' },
    { id: 'u3', name: 'Madinabonu Karimova', phone: '+998 93 345-67-89', role: 'student' as UserRole, xp: 1980, coins: 310, isPremium: false, status: 'active' },
    { id: 'u4', name: 'Rustam Omonov', phone: '+998 97 456-78-90', role: 'admin' as UserRole, xp: 12000, coins: 5000, isPremium: true, status: 'active' },
    { id: 'u5', name: 'Botir Zokirov', phone: '+998 99 567-89-01', role: 'student' as UserRole, xp: 450, coins: 80, isPremium: false, status: 'banned' },
  ]);

  const filteredUsers = usersList.filter((u) => {
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.phone.includes(search);
    return matchRole && matchSearch;
  });

  const toggleBan = (id: string) => {
    setUsersList(
      usersList.map((u) => (u.id === id ? { ...u, status: u.status === 'banned' ? 'active' : 'banned' } : u))
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#e9eaeb] flex items-center gap-2.5">
          <Users className="w-6 h-6 text-[#2fb3a3]" />
          <span>Foydalanuvchilar Boshqaruvi (CRM)</span>
        </h1>
        <p className="text-xs text-[#8d9094] mt-0.5">
          Ro'yxatdan o'tgan barcha o'quvchilar, ustozlar va administratorlar hisoblarini boshqarish
        </p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-[#202226] border border-[rgba(255,255,255,0.08)] rounded-xl self-start">
          {[
            { id: 'all', label: 'Barchasi' },
            { id: 'student', label: 'O\'quvchilar' },
            { id: 'teacher', label: 'Ustozlar' },
            { id: 'admin', label: 'Adminlar' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setRoleFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                roleFilter === tab.id
                  ? 'bg-[#2fb3a3] text-[#0d1416]'
                  : 'text-[#8d9094] hover:text-[#e9eaeb]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8d9094]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Ism yoki telefon orqali qidiruv..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#202226] border border-[rgba(255,255,255,0.08)] text-xs text-[#e9eaeb] placeholder-[#8d9094] focus:outline-none focus:border-[#2fb3a3]"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="glass-card p-5 sm:p-6 rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[#202226] overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="text-[#8d9094] border-b border-[rgba(255,255,255,0.08)]">
            <tr>
              <th className="py-2.5 font-bold">Foydalanuvchi</th>
              <th className="py-2.5 font-bold">Telefon</th>
              <th className="py-2.5 font-bold">Roli</th>
              <th className="py-2.5 font-bold">XP / Tanga</th>
              <th className="py-2.5 font-bold">Obuna</th>
              <th className="py-2.5 font-bold">Holat</th>
              <th className="py-2.5 font-bold text-right">Amal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(255,255,255,0.04)] text-[#e9eaeb]">
            {filteredUsers.map((u) => (
              <tr key={u.id} className="hover:bg-[rgba(255,255,255,0.02)]">
                <td className="py-3 font-semibold">{u.name}</td>
                <td className="py-3 font-mono text-[#8d9094]">{u.phone}</td>
                <td className="py-3 uppercase font-bold text-[10px] text-[#5cc4b6]">{u.role}</td>
                <td className="py-3">{u.xp} XP · {u.coins} 🪙</td>
                <td className="py-3">
                  {u.isPremium ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300">
                      PREMIUM
                    </span>
                  ) : (
                    <span className="text-[#8d9094]">Oddiy</span>
                  )}
                </td>
                <td className="py-3">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      u.status === 'active'
                        ? 'bg-[#6b9b6f]/20 text-[#93bf96]'
                        : 'bg-rose-500/20 text-rose-300'
                    }`}
                  >
                    {u.status === 'active' ? 'Faol' : 'Bloklangan'}
                  </span>
                </td>
                <td className="py-3 text-right">
                  <button
                    onClick={() => toggleBan(u.id)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                      u.status === 'banned'
                        ? 'bg-[#6b9b6f]/20 text-[#93bf96] hover:bg-[#6b9b6f]/30'
                        : 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30'
                    }`}
                  >
                    {u.status === 'banned' ? 'Blokdan chiqarish' : 'Bloklash'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
