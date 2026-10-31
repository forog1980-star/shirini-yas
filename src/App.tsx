import React, { useState } from 'react';
import { 
  Cake, 
  Sparkles, 
  Search, 
  Filter, 
  Clock, 
  ShieldCheck, 
  Heart, 
  MessageCircle, 
  ShoppingBag, 
  Store, 
  Truck, 
  ChefHat, 
  Info,
  Calendar,
  CheckCircle2,
  PhoneCall,
  SlidersHorizontal,
  ChevronDown,
  Gift
} from 'lucide-react';
import { 
  Product, 
  CartItem, 
  Order, 
  DeliveryDetails, 
  ChatMessage, 
  SmsNotification, 
  BakerProfile 
} from './types/confectionery';
import { 
  initialProducts, 
  initialBakerProfile, 
  sampleOrderHistory 
} from './data/initialData';
import { formatPrice, toPersianDigits } from './utils/formatters';

// Components
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { DeliverySchedulingModal } from './components/DeliverySchedulingModal';
import { PaymentModal } from './components/PaymentModal';
import { SmsNotificationToast } from './components/SmsNotificationToast';
import { DirectChatModal } from './components/DirectChatModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { BakerAdminPanel } from './components/BakerAdminPanel';
import { BusinessProposalModal } from './components/BusinessProposalModal';
import { HostingDeploymentGuideModal } from './components/HostingDeploymentGuideModal';
import { LogoUploadModal } from './components/LogoUploadModal';
import { ScreenshotsShowcaseModal } from './components/ScreenshotsShowcaseModal';

