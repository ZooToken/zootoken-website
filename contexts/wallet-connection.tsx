import React, { useContext, useState, useEffect } from 'react';

import { useEagerConnect } from '../hooks/useEagerConnect';

interface WallectConnectionState {
  triedEagerConnect: boolean;
}

const DEFAULT_STATE = { triedEagerConnect: false };

const WalletConnectionStateContext = React.createContext<WallectConnectionState>(
  DEFAULT_STATE,
);

export const WalletConnectionProviderState: React.FC = ({ children }) => {
  const [
    walletConnectionState,
    setWalletConnectionState,
  ] = useState<WallectConnectionState>(DEFAULT_STATE);
  // Autoconnect a wallet if we can detect an authorized one
  const triedEagerConnect = useEagerConnect();

  useEffect(() => {
    if (triedEagerConnect) {
      setWalletConnectionState({ triedEagerConnect });
    }
  }, [triedEagerConnect]);

  return (
    <WalletConnectionStateContext.Provider value={walletConnectionState}>
      {children}
    </WalletConnectionStateContext.Provider>
  );
};

export const useWalletConnectionState = (): WallectConnectionState =>
  useContext(WalletConnectionStateContext);
