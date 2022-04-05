import {LoggerConfig} from "../infrastructure";

const devMode = process.env.NODE_ENV !== 'production';

export const config: {
    logger: LoggerConfig
} = {
    logger: {
        debugEnabled: devMode,
        displayDateTime: !devMode,
        displayFilePath: !devMode
    },
}