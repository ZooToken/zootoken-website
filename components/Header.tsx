import React, { useCallback } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useWindowScroll } from 'react-use';
import { animated as a } from 'react-spring';
import { useWeb3React } from '@web3-react/core';
import { useRouter } from 'next/router';

import { disableEagerWalletConnectPreference } from '../utils/preferences';
import { useClearWalletSession } from '../hooks/useClearWalletSession';
import { routes } from '../utils/routes';

const HEADER_HEIGHT_DESKTOP = '80px';
const HEADER_HEIGHT_MOBILE = '130px';

const HeaderOuter = styled.div<{
  showBottomBorder: boolean;
  isSplitLayout: boolean;
  showSearchInHeader: boolean;
}>`
  position: ${(props) => (props.showSearchInHeader ? 'fixed' : 'absolute')};
  display: flex;
  flex: 1;
  justify-content: center;
  width: 100%;
  height: ${HEADER_HEIGHT_DESKTOP};
  z-index: 100;
  border-bottom: 1px solid
    ${(props) =>
      props.showSearchInHeader && props.showBottomBorder && !props.isSplitLayout
        ? '#E1E1E1'
        : 'transparent'};
  transition: border-color 0.2s ease-in-out;
  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    height: ${(props) =>
      props.showSearchInHeader ? HEADER_HEIGHT_MOBILE : HEADER_HEIGHT_DESKTOP};
    border-bottom: 1px solid
      ${(props) =>
        props.showSearchInHeader && props.showBottomBorder
          ? '#E1E1E1'
          : 'transparent'};
  }
`;
const AnimatedHeaderOuter = a(HeaderOuter);

const HeaderWrapperColumn = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 14px;
  /* NOTE offset the 14px padding on each side */
  max-width: 1440px;
  width: 100%;
  align-items: center;
`;

const HeaderPrimaryRow = styled.header<{ isSplitLayout: boolean }>`
  display: flex;
  flex: 1;
  width: 100%;
  /* HACK(kimpers): make it align with homepage content */
  max-width: 1113px;
  justify-content: space-between;
`;

const HeaderLeft = styled.div<{
  showBottomBorder: boolean;
  isSplitLayout: boolean;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid
    ${(props) =>
      props.isSplitLayout && props.showBottomBorder
        ? '#E1E1E1'
        : 'transparent'};
  transition: border-color 0.2s ease-in-out;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    border-bottom: 1px solid transparent;
  }
  flex: 1;
  flex-grow: 1;
  /* Unlike the LeftColumn, we need margin (due to border-bottom line) instead of padding (which means flex-basis is calculated differently) */
  flex-basis: calc(760px - 80px);
  max-width: calc(760px - 80px);
  margin-right: 80px;
  @media (max-width: ${(props) => props.theme.breakpoints.xl}) {
    flex-basis: 720px;
    max-width: 720px;
    margin-right: 40px;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex: 1;
    max-width: 740px;
    margin-right: 20px;
  }
`;

const HeaderRight = styled.div<{ isSplitLayout: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  flex-basis: 440px;
  max-width: 440px;
  @media (max-width: ${(props) => props.theme.breakpoints.xl}) {
    padding-left: 40px;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    padding-left: 0;
  }
`;

const HeaderLink = styled.a<{ isHome: boolean }>`
  font-size: 16px;
  font-weight: ${(props) => props.theme.fontWeights.semiBold};
  line-height: 19px;
  color: ${(props) => (props.isHome ? '#fff' : '#1F1F41')};
  text-decoration: none;
  /* Better touch targets */
  padding: 8px;
  margin-left: -8px;
  margin-bottom: -4px;
  cursor: pointer;
`;

const Header = () => {
  const { account } = useWeb3React();
  const { clearSession } = useClearWalletSession();
  const router = useRouter();

  const isSplitLayout = false;
  const showSearchInHeader = false;
  const { y: windowScrollHeight } = useWindowScroll();

  const shouldShowGrayDivider = windowScrollHeight > 2; // tiny buffer

  const handleDisconnectAccount = useCallback(() => {
    disableEagerWalletConnectPreference();
    clearSession();
  }, [clearSession]);

  const isHome = router.pathname === '/';

  return (
    <AnimatedHeaderOuter
      showSearchInHeader={showSearchInHeader}
      showBottomBorder={shouldShowGrayDivider}
      isSplitLayout={isSplitLayout}
    >
      <HeaderWrapperColumn>
        <HeaderPrimaryRow isSplitLayout={isSplitLayout}>
          <HeaderLeft
            isSplitLayout={isSplitLayout}
            showBottomBorder={shouldShowGrayDivider}
          >
            <Link passHref href={routes.HOME}>
              <HeaderLink isHome={isHome}>ZOO Token</HeaderLink>
            </Link>
          </HeaderLeft>
          <HeaderRight isSplitLayout={isSplitLayout}>
            <Link passHref href={routes.GOVERNANCE}>
              <HeaderLink isHome={isHome}>Governance</HeaderLink>
            </Link>
            <Link passHref href={routes.AUCTION}>
              <HeaderLink isHome={isHome}>Auction</HeaderLink>
            </Link>
            {account ? (
              <HeaderLink isHome={isHome} onClick={handleDisconnectAccount}>
                Log out
              </HeaderLink>
            ) : (
              <Link passHref href={routes.LOGIN}>
                <HeaderLink isHome={isHome}>Connect Wallet</HeaderLink>
              </Link>
            )}
          </HeaderRight>
        </HeaderPrimaryRow>
      </HeaderWrapperColumn>
    </AnimatedHeaderOuter>
  );
};

const HeaderSpacerContainer = styled.div<{ fixedHeader: boolean }>`
  height: ${HEADER_HEIGHT_DESKTOP};
  min-height: ${HEADER_HEIGHT_DESKTOP};
  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    height: ${(props) =>
      props.fixedHeader ? HEADER_HEIGHT_MOBILE : HEADER_HEIGHT_DESKTOP};
    min-height: ${(props) =>
      props.fixedHeader ? HEADER_HEIGHT_MOBILE : HEADER_HEIGHT_DESKTOP};
  }
  width: 100%;
`;

// Spacer component that takes up the width of the Header (since the header is outside the flow via fixed/absolute positioning)
const HeaderSpacer: React.FC<{}> = () => {
  const fixedHeader = false;
  return <HeaderSpacerContainer fixedHeader={fixedHeader} />;
};
const HeaderSpacerMemo = React.memo(HeaderSpacer);

// Standardized space between the Header and content
const BetweenHeaderAndContentSpacer = styled.div`
  height: 30px;
  min-height: 30px;
  width: 100%;
`;
const BetweenHeaderAndContentSpacerMemo = React.memo(
  BetweenHeaderAndContentSpacer,
);

const MemoizedHeader = React.memo(Header);

export {
  MemoizedHeader as Header,
  HeaderLeft,
  HeaderRight,
  HeaderLink,
  HeaderSpacerMemo as HeaderSpacer,
  BetweenHeaderAndContentSpacerMemo as BetweenHeaderAndContentSpacer,
};
