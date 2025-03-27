"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { useState } from "react";

const Checkbox = ({ label, className }: { label: string; className?: string }) => {
    // Internal state to manage checked status
    const [isChecked, setIsChecked] = useState(false);

    const toggleCheckbox = () => {
        setIsChecked(prev => !prev);
    };

    const handleCheckboxChange = (checked: boolean) => {
        setIsChecked(checked); // Directly set the new state
    };

    return (
        <CheckboxPrimitive.Root
            checked={isChecked} // Use internal state
            onCheckedChange={handleCheckboxChange} // Handle change
            className={`${className} inline-flex items-center space-x-2`}
        >
            {/* The box itself */}
            <div
                className={`flex items-center justify-center rounded-sm border-2 ${
                    isChecked ? "border-wow-red" : "border-black"
                } box-border h-4 min-h-5 w-4 min-w-5 flex-shrink-0 sm:h-4 sm:min-h-5 sm:w-4 sm:min-w-5 md:h-5 md:min-h-5 md:w-5 md:min-w-5 lg:h-6 lg:min-h-6 lg:w-6 lg:min-w-6`} // Resize the checkbox according to breakpoints
                onClick={toggleCheckbox} // Add click event to toggle the checkbox
            >
                <CheckboxPrimitive.Indicator className="flex items-center justify-center">
                    <svg
                        viewBox="0 0 24 24"
                        className="bg-wow-red text-wow-cream md:h-5 md:w-5 lg:h-6 lg:w-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M20 6L9 17l-5-5" />
                    </svg>
                </CheckboxPrimitive.Indicator>
            </div>

            {/* Label */}
            <span
                className={`mb-1 flex whitespace-nowrap text-lg sm:text-lg md:text-lg lg:text-2xl ${isChecked ? "text-wow-red" : "text-black"}`} // Label font size changes only for md and lg
            >
                {label}
            </span>
        </CheckboxPrimitive.Root>
    );
};

export default Checkbox;
