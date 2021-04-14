import { useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';

import {
  getConnectorName,
  ConnectorNames,
  AvailableConnectors,
  resetWalletConnect,
  resetWalletLink,
} from '../utils/web3/connector-instances';

const WALLETLINK_LOCAL_STORAGE_KEYS = [
  '-walletlink:https://www.walletlink.org:session:linked',
  '-walletlink:https://www.walletlink.org:session:id',
  '-walletlink:https://www.walletlink.org:session:secret',
  '-walletlink:https://www.walletlink.org:Addresses',
];

const WALLETCONNECT_LOCAL_STORAGE_KEYS = ['walletconnect'];

export const useClearWalletSession = () => {
  const { connector, library, deactivate } = useWeb3React();

  const clearSession = useCallback(async () => {
    if (!connector || !library) {
      return;
    }

    const connectorName = getConnectorName(connector as AvailableConnectors);

    deactivate();

    if (connectorName === ConnectorNames.WalletConnect) {
      for (const key of WALLETCONNECT_LOCAL_STORAGE_KEYS) {
        localStorage.removeItem(key);
      }
      resetWalletConnect();
    } else if (connectorName === ConnectorNames.WalletLink) {
      for (const key of WALLETLINK_LOCAL_STORAGE_KEYS) {
        localStorage.removeItem(key);
      }
      resetWalletLink();
    }
  }, [connector, library, deactivate]);

  return { clearSession };
};
