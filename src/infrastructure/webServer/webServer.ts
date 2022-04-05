import {default as express, Express} from 'express';
import {Logger} from "../logger";

export interface WebServerConfig {
    port: number;
}

export class WebServer {
    private server: Express;
    private config: WebServerConfig;
    private logger: Logger;

    constructor({ config, logger}: { config: WebServerConfig, logger: Logger}) {
        this.server = express();
        this.config = config;
        this.logger = logger;
    }

    public start() {
        this.server.listen(this.config.port, () => {
            this.logger.info(`Listening on port '${this.config.port}'`);
        }).on('error', (e: Error) => {
            this.logger.error('Error listening: ', e)
        });
    }
}