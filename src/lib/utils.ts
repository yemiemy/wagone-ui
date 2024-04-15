import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function format12HTimestamp(timestamp: string) {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", { timeStyle: "short", hour12: true });
}