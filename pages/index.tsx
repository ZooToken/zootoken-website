import React from 'react';
import styled, { useTheme } from 'styled-components';
import { NextPage } from 'next';
import { useWindowSize } from 'react-use';

import { H1, H3, H4, P } from '../components/Typography';
import { PageContainer } from '../components/Layout';
import { GoldenPrimaryButtonLink } from '../components/Buttons';
import { BaseLink } from '../components/BaseLink';
import { Footer } from '../components/Footer';

import { routes } from '../utils/routes';
import {
  CRYPTO_VOXELS_ZOO_VISIT_URL,
  ZOOTOKEN_EARN_ZOO_FORM_URL,
  ZOOTOKEN_COMMUNITY_TREASURY_URL,
  MATCHA_ZOOTOKEN_MAKET_PAGE,
} from '../utils/config';

const ResponsiveH1 = styled(H1)`
  color: #ffffff;
  font-size: 60px;
  font-weight: 800;
  margin-bottom: 14px;
  line-height: 90%;
  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    font-size: 48px;
    margin-top: 14px;
  }
`;

const StyledP = styled(P)`
  font-weight: ${(props) => props.theme.fontWeights.medium};
  font-size: 17px;
  line-height: 140%;
`;

const PageHeader = styled.div`
  height: 720px;
  width: 100%;
  position: relative;
  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    height: auto;
    min-height: 720px;
  }
`;

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

const Flex = styled.div`
  display: flex;
`;

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const FlexColMobilMargin = styled(FlexCol)`
  /* Compensate for no padding on layout due to full width picture */
  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    margin-left: 15px;
    margin-right: 15px;
  }
`;

const StyledLink = styled(BaseLink)``;

const GoldenLink = styled(StyledLink)`
  color: #ffb906;
`;

const SocialSection = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Quote = styled.div`
  box-shadow: 0px 4px 34px rgba(0, 0, 0, 0.12);
  margin-top: 42px;
  margin-bottom: auto;

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    :nth-of-type(even) {
      margin-top: 72px;
    }
  }
`;

