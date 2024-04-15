"use client";
import { Button } from "@/components/ui/button";
import axios from "@/lib/api/axios";
import { Loader } from "lucide-react";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
type Props = {};

const Page = (props: Props) => {
    const router = useRouter();
    const email = useSearchParams().get("email");

    const [verification_code, setOTP] = React.useState<string>();
    const [loader, setLoader] = React.useState<boolean>(false);
    const otpRef = React.useRef<HTMLInputElement>(null);

    const [minutes, setMinutes] = React.useState<number>(1);
    const [seconds, setSeconds] = React.useState<number>(30);

    React.useEffect(() => {
        otpRef.current?.focus();
    }, []);

    React.useEffect(() => {
        if (!email) {
            toast.error(
                "Please login to your account before retrying verification."
            );
            router.replace("/auth/login");
        }
    }, [email, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoader(true);

        try {
            const response = await axios.post(
                "/account/verify/",
                JSON.stringify({
                    email,
                    verification_code,
                })
            );
            const data = await response.data;
            Cookies.set("__token", data.token, {
                expires: 100,
            });
            toast.success("Account verification successful!");

            router.push("/");
        } catch (err: any) {
            console.log(err);
            if (!err.response) {
                toast.error(err.message);
            }
            if (err.response.data) {
                const emailErr = err.response.data?.email;
                const verification_code_err =
                    err.response.data?.verification_code;
                if (emailErr) {
                    toast.error(emailErr[0]);
                }
                if (verification_code_err) {
                    toast.error(verification_code_err[0]);
                }
            }
        } finally {
            setLoader(false);
        }
    };

    const resendOTP = async (e: any) => {
        e.preventDefault();

        try {
            await axios.post(
                "/account/verification-code/regenerate/",
                JSON.stringify({
                    email,
                })
            );
            toast.success("Verification code sent to your email!");
            setMinutes(1);
            setSeconds(30);
        } catch (err: any) {
            console.log(err);
            toast.error("Unable to complete your request.");
        } finally {
            setLoader(false);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds((prev) => prev - 1);
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    setSeconds(59);
                    setMinutes((prev) => prev - 1);
                }
            }
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [minutes, seconds]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center justify-center w-full max-w-screen-xl p-4 sm:px-6 sm:py-4 lg:px-8 lg:py-4">
                <div className="text-center text-2xl font-semibold">
                    Verify Your Account!
                </div>
                <div className="text-center text-sm mb-8">
                    <span>Enter the 6-digit code sent to your email.</span>
                </div>
                <form className="w-full md:max-w-sm" onSubmit={handleSubmit}>
                    <div className="flex justify-center">
                        <InputOTP
                            maxLength={6}
                            value={verification_code}
                            onChange={(value) => setOTP(value)}
                            ref={otpRef}
                            pattern={REGEXP_ONLY_DIGITS}>
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                    </div>
                    <div className="flex justify-center">
                        <Button
                            type="submit"
                            className="w-full sm:w-[73%] text-white mt-4"
                            disabled={loader}>
                            {loader ? (
                                <Loader className="animate-spin" />
                            ) : (
                                "Verify"
                            )}
                        </Button>
                    </div>
                    <div className="flex justify-center mt-2">
                        <div className="w-full sm:w-[73%] flex justify-between text-sm">
                            <div className="font-medium">
                                {minutes < 10 ? `0${minutes}` : minutes}:
                                {seconds < 10 ? `0${seconds}` : seconds}
                            </div>

                            <div>
                                <button
                                    type="button"
                                    className="border-none font-medium hover:underline text-green-500 disabled:text-slate-300 disabled:cursor-not-allowed"
                                    disabled={seconds > 0 || minutes > 0}
                                    onClick={resendOTP}>
                                    Resend OTP
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Page;
