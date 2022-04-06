import {Logger, WebServer} from "./infrastructure";
import {config} from "./config";
import { getTransactionsRouter } from "./infrastructure/endpoints/transactions/commission/commission";
import {addYupMethods} from "./utils";
import {initDb} from "./infrastructure/db/dataSource";


const init = async () => {
    // create and use the custom validators
    addYupMethods();

    // initialize application logger
    const logger = new Logger(config.logger);

    // connect to the database
    await initDb({ logger, dataSourceOptions: config.db });

    // create the web server, add the endpoints, start the server
    const webServer = new WebServer({ config: config.webServer, logger });
    webServer.addRouter(getTransactionsRouter({ logger }));
    await webServer.start();
}

void init();