const QuoteRow = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const HomePage: NextPage = () => {
  const { breakpoints } = useTheme();
  const { width: windowWidth } = useWindowSize();
  const isLargeView = windowWidth >= parseInt(breakpoints.xl, 10);

  return (
    <>
      <PageHeaderBackground />
      <PageContainer style={{ position: 'relative' }} id="top">
        <PageHeader>
          <SplitLayout>
            <Column style={{ justifyContent: 'center', padding: '15px' }}>
              <FlexCol>
                <ResponsiveH1>
                  Hold a token,
                  <br />
                  own a zoo.
                </ResponsiveH1>
                <StyledP
                  style={{
                    maxWidth: '400px',
                    marginBottom: '30px',
                    color: '#ffffff',
                  }}
                >
                  The ZOO token represents fractional ownership of a virtual zoo
                  parcel in The Bronx neighborhood of{' '}
                  <GoldenLink external href="https://www.cryptovoxels.com">
                    Cryptovoxels
                  </GoldenLink>
                  , a virtual world built on Ethereum.
                </StyledP>
                <Flex>
                  <GoldenPrimaryButtonLink
                    as="a"
                    href={ZOOTOKEN_EARN_ZOO_FORM_URL}
                    target="_blank"
                    rel="noopener"
                  >
                    Earn ZOO
                  </GoldenPrimaryButtonLink>
                  <GoldenPrimaryButtonLink
                    as="a"
                    href={MATCHA_ZOOTOKEN_MAKET_PAGE}
                    target="_blank"
                    rel="noopener"
                    style={{ width: '162px' }}
                  >
                    Buy ZOO
                  </GoldenPrimaryButtonLink>
                </Flex>
              </FlexCol>
            </Column>
            <Column style={{ justifyContent: 'center' }}>
              <ZooToken />
            </Column>
          </SplitLayout>
        </PageHeader>
        <SplitLayout isNoMobilePadding style={{ minHeight: '538px' }}>
          <ColumnWithMargin hasBottomPadding>
            <FlexColMobilMargin>
              <H3
                id="learn-more"
                style={{ marginBottom: '37px', textAlign: 'left' }}
              >
                What is the Bronx Zoo?
              </H3>
              <StyledP
                style={{
                  maxWidth: '484px',
                  marginBottom: '24px',
                }}
              >
                The Bronx Zoo is an artistic space within the decentralized
                world of Cryptovoxels. Cryptovoxels is a virtual world built on
                the Ethereum block chain. The world includes parcels of land
                that can be bought and sold in the form of tokens.
                <br />
                <br /> We (a team of devs and artists) bought a parcel and built
                it into “The Bronx Zoo” which we are excited to offer fractional
                ownership to anyone who acquires ZOO tokens. We hope that the
                ZOO will continue to flourish and bring joy to the community and
                ZOO holders.
              </StyledP>
              <StyledLink
                external
                href={CRYPTO_VOXELS_ZOO_VISIT_URL}
                style={{ fontWeight: 'bold', textDecoration: 'underline' }}
              >
                Visit the Zoo
              </StyledLink>
            </FlexColMobilMargin>
          </ColumnWithMargin>
          <ColumnWithMargin>
            <BronxZooScreenShot
              style={{
                height: '100%',
                width: '100%',
                maxWidth: '555px',
                maxHeight: '280px',
                objectFit: 'cover',
              }}
            />
          </ColumnWithMargin>
        </SplitLayout>
        <SplitLayout
          style={{
            minHeight: '538px',
            background: '#e3f0ff',
          }}
        >
          <Column hasBottomPadding style={{ justifyContent: 'center' }}>
            <Timeline />
          </Column>
          <ColumnWithMargin>
            <FlexCol>
              <H3 style={{ marginBottom: '37px', textAlign: 'left' }}>
                How does the ZOO token work?
              </H3>
              <StyledP
                style={{
                  maxWidth: '484px',
                  marginBottom: '24px',
                }}
              >
                Each ZOO token represents a fraction of The Bronx Zoo. There are
                a total of 10,000 ZOO tokens which will be distributed to
                developers and the community.
                <br />
                <br />
                These tokens are represented as ERC20s, and are composable with
                any smart contract, including decentralized exchanges.
                <br />
                <br />
                <span style={{ marginRight: '8px' }}>💼</span>
                <span style={{ fontWeight: 'bold' }}>Sale Proceeds</span>
                <br />
                <br />
                On April 20th, 2021 the ZOO smart contract will automatically
                initiate a dutch auction to sell The Bronx Zoo in its entirety
                in exchange for ETH. The starting price will be 100 ETH and
                decrease over 10 days. Upon the sale completing, all proceeds
                will be distributed amongst ZOO token holders based on
                proportional ownership.
                <br />
                <br />
                For example, if the Bronx Zoo parcel sells for 20 ETH in the
                auction, each ZOO token will be able to be redeemed for 0.002
                ETH each.
                <br />
                <br />
                <span style={{ marginRight: '8px' }}>🏦</span>
                <span style={{ fontWeight: 'bold' }}>Treasury Governance</span>
                <br />
                <br />
                Each ZOO token also allows holders to vote in{' '}
                <StyledLink passHref href={routes.GOVERNANCE}>
                  governance polls
                </StyledLink>
                &nbsp; which decide how to distribute the 3,000 ZOO tokens held
                in the&nbsp;
                <StyledLink external href={ZOOTOKEN_COMMUNITY_TREASURY_URL}>
                  community treasury
                </StyledLink>
                .
              </StyledP>
            </FlexCol>
          </ColumnWithMargin>
        </SplitLayout>
        <SocialSection>
          <H4 style={{ marginTop: '50px', textAlign: 'center' }}>
            What people are saying:
          </H4>
          <QuoteRow style={{ marginBottom: '67px' }}>
            <Quote>
              <Quote1 />
            </Quote>
            <Quote>
              <Quote2 />
            </Quote>
            <Quote>
              <Quote3 />
            </Quote>
            <Quote>
              <Quote4 />
            </Quote>
            {isLargeView && (
              <Quote>
                <Quote5 />
              </Quote>
            )}
          </QuoteRow>
        </SocialSection>
      </PageContainer>
      <Footer />
    </>
  );
};

