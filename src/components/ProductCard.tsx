import React, { useState } from 'react';
import { 
  Clock, 
  ChevronRight, 
  ChevronLeft, 
  Plus, 
  Check, 
  Sparkles, 
  Eye, 
  Layers,
  Heart
} from 'lucide-react';
import { Product } from '../types/confectionery';
import { formatPrice, toPersianDigits } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
  onQuickAdd: (product: Product, quantityKg: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetails,
  onQuickAdd,
}) => {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [justAdded, setJustAdded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIdx((prev) => (prev + 1) % product.photos.length);
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIdx((prev) => (prev - 1 + product.photos.length) % product.photos.length);
  };

  const handleQuickAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAdd(product, product.minOrder);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <div 
      onClick={() => onOpenDetails(product)}
      className="group cursor-pointer bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
    >
      {/* Top Image Album Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100">
        <img
          src={product.photos[activePhotoIdx] || product.photos[0]}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
        />

        {/* Gradient Overlay for badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

        {/* Preparation lead time badge */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
          <div className="bg-stone-900/85 backdrop-blur-md text-amber-300 text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm border border-stone-700/50">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>{product.prepTimeLabel}</span>
          </div>

          {product.isBestseller && (
            <div className="bg-rose-500/95 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm">
              <Sparkles className="w-2.5 h-2.5" />
              <span>پرفروش هفته</span>
            </div>
          )}
        </div>

        {/* Favorite toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-stone-700 hover:text-rose-500 hover:bg-white transition-all shadow-xs"
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Photo Gallery Indicator & Arrows */}
        {product.photos.length > 1 && (
          <>
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10">
              {product.photos.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === activePhotoIdx 
                      ? 'w-4 bg-white shadow-sm' 
                      : 'w-1.5 bg-white/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handlePrevPhoto}
              className="opacity-0 group-hover:opacity-100 transition-opacity absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-stone-800 shadow-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextPhoto}
              className="opacity-0 group-hover:opacity-100 transition-opacity absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-stone-800 shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Photo count pill */}
        <div className="absolute bottom-2.5 right-3 bg-black/60 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1 font-medium">
          <Layers className="w-3 h-3 text-stone-300" />
          <span>{toPersianDigits(product.photos.length)} عکس</span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
              {product.categoryLabel}
            </span>
            <span className="text-[11px] text-stone-600 font-medium">
              ماندگاری: {toPersianDigits(product.shelfLifeDays)} روز
            </span>
          </div>

          <h3 className="font-bold text-base text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-1">
            {product.title}
          </h3>

          <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Key ingredients chips */}
          <div className="flex flex-wrap gap-1 mt-2.5">
            {product.ingredients.slice(0, 3).map((ing, idx) => (
              <span key={idx} className="text-[10px] text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full">
                {ing}
              </span>
            ))}
            {product.ingredients.length > 3 && (
              <span className="text-[10px] text-stone-600 bg-stone-50 px-1.5 py-0.5 rounded-full">
                +{toPersianDigits(product.ingredients.length - 3)}
              </span>
            )}
          </div>
        </div>

        {/* Bottom Price & Order Actions */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-[11px] text-stone-600">قیمت هر {product.unit.split(' ')[0]}:</div>
            <div className="text-base font-extrabold text-stone-900">
              {formatPrice(product.pricePerKg)}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetails(product);
              }}
              className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
              title="مشاهده آلبوم و مشخصات کامل"
            >
              <Eye className="w-4 h-4" />
            </button>

            <button
              onClick={handleQuickAddClick}
              disabled={justAdded}
              className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                justAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs hover:shadow-md'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>ثبت شد</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>افزودن ({toPersianDigits(product.minOrder)})</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
