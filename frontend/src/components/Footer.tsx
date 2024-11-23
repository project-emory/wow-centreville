"use client";

import Image from "next/image";
import { WowMommy, insta } from "@/public";
import { useTranslation } from "react-i18next";

const Footer = () => {
    const { t } = useTranslation("footer");

    return (
        <footer className="flex h-[40vh] w-full justify-center bg-wow-black font-bold text-wow-cream">
            <div className="md:flex max-md:pt-16 w-[60vw] items-center justify-between px-[1rem]">
                <div className="flex flex-col md:text-left max-md:items-center text-center gap-[2rem]">
                    <div className="flex flex-1 items-end gap-[1rem]">
                        <div className="text-2xl">{t("contact.1")}</div>
                        <a
                            href="https://www.instagram.com/centreville_wow/?hl=en"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Image
                                src={insta}
                                alt="Instagram Icon"
                                width="28"
                                height="28"
                                className="cursor-pointer transition-transform duration-300 hover:scale-110"
                            />
                        </a>
                    </div>
                    <div className="flex flex-1 flex-col justify-between gap-[1rem] text-sm tracking-wider">
                        <p>{t("contact.2")}: 14215 M Centreville Sq. Centreville VA 20121</p>
                        <p>{t("contact.3")}: 571-243-3639</p>
                        <p>{t("contact.4")}: 와우엄마밥상</p>
                        <p>{t("contact.5")}: 9am-8pm</p>
                    </div>
                </div>
                <div className="flex justify-center gap-[1rem]">
                    <Image
                        src={WowMommy}
                        alt="white wow logo"
                        className="h-[15rem] w-[15rem] object-contain object-left"
                    />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
