import { useEffect, useState } from 'react';
import { AlchemyWeb3 } from '@alch/alchemy-web3';
import { DEFER_MODULES_TIMINGS } from '../utils/config';

/**
 * useAlchemyWeb3 offers an extremely high-performance read-only RPC
 * and includes special methods for common read operations that are very fast
 * https://docs.alchemyapi.io/docs/enhanced-api
 *
 * @param alchemyUrl The HTTP or WSS url for the alchemy instance
 */
const useAlchemyWeb3 = (
  alchemyUrl: string,
  deferLoadingTimeout = DEFER_MODULES_TIMINGS.ALCHEMY_RPC,
) => {
  const [alchemyWeb3Instance, setAlchemyWeb3Instance] = useState<
    AlchemyWeb3 | undefined
  >();

  useEffect(() => {
    const lazyCreateAlchemy = async () => {
      const { createAlchemyWeb3 } = await import('@alch/alchemy-web3');
      setAlchemyWeb3Instance(createAlchemyWeb3(alchemyUrl));
    };

    // Defer loading of alchemy until the everything else has loaded
    // Once loaded, everything depending on the alchemy hookx should declaratively refresh
    setTimeout(() => {
      lazyCreateAlchemy();
    }, deferLoadingTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alchemyUrl]);
  return alchemyWeb3Instance;
};

export { useAlchemyWeb3 };
