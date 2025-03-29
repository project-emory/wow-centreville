"use client";

import React from "react";
import Checkbox from "@/src/components/ui/Checkbox";
import TextInputShort from "@/src/components/ui/ShortInput";
import { SearchBar, TextInputLong } from "@/src/components";
import RadioButtonGroup from "@/src/components/ui/RadioButton";
import Quantity from "@/src/components/ui/Quantity";
import WeekSelector from "@/src/components/ui/WeekSelector";

const Page = () => {
    return (
        <div className="flex flex-col gap-4 p-60">
            <Checkbox />
            <TextInputShort
                value=""
                onChange={() => {}}
                placeholder="Enter text"
                className="rounded-md border border-gray-300"
                width={200}
            />
            <TextInputLong
                content=""
                onChange={() => {}}
                placeholder="Enter text"
                className="rounded-md border border-gray-300"
                width="50vw"
                maxLength={300}
            />
            <SearchBar className="rounded-md border border-gray-300" onSearch={() => {}} />

            <RadioButtonGroup />

            <Quantity />

            <br></br>

            <WeekSelector />
        </div>
    );
};

export default Page;
