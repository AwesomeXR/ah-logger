// eslint-disable-next-line
export enum ILoggerLevel {
  ALL = 0,
  DEBUG,
  INFO,
  WARN,
  ERROR,
}

export const LoggerLevelNameMap = new Map<ILoggerLevel, keyof typeof ILoggerLevel>(
  Object.keys(ILoggerLevel).map(k => [(ILoggerLevel as any)[k], k as any])
);
