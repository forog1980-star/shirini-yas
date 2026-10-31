import React from 'react';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  Truck, 
  MapPin, 
  Phone, 
  Sparkles, 
  ChefHat, 
  Flame, 
  PackageCheck,
  Calendar,
  Receipt
} from 'lucide-react';
import { Order } from '../types/confectionery';
import { formatPrice, toPersianDigits } from '../utils/formatters';

interface OrderTrackingModalProps {
  isOpen: boolean;
  orders: Order[];
  selectedOrderId?: string;
  onClose: () => void;
  onSelectOrder: (orderId: string) => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  orders,
  selectedOrderId,
  onClose,
  onSelectOrder,
}) => {
  if (!isOpen) return null;

  const activeOrder = orders.find((o) => o.id === selectedOrderId) || orders[0];

  const stages = [
    { key: 'received', label: 'ثبت و تایید سفارش', desc: 'سفارش در سیستم کارگاه ثبت و نوبت پخت مشخص شد', icon: CheckCircle2 },
    { key: 'in_prep', label: 'آماده‌سازی مواد اولیه', desc: 'توزین آرد اعلا، کره طبیعی و هل و زعفران قائنات', icon: ChefHat },
    { key: 'baking', label: 'پخت در فر کارگاه', desc: 'حرارت یکنواخت و ایجاد بافت پوک و طلایی', icon: Flame },
    { key: 'decorating', label: 'تزیین و فیلینگ خامه', desc: 'تزیین با خلال پسته، گاناش بلژیکی و استراحت خنک', icon: Sparkles },
    { key: 'ready', label: 'بسته‌بندی بهداشتی', desc: 'چیدمان در جعبه روبان‌پیچ ضدضربه قنادی', icon: PackageCheck },
    { key: 'delivered', label: 'ارسال با خودرو خنک', desc: 'تحویل به آدرس اعلام شده یا آماده تحویل حضوری', icon: Truck },
  ];

  if (!activeOrder) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <div className="bg-white p-6 rounded-3xl max-w-sm w-full text-center">
          <p className="text-stone-600 text-sm">هنوز سفارشی ثبت نشده است.</p>
          <button onClick={onClose} className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-xl text-xs font-bold">
            بستن
          </button>
        </div>
      </div>
    );
  }

  // Determine stage index
  const stageKeys = stages.map((s) => s.key);
  const currentStageIndex = Math.max(1, stageKeys.indexOf(activeOrder.status));

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-stone-200 relative my-6"
      >
        {/* Header */}
        <div className="p-4 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Receipt className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm">پیگیری سفارش #{activeOrder.orderNumber}</span>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full font-mono">
                  {activeOrder.trackingCode}
                </span>
              </div>
              <p className="text-[11px] text-stone-400">ثبت در {activeOrder.createdAt}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Order Selector Tab if multiple orders */}
        {orders.length > 1 && (
          <div className="bg-stone-100 p-2 border-b border-stone-200 flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-stone-500 font-bold shrink-0">سفارش‌های شما:</span>
            {orders.map((ord) => (
              <button
                key={ord.id}
                onClick={() => onSelectOrder(ord.id)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all font-semibold ${
                  ord.id === activeOrder.id
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white text-stone-700 hover:bg-amber-50 border border-stone-200'
                }`}
              >
                #{ord.orderNumber} ({formatPrice(ord.totalAmount)})
              </button>
            ))}
          </div>
        )}

        {/* Body Content */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Baking Timeline Visualizer */}
          <div>
            <h4 className="text-xs font-bold text-stone-900 flex items-center gap-1.5 mb-4">
              <Clock className="w-4 h-4 text-amber-600" />
              مراحل زنده آماده‌سازی در کارگاه شیرینی یاس:
            </h4>

            <div className="relative space-y-4 before:absolute before:inset-0 before:right-4 before:w-0.5 before:bg-stone-200">
              {stages.map((stage, idx) => {
                const IconComponent = stage.icon;
                const isPassed = idx <= currentStageIndex;
                const isCurrent = idx === currentStageIndex;

                return (
                  <div key={stage.key} className="relative flex items-start gap-4">
                    <div
                      className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
                        isCurrent
                          ? 'bg-amber-600 border-amber-300 text-white ring-4 ring-amber-100 shadow-sm animate-pulse'
                          : isPassed
                          ? 'bg-emerald-600 border-emerald-400 text-white'
                          : 'bg-white border-stone-300 text-stone-400'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>

                    <div className="flex-1 pt-0.5">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-bold ${
                            isCurrent
                              ? 'text-amber-900'
                              : isPassed
                              ? 'text-stone-900'
                              : 'text-stone-600'
                          }`}
                        >
                          {stage.label}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                            هم‌اکنون در این مرحله
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5">{stage.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery & Recipient summary */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/80 space-y-3">
            <h5 className="text-xs font-bold text-stone-900 flex items-center gap-1.5 border-b border-stone-200 pb-2">
              <Calendar className="w-4 h-4 text-amber-600" />
              اطلاعات زمان تحویل و گیرنده:
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-stone-500">تاریخ تحویل توافق‌شده:</span>
                <p className="font-bold text-stone-900 mt-0.5">{activeOrder.delivery.deliveryDate}</p>
              </div>

              <div>
                <span className="text-stone-500">بازه زمانی حضور پیک:</span>
                <p className="font-bold text-stone-900 mt-0.5">{activeOrder.delivery.deliveryTimeSlot}</p>
              </div>

              <div>
                <span className="text-stone-500">تحویل‌گیرنده:</span>
                <p className="font-bold text-stone-900 mt-0.5">
                  {activeOrder.delivery.recipientName} ({activeOrder.delivery.phone})
                </p>
              </div>

              <div>
                <span className="text-stone-500">نشانی تحویل:</span>
                <p className="font-bold text-stone-900 mt-0.5 line-clamp-2">
                  {activeOrder.delivery.address}
                </p>
              </div>
            </div>
          </div>

          {/* Items breakdown */}
          <div className="border border-stone-200 rounded-2xl p-4 space-y-2.5">
            <div className="text-xs font-bold text-stone-900 mb-2">اقلام سفارش:</div>
            {activeOrder.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-stone-100 last:border-b-0">
                <div className="flex items-center gap-2">
                  <img src={item.product.photos[0]} alt="" className="w-8 h-8 rounded-lg object-cover" />
                  <div>
                    <span className="font-semibold text-stone-900">{item.product.title}</span>
                    <span className="text-stone-500 text-[11px] mr-2">
                      ({toPersianDigits(item.quantityKg)} کیلو)
                    </span>
                  </div>
                </div>
                <span className="font-bold text-stone-900">{formatPrice(item.itemTotalPrice)}</span>
              </div>
            ))}

            <div className="pt-2 flex justify-between font-black text-sm text-amber-950 border-t border-stone-200">
              <span>مبلغ کل پرداخت‌شده:</span>
              <span>{formatPrice(activeOrder.totalAmount)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
