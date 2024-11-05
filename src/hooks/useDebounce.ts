/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';

function useDebounce(value:any, delay:number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timeout to update the debounced value after a delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup the timeout on each render or value change
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Re-run the effect if the value or delay changes

  return debouncedValue;
}

export default useDebounce;
