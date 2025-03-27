"use client";

import * as React from "react";

type ShortInputTypes = {
    placeholder?: string;
    className?: string;
    width?: string | number;
    height?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string; // Add value prop
};

const TextInputShort = ({
    placeholder,
    className,
    width,
    height,
    onChange,
    value: externalValue, // Add value as a prop
}: ShortInputTypes) => {
    const [value, setValue] = React.useState(externalValue || "");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        if (onChange) {
            onChange(e); // Call onChange if provided (for controlled component)
        }
    };

    React.useEffect(() => {
        setValue(externalValue || ""); // Update value if prop changes
    }, [externalValue]);

    return (
        <input
            type="text"
            value={value}
            placeholder={placeholder}
            className={`border-2 border-wow-cream bg-[#D9D9D9] p-2 text-lg text-[#C61C00] placeholder:text-lg placeholder:text-wow-red placeholder:opacity-100 focus:border-[#C61C00] focus:outline-none focus:placeholder:text-[#C61C00] focus:placeholder:opacity-60 sm:text-lg sm:placeholder:text-lg md:text-lg md:placeholder:text-lg lg:text-2xl lg:placeholder:text-2xl ${className}`}
            style={{ width, height }}
            onChange={handleInputChange}
        />
    );
};

export default TextInputShort;
