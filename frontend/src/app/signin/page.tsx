"use client";
import React, { useState } from "react";
import Image from "next/image";
import { eye, eyeSlash } from "@/public";
import { useRouter } from "next/navigation";

const SignUp = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible); // Toggle visibility
    };

    const router = useRouter();
    const handleSignInClick = () => {
        router.push("/signup");
    };

    return (
        <div className="mt-[2.5rem] flex min-h-screen w-full justify-center overflow-x-hidden py-[4.75rem]">
            <div className="flex w-[55vw] flex-col items-center gap-8">
                <br />
                <div className="text-[3.5rem] font-semibold text-wow-red">Sign Up</div>
                <input
                    type="text"
                    className="h-10 w-80 bg-[#D9D9D9] px-2 text-xl text-[#C61C00] placeholder:text-xl placeholder:text-[#C61C00] placeholder:opacity-35"
                    placeholder="Phone Number"
                    required
                />
                <input
                    type="text"
                    className="h-10 w-80 bg-[#D9D9D9] px-2 text-xl text-[#C61C00] placeholder:text-xl placeholder:text-[#C61C00] placeholder:opacity-35"
                    placeholder="First Name"
                    required
                />
                <input
                    type="text"
                    className="h-10 w-80 bg-[#D9D9D9] px-2 text-xl text-[#C61C00] placeholder:text-xl placeholder:text-[#C61C00] placeholder:opacity-35"
                    placeholder="Last Name"
                    required
                />
                <div className="relative w-80">
                    <input
                        type={isPasswordVisible ? "text" : "password"}
                        className="placeholder-text-xl h-10 w-full bg-[#D9D9D9] px-2 text-xl text-[#C61C00] placeholder:text-[#C61C00] placeholder:opacity-35"
                        placeholder="Password"
                        required
                    />
                    <div
                        className={`absolute right-2 top-1/2 -translate-y-1/2 transform cursor-pointer ${
                            !isPasswordVisible ? "translate-x-[5%]" : ""
                        }`} // Apply translation only when password is hidden
                        onClick={togglePasswordVisibility}
                    >
                        <Image
                            src={isPasswordVisible ? eye : eyeSlash} // Toggle between the icons
                            alt="eye-icon"
                        />
                    </div>
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
