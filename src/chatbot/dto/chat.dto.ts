import { IsString, IsNotEmpty } from 'class-validator';

export class ChatDto {
  @IsString()
  @IsNotEmpty()
  question: string;
}