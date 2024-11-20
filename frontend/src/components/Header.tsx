"use client";

import { useState, useEffect } from "react";
import { RedWOWHeaderLogo, globe, cart, user } from "@/public";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger,
} from '@/src/components/ui';
import '@/src/libs/i18n';
import { useTranslation } from 'react-i18next'; 

const Header = () => {
    const { push } = useRouter();
    const pathname = usePathname();
    const icons = [cart, user];
    const [currSection, setCurrSection] = useState("");
    const { i18n, t } = useTranslation('header');
    const [ language, setLanguage ] = useState('en');

    const sections = [
        { label: t('menu.1'), url: '/about' },
        { label: t('menu.2'), url: '/' }, 
        { label: t('menu.3'), url: '/menu'},
    ];

    const changeLanguage = (lang: string) => {
        console.log('Changing language to:', lang);
        i18n.changeLanguage(lang);
        setLanguage(lang); 
    };

    useEffect(() => {
        const pathMap: { [key: string]: string } = {
            '/': t('menu.2'),
            '/about': t('menu.1'),
            '/menu': t('menu.3')
        };
        
        const path = pathMap[pathname]; 
        setCurrSection(path);
    }, [pathname, t]);

    return (
        <header className="fixed top-0 z-10 flex h-[4.75rem] w-full justify-center border-b-[1px] border-black bg-wow-cream font-antonio text-[2rem]">
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
                                onClick={() => push(section.url)}
                                key={section.label}
                                className={`cursor-pointer text-[1.5rem] font-bold underline-offset-4 transition-transform duration-500 hover:underline ${
                                    currSection === section.label
                                        ? "text-[#C61C00] underline"
                                        : "text-black"
                                }`}
                            >
                                {section.label}
                            </li>
                        );
                    })}
                </ul>
                <div className="flex flex-1 justify-end">
                    <ul className="flex gap-[2rem]">
                        <div>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="focus:outline-none">
                                    <Image key={18} src={globe} alt='language setting' width={32} height={32} className="cursor-pointer transition-transform duration-300 hover:scale-110"/>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="flex-col flex items-center bg-white border-none">
                                    <DropdownMenuItem onClick={() => changeLanguage('ko')} className={`${language==='en' ? 'text-wow-black' : 'text-wow-red'} text-lg font-bold`}>
                                        한국어
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => changeLanguage('en')} className={`${language==='ko' ? 'text-wow-black' : 'text-wow-red'} text-lg font-bold`}>
                                        English
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        {icons.map((icon, i) => {
                            return (
                                <Image
                                    key={i}
                                    src={icon}
                                    alt={`${icon} icon`}
                                    width={32}
                                    height={32}
                                    className="cursor-pointer transition-transform duration-200 hover:scale-110"
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
