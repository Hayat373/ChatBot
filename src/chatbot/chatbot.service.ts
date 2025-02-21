import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatInteraction } from './entities/chat-interaction.entitiy';
import { ChatResponse } from './interfaces/chat.interface';



@Injectable()
export class ChatbotService {
  constructor(
    @InjectRepository(ChatInteraction)
    private readonly chatInteractionRepository: Repository<ChatInteraction>,
  ) {}

  async processQuestion(question: string): Promise<ChatResponse> {
    // Here you would integrate with your model or API
    const responseText = `You asked: ${question}. This is a mock response.`;

    // Save interaction to the database
    const chatInteraction = this.chatInteractionRepository.create({
      question,
      response: responseText,
    });
    await this.chatInteractionRepository.save(chatInteraction);

    return {
      question,
      response: responseText,
    };
  }
}