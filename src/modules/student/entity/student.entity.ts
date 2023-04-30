import { hashSync } from "bcrypt";
import { BeforeInsert, Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "student"})
export class StudentEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    full_name: string;
    @Column({nullable: true})
    age: number;
    @Column({unique: true})
    @Index()
    mobile: string;
    @Column({unique: true})
    @Index()
    email: string;
    @Column({ nullable: true})
    educations: string;
    @Column('date', {nullable: true})
    birthday: Date;
}