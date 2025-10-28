import { Inject, Injectable } from "@nestjs/common";

export interface Message {
    to: string;
    from: string;
    text: string;
    timestamp: Date;
}

@Injectable()
export class ChatService {
    private messages: Message[] = [];

    addMessage(to: string, from:string, text: string): Message {
        const message: Message = {
            to,
            from,
            text,
            timestamp: new Date(),
        };
        this.messages.push(message);
        return message;
    }

    getMessagesBetween(userA: string, userB: string): Message[]{
        return this.messages.filter(
            (msg) =>
            (msg.from === userA && msg.to === userB) ||
            (msg.from === userB && msg.to === userA)
        );
    }

    getAllMessages(): Message[] {
        return this.messages;
    }

    clearMessages(){
        this.messages = [];
    }
}