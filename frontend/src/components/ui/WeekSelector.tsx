"use client";

import React, { useState } from "react";

const WeekSelector = () => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());

    // Helper function to get the start and end of the week for a given date
    const getWeekRange = (date: Date) => {
        const startDate = new Date(date);
        const endDate = new Date(date);

        // Get the day of the week (0 = Sunday, 1 = Monday, etc.)
        const dayOfWeek = startDate.getDay();

        // Adjust the start date to the beginning of the week (Sunday)
        startDate.setDate(startDate.getDate() - dayOfWeek);

        // Adjust the end date to the end of the week (Saturday)
        endDate.setDate(endDate.getDate() + (6 - dayOfWeek));

        // Format the dates to a readable string (e.g., "Oct 27-Nov 2")
        const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
        const startStr = startDate.toLocaleDateString("en-US", options);
        const endStr = endDate.toLocaleDateString("en-US", options);

        // Get the year from the end date and add it in parentheses
        const year = endDate.getFullYear();

        return `${startStr} - ${endStr} (${year})`;
    };

    // Handle the previous week change
    const goToPreviousWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() - 7);
        setCurrentDate(newDate);
    };

    // Handle the next week change
    const goToNextWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + 7);
        setCurrentDate(newDate);
    };

    return (
        <div className="flex items-center space-x-0 whitespace-nowrap">
            {/* Left arrow */}
            <button
                onClick={goToPreviousWeek}
                className="flex h-12 items-center justify-center border border-2 border-white bg-[#AD4F02] p-3 pb-5 text-4xl text-white transition hover:bg-[#9B4402] sm:h-14 sm:p-4 sm:pb-7 sm:text-5xl lg:h-16 lg:p-5 lg:pb-8 lg:text-6xl"
            >
                &lt;
            </button>

            {/* Week range display */}
            <div className="flex h-12 items-center justify-center border border-2 border-white bg-[#E56E0D] p-3 text-2xl font-semibold text-white sm:h-14 sm:p-4 sm:text-3xl lg:h-16 lg:p-5 lg:text-4xl">
                {getWeekRange(currentDate)}
            </div>

            {/* Right arrow */}
            <button
                onClick={goToNextWeek}
                className="flex h-12 items-center justify-center border border-2 border-white bg-[#AD4F02] p-3 pb-5 text-4xl text-white transition hover:bg-[#9B4402] sm:h-14 sm:p-4 sm:pb-7 sm:text-5xl lg:h-16 lg:p-5 lg:pb-8 lg:text-6xl"
            >
                &gt;
            </button>
        </div>
    );
};

export default WeekSelector;
