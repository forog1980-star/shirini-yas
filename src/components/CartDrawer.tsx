import React from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  Clock, 
  ShieldCheck, 
  ArrowLeft, 
  ShoppingBag,
  Sparkles,
  Gift
} from 'lucide-react';
import { CartItem } from '../types/confectionery';
import { formatPrice, toPersianDigits } from '../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, newQty: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToDelivery: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToDelivery,
}) => {
  if (!isOpen) return null;

  const totalItemsPrice = items.reduce((sum, item) => sum + item.itemTotalPrice, 0);
  const packagingFee = items.length > 0 ? 20000 : 0; // جعبه بهداشتی پنجره‌دار قنادی
  const deliveryFee = totalItemsPrice > 700000 || items.length === 0 ? 0 : 45000;
  const grandTotal = totalItemsPrice + packagingFee + deliveryFee;

  // Maximum prep time required across selected items
  const maxPrepHours = items.reduce((max, item) => Math.max(max, item.product.prepTimeHours), 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-left duration-300"
      >
        {/* Header */}
        <div className="p-4 bg-white border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-stone-900">سبد سفارش شیرینی</h3>
              <p className="text-[11px] text-stone-500">
                {items.length === 0 ? 'سبد خالی است' : `${toPersianDigits(items.length)} ردیف شیرینی انتخابی`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-stone-100 flex items-center justify-center text-stone-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-16 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center text-amber-400 mb-3 border border-amber-200/50">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-stone-800 text-sm">سبد سفارش شما خالی است</h4>
              <p className="text-xs text-stone-500 max-w-xs mt-1 leading-relaxed">
                از ویترین شیرینی‌های تازه، شیرینی مورد علاقه‌تان را انتخاب کنید تا برای شما پخته شود.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
              >
                مشاهده ویترین شیرینی‌ها
              </button>
            </div>
          ) : (
            <>
              {/* Lead-time alert header */}
              {maxPrepHours > 0 && (
                <div className="bg-amber-100/70 border border-amber-300/80 rounded-2xl p-3 text-xs text-amber-900 flex items-start gap-2 shadow-xs">
                  <Clock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">زمان‌بندی تهیه این سبد:</span>
                    <span className="mr-1">
                      حداقل {toPersianDigits(maxPrepHours)} ساعت زمان برای تهیه و پخت سفارش لازم است.
                    </span>
                  </div>
                </div>
              )}

              {/* Items Cards */}
              {items.map((item) => (
                <div 
                  key={item.product.id}
                  className="bg-white rounded-2xl p-3 border border-stone-200/90 shadow-xs flex flex-col gap-2.5"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={item.product.photos[0]}
                      alt={item.product.title}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 bg-stone-100 border border-stone-200/50"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-bold text-xs text-stone-900 truncate">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-stone-400 hover:text-rose-500 transition-colors p-1"
                          title="حذف این مورد"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-stone-500 mt-0.5">
                        نرخ: {formatPrice(item.product.pricePerKg)}
                      </div>

                      {item.customerNote && (
                        <div className="text-[10px] bg-amber-50 text-amber-900 border border-amber-200/60 rounded-lg p-1.5 mt-1.5">
                          <span className="font-semibold">یادداشت شما: </span>
                          <span>{item.customerNote}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quantity and Line Total */}
                  <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                    <div className="flex items-center bg-stone-100 rounded-lg p-0.5 border border-stone-200">
                      <button
                        onClick={() => {
                          const newQty = +(item.quantityKg - item.product.step).toFixed(1);
                          if (newQty < item.product.minOrder) {
                            onRemoveItem(item.product.id);
                          } else {
                            onUpdateQuantity(item.product.id, newQty);
                          }
                        }}
                        className="w-6 h-6 rounded-md bg-white flex items-center justify-center text-stone-700 shadow-xs hover:bg-stone-50"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-12 text-center text-xs font-bold text-stone-900">
                        {toPersianDigits(item.quantityKg)}
                      </span>
                      <button
                        onClick={() => {
                          const newQty = +(item.quantityKg + item.product.step).toFixed(1);
                          onUpdateQuantity(item.product.id, newQty);
                        }}
                        className="w-6 h-6 rounded-md bg-white flex items-center justify-center text-stone-700 shadow-xs hover:bg-stone-50"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="font-extrabold text-xs text-stone-900">
                      {formatPrice(item.itemTotalPrice)}
                    </div>
                  </div>
                </div>
              ))}

              {/* Free courier progress */}
              <div className="bg-white rounded-2xl p-3 border border-stone-200 text-xs text-stone-600">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold flex items-center gap-1">
                    <Gift className="w-3.5 h-3.5 text-amber-600" />
                    ارسال رایگان با پیک اختصاصی:
                  </span>
                  <span>
                    {totalItemsPrice >= 700000 
                      ? 'فعال شد 🎉' 
                      : `${formatPrice(700000 - totalItemsPrice)} تا ارسال رایگان`}
                  </span>
                </div>
                <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-amber-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (totalItemsPrice / 700000) * 100)}%` }}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Summary & Action */}
        {items.length > 0 && (
          <div className="p-4 bg-white border-t border-stone-200 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>جمع اقلام:</span>
                <span>{formatPrice(totalItemsPrice)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>بسته‌بندی بهداشتی کارگاهی و روبان:</span>
                <span>{formatPrice(packagingFee)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>هزینه پیک مخصوص حمل کیک و شیرینی:</span>
                <span>{deliveryFee === 0 ? 'رایگان' : formatPrice(deliveryFee)}</span>
              </div>
              <div className="flex justify-between font-extrabold text-sm text-stone-900 pt-2 border-t border-stone-100">
                <span>مبلغ نهایی قابل پرداخت:</span>
                <span className="text-amber-900 text-base">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            <button
              onClick={onProceedToDelivery}
              className="w-full py-3.5 px-4 bg-amber-600 hover:bg-amber-700 active:scale-98 text-white rounded-2xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <span>مرحله بعد: زمان‌بندی تحویل و آدرس</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
