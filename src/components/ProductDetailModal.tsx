import React, { useState } from 'react';
import { 
  X, 
  Clock, 
  Sparkles, 
  Plus, 
  Minus, 
  ShoppingBag, 
  MessageSquareQuote, 
  Utensils, 
  ShieldCheck,
  CheckCircle2,
  CalendarClock
} from 'lucide-react';
import { Product } from '../types/confectionery';
import { formatPrice, toPersianDigits } from '../utils/formatters';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantityKg: number, customerNote?: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState(0);
  const [quantity, setQuantity] = useState(product.minOrder);
  const [note, setNote] = useState('');
  const [addedSuccess, setAddedSuccess] = useState(false);

  const handleIncrease = () => {
    setQuantity((prev) => +(prev + product.step).toFixed(1));
  };

  const handleDecrease = () => {
    if (quantity > product.minOrder) {
      setQuantity((prev) => +(prev - product.step).toFixed(1));
    }
  };

  const totalPrice = Math.round(product.pricePerKg * quantity);

  const handleAdd = () => {
    onAddToCart(product, quantity, note.trim() ? note.trim() : undefined);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-stone-200 relative my-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-stone-900 flex items-center justify-center shadow-md transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Body */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Photo Gallery Column */}
          <div className="bg-stone-50 p-4 flex flex-col gap-3 justify-between">
            {/* Main Active Photo */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-inner bg-stone-200">
              <img
                src={product.photos[selectedPhotoIdx] || product.photos[0]}
                alt={product.title}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded-lg">
                تصویر {toPersianDigits(selectedPhotoIdx + 1)} از {toPersianDigits(product.photos.length)}
              </div>
            </div>

            {/* Thumbnails Row */}
            {product.photos.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {product.photos.map((photo, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPhotoIdx(idx)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                      idx === selectedPhotoIdx
                        ? 'border-amber-600 scale-95 shadow-xs'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={photo} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Preparation time reminder callout */}
            <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-3 text-xs text-amber-900 flex items-start gap-2.5">
              <CalendarClock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">زمان‌بندی پخت و استراحت:</p>
                <p className="text-amber-800/90 text-[11px] mt-0.5">
                  این شیرینی برای حفظ نهایت کیفیت و تازگی، {product.prepTimeLabel} پخته می‌شود.
                </p>
              </div>
            </div>
          </div>

          {/* Details & Ordering Column */}
          <div className="p-5 sm:p-6 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Category & Shelf life */}
              <div className="flex items-center justify-between gap-2 text-xs mb-2">
                <span className="font-semibold text-amber-700 bg-amber-100/70 px-2.5 py-1 rounded-lg">
                  {product.categoryLabel}
                </span>
                <span className="text-stone-600 flex items-center gap-1 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  ماندگاری: {toPersianDigits(product.shelfLifeDays)} روز در یخچال
                </span>
              </div>

              <h2 className="text-xl font-black text-stone-900 leading-tight">
                {product.title}
              </h2>

              <p className="text-stone-600 text-xs sm:text-sm mt-2 leading-relaxed">
                {product.description}
              </p>

              {/* Ingredients */}
              <div className="mt-4 pt-3 border-t border-stone-100">
                <h4 className="text-xs font-bold text-stone-700 flex items-center gap-1.5 mb-2">
                  <Utensils className="w-3.5 h-3.5 text-amber-600" />
                  ترکیبات و مواد اولیه تازه:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {product.ingredients.map((ing, i) => (
                    <span 
                      key={i} 
                      className="text-xs bg-stone-100 text-stone-700 px-2.5 py-1 rounded-lg border border-stone-200/50"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Special Customer Customization Note */}
              <div className="mt-4 pt-3 border-t border-stone-100">
                <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5 mb-1.5">
                  <MessageSquareQuote className="w-3.5 h-3.5 text-amber-600" />
                  یادداشت و سلیقه شما برای شیرینی‌پز (اختیاری):
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="مثلاً: نوشته روی کیک تولد، میزان شکر کمتر، بسته‌بندی کادویی روبان‌پیچ..."
                  rows={2}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-stone-50/50 placeholder:text-stone-400"
                />
              </div>
            </div>

            {/* Quantity Selector & Add Action */}
            <div className="mt-6 pt-4 border-t border-stone-200">
              <div className="flex items-center justify-between gap-4 mb-3">
                <span className="text-xs font-bold text-stone-700">
                  انتخاب مقدار ({product.unit}):
                </span>
                <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200">
                  <button
                    onClick={handleDecrease}
                    disabled={quantity <= product.minOrder}
                    className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-stone-700 disabled:opacity-40 disabled:hover:bg-white hover:bg-stone-50 transition-colors shadow-xs"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-14 text-center font-black text-sm text-stone-900">
                    {toPersianDigits(quantity)}
                  </span>
                  <button
                    onClick={handleIncrease}
                    className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-stone-700 hover:bg-stone-50 transition-colors shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Total Calculated Price */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs text-stone-500">جمع مبلغ این قلم:</div>
                <div className="text-lg font-black text-amber-900">
                  {formatPrice(totalPrice)}
                </div>
              </div>

              {/* Add CTA */}
              <button
                onClick={handleAdd}
                disabled={addedSuccess}
                className={`w-full py-3 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
                  addedSuccess
                    ? 'bg-emerald-600 text-white'
                    : 'bg-amber-600 hover:bg-amber-700 active:scale-98 text-white'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>به سبد اضافه شد!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>افزودن به سبد سفارش</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
