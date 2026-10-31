import React from 'react';
import { 
  X, 
  Server, 
  Globe, 
  Github, 
  ShieldCheck, 
  Code2, 
  Wrench, 
  ExternalLink, 
  FolderDown, 
  CheckCircle2, 
  AlertTriangle,
  Send,
  CreditCard,
  Layers
} from 'lucide-react';

interface HostingDeploymentGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HostingDeploymentGuideModal: React.FC<HostingDeploymentGuideModalProps> = ({
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
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-stone-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-blue-300 border border-white/20">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base">راهنمای فنی هاستینگ، دامنه، گیت‌هاب و تحویل کدها</h3>
              <p className="text-xs text-blue-200/90">
                پاسخ به سوالات راه‌اندازی عملیاتی کارگاه شیرینی یاس
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

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto text-xs sm:text-sm text-stone-700 leading-relaxed">
          {/* Section 1: GitHub vs Hosting & Domestic Servers */}
          <div className="border border-stone-200 rounded-2xl p-4 space-y-3 bg-stone-50/50">
            <h4 className="font-extrabold text-stone-900 flex items-center gap-2 text-sm">
              <Globe className="w-4 h-4 text-blue-600" />
              ۱. آیا گیت‌هاب کافیست یا حتماً سرور داخلی در ایران نیاز داریم؟
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-white rounded-xl border border-stone-200 flex items-start gap-2">
                <Github className="w-4 h-4 text-stone-800 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900">نقش GitHub:</strong>
                  <p className="text-stone-600 mt-0.5">
                    گیت‌هاب عالی‌ترین مکان برای نگهداری نسخه پشتیبان، تاریخچه تغییرات و اشتراک‌گذاری کدها با برنامه‌نویسان است. اما برای یک سایت فروشگاهی با درگاه پرداخت ایرانی، صرفاً GitHub Pages کافی نیست.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-blue-950 flex items-start gap-2">
                <Server className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-blue-950 font-bold">چرا هاست / سرور با IP ایران ضروری و توصیه شده است؟</strong>
                  <p className="mt-1 leading-relaxed">
                    درگاه‌های بانکی شاپرک (زرین‌پال، سامان‌کیش، به‌پرداخت، زیبال) و پنل‌های پیامکی (کاوه‌نگار، فراز اس‌ام‌اس) فقط به سرورهایی با IP ایران اجازه وب‌هوک و تراکنش پایدار می‌دهند. همچنین در صورت اختلالات اینترنت بین‌الملل، سایت‌هایی که روی سرورهای داخلی هستند (ابر آروان، پارس‌پک، هاست‌ایران، برتینا) بدون قطعی برای مشتریان ایرانی باز می‌شوند.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Domain Setup */}
          <div className="border border-stone-200 rounded-2xl p-4 space-y-2.5">
            <h4 className="font-extrabold text-stone-900 flex items-center gap-2 text-sm">
              <Globe className="w-4 h-4 text-emerald-600" />
              ۲. دامنه اینترنتی (Domain) برای «شیرینی یاس»:
            </h4>
            <p className="text-xs text-stone-600">
              می‌توانید دامنه‌هایی مانند:
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-mono font-bold text-stone-800">
              <span className="bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200">shirini-yas.ir</span>
              <span className="bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200">yas-pastry.com</span>
              <span className="bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200">shiriniyas.ir</span>
            </div>
            <p className="text-xs text-stone-500">
              ثبت دامنه .ir بسیار اقتصادی است (حدود ۳۰ تا ۵۰ هزار تومان در سال از طریق سایت ایرنیک یا شرکت‌های هاستینگ ایرانی).
            </p>
          </div>

          {/* Section 3: How to download & hand over source code */}
          <div className="border border-stone-200 rounded-2xl p-4 space-y-3">
            <h4 className="font-extrabold text-stone-900 flex items-center gap-2 text-sm">
              <FolderDown className="w-4 h-4 text-amber-600" />
              ۳. کدها کجاست و چگونه در اختیار شیرینی یاس قرار داده می‌شود؟
            </h4>
            <div className="space-y-2 text-xs text-stone-600">
              <p>
                تمامی کدهای این پروژه در همین مخزن قرار دارند و کاملاً استاندارد و آماده تحویل هستند:
              </p>
              <div className="bg-stone-900 text-stone-100 p-3 rounded-xl font-mono text-[11px] space-y-1" dir="ltr">
                <div>📁 src/</div>
                <div>&nbsp;&nbsp;├── components/ (تمامی بخش‌های ویترین، پرداخت، پیامک، چت و پنل)</div>
                <div>&nbsp;&nbsp;├── data/ (اطلاعات شیرینی‌های یاس، قیمت‌ها و عکس‌ها)</div>
                <div>&nbsp;&nbsp;├── types/ (تایپ‌های استاندارد سفارشات و محصولات)</div>
                <div>&nbsp;&nbsp;└── App.tsx (هسته اصلی نرم‌افزار)</div>
              </div>
              <p>
                <strong>شیوه تحویل:</strong> از منوی بالای AI Studio می‌توانید گزینه <strong>Export to GitHub</strong> یا دانلود پوشه پروژه را انتخاب فرمایید و لینک گیت‌هاب یا فایل فشرده (Zip) را به کارفرما یا برنامه‌نویس تیم تحویل دهید.
              </p>
            </div>
          </div>

          {/* Section 4: Maintenance, Bug Fixes & Ongoing Development */}
          <div className="border border-stone-200 rounded-2xl p-4 space-y-3">
            <h4 className="font-extrabold text-stone-900 flex items-center gap-2 text-sm">
              <Wrench className="w-4 h-4 text-rose-600" />
              ۴. نحوه توسعه، باگ‌گیری و پشتیبانی مداوم:
            </h4>
            <ul className="space-y-2 text-xs text-stone-600 list-disc list-inside">
              <li>
                <strong>توسعه بدون کدنویسی دشوار:</strong> هر تغییری که مدنظر شما یا شیرینی یاس باشد (مثلاً افزودن فیلد کد تخفیف، تغییر ساعت کاری، اضافه کردن طعم جدید)، کافیست در همین چت درخواست بدهید تا بلافاصله پیاده‌سازی و بدون باگ کامپایل شود.
              </li>
              <li>
                <strong>تست آنی در پیش‌نمایش:</strong> شما می‌توانید روند سفارش، انتخاب زمان پخت، درگاه پرداخت و ارسال پیامک را به صورت زنده تست کنید و هر جا ایرادی دیدید گزارش دهید تا اصلاح شود.
              </li>
              <li>
                <strong>نصب به عنوان اپ موبایل (PWA):</strong> مشتریان با زدن گزینه «Add to Home Screen» در مرورگر گوشی (کروم یا سافاری آیفون)، این سایت را مثل یک اپلیکیشن واقعی با آیکون «شیرینی یاس» روی صفحه گوشی خود نصب می‌کنند!
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
          >
            بستن راهنما
          </button>
        </div>
      </div>
    </div>
  );
};
