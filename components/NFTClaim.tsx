import { useWeb3React } from '@web3-react/core';
import { routes } from '../utils/routes';
import styled from 'styled-components';
import { BaseLink } from './BaseLink';
import { GoldenPrimaryButton } from './Buttons';
import { useState } from 'react';

const StyledConnectLink = styled(BaseLink)`
  text-decoration: underline;
  color: white;
  font-size: 18px;

  :hover,
  :active {
    text-decoration: none;
  }
`;

const PrimaryButtonLink = styled(GoldenPrimaryButton)`
  text-decoration: none;
  width: 162px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 30px;
  margin: auto;
`;

export const NFTClaim = (props: {}) => {
  const { account } = useWeb3React();
  console.log(props);

  const [ethereumAddress, setEthereumAddress] = useState<string>(account || '');

  const [checkingState, setCheckingState] = useState<
    'ready' | 'loading' | 'eligibile' | 'not-eligible'
  >('ready');

  if (!account) {
    return (
      <div style={{ color: 'white' }}>
        <StyledConnectLink href={routes.LOGIN}>
          Connect wallet to check eligibility
        </StyledConnectLink>
      </div>
    );
  }

  const checkEligibility = async () => {
    setCheckingState('loading');
  };

  return (
    <div style={{ textAlign: 'center', margin: 'auto' }}>
      <p style={{ fontSize: '20px' }}>Enter ethereum address:</p>
      <input
        type="text"
        value={ethereumAddress}
        onChange={(e) => {
          e.preventDefault();
          setEthereumAddress(e.target.value);
        }}
        onClick={() => {
          console.log('clicked');
          if (account && ethereumAddress == '') {
            setEthereumAddress(account);
          }
        }}
        style={{
          marginBottom: '20px',
          padding: '20px',
          width: '400px',
          margin: 'auto',
        }}
      />
      <div style={{ marginTop: '20px' }}>
        {checkingState === 'ready' && (
          <PrimaryButtonLink onClick={checkEligibility}>
            Check eligibility
          </PrimaryButtonLink>
        )}
        {checkingState === 'loading' && <p>Loading..</p>}
      </div>
    </div>
  );
};
