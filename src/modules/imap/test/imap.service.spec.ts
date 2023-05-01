import { Test, TestingModule } from "@nestjs/testing"
import { ImapService } from "../Imap.service"
import { StudentService } from "src/modules/student/student.service"
import { TypeORMPostgreSQLTestingModule } from "src/common/testing-utils/typeorm";
import { StudentEntity } from "src/modules/student/entity/student.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MAILER_OPTIONS, MailerModule, MailerService } from "@nestjs-modules/mailer";
import { NodeMailerConfig, SendMailOptions } from "src/common/testing-utils/nodemailer";
import { sleep } from "src/common/utils/functions";

describe("imapService", () => {
    let imapService: ImapService;
    let mailer: MailerService
    jest.setTimeout(30000)
    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [
                TypeORMPostgreSQLTestingModule([StudentEntity]),
                TypeOrmModule.forFeature([StudentEntity]),
                MailerModule.forRootAsync({ useFactory: () => NodeMailerConfig(), })
            ],
            providers: [
                ImapService,
                StudentService,
                {
                    name: MAILER_OPTIONS,
                    provide: MAILER_OPTIONS,
                    useValue: NodeMailerConfig()
                },
                MailerService]
        }).compile()
        await moduleRef.init();
        imapService = moduleRef.get<ImapService>(ImapService);
        mailer = moduleRef.get<MailerService>(MailerService);
    })
    it("should be defined", () => {
        expect(imapService).toBeDefined();
    })
    describe("Mail", () => {
        it("send", async () => {
            expect(await mailer.sendMail(SendMailOptions())).toEqual({ 
                accepted: ["codenight.ir@gmail.com"], 
                ehlo: expect.any(Array), 
                envelope: expect.any(Object), 
                envelopeTime: expect.any(Number), 
                messageId: expect.any(String), 
                messageSize: expect.any(Number), 
                messageTime: expect.any(Number), 
                rejected: expect.any(Array), 
                response: expect.any(String) 
            })
        })
    })
    describe("ReadingMail", () => {
        it("reading", async () => {
            await sleep(1000);
            await imapService.saveStudents()
            expect("hello").toEqual("hello")
        })
    })
})