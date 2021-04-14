import React, { useCallback } from 'react';

import { useRouter } from 'next/router';
import styled from 'styled-components';

import { ConnectWalletMenu } from '../components/ConnectWalletMenu';

const FullPageFlex = styled.div`
  /* Header height is 99px */
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    align-items: center;
    padding-top: 0;
  }
`;

const LoginPage = () => {
  const router = useRouter();

  const handleLogin = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <FullPageFlex>
      <ConnectWalletMenu onLogin={handleLogin} />
    </FullPageFlex>
  );
};

export default LoginPage;
