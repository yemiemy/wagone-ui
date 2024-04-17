import { User } from "./user";

export interface Message {
    id: string;
    sender: string;
    receiver: string;
    chat: string;
    content: string;
    created_at: string;
}

export interface Chat {
    id: string;
    user1: User;
    user2: User;
    messages: Message[];
    created_at: string;
}
