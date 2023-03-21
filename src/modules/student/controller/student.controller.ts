import { Controller, Get, Post } from '@nestjs/common';
import { ICreateStudentDto } from '../dto/create-student.dto';
import { Student } from '../model/student.entity';
import { StudentService } from '../service/student.service';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  @Post()
  async createStudent(createOrderDto: ICreateStudentDto): Promise<Student> {
    return this.studentService.createStudent(createOrderDto);
  }
  @Get()
  async getStudentList(): Promise<any> {
    return this.studentService.studentList();
  }
}
