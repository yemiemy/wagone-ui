"use client";
import React from "react";
import ChatboxHeader from "./ChatboxHeader";
import ChatMessages from "./ChatMessages";
import ChatAction from "./ChatAction";
import { Chat, Message } from "@/lib/models/chat";

type ChatBoxProps = {
    chat: Chat | undefined;
};

const ChatBox = ({ chat }: ChatBoxProps) => {
    const [messages, setMessages] = React.useState<Message[]>([]);
    const [newMessage, setNewMessage] = React.useState<string>("");
    const [chatSocket, setChatSocket] = React.useState<WebSocket | null>(null);

    React.useEffect(() => {
        if (chat) {
            setMessages(chat.messages);
        }

        const url = `ws://127.0.0.1:8000/ws/chat/${chat?.id}/`;
        const socket = new WebSocket(url);

        // Handle incoming messages from the WebSocket server
        socket.onmessage = function (event) {
            let data = JSON.parse(event.data);
            console.log("Data:", data);
            setMessages((prevMessages) => [...prevMessages, data.message]);
        };

        socket.onclose = function (e) {
            console.error("Chat socket closed unexpectedly");
        };

        setChatSocket(socket);
    }, [chat]); // Empty dependency array means this effect will run once after initial render

    const handleSendChat = React.useCallback(
        (event: any) => {
            event.preventDefault(); // Prevent the form from submitting

            if (newMessage.trim() === "") {
                return; // Don't send empty messages
            }

            if (!chatSocket || chatSocket.readyState !== WebSocket.OPEN) {
                console.error("WebSocket connection not established.");
                return;
            }

            chatSocket.send(
                JSON.stringify({
                    message: newMessage,
                    username: "admin",
                })
            );
            setNewMessage("");
        },
        [chatSocket, newMessage]
    );

    const handleInputChange = React.useCallback((event: any) => {
        setNewMessage(event.target.value);
    }, []);

    return (
        <div className="flex-1 flex flex-col min-h-screen">
            <ChatboxHeader />
            <ChatMessages messages={messages} />
            <ChatAction
                handleSendChat={handleSendChat}
                message={newMessage}
                handleInputChange={handleInputChange}
            />
        </div>
    );
};

export default ChatBox;
