import { ILoggerLevel } from './ILoggerLevel';

// 全局日志级别
export let GlobalLogLevel: ILoggerLevel | undefined;

export const setGlobalLogLevel = (level: ILoggerLevel) => {
  GlobalLogLevel = level;
};

export const getGlobalLogLevel = () => GlobalLogLevel;
