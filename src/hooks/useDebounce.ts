import { useCallback, useRef } from "react";

const useDebounce = <T extends unknown[]>() => {
  const schedule = useRef<NodeJS.Timeout>();

  return useCallback(
    (callback: (...arg: T) => void, delay: number) =>
      (...arg: T) => {
        clearTimeout(schedule.current);
        schedule.current = setTimeout(() => callback(...arg), delay);
      },
    []
  );
};

export default useDebounce;
