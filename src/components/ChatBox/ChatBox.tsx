"use client";
import React from "react";
import ChatboxHeader from "./ChatboxHeader";
import ChatMessages from "./ChatMessages";
import ChatAction from "./ChatAction";
import { Chat, Message } from "@/lib/models/chat";
import { User } from "@/lib/models/user";

type ChatBoxProps = {
    user: User;
    chat: Chat | undefined;
};

const ChatBox = ({ user, chat }: ChatBoxProps) => {
    const [messages, setMessages] = React.useState<Message[]>([]);
    const [newMessage, setNewMessage] = React.useState<string>("");
    const [chatSocket, setChatSocket] = React.useState<WebSocket | null>(null);

    const setUpSocket = React.useCallback(() => {
        if (chat) {
            setMessages(chat.messages);

            const url = `ws://127.0.0.1:8000/ws/chat/${chat?.id}/`;
            const socket = new WebSocket(url);

            // Handle incoming messages from the WebSocket server
            socket.onmessage = function (event) {
                let data = JSON.parse(event.data);
                console.log("Data incoming from backend:", data);
                setMessages(data);
            };

            socket.onclose = function (e) {
                console.error("Chat socket closed unexpectedly");
            };

            setChatSocket(socket);
        }
    }, [chat]);

    React.useEffect(() => {
        setUpSocket();
    }, [setUpSocket]);

    const handleSendChat = (event: any) => {
        event.preventDefault(); // Prevent the form from submitting
        console.log("How many times is this being called?");

        if (newMessage.trim() === "") {
            return; // Don't send empty messages
        }

        if (!chatSocket || chatSocket.readyState !== WebSocket.OPEN) {
            console.error("WebSocket connection not established.");
            return;
        }

        console.log(chatSocket);

        chatSocket.send(
            JSON.stringify({
                message: newMessage,
                user_id: user.id,
            })
        );
        setNewMessage("");
    };

    const handleInputChange = React.useCallback((event: any) => {
        setNewMessage(event.target.value);
    }, []);

    return (
        <div className="flex-1 flex flex-col min-h-screen">
            <ChatboxHeader user={user} chat={chat} />
            <ChatMessages chat={chat} messages={messages} user={user} />
            <ChatAction
                handleSendChat={handleSendChat}
                message={newMessage}
                handleInputChange={handleInputChange}
            />
        </div>
    );
};

export default ChatBox;
