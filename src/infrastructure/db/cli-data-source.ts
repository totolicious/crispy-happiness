import { DataSource } from "typeorm";
import { config } from "../../config";
import path from 'path';
import {getAllEntities} from "./getAllEntities";

const migrations = path.join(__dirname, "migrations", "*.ts");

export const AppDataSource = new DataSource({
    ...config.db,
    name: 'default',
    synchronize: false,
    entities: getAllEntities(),
    migrations: [migrations],
    subscribers: [],
});
