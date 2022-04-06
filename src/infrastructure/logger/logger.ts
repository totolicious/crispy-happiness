// TODO: this class would be a good place to create a connector for loggers such as Sentry or Winston

import { Logger as TSLogger } from "tslog";

export interface LoggerConfig {
  debugEnabled: boolean;
  displayDateTime: boolean;
  displayFilePath: boolean;
}

export class Logger {
  private readonly debugEnabled: boolean;

  private readonly logger: TSLogger;

  constructor({
    debugEnabled,
    displayDateTime,
    displayFilePath,
  }: LoggerConfig) {
    this.debugEnabled = debugEnabled;
    this.logger = new TSLogger({
      displayDateTime,
      displayFilePath: displayFilePath ? "hideNodeModulesOnly" : "hidden",
      displayFunctionName: false,
    });
  }

  public info(...params: any[]) {
    this.logger.info(...params);
  }

  public error(...params: any[]) {
    this.logger.error(...params);
  }

  public debug(...params: any) {
    if (this.debugEnabled) {
      this.logger.debug(...params);
    }
  }
}
