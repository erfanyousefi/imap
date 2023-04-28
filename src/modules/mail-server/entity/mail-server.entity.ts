import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "mail_server"})
export class MailServerEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    data: string;
    @Column({unique: true})
    account_id: string
}