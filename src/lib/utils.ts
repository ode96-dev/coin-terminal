import { clsx, type ClassValue } from 'clsx';
import { Time } from 'lightweight-charts';
import { twMerge } from 'tailwind-merge';

/**
 * Combine multiple class value inputs into a single className string, resolving overlapping Tailwind utility conflicts.
 *
 * @param inputs - Class values (strings, arrays, objects, etc.) to be combined
 * @returns The final space-separated class string with Tailwind classes deduplicated and conflicts resolved
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a numeric value as a localized currency or plain numeric string.
 *
 * @param digits - Number of fractional digits to display; defaults to 2 when omitted
 * @param currency - Currency code to use when showing a symbol; defaults to `'USD'`
 * @param showSymbol - When `false`, omit the currency symbol and format as a plain number; when `true` or omitted, include the currency symbol
 * @returns A locale-formatted string. If `showSymbol` is `true` or omitted the result includes a currency symbol; if `showSymbol` is `false` the result is numeric-only. For `null`, `undefined`, or `NaN` input returns `'$0.00'` when `showSymbol` is not `false`, otherwise `'0.00'`.
 */
export function formatCurrency(
  value: number | null | undefined,
  digits?: number,
  currency?: string,
  showSymbol?: boolean,
) {
  if (value === null || value === undefined || isNaN(value)) {
    return showSymbol !== false ? '$0.00' : '0.00';
  }

  if (showSymbol === undefined || showSymbol === true) {
    return value.toLocaleString(undefined, {
      style: 'currency',
      currency: currency?.toUpperCase() || 'USD',
      minimumFractionDigits: digits ?? 2,
      maximumFractionDigits: digits ?? 2,
    });
  }
  return value.toLocaleString(undefined, {
    minimumFractionDigits: digits ?? 2,
    maximumFractionDigits: digits ?? 2,
  });
}

/**
 * Formats a numeric percentage value with one decimal place and a trailing percent sign.
 *
 * @param change - Percentage value to format (e.g., 2.5 represents "2.5%"). Null, undefined, or NaN are treated as 0.
 * @returns The percentage formatted with one decimal place and a '%' suffix (for example, "2.5%"); returns "0.0%" for null, undefined, or NaN inputs.
 */
export function formatPercentage(change: number | null | undefined): string {
  if (change === null || change === undefined || isNaN(change)) {
    return '0.0%';
  }
  const formattedChange = change.toFixed(1);
  return `${formattedChange}%`;
}

/**
 * Determine CSS class names for a numeric trend value.
 *
 * @param value - Numeric change or delta used to decide trend direction (positive = up).
 * @returns An object with:
 *   - `textClass`: `'text-green-400'` when `value > 0`, otherwise `'text-red-400'`.
 *   - `bgClass`: `'bg-green-500/10'` when `value > 0`, otherwise `'bg-red-500/10'`.
 *   - `iconClass`: `'icon-up'` when `value > 0`, otherwise `'icon-down'`.
 */
export function trendingClasses(value: number) {
  const isTrendingUp = value > 0;

  return {
    textClass: isTrendingUp ? 'text-green-400' : 'text-red-400',
    bgClass: isTrendingUp ? 'bg-green-500/10' : 'bg-red-500/10',
    iconClass: isTrendingUp ? 'icon-up' : 'icon-down',
  };
}

/**
 * Produces a human-readable relative time string for the given date.
 *
 * @param date - A date, timestamp (milliseconds), or ISO/string parseable by Date representing a past or present time
 * @returns A relative time string:
 * - `'just now'` when less than 60 seconds have elapsed
 * - `'{n} min'` when less than 60 minutes have elapsed
 * - `'{n} hour'` or `'{n} hours'` when less than 24 hours have elapsed
 * - `'{n} day'` or `'{n} days'` when less than 7 days have elapsed
 * - `'{n} week'` or `'{n} weeks'` when less than 4 weeks have elapsed
 * - a date string in the format `YYYY-MM-DD` for older dates
 */
export function timeAgo(date: string | number | Date): string {
  const now = new Date();
  const past = new Date(date);
  const diff = now.getTime() - past.getTime(); // difference in ms

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (seconds < 60) return 'just now';
  if (minutes < 60) return `${minutes} min`;
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''}`;
  if (days < 7) return `${days} day${days > 1 ? 's' : ''}`;
  if (weeks < 4) return `${weeks} week${weeks > 1 ? 's' : ''}`;

  // Format date as YYYY-MM-DD
  return past.toISOString().split('T')[0];
}

/**
 * Converts raw OHLC tuples into structured OHLC objects and removes consecutive entries with the same timestamp.
 *
 * @param data - Array of OHLC tuples in the form `[time, open, high, low, close]`, where `time` is an epoch timestamp in seconds.
 * @returns An array of objects `{ time, open, high, low, close }` with `time` typed as `Time`; consecutive items that share the same `time` are deduplicated (first kept).
 */
export function convertOHLCData(data: OHLCData[]) {
  return data
    .map((d) => ({
      time: d[0] as Time, // ensure seconds, not ms
      open: d[1],
      high: d[2],
      low: d[3],
      close: d[4],
    }))
    .filter((item, index, arr) => index === 0 || item.time !== arr[index - 1].time);
}

export const ELLIPSIS = 'ellipsis' as const;
export const buildPageNumbers = (
  currentPage: number,
  totalPages: number,
): (number | typeof ELLIPSIS)[] => {
  const MAX_VISIBLE_PAGES = 5;

  const pages: (number | typeof ELLIPSIS)[] = [];

  if (totalPages <= MAX_VISIBLE_PAGES) {
    for (let i = 1; i <= totalPages; i += 1) {
      pages.push(i);
    }
    return pages;
  }

  pages.push(1);

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  if (start > 2) {
    pages.push(ELLIPSIS);
  }

  for (let i = start; i <= end; i += 1) {
    pages.push(i);
  }

  if (end < totalPages - 1) {
    pages.push(ELLIPSIS);
  }

  pages.push(totalPages);

  return pages;
};