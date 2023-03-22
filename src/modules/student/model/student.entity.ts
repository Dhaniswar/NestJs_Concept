import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    description: 'Name of the student',
    example: 'Ram',
    type: 'string',
  })
  @Column()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Gmail of the student',
    example: 'ram@gmail.com',
    type: 'string',
  })
  @Column()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Address of the student',
    example: 'Kathmandu',
    type: 'string',
  })
  @Column()
  address: string;

  @IsString()
  @IsNumber()
  @ApiProperty({
    description: 'Phone number of the student',
    example: '9805253664',
    type: 'number',
  })
  @Column({ type: 'bigint' })
  phone: number;
}
