import {Logger, WebServer} from "./infrastructure";
import {config} from "./config";

const logger = new Logger(config.logger);

const webServer = new WebServer({ port: 9000, logger });
webServer.start();
