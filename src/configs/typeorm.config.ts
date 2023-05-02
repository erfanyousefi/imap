import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { config } from "dotenv";

config()
export function TypeORMConfig(): TypeOrmModuleOptions{
    const {DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME} = process.env;
    return {
        type: "postgres",
        username: DB_USERNAME,
        password: DB_PASSWORD,
        port: DB_PORT,
        host: DB_HOST,
        database: DB_NAME,
        synchronize: true,
        entities: ['dist/**/**/**/*.entity{.ts,.js}', 'dist/**/**/*.entity{.ts,.js}'],
    }
    
}