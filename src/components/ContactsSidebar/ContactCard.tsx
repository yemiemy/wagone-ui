import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn, format12HTimestamp } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { User } from "@/lib/models/user";

type ContactCardProps = {
    contact: User;
    message: string;
    number_of_unread_msgs: number;
    has_unviewed_status: boolean;
    timestamp: string;
    handleChatNavigation: any;
};

const ContactCard = (props: ContactCardProps) => {
    return (
        <div
            className="flex h-[72px] w-full cursor-pointer animate-in ease-in slide-in-from-top-1 overflow-hidden"
            onClick={(e) => props.handleChatNavigation(props.contact)}>
            <div className="flex">
                <div className="flex rounded-full pr-[15px] pl-[13px] items-center">
                    <div
                        className={cn(
                            "h-[50px] w-[50px] p-1 border-white rounded-full",
                            {
                                "border-2 border-[#25D366] p-1": false,
                            }
                        )}>
                        <Avatar className="h-full w-full">
                            <AvatarImage
                                src={
                                    props.contact.avatar
                                        ? props.contact.avatar
                                        : ""
                                }
                                alt={props.contact.first_name}
                            />
                            <AvatarFallback>
                                {props.contact.first_name.charAt(0) +
                                    props.contact.last_name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </div>

            <div className="flex-grow flex flex-col justify-center truncate border-t pr-[15px]">
                <div className="flex items-center text-left">
                    <div className="text-left text-[#6B7C85] text-lg font-medium overflow-hidden break-words">
                        <h1
                            className="truncate"
                            title={
                                props.contact.first_name +
                                " " +
                                props.contact.last_name +
                                "More name text cause why not we go again"
                            }>
                            {props.contact.first_name +
                                " " +
                                props.contact.last_name}{" "}
                            LOOK name text cause why not we go again
                        </h1>
                    </div>
                    <div className="flex-grow min-w-fit text-[#6B7C85] mt-[3px] ml-[6px] truncate text-base font-medium">
                        <h1 className="capitalize">
                            {format12HTimestamp(props.timestamp)}
                        </h1>
                    </div>
                </div>

                <div className="flex items-center mt-[2px] font-normal text-[13px] min-h-[20px]">
                    <h2 className="font-medium text-sm items-start text-[#54656F] truncate">
                        {props.message} So many liong words here a s well so we
                        test if its good!
                    </h2>

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
