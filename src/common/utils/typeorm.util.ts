import { TypeORMConfig } from "src/configs/typeorm.config";
import { DataSource, DataSourceOptions } from "typeorm";

export const createRepository = async () =>  {
    const dataSource = new DataSource(TypeORMConfig() as DataSourceOptions);
    let connection = await dataSource.initialize();
    return connection.manager
}