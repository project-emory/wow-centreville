import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// merge multiple classnames conditionally 
// clsx is a utility function that merges multiple classnames into a single string
// twMerge is a utility function that merges multiple tailwind classes into a single string
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
