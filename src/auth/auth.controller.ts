import { Body, Post, Controller, Query, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';


@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @Post('reset-password')
  async resetPassword(
    @Query('token') token: string,
    @Body('newPassword') newPassword: string,
  ) {
    return this.authService.resetPassword(token, newPassword);
  }

  @Post('Login')
  async Login(@Body() loginDto:LoginDto){
    const user = await this.authService.validateUser(loginDto.username, loginDto.password);
    if(!user){
        throw new UnauthorizedException('Invalid Credentials');

    }
    return this.authService.login(user);
  }
}