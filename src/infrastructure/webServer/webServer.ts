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

        this.server.use(express.json());
    }

    /**
     * Attempts to start the web server and waits for the web server successfully start or fail starting
     */
    public async start(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.server.listen(this.config.port, () => {
                this.logger.debug(`Starting web server on port '${this.config.port}'`);
            }).on('error', (e: Error) => {
                this.logger.error('Error listening: ', e);
                reject(e);
            }).on('listening', () => {
                this.logger.info(`Web server listening on port '${this.config.port}`);
                resolve();
            });
        })
    }

    public addRouter(router: express.Router) {
        this.server.use(router);
    }
}
