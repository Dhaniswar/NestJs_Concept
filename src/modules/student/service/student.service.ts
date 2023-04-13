import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from '../dto/create-student.dto';
import { Student } from '../model/student.entity';

@Injectable()
export class StudentService {
  public constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}
  async createStudent(input: CreateStudentDto): Promise<Student> {
    return this.studentRepository.save(input);
  }
  async studentList(): Promise<Student[]> {
    return await this.studentRepository.find();
  }
}
