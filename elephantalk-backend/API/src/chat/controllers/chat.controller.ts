// src/chat/controllers/chat.controller.ts
import { Controller, Get, Post, UseGuards, Query, Body, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiQuery, ApiBody, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { ChatService } from '../services/chat.service';
import { SendMessageDto } from '../dtos/message.dto';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get('messages')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obtener mensajes recientes' })
  @ApiQuery({ name: 'limit', required: false, description: 'Número de mensajes (default: 50)' })
  async getMessages(@Query('limit') limit?: string) {
    const messageLimit = limit ? parseInt(limit) : 50;
    
    return {
      success: true,
      data: await this.chatService.getRecentMessages(messageLimit),
    };
  }

  @Post('messages')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Enviar un nuevo mensaje' })
  @ApiBody({ type: SendMessageDto })
  async sendMessage(
    @Body() sendMessageDto: SendMessageDto, 
    @Req() req: any
  ) {
    try {
      // Obtener el ID del usuario del token JWT
      const userId = req.user._id || req.user.id || req.user.userId;
      
      // Guardar el mensaje
      const message = await this.chatService.saveMessage(userId, sendMessageDto);
      
      return {
        success: true,
        data: message,
        message: 'Mensaje enviado correctamente'
      };
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      return {
        success: false,
        error: error.message || 'Error al enviar el mensaje',
        message: 'No se pudo enviar el mensaje'
      };
    }
  }

  @Get('health')
  @ApiOperation({ summary: 'Verificar estado del servicio' })
  getHealth() {
    return {
      success: true,
      message: 'Chat service is running',
      timestamp: new Date(),
    };
  }
}