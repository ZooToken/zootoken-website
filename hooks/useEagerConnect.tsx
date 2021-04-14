import { useState, useEffect } from 'react';
import compareDesc from 'date-fns/compareDesc';
import { useWeb3React } from '@web3-react/core';
import {
  injected,
  walletconnect,
  connectorsByName,
  walletlink,
} from '../utils/web3/connector-instances';
import { getEagerWalletPreference } from '../utils/preferences';
import { useMounted } from './useMounted';
import { useWalletHistory } from './useWalletHistory';

/**
 * useEagerConnect will try to resume a wallet session
 */
function useEagerConnect() {
  const { activate, active } = useWeb3React();
  const { walletHistory, hasReadWalletHistory } = useWalletHistory();
  // web3react has a race condition mounting too fast, waiting on mounted flag prevents that
  const mounted = useMounted();
  const [tried, setTried] = useState(false);

  useEffect(() => {
    if (!mounted || !hasReadWalletHistory || tried) {
      return;
    }

    const attemptEagerConnect = async () => {
      try {
        // If a preference to skip eager connecting exists, let's skip.
        const preferEagerConnect = await getEagerWalletPreference();
        if (!preferEagerConnect) {
          setTried(true);
          return;
        }
      } catch (e) {
        // noop
      }

      if (walletHistory) {
        const wallets = Object.values(walletHistory).sort((a, b) =>
          compareDesc(a?.lastUsed, b?.lastUsed),
        );

        for (const wallet of wallets) {
          try {
            const connector = connectorsByName[wallet?.connector];
            if (connector) {
              switch (connector) {
                case injected:
                  const isAuthorized = await injected.isAuthorized();
                  if (isAuthorized) {
                    await activate(injected, undefined, true);
                    setTried(true);
                    return;
                  }
                case walletconnect:
                  try {
                    const walletConnectInfoStr = window.localStorage.getItem(
                      'walletconnect',
                    );
                    // No active wallet connect session but we can continue checking other wallets
                    if (!walletConnectInfoStr) {
                      continue;
                    }

                    const walletConnectInfo = JSON.parse(walletConnectInfoStr);
                    if (!walletConnectInfo?.connected) {
                      continue;
                    }
                  } catch (e) {
                    continue;
                  }

                  await activate(walletconnect, undefined, true);
                  setTried(true);
                  return;
                case walletlink:
                  const walletLinkAddress = window.localStorage.getItem(
                    '-walletlink:https://www.walletlink.org:Addresses',
                  );

                  if (!walletLinkAddress) {
                    continue;
                  }

                  await activate(walletlink, undefined, true);
                  setTried(true);
                  return;
              }
            }
          } catch (err) {
            console.log('useEagerConnect:Error', err);
          }
        }
      }

      // Could not connect to a previously connected wallet
      setTried(true);
    };
    attemptEagerConnect();
  }, [activate, mounted, walletHistory, tried, hasReadWalletHistory]); // Try to eagerly connect only once, after mount

  // If the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}

export { useEagerConnect };
