import { ValidationError } from "../../utils";
import {Client} from "../client";
import {DataSource} from "typeorm";
import { Transaction } from "../transaction";
import { Commission } from "../commission";
import {Currency} from "../currency";
import {CurrencyConvertor} from "../../services";

export type CalculateCommissionReturnType = {
    error: ValidationError ,
    commission: null,
} | {
    error: null,
    commission: Commission;
}


export const calculateCommission = async ({
        dataSource,
        transaction,
        currencyConvertor,
    }: {
        dataSource: DataSource,
        transaction: Transaction,
        currencyConvertor: CurrencyConvertor,
    }): Promise<CalculateCommissionReturnType> => {
    const client = await dataSource.getRepository(Client).findOneBy({ id: transaction.clientId });

    if (!client) {
        return({
            error: {
                name: 'DataError',
                message: 'Client does not exist'
            },
            commission: null
        });
    }

    // default rule commission calculation
    const defaultPercentageCommission = new Commission({
        amount: transaction.amount * 0.5/100,
        currency: transaction.currency,
    });

    let eurAmount: number;
    try {
        eurAmount = await currencyConvertor.convertToEur({
           currency: defaultPercentageCommission.currency,
           amount: defaultPercentageCommission.amount,
           date: transaction.date,
        });
    } catch (e) {
        return({
            error: {
                name: 'ConversionError',
                message: (e as Error).message
            },
            commission: null
        });
    }

    const eurCommission = new Commission({
        amount: eurAmount,
        currency: Currency.EUR,
    })

    return {
        error: null,
        commission: eurCommission,
    }
}
