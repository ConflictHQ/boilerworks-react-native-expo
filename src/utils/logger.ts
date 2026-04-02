import { IS_DEV } from '@/constants/env';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LogArgs = any[];

export const logger = {
  log: (...args: LogArgs): void => {
    if (IS_DEV) console.log(...args);
  },
  warn: (...args: LogArgs): void => {
    if (IS_DEV) console.warn(...args);
  },
  error: (...args: LogArgs): void => {
    if (IS_DEV) console.error(...args);
  },
  debug: (...args: LogArgs): void => {
    if (IS_DEV) console.debug(...args);
  },
};
