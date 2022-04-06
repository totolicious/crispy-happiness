
import {Router} from "express";
import { Logger } from "../../../logger";
import {validateTransactionInput} from "./validateTransactionInput";

export interface TransactionsRouterConfig {
    logger: Logger;
}

export const getTransactionsRouter = ({}: TransactionsRouterConfig) => {
  const router = Router();

  router.post('/transactions/commission', async (req, res) => {
      const transaction = req.body;
      const { error } = await validateTransactionInput(transaction);

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
