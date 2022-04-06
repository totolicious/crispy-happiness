import { DataSource } from "typeorm";
import { DataSourceOptions } from "typeorm/data-source/DataSourceOptions";
import { Logger } from "../logger";
import { getAllEntities } from "./getAllEntities";

export interface InitDBConfig {
  logger: Logger;
  dataSourceOptions: DataSourceOptions;
}

export const initDb = async ({
  logger,
  dataSourceOptions,
}: InitDBConfig): Promise<DataSource> => {
  const AppDataSource = new DataSource({
    ...dataSourceOptions,
    entities: getAllEntities(),
    synchronize: false,
  });

  logger.debug("Connecting to database");
  try {
    await AppDataSource.initialize();
  } catch (e) {
    logger.error(e);
    throw e;
  }

  logger.info("Connected to database");

  return AppDataSource;
};
