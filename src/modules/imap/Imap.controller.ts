import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ImapService } from "./Imap.service";

@Controller("mail-server")
@ApiTags("Imap")
export class ImapController {
    constructor(private imapService: ImapService){}
    @Get()
    async inbox(){
        return await this.imapService.openInbox()
    }
}