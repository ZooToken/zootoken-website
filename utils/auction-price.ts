import Decimal from 'decimal.js-light';
import { addHours, isBefore, fromUnixTime } from 'date-fns';

import { ZooMetadata } from '../utils/zoo_contract/ZooLib';

export interface AuctionPriceItem {
  price: Decimal;
  time: Date;
}

export class AuctionPrice {
  private _auctionStartPrice: Decimal;
  private _auctionEndPrice: Decimal;
  private _auctionStartTime: Date;
  private _auctionEndTime: Date;

  constructor(opts: ZooMetadata) {
    this._auctionStartTime = fromUnixTime(opts.auctionStartTime.toNumber());
    this._auctionEndTime = fromUnixTime(opts.auctionEndTime.toNumber());
    this._auctionStartPrice = new Decimal(opts.auctionStartPrice.toString());
    this._auctionEndPrice = new Decimal(opts.auctionEndPrice.toString());
  }

  getPriceForTime(timestamp: Date): Decimal {
    if (timestamp.getTime() >= this._auctionEndTime.getTime()) {
      return this._auctionEndPrice;
    }

    //// Compute price delta
    const minAmount = this._auctionEndPrice;
    const amountDelta = this._auctionStartPrice.sub(minAmount);

    // Compute time delta
    const auctionDurationSeconds = new Decimal(
      (this._auctionEndTime.getTime() - this._auctionStartTime.getTime()) /
        1000,
    );
    const remainingDurationSeconds = new Decimal(
      (this._auctionEndTime.getTime() - timestamp.getTime()) / 1000,
    );

    return minAmount.add(
      remainingDurationSeconds.mul(amountDelta).div(auctionDurationSeconds),
    );
  }

  generateHourlyAuctionPriceSeries(interval: number): AuctionPriceItem[] {
    let prices = [];
    let currentTime = this._auctionStartTime;
    while (isBefore(currentTime, this._auctionEndTime)) {
      const price = this.getPriceForTime(currentTime);
      prices.push({
        price,
        time: currentTime,
      });

      currentTime = addHours(currentTime, interval);
    }

    return prices;
  }
}
