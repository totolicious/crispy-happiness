import { addYupMethods } from "../../utils";
import { Logger } from "../logger";
import { config } from "../../config";
import { CurrencyConvertor } from "../../services";
import { initDb } from "../db";
import { getTransactionsRouter, WebServer } from "../webServer";

// TODO: initApp is tightly coupled with the config
//       the config could be a function argument
export const initApp = async () => {
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

  return { webServer, dataSource };
}