import React, { FC, useEffect, useState, useMemo, useCallback } from 'react';
import type { BigNumber } from '@ethersproject/bignumber';
import { NextPage } from 'next';
import Link from 'next/link';
import { format, compareAsc, fromUnixTime } from 'date-fns';
import { useWeb3React } from '@web3-react/core';
import Decimal from 'decimal.js-light';
import styled, { useTheme } from 'styled-components';
import CountDown from 'react-countdown';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { H1, H2, P } from '../components/Typography';
import { Footer } from '../components/Footer';
import { BaseLink } from '../components/BaseLink';
import { GoldenPrimaryButton } from '../components/Buttons';
import { CRYPTO_VOXELS_ZOO_VISIT_URL } from '../utils/config';
import {
  ZooLib,
  AuctionState,
  ZooMetadata,
  ZooBurnAndRedeemConfirmation,
} from '../utils/zoo_contract/ZooLib';
import { AuctionPrice, AuctionPriceItem } from '../utils/auction-price';
import { routes } from '../utils/routes';
import { useAuctionData } from '../hooks/useAuctionData';

import { ZooToken } from '../components/icons/ZooToken';

interface FormattedPrice {
  price: number;
  time: string;
  isCurrentPrice?: boolean;
}

// TODO(kimpers): typing is weird here
const IconOnlyOnCurrentPrice: FC<any> = (props) => {
  const { cy, cx, payload } = props;

  if (payload.isCurrentPrice) {
    return <ZooToken x={cx! - 20} y={cy! - 20} width={40} height={40} />;
  }
  return null;
};

const ChartWrapper = styled.div`
  width: 100%;
  max-width: 1100px;
`;

