"use client";

import * as React from "react";
import { useState } from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

// Checkbox Component
const Checkbox = ({
    label,
    value,
    selectedValues,
    onChange,
}: {
    label: string;
    value: string;
    selectedValues: string[];
    onChange: (value: string) => void;
}) => {
    const isChecked = selectedValues.includes(value);

    const handleCheckboxChange = () => {
        if (isChecked) {
            onChange(value); // Remove value if already checked
        } else {
            onChange(value); // Add value if not checked
        }
    };

    return (
        <CheckboxPrimitive.Root
            checked={isChecked} // Use internal state for checking status
            onCheckedChange={handleCheckboxChange} // Handle change
            className={`flex cursor-pointer items-center text-lg sm:text-lg md:text-lg lg:text-2xl ${
                isChecked ? "border-wow-red text-wow-red" : "border-black text-black"
            } rounded-md focus:outline-none`}
        >
            {/* Checkbox Box */}
            <div
                className={`mr-2 flex items-center justify-center sm:h-5 sm:w-5 lg:h-6 lg:w-6 border-2 ${
                    isChecked ? "border-wow-red" : "border-black"
                } rounded-sm`}
            >
                <CheckboxPrimitive.Indicator className="flex items-center justify-center">
                    {isChecked && (
                        <svg
                            viewBox="0 0 24 24"
                            className="bg-wow-red text-wow-cream sm:h-5 sm:w-5 lg:h-7 lg:w-7"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ width: "100%", height: "100%" }} // Ensure the checkmark matches the size of the box
                        >
                            <path d="M20 6L9 17l-5-5" />
                        </svg>
                    )}
                </CheckboxPrimitive.Indicator>
            </div>
            {/* Label */}
            <span className="whitespace-nowrap pb-1">{label}</span>
        </CheckboxPrimitive.Root>
    );
};

// CheckboxGroup Component - This has the add/remove functionality
const CheckboxGroup = () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const [checkboxes, setCheckboxes] = useState<{ label: string; value: string }[]>([]);
    const [newCheckboxLabel, setNewCheckboxLabel] = useState<string>("");

    const addCheckbox = () => {
        if (newCheckboxLabel.trim() !== "") {
            const newCheckbox = {
                label: newCheckboxLabel,
                value: `option${checkboxes.length + 1}`,
            };
            setCheckboxes((prevCheckboxes) => [...prevCheckboxes, newCheckbox]);
            setNewCheckboxLabel(""); // Clear the input field
        }
    };

    // Function to remove the last checkbox
    const removeCheckbox = () => {
        setCheckboxes((prevCheckboxes) => prevCheckboxes.slice(0, -1));
    };

    // Function to handle selection/deselection of checkboxes
    const handleCheckboxChange = (value: string) => {
        setSelectedValues((prevSelectedValues) =>
            prevSelectedValues.includes(value)
                ? prevSelectedValues.filter((val) => val !== value)
                : [...prevSelectedValues, value]
        );
    };

    return (
        <div>
            {/* Input and Buttons for adding/removing checkboxes */}
            <div className="flex items-center mb-4 gap-2 flex-wrap">
                <input
                    type="text"
                    value={newCheckboxLabel}
                    onChange={(e) => setNewCheckboxLabel(e.target.value)}
                    placeholder="Checkbox Label"
                    className="p-2 border border-gray-300 rounded-md"
                />
                <button
                    onClick={addCheckbox}
                    className="p-2 bg-[#E56E0D] text-white rounded-md flex-shrink-0"
                >
                    Add Checkbox
                </button>
                <button
                    onClick={removeCheckbox}
                    className="p-2 bg-[#AD4F02] text-white rounded-md flex-shrink-0"
                >
                    Remove Last Checkbox
                </button>
            </div>

            {/* Checkbox Group */}
            <div className="space-y-2">
                {checkboxes.map((checkbox) => (
                    <Checkbox
                        key={checkbox.value}
                        label={checkbox.label}
                        value={checkbox.value}
                        selectedValues={selectedValues}
                        onChange={handleCheckboxChange}
                    />
                ))}
            </div>
        </div>
    );
};

export default CheckboxGroup;