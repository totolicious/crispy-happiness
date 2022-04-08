import { Between, DataSource } from "typeorm";
import { endOfMonth, format, parse, startOfMonth } from "date-fns";
import { Transaction } from "./Transaction";
import { Client } from "../client";

export const getClientTransactionsForMonth = async ({ client, dataSource, date }: {
  client: Client,
  dataSource: DataSource,
  date: string,
}) => {
  const referenceDate = new Date();
  return dataSource
    .getRepository(Transaction)
    .findBy({
      date: Between(
        format(
          startOfMonth(parse(date, "yyyy-MM-dd", referenceDate)),
          "yyyy-MM-dd"
        ),
        format(
          endOfMonth(parse(date, "yyyy-MM-dd", referenceDate)),
          "yyyy-MM-dd"
        )
      ),
      clientId: client.id,
    });
}
