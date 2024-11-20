"use client";

import { ButtonTypes } from "@/src/types";
import { useRouter } from "next/navigation";

const Button = ({ title, route, onClick, className = "" }: ButtonTypes) => {
    const router = useRouter();

    const handleClick = () => {
        if (route) {
            router.push(route);
        } else if (onClick) {
            onClick();
        }
    };
    return (
        <button
            onClick={handleClick}
            className={`${className} flex h-fit cursor-pointer content-center justify-center rounded-md bg-wow-red px-[0.875rem] py-[0.65rem] text-sm font-bold transition-transform duration-300 hover:bg-[#af1800]`}
        >
            <span className="text-wow-cream">{title}</span>
        </button>
    );
};

export default Button;
