import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { ZOOTOKEN_CONTRACT_ETHERSCAN_URL } from '../utils/config';
import { H3, P } from '../components/Typography';
import { PrimaryButtonLink } from '../components/Buttons';
import { hexToRGBA } from '../utils/styles';
import { BaseLink } from '../components/BaseLink';

import { routes } from '../utils/routes';

const PageFooter = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 342px;
  background: #e3f0ff;
`;

const FooterBottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #bdc5e8;
  margin-bottom: 10px;
  padding-top: 7px;
  padding-bottom: 10px;

  span,
  a {
    font-family: 'Khula';
    font-weight: ${(props) => props.theme.fontWeights.semiBold};
    font-size: 12px;
    line-height: 14px;
    text-align: center;
  }
  span {
    color: #7578b5;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    padding-top: 10px;
    margin: 0 15px 15px;
  }
`;

// Duplicated
const Column = styled.div<{ hasBottomPadding?: boolean }>`
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;

  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    padding-bottom: ${(props) => props.hasBottomPadding && '56px'};
  }
`;

const ColumnWithMargin = styled(Column)`
  margin: 56px 0 56px;
`;
const SplitLayout = styled.div<{
  isNoMobilePadding?: boolean;
}>`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;

  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    flex-direction: column-reverse;
    padding: ${(props) => !props.isNoMobilePadding && '15px'};

    ${ColumnWithMargin} {
      margin-top: 56px;
    }
  }
`;

const H3WithMobileMargin = styled(H3)`
  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    margin-top: 20px;
  }
`;

const StyledP = styled(P)`
  font-weight: ${(props) => props.theme.fontWeights.medium};
  font-size: 17px;
  line-height: 140%;
`;

const DisclaimerText = styled(StyledP)`
  font-size: 14px;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 10px;
  color: rgba(${(props) => hexToRGBA(props.theme.colors.primaryText, 0.5)});
`;

const StyledLink = styled(BaseLink)``;

export const Footer: React.FC = () => {
  const router = useRouter();
  const isAuctionPage = router.route.includes('/auction');

  return (
    <PageFooter>
      <SplitLayout style={{ margin: 'auto', maxWidth: '1440px' }}>
        <Column style={{ justifyContent: 'center' }}>
          <H3WithMobileMargin>
            Own a piece of virtual zoo estate
          </H3WithMobileMargin>
        </Column>
        {!isAuctionPage && (
          <Column style={{ justifyContent: 'center' }}>
            <Link passHref href={routes.AUCTION}>
              <PrimaryButtonLink as="a" style={{ width: '306px' }}>
                Buy the ZOO
              </PrimaryButtonLink>
            </Link>
          </Column>
        )}
      </SplitLayout>
      <FooterBottom>
        <DisclaimerText>
          <strong>⚠️ This is an experimental project. ⚠️</strong>
          <br />
          The{' '}
          <StyledLink
            external
            href={ZOOTOKEN_CONTRACT_ETHERSCAN_URL}
            style={{
              fontSize: 'inherit',
              lineHeight: 'inherit',
              fontWeight: 'inherit',
            }}
          >
            smart contract
          </StyledLink>{' '}
          have been reviewed by two experienced Solidity developers, but an
          official audit is not available.
          <br />
          Consider acquiring ZOO tokens as to be participation in an experiment,
          with no expectations and absolutely no guarantees of any financial
          gain.
        </DisclaimerText>
        <span>
          Brought to you with <span>❤️</span>. Special thanks to{' '}
          <StyledLink external href="https://twitter.com/Dat_Ogar">
            Ogar
          </StyledLink>{' '}
          for the amazing build
        </span>
        <div style={{ marginTop: '10px' }}>
          <StyledLink external href="https://twitter.com/ZooToken">
            Twitter
          </StyledLink>{' '}
          <StyledLink external href="https://github.com/ZooToken">
            GitHub
          </StyledLink>{' '}
          <StyledLink
            external
            href="https://t.me/joinchat/IflV8xmqrzLYc-XHC-NJiA"
          >
            Telegram
          </StyledLink>{' '}
          <StyledLink external href="mailto:zootokenclub@gmail.com">
            Email
          </StyledLink>
        </div>
      </FooterBottom>
    </PageFooter>
  );
};
