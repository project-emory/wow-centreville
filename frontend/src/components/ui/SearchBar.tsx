"use client";

import * as React from "react";
import { SearchBarTypes } from "@/src/types/SearchBarTypes"; // Assuming you have a type for SearchBar

import Image from "next/image";
import { MagnifyingGlass } from "@/public";

// Import your TextInputShort component
import TextInputShort from "./ShortInput"; // Adjust the path as needed

// Search Bar Component
const SearchBar = ({
    placeholder = "Search...",
    className = "",
    width = "300px",
    height = "50px",
    onSearch,
}: SearchBarTypes) => {
    const [value, setValue] = React.useState(""); // Local state for the search input

    // Handle input change
    const handleInputChange = (newValue: string) => {
        setValue(newValue); // Update the value when user types
    };

    // Handle search button click
    const handleSearchClick = () => {
        if (onSearch) {
            onSearch(value); // Call the onSearch callback with the current value
        }
    };

    return (
        <div className="inline-flex items-center whitespace-nowrap">
            {/* Use the TextInputShort component for the input field */}
            <TextInputShort
                value={value}
                onChange={handleInputChange} // Passing input change handler to TextInputShort
                placeholder={placeholder}
                className={`flex-shrink-0 rounded-md border border-gray-300 ${className}`} // Make the input take up available space
                width={width}
                height={height}
            />
            {/* {Search button with magnifying glass icon} */}
            <button
                onClick={handleSearchClick}
                className="flex h-[45px] w-[45px] flex-shrink-0 items-center justify-center rounded-md bg-wow-cream text-white transition duration-300 ease-in-out hover:bg-[#F2E8C5] focus:outline-none"
            >
                {/* Apply a filter to make the icon white */}
                <Image
                    src={MagnifyingGlass}
                    alt="Search"
                    className="wow-red h-[25px] w-[25px] sm:h-[25px] sm:w-[25px] md:h-[25px] md:w-[25px] lg:h-[30px] lg:w-[30px]" // This will make the image appear white
                />
            </button>
        </div>
    );
};

export default SearchBar;
