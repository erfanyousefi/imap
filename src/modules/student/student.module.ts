import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentEntity } from "./entity/student.entity";
import { StudentController } from "./student.controller";
import { StudentService } from "./student.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([StudentEntity])
    ],
    controllers: [StudentController],
    providers: [StudentService],
    exports: []
})
export class StudentModule {}