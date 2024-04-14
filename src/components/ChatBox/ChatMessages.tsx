import React from "react";
import ChatMessageCard from "./ChatMessageCard";
import { Message } from "@/lib/models/chat";
import { cn } from "@/lib/utils";
import { MessagesSquareIcon } from "lucide-react";
import ChatLanding from "./ChatLanding";

type Props = {
    messages: Message[];
};

const ChatMessages = ({ messages }: Props) => {
    return (
        <div
            className={cn(
                "flex-1 flex flex-col pb-4 px-[13px] overflow-y-auto chat-bg",
                {
                    "items-center justify-center": messages.length < 1,
                }
            )}>
            {/* <ChatMessageCard
                message={
                    "Body how far na? Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?Body how far na?"
                }
                timestamp={new Date().toISOString()}
                sender={false}
            />

            <ChatMessageCard
                message={
                    "Body how far na?  na?Body how far na?Body how far na?Body how far body Body ho na?"
                }
                timestamp={new Date().toISOString()}
                sender={true}
            />

            <ChatMessageCard
                message={"Body how far na?"}
                timestamp={new Date().toISOString()}
                sender={true}
            />

            <ChatMessageCard
                message={"Evening breeze"}
                timestamp={new Date().toISOString()}
                sender={false}
            /> */}
            {messages.length > 0 ? (
                messages.map((message, index) => (
                    <ChatMessageCard
                        message={message.content}
                        timestamp={message.created_at}
                        sender={
                            message.sender ===
                            "7074ab25-5507-40e9-bcb0-11f696b9a58d"
                        }
                        key={index}
                    />
                ))
            ) : (
                <ChatLanding />
            )}
        </div>
    );
};

export default ChatMessages;
