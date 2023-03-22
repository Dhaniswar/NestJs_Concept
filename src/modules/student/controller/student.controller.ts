import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
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
  async getStudentList(): Promise<any> {
    return this.studentService.studentList();
  }
}
