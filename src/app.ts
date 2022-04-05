import {Logger, WebServer} from "./infrastructure";
import {config} from "./config";

const init = async () => {
    const logger = new Logger(config.logger);

    const webServer = new WebServer({ config: config.webServer, logger });
    await webServer.start();


}

void init();
