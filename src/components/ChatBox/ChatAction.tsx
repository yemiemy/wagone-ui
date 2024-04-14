"use client";
import {
    CameraIcon,
    MicIcon,
    PaperclipIcon,
    SendHorizonalIcon,
    SmileIcon,
} from "lucide-react";
import React from "react";

type Props = {
    handleInputChange: any;
    message: string;
    handleSendChat: any;
};

const ChatAction = ({ handleInputChange, message, handleSendChat }: Props) => {
    return (
        <div className="flex items-center gap-4 px-[13px] py-[13px] bg-[#F0F2F5] h-[90px]">
            <a className="" href="/">
                <SmileIcon color="#54656F" />
            </a>
            <a href="/">
                <PaperclipIcon color="#54656F" />
            </a>
            <div className="flex justify-between items-center gap-4 w-full">
                <div className="flex gap-7 ps-5 items-center w-full h-[50px] bg-white rounded-md">
                    <CameraIcon color="#54656F" />
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className="w-full h-full p-2 rounded-md appearance-none"
                        onChange={(e) => handleInputChange(e)}
                        value={message}
                    />
                </div>
                <button
                    className="h-full rounded-md p-2 bg-[#25D366] text-center"
                    onClick={(e) => handleSendChat(e)}>
                    <SendHorizonalIcon stroke="#000" strokeWidth={1} />
                </button>
                <a href="/">
                    <MicIcon color="#54656F" />
                </a>
            </div>
        </div>
    );
};

export default ChatAction;
