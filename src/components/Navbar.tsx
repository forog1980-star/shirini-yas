import React from 'react';
import { 
  Cake, 
  ShoppingBag, 
  MessageCircle, 
  ClipboardList, 
  Store, 
  UserCheck, 
  Sparkles,
  Lightbulb,
  PhoneCall
} from 'lucide-react';
import { toPersianDigits } from '../utils/formatters';

interface NavbarProps {
  activeView: 'store' | 'admin';
  setActiveView: (view: 'store' | 'admin') => void;
  cartCount: number;
  unreadMessagesCount: number;
  customLogoUrl: string | null;
  onUploadLogoClick: () => void;
  openCart: () => void;
  openChat: () => void;
  openOrdersList: () => void;
  openProposal: () => void;
  openHostingGuide: () => void;
  openScreensModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  cartCount,
  unreadMessagesCount,
  customLogoUrl,
  onUploadLogoClick,
  openCart,
  openChat,
  openOrdersList,
  openProposal,
  openHostingGuide,
  openScreensModal,
}) => {
  const [showToolsMenu, setShowToolsMenu] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-amber-900/10 shadow-xs select-none">
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 text-amber-50 text-[11px] py-1 px-3 text-center font-medium flex items-center justify-center gap-1.5 overflow-hidden">
        <Sparkles className="w-3 h-3 text-amber-200 shrink-0" />
        <span className="truncate">کارگاه شیرینی خانگی یاس | سفارش آنلاین با پخت روزانه</span>
      </div>

      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-2.5 space-y-2">
        {/* ROW 1: Centered Logo and Brand Identity */}
        <div className="flex items-center justify-between">
          {/* Quick Tools button (Left on RTL) */}
          <div className="relative">
            <button
              onClick={() => setShowToolsMenu(!showToolsMenu)}
              className="flex items-center gap-1 text-[11px] font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 px-2.5 py-1 rounded-xl transition-all shadow-2xs"
              title="ابزارها، طرح‌نامه و دانلود کدها"
            >
              <span>منوی اسناد</span>
              <span className="text-[10px]">▾</span>
            </button>

            {/* Dropdown Menu for Documents & Tools */}
            {showToolsMenu && (
              <div 
                className="absolute left-0 mt-1.5 w-52 bg-white rounded-2xl shadow-xl border border-stone-200 p-2 z-50 text-xs space-y-1 animate-in fade-in duration-150"
                onClick={() => setShowToolsMenu(false)}
              >
                <button
                  onClick={openScreensModal}
                  className="w-full text-right p-2 hover:bg-amber-50 text-stone-800 rounded-xl font-bold flex items-center justify-between"
                >
                  <span>طرح‌نامه رسمی و نماها</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                </button>

                <button
                  onClick={openHostingGuide}
                  className="w-full text-right p-2 hover:bg-blue-50 text-stone-800 rounded-xl font-bold flex items-center justify-between"
                >
                  <span>راهنمای هاست و سرور ایران</span>
                  <span className="text-blue-600 text-[10px]">🌐</span>
                </button>

                <button
                  onClick={openProposal}
                  className="w-full text-right p-2 hover:bg-amber-50 text-stone-800 rounded-xl font-medium flex items-center justify-between"
                >
                  <span>پیشنهاد توسعه تجاری</span>
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                </button>

                <div className="pt-1 border-t border-stone-100">
                  <a
                    href="/shirini-yas-project.zip"
                    download="shirini-yas-project.zip"
                    className="w-full text-right p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-xl font-black flex items-center justify-between"
                  >
                    <span>دانلود کل پروژه (ZIP)</span>
                    <span className="text-emerald-600">📥</span>
                  </a>
                </div>

                <button
                  onClick={onUploadLogoClick}
                  className="w-full text-right p-2 hover:bg-stone-50 text-stone-600 rounded-xl text-[11px] flex items-center justify-between"
                >
                  <span>تغییر فایل لوگو</span>
                  <span>✏️</span>
                </button>
              </div>
            )}
          </div>

          {/* Center Brand: Logo + Title */}
          <div 
            onClick={() => setActiveView('store')}
            className="cursor-pointer flex flex-col items-center group"
          >
            <div className="flex items-center gap-2">
              {customLogoUrl ? (
                <img
                  src={customLogoUrl}
                  alt="لوگوی شیرینی یاس"
                  className="w-9 h-9 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-amber-400 shadow-sm group-hover:scale-105 transition-transform"
                />
              ) : (
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-amber-100 to-rose-50 border border-amber-300 flex items-center justify-center text-amber-800 shadow-xs">
                  <Cake className="w-5 h-5 text-amber-700" />
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <span className="font-black text-base sm:text-lg text-stone-900 tracking-tight">شیرینی یاس</span>
                <span className="text-[9px] bg-rose-50 text-rose-700 border border-rose-200 px-1.5 py-0.2 rounded-md font-bold">خانگی</span>
              </div>
            </div>
            <p className="text-[10px] text-stone-500 font-normal">کارگاه پخت شیرینی و کیک خانگی</p>
          </div>

          {/* Direct Zip Download Button (Right on RTL) */}
          <a
            href="/shirini-yas-project.zip"
            download="shirini-yas-project.zip"
            className="flex items-center gap-1 text-[11px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 rounded-xl transition-all shadow-xs"
            title="دانلود فایل فشرده پروژه ZIP"
          >
            <span>دانلود کد (ZIP)</span>
            <span className="text-xs">📥</span>
          </a>
        </div>

        {/* ROW 2: Mobile-first compact controls bar */}
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-stone-200/60">
          {/* Persona Switcher: Storefront vs Baker Panel */}
          <div className="flex items-center bg-stone-100 p-0.5 rounded-xl border border-stone-200 text-xs font-semibold">
            <button
              onClick={() => setActiveView('store')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all text-xs ${
                activeView === 'store'
                  ? 'bg-white text-stone-900 shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Store className="w-3.5 h-3.5 text-amber-600" />
              <span>ویترین خریدار</span>
            </button>
            <button
              onClick={() => setActiveView('admin')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all text-xs ${
                activeView === 'admin'
                  ? 'bg-amber-600 text-white shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>پنل قناد</span>
            </button>
          </div>

          {/* Action Icons: Chat, Tracking, Cart */}
          <div className="flex items-center gap-1.5">
            {/* Orders tracking */}
            <button
              onClick={openOrdersList}
              title="پیگیری سفارش‌ها"
              className="p-1.5 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-700 transition-colors"
            >
              <ClipboardList className="w-4 h-4" />
            </button>

            {/* Direct chat with Baker */}
            <button
              onClick={openChat}
              title="گفتگوی مستقیم با شیرینی‌پز"
              className="p-1.5 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-700 transition-colors relative"
            >
              <MessageCircle className="w-4 h-4" />
              {unreadMessagesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {toPersianDigits(unreadMessagesCount)}
                </span>
              )}
            </button>

            {/* Cart button */}
            <button
              onClick={openCart}
              className="flex items-center gap-1.5 bg-stone-900 hover:bg-stone-800 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-xs transition-all active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
              <span>سبد</span>
              {cartCount > 0 && (
                <span className="bg-amber-500 text-stone-950 px-1 py-0.2 rounded-full text-[10px] font-black">
                  {toPersianDigits(cartCount)}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
