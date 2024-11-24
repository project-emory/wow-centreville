"use client";

import Image from "next/image";
import About from "@/src/app/about/page";
import { main1, main2 } from "@/public";
import { useTranslation } from "react-i18next";

export default function Home() {
    const { t } = useTranslation("home");
    return (
        <div className="min-h-screen justify-items-center py-[4.75rem]">
            <main className="flex w-full flex-col items-center gap-8 pt-8 sm:items-start">
                <div className="flex flex-col w-full items-center justify-center gap-4 md:flex md:flex-row">
                    <div className="flex flex-col items-center font-bold leading-[6rem] text-wow-red md:block md:leading-[7.5rem]">
                        <div className="text-[6rem] sm:text-[7rem]">WOW</div>
                        <div className="text-[4rem] sm:text-[5rem]">
                            {t("WOW.1")}
                        </div>
                    </div>
                    <div>
                        <Image
                            src={main1}
                            alt="엄마밥상 placeholder image"
                            className="max-w-[25rem] rounded-md object-cover shadow-md max-md:max-h-[25dvh] md:h-[35dvh] md:w-[26rem]"
                        />
                    </div>
                </div>
                <div className="mt-4 flex w-full flex-col items-center justify-center gap-4 md:flex md:flex-row">
                    <div className="order-2 md:order-1">
                        <Image
                            src={main2}
                            alt="엄마밥상 placeholder image"
                            className="max-w-[25rem] rounded-md object-cover shadow-md max-md:max-h-[25dvh] md:h-[35dvh] md:w-[26rem]"
                        />
                    </div>
                    <div className="order-1 flex flex-col items-center text-right text-[5em] font-bold leading-[6rem] text-wow-red md:order-2 md:block md:leading-[7.5rem]">
                        <div className="text-[6rem] sm:text-[7rem]">WOW</div>
                        <div className="text-[4rem] sm:text-[5rem]">
                            {t("WOW.2")}
                        </div>
                    </div>
                </div>
                <div className="-mt-8 flex w-full animate-bounce flex-col items-center text-[3rem] font-bold text-wow-red">
                    <div>&#8964;</div>
                </div>
            </main>
            <About />
        </div>
    );
}
