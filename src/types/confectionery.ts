export interface Product {
  id: string;
  title: string;
  category: 'pastry' | 'dry' | 'cake' | 'traditional' | 'dessert';
  categoryLabel: string;
  pricePerKg: number; // in Tomans
  unit: string; // e.g. "کیلوگرم" or "جعبه ۱۲ تایی"
  minOrder: number; // e.g. 0.5 or 1
  step: number; // 0.5 or 1
  prepTimeHours: number; // e.g. 24 or 48 hours lead time
  prepTimeLabel: string;
  description: string;
  ingredients: string[];
  photos: string[];
  isAvailable: boolean;
  isBestseller?: boolean;
  caloriesApprox?: string;
  shelfLifeDays: number;
}

export interface CartItem {
  product: Product;
  quantityKg: number;
  customerNote?: string;
  itemTotalPrice: number;
}

export interface DeliveryDetails {
  recipientName: string;
  phone: string;
  address: string;
  deliveryDate: string; // YYYY-MM-DD or formatted Persian date
  deliveryTimeSlot: string; // e.g. "۱۰:۰۰ الی ۱۳:۰۰"
  deliveryMethod: 'courier' | 'pickup';
  specialInstructions?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  delivery: DeliveryDetails;
  totalItemsPrice: number;
  deliveryFee: number;
  packagingFee: number;
  totalAmount: number;
  paymentMethod: 'online' | 'card_to_card';
  paymentStatus: 'paid' | 'pending' | 'failed';
  trackingCode: string;
  status: 'received' | 'in_prep' | 'baking' | 'decorating' | 'ready' | 'delivered';
  statusLabel: string;
}

export interface ChatMessage {
  id: string;
  sender: 'customer' | 'baker';
  text: string;
  timestamp: string;
  read: boolean;
}

export interface SmsNotification {
  id: string;
  to: string; // "مشتری" or "فروشنده (شیرین‌بانو)"
  phoneNumber: string;
  message: string;
  timestamp: string;
  type: 'order_placed' | 'payment_success' | 'status_update';
}

export interface BakerProfile {
  name: string;
  brandName: string;
  bio: string;
  avatar: string;
  phone: string;
  address: string;
  workingHours: string;
  rating: number;
  totalOrdersCompleted: number;
  healthCertApproved: boolean;
}
