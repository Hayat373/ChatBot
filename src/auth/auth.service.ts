// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/users/entity/users.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) {}

    async register(createUserDto: CreateUserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = this.userRepository.create({
            username: createUserDto.username,
            email: createUserDto.email,
            password: hashedPassword,
            
        });
        return this.userRepository.save(user);
    }

    async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
        const user = await this.userRepository.findOne({ where: { username: loginDto.username } });
        if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
            throw new Error('Invalid username or password');
        }

        const payload = { username: user.username, sub: user.id };
        return { accessToken: this.jwtService.sign(payload) };
    }

    
}