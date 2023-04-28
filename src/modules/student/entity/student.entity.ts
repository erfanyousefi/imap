import { hashSync } from "bcrypt";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "student"})
export class StudentEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    full_name: string;
    @Column()
    age: number;
    @Column()
    mobile: string;
    @Column()
    email: string;
    @Column()
    educations: string;
    @Column('date')
    birthday: Date;
}