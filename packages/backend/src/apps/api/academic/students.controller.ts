import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { StudentService } from '../../../contexts/academic/student/application/student.service';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  async findAll() {
    return this.studentService.findAllWithUserInfo();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const student = await this.studentService.findByIdWithUserInfo(id);
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  @Post()
  async create(
    @Body()
    body: {
      firstName: string;
      lastName: string;
      document: string;
      birthDate: string;
      email?: string;
    },
  ) {
    return this.studentService.create(body);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body()
    body: {
      firstName?: string;
      lastName?: string;
      document?: string;
      birthDate?: string;
      email?: string;
    },
  ) {
    const student = await this.studentService.update(id, body);
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.studentService.delete(id);
    if (!deleted) throw new NotFoundException('Student not found');
  }
}
