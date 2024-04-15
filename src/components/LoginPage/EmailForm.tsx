import React from "react";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import Link from "next/link";
import { Input } from "../ui/input";

type Props = {
    handleSubmit: any;
    setUser: any;
    user: string;
    emailRef: any;
    loader: boolean;
};

const EmailForm = (props: Props) => {
    return (
        <div>
            <form className="w-full" onSubmit={props.handleSubmit}>
                <Input
                    type="email"
                    required={true}
                    id="email"
                    className="mb-2"
                    name="email"
                    placeholder="Email address here"
                    autoComplete="off"
                    onChange={(e) => props.setUser(e.target.value)}
                    value={props.user}
                    ref={props.emailRef}
                />
                <Button
                    type="submit"
                    className="w-full text-white"
                    disabled={props.loader}>
                    {props.loader ? (
                        <Loader className="animate-spin" />
                    ) : (
                        "Sign in"
                    )}
                </Button>
            </form>
            <div className="mt-[40px]">
                <span className="font-medium">
                    Don&lsquo;t have an account?{" "}
                </span>
                <Link
                    href="/auth/signup"
                    className="hover:underline hover:text-[#25D366]"
                    replace>
                    Sign up
                </Link>
            </div>
        </div>
    );
};

export default EmailForm;
