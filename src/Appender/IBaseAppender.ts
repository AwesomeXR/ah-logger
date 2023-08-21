import { ILoggerLevel } from '../ILoggerLevel';

export interface IBaseAppender {
  append(level: ILoggerLevel, msg: string): void;
}
