"use client";
import React from "react";
import ContactsSidebar from "../ContactsSidebar/ContactsSidebar";
import ChatBox from "../ChatBox/ChatBox";
import axios from "@/lib/api/axios";
import { toast } from "sonner";
import { Chat } from "@/lib/models/chat";
import {
    deafultUser,
    defaultContact,
    User,
    UserContact,
} from "@/lib/models/user";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

type Props = {};

const ChatLayout = (props: Props) => {
    const router = useRouter();
    const auth = Cookies.get("__token");
    const [user, setUser] = React.useState<User>(deafultUser);
    const [contact, setContact] = React.useState<UserContact>(defaultContact);
    const [chat, setChat] = React.useState<Chat>();
    const [showContactsLoader, setShowContactsLoader] =
        React.useState<boolean>(false);
    const [errMsg, setErrMsg] = React.useState({
        detail: "",
    });

    const getUser = React.useCallback(async () => {
        if (auth) {
            try {
                const response = await axios.get("/account/details/", {
                    headers: {
                        Authorization: `Token ${auth}`,
                    },
                });
                const data = await response.data;
                setUser(data);
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
            }
        }
    }, [auth]);

    const getContacts = React.useCallback(async () => {
        setShowContactsLoader(true);
        try {
            const response = await axios.get("/account/contacts/", {
                headers: {
                    Authorization: `Token ${auth}`,
                },
            });
            const data = await response.data;
            console.log(data);
            setContact(data);
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
    }, [auth]);

    React.useEffect(() => {
        if (!auth) {
            router.replace("/auth/login");
        }
    }, [router, auth]);

    React.useEffect(() => {
        getUser();
        getContacts();
    }, [getContacts, getUser]);

    const handleChatNavigation = async (contact: User) => {
        // create or get chat with this contact
        try {
            let response = await axios.post(
                "/chat/",
                JSON.stringify({
                    user1_id: user.id,
                    user2_id: contact.id,
                }),
                {
                    headers: {
                        Authorization: `Token ${auth}`,
                    },
                }
            );

            let data = await response.data;
            console.log("chat created", data, user.id);
            setChat(data);
        } catch (err: any) {}
    };

    return (
        <>
            <ContactsSidebar
                // chat={chat}
                contacts={contact.contacts}
                showContactsLoader={showContactsLoader}
                handleChatNavigation={handleChatNavigation}
            />
            <ChatBox chat={chat} user={user} />
        </>
    );
};

export default ChatLayout;
