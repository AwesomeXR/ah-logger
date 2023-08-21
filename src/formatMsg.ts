import { sprintf } from 'sprintf-js';

export const formatMsg = (fmt: string, ...args: any[]): string => sprintf(fmt, ...args);
