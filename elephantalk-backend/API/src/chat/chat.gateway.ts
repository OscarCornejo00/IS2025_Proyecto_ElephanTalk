import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { ChatService } from './services/chat.service';
import { SendMessageDto } from './dtos/message.dto';
import { WsJwtGuard } from './guards/ws-jwt.guards'; //TODO: Asegúrate que este documento importado funciona para este contexto.

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(ChatGateway.name);
  private connectedUsers = new Map<string, { socketId: string; user: any }>();

  constructor(private chatService: ChatService) {}

  async handleConnection(client: Socket) {
    try {
      // Verificar autenticación manualmente en la conexión
      const token = this.extractTokenFromHandshake(client);
      if (!token) {
        this.logger.warn(`Cliente ${client.id} rechazado: sin token`);
        client.disconnect();
        return;
      }

      this.logger.log(`Cliente conectado: ${client.id}`);
      
      // Enviar mensajes recientes al cliente que se conecta
      const recentMessages = await this.chatService.getRecentMessages(10);
      client.emit('recentMessages', recentMessages);

    } catch (error) {
      this.logger.error(`Error en conexión: ${error.message}`);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    // Remover usuario de la lista de conectados
    for (const [userId, data] of this.connectedUsers.entries()) {
      if (data.socketId === client.id) {
        this.connectedUsers.delete(userId);
        this.logger.log(`Usuario ${data.user.username} desconectado`);
        break;
      }
    }
    
    this.logger.log(`Cliente desconectado: ${client.id}`);
  }

  @UseGuards(WsJwtGuard)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @SubscribeMessage('sendMessage')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() sendMessageDto: SendMessageDto,
  ) {
    try {
      const user = client.data.user;
      
      if (!user) {
        client.emit('error', { message: 'Usuario no autenticado' });
        return;
      }

      // Guardar mensaje en la base de datos
      const savedMessage = await this.chatService.saveMessage(
        user.id,
        sendMessageDto,
      );

      this.logger.log(`Mensaje de ${user.username}: ${sendMessageDto.content}`);

       // EMITE a todos, incluido quien lo envió
      this.server.emit('newMessage', savedMessage);
      
      // Emitir a todos los clientes conectados (sin incluir el remitente).
      //client.broadcast.emit('newMessage', savedMessage );
      // Registrar usuario conectado
      this.connectedUsers.set(user.id, {
        socketId: client.id,
        user: user,
      });

    } catch (error) {
      this.logger.error(`Error al procesar mensaje: ${error.message}`);
      client.emit('error', { 
        message: 'Error al enviar mensaje',
        details: error.message 
      });
    }
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('getRecentMessages')
  async handleGetRecentMessages(@ConnectedSocket() client: Socket) {
    try {
      const recentMessages = await this.chatService.getRecentMessages(50);
      client.emit('recentMessages', recentMessages);
    } catch (error) {
      this.logger.error(`Error al obtener mensajes: ${error.message}`);
      client.emit('error', { message: 'Error al cargar mensajes' });
    }
  }

  private extractTokenFromHandshake(client: Socket): string | null {
    const tokenFromQuery = client.handshake.query.token as string;
    if (tokenFromQuery) return tokenFromQuery;

    const authHeader = client.handshake.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }

    const tokenFromAuth = client.handshake.auth?.token;
    if (tokenFromAuth) return tokenFromAuth;

    return null;
  }
}