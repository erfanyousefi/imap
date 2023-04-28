import { Module } from "@nestjs/common";
import { ImapController } from "./Imap.controller";
import { ImapService } from "./Imap.service";

@Module({
    imports: [
        
    ],
    controllers: [ImapController],
    providers: [ImapService],
    exports: [],
})
export class ImapModule {

}