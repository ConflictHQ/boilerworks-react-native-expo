import { useEffect, useMemo, useRef } from 'react';
import { useCallbackRef } from './useCallbackRef';

export interface UseDebouncedCallbackOptions {
  delay: number;
  flushOnUnmount?: boolean;
  leading?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- generic constraint for any function type, same as Mantine's pattern
export type UseDebouncedCallbackReturnValue<T extends (...args: any[]) => any> =
  ((...args: Parameters<T>) => void) & {
    flush: () => void;
    cancel: () => void;
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- generic constraint for any function type, same as Mantine's pattern
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  options: number | UseDebouncedCallbackOptions
): UseDebouncedCallbackReturnValue<T> {
  const { delay, flushOnUnmount, leading } =
    typeof options === 'number'
      ? { delay: options, flushOnUnmount: false, leading: false }
      : options;

  const handleCallback = useCallbackRef(callback);

  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | 0>(0);

  const lastCallback = useMemo(() => {
    const currentCallback = Object.assign(
      (...args: Parameters<T>) => {
        clearTimeout(debounceTimerRef.current);

        const isFirstCall = currentCallback._isFirstCall;
        currentCallback._isFirstCall = false;

        function clearTimeoutAndLeadingRef() {
          clearTimeout(debounceTimerRef.current);
          debounceTimerRef.current = 0;
          currentCallback._isFirstCall = true;
        }

        if (leading) {
          if (isFirstCall) {
            handleCallback(...args);
          }

          currentCallback.flush = () => {
            if (debounceTimerRef.current !== 0) {
              clearTimeoutAndLeadingRef();
              handleCallback(...args);
            }
          };
          currentCallback.cancel = () => clearTimeoutAndLeadingRef();
          debounceTimerRef.current = setTimeout(
            clearTimeoutAndLeadingRef,
            delay
          );
          return;
        }

        const flush = () => {
          if (debounceTimerRef.current !== 0) {
            clearTimeoutAndLeadingRef();
            handleCallback(...args);
          }
        };

        currentCallback.flush = flush;
        currentCallback.cancel = () => clearTimeoutAndLeadingRef();
        debounceTimerRef.current = setTimeout(flush, delay);
      },
      {
        flush: () => {},
        cancel: () => {},
        _isFirstCall: true,
      }
    );
    return currentCallback;
  }, [handleCallback, delay, leading]);

  useEffect(
    () => () => {
      if (flushOnUnmount) {
        lastCallback.flush();
      } else {
        lastCallback.cancel();
      }
    },
    [lastCallback, flushOnUnmount]
  );

  return lastCallback as UseDebouncedCallbackReturnValue<T>;
}
