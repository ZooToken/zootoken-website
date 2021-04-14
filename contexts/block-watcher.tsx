import React, { useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { AlchemyProvider } from '@ethersproject/providers';

import {
  getAlchemyRpcKey,
  POLL_BLOCK_NUMBER_INTERVAL_MS,
} from '../utils/config';

export interface BlockWatcherProviderState {
  blockNumber: string | undefined | null;
}

const initialBalancesState: BlockWatcherProviderState = {
  blockNumber: undefined,
};

const BlockWatcherContext = React.createContext<BlockWatcherProviderState>(
  initialBalancesState,
);

/**
 * Right now, all this provider does is watch the blockchain to see when we get a new block
 */
const BlockWatcherProvider: React.FC = ({ children }) => {
  const { chainId } = useWeb3React();

  // Set up block listener
  const [blockNumber, setBlockNumber] = React.useState<
    undefined | null | string
  >();
  React.useEffect(() => {
    const alchemyProvider = new AlchemyProvider(
      chainId ?? 1,
      getAlchemyRpcKey(chainId),
    );
    let stale = false;
    const getBlockNumber = () =>
      alchemyProvider
        .getBlockNumber()
        .then((blockNumber: number) => {
          if (!stale) {
            setBlockNumber(blockNumber.toString());
          }
        })
        .catch(() => {
          if (!stale) {
            setBlockNumber(null);
          }
        });
    const pollBlockInterval = setInterval(
      getBlockNumber,
      POLL_BLOCK_NUMBER_INTERVAL_MS,
    );
    return () => {
      stale = true;
      clearInterval(pollBlockInterval);
      setBlockNumber(undefined);
    };
  }, [chainId]);

  const val = useMemo(() => {
    return {
      blockNumber,
    };
  }, [blockNumber]);

  return (
    <BlockWatcherContext.Provider value={val}>
      {children}
    </BlockWatcherContext.Provider>
  );
};

const useBlockWatcher = (): BlockWatcherProviderState => {
  return React.useContext(BlockWatcherContext);
};

export { BlockWatcherProvider, useBlockWatcher };