const PriceChart: FC<{ data: FormattedPrice[] }> = ({ data }) => {
  return (
    <ChartWrapper>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" stroke="white" />
          <YAxis stroke="white">
            <Label
              value="Price in ETH"
              position="insideLeft"
              angle={-90}
              fill="white"
            />
          </YAxis>
          <Tooltip />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            dot={<IconOnlyOnCurrentPrice />}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

const AuctionPageWrapper = styled.div`
  background: #f6f6ff;
  width: 100%;
`;

const HeaderContainer = styled.div`
  width: 100%;
  min-height: 550px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 10px;
  padding-right: 10px;
`;

const StyledH1 = styled(H1)`
  text-align: center;
  margin-top: 30px;
  font-size: 48px;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin-top: 70px;
    font-size: 30px;
  }
`;

const StyledH2 = styled(H2)`
  color: white;
  text-align: center;
  font-size: 30px;
  margin-bottom: 10px;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    font-size: 24px;
  }
`;
const StyledHeaderP = styled(P)`
  line-height: 21px;
`;

const AuctionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #1f1f41;
  min-height: 514px;
  padding: 0 30px 30px;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    padding: 15px;
  }
`;

const StyledLink = styled(BaseLink)``;

const PrimaryButtonLink = styled(GoldenPrimaryButton)`
  text-decoration: none;
  width: 162px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 30px;
`;

const BuyContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const AuctionPage: NextPage = () => {
  const { account, chainId, library } = useWeb3React();
  const {
    data: { auctionState, auctionMetadata },
    refetchAuctionData,
  } = useAuctionData();
  const [auctionPriceSeries, setAuctionPriceSeries] = useState<
    (AuctionPriceItem & { isCurrentPrice?: boolean })[] | undefined
  >(undefined);
  const [burnAndReedemConfirmation, setBurnAndRedeemConfirmation] = useState<
    ZooBurnAndRedeemConfirmation | undefined
  >(undefined);
  const [accountZooBalance, setAccountZooBalance] = useState<
    BigNumber | undefined
  >(undefined);

  useEffect(() => {
    if (!auctionMetadata || !auctionState) {
      return;
    }

    const auctionPrice = new AuctionPrice(auctionMetadata);

    let series = auctionPrice.generateHourlyAuctionPriceSeries(1);

    if (auctionState.state === 'AUCTION_IN_PROGRESS') {
      series = [
        ...series,
        {
          time: new Date(),
          price: new Decimal(auctionState.currentPrice.toString()),
          isCurrentPrice: true,
        },
      ].sort((a, b) => compareAsc(a.time, b.time));
    }

    setAuctionPriceSeries(series);
  }, [auctionMetadata, setAuctionPriceSeries, auctionState]);

  const zooLib = useMemo(() => {
    if (library === undefined || chainId === undefined) {
      return undefined;
    }

    return new ZooLib(library, chainId, account);
  }, [chainId, account, library]);

  useEffect(() => {
    if (!zooLib || !account) {
      return;
    }

    const fetchAndSetBalance = async () => {
      const balance = await zooLib.getZooBalance();
      if (balance) {
        setAccountZooBalance(balance);
      }
    };

    fetchAndSetBalance().catch((err) => console.error(err));
  }, [zooLib, account]);

  const buyZooCB = useCallback(async () => {
    if (!zooLib) {
      return;
    }

    await zooLib.buy();
  }, [zooLib]);

  const burnAndRedeemCB = useCallback(async () => {
    if (!account) {
      console.error('No ETH account connect, cannot redeem...');
      return;
    }

    if (!zooLib) {
      return;
    }

    const redeemData = await zooLib.redeemAndBurn();
    setBurnAndRedeemConfirmation(redeemData);
  }, [account, zooLib]);

  const formattedPriceSeries = useMemo<FormattedPrice[] | undefined>(
    () =>
      auctionPriceSeries?.map((d) => ({
        price: d.price.div(1e18).toDecimalPlaces(2).toNumber(),
        time: format(d.time, 'MMM do h:mm a'),
        isCurrentPrice: d.isCurrentPrice,
      })),
    [auctionPriceSeries],
  );

  return (
    <>
      <AuctionPageWrapper>
        <HeaderContainer>
          <StyledH1>Own ZOO and be part of NFT history!</StyledH1>

          <StyledHeaderP
            style={{ fontSize: '18px', maxWidth: '650px', marginBottom: '1em' }}
          >
            In a historic NFT first, the world-famous CryptoVoxel’s{' '}
            <StyledLink
              external
              href={CRYPTO_VOXELS_ZOO_VISIT_URL}
              style={{ fontSize: '18px' }}
            >
              Bronx Zoo parcel
            </StyledLink>
            , designed by legendary crypto artist and VR architect,{' '}
            <StyledLink
              external
              href="https://twitter.com/Dat_Ogar"
              style={{ fontSize: '18px' }}
            >
              Ogar
            </StyledLink>
            , will be sold in a trustless dutch auction starting on April 20,
            2021, with a starting price of 100 ETH. Over the next ten days, the
            parcel will decrease in price by 0.1 ETH increments until it sells.
          </StyledHeaderP>

          <StyledHeaderP
            style={{ fontSize: '18px', maxWidth: '650px', marginBottom: '1em' }}
          >
            All proceeds from the sale will be re-distributed to ZOO token
            holders based on the number of ZOO tokens they own. For example, if
            someone owns 1% of the total 10,000 supply of ZOO, and the parcel
            sells for the full price of 100 ETH, they would receive 1 ETH from
            the sale.
          </StyledHeaderP>
          <StyledHeaderP
            style={{ fontSize: '18px', maxWidth: '650px', marginBottom: '1em' }}
          >
            While the future of the Bronx Zoo beyond the auction is uncertain,
            what is certain is that history will be made in this first-ever
            fractionalized CryptoVoxel NFT parcel sale.
            {/* TODO add link to announcemnt here Help us spread the word,
            and we’ll see all you wild things at the auction! */}
          </StyledHeaderP>
        </HeaderContainer>
        <AuctionContainer>
          <StyledH2>The Zoo Auction</StyledH2>
          {!auctionState && (
            <p style={{ color: 'white', fontSize: '18px' }}>loading...</p>
          )}
          {formattedPriceSeries && <PriceChart data={formattedPriceSeries} />}
          <BuyContainer>
            <AuctionStateInfo
              account={account}
              accountZooBalance={accountZooBalance}
              metadata={auctionMetadata}
              auctionState={auctionState}
              buyZooCB={buyZooCB}
              burnAndRedeemCB={burnAndRedeemCB}
              burnAndReedemConfirmation={burnAndReedemConfirmation}
              refetchAuctionData={refetchAuctionData}
            />
          </BuyContainer>
        </AuctionContainer>
      </AuctionPageWrapper>
      <Footer />
    </>
  );
};

const formatBNDate = (unixTime: BigNumber, includeYear = false) =>
  format(
    fromUnixTime(unixTime.toNumber()),
    `MMM do h:mm a${includeYear ? ' yyyy' : ''} `,
  );

interface ActionStateInfoProps {
  auctionState?: AuctionState | null;
  metadata?: ZooMetadata | null;
  account?: string | null;
  accountZooBalance: BigNumber | undefined;
  buyZooCB: () => Promise<void>;
  burnAndRedeemCB: () => Promise<void>;
  burnAndReedemConfirmation: ZooBurnAndRedeemConfirmation | undefined;
  refetchAuctionData: () => void;
}
const AuctionStateInfo: FC<ActionStateInfoProps> = ({
  account,
  accountZooBalance,
  auctionState,
  metadata,
  buyZooCB,
  burnAndRedeemCB,
  burnAndReedemConfirmation,
  refetchAuctionData,
}) => {
  const { fontWeights } = useTheme();
  if (!auctionState || !metadata) {
    return null;
  }

  switch (auctionState.state) {
    case 'AUCTION_NOT_STARTED':
      return (
        <>
          <CountDown
            date={fromUnixTime(auctionState.auctionStartTime.toNumber())}
            zeroPadTime={2}
            onComplete={refetchAuctionData}
            renderer={({ days, hours, minutes, seconds }) => (
              <P
                color="white"
                fontWeight={fontWeights.semiBold}
                style={{ fontSize: '24px' }}
              >
                The Zoo auction starting in {days > 0 ? `${days} days` : ''}{' '}
                {hours} hours {minutes} minutes {seconds} seconds
              </P>
            )}
          />
          <P
            color="white"
            fontWeight={fontWeights.semiBold}
            style={{ marginBottom: '10px', fontSize: '18px' }}
          >
            {formatBNDate(auctionState.auctionStartTime)} to{' '}
            {formatBNDate(metadata.auctionEndTime)}
          </P>
        </>
      );
    case 'AUCTION_IN_PROGRESS':
      const currentPrice = new Decimal(auctionState.currentPrice.toString())
        .div(1e18)
        .toFixed(2);
      return (
        <>
          <P
            color="white"
            fontWeight={fontWeights.semiBold}
            style={{ marginBottom: '10px' }}
          >
            Current price {currentPrice} ETH
          </P>
          {account ? (
            <GoldenPrimaryButton style={{ width: '360px' }} onClick={buyZooCB}>
              Buy the Cryptovoxels ZOO parcel for {currentPrice} ETH
            </GoldenPrimaryButton>
          ) : (
            <Link passHref href={routes.LOGIN}>
              <PrimaryButtonLink as="a" style={{ width: '250px' }}>
                Connect wallet to participate
              </PrimaryButtonLink>
            </Link>
          )}
        </>
      );
    case 'AUCTION_COMPLETE':
      if (burnAndReedemConfirmation) {
        const burnedZooFormatted = new Decimal(
          burnAndReedemConfirmation.amountZooBurned.toString(),
        )
          .div(1e18)
          .toFixed(4);
        const redeemedEthFormatted = new Decimal(
          burnAndReedemConfirmation.amountEthRedeemed.toString(),
        )
          .div(1e18)
          .toFixed(4);

        return (
          <>
            <P
              color="white"
              fontWeight={fontWeights.semiBold}
              style={{ marginBottom: '10px', fontSize: '18px' }}
            >
              Redeeming {burnedZooFormatted} ZOO for {redeemedEthFormatted} ETH
              ⏱ (
              <StyledLink
                style={{ color: 'white' }}
                external
                href={`https://etherscan.io/tx/${burnAndReedemConfirmation.txHash}`}
              >
                See transaction
              </StyledLink>
              )
            </P>
          </>
        );
      } else {
        const soldPriceFormatted = new Decimal(
          auctionState.priceSold.toString(),
        )
          .div(1e18)
          .toFixed(2);

        return (
          <>
            <P
              color="white"
              fontWeight={fontWeights.semiBold}
              style={{ marginBottom: '10px', fontSize: '18px' }}
            >
              The Zoo has been sold for {soldPriceFormatted} ETH 🎉
            </P>
            {accountZooBalance?.gt(0) && (
              <GoldenPrimaryButton
                style={{ width: '250px' }}
                onClick={burnAndRedeemCB}
              >
                Burn ZOO and claim ETH 🔥
              </GoldenPrimaryButton>
            )}
          </>
        );
      }
  }
};

const MemoizedGovernancePage = React.memo(AuctionPage);

export default MemoizedGovernancePage;
