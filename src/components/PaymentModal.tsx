import React, { useState, useEffect } from 'react';
import { 
  X, 
  CreditCard, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  Clock, 
  RefreshCw, 
  Smartphone,
  ArrowRight,
  Send
} from 'lucide-react';
import { CartItem, DeliveryDetails, Order } from '../types/confectionery';
import { formatPrice, toPersianDigits } from '../utils/formatters';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  delivery: DeliveryDetails | null;
  onPaymentSuccess: (order: Order) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  items,
  delivery,
  onPaymentSuccess,
}) => {
  if (!isOpen || !delivery) return null;

  const totalItemsPrice = items.reduce((sum, item) => sum + item.itemTotalPrice, 0);
  const packagingFee = 20000;
  const deliveryFee = totalItemsPrice > 700000 || delivery.deliveryMethod === 'pickup' ? 0 : 45000;
  const grandTotal = totalItemsPrice + packagingFee + deliveryFee;

  const [paymentTab, setPaymentTab] = useState<'gateway' | 'card_to_card'>('gateway');
  const [cardNumber, setCardNumber] = useState('۶۰۳۷-۹۹۷۵-۸۴۲۱-۳۰۲۲');
  const [cvv2, setCvv2] = useState('۳۸۲');
  const [expMonth, setExpMonth] = useState('۰۸');
  const [expYear, setExpYear] = useState('۰۶');
  const [dynamicOtp, setDynamicOtp] = useState('۸۴۹۲۱');
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(120);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardTransferRef, setCardTransferRef] = useState('۸۳۷۲۹۴۰۱');

  // Handle countdown for OTP
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpSent && countdown > 0) {
      timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [otpSent, countdown]);

  const handleRequestOtp = () => {
    setOtpSent(true);
    setCountdown(120);
    setDynamicOtp(String(Math.floor(10000 + Math.random() * 90000)));
  };

  const handleExecutePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const orderNumber = `SH-${Math.floor(1000 + Math.random() * 9000)}`;
      const trackingCode = `TRK-${Math.floor(1000000 + Math.random() * 9000000)}`;
      
      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber,
        createdAt: 'امروز ساعت ' + new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
        items: [...items],
        delivery,
        totalItemsPrice,
        deliveryFee,
        packagingFee,
        totalAmount: grandTotal,
        paymentMethod: paymentTab === 'gateway' ? 'online' : 'card_to_card',
        paymentStatus: 'paid',
        trackingCode,
        status: 'received',
        statusLabel: 'سفارش دریافت شد و در صف آماده‌سازی قرار گرفت',
      };

      setIsProcessing(false);
      onPaymentSuccess(newOrder);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-stone-200 relative my-6"
      >
        {/* Header - Shaparak Gateway Style */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-emerald-300 border border-white/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm">درگاه پرداخت امن شاپرک</span>
                <span className="bg-emerald-500/30 text-emerald-200 text-[10px] px-1.5 py-0.2 rounded font-mono">SSL 256-bit</span>
              </div>
              <p className="text-[11px] text-emerald-100/80">پذیرنده: کارگاه شیرینی خانگی یاس</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Amount Pill */}
        <div className="bg-amber-50/80 px-5 py-3 border-b border-amber-200/60 flex items-center justify-between">
          <span className="text-xs text-stone-600 font-medium">مبلغ قابل پرداخت:</span>
          <span className="font-black text-base text-amber-900">{formatPrice(grandTotal)}</span>
        </div>

        {/* Tab Selection: Online Gateway vs Card-to-Card */}
        <div className="p-4 sm:p-6 space-y-4">
          <div className="flex items-center bg-stone-100 p-1 rounded-2xl border border-stone-200 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setPaymentTab('gateway')}
              className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                paymentTab === 'gateway'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
              <span>پرداخت آنلاین شتاب</span>
            </button>
            <button
              type="button"
              onClick={() => setPaymentTab('card_to_card')}
              className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                paymentTab === 'card_to_card'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-amber-600" />
              <span>کارت به کارت / ثبت فیش</span>
            </button>
          </div>

          {/* Online Gateway Form */}
          {paymentTab === 'gateway' ? (
            <form onSubmit={handleExecutePayment} className="space-y-3.5">
              {/* Card Number */}
              <div>
                <label className="text-xs font-bold text-stone-700 flex items-center justify-between mb-1">
                  <span>شماره ۱۶ رقمی کارت بانکی:</span>
                  <span className="text-[10px] text-stone-600 font-normal">تمامی بانک‌های عضو شتاب</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    dir="ltr"
                    className="w-full text-xs font-mono font-bold tracking-widest p-2.5 pl-10 rounded-xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 bg-stone-50/70"
                    placeholder="xxxx-xxxx-xxxx-xxxx"
                  />
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                </div>
              </div>

              {/* CVV2 and Expiration */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-stone-700 mb-1 block">
                    کد شناسایی (CVV2):
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    value={cvv2}
                    onChange={(e) => setCvv2(e.target.value)}
                    dir="ltr"
                    className="w-full text-xs font-mono p-2.5 rounded-xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 bg-stone-50 text-center font-bold"
                    placeholder="۳ یا ۴ رقم"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 mb-1 block">
                    تاریخ انقضا (ماه / سال):
                  </label>
                  <div className="flex items-center gap-1.5" dir="ltr">
                    <input
                      type="text"
                      maxLength={2}
                      value={expMonth}
                      onChange={(e) => setExpMonth(e.target.value)}
                      className="w-full text-xs font-mono p-2.5 rounded-xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 bg-stone-50 text-center font-bold"
                      placeholder="MM"
                    />
                    <span className="text-stone-400">/</span>
                    <input
                      type="text"
                      maxLength={2}
                      value={expYear}
                      onChange={(e) => setExpYear(e.target.value)}
                      className="w-full text-xs font-mono p-2.5 rounded-xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 bg-stone-50 text-center font-bold"
                      placeholder="YY"
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic OTP */}
              <div>
                <label className="text-xs font-bold text-stone-700 flex items-center justify-between mb-1">
                  <span>رمز یکبار مصرف پویا (OTP):</span>
                  {otpSent && (
                    <span className="text-[10px] text-amber-700 font-mono">
                      اعتبار: {toPersianDigits(countdown)} ثانیه
                    </span>
                  )}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={7}
                    value={dynamicOtp}
                    onChange={(e) => setDynamicOtp(e.target.value)}
                    dir="ltr"
                    className="flex-1 text-xs font-mono p-2.5 rounded-xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 bg-stone-50 text-center font-bold"
                    placeholder="کد ۵ رقمی پیامک شده"
                  />
                  <button
                    type="button"
                    onClick={handleRequestOtp}
                    className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold transition-colors whitespace-nowrap"
                  >
                    {otpSent ? 'ارسال مجدد' : 'دریافت رمز پویا'}
                  </button>
                </div>
              </div>

              {/* Dual SMS Notice */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-2.5 text-[11px] text-emerald-900 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p>
                  به محض پرداخت، پیامک تایید با کد رهگیری برای شما و پیامک هشدار سفارش فوری برای شیرینی‌پز ارسال خواهد شد.
                </p>
              </div>

              {/* Pay Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white rounded-2xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all mt-4"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>در حال اتصال به شاپرک و ثبت پرداخت...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>پرداخت {formatPrice(grandTotal)} (تست آنلاین)</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Card to Card Form */
            <div className="space-y-3.5">
              <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-3.5 text-xs text-amber-950 space-y-1.5">
                <div className="font-bold flex items-center justify-between">
                  <span>شماره کارت کارگاه خانگی:</span>
                  <span className="text-[11px] bg-amber-200/60 px-2 py-0.5 rounded-md font-normal">بانک ملت</span>
                </div>
                <div className="font-mono text-sm tracking-widest text-center py-1 font-bold text-stone-900" dir="ltr">
                  ۶۱۰۴ - ۳۳۷۸ - ۹۴۱۱ - ۴۸۲۹
                </div>
                <div className="text-[11px] text-stone-600 text-center">
                  به نام: مریم سعادتی (شیرین‌بانو)
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 mb-1 block">
                  شماره پیگیری واریز یا ۴ رقم آخر کارت شما:
                </label>
                <input
                  type="text"
                  value={cardTransferRef}
                  onChange={(e) => setCardTransferRef(e.target.value)}
                  dir="ltr"
                  className="w-full text-xs font-mono p-2.5 rounded-xl border border-stone-200 bg-stone-50 text-center font-bold"
                  placeholder="مثلاً: ۷۳۹۲۰۱۸۲"
                />
              </div>

              <button
                type="button"
                onClick={handleExecutePayment}
                disabled={isProcessing}
                className="w-full py-3.5 px-4 bg-amber-600 hover:bg-amber-700 active:scale-98 text-white rounded-2xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all mt-2"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>در حال تایید فیش...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>ثبت نهایی فیش و اطلاع‌رسانی پیامکی</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