const ZooTokenImg = styled.img`
  width: 380px;
  height: auto;

  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    /* HACK(kimpers): Token image has a lot of deadspace which
    * becomes a problem when we swap to column based flex */
    margin-bottom: -100px;
  }
`;
const ZooToken: React.FC = React.memo(() => (
  <picture>
    <source srcSet={require('../images/zootoken.png?webp')} type="image/webp" />
    <source srcSet={require('../images/zootoken.png')} type="image/png" />
    <ZooTokenImg src={require('../images/zootoken.png')} />
  </picture>
));

const Timeline: React.FC = React.memo(() => (
  <picture>
    <source srcSet={require('../images/timeline.png?webp')} type="image/webp" />
    <source srcSet={require('../images/timeline.png')} type="image/png" />
    <img
      src={require('../images/timeline.png')}
      style={{ width: '441px', height: 'auto' }}
    />
  </picture>
));

const ScreenshotImage = styled.img`
  width: 220px;
  height: auto;
`;

const Quote1: React.FC = React.memo(() => (
  <picture>
    <source
      srcSet={require('../images/screenshots-1.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/screenshots-1.png')} type="image/png" />
    <ScreenshotImage src={require('../images/screenshots-1.png')} />
  </picture>
));

const Quote2: React.FC = React.memo(() => (
  <picture>
    <source
      srcSet={require('../images/screenshots-2.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/screenshots-2.png')} type="image/png" />
    <ScreenshotImage src={require('../images/screenshots-2.png')} />
  </picture>
));

const Quote3: React.FC = React.memo(() => (
  <picture>
    <source
      srcSet={require('../images/screenshots-3.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/screenshots-3.png')} type="image/png" />
    <ScreenshotImage src={require('../images/screenshots-3.png')} />
  </picture>
));

const Quote4: React.FC = React.memo(() => (
  <picture>
    <source
      srcSet={require('../images/screenshots-4.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/screenshots-4.png')} type="image/png" />
    <ScreenshotImage src={require('../images/screenshots-4.png')} />
  </picture>
));

const Quote5: React.FC = React.memo(() => (
  <picture>
    <source
      srcSet={require('../images/screenshots-5.png?webp')}
      type="image/webp"
    />
    <source srcSet={require('../images/screenshots-5.png')} type="image/png" />
    <ScreenshotImage src={require('../images/screenshots-5.png')} />
  </picture>
));

const BronxZooScreenShot: React.FC<{ style?: object }> = React.memo(
  ({ style }) => (
    <picture>
      <source
        srcSet={require('../images/bronx_zoo_screenshot.png?webp')}
        type="image/webp"
      />
      <source
        srcSet={require('../images/bronx_zoo_screenshot.png')}
        type="image/png"
      />
      <img src={require('../images/bronx_zoo_screenshot.png')} style={style} />
    </picture>
  ),
);

const PageHeaderBackground = React.memo(() => (
  <div
    style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      maxHeight: '720px',
    }}
  >
    <picture>
      <source
        srcSet={require('../images/header_background@2x.png?webp')}
        type="image/webp"
      />
      <source
        srcSet={require('../images/header_background@2x.png')}
        type="image/png"
      />
      <img
        src={require('../images/header_background@2x.png')}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </picture>
  </div>
));

const MemoizedHomePage = React.memo(HomePage);
export default MemoizedHomePage;
