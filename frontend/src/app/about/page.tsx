"use client";
import Image from "next/image";
import { RedWOWLogo } from "@/public";
import { Button } from "@/src/components";
import { useTranslation } from "react-i18next";

const About = () => {
    const { t, i18n } = useTranslation("about");
    return (
        <div className="mt-[2.5rem] flex min-h-screen w-full justify-center overflow-x-hidden py-[4.75rem]">
            <div className="flex w-[55vw] flex-col items-center justify-center gap-8">
                <Image
                    src={RedWOWLogo}
                    alt="White WOW Logo"
                    className="h-[10rem] w-[10.5rem] object-cover object-left"
                />
                <div
                    className={`${i18n.language === "ko" ? "text-[2rem]" : "text-[2.5rem]"} font-bold text-wow-red md:text-[3rem]`}
                >
                    {t("title")}
                </div>
                <p className="text-center leading-8">
                    {t("description.1")} <br />
                    {t("description.2")}
                    <br />
                    {t("description.3")}
                    <br />
                    {t("description.4")}
                </p>
                <Button className="hover:scale-105" title={t("button")} route="/menu" />
            </div>
        </div>
    );
};

export default About;
