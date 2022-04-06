import {Logger, WebServer} from "./infrastructure";
import {config} from "./config";
import { getTransactionsRouter } from "./infrastructure/endpoints/transactions/commission/commission";
import {addYupMethods} from "./utils";


const init = async () => {
    // create and use the custom validators
    addYupMethods();

    // initialize application logger
    const logger = new Logger(config.logger);

    // create the web server
    const webServer = new WebServer({ config: config.webServer, logger });

    // add endpoints to web server
    webServer.addRouter(getTransactionsRouter({ logger }));

    // start the web server
    await webServer.start();
}

void init();

