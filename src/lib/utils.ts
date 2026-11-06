import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calcAge(year: number, month: number, day: number) {
  const now = new Date();
  let age = now.getFullYear() - year;
  const m = now.getMonth();
  if (m < month || (m === month && now.getDate() < day)) age -= 1;
  return age;
}
