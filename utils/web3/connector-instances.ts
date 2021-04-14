import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import {
  RPC_POLLING_INTERVAL,
  ALCHEMY_RPC_URL_MAINNET_HTTP,
  WEB3_APP_DISPLAY_NAME,
  SUPPORTED_CHAIN_IDS,
} from '../config';

export enum ConnectorNames {
  Injected = 'Injected',
  WalletConnect = 'WalletConnect',
  WalletLink = 'WalletLink',
}

export const injected = new InjectedConnector({
  supportedChainIds: SUPPORTED_CHAIN_IDS,
});

const newWalletConnect = () =>
  new WalletConnectConnector({
    // Note(albrow): WalletConnect only supports one RPC endpoint at a time;
    // you can't pass in multiple. See https://github.com/NoahZinsmeister/web3-react/blob/7383e11dc670ccf35d6aadafbfbabcbcd87191ff/packages/walletconnect-connector/src/index.ts#L31
    rpc: { 1: ALCHEMY_RPC_URL_MAINNET_HTTP },
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true,
    pollingInterval: RPC_POLLING_INTERVAL,
  });
export let walletconnect = newWalletConnect();
export const resetWalletConnect = () => {
  walletconnect = newWalletConnect();
};

const newWalletLink = () =>
  new WalletLinkConnector({
    url: ALCHEMY_RPC_URL_MAINNET_HTTP,
    appName: WEB3_APP_DISPLAY_NAME,
  });
export let walletlink = newWalletLink();
export const resetWalletLink = () => {
  walletlink = newWalletLink();
};

export type AvailableConnectorKeys =
  | 'Injected'
  | 'WalletConnect'
  | 'WalletLink';

export type AvailableConnectors =
  | InjectedConnector
  | WalletConnectConnector
  | WalletLinkConnector;

export type AvailableConnectorsMap = {
  [key in AvailableConnectorKeys]: AvailableConnectors;
};

export const connectorsByName: AvailableConnectorsMap = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.WalletLink]: walletlink,
};

export const getConnectorName = (
  connector: AvailableConnectors,
): ConnectorNames | undefined => {
  switch (connector) {
    case injected:
      return ConnectorNames.Injected;
    case walletconnect:
      return ConnectorNames.WalletConnect;
    case walletlink:
      return ConnectorNames.WalletLink;
    default:
      return undefined;
  }
};
