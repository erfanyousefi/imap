import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MailServerEntity } from "./entity/mail-server.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([MailServerEntity])
    ],
    controllers: [],
    providers: [],
    exports: []
})
export class MailServerModule {}