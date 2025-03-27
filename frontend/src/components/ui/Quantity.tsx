"use client";

import * as React from "react";

const IncrementButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <button
            type="button"
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-black bg-white pb-1.5 align-middle text-4xl text-black transition hover:bg-gray-100"
            onClick={onClick}
        >
            +
        </button>
    );
};

const DecrementButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <button
            type="button"
            className="pl-0.25 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-black bg-white pb-1.5 align-middle text-4xl text-black transition hover:bg-gray-100"
            onClick={onClick}
        >
            -
        </button>
    );
};

const Quantity = () => {
    const [value, setValue] = React.useState(1);

    const increment = () => {
        if (value < 99) {
            setValue(value + 1);
        }
    };

    const decrement = () => {
        if (value > 1) {
            setValue(value - 1);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = parseInt(event.target.value, 10);
        if (isNaN(newValue)) {
            newValue = 1; // Reset to 1 if the input is not a valid number
        }
        setValue(Math.max(1, Math.min(newValue, 99))); // Constrain between 1 and 99
    };

    return (
        <div className="flex items-center space-x-2">
            <DecrementButton onClick={decrement} />
            <input
                type="text" // Change to text to remove the arrows
                className="text-md w-14 rounded border border-black p-2 text-center text-black"
                value={value}
                onChange={handleInputChange}
            />
            <IncrementButton onClick={increment} />
        </div>
    );
};

export default Quantity;
