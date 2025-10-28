import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ChatService } from "./chat.service";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage("message")
  handleMessage(
    @MessageBody() payload: { user: string; text: string },
    @ConnectedSocket() client: Socket
  ) {
    const message = this.chatService.addMessage(payload.user, payload.text);

    this.server.emit("message", message);
  }

  @SubscribeMessage("getMessages")
  handleGetMessages(@ConnectedSocket() client: Socket) {
    const messages = this.chatService.getAllMessages();

    client.emit("messagesHistory", messages);
  }
}
