import React, { useState } from 'react';
import { WifiOff, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

interface OfflineScreenProps {
  onRetry: () => void;
}

export const OfflineScreen: React.FC<OfflineScreenProps> = ({ onRetry }) => {
  const [checking, setChecking] = useState(false);
  const [statusText, setStatusText] = useState('Aloqa kutilmoqda...');

  const handleTestConnection = () => {
    setChecking(true);
    setStatusText('Tarmoq holati tekshirilmoqda...');
    setTimeout(() => {
      setChecking(false);
      setStatusText('Internet aloqasi topilmadi. Iltimos, qayta urinib ko\'ring.');
      onRetry();
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-sm glass-card p-6 sm:p-8 rounded-3xl border border-[rgba(255,255,255,0.09)] text-center flex flex-col items-center">
        {/* Pulsing Wi-Fi Off Icon */}
        <div className="relative mb-4">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/25 flex items-center justify-center text-rose-400">
            <WifiOff className="w-8 h-8" />
          </div>
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
          </span>
        </div>

        <h1 className="text-xl font-bold text-[#e9eaeb] mb-2 font-voice">
          Internet aloqasi yo'q
        </h1>

        <p className="text-xs text-[#8d9094] max-w-xs mb-5 leading-relaxed">
          IlmIldizi bilan bog'lanish uchun internet aloqasini tekshiring.
        </p>

        {/* 3-Point Checklist Box */}
        <div className="w-full p-3.5 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] text-left space-y-2 mb-6">
          <p className="text-[11px] font-bold text-[#b7b9bc] uppercase tracking-wider">
            Tekshiring:
          </p>
          <div className="flex items-center gap-2 text-xs text-[#8d9094]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#2fb3a3]"></div>
            <span>Wi-Fi yoki mobil internet yoqilganligini</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#8d9094]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#2fb3a3]"></div>
            <span>Aviarejim (Airplane mode) o'chirilganligini</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#8d9094]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#2fb3a3]"></div>
            <span>Tarmoq signali yetarli ekanligini</span>
          </div>
        </div>

        <button
          onClick={handleTestConnection}
          disabled={checking}
          className="w-full py-3 rounded-xl bg-[#2fb3a3] hover:bg-[#269488] text-[#0d1416] text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-[#2fb3a3]/20 disabled:opacity-60"
        >
          <RefreshCw className={`w-4 h-4 ${checking ? 'animate-spin' : ''}`} />
          <span>{checking ? 'Tekshirilmoqda...' : 'Qayta urinish'}</span>
        </button>

        <p className="text-[11px] text-[#8d9094] mt-3">
          Status: <span className="text-[#e9eaeb] font-medium">{statusText}</span>
        </p>
      </div>
    </div>
  );
};
