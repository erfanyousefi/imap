// config/ormconfig-migration.ts
import 'dotenv/config';
import * as path from 'path';
import { DataSource } from 'typeorm';
const config = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PASSWORD),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/**/**/*.entity{.ts,.js}', 'dist/**/**/*.entity{.ts,.js}'],
//   migrations: [
//     path.resolve(`${__dirname}/../../../database/migrations/*{.ts,.js}`)
//   ],
//   migrationsTableName: 'migrations',
  logging: false,
  synchronize: true
});
export default config;