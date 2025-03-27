"use client";

import * as React from "react";
import { TextInputShortTypes } from "@/src/types/ShortInputTypes";

const TextInputShort = ({
    placeholder,
    className,
    width,
    height,
    content,
    onChange,
}: TextInputShortTypes) => {
    // Internal state to manage the value of the input field
    const [value, setValue] = React.useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value); // Update the internal state when the input changes
    };

    return (
        <input
            type="text"
            value={value}
            onChange={handleInputChange}
            placeholder={placeholder}
            className={`border-2 border-wow-cream bg-[#D9D9D9] p-2 text-lg text-[#C61C00] placeholder:text-lg placeholder:text-wow-red placeholder:opacity-100 focus:border-[#C61C00] focus:outline-none focus:placeholder:text-[#C61C00] focus:placeholder:opacity-60 sm:text-lg sm:placeholder:text-lg md:text-lg md:placeholder:text-lg lg:text-2xl lg:placeholder:text-2xl ${className}`}
            style={{ width: width, height: height }}
        />
    );
};

export default TextInputShort;
