import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateStudentDto } from '../dto';
import { CreateStudentDto } from '../dto/create-student.dto';
import { Student } from '../model/student.entity';
import { StudentService } from '../service/student.service';

@ApiTags('student')
@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  async createStudent(
    @Body() createOrderDto: CreateStudentDto,
  ): Promise<Student> {
    return this.studentService.createStudent(createOrderDto);
  }
  @Get()
  async getStudentList(): Promise<Student[]> {
    return this.studentService.studentList();
  }

  @Get(':id')
  async getStudentById(@Query('id') id: number): Promise<Student> {
    return this.studentService.getStudentById(id);
  }

  @Put(':id')
  async updateStudentRecord(
    @Query('id') id: number,
    @Body() updateStudentDto: UpdateStudentDto,
  ): Promise<UpdateResult> {
    return this.studentService.updateStudentRecord(id, updateStudentDto);
  }

  @Delete(':id')
  async deleteStudentRecord(@Query('id') id: number): Promise<DeleteResult> {
    return this.studentService.deleteStudentRecord(id);
  }
}
