import React, { useState } from 'react';
import { Settings, Shield, Key, Database, RefreshCw, Save } from 'lucide-react';
import { ScreenId } from '../../../types';
import confetti from 'canvas-confetti';

interface AdminSettingsScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const AdminSettingsScreen: React.FC<AdminSettingsScreenProps> = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [aiApiKeyConfigured, setAiApiKeyConfigured] = useState(true);
  const [dbBackupAuto, setDbBackupAuto] = useState(true);

  const handleSave = () => {
    confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
    alert('Tizim sozlamalari muvaffaqiyatli saqlandi!');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#e9eaeb] flex items-center gap-2.5">
            <Settings className="w-6 h-6 text-[#5cc4b6]" />
            <span>Tizim & Server Sozlamalari</span>
          </h1>
          <p className="text-xs text-[#8d9094] mt-0.5">
            Platforma xavfsizligi, API integratsiyalari va avtomatlashtirilgan zaxiralash
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2.5 rounded-xl bg-[#2fb3a3] hover:bg-[#269488] text-[#0d1416] text-xs font-bold flex items-center gap-2 shadow-md shadow-[#2fb3a3]/20 self-start sm:self-auto transition-all"
        >
          <Save className="w-4 h-4" />
          <span>Saqlash</span>
        </button>
      </div>

      {/* Settings Cards */}
      <div className="space-y-4">
        <div className="glass-card p-6 rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[#202226] flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#e9eaeb]">
              Texnik Profilaktika Rejimi (Maintenance Mode)
            </h3>
            <p className="text-xs text-[#8d9094] mt-0.5">
              Yoqilganda oddiy foydalanuvchilarga "Texnik ishlar olib borilmoqda" xabari ko'rinadi
            </p>
          </div>
          <button
            onClick={() => setMaintenanceMode(!maintenanceMode)}
            className={`w-12 h-6 rounded-full transition-colors relative ${
              maintenanceMode ? 'bg-[#2fb3a3]' : 'bg-[#25272b]'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                maintenanceMode ? 'right-1' : 'left-1'
              }`}
            />
          </button>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[#202226] flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#e9eaeb]">
              Avtomatik Ma'lumotlar Bazasi Zaxirasi (Daily Backup)
            </h3>
            <p className="text-xs text-[#8d9094] mt-0.5">
              Har kecha soat 03:00 da barcha testlar va foydalanuvchi natijalari bulutli arxivlanadi
            </p>
          </div>
          <button
            onClick={() => setDbBackupAuto(!dbBackupAuto)}
            className={`w-12 h-6 rounded-full transition-colors relative ${
              dbBackupAuto ? 'bg-[#2fb3a3]' : 'bg-[#25272b]'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                dbBackupAuto ? 'right-1' : 'left-1'
              }`}
            />
          </button>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[#202226] space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#5cc4b6]">
            <Key className="w-4 h-4" />
            <span>AI Server & To'lov API Holati</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-[#25272b] flex items-center justify-between">
              <span className="text-[#e9eaeb]">Google Gemini AI Integratsiyasi</span>
              <span className="text-[#93bf96] font-bold">Faol va Biriktirilgan ✓</span>
            </div>
            <div className="p-3 rounded-xl bg-[#25272b] flex items-center justify-between">
              <span className="text-[#e9eaeb]">Click & Payme Merchant Webhook</span>
              <span className="text-[#93bf96] font-bold">Online ✓</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
