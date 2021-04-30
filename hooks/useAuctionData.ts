import { useState, useMemo, useEffect, useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import { JsonRpcProvider } from '@ethersproject/providers';
import { providers as mcProviders } from '@0xsequence/multicall';

import { getHttpRpcUrl } from '../utils/config';
import {
  ZooLib,
  AuctionState,
  ZooMetadata,
} from '../utils/zoo_contract/ZooLib';
import { useBlockWatcher } from '../contexts/block-watcher';

export interface AuctionData {
  auctionMetadata: ZooMetadata | null;
  auctionState: AuctionState | null;
}

export const useAuctionData = () => {
  const { chainId } = useWeb3React();
  const { blockNumber } = useBlockWatcher();

  const [auctionData, setAuctionData] = useState<AuctionData>({
    auctionMetadata: null,
    auctionState: null,
  });

  const provider = useMemo(
    () =>
      new mcProviders.MulticallProvider(
        new JsonRpcProvider(getHttpRpcUrl(chainId || 1)),
      ),
    [chainId],
  );

  const readZooLib = useMemo(() => {
    if (!provider) {
      return undefined;
    }

    return new ZooLib(provider as any, chainId || 1);
  }, [provider, chainId]);

  const fetchAuctionData = useCallback(() => {
    if (!readZooLib) {
      return;
    }

    const fetchData = async () => {
      const [auctionMetadata, auctionState] = await Promise.all([
        readZooLib.getMetadata(),
        readZooLib.getAuctionState(),
      ]);

      console.log({ auctionMetadata });
      console.log({ auctionState });

      setAuctionData({ auctionMetadata, auctionState });
    };

    fetchData().catch((err) => console.error(err));
  }, [readZooLib]);

  useEffect(fetchAuctionData, [blockNumber, fetchAuctionData]);

  return { data: auctionData, refetchAuctionData: fetchAuctionData };
};
