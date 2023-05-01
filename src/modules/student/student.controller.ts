import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiParam, ApiTags } from "@nestjs/swagger";
import { StudentService } from "./student.service";
import { CreateStudentDto } from "./dto/create.dto";
import { IdDto } from "src/common/dto/public.dto";
import { UpdateStudentDto } from "./dto/edit.dto";
import { StudentMessage } from "./dto/message.enum";

@Controller("student")
@ApiTags("Student")
export class StudentController {
    constructor(private studentService: StudentService){}
    
    @Post()
    async create(@Body() studentDto: CreateStudentDto) {
        const student = await this.studentService.create(studentDto);
        return student
    }
    @Get()
    async getAll() {
        const students = await this.studentService.findAll();
        return students;
    }
    @Get("/:id")
    @ApiParam({name: "id", type: "string"})
    async getOne(@Param('id') id: string) {
        const student = await this.studentService.findOne(id);
        return student;
    }
    @Patch("/:id")
    @ApiParam({name: "id", type: "string"})
    async edit(@Param('id') id: string, @Body() studentDto: UpdateStudentDto) {
        const student = await this.studentService.edit(id, studentDto);
        return student
    }
    @Delete("/:id")
    @ApiParam({name: "id", type: "string"})
    async delete(@Param() idDto: IdDto) {
        const student = await this.studentService.delete(idDto.id);
        return StudentMessage.Deleted;
    }
}