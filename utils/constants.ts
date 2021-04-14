import { Decimal } from 'decimal.js-light';

export const BASE_TEN = 10;

export const ZERO = new Decimal(0);

export const MAX_APPROVAL = new Decimal(2).pow(256).minus(1);

export const GWEI_IN_WEI = new Decimal(1000000000);
