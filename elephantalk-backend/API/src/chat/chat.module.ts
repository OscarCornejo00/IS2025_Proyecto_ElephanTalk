import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './services/chat.service';
import { ChatController } from './controllers/chat.controller';
import { Message, MessageSchema } from './schemas/message.schema';
import { WsJwtGuard } from './guards/ws-jwt.guards';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema }
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'mi-secreto-jwt',
      signOptions: { expiresIn: '24h' },
    }),
    UsersModule, // Para usar UsersService
  ],
  controllers: [ChatController],
  providers: [
    ChatGateway,
    ChatService,
    WsJwtGuard,
  ],
  exports: [ChatService], // Por si necesitas usarlo en otros módulos
})
export class ChatModule {}