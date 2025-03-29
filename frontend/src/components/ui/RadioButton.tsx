"use client";

import * as React from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";

const RadioButtonGroup = () => {
    const [selectedValue, setSelectedValue] = React.useState<string>("");

    return (
        <RadioGroup.Root
            value={selectedValue}
            onValueChange={setSelectedValue}
            className="space-y-2"
        >
            <RadioButton label="Option 1" value="option1" selectedValue={selectedValue} />
            <RadioButton label="Option 2" value="option2" selectedValue={selectedValue} />
            <RadioButton label="Option 3" value="option3" selectedValue={selectedValue} />
        </RadioGroup.Root>
    );
};

const RadioButton = ({
    label,
    value,
    selectedValue,
}: {
    label: string;
    value: string;
    selectedValue: string;
}) => {
    return (
        <RadioGroup.Item
            value={value}
            id={value}
            className={`flex cursor-pointer items-center p-2 text-lg sm:text-lg md:text-lg lg:text-2xl ${selectedValue === value ? "border-wow-red text-wow-red" : "border-black text-black"} rounded-md focus:outline-none`}
        >
            <div
                className={`mr-2 h-5 w-5 border-2 ${selectedValue === value ? "border-wow-red" : "border-black"} flex items-center justify-center rounded-full`}
            >
                <div
                    className={`h-3 w-3 rounded-full transition-all duration-200 ${selectedValue === value ? "bg-wow-red opacity-100" : "bg-black opacity-0"}`}
                ></div>
            </div>
            {/* Radio button label */}
            <span className="whitespace-nowrap">{label}</span>
        </RadioGroup.Item>
    );
};

export { RadioButtonGroup, RadioButton };
