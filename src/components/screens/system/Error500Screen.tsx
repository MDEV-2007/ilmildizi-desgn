import React from 'react';
import { AlertTriangle, RefreshCw, Home, Send } from 'lucide-react';
import { ScreenId } from '../../../types';

interface Error500ScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onRetry: () => void;
}

export const Error500Screen: React.FC<Error500ScreenProps> = ({
  onNavigate,
  onRetry,
}) => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-card p-6 sm:p-8 rounded-3xl border border-[rgba(255,255,255,0.09)] text-center flex flex-col items-center">
        {/* Warning Icon */}
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/25 flex items-center justify-center text-rose-400 mb-4">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <span className="text-5xl font-black bg-gradient-to-r from-rose-400 to-amber-400 bg-clip-text text-transparent mb-1">
          500
        </span>

        <h2 className="text-xl font-bold text-[#e9eaeb] mb-2 font-voice">
          Serverda kutilmagan xatolik
        </h2>

        <p className="text-xs text-[#8d9094] leading-relaxed max-w-sm mb-6">
          Tizim so'rovingizni qayta ishlashda vaqtinchalik uzilishga duch keldi.
          Mutaxassislarimiz bu holat bo'yicha ogohlantirildi.
        </p>

        {/* Action Buttons */}
        <div className="w-full flex flex-col sm:flex-row gap-2.5 mb-6">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex-1 py-3 rounded-xl bg-[#2fb3a3] hover:bg-[#269488] text-[#0d1416] text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-[#2fb3a3]/20"
          >
            <Home className="w-4 h-4" />
            <span>Bosh sahifaga</span>
          </button>

          <button
            onClick={onRetry}
            className="flex-1 py-3 rounded-xl bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.1)] text-[#e9eaeb] text-xs font-semibold flex items-center justify-center gap-2 border border-[rgba(255,255,255,0.08)] transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Qayta urinish</span>
          </button>
        </div>

        <a
          href="https://t.me/ilmildizi_support"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-[#8d9094] hover:text-[#5cc4b6] transition-colors"
        >
          <Send className="w-3.5 h-3.5 text-[#2AABEE]" />
          <span>Telegram orqali xabar bering</span>
        </a>
      </div>
    </div>
  );
};
