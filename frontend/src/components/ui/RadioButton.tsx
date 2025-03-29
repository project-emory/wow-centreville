"use client";

import React, { useState } from "react";
import { RadioButtonTypes } from "@/src/types/RadioButtonTypes";

// RadioButton Component
const RadioButton = ({
    label,
    value,
    selectedValue,
    onChange,
}: {
    label: string;
    value: string;
    selectedValue: string;
    onChange: (value: string) => void;
}) => {
    return (
        <div
            onClick={() => onChange(value)}
            className={`flex cursor-pointer items-center p-2 text-lg sm:text-lg md:text-lg lg:text-2xl ${
                selectedValue === value ? "border-wow-red text-wow-red" : "border-black text-black"
            } rounded-md focus:outline-none`}
        >
            <div
                className={`mr-2 h-5 w-5 border-2 ${
                    selectedValue === value ? "border-wow-red" : "border-black"
                } flex items-center justify-center rounded-full`}
            >
                <div
                    className={`h-3 w-3 rounded-full transition-all duration-200 ${
                        selectedValue === value ? "bg-wow-red opacity-100" : "bg-black opacity-0"
                    }`}
                ></div>
            </div>
            <span className="whitespace-nowrap pb-1">{label}</span>
        </div>
    );
};

// RadioButtonGroup Component - This has the add/remove functionality
const RadioButtonGroup = () => {
    const [selectedValue, setSelectedValue] = useState<string>("");
    const [radioButtons, setRadioButtons] = useState<RadioButtonTypes[]>([]);
    const [newButtonLabel, setNewButtonLabel] = useState<string>("");

    const addRadioButton = () => {
        if (newButtonLabel.trim() !== "") {
            const newButton = {
                label: newButtonLabel,
                value: `option${radioButtons.length + 1}`,
            };
            setRadioButtons((prevButtons) => [...prevButtons, newButton]);
            setNewButtonLabel(""); // Clear the input field
        }
    };

    // Function to remove the last radio button
    const removeRadioButton = () => {
        setRadioButtons((prevButtons) => prevButtons.slice(0, -1));
    };

    return (
        <div>
            {/* Input and Buttons for adding/removing radio buttons */}
            <div className="flex items-center mb-4 gap-2 flex-wrap">
                <input
                    type="text"
                    value={newButtonLabel}
                    onChange={(e) => setNewButtonLabel(e.target.value)}
                    placeholder="Radio Button Label"
                    className="p-2 border border-gray-300 rounded-md"
                />
                <button
                    onClick={addRadioButton}
                    className="p-2 bg-[#E56E0D] text-white rounded-md flex-shrink-0"
                >
                    Add Radio Button
                </button>
                <button
                    onClick={removeRadioButton}
                    className="p-2 bg-[#AD4F02] text-white rounded-md flex-shrink-0"
                >
                    Remove Last Radio Button
                </button>
            </div>

            {/* Radio Group */}
            <div className="space-y-2">
                {radioButtons.map((button) => (
                    <RadioButton
                        key={button.value}
                        label={button.label}
                        value={button.value}
                        selectedValue={selectedValue}
                        onChange={setSelectedValue}
                    />
                ))}
            </div>
        </div>
    );
};

export default RadioButtonGroup;