import { DataSource } from "typeorm";
import { AsyncError } from "../../utils";
import { Client } from "../client";
import { Transaction } from "../transaction";
import { Commission } from ".";
import { Currency } from "../currency";
import { CurrencyConvertor } from "../../services";
import { config } from "../../config";
import {
  transactionTurnoverDiscountRule,
  clientPreferentialCommissionRule,
  defaultPercentageRule,
} from "./rules";

export type CalculateCommissionReturnType =
  | {
      error: AsyncError;
      commission: null;
    }
  | {
      error: null;
      commission: Commission;
    };

export const calculateCommission = async ({
  dataSource,
  transaction,
  currencyConvertor,
}: {
  dataSource: DataSource;
  transaction: Transaction;
  currencyConvertor: CurrencyConvertor;
}): Promise<CalculateCommissionReturnType> => {
  const client = await dataSource
    .getRepository(Client)
    .findOneBy({ id: transaction.clientId });

  if (!client) {
    return {
      error: {
        name: "ValidationError",
        message: "Client does not exist",
      },
      commission: null,
    };
  }

  try {
    // calculate commissions in eur based on all available rules
    // all rules must be async and must return EUR amounts
    const commissionAmounts: (number | null)[] = await Promise.all([
      defaultPercentageRule({
        ruleConfig: config.commissions.defaultPercentage,
        transaction,
        currencyConvertor,
      }),
      clientPreferentialCommissionRule({
        client,
      }),
      transactionTurnoverDiscountRule({
        client,
        dataSource,
        ruleConfig: config.commissions.transactionTurnoverDiscount,
        date: transaction.date,
      }),
    ]);

    const validCommissionAmmounts: number[] = commissionAmounts.filter(
      (commissionAmount): commissionAmount is number => !!commissionAmount
    );

    if (validCommissionAmmounts.length === 0) {
      return {
        error: {
          name: "CommissionRuleError",
          message: "No rule could be applied to determine commission.",
        },
        commission: null,
      };
    }

    const minCommission: number = Math.min(...validCommissionAmmounts);

    return {
      error: null,
      commission: new Commission({
        amount: minCommission,
        currency: Currency.EUR,
      }),
    };
  } catch (e) {
    return {
      error: {
        name: "ConversionError",
        message: (e as Error).message,
      },
      commission: null,
    };
  }
};
