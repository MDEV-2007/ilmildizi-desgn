import React, { useState } from 'react';
import { Sprout, Gift, User, Lock, Send, CheckCircle2 } from 'lucide-react';
import { ScreenId } from '../../../types';

interface RegisterScreenProps {
  onRegisterSuccess: () => void;
  onNavigate: (screen: ScreenId) => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onRegisterSuccess,
  onNavigate,
}) => {
  const [name, setName] = useState('Dilshod');
  const [surname, setSurname] = useState('Ergashev');
  const [username, setUsername] = useState('dilshod_bba');
  const [password, setPassword] = useState('pass1234');
  const [hasRefCode, setHasRefCode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onRegisterSuccess();
    }, 600);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="w-full max-w-sm glass-card p-6 sm:p-8 rounded-3xl border border-[rgba(255,255,255,0.09)] shadow-2xl">
        {/* Top Header */}
        <div className="flex flex-col items-center text-center mb-5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#2fb3a3] to-[#186f64] flex items-center justify-center shadow-lg shadow-[#2fb3a3]/20 mb-3">
            <Sprout className="w-6 h-6 text-[#0d1416]" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-[#e9eaeb]">
            Ro'yxatdan o'tish
          </h1>
          <p className="text-xs text-[#8d9094] mt-1">
            IlmIldizi bilan bilimingizni eng yuqori darajaga ko'taring
          </p>
        </div>

        {/* Referral Bonus Banner */}
        {hasRefCode && (
          <div className="mb-4 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-start gap-2.5">
            <Gift className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
            <p className="leading-snug">
              <strong>🎁 Taklif bonusi:</strong> Sizga va do'stingizga ro'yxatdan
              o'tishda <span className="text-amber-300 font-bold">+50 tanga</span> beriladi!
            </p>
          </div>
        )}

        {/* Social Register */}
        <div className="space-y-2 mb-4">
          <button
            type="button"
            onClick={() => onRegisterSuccess()}
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
            <span>Google orqali boshlash</span>
          </button>
        </div>

        {/* Separator */}
        <div className="relative my-3.5 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[rgba(255,255,255,0.08)]"></div>
          </div>
          <span className="relative px-3 bg-[#202226] text-[11px] font-medium text-[#8d9094]">
            yoki ma'lumotlar bilan
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-medium text-[#b7b9bc] mb-1">
                Ism
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Azizbek"
                className="w-full px-3 py-2.5 rounded-xl bg-[#25272b] border border-[rgba(255,255,255,0.09)] text-xs text-[#e9eaeb] placeholder-[#5a5d63] focus:outline-none focus:border-[#2fb3a3]"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-[#b7b9bc] mb-1">
                Familiya
              </label>
              <input
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                placeholder="Qodirov"
                className="w-full px-3 py-2.5 rounded-xl bg-[#25272b] border border-[rgba(255,255,255,0.09)] text-xs text-[#e9eaeb] placeholder-[#5a5d63] focus:outline-none focus:border-[#2fb3a3]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#b7b9bc] mb-1">
              Foydalanuvchi nomi
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="dilshod_bba"
              className="w-full px-3 py-2.5 rounded-xl bg-[#25272b] border border-[rgba(255,255,255,0.09)] text-xs text-[#e9eaeb] placeholder-[#5a5d63] focus:outline-none focus:border-[#2fb3a3]"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#b7b9bc] mb-1">
              Parol
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Kamida 6 belgi"
              className="w-full px-3 py-2.5 rounded-xl bg-[#25272b] border border-[rgba(255,255,255,0.09)] text-xs text-[#e9eaeb] placeholder-[#5a5d63] focus:outline-none focus:border-[#2fb3a3]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 mt-2 rounded-xl bg-[#2fb3a3] hover:bg-[#269488] text-[#0d1416] text-xs font-bold transition-all shadow-md shadow-[#2fb3a3]/20 disabled:opacity-50"
          >
            {isLoading ? 'Yaratilmoqda...' : "Ro'yxatdan o'tish"}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-xs text-[#8d9094]">
            Hisobingiz bormi?{' '}
            <button
              onClick={() => onNavigate('login')}
              className="text-[#5cc4b6] hover:underline font-semibold"
            >
              Hisobim bor
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
