import { Web3Provider } from '@ethersproject/providers';
import { BigNumber } from '@ethersproject/bignumber';
import { ZooToken__factory } from '.';

import { ZooToken } from './ZooToken';
import { getProviderOrSigner } from '../../utils/web3/helpers';

// I cant get gas estimation to work with Ethers, so I calculated gas estimated based on prev
// transaction: https://etherscan.io/tx/0x00fcf777530b153c244e9096f937fe6af6e6928c174f36cc231ef2b149d06c9a
const BUY_GAS_LIMIT = BigNumber.from(200_000);

const CONTRACT_ADDRESSES: { [key: number]: string } = {
  1: '0x1af39b291fCD158ADe7b85D83f1044D02AB8D6C2',
  //3: '0xFFa66eB8Eeb161901458305C2cd7c9fDfBdB3f65',
  3: '0xEAf7e0c3Df32102095392152719906a61BdE6472',
};

export interface ZooMetadata {
  cryptoVoxelsContract: string;
  cryptoVoxelsParcelId: BigNumber;
  auctionStartPrice: BigNumber;
  auctionEndPrice: BigNumber;
  auctionStartTime: BigNumber;
  auctionEndTime: BigNumber;
  initialSupply: BigNumber;
  hasBeenMinted: boolean;
  hasParcelBeenPurchased: boolean;
  parcelPurchasedPrice: BigNumber;
}

interface AuctionNotStarted {
  state: 'AUCTION_NOT_STARTED';
  auctionStartTime: BigNumber;
}

interface AuctionRunning {
  state: 'AUCTION_IN_PROGRESS';
  currentPrice: BigNumber;
  auctionEndTime: BigNumber;
}

interface AuctionComplete {
  state: 'AUCTION_COMPLETE';
  priceSold: BigNumber;
}

export type AuctionState = AuctionComplete | AuctionNotStarted | AuctionRunning;

export interface ZooBurnAndRedeemConfirmation {
  txHash: string;
  amountZooBurned: BigNumber;
  amountEthRedeemed: BigNumber;
}

export class ZooLib {
  protected readonly _contract: ZooToken;
  protected readonly _account: string | undefined;
  constructor(
    library: Web3Provider,
    chainId: number,
    account?: string | undefined | null,
  ) {
    const contractAddress = CONTRACT_ADDRESSES[chainId];
    if (!contractAddress) {
      throw new Error(`Chain ID ${chainId} is unsupported`);
    }

    this._contract = ZooToken__factory.connect(
      contractAddress,
      getProviderOrSigner(library, account) as any,
    );

    if (account) {
      this._account = account;
    }
  }

  public async buy(): Promise<string> {
    const auction = await this.getAuctionState();
    if (auction.state !== 'AUCTION_IN_PROGRESS') {
      throw new Error('Auction not in progress');
    }
    const txData = {
      value: auction.currentPrice,
      gasLimit: BUY_GAS_LIMIT,
    };

    const tx = await this._contract.buy(txData);

    return tx.hash;
  }

  public async getAuctionState(): Promise<AuctionState> {
    const {
      auctionEndTime,
      auctionStartTime,
      parcelPurchasedPrice,
      hasParcelBeenPurchased,
    } = await this.getMetadata();
    const now = Math.floor(new Date().getTime() / 1000);
    if (auctionStartTime.gt(now)) {
      return {
        state: 'AUCTION_NOT_STARTED',
        auctionStartTime,
      };
    } else if (hasParcelBeenPurchased) {
      return {
        state: 'AUCTION_COMPLETE',
        priceSold: parcelPurchasedPrice,
      };
    }
    const currentPrice = await this._contract.getPrice();
    return {
      state: 'AUCTION_IN_PROGRESS',
      auctionEndTime,
      currentPrice,
    };
  }

  public async getZooBalance(): Promise<BigNumber | undefined> {
    if (!this._account) {
      return undefined;
    }

    const zooBalance: BigNumber = await this._contract.balanceOf(this._account);

    return zooBalance;
  }

  public async getAuctionProceedsShareInEth(): Promise<BigNumber> {
    if (!this._account) {
      return BigNumber.from('0');
    }

    const [zooBalance, metadata, totalSupply] = await Promise.all([
      this.getZooBalance().then((balance) => balance || BigNumber.from(0)),
      this.getMetadata(),
      this._contract.totalSupply() as Promise<BigNumber>,
    ]);

    if (!metadata.hasParcelBeenPurchased) {
      return BigNumber.from(0);
    }

    const fractionOfTotalZoo = zooBalance.div(totalSupply);

    return fractionOfTotalZoo.mul(metadata.parcelPurchasedPrice);
  }

  public async redeemAndBurn(): Promise<ZooBurnAndRedeemConfirmation> {
    const auction = await this.getAuctionState();
    if (auction.state !== 'AUCTION_COMPLETE') {
      throw new Error('Auction has not concluded');
    }

    const [zooBalance, auctionProceedsShareInEth] = await Promise.all([
      this.getZooBalance(),
      this.getAuctionProceedsShareInEth(),
    ]);

    if (!zooBalance) {
      throw new Error('Account not connected');
    }

    if (zooBalance.eq(0)) {
      throw new Error('Account holds 0 ZooToken cannot redeem');
    }

    const tx = await this._contract.burnAndRedeem();

    return {
      txHash: tx.hash,
      amountZooBurned: zooBalance,
      amountEthRedeemed: auctionProceedsShareInEth,
    };
  }

  public async getMetadata(): Promise<ZooMetadata> {
    const [
      cryptoVoxelsContract,
      cryptoVoxelsParcelId,
      auctionStartPrice,
      auctionEndPrice,
      auctionStartTime,
      auctionEndTime,
      initialSupply,
      hasBeenMinted,
      hasParcelBeenPurchased,
      parcelPurchasedPrice,
    ] = await this._contract.getMetadata();
    return {
      cryptoVoxelsContract,
      cryptoVoxelsParcelId,
      auctionStartPrice,
      auctionEndPrice,
      auctionStartTime,
      auctionEndTime,
      initialSupply,
      hasBeenMinted,
      hasParcelBeenPurchased,
      parcelPurchasedPrice,
    };
  }
}