export default function App() {
  // Main Data States
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [bakerProfile, setBakerProfile] = useState<BakerProfile>(initialBakerProfile);
  const [orders, setOrders] = useState<Order[]>(sampleOrderHistory as unknown as Order[]);
  
  // Custom Logo State - Official Yas Confectionery Emblem
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(
    '/assets/aistudio/photo_2026-10-11_20-52-21_08dc8782.jpg'
  );
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [isHostingGuideOpen, setIsHostingGuideOpen] = useState(false);
  const [isScreensModalOpen, setIsScreensModalOpen] = useState(false);
  
  // Navigation / View State
  const [activeView, setActiveView] = useState<'store' | 'admin'>('store');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: initialProducts[0],
      quantityKg: 1,
      customerNote: 'لطفاً شیرینی تر کم‌شیرین باشد.',
      itemTotalPrice: 380000,
    }
  ]);

  // Chat Messages State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'baker',
      text: 'سلام و درود! مریم سعادتی هستم از کارگاه شیرین‌بانو. برای سفارش شیرینی‌های تازه و انتخاب طعم دلخواه‌تون در خدمتم.',
      timestamp: '۱۰:۱۵',
      read: true,
    },
    {
      id: 'm2',
      sender: 'customer',
      text: 'سلام، وقت بخیر. آیا برای شیرینی تر نان‌خامه‌ای از خامه حیوانی تازه استفاده می‌کنید؟',
      timestamp: '۱۰:۱۸',
      read: true,
    },
    {
      id: 'm3',
      sender: 'baker',
      text: 'بله کاملاً! تمامی خامه‌ها به صورت روزانه از دامداری تهیه شده و بدون روغن پالم یا اسانس صنعتی با وانیل طبیعی فرم داده میشن.',
      timestamp: '۱۰:۲۰',
      read: true,
    }
  ]);

  // SMS Notifications Toast State
  const [smsNotifications, setSmsNotifications] = useState<SmsNotification[]>([]);

  // Modals & Panels
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [pendingDeliveryDetails, setPendingDeliveryDetails] = useState<DeliveryDetails | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [selectedTrackingOrderId, setSelectedTrackingOrderId] = useState<string | undefined>(undefined);
  const [isProposalOpen, setIsProposalOpen] = useState(false);

  // Filter Categories list
  const categories = [
    { id: 'all', label: 'همه شیرینی‌ها', count: products.length },
    { id: 'pastry', label: 'شیرینی تر و خامه‌ای', count: products.filter(p => p.category === 'pastry').length },
    { id: 'dry', label: 'شیرینی خشک و لایه‌ای', count: products.filter(p => p.category === 'dry').length },
    { id: 'cake', label: 'کیک و چیزکیک', count: products.filter(p => p.category === 'cake').length },
    { id: 'traditional', label: 'شیرینی سنتی و اصیل', count: products.filter(p => p.category === 'traditional').length },
    { id: 'dessert', label: 'دسر و تارت‌های مدرن', count: products.filter(p => p.category === 'dessert').length },
  ];

  const filteredProducts = products.filter((p) => {
    const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchSearch = 
      p.title.includes(searchQuery) || 
      p.description.includes(searchQuery) ||
      p.ingredients.some(ing => ing.includes(searchQuery));
    return matchCategory && matchSearch;
  });

  // Cart operations
  const handleAddToCart = (product: Product, quantityKg: number, customerNote?: string) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex((item) => item.product.id === product.id);
      if (existingIdx > -1) {
        const updated = [...prev];
        const newQty = +(updated[existingIdx].quantityKg + quantityKg).toFixed(1);
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantityKg: newQty,
          customerNote: customerNote || updated[existingIdx].customerNote,
          itemTotalPrice: Math.round(product.pricePerKg * newQty),
        };
        return updated;
      }
      return [
        ...prev,
        {
          product,
          quantityKg,
          customerNote,
          itemTotalPrice: Math.round(product.pricePerKg * quantityKg),
        }
      ];
    });
  };

  const handleUpdateCartQuantity = (productId: string, newQty: number) => {
    setCart((prev) => 
      prev.map((item) => {
        if (item.product.id === productId) {
          return {
            ...item,
            quantityKg: newQty,
            itemTotalPrice: Math.round(item.product.pricePerKg * newQty),
          };
        }
        return item;
      })
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Checkout flow: Cart -> Delivery Schedule -> Payment Modal
  const handleProceedToDelivery = () => {
    setIsCartOpen(false);
    setIsDeliveryModalOpen(true);
  };

  const handleConfirmSchedule = (details: DeliveryDetails) => {
    setPendingDeliveryDetails(details);
    setIsDeliveryModalOpen(false);
    setIsPaymentModalOpen(true);
  };

  // Payment completed -> create order & send DUAL SMS (Customer + Baker)
  const handlePaymentSuccess = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setIsPaymentModalOpen(false);
    setCart([]); // Clear cart

    // Generate dual SMS notifications
    const nowTime = new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
    const itemsSummary = newOrder.items.map(i => `${toPersianDigits(i.quantityKg)} کیلو ${i.product.title}`).join(' و ');

    const buyerSms: SmsNotification = {
      id: `sms-b-${Date.now()}`,
      to: 'خریدار گرامی',
      phoneNumber: newOrder.delivery.phone,
      timestamp: nowTime,
      type: 'payment_success',
      message: `${newOrder.delivery.recipientName} عزیز، پرداخت سفارش #${newOrder.orderNumber} به مبلغ ${formatPrice(newOrder.totalAmount)} تایید شد. شیرینی شما در نوبت پخت قرار گرفت و در تاریخ ${newOrder.delivery.deliveryDate} تحویل خواهد شد. کد رهگیری: ${newOrder.trackingCode} - شیرینی خانگی یاس`,
    };

    const sellerSms: SmsNotification = {
      id: `sms-s-${Date.now()}`,
      to: 'فروشنده (مدیریت شیرینی یاس)',
      phoneNumber: bakerProfile.phone,
      timestamp: nowTime,
      type: 'order_placed',
      message: `سفارش جدید دریافتی! سفارش #${newOrder.orderNumber} به ارزش ${formatPrice(newOrder.totalAmount)} پرداخت و به حساب شما واریز شد. اقلام: ${itemsSummary}. زمان تحویل: ${newOrder.delivery.deliveryDate} (${newOrder.delivery.deliveryTimeSlot}). تحویل‌گیرنده: ${newOrder.delivery.recipientName}.`,
    };

    setSmsNotifications([buyerSms, sellerSms]);

    // Open tracking modal so user sees their live baking status
    setSelectedTrackingOrderId(newOrder.id);
    setIsOrderTrackingOpen(true);
  };

  // Chat message sending & automatic baker response
  const handleSendMessage = (text: string) => {
    const timeNow = new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'customer',
      text,
      timestamp: timeNow,
      read: true,
    };
    setMessages((prev) => [...prev, newMsg]);

    // Simulated warm baker reply after 1.4s
    setTimeout(() => {
      let replyText = 'سلام، پیام شما رو دریافت کردم! بله کاملاً با کمال میل این مورد رو مد نظر قرار می‌دیم تا سفارش با بهترین کیفیت به دستتون برسه.';
      if (text.includes('کره') || text.includes('مواد')) {
        replyText = 'سلام عزیزم، بله تمام شیرینی‌های ما با کره حیوانی طبیعی و روغن کرمانشاهی خالص پخته میشن و از روغن‌های هیدروژنه و صنعتی استفاده نمیشه.';
      } else if (text.includes('چند کیلو') || text.includes('نفر')) {
        replyText = 'برای مهمانی‌ها معمولاً برای هر نفر بین ۸۰ تا ۱۰۰ گرم شیرینی تر در نظر گرفته میشه. یعنی برای ۲۰ نفر حدود ۲ کیلوگرم کاملاً مناسب و کافیه.';
      } else if (text.includes('نوشته') || text.includes('تبریک') || text.includes('کیک')) {
        replyText = 'بله حتماً! موقع ثبت سفارش در کادر یادداشت متن دلخواهتون رو بنویسید، روی پلاک شکلاتی دست‌نویس با خط زیبا قرار می‌دیم.';
      }

      const bakerMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'baker',
        text: replyText,
        timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
        read: true,
      };
      setMessages((prev) => [...prev, bakerMsg]);
    }, 1400);
  };

  // Baker directly replies from admin panel
  const handleBakerReply = (text: string) => {
    const timeNow = new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
    const bakerMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'baker',
      text,
      timestamp: timeNow,
      read: true,
    };
    setMessages((prev) => [...prev, bakerMsg]);
  };

  // Baker product operations
  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleToggleProductAvailability = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, isAvailable: !p.isAvailable } : p))
    );
  };

  const handleUpdateOrderStatus = (
    orderId: string, 
    newStatus: Order['status'], 
    newStatusLabel: string
  ) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus, statusLabel: newStatusLabel } : o))
    );

    // Send status update SMS simulation
    const updatedOrder = orders.find(o => o.id === orderId);
    if (updatedOrder) {
      const nowTime = new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
      const statusSms: SmsNotification = {
        id: `sms-st-${Date.now()}`,
        to: 'خریدار گرامی',
        phoneNumber: updatedOrder.delivery.phone,
        timestamp: nowTime,
        type: 'status_update',
        message: `سفارش #${updatedOrder.orderNumber}: ${newStatusLabel}. پیگیری بیشتر در سامانه شیرین‌بانو.`,
      };
      setSmsNotifications([statusSms]);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-800 flex flex-col font-['Vazirmatn',sans-serif]">
      {/* Dual SMS Toast Banner */}
      <SmsNotificationToast
        notifications={smsNotifications}
        onClose={() => setSmsNotifications([])}
      />

      {/* Main Navbar */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        cartCount={cart.reduce((sum, it) => sum + 1, 0)}
        unreadMessagesCount={messages.filter(m => m.sender === 'baker' && !m.read).length}
        customLogoUrl={customLogoUrl}
        onUploadLogoClick={() => setIsLogoModalOpen(true)}
        openCart={() => setIsCartOpen(true)}
        openChat={() => setIsChatOpen(true)}
        openOrdersList={() => setIsOrderTrackingOpen(true)}
        openProposal={() => setIsProposalOpen(true)}
        openHostingGuide={() => setIsHostingGuideOpen(true)}
        openScreensModal={() => setIsScreensModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-20 sm:pb-12">
        {activeView === 'admin' ? (
          /* BAKER ADMIN PANEL VIEW */
          <BakerAdminPanel
            products={products}
            orders={orders}
            messages={messages}
            bakerProfile={bakerProfile}
            onAddProduct={handleAddProduct}
            onToggleProductAvailability={handleToggleProductAvailability}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onBakerReplyChat={handleBakerReply}
          />
        ) : (
          /* CUSTOMER STOREFRONT VIEW */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
            {/* Hero Storefront Banner */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white p-6 sm:p-10 shadow-lg border border-amber-900/40">
              <div className="relative z-10 max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>پخت تازه به سفارش شما | مواد درجه یک محلی</span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-black leading-tight text-amber-50">
                  شیرینی خانگی واقعی، با عطر کره طبیعی و پسته تازه
                </h1>

                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                  {bakerProfile.bio}
                </p>

                {/* Trust Badges */}
                <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
                  <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>زمان‌بندی دقیق پخت و تحویل</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                    <Truck className="w-4 h-4 text-emerald-400" />
                    <span>پیک مخصوص با محفظه خنک</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                    <MessageCircle className="w-4 h-4 text-sky-400" />
                    <span>مشاوره و چت مستقیم با قناد</span>
                  </div>
                </div>
              </div>

              {/* Decorative Subtle Bakery Elements */}
              <div className="absolute left-6 bottom-4 opacity-15 hidden md:block pointer-events-none">
                <Cake className="w-64 h-64 text-amber-300" />
              </div>
            </div>

            {/* Quick Process Steps (مثل ورود به یک قنادی دلنشین) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-3xl border border-stone-200/90 shadow-2xs">
              <div className="flex items-center gap-3 p-2">
                <div className="w-9 h-9 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-bold text-xs">
                  ۱
                </div>
                <div>
                  <div className="font-bold text-xs text-stone-900">مشاهده آلبوم و قیمت</div>
                  <div className="text-[10px] text-stone-500">عکس باکیفیت و نرخ هر کیلو</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2">
                <div className="w-9 h-9 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-bold text-xs">
                  ۲
                </div>
                <div>
                  <div className="font-bold text-xs text-stone-900">انتخاب مقدار و سلیقه</div>
                  <div className="text-[10px] text-stone-500">وزن دلخواه و یادداشت تزئین</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2">
                <div className="w-9 h-9 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-bold text-xs">
                  ۳
                </div>
                <div>
                  <div className="font-bold text-xs text-stone-900">زمان‌بندی تحویل</div>
                  <div className="text-[10px] text-stone-500">انتخاب روز و ساعت مدنظر</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2">
                <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 font-bold text-xs">
                  ۴
                </div>
                <div>
                  <div className="font-bold text-xs text-stone-900">پرداخت و پیامک آنی</div>
                  <div className="text-[10px] text-stone-500">پیامک همزمان خریدار و قناد</div>
                </div>
              </div>
            </div>

            {/* Search & Category Filter Section */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="جستجوی نام شیرینی، کیک، مواد اولیه (پسته، زعفران...)..."
                    className="w-full text-xs sm:text-sm pl-4 pr-10 py-3 rounded-2xl border border-stone-200 bg-white shadow-2xs focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  />
                  <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                </div>

                {/* Item Counter */}
                <div className="text-xs text-stone-500 font-medium">
                  نمایش {toPersianDigits(filteredProducts.length)} نوع شیرینی و کیک تازه
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      selectedCategory === cat.id
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200/90'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      selectedCategory === cat.id ? 'bg-amber-700 text-white' : 'bg-stone-100 text-stone-500'
                    }`}>
                      {toPersianDigits(cat.count)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-3">
                <Cake className="w-12 h-12 text-stone-300 mx-auto" />
                <h3 className="font-bold text-stone-800 text-sm">شیرینی با این مشخصات یافت نشد!</h3>
                <p className="text-xs text-stone-500">
                  می‌توانید کلمه دیگری را جستجو کنید یا همه دسته‌بندی‌ها را انتخاب نمایید.
                </p>
                <button
                  onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                  className="px-4 py-2 bg-amber-600 text-white rounded-xl text-xs font-bold"
                >
                  نمایش همه محصولات
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onOpenDetails={(p) => setSelectedProductForModal(p)}
                    onQuickAdd={handleAddToCart}
                  />
                ))}
              </div>
            )}

            {/* Baker Intro Card with Direct Chat Prompt */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <img
                  src={bakerProfile.avatar}
                  alt={bakerProfile.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-300 shadow-sm"
                />
                <div>
                  <h3 className="font-black text-stone-900 text-base">
                    سوالی درباره طعم، وزن یا مراسم خاصی دارید؟
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 max-w-lg leading-relaxed">
                    مستقیماً با من در چت متنی صحبت کنید. برای انواع کیک‌های سفارشی، جشن عقد، تولد و پذیرایی شرکتی مشاوره دریافت کنید.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  onClick={() => setIsChatOpen(true)}
                  className="flex-1 md:flex-initial px-5 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>گفتگوی متنی با مریم سعادتی</span>
                </button>
                <a
                  href={`tel:${bakerProfile.phone}`}
                  className="p-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-2xl transition-colors"
                  title="تماس تلفنی"
                >
                  <PhoneCall className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Bottom Navigation Bar for Mobile */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-stone-200 py-2 px-4 z-30 sm:hidden flex items-center justify-around text-xs shadow-lg">
        <button
          onClick={() => setActiveView('store')}
          className={`flex flex-col items-center gap-1 ${
            activeView === 'store' ? 'text-amber-700 font-bold' : 'text-stone-500'
          }`}
        >
          <Store className="w-5 h-5" />
          <span className="text-[10px]">ویترین</span>
        </button>

        <button
          onClick={() => setIsChatOpen(true)}
          className="flex flex-col items-center gap-1 text-stone-500 hover:text-amber-700 relative"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-[10px]">گفتگو</span>
        </button>

        <button
          onClick={() => setIsOrderTrackingOpen(true)}
          className="flex flex-col items-center gap-1 text-stone-500 hover:text-amber-700"
        >
          <Clock className="w-5 h-5" />
          <span className="text-[10px]">پیگیری پخت</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-1 text-stone-500 hover:text-amber-700 relative"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-amber-600 text-white w-4 h-4 rounded-full text-[10px] font-black flex items-center justify-center">
                {toPersianDigits(cart.length)}
              </span>
            )}
          </div>
          <span className="text-[10px]">سبد خرید</span>
        </button>
      </div>

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToDelivery={handleProceedToDelivery}
      />

      <DeliverySchedulingModal
        isOpen={isDeliveryModalOpen}
        onClose={() => setIsDeliveryModalOpen(false)}
        items={cart}
        onConfirmSchedule={handleConfirmSchedule}
      />

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        items={cart}
        delivery={pendingDeliveryDetails}
        onPaymentSuccess={handlePaymentSuccess}
      />

      <DirectChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        bakerProfile={bakerProfile}
        messages={messages}
        onSendMessage={handleSendMessage}
      />

      <OrderTrackingModal
        isOpen={isOrderTrackingOpen}
        orders={orders}
        selectedOrderId={selectedTrackingOrderId}
        onClose={() => setIsOrderTrackingOpen(false)}
        onSelectOrder={(id) => setSelectedTrackingOrderId(id)}
      />

      <BusinessProposalModal
        isOpen={isProposalOpen}
        onClose={() => setIsProposalOpen(false)}
      />

      <HostingDeploymentGuideModal
        isOpen={isHostingGuideOpen}
        onClose={() => setIsHostingGuideOpen(false)}
      />

      <LogoUploadModal
        isOpen={isLogoModalOpen}
        onClose={() => setIsLogoModalOpen(false)}
        currentLogoUrl={customLogoUrl}
        onSaveLogo={(url) => setCustomLogoUrl(url)}
      />

      <ScreenshotsShowcaseModal
        isOpen={isScreensModalOpen}
        onClose={() => setIsScreensModalOpen(false)}
      />
    </div>
  );
}
