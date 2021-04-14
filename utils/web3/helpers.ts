import { Web3Provider, JsonRpcSigner } from '@ethersproject/providers';
import get from 'lodash/get';

import { ConnectorNames } from './connector-instances';

export enum InjectedProviders {
  Parity = 'PARITY',
  Metamask = 'METAMASK',
  Mist = 'MIST',
  CoinbaseWallet = 'COINBASE_WALLET',
  Cipher = 'CIPHER',
  TrustWallet = 'TRUST_WALLET',
  Opera = 'OPERA',
  ImToken = 'IM_TOKEN',
  Fallback = 'FALLBACK',
}

export const walletNamesMap: { [key: string]: string } = {
  [InjectedProviders.Metamask]: 'MetaMask Wallet',
  [InjectedProviders.CoinbaseWallet]: 'Coinbase Wallet',
  [InjectedProviders.Cipher]: 'Cipher Wallet',
  [InjectedProviders.TrustWallet]: 'Trust Wallet',
  [InjectedProviders.Opera]: 'Opera Wallet',
  [InjectedProviders.ImToken]: 'ImToken Wallet',
  [ConnectorNames.WalletConnect]: 'Wallet Connect Wallet',
  [ConnectorNames.WalletLink]: 'Coinbase Wallet',
};

export declare type Web3ProviderIsh = Web3Provider;

export const getInjectedProviderType = (
  provider: Web3ProviderIsh | undefined,
): InjectedProviders | undefined => {
  if (!provider) {
    return undefined;
  }
  const anyProvider = provider as any;
  if (provider.constructor.name === 'EthereumProvider') {
    return InjectedProviders.Mist;
  } else if (anyProvider.isTrust) {
    return InjectedProviders.TrustWallet;
  } else if (anyProvider.isParity) {
    return InjectedProviders.Parity;
  } else if (anyProvider.isMetaMask) {
    return InjectedProviders.Metamask;
  } else if (anyProvider.isImToken) {
    return InjectedProviders.ImToken;
  } else if (get(window, 'SOFA') !== undefined) {
    return InjectedProviders.CoinbaseWallet;
  } else if (get(window, '__CIPHER__') !== undefined) {
    return InjectedProviders.Cipher;
  }
  return undefined;
};

export function getSigner(
  library: Web3Provider,
  account: string,
): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}

export function getProviderOrSigner(
  library: Web3Provider,
  account?: string | null,
): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library;
}
