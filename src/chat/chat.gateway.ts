// src/chat/chat.gateway.ts
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  private clients = new Map<string, Socket>();

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket) {
    const user = client.handshake.query.user as string;
    if (user) {
      this.clients.set(user, client);
      this.broadcastOnlineUsers();
    }
  }

  handleDisconnect(client: Socket) {
    for (const [user, sock] of this.clients.entries()) {
      if (sock.id === client.id) {
        this.clients.delete(user);
        this.broadcastOnlineUsers();
      }
    }
  }

  private broadcastOnlineUsers(){
    const onlineUsers = Array.from(this.clients.keys());
    this.server.emit("onlineUsers", onlineUsers);
  }

  @SubscribeMessage("getOnlineUsers")
  handleGetOnlineUsers(@ConnectedSocket() client: Socket){
    const onlineUsers = Array.from(this.clients.keys());
    client.emit("onlineUsers", onlineUsers);
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() payload: { from: string; to: string; text: string },
    @ConnectedSocket() client: Socket,
  ) {
    const message = await this.chatService.addMessage(payload.from, payload.to, payload.text);

    const toSocket = this.clients.get(payload.to);
    const fromSocket = this.clients.get(payload.from);

    if (toSocket) toSocket.emit('message', message);
    if (fromSocket) fromSocket.emit('message', message);
  }

  @SubscribeMessage('getMessages')
  async handleGetMessages(
    @MessageBody() payload: { user: string; targetUser: string },
    @ConnectedSocket() client: Socket,
  ) {
    const messages = await this.chatService.getMessagesBetween(payload.user, payload.targetUser);
    client.emit('messagesHistory', messages);
  }
}
