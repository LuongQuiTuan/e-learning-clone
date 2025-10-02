import { debounce } from 'lodash';
import { useEffect, useState, useMemo } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  // Memoize the debounced setter function so it persists across renders
  const debouncedSet = useMemo(() => debounce(setDebouncedValue, delay), [delay]);

  useEffect(() => {
    debouncedSet(value);
  }, [value, debouncedSet]);

  // Cleanup on unmount: cancel any pending debounced calls
  useEffect(() => {
    return () => {
      debouncedSet.cancel();
    };
  }, [debouncedSet]);

  return debouncedValue;
}
