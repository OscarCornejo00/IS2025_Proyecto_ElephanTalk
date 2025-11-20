import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

// DTOs for chat messages
export class SendMessageDto {
  @IsNotEmpty({ message: 'El contenido del mensaje no puede estar vacío' })
  @IsString({ message: 'El contenido debe ser texto' })
  @MaxLength(500, { message: 'El mensaje no puede exceder 500 caracteres' })
  content: string;
}
// DTO for the response of a message
// This DTO is used to format the message data returned by the API
export class MessageResponseDto {
  id: string;
  content: string;
  user: {
    id: string;
    username: string;
    name: string;
  };
  createdAt: Date;
}