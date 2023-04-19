import { ApiProperty } from '@nestjs/swagger';
import { string } from 'joi';

export class CreateUserDto {
  @ApiProperty({
    description: 'email of the user that must be unique',
    example: 'ram@gmail.com',
    type: string,
    required: true,
  })
  email: string;
  @ApiProperty({
    example: 'Ram',
    type: string,
  })
  name: string;
  @ApiProperty({
    example: '******#####',
    type: string,
  })
  password: string;
}
