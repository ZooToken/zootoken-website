import { useWeb3React } from '@web3-react/core';
import { routes } from '../utils/routes';
import styled from 'styled-components';
import { BaseLink } from './BaseLink';
import { GoldenPrimaryButton } from './Buttons';
import { useState } from 'react';
import { Nftdrop__factory } from '../utils/zoo_contract/factories/Nftdrop__factory';
import { getNftDropAddress } from '../utils/config';
import {
  DropInfoResponse,
  getDropInfoForAddress,
} from '../utils/nft_drop_data';

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
  const { account, chainId, library } = useWeb3React();
  console.log(props);

  const [ethereumAddress, setEthereumAddress] = useState<string>(account || '');

  const [checkingState, setCheckingState] = useState<
    'ready' | 'loading' | DropInfoResponse
  >('ready');

  if (!account || !chainId) {
    return (
      <div style={{ color: 'white' }}>
        <StyledConnectLink href={routes.LOGIN}>
          Connect wallet to check eligibility
        </StyledConnectLink>
      </div>
    );
  }

  // const nftDrop = Nftdrop__factory.connect(nftAddress, library.provider);

  const checkEligibility = async () => {
    setCheckingState('loading');

    const dropResponse = getDropInfoForAddress(ethereumAddress, chainId);
    setCheckingState(dropResponse);
  };

  const renderMain = () => {
    if (checkingState === 'ready') {
      return (
        <PrimaryButtonLink onClick={checkEligibility}>
          Check eligibility
        </PrimaryButtonLink>
      );
    } else if (checkingState === 'loading') {
      return <p>Loading..</p>;
    } else {
      console.log({ checkingState });
      if (checkingState.found) {
        return <p>FOUND</p>;
      } else {
        return <p>NOT FOUND</p>;
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', margin: 'auto' }}>
      {checkingState === 'ready' && (
        <p style={{ fontSize: '20px' }}>Enter ethereum address:</p>
      )}
      {checkingState === 'ready' && (
        <input
          type="text"
          value={ethereumAddress}
          onChange={(e) => {
            e.preventDefault();
            console.log('setting to', e.target.value);
            setEthereumAddress(e.target.value);
          }}
          onClick={() => {
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
      )}
      <div style={{ marginTop: '20px' }}>{renderMain()}</div>
    </div>
  );
};
