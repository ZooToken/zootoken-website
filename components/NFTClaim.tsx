import { useWeb3React } from '@web3-react/core';
import { routes } from '../utils/routes';
import styled from 'styled-components';
import { BaseLink } from './BaseLink';
import { GoldenPrimaryButton } from './Buttons';

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
  const { library, account } = useWeb3React();

  if (!account) {
    return (
      <StyledConnectLink href={routes.LOGIN}>
        Connect wallet to check eligibility
      </StyledConnectLink>
    );
  }

  return (
    <div style={{ textAlign: 'center', margin: 'auto' }}>
      <p style={{ fontSize: '20px' }}>Enter ethereum address:</p>
      <input
        type="text"
        style={{
          marginBottom: '20px',
          padding: '20px',
          width: '400px',
          margin: 'auto',
        }}
      />
      <div style={{ marginTop: '20px' }}>
        <PrimaryButtonLink>Check eligibility</PrimaryButtonLink>
      </div>
    </div>
  );
};
