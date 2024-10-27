import { useCallback, useRef } from "react";

const useDebounce = () => {
  const schedule = useRef<NodeJS.Timer>();

  return useCallback(
    (callback: (...arg: any) => void, delay: number) =>
      (...arg: any) => {
        clearTimeout(schedule.current);
        schedule.current = setTimeout(() => callback(...arg), delay);
      },
    []
  );
};

export default useDebounce;
