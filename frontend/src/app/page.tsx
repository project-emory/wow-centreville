"use client";

import Image from "next/image";
import About from "@/src/app/about/page";
import { main1, main2 } from "@/public";
import { useTranslation } from "react-i18next";

export default function Home() {
    const { t, i18n } = useTranslation("home");
    return (
        <div className="flex min-h-screen flex-col items-center py-[5.5rem]">
            <main className="flex w-[58rem] flex-col items-center gap-8 pt-8 sm:items-start">
                <div className="flex w-full flex-col items-center justify-between gap-4 self-center md:flex md:flex-row">
                    <div className="flex flex-col items-center font-bold leading-[6rem] text-wow-red md:block md:leading-[7.5rem]">
                        <div className="text-[6rem] sm:text-[7rem]">WOW</div>
                        <div className="text-[4rem] sm:text-[4.5rem]">{t("WOW.1")}</div>
                    </div>
                    <div>
                        <Image
                            src={main1}
                            alt="엄마밥상 placeholder image"
                            className="h-[16rem] w-[20rem] rounded-md object-cover shadow-md sm:w-[30rem] md:w-[30rem]"
                        />
                    </div>
                </div>
                <div className="mt-4 flex w-full flex-col items-center justify-between gap-4 self-center md:flex md:flex-row">
                    <div className="order-2 md:order-1">
                        <Image
                            src={main2}
                            alt="엄마밥상 placeholder image"
                            className="h-[16rem] w-[20rem] rounded-md object-cover shadow-md sm:w-[30rem] md:w-[30rem]"
                        />
                    </div>
                    <div className="order-1 flex flex-col items-center text-right font-bold leading-[6rem] text-wow-red md:order-2 md:block md:leading-[7.5rem]">
                        <div className="text-[6rem] sm:text-[7rem]">WOW</div>
                        <div className={`${i18n.language === 'ko' ? "sm:text-[4rem]" : "sm:text-[5rem]"} text-[4rem] sm:text-[5rem]`}>{t("WOW.2")}</div>
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
