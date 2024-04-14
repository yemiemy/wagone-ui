"use client";
import React from "react";
import ContactsSidebar from "../ContactsSidebar/ContactsSidebar";
import ChatBox from "../ChatBox/ChatBox";
import axios from "@/lib/api/axios";
import { toast } from "sonner";
import { Chat } from "@/lib/models/chat";
import { User } from "@/lib/models/user";

type Props = {};

const ChatLayout = (props: Props) => {
    const [contacts, setContacts] = React.useState<User[]>([]);
    const [chat, setChat] = React.useState<Chat>();
    const [showContactsLoader, setShowContactsLoader] =
        React.useState<boolean>(false);
    const [errMsg, setErrMsg] = React.useState({
        detail: "",
    });

    const getContacts = React.useCallback(async () => {
        setShowContactsLoader(true);
        try {
            const response = await axios.get("/account/contacts/", {
                headers: {
                    Authorization:
                        "Token 8bc5cdd45b2b1f1bfe86e4a61bd47ed8f36de6ce",
                },
            });
            const data = await response.data;
            console.log(data);
            setContacts(data);
            toast.success("Contacts fetched successfully.");
        } catch (err: any) {
            if (!err.response) {
                setErrMsg({
                    detail: "No server reponse. Please try again.",
                });
                toast.error("No server reponse. Please try again.");
            } else if (err.response) {
                setErrMsg(err.response.data);
            } else {
                setErrMsg({
                    detail: "Unable to process your request. Please try again.",
                });
            }
        } finally {
            setShowContactsLoader(false);
        }
    }, []);
    React.useEffect(() => {
        getContacts();
    }, [getContacts]);

    const handleChatNavigation = async (contact: User) => {
        // create or get chat with this contact
        try {
            let response = await axios.post(
                "/chat/",
                JSON.stringify({
                    user1_id: "7074ab25-5507-40e9-bcb0-11f696b9a58d",
                    user2_id: "981717b1-1203-46a2-9fc1-9f17505a385a",
                }),
                {
                    headers: {
                        Authorization:
                            "Token 8bc5cdd45b2b1f1bfe86e4a61bd47ed8f36de6ce",
                    },
                }
            );

            let data = await response.data;
            setChat(data);
        } catch (err: any) {}
    };

    return (
        <>
            <ContactsSidebar
                contacts={contacts}
                showContactsLoader={showContactsLoader}
                handleChatNavigation={handleChatNavigation}
            />
            <ChatBox chat={chat} />
        </>
    );
};

export default ChatLayout;
