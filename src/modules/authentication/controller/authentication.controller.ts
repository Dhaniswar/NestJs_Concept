import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/modules/user/dto';
import { User } from 'src/modules/user/model';
import { AuthenticationService } from '../service';

@ApiTags('authentication')
@Controller('authentication')
export class AuthenticationController {
  public constructor(
    private readonly authenticationService: AuthenticationService,
  ) {}

  @Post('register')
  public async register(
    @Body() registrationData: CreateUserDto,
  ): Promise<User> {
    return this.authenticationService.register(registrationData);
  }

  @Get('logged-in')
  public async getAuthenticatedUser(
    @Query('email') email: string,
    @Query('hashPassword') hasPassword: string,
  ): Promise<User> {
    return this.authenticationService.getAuthenticatedUser(email, hasPassword);
  }
}
