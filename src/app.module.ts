import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import {  UsersModule } from './users/users.module';
import { ChatbotModule } from './chatbot/chatbot.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.username, 
      password:  process.env.password,   
      database:  process.env.database,   
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,           
    }),
    AuthModule,
    UsersModule,
    ChatbotModule
  
  ],
})
export class AppModule {}
