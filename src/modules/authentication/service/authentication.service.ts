import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/modules/user/dto';
import { User } from 'src/modules/user/model';
import { UsersService } from 'src/modules/user/service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
  constructor(private readonly usersService: UsersService) {}

  public async register(registrationData: CreateUserDto): Promise<User> {
    return this.usersService.create(registrationData);
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    const user = await this.usersService.getByEmail(email);

    await this.__verifyPassword(plainTextPassword, user.password);
    user.password = undefined;
    return user;
  }

  private async __verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<void> {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );

    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
