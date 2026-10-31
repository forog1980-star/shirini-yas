import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  Image as ImageIcon, 
  Check, 
  Sparkles, 
  Palette, 
  RotateCcw 
} from 'lucide-react';

interface LogoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLogoUrl: string | null;
  onSaveLogo: (url: string | null) => void;
}

export const LogoUploadModal: React.FC<LogoUploadModalProps> = ({
  isOpen,
  onClose,
  currentLogoUrl,
  onSaveLogo,
}) => {
  if (!isOpen) return null;

  const [inputUrl, setInputUrl] = useState(currentLogoUrl || '');
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentLogoUrl);

  const logoPresets = [
    {
      title: 'لوگوی مینیمال گل یاس و کیک',
      url: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=400&q=80',
    },
    {
      title: 'لوگوی اصیل قنادی با کالیگرافی',
      url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80',
    },
    {
      title: 'لوگوی مدرن سرآشپز شیرینی‌پز',
      url: 'https://images.unsplash.com/photo-1558326567-98ae2405596b?auto=format&fit=crop&w=400&q=80',
    },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreviewUrl(base64);
        setInputUrl(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSaveLogo(previewUrl);
    onClose();
  };

  const handleReset = () => {
    setPreviewUrl(null);
    setInputUrl('');
    onSaveLogo(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-stone-200 relative my-6"
      >
        {/* Header */}
        <div className="p-4 bg-amber-50/80 border-b border-amber-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-xs">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-stone-900">بارگذاری لوگوی شیرینی یاس</h3>
              <p className="text-[11px] text-stone-500">
                تنظیم لوگوی اختصاصی کارگاه بر روی سربرگ و فاکتورها
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

        {/* Body */}
        <div className="p-5 space-y-4">
          {/* Current / New Logo Preview */}
          <div className="flex flex-col items-center justify-center p-4 bg-stone-50 rounded-2xl border border-stone-200">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-amber-400 bg-white shadow-md flex items-center justify-center mb-2">
              {previewUrl ? (
                <img src={previewUrl} alt="پیش‌نمایش لوگو" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-2 text-stone-400 text-xs">
                  <Sparkles className="w-6 h-6 mx-auto text-amber-500 mb-1" />
                  <span>لوگوی پیش‌فرض</span>
                </div>
              )}
            </div>
            <span className="font-bold text-xs text-stone-800">پیش‌نمایش نشان «شیرینی یاس»</span>
          </div>

          {/* Upload File Input */}
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1.5 flex items-center gap-1.5">
              <Upload className="w-3.5 h-3.5 text-amber-600" />
              بارگذاری فایل عکس لوگو از روی دستگاه (PNG / JPG / WebP):
            </label>
            <label className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-stone-300 hover:border-amber-500 rounded-2xl p-4 bg-stone-50 hover:bg-amber-50/50 transition-colors">
              <Upload className="w-6 h-6 text-stone-400 mb-1" />
              <span className="text-xs font-semibold text-stone-700">کلیک کنید یا فایل را بکشید اینجا</span>
              <span className="text-[10px] text-stone-400 mt-0.5">حداکثر حجم ۵ مگابایت</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Preset Logos */}
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1.5 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-amber-600" />
              یا انتخاب یکی از نشان‌های پیشنهادی برای قنادی یاس:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {logoPresets.map((preset, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => {
                    setPreviewUrl(preset.url);
                    setInputUrl(preset.url);
                  }}
                  className={`p-1.5 rounded-xl border text-center transition-all ${
                    previewUrl === preset.url
                      ? 'border-amber-600 ring-2 ring-amber-500/20 bg-amber-50'
                      : 'border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <img src={preset.url} alt="" className="w-full h-12 rounded-lg object-cover mb-1" />
                  <span className="text-[10px] text-stone-700 line-clamp-1">{preset.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="text-stone-500 hover:text-rose-600 text-xs font-semibold flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>بازنشانی به پیش‌فرض</span>
          </button>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 text-stone-600 hover:bg-stone-200 rounded-xl text-xs font-bold"
            >
              انصراف
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1"
            >
              <Check className="w-3.5 h-3.5" />
              <span>تایید و ذخیره لوگو</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
