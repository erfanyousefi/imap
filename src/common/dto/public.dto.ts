import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
import { ValidationMessage } from "src/common/enums/message.enum";


export class IdDto {
    @ApiProperty()
    @IsUUID(undefined, {message: ValidationMessage.InvalidUUID})
    id: string
}