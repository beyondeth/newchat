// import { type ClassValue, clsx } from "clsx";
// import { formatDate, formatDistanceToNowStrict } from "date-fns";
// import { twMerge } from "tailwind-merge";

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

// export function formatRelativeDate(from: Date) {
//   const currentDate = new Date();
//   if (currentDate.getTime() - from.getTime() < 24 * 60 * 60 * 1000) {
//     return formatDistanceToNowStrict(from, { addSuffix: true });
//   } else {
//     if (currentDate.getFullYear() === from.getFullYear()) {
//       return formatDate(from, "MMM d");
//     } else {
//       return formatDate(from, "MMM d, yyy");
//     }
//   }
// }

// export function formatNumber(n: number): string {
//   return Intl.NumberFormat("en-US", {
//     notation: "compact",
//     maximumFractionDigits: 1,
//   }).format(n);
// }

import { type ClassValue, clsx } from "clsx";
import { formatDate, formatDistanceToNowStrict } from "date-fns";
import { ko } from "date-fns/locale";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRelativeDate(from: Date) {
  const currentDate = new Date();
  if (currentDate.getTime() - from.getTime() < 24 * 60 * 60 * 1000) {
    return formatDistanceToNowStrict(from, {
      addSuffix: true,
      locale: ko,
    });
  } else {
    if (currentDate.getFullYear() === from.getFullYear()) {
      return formatDate(from, "M월 d일", { locale: ko });
    } else {
      return formatDate(from, "yyyy년 M월 d일", { locale: ko });
    }
  }
}

export function formatNumber(n: number): string {
  return Intl.NumberFormat("ko-KR", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^a-z0-9-]/g, "");
}
