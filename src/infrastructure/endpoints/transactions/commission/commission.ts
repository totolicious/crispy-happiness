
import {Router} from "express";
import { Logger } from "../../../logger";
import {validateTransactionInput} from "./validateTransactionInput";
import {Client} from "../../../../domains";
import {DataSource} from "typeorm";

export interface TransactionsRouterConfig {
    logger: Logger;
    dataSource: DataSource;
}

export const getTransactionsRouter = ({ logger, dataSource }: TransactionsRouterConfig) => {
  const router = Router();

  router.post('/transactions/commission', async (req, res) => {
      const transaction = req.body;
      const { error } = await validateTransactionInput(transaction);

      const client = await dataSource.getRepository(Client)
          .findOneBy({ id: transaction.client_id });

      if (!client) {
          const error = {
              name: 'DataError',
              message: 'Client does not exist'
          };
          logger.debug(error);
          res.status(400);
          res.json({ error });
          res.send();
          return;
      }

      if (error) {
          res.status(400);
          res.json({ error });
          res.send();
          return;
      }

      res.status(200);
      res.json({})
      res.send();
  });

  return router;
}
