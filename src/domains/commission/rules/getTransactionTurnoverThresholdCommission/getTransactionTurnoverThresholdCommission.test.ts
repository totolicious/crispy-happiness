import { getTransactionTurnoverThresholdCommission } from "./getTransactionTurnoverThresholdCommission";
import { Client } from "../../../client";
import { Transaction } from "../../../transaction";

const date = '2022-04-06';
const monthlyAmountEurThreshold = 300;
const commissionInEurAfterThreshold = 0.3;
const client = new Client();
client.id = 1;
client.preferentialComissionEur = null;

interface MockTransaction {
  id: number;
  date: string;
  amount: number;
  currency: string;
  clientId: number;
}

const mockDataSource:any = (mockedTransactions: MockTransaction[]) => ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getRepository: () => ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
     findBy: () => mockedTransactions.map(mockTransaction => {
       const transaction = new Transaction();
       return Object.assign(transaction, mockTransaction);
     })
  }),
}) as any;

describe("getTransactionTurnoverThresholdCommission", () => {
  it("should return null for no transactions in the current month", async () => {
    const dataSource = mockDataSource([]);
    const commission = await getTransactionTurnoverThresholdCommission({
      date,
      client,
      ruleConfig: {
        monthlyAmountEurThreshold,
        commissionInEurAfterThreshold,
      },
      dataSource,
    });

    expect(commission).toBeNull();
  });

  it("should return null for previous total transaction amounts less than the monthly discount threshold", async () => {
    const dataSource = mockDataSource([
      {
        id: 1,
        date: '2022-04-06',
        amount: 100,
        currency: 'EUR',
        clientId: 1,
      },
      {
        id: 2,
        date: '2022-04-06',
        amount: 10,
        currency: 'EUR',
        clientId: 1,
      }
    ])
    const commission = await getTransactionTurnoverThresholdCommission({
      date,
      client,
      ruleConfig: {
        monthlyAmountEurThreshold,
        commissionInEurAfterThreshold,
      },
      dataSource,
    });

    expect(commission).toBeNull();
  });

  it("should return the discounted commission for previous total transaction amounts greater than the monthly discount threshold", async () => {
    const dataSource = mockDataSource([
      {
        id: 1,
        date: '2022-04-06',
        amount: 200,
        currency: 'EUR',
        clientId: 1,
      },
      {
        id: 2,
        date: '2022-04-06',
        amount: 500,
        currency: 'EUR',
        clientId: 1,
      }
    ])
    const commission = await getTransactionTurnoverThresholdCommission({
      date,
      client,
      ruleConfig: {
        monthlyAmountEurThreshold,
        commissionInEurAfterThreshold,
      },
      dataSource,
    });

    expect(commission).toEqual(commissionInEurAfterThreshold);
  });
});