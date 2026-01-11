import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes with clsx
 * Follows the Modern Roman design system conventions
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
