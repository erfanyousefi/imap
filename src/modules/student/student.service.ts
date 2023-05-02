import { BadRequestException, Catch, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StudentEntity } from "./entity/student.entity";
import { DeleteResult, Repository } from "typeorm";
import { CreateStudentDto } from "./dto/create.dto";
import { StudentMessage } from "./dto/message.enum";
import { UpdateStudentDto } from "./dto/edit.dto";
import { HttpExceptionFilter } from "src/common/filter/http.filter";
import { LoggerMethod } from "src/modules/logger/logger.decorator";

@Catch(HttpExceptionFilter)
@Injectable()
export class StudentService {
    constructor( @InjectRepository(StudentEntity) private studentRepository: Repository<StudentEntity>) { }
    
    @LoggerMethod()
    async create(studentDto: CreateStudentDto) {
        const { full_name, email, mobile } = studentDto;
        if (email) await this.findOneByEmail(email)
        if (mobile) await this.findOneByMobile(mobile)
        const student = this.studentRepository.create({
            full_name,
            mobile,
            email
        });
        await this.studentRepository.save(student);
        return student;
    }
    @LoggerMethod()
    async insertMany(students: StudentEntity[]) {
        try {
            const result = await this.studentRepository.createQueryBuilder().insert()
                .into(StudentEntity).values(students).execute();
            return result;
        }catch(err) {
            console.log(err.message);
            
        }
    }
    @LoggerMethod()
    async findOne(id: string) {
        const student = await this.studentRepository.findOneBy({ id });
        if (!student) throw new NotFoundException(StudentMessage.NotFound);
        return student;
    }
    @LoggerMethod()
    async findOneByMobile(mobile: string) {
        const student = await this.studentRepository.findOneBy({ mobile });
        if (student) throw new BadRequestException(StudentMessage.AlreadyExistMobile);
        return true;
    }
    @LoggerMethod()
    async findOneByEmail(email: string) {
        const student = await this.studentRepository.findOneBy({ email });
        if (student) throw new BadRequestException(StudentMessage.AlreadyExistEmail);
        return true;
    }
    @LoggerMethod()
    async edit(id: string, studentDto: UpdateStudentDto) {
        if (studentDto.email) await this.findOneByEmail(studentDto.email);
        if (studentDto.mobile) await this.findOneByMobile(studentDto.mobile);
        const student = await this.findOne(id);
        Object.assign(student, studentDto);
        await this.studentRepository.save(student);
        console.log(student);
        return student;
    }
    @LoggerMethod()
    async delete(id: string) {
        const deletedResult = await this.studentRepository.delete({ id });
        if (deletedResult.affected === 0) throw new NotFoundException(StudentMessage.NotFound);
        return deletedResult;
    }
    @LoggerMethod()
    async findAll() {
        const students = await this.studentRepository.find({});
        return students;
    }
}