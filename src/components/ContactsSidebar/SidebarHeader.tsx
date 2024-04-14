import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircleDashedIcon, EllipsisVerticalIcon } from "lucide-react";
import Image from "next/image";

const SidebarHeader = () => {
    return (
        <div className="w-full h-[74px] flex justify-between items-center pl-[13px] pr-[15px] py-[13px] bg-[#F0F2F5]">
            <div className="flex justify-center items-center border-2 border-white rounded-full h-[50px] w-[50px]">
                <Avatar className="h-full w-full">
                    <AvatarImage src="/avatar-1.png" alt="@user-main" />
                    <AvatarFallback>AT</AvatarFallback>
                </Avatar>
            </div>

            <div className="flex gap-4 items-center">
                <Image
                    src="/groups_icon.svg"
                    alt="groups_icon"
                    width={24}
                    height={24}
                    className="text-[#54656F]"
                />
                <CircleDashedIcon color="#54656F" />
                <Image
                    src="/chat_icon.svg"
                    alt="chat_icon"
                    width={24}
                    height={24}
                />
                <EllipsisVerticalIcon color="#54656F" />
            </div>
        </div>
    );
};

export default SidebarHeader;
