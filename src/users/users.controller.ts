import { Controller,Get,Post,Body,Param,Put,Delete,
    NotFoundException,
    Query, } from '@nestjs/common';
    import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createuser.dto';
import { UpdateUserDto } from './dto/update-User.dto';
import { User } from './entity/users.entity';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}


    // Create a new user
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

   // Get all users
   @Get()
   async findAll() {
     return this.usersService.findAll();
   }
 
   // Get a user by ID
   @Get(':id')
   async findOne(@Param('id') id: number) {
     return this.usersService.findOne(id);
   }

   // Find a user by email
  @Get('by-email')
  async findOneByEmail(@Query('email') email: string): Promise<User> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('User with this email does not exist');
    }
    return user;
  }

  // Find a user by reset token
  @Get('by-reset-token')
  async findOneByResetToken(@Query('token') resetToken: string): Promise<User> {
    return this.usersService.findOneByResetToken(resetToken);
  }

   @Get('by-username/:username')
   async findOneByUsername (@Param ('username') username:string,):Promise< User | undefined>{
    const user = await this.usersService.findOneByUsername(username);
    if (!user){
        throw new NotFoundException('users with this username does not exist');
    }
    return user;
   } 

    // Update a user
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  // Delete a user
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}