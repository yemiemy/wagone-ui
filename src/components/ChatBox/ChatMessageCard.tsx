import { cn, format12HTimestamp } from "@/lib/utils";
import React from "react";

type Props = {
    sender: boolean;
    message: string;
    timestamp: string;
};

const ChatMessageCard = (props: Props) => {
    return (
        <div
            className={cn("mt-2 flex", {
                "justify-start": !props.sender,
                "justify-end": props.sender,
            })}>
            <div
                className={cn("p-2 w-fit max-w-[50%] rounded-b-lg", {
                    "bg-[#D9FDD3] rounded-l-lg": props.sender,
                    "bg-white rounded-r-lg": !props.sender,
                })}>
                <div className="w-full flex gap-4 justify-between text-[#111B21]">
                    <p className="">{props.message}</p>
                    <span className="text-xs flex items-end">
                        {format12HTimestamp(props.timestamp)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ChatMessageCard;
