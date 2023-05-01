import { Test } from "@nestjs/testing"
import { StudentService } from "../student.service"
import { CreateStudentDto } from "../dto/create.dto";
import { TypeORMPostgreSQLTestingModule } from "src/common/testing-utils/typeorm";
import { StudentEntity } from "../entity/student.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

describe('StudentController', () => {
    let studentService: StudentService;
    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                TypeORMPostgreSQLTestingModule([StudentEntity]),
                TypeOrmModule.forFeature([StudentEntity])
            ],
            providers: [StudentService]
        })
        .compile();
        studentService = moduleRef.get<StudentService>(StudentService);
    })
    it("should be defined controller", () => {
        expect(studentService).toBeDefined();
    })
    describe("service methods", () => {
        it("create new student and deleting that", async() => {
            const student: CreateStudentDto = {
                full_name: "Erfan Yousefi",
                email: "erfanyousefi12@gmail.com",
                mobile: "09332257789"
            };
            const newStudent = await studentService.create(student)
            expect(newStudent).toEqual({
                id: expect.any(String),
                age: null,
                birthday: null,
                educations: null,
                ...student
            })
            expect((await studentService.delete(newStudent.id)).affected).toEqual(1);
        })
        it("get All students", async () => {
            const students = await studentService.findAll();
            expect(students).toHaveLength(students.length)
        })
    })
})