// the transaction turnover discount rule states that
// after reaching a monthly turnover,
// the following commissions will have a preferential fixed price for the same month
import {Client} from "../../client";
import {Between, DataSource} from "typeorm";
import {Transaction} from "../../transaction";
import {startOfMonth, endOfMonth, parse, format} from "date-fns";
import {sumBy} from "lodash";
import {CommissionConfig} from "../types";

export const transactionTurnoverDiscountRule = async ({
    date,
    client,
    dataSource,
    ruleConfig,
}: {
    date: string,
    client: Client;
    dataSource: DataSource;
    ruleConfig: CommissionConfig['transactionTurnoverDiscount']
}): Promise<number | null> => {
    const referenceDate = new Date();
    const thisMonthTransactions = await dataSource.getRepository(Transaction).findBy({
        date: Between(
            format(startOfMonth(parse(date, 'yyyy-MM-dd', referenceDate)), 'yyyy-MM-dd'),
            format(endOfMonth(parse(date, 'yyyy-MM-dd', referenceDate)), 'yyyy-MM-dd'),
        ),
        clientId: client.id,
    });

    // bad: this assumes that all transactions are stored in EUR, which is a bit coupled with
    // good idea would be to have transactions stored only in EUR in the db
    const totalAmountInEur = sumBy(thisMonthTransactions, 'amount') || 0;

    // if the total monthly transactions amount passes the threshold, return the preferential total turnover discount
    return totalAmountInEur >= ruleConfig.monthlyAmountEurThreshold ? ruleConfig.monthlyAmountEurThreshold : null;
}