import { Test, TestingModule } from '@nestjs/testing';
import { ChatbotService } from './chatbot.service';

describe('ChatbotService', () => {
  let service: ChatbotService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatbotService],
    }).compile();

    service = module.get<ChatbotService>(ChatbotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should process question and return response', async () => {
    const question = 'What is cybersecurity?';
    const response = await service.processQuestion(question);

    expect(response).toEqual({
      question,
      response: 'You asked: What is cybersecurity?. This is a mock response.',
    });
  });
});