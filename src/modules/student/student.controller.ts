import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiParam, ApiTags } from "@nestjs/swagger";
import { StudentService } from "./student.service";
import { CreateStudentDto } from "./dto/create.dto";
import { IdDto } from "src/common/dto/public.dto";
import { UpdateStudentDto } from "./dto/edit.dto";
import { StudentMessage } from "./dto/message.enum";
import { LoggerMethod } from "src/modules/logger/logger.decorator";

@Controller("student")
@ApiTags("Student")
export class StudentController {
    constructor(private studentService: StudentService){}
    
    @Post()
    @LoggerMethod()
    async create(@Body() studentDto: CreateStudentDto) {
        const student = await this.studentService.create(studentDto);
        return student
    }
    @Get()
    @LoggerMethod()
    async getAll() {
        const students = await this.studentService.findAll();
        return students;
    }
    @Get("/:id")
    @LoggerMethod()
    @ApiParam({name: "id", type: "string"})
    async getOne(@Param('id') id: string) {
        const student = await this.studentService.findOne(id);
        return student;
    }
    @Patch("/:id")
    @LoggerMethod()
    @ApiParam({name: "id", type: "string"})
    async edit(@Param('id') id: string, @Body() studentDto: UpdateStudentDto) {
        const student = await this.studentService.edit(id, studentDto);
        return student
    }
    @Delete("/:id")
    @LoggerMethod()
    @ApiParam({name: "id", type: "string"})
    async delete(@Param() idDto: IdDto) {
        const student = await this.studentService.delete(idDto.id);
        return StudentMessage.Deleted;
    }
}