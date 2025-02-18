import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';
import { ChatInteraction } from './entities/chat-interaction.entitiy';

@Module({
  imports: [TypeOrmModule.forFeature([ChatInteraction])],
  controllers: [ChatbotController],
  providers: [ChatbotService],
})
export class ChatbotModule {}