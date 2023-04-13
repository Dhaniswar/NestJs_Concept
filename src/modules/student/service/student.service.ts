import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UpdateStudentDto } from '../dto';
import { CreateStudentDto } from '../dto/create-student.dto';
import { Student } from '../model';

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

  async getStudentById(id: number): Promise<Student> {
    return this.studentRepository.findOneBy({
      id,
    });
  }

  async updateStudentRecord(
    id: number,
    updateStudentDto: UpdateStudentDto,
  ): Promise<UpdateResult> {
    return this.studentRepository.update(id, updateStudentDto);
  }

  async deleteStudentRecord(id: number): Promise<DeleteResult> {
    return this.studentRepository.delete(id);
  }
}
