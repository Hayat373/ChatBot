import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/users.entity';
import { CreateUserDto } from './dto/createuser.dto';
import { UpdateUserDto } from './dto/update-User.dto';



@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
      ) {}

      async create ( createUserDto : CreateUserDto): Promise<User>{
        const user = this.usersRepository.create(createUserDto);
        return this.usersRepository.save(user);
      }

      // Find all users
     async findAll(): Promise<User[]> {
      return this.usersRepository.find();
     }

      async findOneByEmail(email:string): Promise<User>{
        return this.usersRepository.findOne({where :{email}});
      }

      // Find a user by ID
  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // Find a user by username
  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }

   // Find a user by reset token
   async findOneByResetToken(resetToken: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { resetPasswordToken: resetToken },
    });

    if (!user) {
      throw new NotFoundException('Invalid or expired reset token');
    }

    // Check if the token has expired
    if (user.resetPasswordExpires < new Date()) {
      throw new NotFoundException('Reset token has expired');
    }

    return user;
  }

  // Update a user
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    this.usersRepository.merge(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  // Delete a user
  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
  }

}