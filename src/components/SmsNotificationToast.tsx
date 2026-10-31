import React from 'react';
import { 
  Smartphone, 
  X, 
  CheckCheck, 
  BellRing, 
  MessageSquare, 
  ArrowLeftRight,
  ShieldCheck,
  Volume2
} from 'lucide-react';
import { SmsNotification } from '../types/confectionery';

interface SmsNotificationToastProps {
  notifications: SmsNotification[];
  onClose: () => void;
}

export const SmsNotificationToast: React.FC<SmsNotificationToastProps> = ({
  notifications,
  onClose,
}) => {
  if (notifications.length === 0) return null;

  const buyerSms = notifications.find((n) => n.to.includes('خریدار'));
  const sellerSms = notifications.find((n) => n.to.includes('فروشنده'));

  return (
    <div className="fixed top-20 right-4 left-4 sm:left-auto sm:right-6 sm:w-96 z-50 animate-in slide-in-from-top-4 duration-300">
      <div className="bg-stone-900/95 backdrop-blur-md text-white rounded-3xl p-4 shadow-2xl border border-stone-700/60 flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <BellRing className="w-4 h-4 animate-bounce" />
            </div>
            <div>
              <span className="font-bold text-xs text-amber-300">ارسال همزمان پیامک (خرید و فروش)</span>
              <p className="text-[10px] text-stone-400">سامانه پیامکی متصل به درگاه پرداخت</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-6 h-6 rounded-full hover:bg-stone-800 flex items-center justify-center text-stone-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Dual Phone Messages */}
        <div className="space-y-2.5">
          {/* 1. Buyer SMS Notification */}
          {buyerSms && (
            <div className="bg-stone-800/80 rounded-2xl p-3 border border-stone-700/50 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-[11px] text-emerald-400 font-semibold">
                <span className="flex items-center gap-1">
                  <Smartphone className="w-3 h-3" />
                  📱 پیامک به خریدار ({buyerSms.phoneNumber})
                </span>
                <span className="text-[10px] text-stone-400 font-mono">{buyerSms.timestamp}</span>
              </div>
              <p className="text-xs text-stone-200 leading-relaxed bg-stone-950/60 p-2.5 rounded-xl border border-stone-800">
                {buyerSms.message}
              </p>
            </div>
          )}

          {/* 2. Seller SMS Notification */}
          {sellerSms && (
            <div className="bg-amber-950/40 rounded-2xl p-3 border border-amber-800/40 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-[11px] text-amber-400 font-semibold">
                <span className="flex items-center gap-1">
                  <Smartphone className="w-3 h-3" />
                  🔔 پیامک هشدار به شیرینی‌پز (شیرین‌بانو)
                </span>
                <span className="text-[10px] text-stone-400 font-mono">{sellerSms.timestamp}</span>
              </div>
              <p className="text-xs text-amber-100 leading-relaxed bg-stone-950/60 p-2.5 rounded-xl border border-amber-900/40">
                {sellerSms.message}
              </p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="text-[10px] text-stone-400 flex items-center justify-between pt-1">
          <span className="flex items-center gap-1">
            <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
            تحویل آنی به سرشماره ۱۰۰۰۸۴۹
          </span>
          <button
            onClick={onClose}
            className="text-amber-400 hover:underline font-medium"
          >
            متوجه شدم
          </button>
        </div>
      </div>
    </div>
  );
};
