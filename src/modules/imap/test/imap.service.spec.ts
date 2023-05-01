import { Test, TestingModule } from "@nestjs/testing"
import { ImapService } from "../Imap.service"
import { StudentService } from "src/modules/student/student.service"
import { TypeORMPostgreSQLTestingModule } from "src/common/testing-utils/typeorm";
import { StudentEntity } from "src/modules/student/entity/student.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

describe("imapService", () => {
    let imapService: ImapService;
    beforeEach(async() => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [
                TypeORMPostgreSQLTestingModule([StudentEntity]),
                TypeOrmModule.forFeature([StudentEntity])
            ],
            providers: [ImapService, StudentService]
        }).compile()
        imapService = moduleRef.get<ImapService>(ImapService);
    })
    it("should be defined", () => {
        expect(imapService).toBeDefined();
    })
    describe("Mail", () => {
        it("send", async() => {

        })
    })
})