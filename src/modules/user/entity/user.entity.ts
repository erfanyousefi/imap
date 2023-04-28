import { hashSync } from "bcrypt";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "user"})
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    full_name: string;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column()
    account_id: string;
    @BeforeInsert()
    savePassword() {
        this.password = hashSync(this.password, 10);
    }
}