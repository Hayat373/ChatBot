import { Body, Controller, Post } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ChatDto } from './dto/chat.dto';

@Controller('chatbot')
export class ChatbotController {
    constructor(private readonly chatbotService: ChatbotService) {}
    @Post('ask')
    async ask(@Body() chatDto:ChatDto){
        const response = await this.chatbotService.processQuestion(chatDto.question);
        return response;
    }
}
