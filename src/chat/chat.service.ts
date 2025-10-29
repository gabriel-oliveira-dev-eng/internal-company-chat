import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ChatMessage } from "./chat.schema";

export interface Message {
    to: string;
    from: string;
    text: string;
    timestamp: Date;
    delivered: boolean;
}

@Injectable()
export class ChatService {
    constructor(
        @InjectModel(ChatMessage.name)
        private readonly messageModel: Model<ChatMessage>,
    ) {}

    // Adiciona mensagem
    async addMessage(from: string, to: string, text: string): Promise<ChatMessage> {
        const newMessage = new this.messageModel({
            from,
            to,
            text,
            delivered: false, // por padrão não entregue
            timestamp: new Date(),
        });
        return newMessage.save();
    }

    // Recupera todas as mensagens entre dois usuários
    async getMessagesBetween(user: string, targetUser: string): Promise<ChatMessage[]> {
        return this.messageModel
            .find({
                $or: [
                    { from: user, to: targetUser },
                    { from: targetUser, to: user },
                ],
            })
            .sort({ timestamp: 1 })
            .exec();
    }

    // Recupera mensagens pendentes (não entregues) para um usuário
    async getPendingMessages(user: string): Promise<ChatMessage[]> {
        return this.messageModel
            .find({ to: user, delivered: false })
            .sort({ timestamp: 1 })
            .exec();
    }

    // Marca uma mensagem como entregue
    async markMessageAsDelivered(messageId: string): Promise<void> {
        await this.messageModel.updateOne(
            { _id: messageId },
            { $set: { delivered: true } },
        );
    }
}
