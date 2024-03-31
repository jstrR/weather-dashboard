import { onCleanup } from "solid-js";

export const useDebounce = <T>(fn: (val: T) => T | Promise<T> | Promise<void>, delay: number) => {
  let timerHandle: NodeJS.Timeout;
  function debouncedSignalSetter(value: Exclude<T, Function>) {
    clearTimeout(timerHandle);
    timerHandle = setTimeout(() => fn(value), delay);
  }
  onCleanup(() => clearInterval(timerHandle));
  return debouncedSignalSetter;
}
