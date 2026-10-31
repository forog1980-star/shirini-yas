import React from 'react';
import { 
  X, 
  Lightbulb, 
  CreditCard, 
  Clock, 
  MessageSquare, 
  Truck, 
  HeartHandshake, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle,
  Smartphone,
  Sparkles
} from 'lucide-react';

interface BusinessProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BusinessProposalModal: React.FC<BusinessProposalModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-stone-200 relative my-6"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-700 to-amber-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-amber-300 border border-white/20">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base">پیشنهاد جامع و نقشه راه کسب‌وکار شیرینی خانگی</h3>
              <p className="text-xs text-amber-200/90">
                پاسخ تخصصی به نحوه طراحی ساده، پرداخت آنلاین، ارسال پیامک و زمان‌بندی
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto text-xs sm:text-sm text-stone-700 leading-relaxed">
          {/* Intro */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 text-amber-950 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-extrabold text-sm mb-1 text-amber-900">
                اصول طلایی یک اپلیکیشن شیرینی خانگی موفق (ساده، سریع، مطمئن):
              </h4>
              <p className="text-xs text-amber-800/90 leading-relaxed">
                مشتری شیرینی خانگی به دنبال حس صمیمیت، اطمینان از سلامت مواد اولیه و دریافت به موقع شیرینی در مهمانی‌هایش است. کمترین پیچیدگی یعنی مشتری در ۳ کلیک شیرینی را ببیند، تاریخ تحویل را انتخاب کند و پرداخت کند.
              </p>
            </div>
          </div>

          {/* Section 1: Payment & Dual SMS */}
          <div className="border border-stone-200 rounded-2xl p-4 space-y-3">
            <h4 className="font-extrabold text-stone-900 flex items-center gap-2 text-sm">
              <CreditCard className="w-4 h-4 text-emerald-600" />
              ۱. ابزارهای پرداخت آنلاین و سیستم پیامک دوطرفه (خریدار و فروشنده):
            </h4>
            <ul className="space-y-2 text-xs text-stone-600 list-disc list-inside">
              <li>
                <strong className="text-stone-800">درگاه پرداخت پیشنهادی: </strong>
                استفاده از درگاه‌های پرداخت واسط مجاز (مثل زرین‌پال، آیدی‌پی یا زیبال) یا درگاه مستقیم بانکی شاپرک. این درگاه‌ها لینک پرداخت اختصاصی و افزونه وب ایجاد می‌کنند و نیازی به ای‌نماد پیچیده اولیه ندارند.
              </li>
              <li>
                <strong className="text-stone-800">پیامک همزمان (وب‌سرویس): </strong>
                اتصال وب‌سرویس پیامکی (مانند کاوه‌نگار یا فراز اس‌ام‌اس با خطوط خدماتی بدون بلک‌لیست). به محض پرداخت موفق:
                <div className="mt-1 mr-4 bg-stone-100 p-2 rounded-xl font-mono text-[11px] text-stone-800">
                  پیامک خریدار: «خانم/آقای ... سفارش ۱ کیلو شیرینی تر شما ثبت شد. تحویل: فردا ساعت ۱۸. کد: TRK-8491»<br/>
                  پیامک فروشنده: «سفارش جدید دریافت شد! مبلغ واریز شد. شیرینی تر نان‌خامه‌ای برای فردا ساعت ۱۸.»
                </div>
              </li>
            </ul>
          </div>

          {/* Section 2: Scheduling & Lead-time */}
          <div className="border border-stone-200 rounded-2xl p-4 space-y-3">
            <h4 className="font-extrabold text-stone-900 flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-amber-600" />
              ۲. زمان‌بندی هوشمند تهیه و تحویل (حل بزرگ‌ترین چالش قنادی خانگی):
            </h4>
            <p className="text-xs text-stone-600">
              چون شیرینی خانگی آماده در یخچال نیست، باید دو سازوکار در اپلیکیشن داشته باشیم:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                <span className="font-bold text-stone-900 block mb-1">الف) محاسبه زمان آماده‌سازی:</span>
                هر شیرینی زمان استراحت و پخت مشخص دارد (مثلاً ۱۸ ساعت برای نان‌خامه‌ای و ۲۴ ساعت برای کیک). تقویم به مشتری اجازه انتخاب تاریخ‌های قبل از این موعد را نمی‌دهد.
              </div>
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                <span className="font-bold text-stone-900 block mb-1">ب) سقف ظرفیت روزانه فر:</span>
                امکان فعال/غیرفعال کردن پذیرش سفارش توسط شیرینی‌پز با یک دکمه در پنل تا کیفیت پخت به خاطر شلوغی بیش از حد افت نکند.
              </div>
            </div>
          </div>

          {/* Section 3: Visual Album & Customization */}
          <div className="border border-stone-200 rounded-2xl p-4 space-y-3">
            <h4 className="font-extrabold text-stone-900 flex items-center gap-2 text-sm">
              <HeartHandshake className="w-4 h-4 text-rose-600" />
              ۳. آلبوم عکس، شفافیت قیمت‌ها و ارتباط متنی مستقیم:
            </h4>
            <ul className="space-y-2 text-xs text-stone-600 list-disc list-inside">
              <li>
                <strong className="text-stone-800">عکاسی با نور طبیعی: </strong>
                عکس‌هایی با نمای نزدیک از بافت شیرینی، برش وسط کیک و مواد اولیه باکیفیت (پسته، گردو، کره) بالاترین نرخ تبدیل خرید را دارند.
              </li>
              <li>
                <strong className="text-stone-800">چت متنی فوری با قالب‌های آماده: </strong>
                خریدار نیاز دارد بپرسد: «برای ۲۰ نفر چقدر سفارش بدم؟» یا «می‌تونید متن تبریک بنویسید؟». چت متنی درون‌برنامه‌ای با پاسخ سریع، صمیمیت کارگاه خانگی را به مشتری منتقل می‌کند.
              </li>
            </ul>
          </div>

          {/* Section 4: Safe Delivery */}
          <div className="border border-stone-200 rounded-2xl p-4 space-y-3">
            <h4 className="font-extrabold text-stone-900 flex items-center gap-2 text-sm">
              <Truck className="w-4 h-4 text-blue-600" />
              ۴. بسته‌بندی بهداشتی و سلامت فیزیکی هنگام ارسال:
            </h4>
            <p className="text-xs text-stone-600">
              جعبه‌های پنجره‌دار بهداشتی با مقوای استاندارد قنادی، قرار دادن کفی ضدلغزش زیر کیک‌ها و هماهنگی با پیک مجهز به جعبه خنک یا اسنپ‌باکس با قید «حمل بار حساس کیک».
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
          >
            متوجه شدم و بازگشت به برنامه
          </button>
        </div>
      </div>
    </div>
  );
};
