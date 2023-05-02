import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "logger"})
export class LoggerEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    method: string;
    @Column('text')
    arguments: string;
    @Column('text', { nullable: true })
    result: string;
    @Column('text', { nullable: true })
    error: string;
    @Column()
    status: 'success' | 'error';
    @Column()
    timestamp: Date;
}