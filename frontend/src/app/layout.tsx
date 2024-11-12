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
