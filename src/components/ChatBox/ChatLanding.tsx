import React from "react";
import ChatSvg from "./ChatSvg";

type Props = {};

const ChatLanding = (props: Props) => {
    return (
        <div className="flex flex-col gap-2 items-center">
            <span>
                <ChatSvg />
            </span>
            <span className="text-[#6B7C85] flex flex-col items-center">
                <div className="mt-10">
                    <h1 className="text-3xl">WagOne</h1>
                </div>
                <div className="mt-1">Click a contact to start chatting</div>
            </span>
        </div>
    );
};

export default ChatLanding;
