import { Module } from "@nestjs/common";
import { ImapController } from "./Imap.controller";
import { ImapService } from "./Imap.service";
import { StudentService } from "../student/student.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentEntity } from "../student/entity/student.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([StudentEntity])
    ],
    controllers: [ImapController],
    providers: [ImapService, StudentService],
    exports: [],
})
export class ImapModule {

}