// import dependencies
import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS classes without conflicts.
 * @param inputs - Class names or conditional class objects.
 * @returns A merged class string.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(...inputs));
}

/**
 * Debounce function: Delays execution of a function to optimize performance.
 * @param callback - The function to be executed.
 * @param delay - Delay in milliseconds.
 * @returns A debounced function.
 */
export function debounce<T extends (...args: any[]) => void>(callback: T, delay: number): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  };
}

/**
 * Throttle function: Limits function execution to once per time interval.
 * @param callback - The function to be executed.
 * @param delay - Interval in milliseconds.
 * @returns A throttled function.
 */
export function throttle<T extends (...args: any[]) => void>(callback: T, delay: number): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      callback(...args);
    }
  };
}

/**
 * Copies text to clipboard.
 * @param text - The text to copy.
 */
export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error("Failed to copy text: ", error);
  }
}

/**
 * Formats a date into "YYYY-MM-DD" format.
 * @param date - Date object or string.
 * @returns Formatted date string.
 */
export function formatDate(date: Date | string): string {
  return new Date(date).toISOString().split("T")[0];
}
