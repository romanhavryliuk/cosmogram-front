'use client';

import { useEffect, useState } from 'react';

/**
 * Віддає значення із затримкою — щоб автокомпліт місця народження
 * не смикав API на кожну літеру.
 */
export const useDebounce = <T,>(value: T, delay = 400): T => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
};
