import { IsString } from 'class-validator';

export class GetUserDto {
    @IsString()
    id: string; // Assuming the user ID is a string, adjust if it's a number
}