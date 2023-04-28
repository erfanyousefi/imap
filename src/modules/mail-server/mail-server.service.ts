import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MailServerEntity } from "./entity/mail-server.entity";
import { Repository } from "typeorm";

@Injectable()
export class MailServerService {
    constructor(
        @InjectRepository(MailServerEntity) private mailServerRepository: Repository<MailServerEntity>
    ){}
}