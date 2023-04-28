import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentEntity } from "./entity/student.entity";
import { StudentController } from "./student.controller";
import { StudentService } from "./student.service";
import { UserEntity } from "../user/entity/user.entity";
import { UserService } from "../user/user.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, StudentEntity])
    ],
    controllers: [StudentController],
    providers: [StudentService, UserService],
    exports: []
})
export class StudentModule {}