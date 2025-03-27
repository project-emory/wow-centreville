"use client";

import * as React from "react";

// Correcting the interface to match the component usage
export interface TextInputShortTypes {
    placeholder?: string;
    className?: string;
    width?: string | number;
    height?: string | number;
    value?: string; // Use `value` instead of `content`
    onChange?: (value: string) => void; // Ensure `onChange` expects a string value
}

const TextInputShort = ({
    placeholder,
    className,
    width,
    height,
    onChange,
    value: externalValue, // This allows controlled value from the parent
}: TextInputShortTypes) => {
    // Internal state to manage the value
    const [value, setValue] = React.useState(externalValue || "");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue); // Update internal state with the input value

        // Call the `onChange` callback if provided, passing the new value
        if (onChange) {
            onChange(newValue);
        }
    };

    // Sync internal state with the external `value` prop (if it changes)
    React.useEffect(() => {
        setValue(externalValue || "");
    }, [externalValue]);

    return (
        <input
            type="text"
            value={value} // Controlled value from state or parent
            placeholder={placeholder}
            className={`border-2 border-wow-cream bg-[#D9D9D9] p-2 text-lg text-[#C61C00] placeholder:text-lg placeholder:text-wow-red placeholder:opacity-100 focus:border-[#C61C00] focus:outline-none focus:placeholder:text-[#C61C00] focus:placeholder:opacity-60 sm:text-lg sm:placeholder:text-lg md:text-lg md:placeholder:text-lg lg:text-2xl lg:placeholder:text-2xl ${className}`}
            style={{ width, height }}
            onChange={handleInputChange} // Handle input change and propagate to parent
        />
    );
};

export default TextInputShort;
