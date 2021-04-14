import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useMemo,
} from 'react';
import { useClickAway, useCopyToClipboard } from 'react-use';
import styled from 'styled-components';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector';
import { useInactiveListener } from '../hooks/useInactiveListener';
import { useDetectMobile } from '../hooks/useDetectMobile';
import { useWalletHistory } from '../hooks/useWalletHistory';
import {
  injected,
  walletconnect,
  walletlink,
  AvailableConnectors,
  AvailableConnectorKeys,
  ConnectorNames,
  getConnectorName,
  resetWalletConnect,
  resetWalletLink,
} from '../utils/web3/connector-instances';
import { reenableEagerWalletConnectPreferenceIfDisabled } from '../utils/preferences';
import {
  getInjectedProviderType,
  InjectedProviders,
} from '../utils/web3/helpers';

import { MetaMaskIcon } from '../components/icons/MetaMask';
import { ThickSpinnerIcon } from '../components/icons/Spinner';
import { CoinbaseWalletIcon } from '../components/icons/CoinbaseWallet';
import { WalletConnectIcon } from '../components/icons/WalletConnect';
import { TrustWalletIcon } from '../components/icons/TrustWallet';

const StyledWalletButton = styled.button`
  background-color: ${(props) => props.theme.palette.white};
  border: 1px solid ${(props) => props.theme.palette.mutedPurple};
  box-sizing: border-box;
  border-radius: 6px;
  width: 320px;
  height: 52px;
  outline: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.18s ease-in;
  user-select: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
  will-change: transform, box-shadow, border;

  & + & {
    margin-top: 20px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    & + & {
      margin-top: 12px;
    }
  }

  & > span {
    font-family: 'Khula';
    font-weight: ${(props) => props.theme.fontWeights.semiBold};
    font-size: 16px;
    line-height: 140%;
    color: #1f1f41;
  }

  :active {
    transform: scale(0.98);
  }

  :hover {
    transform: scale(0.98), translateY(-2px);
    border: 1px solid #cdd2ea;
    box-shadow: 0px 5px 12px rgba(31, 31, 65, 0.08);
  }
`;

const IconWrapper = styled.div`
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 24px 0 16px;
`;

const WalletButton: React.FC<WalletButtonProps> = ({
  icon,
  confirmingIcon,
  walletName,
  isConfirming,
  onClick,
}) => {
  return (
    <StyledWalletButton onClick={onClick}>
      {isConfirming ? (
        <>
          <IconWrapper>{confirmingIcon}</IconWrapper>
          <span>Confirm in {walletName}</span>
        </>
      ) : (
        <>
          <IconWrapper>{icon}</IconWrapper>
          <span>Connect {walletName}</span>
        </>
      )}
    </StyledWalletButton>
  );
};

const Flex = styled.div`
  display: flex;
  flex-direction: row;
`;

const FlexColumn = styled(Flex)`
  flex-direction: column;
`;

const MenuWrapper = styled(FlexColumn)<EmbeddedProps>`
  align-items: center;
  margin: ${(props) => !props.isEmbedded && 'auto'};
`;

const WalletsContainer = styled(Flex)<EmbeddedProps>`
  margin: auto;
  justify-content: center;
  margin-top: ${(props) => (props.isEmbedded ? '0' : '20px')};
  margin-bottom: ${(props) => (props.isEmbedded ? '0' : '100px')};

  flex-wrap: wrap;
  flex-direction: ${(props) => (props.isEmbedded ? 'column' : 'row')};

  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    flex-direction: column;
    margin-top: 0;
  }
`;

const WalletGroup = styled(FlexColumn)<EmbeddedProps>`
  justify-content: center;
`;

const ErrorMessage = styled.p`
  font-family: 'Khula';
  font-weight: ${(props) => props.theme.fontWeights.medium};
  font-size: 18px;
  color: #ff656d;
  background: rgba(255, 101, 109, 0.15);
  border-radius: 6px;
  padding: 15px;
`;

const ErrorMessageContainer = styled.div<{ isEmbedded?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => (props.isEmbedded ? 'inherit' : '60px')};
  max-height: 60px;
  max-width: 600px;
  margin: 0 auto ${(props) => (props.isEmbedded ? '20px' : '0px')};
  text-align: center;

  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    max-width: 320px;
    margin-bottom: ${(props) => !props.isEmbedded && '10px'};
  }
