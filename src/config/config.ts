import {LoggerConfig, WebServerConfig} from "../infrastructure";
import {DataSourceOptions} from "typeorm/data-source/DataSourceOptions";
import {CurrencyConvertorConfig} from "../services";

const isDev = process.env.NODE_ENV !== 'production';

export const config: {
    logger: LoggerConfig,
    webServer: WebServerConfig,
    db: DataSourceOptions,
    currencyConvertor: CurrencyConvertorConfig,
} = {
    logger: {
        debugEnabled: isDev,
        displayDateTime: !isDev,
        displayFilePath: !isDev
    },
    webServer: {
        port: process.env.WEBSERVER_PORT ?? isDev ? 9000 : 80,
    },
    db: {
        type: 'postgres',
        host: 'localhost',
        port: 5439,
        username: 'postgres',
        password: 'postgres',
        database: 'crispy_happiness',
        logging: isDev,
    },
    currencyConvertor: {
        endpointBaseURL: 'https://api.exchangerate.host/'
    },
}