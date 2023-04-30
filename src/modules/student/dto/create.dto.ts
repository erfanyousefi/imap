import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsMobilePhone, Length } from "class-validator";
import { ValidationMessage } from "src/common/enums/message.enum";

export class CreateStudentDto {
    @Length(3, 100)
    @ApiPropertyOptional()
    name: string;
    @ApiPropertyOptional()
    @IsMobilePhone(undefined, {}, {message: ValidationMessage.InvalidMobile})
    mobile: string;
    @ApiProperty()
    @IsEmail({}, {message: ValidationMessage.InvalidEmail})
    email : string

}