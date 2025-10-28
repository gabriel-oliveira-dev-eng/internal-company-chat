import { Inject, Injectable } from "@nestjs/common";

export interface Message {
    user: string;
    text: string;
    timestamp: Date;
}

@Injectable()
export class ChatService {
    private messages: Message[] = [];

    addMessage(user: string, text: string): Message {
        const message: Message = {
            user,
            text,
            timestamp: new Date(),
        };
        this.messages.push(message);
        return message;
    }

    getAllMessages(): Message[] {
        return this.messages;
    }

    clearMessages(){
        this.messages = [];
    }
}