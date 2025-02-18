import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import { MailerService } from '@nestjs-modules/mailer';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
        private readonly mailerService: MailerService,
        
    ){}
    async validateUser(username:string, password:string): Promise<any>{
        const user = await this.usersService.findOneByUsername(username);
        if (user && bcrypt.compareSync(password , user.password)){
            const {password, ...result}= user;
            return result;
        }
        return null;
    }  
    async login (user: any){
        const payload ={ username : user.username, sub : user.id} ;
        return{
            access_token: this.jwtService.sign(payload),
        };
    }
    async register (RegisterDto : RegisterDto){
        const { email, password, username} = RegisterDto;

        const existingUser = await this.usersService.findOneByEmail(email);
        if (existingUser) {
          throw new ConflictException('User with this email already exists');
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = await this.usersService.create({
            email,
            username,
            password: hashedPassword,
        });
        const {password:_, ...result}= newUser;
           return result;
    }

    async forgotPassword(email :string){
        const user = await this.usersService.findOneByEmail(email);
        if (!user){
            throw new NotFoundException('user with this email does not exist');

        }


        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetExpires = new Date(Date.now() + 3600000); // 1 hour

        // Save the token and expiration in the database
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetExpires;
    await this.usersService.update(user.id, user);
    

    const resetUrl = `http://yourfrontend.com/reset-password?token=${resetToken}`; // link arangement 
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
             Please click on the following link, or paste it into your browser to complete the process:\n\n
             ${resetUrl}\n\n
             If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    });

    return { message: 'Password reset email sent' };

    }

    async resetPassword (token: string, newPassword: string){
        const user = await this.usersService. findOneByResetToken(token);
        if (!user || user.resetPasswordExpires<new Date()){
            throw new NotFoundException('Invalid or expired token');
        }

        const hashedPassword= bcrypt.hashSync(newPassword, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await this.usersService.update(user.id, user);
      
        return { message: 'Password reset successful' };
    }
}