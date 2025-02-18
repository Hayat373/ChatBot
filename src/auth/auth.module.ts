import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { User } from 'src/users/entity/users.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Import the User entity for TypeORM
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'yourSecretKey', // Use an environment variable for the secret
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService], 
})
export class AuthModule {}