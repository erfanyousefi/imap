import { TypeOrmModule } from "@nestjs/typeorm";
import { config } from "dotenv";
config();
export const TypeORMPostgreSQLTestingModule = (entities: any[]) =>
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [...entities],
    synchronize: true,
  });