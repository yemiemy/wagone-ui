import React from "react";
import ChatMessageCard from "./ChatMessageCard";
import { Chat, Message } from "@/lib/models/chat";
import { cn } from "@/lib/utils";
import ChatLanding from "./ChatLanding";
import NoChatMessages from "./NoChatMessages";
import { User } from "@/lib/models/user";

type Props = {
    user: User;
    chat: Chat | undefined;
    messages: Message[];
};

const ChatMessages = ({ user, chat, messages }: Props) => {
    console.log(messages, user.id);
    return (
        <div
            className={cn(
                "flex-1 flex flex-col pb-4 px-[13px] overflow-y-auto chat-bg",
                {
                    "items-center justify-center": !chat || messages.length < 1,
                }
            )}>
            {chat ? (
                messages.length > 0 ? (
                    messages.map((message, index) => (
                        <ChatMessageCard
                            message={message.content}
                            timestamp={message.created_at}
                            sender={message.sender === user.id}
                            key={index}
                        />
                    ))
                ) : (
                    <NoChatMessages />
                )
            ) : (
                <ChatLanding />
            )}
        </div>
    );
};

export default ChatMessages;
