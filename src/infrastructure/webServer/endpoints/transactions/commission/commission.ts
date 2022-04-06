import { Router } from "express";
import { DataSource } from "typeorm";
import { Logger } from "../../../../logger";
import { validateTransactionInput } from "./validateTransactionInput";
import { calculateCommission } from "../../../../../domains";
import { CurrencyConvertor } from "../../../../../services";
import { AsyncError } from "../../../../../utils";
import { storeTransactionInEur } from "../../../../../domains/transaction/storeTransactionInEur";

export interface TransactionsRouterConfig {
  logger: Logger;
  dataSource: DataSource;
  currencyConvertor: CurrencyConvertor;
}

export const getTransactionsRouter = ({
  logger,
  dataSource,
  currencyConvertor,
}: TransactionsRouterConfig) => {
  const router = Router();

  router.post("/transactions/commission", async (req, res) => {
    // TODO: could be moved somewhere more generic
    const sendBadInputResponse = (error: AsyncError) => {
      logger.debug(error);
      res.status(error.name === "ValidationError" ? 400 : 500);
      res.json({ error, commission: null });
      res.send();
    };

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

    // store the transaction
    await storeTransactionInEur({transaction, dataSource, currencyConvertor});

    res.status(200);
    res.json({ error: null, commission: response.commission });
    res.send();
  });

  return router;
};
