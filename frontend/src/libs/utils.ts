import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// merge multiple classnames conditionally
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
