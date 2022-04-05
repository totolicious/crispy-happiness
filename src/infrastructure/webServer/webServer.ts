import {default as express, Express} from 'express';
import {Logger} from "../logger";

export class WebServer {
    private server: Express;
    private port: number;
    private logger: Logger;

    constructor({ port, logger}: { port: number, logger: Logger}) {
        this.server = express();
        this.port = port;
        this.logger = logger;
    }

    public start() {
        this.server.listen(this.port, () => {
            this.logger.info(`Listening on port '${this.port}'`);
        }).on('error', (e: Error) => {
            this.logger.error('Error listening: ', e)
        });
    }
}