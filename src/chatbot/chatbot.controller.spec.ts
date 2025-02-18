import { Test, TestingModule } from '@nestjs/testing';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';
import { ChatDto } from './dto/chat.dto';

describe('ChatbotController', () => {
  let controller: ChatbotController;
  let service: ChatbotService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatbotController],
      providers: [ChatbotService],
    }).compile();

    controller = module.get<ChatbotController>(ChatbotController);
    service = module.get<ChatbotService>(ChatbotService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return response from ask method', async () => {
    const chatDto: ChatDto = { question: 'What is cybersecurity?' };
    jest.spyOn(service, 'processQuestion').mockResolvedValue({
      question: chatDto.question,
      response: 'You asked: What is cybersecurity?. This is a mock response.',
    });

    const result = await controller.ask(chatDto);
    expect(result).toEqual({
      question: chatDto.question,
      response: 'You asked: What is cybersecurity?. This is a mock response.',
    });
  });
});