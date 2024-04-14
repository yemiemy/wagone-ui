import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn, format12HTimestamp } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { User } from "@/lib/models/user";

type ContactCardProps = {
    contact: User;
    name: string;
    image_url: string;
    message: string;
    number_of_unread_msgs: number;
    has_unviewed_status: boolean;
    timestamp: string;
    handleChatNavigation: any;
};

const ContactCard = (props: ContactCardProps) => {
    return (
        <div
            className="flex h-[72px] cursor-pointer animate-in ease-in slide-in-from-top-1"
            onClick={(e) => props.handleChatNavigation(props.contact)}>
            <div className="flex">
                <div className="flex rounded-full pr-[15px] pl-[13px] items-center">
                    <Avatar
                        className={cn("w-[49px] h-[49px]", {
                            "border border-[#25D366] p-1":
                                props.has_unviewed_status,
                        })}>
                        <AvatarImage src={props.image_url} alt={props.name} />
                        <AvatarFallback>AT</AvatarFallback>
                    </Avatar>
                </div>
            </div>

            <div className="flex-grow flex flex-col justify-center border-t pr-[15px]">
                <div className="flex items-center text-left">
                    <div className="flex-grow flex text-left text-[#6B7C85] text-base font-medium overflow-hidden break-words">
                        <span
                            className="flex-grow truncate inline-block relative visible w-[100px] lg:w-[200px] 3xl:w-[350px]"
                            title={
                                props.name +
                                "More name text cause why not we go again"
                            }>
                            {props.name} More name text cause why not we go
                            again
                        </span>
                    </div>
                    <div className="text-[#6B7C85] mt-[3px] ml-[6px] truncate text-xs">
                        <span className="capitalize">
                            {format12HTimestamp(props.timestamp)}
                        </span>
                    </div>
                </div>
                <div className="flex items-center mt-[2px] font-normal text-[13px] min-h-[20px]">
                    <div className="flex-grow font-medium truncate text-sm">
                        <span className="flex items-start">
                            <span className="flex-grow text-[#54656F] relative w-[100px] lg:w-[200px] 3xl:w-[350px] truncate inline-block">
                                {props.message} So many liong words here a s
                                well so we test if its good!
                            </span>
                        </span>
                    </div>

                    {props.number_of_unread_msgs === 0 && (
                        <Badge className="bg-[#25D366] text-white w-fit px-1 py-0.5">
                            {props.number_of_unread_msgs}
                        </Badge>
                    )}
                </div>
            </div>
            {/* <Separator className="my-4" /> */}
        </div>
    );
};

export default ContactCard;
