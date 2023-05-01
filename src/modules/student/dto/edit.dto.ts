
import { PartialType } from "@nestjs/swagger";
import { CreateStudentDto } from "./create.dto";

export class UpdateStudentDto extends PartialType(CreateStudentDto) {}