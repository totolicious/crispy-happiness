import express, { Express } from "express";
import http from "http";
import { Logger } from "../logger";

export interface WebServerConfig {
  port: number;
}

export class WebServer {
  private server: Express;

  private httpServer?: http.Server;

  private config: WebServerConfig;

  private logger: Logger;

  constructor({ config, logger }: { config: WebServerConfig; logger: Logger }) {
    this.server = express();
    this.config = config;
    this.logger = logger;

    this.server.use(express.json());
  }

  public async start(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.httpServer = this.server
        .listen(this.config.port, () => {
          this.logger.debug(
            `Starting web server on port '${this.config.port}'`
          );
        })
        .on("error", (e: Error) => {
          this.logger.error("Error listening: ", e);
          reject(e);
        })
        .on("listening", () => {
          this.logger.info(
            `Web server listening on port '${this.config.port}'`
          );
          resolve();
        });
    });
  }

  public async stop(): Promise<void> {
    if (this.httpServer) {
      this.httpServer.close();
    }
  }

  public addRouter(router: express.Router) {
    this.server.use(router);
  }
}
