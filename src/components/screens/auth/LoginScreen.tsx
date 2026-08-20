import React, { useState } from 'react';
import { Sprout, AlertCircle, Lock, User, Send, Check } from 'lucide-react';
import { ScreenId } from '../../../types';

interface LoginScreenProps {
  onLoginSuccess: () => void;
  onNavigate: (screen: ScreenId) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  onNavigate,
}) => {
  const [username, setUsername] = useState('aziz_ilm');
  const [password, setPassword] = useState('123456');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setErrorMsg('Foydalanuvchi nomi yoki parol xato!');
      return;
    }
    setIsLoading(true);
    setErrorMsg('');
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 600);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="w-full max-w-sm glass-card p-6 sm:p-8 rounded-3xl border border-[rgba(255,255,255,0.09)] shadow-2xl relative overflow-hidden">
        {/* Top Logo */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#2fb3a3] to-[#186f64] flex items-center justify-center shadow-lg shadow-[#2fb3a3]/20 mb-3">
            <Sprout className="w-6 h-6 text-[#0d1416]" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-[#e9eaeb]">
            IlmIldizi'ga kirish
          </h1>
          <p className="text-xs text-[#8d9094] mt-1">
            Milliy Sertifikat va BBA tayyorgarlik tizimi
          </p>
        </div>

        {/* Error Notice */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Google & Telegram Social Buttons */}
        <div className="space-y-2.5 mb-4">
          <button
            type="button"
            onClick={() => onLoginSuccess()}
            className="w-full py-2.5 px-4 bg-white text-gray-800 hover:bg-gray-100 rounded-xl text-xs font-semibold flex items-center justify-center gap-2.5 transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Google hisobingiz bilan kiring</span>
          </button>

          <button
            type="button"
            onClick={() => onLoginSuccess()}
            className="w-full py-2.5 px-4 bg-[#2AABEE] hover:bg-[#2297d3] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <Send className="w-4 h-4" />
            <span>Telegram orqali kirish</span>
          </button>
        </div>

        {/* Separator */}
        <div className="relative my-4 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[rgba(255,255,255,0.08)]"></div>
          </div>
          <span className="relative px-3 bg-[#202226] text-[11px] font-medium text-[#8d9094]">
            yoki
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-[11px] font-medium text-[#b7b9bc] mb-1">
              Foydalanuvchi nomi
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8d9094]" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="masalan: aziz_ilm"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#25272b] border border-[rgba(255,255,255,0.09)] text-xs text-[#e9eaeb] placeholder-[#5a5d63] focus:outline-none focus:border-[#2fb3a3] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#b7b9bc] mb-1">
              Parol
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8d9094]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#25272b] border border-[rgba(255,255,255,0.09)] text-xs text-[#e9eaeb] placeholder-[#5a5d63] focus:outline-none focus:border-[#2fb3a3] transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 mt-2 rounded-xl bg-[#2fb3a3] hover:bg-[#269488] text-[#0d1416] text-xs font-bold transition-all shadow-md shadow-[#2fb3a3]/20 disabled:opacity-50"
          >
            {isLoading ? 'Kirilmoqda...' : 'Hisobga kirish'}
          </button>
        </form>

        <div className="text-center mt-5">
          <p className="text-xs text-[#8d9094]">
            Hisobingiz yo'qmi?{' '}
            <button
              onClick={() => onNavigate('register')}
              className="text-[#5cc4b6] hover:underline font-semibold"
            >
              Ro'yxatdan o'tish
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
