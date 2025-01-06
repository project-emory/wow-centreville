"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useRouter, usePathname } from "next/navigation";

const SignIn = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State to toggle password visibility
    const [isIconVisible, setIsIconVisible] = useState(false); // State to control eye icon visibility after the rest of the elements

    // Ensure icon is only rendered after the component has fully loaded
    useEffect(() => {
        setIsIconVisible(true); // Make eye icon visible after the component mounts
    }, []);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible); // Toggle visibility
    };

    const router = useRouter();
    const handleSignUpClick = () => {
        router.push("/signup");
    };

    return (
        <div className="mt-[2.5rem] flex min-h-screen w-full justify-center overflow-x-hidden py-[4.75rem]">
            <div className="flex w-[55vw] flex-col items-center gap-8">
                <br />
                <div className="text-[3.5rem] font-semibold text-wow-red">Sign In</div>
                <input
                    type="text"
                    className="h-10 w-80 bg-[#D9D9D9] px-2 placeholder:text-xl text-xl text-[#C61C00] placeholder:text-[#C61C00] placeholder:opacity-35"
                    placeholder="Phone Number"
                    required
                />
                <div className="relative w-80">
                    <input
                        type={isPasswordVisible ? "text" : "password"} // Toggle password visibility
                        className="h-10 w-full bg-[#D9D9D9] px-2 text-[#C61C00] placeholder-text-xl text-xl placeholder:text-[#C61C00] placeholder:opacity-35"
                        placeholder="Password"
                        required
                    />
                    {/* Eye icon to toggle password visibility */}
                    {isIconVisible && (
                        <FontAwesomeIcon
                            icon={isPasswordVisible ? faEye : faEyeSlash}
                            onClick={togglePasswordVisibility}
                            className="absolute right-2 top-1/2 -translate-y-1/2 transform cursor-pointer text-md text-[#C61C00]"
                        />
                    )}
                </div>
                <div className="relative left-[102px] -mt-5 cursor-pointer text-[1.15rem] text-[#C61C00] hover:underline">
                    Forgot Password?
                </div>
                <button className="bg-wow-red text-wow-cream w-80 h-12 text-[1.5rem] rounded-[5px] hover:bg-[#af1800] transition-bg duration-300">Login</button>
                <div className="text-[1.15rem] text-[#C61C00] -mb-7">New User?</div>
                <button className="bg-[#D9D9D9] text-wow-red w-80 h-12 text-[1.5rem] rounded-[5px] hover:bg-[#C4C4C4] transition-bg duration-300" onClick={handleSignUpClick}>Create Account</button>
            </div>
        </div>
    );
};

export default SignIn;