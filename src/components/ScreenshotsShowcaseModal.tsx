import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  Download, 
  Sparkles, 
  Layers, 
  Smartphone, 
  Clock, 
  CreditCard, 
  ChefHat, 
  CheckCircle2,
  ExternalLink,
  Store,
  Calendar
} from 'lucide-react';

interface ScreenshotsShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScreenshotsShowcaseModal: React.FC<ScreenshotsShowcaseModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'screens' | 'proposal'>('screens');

  const screenShowcases = [
    {
      id: 'storefront',
      title: '۱. صفحه اصلی و ویترین قنادی یاس',
      badge: 'ویترین خریدار',
      desc: 'مشاهده آلبوم تصاویر باکیفیت هر شیرینی، قیمت هر کیلوگرم به تومان، دسته‌بندی‌ها (شیرینی تر، خشک، سنتی، کیک) و حداقل زمان پخت.',
      image: `${import.meta.env.BASE_URL}screenshots/screen1_storefront.svg`,
      downloadName: 'yas-storefront.svg',
      highlights: [
        'آلبوم عکس اختصاصی با امکان ورق زدن عکس‌ها',
        'برچسب حداقل زمان پخت (مثلا ۱۸ ساعت قبل)',
        'انتخاب وزن دلخواه و یادداشت سلیقه (کم‌شیرین، متن کیک)',
      ],
    },
    {
      id: 'scheduling',
      title: '۲. زمان‌بندی هوشمند پخت و تحویل',
      badge: 'جلوگیری از تداخل کارگاه',
      desc: 'محاسبه خودکار لیدتایم و قفل کردن روزهای غیرممکن؛ مشتری روز تحویل و بازه ساعتی دلخواه (صبح، ظهر، عصر) را انتخاب می‌کند.',
      image: `${import.meta.env.BASE_URL}screenshots/screen2_scheduling.svg`,
      downloadName: 'yas-scheduling.svg',
      highlights: [
        'تقویم انتخاب روز (فردا عصر، پس‌فردا صبح، آخر هفته)',
        'انتخاب شیوه ارسال: پیک مخصوص خنک یا تحویل حضوری',
        'دریافت اطلاعات و شماره تماس خریدار جهت پیامک',
      ],
    },
    {
      id: 'payment_sms',
      title: '۳. درگاه پرداخت شاپرک و ارسال پیامک دوطرفه',
      badge: 'مالی و اطلاع‌رسانی آنی',
      desc: 'شبیه‌ساز پرداخت شتاب و صدور کد رهگیری؛ ارسال همزمان پیامک برای خریدار و هشدار فوری سفارش جدید برای مدیر یاس.',
      image: `${import.meta.env.BASE_URL}screenshots/screen3_payment_sms.svg`,
      downloadName: 'yas-payment-sms.svg',
      highlights: [
        'پرداخت آنلاین با رمز پویا یا کارت‌به‌کارت با ثبت فیش',
        'پیامک خریدار: تایید واریز و زمان دقیق تحویل',
        'پیامک قناد: آلارم سفارش جدید و تسویه فوری',
      ],
    },
    {
      id: 'admin_panel',
      title: '۴. پنل مدیریت کارگاه و وضعیت فرها',
      badge: 'مخصوص مدیر شیرینی یاس',
      desc: 'کنترل ظرفیت روزانه فر، تغییر مراحل پخت هر سفارش (خمیرگیری، درون فر، تزیین، تحویل پیک)، معرفی شیرینی جدید و چت.',
      image: `${import.meta.env.BASE_URL}screenshots/screen4_baker_admin.svg`,
      downloadName: 'yas-admin-panel.svg',
      highlights: [
        'کلید سوییچ ظرفیت روزانه پذیرش سفارش',
        'به‌روزرسانی مرحله زنده پخت شیرینی در فر',
        'افزودن شیرینی جدید با عکس، قیمت و زمان پخت',
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-stone-200 relative my-6"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-800 to-stone-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-amber-300 border border-white/20">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base">طرح‌نامه و راهنمای تصویری سامانه شیرینی یاس</h3>
              <p className="text-xs text-amber-200/90">
                مخصوص ارائه به مدیریت محترم شیرینی یاس جهت بررسی و تایید
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

        {/* Tab Switcher */}
        <div className="flex border-b border-stone-200 bg-stone-50 px-4 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('screens')}
            className={`pb-2.5 px-4 font-bold text-xs flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'screens'
                ? 'border-amber-600 text-amber-900 bg-white rounded-t-xl'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>معرفی تصویری صفحات اپلیکیشن</span>
          </button>

          <button
            onClick={() => setActiveTab('proposal')}
            className={`pb-2.5 px-4 font-bold text-xs flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'proposal'
                ? 'border-amber-600 text-amber-900 bg-white rounded-t-xl'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <FileText className="w-4 h-4 text-amber-600" />
            <span>دانلود و مطالعه متن طرح‌نامه (Word - فونت زر)</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {activeTab === 'screens' ? (
            <div className="space-y-6">
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 text-xs text-amber-950 flex items-center justify-between">
                <div>
                  <span className="font-bold">لینک آنلاین برنامه جهت مشاهده زنده توسط مدیر یاس:</span>
                  <div className="text-[11px] text-stone-600 mt-0.5 font-mono" dir="ltr">
                    https://ais-pre-pu6amspvce75minxuy746m-577496021912.europe-west2.run.app
                  </div>
                </div>
                <a
                  href="https://ais-pre-pu6amspvce75minxuy746m-577496021912.europe-west2.run.app"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-amber-600 text-white rounded-xl text-xs font-bold hover:bg-amber-700 shrink-0"
                >
                  باز کردن لینک
                </a>
              </div>

              {/* Grid of screens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {screenShowcases.map((sc) => (
                  <div
                    key={sc.id}
                    className="bg-stone-50 rounded-2xl p-4 border border-stone-200 flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="relative aspect-video rounded-xl overflow-hidden mb-2.5 bg-stone-200 border border-stone-300/60">
                        <img src={sc.image} alt={sc.title} className="w-full h-full object-cover" />
                        <span className="absolute top-2 right-2 bg-stone-900/80 text-amber-300 text-[10px] px-2 py-0.5 rounded-full backdrop-blur-xs font-semibold">
                          {sc.badge}
                        </span>
                      </div>

                      <h4 className="font-bold text-xs text-stone-900">{sc.title}</h4>
                      <p className="text-[11px] text-stone-600 mt-1 leading-relaxed">{sc.desc}</p>
                    </div>

                    <div className="bg-white rounded-xl p-2.5 border border-stone-200/80 space-y-1">
                      {sc.highlights.map((h, i) => (
                        <div key={i} className="text-[10px] text-stone-700 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    <a
                      href={sc.image}
                      download={sc.downloadName}
                      className="w-full py-2 bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-900 border border-stone-200 rounded-xl text-center text-[11px] font-bold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5 text-amber-600" />
                      <span>دانلود فایل باکیفیت تصویر</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Proposal Tab */
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-black text-sm text-amber-950 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-amber-700" />
                    فایل طرح‌نامه رسمی شیرینی یاس آماده دانلود است
                  </h4>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    این فایل به صورت راست‌چین (RTL) با ساختار استاندارد Microsoft Word و تنظیم شده بر روی فونت فارسی زر (B Zar) آماده شده است.
                  </p>
                </div>
                <a
                  href="/yas-bakery-proposal.doc"
                  download="tarhname-shirini-yas.doc"
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-2 shrink-0 transition-all active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>دانلود فایل Word (.doc)</span>
                </a>
              </div>

              {/* Proposal Document Preview summary */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 text-xs text-stone-700 space-y-3 leading-relaxed font-['Vazirmatn']">
                <div className="text-center border-b border-stone-200 pb-3">
                  <h3 className="font-black text-base text-stone-900">
                    طرح‌نامه اجرایی و فنی راه‌اندازی سامانه سفارش آنلاین «شیرینی یاس»
                  </h3>
                  <span className="text-[11px] text-stone-500">شماره سند: YAS-SPEC-01 | فونت رسمی: B Zar</span>
                </div>

                <div className="space-y-2">
                  <p><strong>بخش ۱ - هویت برند و ارزش‌ها:</strong> پخت ۱۰۰٪ به سفارش و عدم نگهداری محصول مانده در یخچال، کره طبیعی حیوانی، زعفران قائنات و پسته تازه.</p>
                  <p><strong>بخش ۲ - جریان ۴ گانه خرید:</strong> ۱. ویترین و آلبوم ➔ ۲. انتخاب مقدار و سلیقه ➔ ۳. زمان‌بندی روز و ساعت پخت ➔ ۴. درگاه پرداخت و پیامک آنی.</p>
                  <p><strong>بخش ۳ - هوش زمان‌بندی (Lead-Time):</strong> لیدتایم ۱۸ ساعت برای شیرینی تر و ۲۴ تا ۳۶ ساعت برای کیک و دسر به همراه کلید کنترل سقف پخت روزانه فر.</p>
                  <p><strong>بخش ۴ - پرداخت و پیامک همزمان:</strong> متن اختصاصی پیامک تایید سفارش برای مشتری و پیامک آلارم سفارش فوری برای شیرینی‌پز.</p>
                  <p><strong>بخش ۵ - زیرساخت فنی:</strong> بررسی چرایی لزوم سرور داخلی با IP ایران (ابر آروان / پارس‌پک) جهت پایداری درگاه پرداخت شاپرک و وب‌سرویس پیامکی.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-stone-500">
            لینک و سند آماده ارسال به مدیر شیرینی یاس است.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-all"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};
