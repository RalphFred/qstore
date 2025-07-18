import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a number as currency with proper commas and currency symbol
 * @param amount - The amount to format (in full currency units, not cents)
 * @param currency - Currency code (default: 'USD')
 * @param locale - Locale for formatting (default: 'en-US')
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format a number with commas (no currency symbol)
 * @param amount - The amount to format
 * @param locale - Locale for formatting (default: 'en-US')
 * @returns Formatted number string with commas
 */
export function formatNumber(
  amount: number,
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale).format(amount);
}

/**
 * Calculate and format discounted price
 * @param originalPrice - Original price (in full currency units, not cents)
 * @param discountAmount - Discount amount (in full currency units, not cents)
 * @param currency - Currency code (default: 'USD')
 * @param locale - Locale for formatting (default: 'en-US')
 * @returns Object with formatted original price, discount amount, and final price
 */
export function formatDiscountedPrice(
  originalPrice: number,
  discountAmount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
) {
  const finalPrice = originalPrice - discountAmount;
  
  return {
    originalPrice: formatCurrency(originalPrice, currency, locale),
    discountAmount: formatCurrency(discountAmount, currency, locale),
    finalPrice: formatCurrency(finalPrice, currency, locale),
    savings: formatCurrency(discountAmount, currency, locale),
    discountPercentage: Math.round((discountAmount / originalPrice) * 100)
  };
}
