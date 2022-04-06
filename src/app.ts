import {Logger, WebServer} from "./infrastructure";
import {config} from "./config";
import { getTransactionsRouter } from "./infrastructure";
import {addYupMethods} from "./utils";
import {initDb} from "./infrastructure";
import { CurrencyConvertor } from "./services";


const init = async () => {
    // create and use the custom validators
    addYupMethods();

    // initialize application logger
    const logger = new Logger(config.logger);

    // initialize services
    const currencyConvertor = new CurrencyConvertor(config.currencyConvertor);

    // connect to the database
    const dataSource = await initDb({ logger, dataSourceOptions: config.db });

    // create the web server, add the endpoints, start the server
    const webServer = new WebServer({ config: config.webServer, logger });
    webServer.addRouter(getTransactionsRouter({ logger, dataSource, currencyConvertor }));
    await webServer.start();
}

void init();
