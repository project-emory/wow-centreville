"use client";

import Image from "next/image";
import About from "@/src/app/about/page";
import { main1, main2 } from "@/public";
import { useTranslation } from "react-i18next";

export default function Home() {
    const { t } = useTranslation("home");
    return (
        <div className="min-h-screen justify-items-center py-[4.75rem]">
            <main className="flex w-[60vw] flex-col items-center gap-8 pt-8 sm:items-start">
                <div className="md:flex w-full items-center justify-between">
                    <div className="md:block flex flex-col items-center font-bold md:leading-[7.5rem] leading-[15vw] text-wow-red">
                        <div className="md:text-[7rem] sm:text-[15vw] text-[14vw]">WOW</div>
                        <div className="md:text-[5rem] sm:text-[12vw] text-[10vw]">{t("WOW.1")}</div>
                    </div>
                    <div>
                        <Image
                            src={main1}
                            alt="엄마밥상 placeholder image"
                            className="md:h-[35vh] md:w-[32vw] w-full max-md:max-h-[25vh] rounded-md object-cover shadow-md"
                        />
                    </div>
                </div>
                <div className="md:flex md:flex-row flex flex-col mt-4 w-full items-center justify-between">
                    <div className="md:order-1 order-2">
                        <Image
                            src={main2}
                            alt="엄마밥상 placeholder image"
                            className="md:h-[35vh] md:w-[32vw] w-full max-md:max-h-[25vh] rounded-md object-cover shadow-md"
                        />
                    </div>
                    <div className="md:order-2 order-1 md:block flex flex-col items-center text-right text-[5em] font-bold md:leading-[7.5rem] leading-[15vw] text-wow-red">
                        <div className="md:text-[7rem] sm:text-[15vw] text-[14vw]">WOW</div>
                        <div className="md:text-[5rem] sm:text-[12vw] text-[10vw]">{t("WOW.2")}</div>
                    </div>
                </div>
                <div className="flex w-full -mt-8 animate-bounce flex-col items-center text-[3rem] font-bold text-wow-red">
                    <div>&#8964;</div>
                </div>
            </main>
            <About />
        </div>
    );
}
