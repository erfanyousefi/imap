import { Injectable, Logger } from "@nestjs/common";
import * as Imap from "node-imap"
import { ImapConfig } from "src/configs/imap.config";
import { ImapCriteria, ImapDateTimePrefix, ImapEvents } from "./enum/imap.enum";
import { SearchInMails } from "src/common/utils/imap.util";
import { Cron, CronExpression } from "@nestjs/schedule";
import { StudentService } from "../student/student.service";
let imap: Imap;
let users: any = []
@Injectable()
export class ImapService {
    private readonly logger = new Logger(ImapService.name);
    constructor(
        private studentService: StudentService
    ) {
        imap = new Imap(ImapConfig());
    }
    @Cron(CronExpression.EVERY_30_SECONDS)
    async saveStudents(){
        let students: any[] = await this.openInbox() ?? [];
        if(students.length > 0) {
            await this.studentService.insertMany(students);
            console.log("saved users #", students.length);
        }
        else console.log("not found data to save!"); 
    }
    async openInbox(): Promise<any[]> {
        this.logger.debug('Called every 1 minutes');
        users = [];
        return new Promise((resolve, reject) => {
            imap.once(ImapEvents.Ready, () => {
                imap.openBox('INBOX', async (err, mailBox) => {
                    if (err) reject(err)
                    const dateTimeFormatForSearch = [ImapDateTimePrefix.Since, new Date()];
                    SearchInMails(imap, [ImapCriteria.UnSeen], dateTimeFormatForSearch, users)
                })
            })
            imap.once(ImapEvents.Error, function (err) {
                reject(err)
            });
            imap.once(ImapEvents.End, async function () {
                console.log('Connection ended');
                console.log(users);
                resolve(users);
            });
        imap.connect();
    })

}
}