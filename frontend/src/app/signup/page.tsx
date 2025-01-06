"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useRouter, usePathname } from "next/navigation";

const signUp = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State to toggle password visibility
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false); // State for confirm password
    const [isIconVisible, setIsIconVisible] = useState(false); // State to control eye icon visibility after the rest of the elements

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

    return (
        <div className="mt-[2.5rem] flex min-h-screen w-full justify-center overflow-x-hidden py-[4.75rem]">
            <div className="flex w-[55vw] flex-col items-center gap-8">
                <br />
                <div className="text-[3.5rem] font-semibold text-wow-red">Sign Up</div>
                <input
                    type="text"
                    className="h-10 w-80 bg-[#D9D9D9] px-2 placeholder:text-xl text-xl text-[#C61C00] placeholder:text-[#C61C00] placeholder:opacity-35"
                    placeholder="Phone Number"
                    required
                />
                <input
                    type="text"
                    className="h-10 w-80 bg-[#D9D9D9] px-2 placeholder:text-xl text-xl text-[#C61C00] placeholder:text-[#C61C00] placeholder:opacity-35"
                    placeholder="First Name"
                    required
                />
                <input
                    type="text"
                    className="h-10 w-80 bg-[#D9D9D9] px-2 placeholder:text-xl text-xl text-[#C61C00] placeholder:text-[#C61C00] placeholder:opacity-35"
                    placeholder="Last Name"
                    required
                />
                <div className="relative w-80">
                    <input
                        type={isPasswordVisible ? "text" : "password"} // Toggle password visibility
                        className="h-10 w-full bg-[#D9D9D9] px-2 text-[#C61C00] placeholder-text-xl text-xl placeholder:text-[#C61C00] placeholder:opacity-35"
                        placeholder="Password"
                        required
                    />
                    {isIconVisible && (
                        <FontAwesomeIcon
                            icon={isPasswordVisible ? faEyeSlash : faEye}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-[#C61C00]"
                            onClick={togglePasswordVisibility}
                        />
                    )}
                </div>
                <div className="relative w-80">
                    <input
                        type={isConfirmPasswordVisible ? "text" : "password"} // Toggle confirm password visibility
                        className="h-10 w-full bg-[#D9D9D9] px-2 text-[#C61C00] placeholder-text-xl text-xl placeholder:text-[#C61C00] placeholder:opacity-35"
                        placeholder="Confirm Password"
                        required
                    />
                    {isIconVisible && (
                        <FontAwesomeIcon
                            icon={isConfirmPasswordVisible ? faEyeSlash : faEye}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-[#C61C00]"
                            onClick={toggleConfirmPasswordVisibility}
                        />
                    )}
                </div>
                <button className="bg-wow-red text-wow-cream w-80 h-12 text-[1.5rem] rounded-[5px] hover:bg-[#af1800] transition-bg duration-300">Create Account</button>
                <div className="text-[1.15rem] text-[#C61C00] -mb-7">Already have an account?</div>
                <button className="bg-[#D9D9D9] text-wow-red w-80 h-12 text-[1.5rem] rounded-[5px] hover:bg-[#C4C4C4] transition-bg duration-300" onClick={handleSignInClick}>Sign In</button>
            </div>
        </div>
    );
};

export default signUp;
