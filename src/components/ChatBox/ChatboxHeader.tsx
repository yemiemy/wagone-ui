"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import {
    EllipsisVerticalIcon,
    PhoneIcon,
    Search,
    VideoIcon,
} from "lucide-react";
import { Chat } from "@/lib/models/chat";
import { deafultUser, User } from "@/lib/models/user";

type Props = {
    user: User;
    chat: Chat | undefined;
};

const ChatboxHeader = ({ user, chat }: Props) => {
    const [chatUser, setChatUser] = React.useState<User>(deafultUser);

    React.useEffect(() => {
        if (chat) {
            if (chat.user1.id === user.id) {
                setChatUser(chat.user2);
            } else {
                setChatUser(chat.user1);
            }
        }
    }, [chat, user]);
    return (
        <div className="w-full h-[74px] flex justify-between items-center px-[13px] py-[13px] bg-[#F0F2F5]">
            <div className="flex gap-2 justify-center items-center ">
                <div className="border-2 border-white rounded-full h-[50px] w-[50px] p-1">
                    <Avatar className="h-full w-full">
                        <AvatarImage
                            src={chatUser.avatar ? chatUser.avatar : ""}
                            alt={chatUser.first_name}
                        />
                        <AvatarFallback>
                            {chatUser.first_name.charAt(0) +
                                chatUser.last_name.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                </div>
                <h1 className="text-[#6B7C85]">
                    {chatUser.first_name + " " + chatUser.last_name}
                </h1>
            </div>

            <div className="flex gap-4 items-center">
                <PhoneIcon color="#54656F" />
                <VideoIcon color="#54656F" />
                <Search color="#54656F" />
                <EllipsisVerticalIcon color="#54656F" />
            </div>
        </div>
    );
};

export default ChatboxHeader;
