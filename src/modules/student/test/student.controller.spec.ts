import { Test } from "@nestjs/testing"
import { StudentController } from "../student.controller"
import { StudentService } from "../student.service"
import { CreateStudentDto } from "../dto/create.dto";
import { randomUUID } from "crypto";
import { UpdateStudentDto } from "../dto/edit.dto";

describe('StudentController', () => {
    let studentController: StudentController;
    const mockStudentService = {
        create: jest.fn((dto: CreateStudentDto) => {
            const student = {
                id: randomUUID(), 
                ...dto
            }
            return student
        }),
        edit: jest.fn((id: string, dto: UpdateStudentDto) => {
            const editedStudent = {
                id, 
                ...dto
            };
            return editedStudent
        }),
        findAll: jest.fn(() => {
            return [{
                id: "any string",
                full_name: "Ahmad Asadi", 
                email: "ahmadasadi@gmail.com",
                mobile: "09917753558"
            }];
        }),
        findOne: jest.fn((id: string) => {
            return {
                id: "any string",
                full_name: "Ahmad Asadi", 
                email: "ahmadasadi@gmail.com",
                mobile: "09917753558"
            };
        }),
    }
    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [StudentController],
            providers: [StudentService]
        })
        .overrideProvider(StudentService)
        .useValue(mockStudentService)
        .compile();
        studentController = moduleRef.get<StudentController>(StudentController);
    })
    it("should be defined controller", () => {
        expect(studentController).toBeDefined();
    })
    describe('controller methods', () => {
        it("created new student ", async () => {
            const studentDto: CreateStudentDto = { full_name: "Erfan Yousefi", email: "erfanyousefi@gmail.com", mobile: "09917753558" };
            expect(await studentController.create(studentDto)).toEqual({
                id: expect.any(String),
                ...studentDto
            })
            expect(mockStudentService.create).toHaveBeenCalledWith(studentDto)
        })
        it("updated student", async () => {
            const studentDto: UpdateStudentDto = { full_name: "Ahmad Asadi", email: "ahmadasadi@gmail.com"};
            const id = "3b0340f5-afd6-41c7-9034-c41a24c3594d"
            const student = {}
            Object.assign(student, studentDto, {id})
            expect(await studentController.edit(id, studentDto)).toEqual(student)
            expect(mockStudentService.edit).toHaveBeenCalled()
        })
        it("findAll students", async() => {
            expect(await studentController.getAll()).toEqual([
                {
                    id: expect.any(String),
                    full_name: "Ahmad Asadi", 
                    email: "ahmadasadi@gmail.com",
                    mobile: "09917753558"
                }
            ])
            expect(mockStudentService.edit).toHaveBeenCalled()
        })
        it("find one students", async() => {
            const id = "3b0340f5-afd6-41c7-9034-c41a24c3594d"
            expect(await studentController.getOne(id)).toEqual(
                {
                    id: expect.any(String),
                    full_name: "Ahmad Asadi", 
                    email: "ahmadasadi@gmail.com",
                    mobile: "09917753558"
                }
            )
        })
    })

})