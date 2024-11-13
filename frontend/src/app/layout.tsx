import type { Metadata } from "next";
import { Antonio } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/src/components";

const antonio = Antonio({
    subsets: ["latin"],
    weight: ["100", "400", "700"],
    variable: "--font-antonio",
});

export const metadata: Metadata = {
    title: "WOW-Centreville",
    description: "A full-stack ordering platform for WOW Fresh Meat Centreville.",
    icons: {
        icon: "/favicon.ico",
    },
};

const RootLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <html lang="en">
            <head>
            <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
            <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
            <link rel="shortcut icon" href="/favicon/favicon.ico" />
            <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
            <meta name="apple-mobile-web-app-title" content="WOW" />
            <link rel="manifest" href="/favicon/site.webmanifest" />
            </head>
            <body
                className={`${antonio.variable} ' flex min-h-screen flex-col bg-[#F3EDE1] font-antonio text-black antialiased`}
            >
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
            </body>
        </html>
    );
};

export default RootLayout;
