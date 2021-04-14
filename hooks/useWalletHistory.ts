import { useCallback } from 'react';

import { useLocalStorage } from './useLocalStorage';
import { InjectedProviders } from '../utils/web3/helpers';
import { AvailableConnectorKeys } from '../utils/web3/connector-instances';

export const useWalletHistory = () => {
  const walletHistoryParseFn = useCallback((valueObj: object) => {
    return Object.entries(valueObj).reduce<WalletHistory>(
      (memo, [key, value]) => {
        const parsedObj = {
          name: value.name,
          connector: value.connector,
          lastUsed: new Date(value.lastUsed),
        };

        memo[key] = parsedObj;
        return memo;
      },
      {},
    );
  }, []);

  const {
    value: walletHistory,
    setValue,
    hasRead,
  } = useLocalStorage<WalletHistory>(
    'wallet_usage_history',
    walletHistoryParseFn,
  );

  const addWalletHistory = useCallback(
    (
      name: AvailableConnectorKeys | InjectedProviders,
      connector: AvailableConnectorKeys,
    ) => {
      const _walletHistory = {
        ...(walletHistory || {}),
        [name]: {
          name,
          connector,
          lastUsed: new Date(),
        },
      };

      setValue(_walletHistory);
    },
    [walletHistory, setValue],
  );

  return {
    walletHistory,
    addWalletHistory,
    hasReadWalletHistory: hasRead,
  };
};

interface WalletHistory {
  [key: string]: {
    name: AvailableConnectorKeys | InjectedProviders;
    connector: AvailableConnectorKeys;
    lastUsed: Date;
  };
}
