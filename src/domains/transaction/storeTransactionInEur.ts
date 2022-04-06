import { DataSource } from "typeorm";
import { Transaction } from "./Transaction";
import { CurrencyConvertor } from "../../services";
import { Currency } from "../currency";

export const storeTransactionInEur = async ({
  transaction,
  dataSource,
  currencyConvertor,
}: {
  transaction: Transaction;
  dataSource: DataSource;
  currencyConvertor: CurrencyConvertor;
}) => {
  const amountInEur = await currencyConvertor.convertToEur({
    amount: transaction.amount,
    currency: transaction.currency,
    date: transaction.date,
  });

  const transactionEur = new Transaction();
  transactionEur.amount = amountInEur;
  transactionEur.currency = Currency.EUR;
  transactionEur.date = transaction.date;
  transactionEur.clientId = transaction.clientId;
  
  await dataSource.getRepository(Transaction).save(transactionEur)
};
