import React from 'react';
import { ShoppingBag, MessageCircle, ClipboardList, Store, UserCheck } from 'lucide-react';
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
  openCart,
  openChat,
  openOrdersList,
}) => (
  <header className="sticky top-0 z-40 bg-[#fffafd]/95 backdrop-blur-xl border-b border-[#ead9eb] shadow-sm select-none">
    <div className="max-w-6xl mx-auto px-3 sm:px-5 py-3 space-y-3">
      <button
        onClick={() => setActiveView('store')}
        className="mx-auto flex items-center justify-center gap-3 text-center"
        aria-label="بازگشت به ویترین شیرینی یاس"
      >
        {customLogoUrl ? (
          <img src={customLogoUrl} alt="لوگوی شیرینی یاس" className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-[#d9b96e] shadow-sm" />
        ) : (
          <span className="w-14 h-14 rounded-full bg-[#f8eaf4] border-2 border-[#d9b96e] flex items-center justify-center text-[#8c5b86] text-2xl">❀</span>
        )}
        <span className="flex flex-col items-start">
          <span className="text-xl sm:text-2xl font-black tracking-tight text-[#80547f]">شیرینی یاس <span className="text-sm font-bold text-[#c27d9f]">خانگی</span></span>
          <span className="text-[11px] sm:text-xs text-[#9b7897]">کارگاه پخت شیرینی به‌صورت خانگی</span>
        </span>
      </button>

      <nav className="flex flex-wrap items-center justify-center gap-2 border-t border-[#f0e4ef] pt-3" aria-label="منوی اصلی">
        <button onClick={() => setActiveView('store')} className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-colors ${activeView === 'store' ? 'bg-[#ead8ee] text-[#714b78]' : 'bg-white text-[#8a718a] hover:bg-[#f8eff7]'}`}>
          <Store className="w-4 h-4" /><span>ویترین خریدار</span>
        </button>
        <button onClick={() => setActiveView('admin')} className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-colors ${activeView === 'admin' ? 'bg-[#d9b96e] text-white' : 'bg-white text-[#8a718a] hover:bg-[#fbf5e8]'}`}>
          <UserCheck className="w-4 h-4" /><span>پنل قناد</span>
        </button>
        <button onClick={openCart} className="flex items-center gap-1.5 rounded-xl bg-[#80547f] px-3 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#70466f]">
          <ShoppingBag className="w-4 h-4" /><span>سبد خرید</span>
          {cartCount > 0 && <span className="rounded-full bg-[#f4dce8] px-1.5 text-[10px] text-[#80547f]">{toPersianDigits(cartCount)}</span>}
        </button>
        <button onClick={openChat} className="relative flex items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-xs font-bold text-[#8a718a] hover:bg-[#f8eff7]">
          <MessageCircle className="w-4 h-4" /><span>چت</span>
          {unreadMessagesCount > 0 && <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#d77d9f] text-[9px] text-white">{toPersianDigits(unreadMessagesCount)}</span>}
        </button>
        <button onClick={openOrdersList} className="flex items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-xs font-bold text-[#8a718a] hover:bg-[#f8eff7]">
          <ClipboardList className="w-4 h-4" /><span>پیگیری سفارش</span>
        </button>
      </nav>
    </div>
  </header>
);
