import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StudentEntity } from "./entity/student.entity";
import { Repository } from "typeorm";

@Injectable()
export class StudentService {
    constructor(@InjectRepository(StudentEntity) private studentRepository: Repository<StudentEntity>){}
}