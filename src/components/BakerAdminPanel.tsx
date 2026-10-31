import React, { useState } from 'react';
import { 
  Plus, 
  ShoppingBag, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  DollarSign, 
  Layers, 
  ChefHat, 
  Flame, 
  PackageCheck, 
  Truck, 
  Sparkles,
  ToggleLeft,
  ToggleRight,
  MessageCircle,
  Eye,
  Camera,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { Product, Order, ChatMessage, BakerProfile } from '../types/confectionery';
import { formatPrice, toPersianDigits } from '../utils/formatters';

interface BakerAdminPanelProps {
  products: Product[];
  orders: Order[];
  messages: ChatMessage[];
  bakerProfile: BakerProfile;
  onAddProduct: (newProduct: Product) => void;
  onToggleProductAvailability: (productId: string) => void;
  onUpdateOrderStatus: (orderId: string, newStatus: Order['status'], newStatusLabel: string) => void;
  onBakerReplyChat: (text: string) => void;
}

export const BakerAdminPanel: React.FC<BakerAdminPanelProps> = ({
  products,
  orders,
  messages,
  bakerProfile,
  onAddProduct,
  onToggleProductAvailability,
  onUpdateOrderStatus,
  onBakerReplyChat,
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'chat'>('orders');
  const [isAcceptingOrders, setIsAcceptingOrders] = useState(true);

  // New product form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<Product['category']>('pastry');
  const [newPrice, setNewPrice] = useState('350000');
  const [newPrepHours, setNewPrepHours] = useState('24');
  const [newDesc, setNewDesc] = useState('');
  const [newIngredients, setNewIngredients] = useState('کره حیوانی، آرد گندم تازه، هل سبز، خامه قنادی');
  const [newPhotoUrl, setNewPhotoUrl] = useState(
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80'
  );
  const [shelfLife, setShelfLife] = useState('3');
  const [chatReplyText, setChatReplyText] = useState('');

  // Sample photo presets for quick adding
  const photoPresets = [
    { label: 'شیرینی تر و رولت', url: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=900&q=80' },
    { label: 'کیک و چیزکیک', url: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=80' },
    { label: 'شیرینی دانمارکی و کره‌ای', url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80' },
    { label: 'باقلوا و سنتی', url: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=900&q=80' },
    { label: 'تارت میوه و دسر', url: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=900&q=80' },
  ];

  // Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const pendingOrdersCount = orders.filter((o) => o.status !== 'delivered').length;

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const categoryMap: Record<Product['category'], string> = {
      pastry: 'شیرینی تر و خامه‌ای',
      dry: 'شیرینی خشک و لایه‌ای',
      cake: 'کیک و چیزکیک',
      traditional: 'شیرینی سنتی و اصیل',
      dessert: 'دسر و تارت‌های مدرن',
    };

    const product: Product = {
      id: `prod-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      categoryLabel: categoryMap[newCategory],
      pricePerKg: parseInt(newPrice, 10) || 300000,
      unit: 'کیلوگرم',
      minOrder: 1,
      step: 0.5,
      prepTimeHours: parseInt(newPrepHours, 10) || 24,
      prepTimeLabel: `حداقل ${toPersianDigits(newPrepHours)} ساعت قبل از تحویل`,
      description: newDesc.trim() || 'تهیه شده با مرغوب‌ترین مواد اولیه خانگی و تازه.',
      ingredients: newIngredients.split('،').map((s) => s.trim()).filter(Boolean),
      photos: [newPhotoUrl],
      isAvailable: true,
      shelfLifeDays: parseInt(shelfLife, 10) || 3,
    };

    onAddProduct(product);
    setShowAddForm(false);
    setNewTitle('');
    setNewDesc('');
  };

  const handleSendBakerReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatReplyText.trim()) return;
    onBakerReplyChat(chatReplyText.trim());
    setChatReplyText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Banner & Bakery Capacity Toggle */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-amber-950 text-white rounded-3xl p-5 sm:p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <img
            src={bakerProfile.avatar}
            alt={bakerProfile.name}
            className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-400 shadow-sm"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black">{bakerProfile.brandName}</h2>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full font-bold">
                پنل مدیریت کارگاه خانگی
              </span>
            </div>
            <p className="text-xs text-stone-300 mt-1">
              مدیریت: {bakerProfile.name} | وضعیت سلامت بهداشتی: تایید شده ✓
            </p>
          </div>
        </div>

        {/* Capacity / Store Status toggle */}
        <div className="flex items-center gap-3 bg-stone-800/80 p-2.5 rounded-2xl border border-stone-700">
          <div className="text-right">
            <div className="text-xs font-bold text-stone-200">ظرفیت پذیرش سفارش آنلاین:</div>
            <div className="text-[11px] text-amber-300">
              {isAcceptingOrders ? 'پذیرش فعال (فر آماده پخت است)' : 'تکمیل ظرفیت امروز (فقط پیش‌سفارش)'}
            </div>
          </div>
          <button
            onClick={() => setIsAcceptingOrders(!isAcceptingOrders)}
            className="text-amber-400 hover:text-amber-300 transition-colors"
          >
            {isAcceptingOrders ? (
              <ToggleRight className="w-8 h-8 text-emerald-400" />
            ) : (
              <ToggleLeft className="w-8 h-8 text-stone-500" />
            )}
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span>درآمد کل سفارش‌ها:</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-lg font-black text-stone-900">{formatPrice(totalRevenue)}</div>
          <div className="text-[10px] text-emerald-600 mt-1">تسویه‌شده از طریق درگاه شتاب</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span>سفارش‌های در حال انجام:</span>
            <Flame className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-lg font-black text-amber-900">{toPersianDigits(pendingOrdersCount)} سفارش</div>
          <div className="text-[10px] text-stone-500 mt-1">نیاز به پخت و تحویل در تاریخ تعیین‌شده</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span>تنوع شیرینی‌های ویترین:</span>
            <Layers className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-lg font-black text-stone-900">{toPersianDigits(products.length)} محصول</div>
          <div className="text-[10px] text-stone-500 mt-1">با گالری عکس و زمان‌بندی پخت</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
            <span>گفتگوی متنی با خریداران:</span>
            <MessageCircle className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-lg font-black text-stone-900">{toPersianDigits(messages.length)} پیام</div>
          <div className="text-[10px] text-blue-600 mt-1">مشاوره طعم، تزیین و هماهنگی</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'orders'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>مدیریت و پیگیری سفارش‌ها ({toPersianDigits(orders.length)})</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'products'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
          }`}
        >
          <ChefHat className="w-4 h-4" />
          <span>محصولات ویترین و افزودن جدید ({toPersianDigits(products.length)})</span>
        </button>

        <button
          onClick={() => setActiveTab('chat')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'chat'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
          }`}
        >
          <MessageCircle className="w-4 h-4" />
          <span>پاسخ به سوالات خریداران</span>
        </button>
      </div>

      {/* TAB 1: ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-stone-900">سفارش‌های دریافتی کارگاه</h3>
            <span className="text-xs text-stone-500">
              با تغییر وضعیت هر سفارش، پیامک خودکار برای خریدار شبیه‌سازی می‌شود.
            </span>
          </div>

          <div className="space-y-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs flex flex-col md:flex-row justify-between gap-4"
              >
                {/* Order Details */}
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-sm text-stone-900">
                      سفارش #{order.orderNumber}
                    </span>
                    <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                      پرداخت شده ✓
                    </span>
                    <span className="text-xs text-stone-400">کد رهگیری: {order.trackingCode}</span>
                  </div>

                  {/* Items summary */}
                  <div className="text-xs text-stone-700 space-y-1 mt-2">
                    {order.items.map((it, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                        <span className="font-semibold">{it.product.title}</span>
                        <span className="text-stone-500">
                          ({toPersianDigits(it.quantityKg)} کیلو - {formatPrice(it.itemTotalPrice)})
                        </span>
                        {it.customerNote && (
                          <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md text-[10px]">
                            سلیقه: {it.customerNote}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Delivery & Customer Info */}
                  <div className="pt-2 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
                    <div>
                      <span className="font-bold text-stone-900">خریدار: </span>
                      <span>{order.delivery.recipientName} ({order.delivery.phone})</span>
                    </div>
                    <div>
                      <span className="font-bold text-amber-900">موعد تحویل: </span>
                      <span>{order.delivery.deliveryDate} ({order.delivery.deliveryTimeSlot})</span>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="font-bold text-stone-900">نشانی تحویل: </span>
                      <span>{order.delivery.address}</span>
                    </div>
                  </div>
                </div>

                {/* Status Changer Actions */}
                <div className="md:w-64 shrink-0 bg-stone-50 p-4 rounded-2xl border border-stone-200 flex flex-col justify-between gap-3">
                  <div>
                    <div className="text-xs text-stone-500 mb-1">وضعیت فر و پخت:</div>
                    <div className="text-xs font-bold text-amber-900 bg-amber-100/70 p-2 rounded-xl mb-3">
                      {order.statusLabel}
                    </div>

                    <div className="text-[11px] font-bold text-stone-700 mb-2">
                      تغییر گام به مرحله بعد:
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                      <button
                        onClick={() =>
                          onUpdateOrderStatus(
                            order.id,
                            'in_prep',
                            'ترکیب مواد اولیه و استراحت خمیر در دمای کارگاه'
                          )
                        }
                        className="p-1.5 bg-white hover:bg-stone-100 border border-stone-200 rounded-lg text-stone-800 font-medium"
                      >
                        ۱. استراحت خمیر
                      </button>
                      <button
                        onClick={() =>
                          onUpdateOrderStatus(
                            order.id,
                            'baking',
                            'قرار گرفتن درون فر با دمای ۱۸۰ درجه'
                          )
                        }
                        className="p-1.5 bg-white hover:bg-stone-100 border border-stone-200 rounded-lg text-stone-800 font-medium"
                      >
                        ۲. در حال پخت
                      </button>
                      <button
                        onClick={() =>
                          onUpdateOrderStatus(
                            order.id,
                            'decorating',
                            'تزیین با گاناش، خامه و خلال پسته'
                          )
                        }
                        className="p-1.5 bg-white hover:bg-stone-100 border border-stone-200 rounded-lg text-stone-800 font-medium"
                      >
                        ۳. تزیین نهایی
                      </button>
                      <button
                        onClick={() =>
                          onUpdateOrderStatus(
                            order.id,
                            'delivered',
                            'بسته‌بندی شد و به پیک خنک‌کننده تحویل داده شد'
                          )
                        }
                        className="p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold"
                      >
                        ۴. ارسال با پیک ✓
                      </button>
                    </div>
                  </div>

                  <div className="text-left font-black text-sm text-stone-900 border-t border-stone-200 pt-2">
                    مبلغ: {formatPrice(order.totalAmount)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCTS & ADD NEW */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-stone-900">لیست و معرفی شیرینی‌های قنادی</h3>
              <p className="text-xs text-stone-500">
                می‌توانید محصول جدید معرفی کنید، قیمت هر کیلو را ویرایش و موجودی را فعال یا غیرفعال کنید.
              </p>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>{showAddForm ? 'انصراف' : 'معرفی شیرینی جدید'}</span>
            </button>
          </div>

          {/* Add Product Form Modal / Section */}
          {showAddForm && (
            <form
              onSubmit={handleCreateProduct}
              className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-amber-500/30 shadow-md space-y-4 animate-in fade-in duration-200"
            >
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h4 className="font-black text-sm text-stone-900 flex items-center gap-2">
                  <ChefHat className="w-4 h-4 text-amber-600" />
                  معرفی محصول جدید برای ویترین قنادی
                </h4>
                <span className="text-xs text-stone-400">نمایش فوری در ویترین مشتریان</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">نام شیرینی یا کیک:</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="مثلاً: شیرینی لطیفه با خامه زعفرانی و پسته"
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:outline-hidden focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">دسته‌بندی:</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as Product['category'])}
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:outline-hidden focus:ring-2 focus:ring-amber-500/30"
                  >
                    <option value="pastry">شیرینی تر و خامه‌ای</option>
                    <option value="dry">شیرینی خشک و لایه‌ای</option>
                    <option value="cake">کیک و چیزکیک</option>
                    <option value="traditional">شیرینی سنتی و اصیل</option>
                    <option value="dessert">دسر و تارت‌های مدرن</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">قیمت هر کیلوگرم (تومان):</label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder="مثلاً: 380000"
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:outline-hidden focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    زمان مورد نیاز پخت و آماده‌سازی (ساعت):
                  </label>
                  <input
                    type="number"
                    required
                    value={newPrepHours}
                    onChange={(e) => setNewPrepHours(e.target.value)}
                    placeholder="مثلاً: 24"
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:outline-hidden focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-stone-700 block mb-1">
                    توضیحات معرفی و ویژگی‌های طعم:
                  </label>
                  <textarea
                    rows={2}
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="توضیحاتی درباره بافت، میزان شیرینی، عطر و ادویه‌ها..."
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:outline-hidden focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-stone-700 block mb-1">
                    مواد اولیه و ترکیبات سالم (جدا شده با ویرگول):
                  </label>
                  <input
                    type="text"
                    value={newIngredients}
                    onChange={(e) => setNewIngredients(e.target.value)}
                    placeholder="کره حیوانی، هل، زعفران..."
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                  />
                </div>

                {/* Photo selection presets */}
                <div className="sm:col-span-2">
                  <label className="font-bold text-stone-700 block mb-1.5 flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-amber-600" />
                    انتخاب عکس نمونه از آلبوم کارگاه یا وارد کردن نشانی تصویر:
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {photoPresets.map((preset, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setNewPhotoUrl(preset.url)}
                        className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                          newPhotoUrl === preset.url
                            ? 'bg-amber-600 text-white border-amber-600 font-bold'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                  <input
                    type="url"
                    value={newPhotoUrl}
                    onChange={(e) => setNewPhotoUrl(e.target.value)}
                    className="w-full p-2 rounded-xl border border-stone-200 bg-stone-50 text-[11px] font-mono text-left"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 text-xs font-semibold"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-xs"
                >
                  ثبت و انتشار در ویترین آنلاین
                </button>
              </div>
            </form>
          )}

          {/* Current Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-3xl p-4 border border-stone-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video rounded-2xl overflow-hidden mb-3 bg-stone-100">
                    <img src={p.photos[0]} alt={p.title} className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 bg-black/60 text-amber-300 text-[10px] px-2 py-0.5 rounded-full backdrop-blur-xs font-medium">
                      {p.prepTimeLabel}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-stone-900">{p.title}</span>
                  </div>

                  <p className="text-[11px] text-stone-500 line-clamp-2">{p.description}</p>
                </div>

                <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between">
                  <div className="text-xs font-black text-amber-900">
                    {formatPrice(p.pricePerKg)}
                  </div>

                  <button
                    onClick={() => onToggleProductAvailability(p.id)}
                    className={`text-[11px] px-2.5 py-1 rounded-xl font-bold transition-all ${
                      p.isAvailable
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-stone-100 text-stone-500 border border-stone-200'
                    }`}
                  >
                    {p.isAvailable ? 'موجود در ویترین ✓' : 'اتمام موجودی امروز'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: LIVE CHAT WITH CUSTOMERS */}
      {activeTab === 'chat' && (
        <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <h3 className="font-bold text-sm text-stone-900">صندوق پیام‌ها و گفتگوی متنی با خریداران</h3>
              <p className="text-xs text-stone-500">
                پاسخ شما بلافاصله در صفحه خریدار نمایش داده می‌شود.
              </p>
            </div>
            <span className="text-xs bg-amber-100 text-amber-800 px-2.5 py-1 rounded-xl font-bold">
              {toPersianDigits(messages.length)} پیام در تاریخچه
            </span>
          </div>

          {/* Messages list */}
          <div className="h-72 overflow-y-auto bg-stone-50 rounded-2xl p-4 space-y-2.5 border border-stone-200/80">
            {messages.map((m) => {
              const isBaker = m.sender === 'baker';
              return (
                <div key={m.id} className={`flex flex-col ${isBaker ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                      isBaker
                        ? 'bg-stone-900 text-white rounded-br-xs'
                        : 'bg-white text-stone-900 border border-stone-200 rounded-bl-xs shadow-2xs'
                    }`}
                  >
                    <div className="text-[10px] text-amber-300 font-bold mb-0.5">
                      {isBaker ? 'پاسخ شما (شیرین‌بانو):' : 'پیام خریدار:'}
                    </div>
                    <p>{m.text}</p>
                    <div className="text-[9px] text-stone-400 text-left mt-1 font-mono">
                      {m.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Baker Reply form */}
          <form onSubmit={handleSendBakerReply} className="flex gap-2">
            <input
              type="text"
              value={chatReplyText}
              onChange={(e) => setChatReplyText(e.target.value)}
              placeholder="پاسخ خود را به عنوان شیرینی‌پز بنویسید (مثلاً: سلام، بله امکان‌پذیره با کمال میل...)"
              className="flex-1 p-3 text-xs rounded-2xl border border-stone-200 bg-stone-50 focus:outline-hidden focus:ring-2 focus:ring-amber-500/30"
            />
            <button
              type="submit"
              disabled={!chatReplyText.trim()}
              className="px-5 py-3 bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-white rounded-2xl text-xs font-bold transition-all"
            >
              ارسال پاسخ به خریدار
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
