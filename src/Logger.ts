import { ConsoleAppender, IBaseAppender } from './Appender';
import { formatDate } from './formatDate';
import { GlobalLogLevel } from './GlobalLogLevel';
import { ILoggerLevel, LoggerLevelNameMap } from './ILoggerLevel';
import { formatMsg } from './formatMsg';

export class Logger {
  constructor(
    readonly name: string,
    protected appenders: IBaseAppender[] = [new ConsoleAppender()]
  ) {}

  // 默认打开所有日志
  protected _selfLogLevel = ILoggerLevel.ALL;

  append(level: ILoggerLevel, fmt: string, ...args: any) {
    // 丢掉低级别日志
    if (level < this.logLevel) return;

    // 加前缀
    const levelLabel = LoggerLevelNameMap.get(level) || level + '';
    fmt = `[${formatDate('YYYY-MM-DD HH:mm:ss.S')}|${this.name}|${levelLabel}]` + ' ' + fmt;

    // 格式化 msg
    const msg = formatMsg(fmt, ...args);

    for (let i = 0; i < this.appenders.length; i++) {
      const appender = this.appenders[i];
      appender.append(level, msg);
    }
  }

  extend(subName: string): Logger {
    return new Logger([this.name, subName].join('.'), this.appenders.concat());
  }

  get logLevel(): ILoggerLevel {
    return GlobalLogLevel ?? this._selfLogLevel;
  }

  set logLevel(v: ILoggerLevel) {
    this._selfLogLevel = v;
  }

  info(fmt: string, ...args: any) {
    this.append(ILoggerLevel.INFO, fmt, ...args);
  }

  warn(fmt: string, ...args: any) {
    this.append(ILoggerLevel.WARN, fmt, ...args);
  }

  error(fmt: string, ...args: any) {
    this.append(ILoggerLevel.ERROR, fmt, ...args);
  }

  debug(fmt: string, ...args: any) {
    this.append(ILoggerLevel.DEBUG, fmt, ...args);
  }
}
