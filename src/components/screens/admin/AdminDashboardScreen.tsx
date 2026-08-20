import React from 'react';
import {
  ShieldAlert,
  Users,
  DollarSign,
  FileCheck2,
  Activity,
  ArrowUpRight,
  TrendingUp,
  Server,
  Database,
  Lock,
} from 'lucide-react';
import { ScreenId } from '../../../types';
import { Badge } from '../../ui/Badge';

interface AdminDashboardScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const AdminDashboardScreen: React.FC<AdminDashboardScreenProps> = ({
  onNavigate,
}) => {
  const adminStats = [
    { label: 'Jami Foydalanuvchilar', val: '24,850 nafar', change: '+18.4%', isPos: true },
    { label: 'Oylik Tushum (MRR)', val: '86,400,000 UZS', change: '+24.1%', isPos: true },
    { label: 'Yechilgan Testlar (Jami)', val: '342,910 ta', change: '+12.0%', isPos: true },
    { label: 'Server Ingress & CPU', val: '99.98% / 14%', change: 'Optimal', isPos: true },
  ];

  const recentLogs = [
    { event: 'Yangi Premium xarid (1 Yillik)', user: 'Sardorbek R. (Click)', time: '2 daqiqa oldin', status: 'Muvaffaqiyatli' },
    { event: 'Yangi savollar banki yuklandi', user: 'Admin (Rustam O.)', time: '18 daqiqa oldin', status: '+50 savol' },
    { event: 'O\'qituvchi verifikatsiyasi', user: 'Olimjon Qodirov (Tarix)', time: '1 soat oldin', status: 'Tasdiqlandi' },
    { event: 'Tizim xavfsizlik tekshiruvi', user: 'System Worker', time: '3 soat oldin', status: 'Xavfsiz' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#e9eaeb] flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-rose-500" />
              <span>Admin Boshqaruv Markazi</span>
            </h1>
            <Badge variant="danger">SUPER ADMIN</Badge>
          </div>
          <p className="text-xs text-[#8d9094] mt-0.5">
            Platformaning barcha SaaS ko'rsatkichlari, tushumlar va texnik auditi
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('admin_users')}
            className="px-3.5 py-2 rounded-xl bg-[#202226] text-xs font-semibold text-[#b7b9bc] hover:text-[#e9eaeb] border border-[rgba(255,255,255,0.08)]"
          >
            Foydalanuvchilar
          </button>
          <button
            onClick={() => onNavigate('admin_questions')}
            className="px-3.5 py-2 rounded-xl bg-[#2fb3a3] text-xs font-bold text-[#0d1416] hover:bg-[#269488]"
          >
            Savollar Banki
          </button>
        </div>
      </div>

      {/* 2. 4-Column Stat Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {adminStats.map((st, i) => (
          <div key={i} className="glass-card p-5 rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[#202226] flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase text-[#8d9094]">{st.label}</span>
            <div className="my-2">
              <p className="text-xl sm:text-2xl font-black text-[#e9eaeb]">{st.val}</p>
            </div>
            <span className="text-xs font-bold text-[#93bf96] flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              {st.change}
            </span>
          </div>
        ))}
      </div>

      {/* 3. Tizim Audit Jurnali & Loglar */}
      <div className="glass-card p-6 rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[#202226] space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#e9eaeb] flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#5cc4b6]" />
            <span>Jonli Tizim Hodisalari va Audit</span>
          </h3>
          <span className="text-xs text-[#8d9094]">Avto-yangilanish: Faol</span>
        </div>

        <div className="divide-y divide-[rgba(255,255,255,0.04)]">
          {recentLogs.map((log, i) => (
            <div key={i} className="py-3 flex items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <p className="font-semibold text-[#e9eaeb]">{log.event}</p>
                <p className="text-[#8d9094]">{log.user}</p>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold text-[#5cc4b6] px-2 py-0.5 rounded bg-[#2fb3a3]/10">
                  {log.status}
                </span>
                <span className="text-[10px] text-[#8d9094] block mt-0.5">{log.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
