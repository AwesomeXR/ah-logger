import { ILoggerLevel } from '../ILoggerLevel';
import { IBaseAppender } from './IBaseAppender';

/** console log appender */
export class ConsoleAppender implements IBaseAppender {
  append(level: ILoggerLevel, msg: string): void {
    if (level === ILoggerLevel.ERROR) console.error(msg);
    else if (level === ILoggerLevel.INFO) console.info(msg);
    else if (level === ILoggerLevel.WARN) console.warn(msg);
    else console.info(msg);
  }
}
