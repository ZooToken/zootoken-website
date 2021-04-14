import { useState, useEffect } from 'react';

/**
 * Dynamically loads a dependency after an optional delay
 * @param loadFn function to execute in order to load the dependency, returns the loaded dependency
 * @param delay how much delay in milliseconds before attempting to load the dependency
 */
export const useDynamicallyLoadDependency = <T>(
  loadFn: () => Promise<T>,
  delay = 0,
) => {
  const [dependency, setDependency] = useState<T | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    setTimeout(async () => {
      try {
        const _dependency = await loadFn();
        setDependency(_dependency);
      } catch (err) {
        setError(err);
      }
    }, delay);
    // Only run this once!
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { dependency, error };
};
