import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import {
    EllipsisVerticalIcon,
    PhoneIcon,
    Search,
    VideoIcon,
} from "lucide-react";

type Props = {};

const ChatboxHeader = (props: Props) => {
    return (
        <div className="w-full h-[74px] flex justify-between items-center px-[13px] py-[13px] bg-[#F0F2F5]">
            <div className="flex gap-2 justify-center items-center ">
                <div className="border-2 border-white rounded-full h-[50px] w-[50px] p-1">
                    <Avatar className="h-full w-full">
                        <AvatarImage src="/avatar-2.png" alt="@user-main" />
                        <AvatarFallback>AT</AvatarFallback>
                    </Avatar>
                </div>
                <h1 className="text-[#6B7C85]">Daniel Kalio</h1>
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
