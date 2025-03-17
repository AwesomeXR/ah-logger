import { ConsoleAppender, IBaseAppender } from './Appender';
import { formatDate } from './formatDate';
import { GlobalLogLevel } from './GlobalLogLevel';
import { ILoggerLevel, LoggerLevelNameMap } from './ILoggerLevel';
import { sprintf } from 'sprintf-js';

export class Logger {
  constructor(
    readonly name: string,
    public appenders: IBaseAppender[] = [new ConsoleAppender()],

    /**
     * The format string for log messages.
     *
     * - `date`: The date and time of the log message.
     * - `name`: The name of the logger.
     * - `level`: The log level of the message.
     * - `msg`: The message itself.
     *
     * Default: `'[%(date)s|%(name)s|%(level)s] %(msg)s'`
     */
    public fmt = '[%(date)s|%(name)s|%(level)s] %(msg)s'
  ) {}

  // 默认打开所有日志
  protected _selfLogLevel = ILoggerLevel.ALL;

  private _fmtCtx = { date: '', name: '', level: '', msg: '' };

  append(level: ILoggerLevel, fmt: string, ...args: any) {
    // 丢掉低级别日志
    if (level < this.logLevel) return;

    // 加前缀
    const levelLabel = LoggerLevelNameMap.get(level) || level + '';

    this._fmtCtx.date = formatDate('YYYY-MM-DD HH:mm:ss.S');
    this._fmtCtx.name = this.name;
    this._fmtCtx.level = levelLabel;
    this._fmtCtx.msg = sprintf(fmt, ...args);

    // 格式化 msg
    const msg = sprintf(this.fmt, this._fmtCtx);

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
