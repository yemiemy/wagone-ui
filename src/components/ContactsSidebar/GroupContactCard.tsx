import React from "react";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn, format12HTimestamp } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Users2 } from "lucide-react";

type GroupContactCardProps = {
    name: string;
    image_url: string;
    message: string;
    number_of_unread_msgs: number;
    has_unviewed_status: boolean;
    timestamp: string;
};

const GroupContactCard = (props: GroupContactCardProps) => {
    return (
        <div className="flex gap-4">
            <div
                className={cn(
                    "flex items-center justify-center border-2 rounded-full h-[50px] w-[50px] p-1 bg-[#F0F2F5]"
                )}>
                <Avatar className="h-[98%] w-[98%] bg-[#F0F2F5] flex items-center justify-center">
                    {props.image_url.length > 0 ? (
                        <AvatarImage src={props.image_url} alt={props.name} />
                    ) : (
                        <Users2 color="#54656F" />
                    )}
                </Avatar>
            </div>
            <div className="flex-1">
                <div className="flex gap-4 justify-between">
                    <div className="">
                        <h1 className="text-[#6B7C85] font-semibold text-xl w-[100px] lg:w-[200px] truncate">
                            {props.name}
                        </h1>
                        <p
                            className="text-[#54656F] font-medium text-base w-[100px] lg:w-[200px] truncate"
                            title={props.message}>
                            {props.message}
                        </p>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[#6B7C85] font-medium">
                            {format12HTimestamp(props.timestamp)}
                        </span>
                        {props.number_of_unread_msgs > 0 && (
                            <Badge className="bg-[#25D366] text-white w-fit px-1 py-0.5">
                                {props.number_of_unread_msgs}
                            </Badge>
                        )}
                    </div>
                </div>
                <Separator className="my-4" />
            </div>
        </div>
    );
};

export default GroupContactCard;
