"use client";

import { useState, useEffect } from "react";
import { RedWOWHeaderLogo, globe, cart, user } from "@/public";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

const Header = () => {
    const router = useRouter();
    const pathname = usePathname();
    const sections = ["About", "Home", "Menu"];
    const icons = [globe, cart, user];
    const [currSection, setCurrSection] = useState("");

    useEffect(() => {
        const path =
            pathname === "/"
                ? "Home"
                : pathname.substring(1).charAt(0).toUpperCase() + pathname.slice(2);
        setCurrSection(path);
    }, [pathname]);

    const handleClick = (section: string) => {
        const path = section.toLowerCase();
        setCurrSection(section);
        router.push(path === "home" ? "/" : `/${path}`);
    };

    return (
        <header className="fixed top-0 z-10 flex h-[4.75rem] w-full justify-center border-b-[1px] border-black bg-wow-cream font-antonio text-[2rem]">
            {/* <Image src={WhiteWOWLogo} alt="White WOW Logo" className="w-24 h-24"/> */}
            <div className="flex w-[80rem] items-center justify-between px-[1rem]">
                <div className="flex flex-1 items-center gap-[1rem]">
                    <Image
                        src={RedWOWHeaderLogo}
                        alt="White WOW Logo"
                        className="h-12 w-[3rem] object-cover object-left"
                    />
                    <div className="font-bold">WOW-CENTREVILLE</div>
                </div>
                <ul className="flex gap-[2rem]">
                    {sections.map(section => {
                        return (
                            <li
                                onClick={() => handleClick(section)}
                                key={section}
                                className={`cursor-pointer text-[1.5rem] font-bold underline-offset-4 transition-transform duration-500 hover:underline ${
                                    currSection === section
                                        ? "text-[#C61C00] underline"
                                        : "text-black"
                                }`}
                            >
                                {section}
                            </li>
                        );
                    })}
                </ul>
                <div className="flex flex-1 justify-end">
                    <ul className="flex gap-[2rem]">
                        {icons.map((icon, i) => {
                            return (
                                <Image
                                    key={i}
                                    src={icon}
                                    alt={`${icon} icon`}
                                    width={32}
                                    height={32}
                                    className="cursor-pointer transition-transform duration-300 hover:scale-110"
                                />
                            );
                        })}
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;
