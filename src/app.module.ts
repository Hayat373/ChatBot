import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/users.module';
import { ChatbotModule } from './chatbot/chatbot.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', 
      password:  'Lifeoftheworld@3',   
      database:  'chatbot',   
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,           
    }),
    AuthModule,
    UserModule,
   
  
  ],
})
export class AppModule {}
