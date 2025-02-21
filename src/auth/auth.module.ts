// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from 'src/users/entity/users.entity';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from 'src/users/users.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: 'your_secret_key', // Use a .env variable in production
            signOptions: { expiresIn: '1h' }, // Token expiration time
        }),
    ],
    providers: [AuthService, JwtStrategy, UserService],
    controllers: [AuthController],
})
export class AuthModule {}