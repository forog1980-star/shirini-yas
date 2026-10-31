import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  Truck, 
  Store, 
  MapPin, 
  User, 
  Phone, 
  AlertCircle, 
  CheckCircle, 
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { DeliveryDetails, CartItem } from '../types/confectionery';
import { formatPrice, toPersianDigits } from '../utils/formatters';

interface DeliverySchedulingModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onConfirmSchedule: (details: DeliveryDetails) => void;
}

export const DeliverySchedulingModal: React.FC<DeliverySchedulingModalProps> = ({
  isOpen,
  onClose,
  items,
  onConfirmSchedule,
}) => {
  if (!isOpen) return null;

  // Compute maximum prep time
  const maxPrepHours = items.reduce((max, item) => Math.max(max, item.product.prepTimeHours), 18);

  // Available delivery dates taking prep time into consideration
  const deliveryDateOptions = [
    {
      id: 'tomorrow_pm',
      title: 'فردا (عصر)',
      subtitle: 'ساعت ۱۷:۰۰ الی ۲۰:۰۰',
      dateLabel: 'فردا عصر (آماده‌سازی با خمیر تازه)',
      isFeasible: maxPrepHours <= 24,
    },
    {
      id: 'day_after_am',
      title: 'پس‌فردا (صبح)',
      subtitle: 'ساعت ۱۰:۰۰ الی ۱۳:۰۰',
      dateLabel: 'پس‌فردا شیفت صبح (پخت اول صبح)',
      isFeasible: true,
    },
    {
      id: 'day_after_pm',
      title: 'پس‌فردا (عصر)',
      subtitle: 'ساعت ۱۷:۰۰ الی ۲۰:۰۰',
      dateLabel: 'پس‌فردا عصر (مناسب جشن و مهمانی)',
      isFeasible: true,
    },
    {
      id: 'weekend_special',
      title: 'آخر هفته (پنجشنبه)',
      subtitle: 'ساعت ۱۶:۰۰ الی ۱۹:۰۰',
      dateLabel: 'پنجشنبه آخر هفته',
      isFeasible: true,
    },
  ];

  const timeSlots = [
    '۱۰:۰۰ الی ۱۳:۰۰ (شیفت صبحگاهی)',
    '۱۴:۰۰ الی ۱۷:۰۰ (شیفت ظهر)',
    '۱۷:۰۰ الی ۲۱:۰۰ (شیفت عصر و شب)',
  ];

  const [selectedDateOption, setSelectedDateOption] = useState(
    maxPrepHours <= 24 ? deliveryDateOptions[0].dateLabel : deliveryDateOptions[1].dateLabel
  );
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(timeSlots[2]);
  const [deliveryMethod, setDeliveryMethod] = useState<'courier' | 'pickup'>('courier');
  const [recipientName, setRecipientName] = useState('علیرضا رضایی');
  const [phone, setPhone] = useState('۰۹۱۲۹۸۷۶۵۴۳');
  const [address, setAddress] = useState('تهران، سعادت‌آباد، میدان کاج، خیابان سرو غربی، کوچه لادن، پلاک ۱۸، واحد ۴');
  const [specialInstructions, setSpecialInstructions] = useState('لطفا در خودرو خنک حمل شود تا خامه فرم خود را حفظ کند.');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName.trim()) {
      setErrorMsg('لطفاً نام تحویل‌گیرنده را وارد کنید.');
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      setErrorMsg('لطفاً شماره تماس معتبر جهت ارسال پیامک وارد نمایید.');
      return;
    }
    if (deliveryMethod === 'courier' && !address.trim()) {
      setErrorMsg('لطفاً نشانی دقیق تحویل را وارد کنید.');
      return;
    }

    onConfirmSchedule({
      recipientName,
      phone,
      address: deliveryMethod === 'courier' ? address : 'تحویل حضوری از کارگاه شیرین‌بانو (نیاوران)',
      deliveryDate: selectedDateOption,
      deliveryTimeSlot: selectedTimeSlot,
      deliveryMethod,
      specialInstructions,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl border border-stone-200 relative my-6"
      >
        {/* Header */}
        <div className="p-4 bg-amber-50/80 border-b border-amber-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-xs">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-stone-900">زمان‌بندی پخت و تحویل سفارش</h3>
              <p className="text-[11px] text-stone-500">
                بر اساس زمان مورد نیاز پخت شیرینی‌های تازه انتخابی شما
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white flex items-center justify-center text-stone-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {errorMsg && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs p-3 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Lead-time insight alert */}
          <div className="bg-amber-100/60 border border-amber-300/70 rounded-2xl p-3 text-xs text-amber-900 flex items-start gap-2.5">
            <Clock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-950">قانون طلایی کیفیت شیرینی خانگی:</p>
              <p className="text-[11px] text-amber-900/90 mt-0.5 leading-relaxed">
                شیرینی‌های شما از پیش آماده نیستند؛ مواد اولیه تازه پس از ثبت سفارش با دست ترکیب و درون فر پخته می‌شوند. حداکثر زمان پخت این سبد: {toPersianDigits(maxPrepHours)} ساعت است.
              </p>
            </div>
          </div>

          {/* Delivery Date Selection Cards */}
          <div>
            <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5 mb-2.5">
              <Calendar className="w-3.5 h-3.5 text-amber-600" />
              انتخاب تاریخ تحویل شیرینی:
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {deliveryDateOptions.map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  disabled={!opt.isFeasible}
                  onClick={() => setSelectedDateOption(opt.dateLabel)}
                  className={`p-3 rounded-2xl border text-right transition-all flex flex-col justify-between ${
                    selectedDateOption === opt.dateLabel
                      ? 'border-amber-600 bg-amber-50/70 ring-2 ring-amber-500/20'
                      : opt.isFeasible
                      ? 'border-stone-200 hover:border-amber-300 bg-stone-50/50'
                      : 'border-stone-100 bg-stone-100/60 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-stone-900">{opt.title}</span>
                    {selectedDateOption === opt.dateLabel && (
                      <CheckCircle className="w-4 h-4 text-amber-600" />
                    )}
                  </div>
                  <span className="text-[10px] text-stone-500 mt-1">{opt.subtitle}</span>
                  {!opt.isFeasible && (
                    <span className="text-[9px] text-rose-500 mt-1 font-medium">نیاز به زمان بیشتر</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Time Slot Selection */}
          <div>
            <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5 mb-2">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              بازه زمانی ترجیحی برای تحویل:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {timeSlots.map((slot) => (
                <button
                  type="button"
                  key={slot}
                  onClick={() => setSelectedTimeSlot(slot)}
                  className={`p-2.5 rounded-xl border text-center text-xs font-medium transition-all ${
                    selectedTimeSlot === slot
                      ? 'border-amber-600 bg-amber-600 text-white shadow-xs'
                      : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  {slot.split(' ')[0]} {slot.split(' ')[1]} {slot.split(' ')[2]}
                </button>
              ))}
            </div>
          </div>

          {/* Delivery Method Toggle */}
          <div>
            <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5 mb-2">
              <Truck className="w-3.5 h-3.5 text-amber-600" />
              شیوه تحویل سفارش:
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setDeliveryMethod('courier')}
                className={`p-3 rounded-2xl border text-right transition-all flex items-center gap-2.5 ${
                  deliveryMethod === 'courier'
                    ? 'border-amber-600 bg-amber-50/70 text-amber-950 font-bold'
                    : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                <Truck className="w-4 h-4 text-amber-600" />
                <div className="text-xs">
                  <div>پیک مخصوص کیک و شیرینی</div>
                  <div className="text-[10px] text-stone-500 font-normal">محفظه ضدضربه و خنک</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryMethod('pickup')}
                className={`p-3 rounded-2xl border text-right transition-all flex items-center gap-2.5 ${
                  deliveryMethod === 'pickup'
                    ? 'border-amber-600 bg-amber-50/70 text-amber-950 font-bold'
                    : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                <Store className="w-4 h-4 text-amber-600" />
                <div className="text-xs">
                  <div>تحویل حضوری از کارگاه</div>
                  <div className="text-[10px] text-stone-500 font-normal">نیاوران (بدون هزینه ارسال)</div>
                </div>
              </button>
            </div>
          </div>

          {/* Recipient Contact Info */}
          <div className="space-y-3 pt-2 border-t border-stone-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-stone-700 flex items-center gap-1 mb-1">
                  <User className="w-3.5 h-3.5 text-amber-600" />
                  نام و نام خانوادگی تحویل‌گیرنده:
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-stone-50"
                  placeholder="مثلاً: مریم احمدی"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 flex items-center gap-1 mb-1">
                  <Phone className="w-3.5 h-3.5 text-amber-600" />
                  شماره موبایل (جهت پیامک وضعیت):
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-stone-50 text-left font-mono"
                  placeholder="۰۹۱۲..."
                  dir="ltr"
                />
              </div>
            </div>

            {deliveryMethod === 'courier' && (
              <div>
                <label className="text-xs font-bold text-stone-700 flex items-center gap-1 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  نشانی کامل پستی تحویل:
                </label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-stone-50"
                  placeholder="شهر، خیابان، کوچه، پلاک، زنگ، واحد..."
                />
              </div>
            )}

            <div>
              <label className="text-xs font-medium text-stone-600 mb-1 block">
                توضیحات تکمیلی تحویل (اختیاری):
              </label>
              <input
                type="text"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-stone-50 placeholder:text-stone-400"
                placeholder="توضیح برای پیک مثل موقعیت زنگ، هماهنگی تلفنی و..."
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-amber-600 hover:bg-amber-700 active:scale-98 text-white rounded-2xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <span>تایید زمان‌بندی و رفتن به درگاه پرداخت</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
