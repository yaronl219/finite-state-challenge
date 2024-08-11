import { useEffect, useMemo, useState } from 'react';
import { makeDebounce } from '../utils/debounce';

export function useDebounce<T>(val: T, ms: number): T {
  const debounce = useMemo(makeDebounce, []);
  const [debouncedValue, setDebouncedValue] = useState<T>(val);

  useEffect(() => {
    debounce(() => {
      setDebouncedValue(val);
    }, ms);
  }, [val, debounce, ms]);

  return debouncedValue;
}
