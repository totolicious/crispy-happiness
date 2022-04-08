import { DataSourceOptions } from "typeorm/data-source/DataSourceOptions";
import { LoggerConfig, WebServerConfig } from "../infrastructure";

import { CommissionConfig } from "../domains/commission/types";
import { CurrencyConvertorConfig } from "../services/currencyConvertor/types";

const isDev = process.env.NODE_ENV !== "production";
const isTest = process.env.NODE_ENV === "test";

export const config: {
  logger: LoggerConfig;
  webServer: WebServerConfig;
  db: DataSourceOptions;
  currencyConvertor: CurrencyConvertorConfig;
  commissions: CommissionConfig;
} = {
  logger: {
    debugEnabled: isDev,
    displayDateTime: !isDev,
    displayFilePath: !isDev,
  },
  webServer: {
    port: process.env.WEBSERVER_PORT ?? isDev ? 9000 : 80,
  },
  db: {
    type: "postgres",
    host: "localhost",
    port: isTest ? 5440: 5439,
    username: "postgres",
    password: "postgres",
    database: isTest ? "crispy_happiness_test" : "crispy_happiness",
    logging: isDev,
  },
  currencyConvertor: {
    endpointBaseURL: "https://api.exchangerate.host/",
  },
  commissions: {
    defaultPercentage: {
      percentage: 0.5,
      minimumAllowedCommissionInEur: 0.05,
    },
    transactionTurnoverDiscount: {
      monthlyAmountEurThreshold: 1000,
      commissionInEurAfterThreshold: 0.3,
    },
  },
};
