import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from '../schemas/message.schema';
import { SendMessageDto, MessageResponseDto } from '../dtos/message.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async saveMessage(
    userId: string,
    sendMessageDto: SendMessageDto,
  ): Promise<MessageResponseDto> {
    // Crear el mensaje
    const message = new this.messageModel({
      user: userId,
      content: sendMessageDto.content,
    });

    const savedMessage = await message.save();
    
    // Poblar con información del usuario
    await savedMessage.populate('user', 'username name');

    return this.formatMessageResponse(savedMessage);
  }

  async getRecentMessages(limit: number = 10): Promise<MessageResponseDto[]> {
    try {
      const messages = await this.messageModel
        .find()
        .populate('user', 'username name')
        .sort({ createdAt: -1 })
        .limit(limit)
        .exec();

      return messages
        .reverse() // Para mostrar los más antiguos primero
        .filter(message => message && message.user) // Filtrar mensajes sin usuario
        .map(message => this.formatMessageResponse(message));
    } catch (error) {
      console.error('Error in getRecentMessages:', error);
      return [];
    }
  }

  private formatMessageResponse(message: MessageDocument): MessageResponseDto {
    // Manejar el caso cuando el usuario es null o no existe
    if (!message.user) {
      return {
        id: message._id.toString(),
        content: message.content,
        user: {
          id: 'deleted',
          username: 'Usuario eliminado',
          name: 'Usuario eliminado',
        },
        createdAt: message.createdAt,
      };
    }

    // Si el usuario está populado (es un objeto con _id)
    const userObj = message.user as any;
    if (typeof userObj === 'object' && userObj._id) {
      return {
        id: message._id.toString(),
        content: message.content,
        user: {
          id: userObj._id.toString(),
          username: userObj.username || 'Sin username',
          name: userObj.name || userObj.username || 'Sin nombre',
        },
        createdAt: message.createdAt,
      };
    }

    // Si el usuario es solo un ID (no está populado)
    return {
      id: message._id.toString(),
      content: message.content,
      user: {
        id: message.user.toString(),
        username: 'Usuario',
        name: 'Usuario',
      },
      createdAt: message.createdAt,
    };
  }
}