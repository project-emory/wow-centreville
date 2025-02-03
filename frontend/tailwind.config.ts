import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                "wow-red": "#C61C00",
                "wow-cream": "#F3EDE1",
                "wow-black": "#191918",
                "accent-foreground": "#C61C00", 
                "accent-background": "#F3EDE1",
            },
            fontFamily: {
                antonio: ["var(--font-antonio)", "sans-serif"],
            },
        },
    },
    plugins: [],
};
export default config;
