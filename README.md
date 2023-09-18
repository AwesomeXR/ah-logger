# ah-logger

一个 JS 日志工具。

Feature:

- info、warn、error、debug 四个日志级别
- 可扩展 Appender

## Quick start

```typescript
import { Logger } from 'ah-logger';

const logger = new Logger('APP');
logger.info('info log: %s', 111); // output: `[2022-02-02 10:12:23|APP|INFO] info log: 111`
```
