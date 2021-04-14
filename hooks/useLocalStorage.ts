import { useEffect, useCallback, useState } from 'react';
export const useLocalStorage = <T>(
  key: string,
  parseFn?: (value: any) => T,
) => {
  const [value, _setValue] = useState<T | undefined>(undefined);
  const [hasRead, setHasRead] = useState<boolean>(false);

  useEffect(() => {
    try {
      const rawValue = localStorage.getItem(key);
      if (!rawValue) {
        _setValue(undefined);
        setHasRead(true);
        return;
      }

      let _value = JSON.parse(rawValue);
      if (parseFn) {
        _value = parseFn(_value);
      }

      _setValue(_value);
      setHasRead(true);
    } catch (err) {
      console.error('useLocalStorage:Read:Error', err);
      _setValue(undefined);
      setHasRead(true);
    }
  }, [key, parseFn]);

  const setValue = useCallback(
    (value: T | undefined) => {
      try {
        if (value === undefined) {
          _setValue(undefined);
          localStorage.removeItem(key);
        }

        _setValue(value);

        const valueStr = JSON.stringify(value);
        // Let render finish before doing this slow synchronous operation
        setTimeout(() => {
          try {
            localStorage.setItem(key, valueStr);
          } catch (err) {
            console.error('useLocalStorage:Write:Error', err);
            _setValue(undefined);
          }
        });
      } catch (err) {
        console.error('useLocalStorage:Write:Error', err);
        _setValue(undefined);
      }
    },
    [key],
  );

  return { value, setValue, hasRead };
};
