import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICreateStudentDto } from '../dto/create-student.dto';
import { Student } from '../model/student.entity';

@Injectable()
export class StudentService {
  public constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}
  async createStudent(createOrderDto: ICreateStudentDto): Promise<Student> {
    return this.studentRepository.create(createOrderDto);
  }
  async studentList(): Promise<any> {
    return 'Student List';
  }
}
