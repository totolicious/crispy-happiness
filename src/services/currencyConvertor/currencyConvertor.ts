import fetch from "node-fetch";
import { validateEndpointResponse } from "./validateEndpointResponse";
import { Currency } from "../../domains";
import { CurrencyConvertorConfig } from "./types";

export class CurrencyConvertor {
  private readonly endpointBaseURL: string;

  constructor({ endpointBaseURL }: CurrencyConvertorConfig) {
    this.endpointBaseURL = endpointBaseURL;
  }

  public convertToEur = async ({
    currency,
    amount,
    date,
  }: {
    currency: string;
    amount: number;
    date: string;
  }): Promise<number> => {
    // TODO: validate the date

    // no need to convert from EUR to EUR
    if (currency === Currency.EUR) {
      return amount;
    }

    // TODO: memoize results based on date.
    // Motivation to do this is that the currency api doesn't seem to change
    // even for the current date (today)

    // fetch the conversion rates
    const response = await fetch(`${this.endpointBaseURL}/${date}`);
    const responseBody = await response.json();

    // ensure the endpoint returns expected data
    const validatedResponse = await validateEndpointResponse(responseBody);

    const { rates } = validatedResponse;

    const rate = rates[currency];

    if (!rate) {
      throw new Error(`Currency '${currency}' is not available for conversion`);
    }

    return amount / rate;
  };
}
