import React from "react";

type Props = {};

const NoChatMessages = (props: Props) => {
    return (
        <div className="flex flex-col gap-2 items-center">
            {/* <span>
                <ChatSvg />
            </span> */}
            <span className="text-[#6B7C85] flex flex-col items-center">
                <div className="mt-10">
                    <h1 className="text-3xl">No messages yet.</h1>
                </div>
                <div className="mt-1">Send a message to kickstart the chat</div>
            </span>
        </div>
    );
};

export default NoChatMessages;
