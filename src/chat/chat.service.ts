import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ChatMessage } from "./chat.schema";
import { timestamp } from "rxjs";

export interface Message {
    to: string;
    from: string;
    text: string;
    timestamp: Date;
}

@Injectable()
export class ChatService {
    constructor(
        @InjectModel(ChatMessage.name)
        private readonly messageModel: Model<ChatMessage>
    ){}

    async addMessage(from: string, to: string, text: string): Promise<ChatMessage>{
        const newMessage = new this.messageModel({from, to, text});
        return newMessage.save()
    }

    async getMessagesBetween(user: string, targetUser:string): Promise<ChatMessage[]>{
        return this.messageModel
        .find({
            $or: [
                {from: user, to: targetUser},
                {from: targetUser, to: user},
            ]
        })
        .sort({timestamp: 1})
        .exec();
    }
}