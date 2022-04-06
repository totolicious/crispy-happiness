import "reflect-metadata"
import { DataSource } from "typeorm"
import { Client, Transaction } from '../../domains';
import {Logger} from "../logger";
import {DataSourceOptions} from "typeorm/data-source/DataSourceOptions";

export interface InitDBConfig {
    logger: Logger;
    dataSourceOptions: DataSourceOptions
}

export const initDb = async ({
     logger,
     dataSourceOptions,
}: InitDBConfig) => {
    const AppDataSource = new DataSource({
        ...dataSourceOptions,
        entities: [Client, Transaction],
        synchronize: false,
    });

    logger.debug("Connecting to database")
    try {
        await AppDataSource.initialize();
    } catch (e) {
        logger.error(e);
        throw (e);
    }

    logger.info("Connected to database");
}
