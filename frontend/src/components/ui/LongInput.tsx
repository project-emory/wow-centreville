"use client";

import * as React from "react";
import { TextInputLongTypes } from "@/src/types/LongInputTypes";

const TextInputLong = ({
    placeholder,
    className,
    width,
    height,
    maxLength = 100, // Default maxLength value
}: TextInputLongTypes) => {
    const [value, setValue] = React.useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        // Prevent input if the maxLength is met
        if (e.target.value.length <= maxLength) {
            setValue(e.target.value); // Update the internal state when the input changes
        }
    };

    const isMaxMet = value.length >= maxLength;

    return (
        <div className="relative" style={{ width }}>
            {/* Container for the textarea and character count */}
            <textarea
                value={value}
                onChange={handleInputChange}
                placeholder={placeholder}
                maxLength={maxLength} // Set maxLength to restrict input
                className={`border-2 ${
                    isMaxMet ? "border-red-500" : "border-wow-cream"
                } bg-[#D9D9D9] p-2 pb-6 pr-12 text-lg text-[#C61C00] placeholder:text-lg placeholder:text-wow-red placeholder:opacity-100 sm:text-lg sm:placeholder:text-lg md:text-lg md:placeholder:text-lg lg:text-2xl lg:placeholder:text-2xl ${isMaxMet ? "focus:border-red-500" : "focus:border-[#C61C00]"} focus:outline-none focus:placeholder:text-[#C61C00] focus:placeholder:opacity-60 ${className} resize-none`}
                style={{ width: "100%", height }} // Use 100% to fill the container width
                rows={4} // Controls the number of visible text lines
            />

            {/* Character count inside the container */}
            <div
                className={`text-md absolute bottom-3 right-3 ${
                    isMaxMet ? "text-red-500" : "text-[#C61C00]"
                } pointer-events-none`}
                style={{ zIndex: 2 }}
            >
                {value.length}/{maxLength}
            </div>
        </div>
    );
};

export default TextInputLong;
