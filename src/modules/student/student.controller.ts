import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { StudentService } from "./student.service";

@Controller("student")
@ApiTags("Student")
export class StudentController {
    constructor(private studentService: StudentService){}
}