`;

function getErrorMessage(error: Error) {
  if (error instanceof NoEthereumProviderError) {
    return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.';
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network.";
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect
  ) {
    return 'Please authorize this website to access your Ethereum account.';
  } else {
    console.error(error);
    return 'An unknown error occurred. Check the console for more details.';
  }
}

const ConnectWalletMenu: React.FC<ConnectWalletMenuProps> = ({
  isEmbedded,
  errorMessage,
  onLogin,
}) => {
  const { activate, setError, error } = useWeb3React();
  const { addWalletHistory } = useWalletHistory();
  const [, copyToClipboard] = useCopyToClipboard();

  const [hasCopiedToClipboard, setHasCopiedToClipboard] = useState<boolean>(
    false,
  );

  // Keep track of web3 connection in progress
  const [activatingConnector, setActivatingConnector] = React.useState<
    AvailableConnectors | undefined
  >();

  // Handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!!activatingConnector);

  // Try to identify the injected provider on mount
  const [injectProviderType, setInjectedProviderType] = useState<
    InjectedProviders | undefined
  >(undefined);
  useEffect(() => {
    const getProviderType = async () => {
      const _provider = await injected.getProvider();
      const _providerType = getInjectedProviderType(_provider);
      if (_providerType) {
        setInjectedProviderType(_providerType);
      }
    };

    getProviderType().catch((e) => {
      console.error(e);
      setInjectedProviderType(undefined);
    });
  }, []);

  // Check if we are authorized to use the injected provider
  // activatingConnector === injected && !isAuthorized === true means they need to click the connect button in MM
  const [
    isInjectedProviderAuthorized,
    setIsInjectedProviderAuthorized,
  ] = useState<boolean>(false);
  useEffect(() => {
    const checkAuthorization = async () => {
      if (injected) {
        const isAuthorized = await injected.isAuthorized();
        setIsInjectedProviderAuthorized(isAuthorized);
      }
    };

    checkAuthorization().catch((err) => {
      console.error(err);
    });
  }, [activatingConnector]);

  const handleWeb3Activation = useCallback(
    async (connector: AvailableConnectors) => {
      setActivatingConnector(connector);
      reenableEagerWalletConnectPreferenceIfDisabled();

      const connectorName = getConnectorName(connector);
      let walletName:
        | AvailableConnectorKeys
        | InjectedProviders
        | undefined = connectorName;

      if (connectorName === ConnectorNames.Injected && injectProviderType) {
        walletName = injectProviderType;
      }

      await activate(connector, undefined, true)
        .then(() => {
          setActivatingConnector(undefined);

          if (walletName && connectorName) {
            addWalletHistory(walletName, connectorName);
          }

          if (onLogin) {
            onLogin();
          }
        })
        .catch((err) => {
          setError(err);
          setActivatingConnector(undefined);
          // Reset connectors otherwise they can get stuck in an invalid state
          // e.g. user closes the modal, connector is instantiated but not connected
          if (walletName === ConnectorNames.WalletLink) {
            resetWalletLink();
          } else if (walletName === ConnectorNames.WalletConnect) {
            resetWalletConnect();
          }
        });
    },
    [activate, injectProviderType, addWalletHistory, setError, onLogin],
  );

  const handleConnectOnclick = useMemo(
    () => ({
      [ConnectorNames.Injected]: () => handleWeb3Activation(injected),
      [ConnectorNames.WalletLink]: () => handleWeb3Activation(walletlink),
      [ConnectorNames.WalletConnect]: () => handleWeb3Activation(walletconnect),
    }),
    [handleWeb3Activation],
  );

  const isMobile = useDetectMobile();
  const menuWrapperRef = useRef<HTMLDivElement>(null);
  useClickAway(menuWrapperRef, () => {
    // Clicking outside of the menu should hide dialog on mobile
    if (onLogin && isMobile) {
      onLogin();
    }
  });

  const handleCopyToClipboard = useCallback(() => {
    const url = location.href;
    copyToClipboard(url);

    setHasCopiedToClipboard(true);
  }, [copyToClipboard]);

  useEffect(() => {
    let stale = false;

    setTimeout(() => {
      if (!stale) {
        setHasCopiedToClipboard(false);
      }
    }, 5000);

    return () => {
      stale = true;
    };
  }, [hasCopiedToClipboard]);

  return (
    <MenuWrapper isEmbedded={isEmbedded} ref={menuWrapperRef}>
      <ErrorMessageContainer isEmbedded={isEmbedded}>
        {error ? (
          <ErrorMessage>{getErrorMessage(error)}</ErrorMessage>
        ) : (
          errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>
        )}
      </ErrorMessageContainer>
      <WalletsContainer isEmbedded={isEmbedded}>
        <WalletGroup isEmbedded={isEmbedded}>
          {injectProviderType === InjectedProviders.Metamask && (
            <WalletButton
              walletName="MetaMask"
              isConfirming={
                !isInjectedProviderAuthorized &&
                activatingConnector === injected
              }
              icon={<MetaMaskIcon />}
              confirmingIcon={<ThickSpinnerIcon />}
              onClick={handleConnectOnclick.Injected}
            />
          )}
          {injectProviderType === InjectedProviders.TrustWallet && (
            <WalletButton
              walletName="Trust Wallet"
              icon={<TrustWalletIcon />}
              onClick={handleConnectOnclick.Injected}
            />
          )}
          {injectProviderType === InjectedProviders.CoinbaseWallet && (
            <WalletButton
              walletName="Coinbase Wallet"
              icon={<CoinbaseWalletIcon />}
              onClick={handleConnectOnclick.Injected}
            />
          )}
          <WalletButton
            walletName="mobile wallet"
            icon={<WalletConnectIcon />}
            onClick={handleConnectOnclick.WalletConnect}
          />
          {isMobile === false && (
            <WalletButton
              walletName="Coinbase Wallet"
              icon={<CoinbaseWalletIcon />}
              onClick={handleConnectOnclick.WalletLink}
            />
          )}
          {isMobile === true && (
            <StyledWalletButton
              onClick={handleCopyToClipboard}
              style={{ justifyContent: 'center' }}
            >
              <span style={{ color: '#7578B5' }}>
                {hasCopiedToClipboard ? 'Copied...' : 'Copy this URL'}
              </span>
            </StyledWalletButton>
          )}
        </WalletGroup>
      </WalletsContainer>
    </MenuWrapper>
  );
};

const MemoizedConnectWalletMenu = React.memo(ConnectWalletMenu);

export { MemoizedConnectWalletMenu as ConnectWalletMenu };

interface ConnectWalletMenuProps {
  isEmbedded?: boolean;
  onLogin?: () => void;
  errorMessage?: string;
}

interface EmbeddedProps {
  isEmbedded?: boolean;
}

interface WalletButtonProps {
  walletName: string;
  isConfirming?: boolean;
  icon?: React.ReactNode;
  confirmingIcon?: React.ReactNode;
  onClick?: () => void;
}
