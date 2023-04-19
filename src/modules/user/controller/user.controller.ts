import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../dto';
import { User } from '../model';
import { UsersService } from '../service';

@ApiTags('user')
@Controller('users')
export class UserController {
  public constructor(private readonly userService: UsersService) {}

  @Get()
  async getByEmail(@Query('email') email: string): Promise<User> {
    return this.userService.getByEmail(email);
  }

  @Post()
  async create(@Body() userData: CreateUserDto): Promise<User> {
    return await this.userService.create(userData);
  }
}
