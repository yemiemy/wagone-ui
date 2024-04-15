import React from "react";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "../ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

type Props = {
    handleSubmit: any;
    setOTP: any;
    verification_code: string | undefined;
    otpRef: any;
    loader: boolean;
    seconds: number;
    minutes: number;
    resendOTP: any;
};

const OTPForm = (props: Props) => {
    return (
        <form className="w-full md:max-w-sm" onSubmit={props.handleSubmit}>
            <div className="text-sm mb-8">
                <span>Enter the 6-digit code sent to your email.</span>
            </div>
            <div className="flex">
                <InputOTP
                    maxLength={6}
                    value={props.verification_code}
                    onChange={(value) => props.setOTP(value)}
                    ref={props.otpRef}
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
            <div className="flex">
                <Button
                    type="submit"
                    className="w-full sm:w-[73%] text-white mt-4"
                    disabled={props.loader}>
                    {props.loader ? (
                        <Loader className="animate-spin" />
                    ) : (
                        "Verify"
                    )}
                </Button>
            </div>
            <div className="flex mt-2">
                <div className="w-full sm:w-[73%] flex justify-between text-sm">
                    <div className="font-medium">
                        {props.minutes < 10
                            ? `0${props.minutes}`
                            : props.minutes}
                        :
                        {props.seconds < 10
                            ? `0${props.seconds}`
                            : props.seconds}
                    </div>

                    <div>
                        <button
                            type="button"
                            className="border-none font-medium hover:underline text-green-500 disabled:text-slate-300 disabled:cursor-not-allowed"
                            disabled={props.seconds > 0 || props.minutes > 0}
                            onClick={props.resendOTP}>
                            Resend OTP
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default OTPForm;
