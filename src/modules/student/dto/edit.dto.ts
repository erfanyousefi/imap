
import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { IsEmail, IsMobilePhone, Length } from "class-validator";
import { ValidationMessage } from "src/common/enums/message.enum";
import { CreateStudentDto } from "./create.dto";

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
    @Length(3, 100)
    @ApiPropertyOptional()
    name: string;
    @ApiPropertyOptional()
    @IsMobilePhone(undefined, {}, {message: ValidationMessage.InvalidMobile})
    mobile: string;
    @ApiPropertyOptional()
    @IsEmail({}, {message: ValidationMessage.InvalidEmail})
    email : string

}