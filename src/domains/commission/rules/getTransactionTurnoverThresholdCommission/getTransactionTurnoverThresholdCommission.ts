// the transaction turnover discount rule states that
// after reaching a monthly turnover,
// the following commissions will have a preferential fixed price for the same month
import { DataSource } from "typeorm";
import { sumBy } from "lodash";
import { Client } from "../../../client";
import { CommissionConfig } from "../../types";
import { getClientTransactionsForMonth } from "../../../transaction/getClientTransactionsForMonth";

export const getTransactionTurnoverThresholdCommission = async ({
  date,
  client,
  dataSource,
  ruleConfig,
}: {
  date: string;
  client: Client;
  dataSource: DataSource;
  ruleConfig: CommissionConfig["transactionTurnoverDiscount"];
}): Promise<number | null> => {
  const thisMonthTransactions = await getClientTransactionsForMonth({
    client,
    date,
    dataSource,
  });

  // bad: this assumes that all transactions are stored in EUR, which is a bit coupled with
  // good idea would be to have transactions stored only in EUR in the db.
  // instead of having amount and currency, we could use a single amountInEur column
  const totalAmountInEur = sumBy(thisMonthTransactions, "amount") || 0;

  // if the total monthly transactions amount passes the threshold, return the preferential total turnover discount
  return totalAmountInEur >= ruleConfig.monthlyAmountEurThreshold
    ? ruleConfig.commissionInEurAfterThreshold
    : null;
};
