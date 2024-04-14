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
    user1: string;
    user2: string;
    messages: Message[];
    created_at: string;
}
