"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "@/lib/api/axios";
import { InfoIcon, Loader } from "lucide-react";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { DatePicker } from "@/components/ui/DatePicker";

const EMAIL_REGEX =
    /^[a-zA-Z][a-zA-Z0-9-_.]{1,23}@[a-zA-z]{1,23}\.[a-zA-z]{2,23}$/;

function formatDateToYYYYMMDD(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 because getMonth() returns zero-based month index
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

const Page = () => {
    const router = useRouter();

    const [email, setEmail] = React.useState<string>("");
    const [first_name, setFirstName] = React.useState<string>("");
    const [last_name, setLastName] = React.useState<string>("");
    const [validEmail, setValidEmail] = React.useState<boolean>(false);
    const [emailFocus, setEmailFocus] = React.useState<boolean>(false);
    const [date, setDate] = React.useState<Date>();

    const [loader, setLoader] = React.useState<boolean>(false);

    React.useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email]);

    React.useEffect(() => {
        if (Cookies.get("__token")) {
            router.replace("/");
        }
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoader(true);

        const registerForm: HTMLFormElement | any = e.target;
        const registerFormData = new FormData(registerForm);

        // if button enabled with JS hack
        const v1 = EMAIL_REGEX.test(email);
        if (!v1) {
            toast.error("Invalid entry for email");
            setLoader(false);
            return;
        }

        try {
            if (date) {
                registerFormData.append(
                    "birthday",
                    formatDateToYYYYMMDD(date) || ""
                );
            }
            await axios.post("/account/register/", registerFormData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success("Account created successfully!");

            router.push(`/auth/verify?email=${email}`);
        } catch (err: any) {
            console.log(err);
            if (!err.response) {
                toast.error(err.message);
            }
            if (err.response.data) {
                const emailErr = err.response.data?.email;
                const non_field_errors = err.response.data?.non_field_errors;
                if (emailErr) {
                    setValidEmail(false);
                    setEmailFocus(true);
                    toast.error(emailErr[0]);
                }
                if (non_field_errors) {
                    toast.error(non_field_errors[0]);
                }
            }
        } finally {
            setLoader(false);
        }
    };
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
                    <h2>Join today.</h2>
                </div>
                <form className="w-full" onSubmit={handleSubmit}>
                    <div className="md:flex md:gap-2 lg:block lg:gap-0">
                        <Input
                            type="text"
                            required={true}
                            id="first_name"
                            className="mb-2"
                            name="first_name"
                            placeholder="First name"
                            onChange={(e) => setFirstName(e.target.value)}
                            value={first_name}
                        />
                        <Input
                            type="text"
                            required={true}
                            id="last_name"
                            className="mb-2"
                            name="last_name"
                            placeholder="Last name"
                            onChange={(e) => setLastName(e.target.value)}
                            value={last_name}
                        />
                    </div>

                    <Input
                        type="email"
                        required={true}
                        id="email"
                        className={cn("mb-2", {
                            "focus-visible:ring-red-600":
                                !validEmail && email.length > 0,
                        })}
                        name="email"
                        placeholder="Email address here"
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        aria-invalid={validEmail ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                    />
                    <p
                        id="uidnote"
                        className={
                            emailFocus && email && !validEmail
                                ? "relative text-xs items-center flex gap-2 bg-green-100 p-2 rounded-md mb-2"
                                : "hidden"
                        }>
                        <span>
                            <InfoIcon width={12} height={12} />
                        </span>
                        <span>
                            4 to 24 characters.
                            <br />
                            Must begin with a letter.
                            <br />
                            Letters, numbers, underscores, hyphens allowed.{" "}
                            <br />
                            Must have a format similar to
                            &ldquo;youremail@domain.com&rdquo;.
                        </span>
                    </p>
                    <div className="my-5">
                        <h3 className="font-semibold">Date of birth</h3>
                        <p className="text-xs font-light my-2">
                            This will not be shown publicly. Confirm your own
                            age, even if this account is for a business, a pet,
                            or something else.
                        </p>
                        <DatePicker date={date} setDate={setDate} />
                    </div>
                    <Button
                        type="submit"
                        className="w-full text-white"
                        disabled={!validEmail || loader}>
                        {loader ? (
                            <Loader className="animate-spin" />
                        ) : (
                            "Sign Up"
                        )}
                    </Button>
                </form>
                <div className="mt-[40px]">
                    <span className="font-medium">
                        Already have an account?{" "}
                    </span>
                    <Link
                        href="/auth/login"
                        className="hover:underline hover:text-[#25D366]"
                        replace>
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Page;
