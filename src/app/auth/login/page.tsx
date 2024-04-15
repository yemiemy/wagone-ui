"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "@/lib/api/axios";
import { Loader } from "lucide-react";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import EmailForm from "@/components/LoginPage/EmailForm";
import OTPForm from "@/components/LoginPage/OTPForm";

type Props = {};

const Page = (props: Props) => {
    const router = useRouter();
    const nextUrl = useSearchParams().get("next");

    const emailRef = React.useRef<HTMLInputElement>(null);
    const otpRef = React.useRef<HTMLInputElement>(null);

    const [user, setUser] = React.useState<string>("");
    const [verification_code, setOTP] = React.useState<string>();

    const [loader, setLoader] = React.useState<boolean>(false);
    const [showEmailForm, setShowEmailForm] = React.useState<boolean>(true);

    const [minutes, setMinutes] = React.useState<number>(1);
    const [seconds, setSeconds] = React.useState<number>(30);

    React.useEffect(() => {
        emailRef.current?.focus();
    }, []);

    React.useEffect(() => {
        if (Cookies.get("__token")) {
            router.replace("/");
        }
    }, [router]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoader(true);
        try {
            await axios.post(
                "/account/login/",
                JSON.stringify({
                    username: user,
                })
            );

            toast.success("OTP has been sent to your email.");
            setShowEmailForm(false);
            otpRef.current?.focus();

            // Redirect user back to the original URL if available
        } catch (err: any) {
            console.log(err);
            if (err.response) {
                if (err.response.data.non_field_errors)
                    toast.error(err.response.data.non_field_errors[0]);
                else if (err.response.data.detail)
                    toast.error(err.response.data.detail);
            } else {
                toast.error(err.message);
            }
        } finally {
            setLoader(false);
        }
    };

    const handleOTPSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoader(true);

        try {
            const response = await axios.post(
                "/account/verify/",
                JSON.stringify({
                    email: user,
                    verification_code,
                })
            );
            const data = await response.data;
            Cookies.set("__token", data.token, {
                expires: 100,
            });
            toast.success("Welcome back!");
            if (nextUrl) {
                router.push(nextUrl);
            } else {
                router.push("/");
            }
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
                    email: user,
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

    React.useEffect(() => {
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
        <div className="flex flex-col p-6 lg:p-0 min-h-screen lg:flex-row xl:mx-auto xl:max-w-screen-lg 2xl:max-w-screen-xl">
            <div className="flex md:flex-col md:justify-center">
                <div className="lg:p-8 lg:w-[500px]">
                    <Image
                        className="w-[50px] h-[50px] lg:w-full lg:h-full"
                        src="/WagOne-Chat-Icon-Logo-no-bg.png"
                        alt="WagOne Icon"
                        width={500}
                        height={500}
                        priority
                    />
                </div>
            </div>
            <div className="flex flex-col lg:justify-center lg:pr-8 w-full">
                <div className="my-[40px] md:mb-4 text-5xl font-bold">
                    <h1 className="break-words">Happening now</h1>
                </div>
                <div className="mb-[20px] md:mb-4 text-2xl font-bold">
                    <h2>Welcome back.</h2>
                </div>
                {showEmailForm ? (
                    <EmailForm
                        emailRef={emailRef}
                        user={user}
                        setUser={setUser}
                        handleSubmit={handleSubmit}
                        loader={loader}
                    />
                ) : (
                    <OTPForm
                        otpRef={otpRef}
                        handleSubmit={handleOTPSubmit}
                        loader={loader}
                        minutes={minutes}
                        seconds={seconds}
                        resendOTP={resendOTP}
                        setOTP={setOTP}
                        verification_code={verification_code}
                    />
                )}
            </div>
        </div>
    );
};

export default Page;
