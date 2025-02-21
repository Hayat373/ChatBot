import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    currentPassword: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    newPassword: string;
}