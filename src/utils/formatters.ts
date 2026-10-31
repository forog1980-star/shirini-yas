// Format numbers to Persian digits with comma separators
export function toPersianDigits(n: number | string): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(n).replace(/\d/g, (d) => persianDigits[parseInt(d, 10)]);
}

export function formatPrice(tomans: number): string {
  const formatted = new Intl.NumberFormat('en-US').format(tomans);
  return `${toPersianDigits(formatted)} تومان`;
}

export function formatKg(kg: number): string {
  return `${toPersianDigits(kg)} کیلوگرم`;
}
