import {Router} from "express";
import { Logger } from "../../../../logger";
import {validateTransactionInput} from "./validateTransactionInput";
import {DataSource} from "typeorm";
import {calculateCommission} from "../../../../../domains";
import {CurrencyConvertor} from "../../../../../services";

export interface TransactionsRouterConfig {
    logger: Logger;
    dataSource: DataSource;
    currencyConvertor: CurrencyConvertor;
}

export const getTransactionsRouter = ({ logger, dataSource, currencyConvertor }: TransactionsRouterConfig) => {
  const router = Router();

  router.post('/transactions/commission', async (req, res) => {
      // TODO: could be moved somewhere more generic
      const sendBadInputResponse = (error: Error) => {
          logger.debug(error);
          res.status(400);
          res.json({ error, commission: null });
          res.send();
      }

      const input = req.body;

      // input validation
      const { error, transaction } = await validateTransactionInput(input);

      if (error) {
          sendBadInputResponse(error);
          return;
      }

      // commission calculation
      const response = await calculateCommission({
          dataSource,
          transaction,
          currencyConvertor,
      });

      if (response.error) {
          sendBadInputResponse(response.error);
          return;
      }

      res.status(200);
      res.json({ error: null, commission: response.commission })
      res.send();
  });

  return router;
}
