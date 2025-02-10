"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { eye, eyeSlash } from "@/public";
import { useRouter } from "next/navigation";

const SignUp = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State to toggle password visibility
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false); // State for confirm password
    const [isIconVisible, setIsIconVisible] = useState(false); // State to control eye icon visibility after the rest of the elements
    const [phoneNumber, setPhoneNumber] = useState(""); // State for phone number

    // Ensure icon is only rendered after the component has fully loaded
    useEffect(() => {
        setIsIconVisible(true); // Make eye icon visible after the component mounts
    }, []);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible); // Toggle visibility for password
    };

    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible); // Toggle visibility for confirm password
    };

    const router = useRouter();
    const handleSignInClick = () => {
        router.push("/signin");
    };

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value.replace(/\D/g, ""); // Remove non-digit characters
        const formattedInput = formatPhoneNumber(input);
        setPhoneNumber(formattedInput);
    };

    const formatPhoneNumber = (value: string) => {
        if (!value) return "";
        const phoneNumberLength = value.length;
        if (phoneNumberLength < 4) return value;
        if (phoneNumberLength < 7) {
            return `${value.slice(0, 3)}-${value.slice(3)}`;
        }
        return `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6, 10)}`;
    };

    return (
        <div className="mt-[2.5rem] flex min-h-screen w-full justify-center overflow-x-hidden py-[4.75rem]">
            <div className="flex w-[55vw] flex-col items-center gap-8">
                <br />
                <div className="text-[3.5rem] font-semibold text-wow-red">Sign Up</div>
                <input
                    type="text"
                    className="h-10 w-80 bg-[#D9D9D9] px-2 text-xl text-[#C61C00] placeholder:text-xl placeholder:text-wow-red placeholder:opacity-100 focus:outline-none focus:placeholder:text-[#C61C00] focus:placeholder:opacity-60"
                    placeholder="First Name"
                    required
                />
                <input
                    type="text"
                    className="h-10 w-80 bg-[#D9D9D9] px-2 text-xl text-[#C61C00] placeholder:text-xl placeholder:text-wow-red placeholder:opacity-100 focus:outline-none focus:placeholder:text-[#C61C00] focus:placeholder:opacity-60"
                    placeholder="Last Name"
                    required
                />
                <input
                    type="text"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    className="h-10 w-80 bg-[#D9D9D9] px-2 text-xl text-[#C61C00] placeholder:text-xl placeholder:text-wow-red placeholder:opacity-100 focus:outline-none focus:placeholder:text-[#C61C00] focus:placeholder:opacity-60"
                    placeholder="Phone Number"
                    required
                />
                <div className="relative w-80">
                    <input
                        type={isPasswordVisible ? "text" : "password"} // Toggle password visibility
                        className="placeholder-text-xl h-10 w-full bg-[#D9D9D9] px-2 text-xl text-[#C61C00] placeholder:text-wow-red placeholder:opacity-100 focus:outline-none focus:placeholder:text-[#C61C00] focus:placeholder:opacity-60"
                        placeholder="Password"
                        required
                    />
                    {isIconVisible && (
                        <div
                            className={`absolute right-2 top-1/2 -translate-y-1/2 transform cursor-pointer ${
                                !isPasswordVisible ? "translate-x-[5%]" : ""
                            }`} // Apply translation only when password is hidden
                            onClick={togglePasswordVisibility} // Toggle the password visibility
                        >
                            <Image
                                src={isPasswordVisible ? eye : eyeSlash} // Toggle between the icons
                                alt="eye-icon"
                            />
                        </div>
                    )}
                </div>

                <div className="relative w-80">
                    <input
                        type={isConfirmPasswordVisible ? "text" : "password"} // Toggle confirm password visibility
                        className="placeholder-text-xl h-10 w-full bg-[#D9D9D9] px-2 text-xl text-[#C61C00] placeholder:text-wow-red placeholder:opacity-100 focus:outline-none focus:placeholder:text-[#C61C00] focus:placeholder:opacity-60"
                        placeholder="Confirm Password"
                        required
                    />
                    {isIconVisible && (
                        <div
                            className={`absolute right-2 top-1/2 -translate-y-1/2 transform cursor-pointer ${
                                !isConfirmPasswordVisible ? "translate-x-[5%]" : ""
                            }`} // Apply translation only when confirm password is hidden
                            onClick={toggleConfirmPasswordVisibility} // Toggle the confirm password visibility
                        >
                            <Image
                                src={isConfirmPasswordVisible ? eye : eyeSlash} // Toggle between the icons
                                alt="eye-icon"
                            />
                        </div>
                    )}
                </div>

                <button className="transition-bg h-12 w-80 rounded-[5px] bg-wow-red text-[1.5rem] text-wow-cream duration-300 hover:bg-[#af1800]">
                    Create Account
                </button>
                <div className="-mb-7 text-[1.15rem] text-[#C61C00]">Already have an account?</div>
                <button
                    className="transition-bg h-12 w-80 rounded-[5px] bg-[#D9D9D9] text-[1.5rem] text-wow-red duration-300 hover:bg-[#C4C4C4]"
                    onClick={handleSignInClick}
                >
                    Sign In
                </button>
            </div>
        </div>
    );
};

export default SignUp;
