import { CurrencyConvertor } from "../../../../services";
import { Transaction } from "../../../transaction";
import { CommissionConfig } from "../../types";

// the default percentage rule states that by default,
// a commission is equal to a percentage of the transaction amount
// (first part of rule 1)
// but not less than a fixed commission amount
// (second part of rule 1)
export const getDefaultPercentageCommission = async ({
  transaction,
  currencyConvertor,
  ruleConfig,
}: {
  ruleConfig: CommissionConfig["defaultPercentage"];
  transaction: Transaction;
  currencyConvertor: CurrencyConvertor;
}): Promise<number> => {
  let commissionAmountInEur = await currencyConvertor.convertToEur({
    amount: (transaction.amount * ruleConfig.percentage) / 100,
    currency: transaction.currency,
    date: transaction.date,
  });

  // the commission amount in euro must not be lower than the
  // minimum amount allowed
  commissionAmountInEur = Math.max(
    commissionAmountInEur,
    ruleConfig.minimumAllowedCommissionInEur
  );

  return commissionAmountInEur;
};
