import {LoggerConfig, WebServerConfig} from "../infrastructure";

const devMode = process.env.NODE_ENV !== 'production';

export const config: {
    logger: LoggerConfig,
    webServer: WebServerConfig
} = {
    logger: {
        debugEnabled: devMode,
        displayDateTime: !devMode,
        displayFilePath: !devMode
    },
    webServer: {
        port: process.env.WEBSERVER_PORT ?? devMode ? 9000 : 80,
    }
}