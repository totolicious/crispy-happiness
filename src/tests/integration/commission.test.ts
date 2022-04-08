import { DataSource } from "typeorm";
import fetch from "node-fetch";
import { initApp, WebServer } from "../../infrastructure";
import { Client, Currency } from "../../domains";

let webServer: WebServer;
let dataSource: DataSource;

const postTransaction = async ({
  amount,
  date,
  client_id,
  currency
}: {
  amount: number;
  date: string;
  client_id: number;
  currency: Currency;
}) => {
  const response = await fetch('http://localhost:9000/transactions/commission', {
    method: 'POST',
    body: JSON.stringify({
      amount,
      date,
      client_id,
      currency
    }),
    headers: {'Content-Type': 'application/json'}
  });
  return {
    status: response.status,
    body: await response.json(),
  }
}


beforeAll(async () => {
  ({webServer, dataSource} = await initApp());
});

afterAll(async () => {
  await webServer.stop();
})

beforeEach(async () => {
  await dataSource.synchronize(true);
});

describe("commission endpoint integration", () => {
  it("should respond with a 400 status code for an inexistent client", async () => {
    const response = await postTransaction({
      amount: 100,
      currency: Currency.EUR,
      client_id: 2,
      date: '2022-04-06',
    });

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({
      error: {
        name: "ValidationError",
        message: "Client does not exist"
      },
      commission: null
    });
  });

  it("should respond with a 400 status code for missing input properties", async () => {
    const response = await postTransaction({
      amount: 100,
      client_id: 2,
      date: '2022-04-06',
    } as any);

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({
      error: {
        name: "ValidationError",
        message: "the 'currency' property is required"
      },
      commission: null
    });
  });

  it("should respond with a 200 status code and calculated EUR commission", async () => {
    const client = new Client();
    await dataSource.getRepository(Client).save(client);

    const response = await postTransaction({
      amount: 100,
      client_id: client.id,
      date: '2022-04-06',
      currency: Currency.RON,
    });

    expect(response.status).toEqual(200);
    expect(response.body).not.toBeFalsy();
    expect(response.body.error).toBeNull();
    expect(response.body.commission).not.toBeFalsy();
    expect(response.body.commission.currency).toEqual(Currency.EUR);
    expect(response.body.commission.amount).toBeGreaterThan(0);
  });
});