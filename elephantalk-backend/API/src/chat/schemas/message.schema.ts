import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MessageDocument = Message & Document;


//Esquema de Mongoose para el modelo de mensaje
// Este esquema define la estructura de los mensajes en la base de datos MongoDB
@Schema({ timestamps: true })
export class Message {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ required: true, trim: true })
  content: string;

  createdAt: Date;
  updatedAt: Date;
  
}

export const MessageSchema = SchemaFactory.createForClass(Message);