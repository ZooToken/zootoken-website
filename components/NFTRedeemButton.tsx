import styled from 'styled-components';
import { GoldenPrimaryButton } from './Buttons';
import { Nftdrop__factory } from '../utils/zoo_contract/factories/Nftdrop__factory';
import { getProviderOrSigner } from '../utils/web3/helpers';
import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { getNftDropAddress } from '../utils/config';
import { DropInfo } from '../utils/nft_drop_data';

const PrimaryButtonLink = styled(GoldenPrimaryButton)`
  text-decoration: none;
  width: 162px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 30px;
  margin: auto;
`;

export const NFTRedeemButton = (props: { dropInfo: DropInfo }) => {
  const { dropInfo } = props;

  const [status, setStatus] = useState<'ready' | 'processing' | 'done'>(
    'ready',
  );
  const [txHash, setTxHash] = useState<string | undefined>(undefined);

  const { account, chainId, library } = useWeb3React();

  if (!account || !chainId) {
    return <p>Error, try again</p>;
  }

  const nftDropAddress = getNftDropAddress(chainId);
  const nftDrop = Nftdrop__factory.connect(
    nftDropAddress,
    getProviderOrSigner(library, account) as any,
  );
  const start = async () => {
    setStatus('processing');
    const tx = await nftDrop.redeemNft(
      dropInfo.address,
      dropInfo.r,
      dropInfo.s,
      dropInfo.v,
    );
    setTxHash(tx.hash);
    await tx.wait();
    setStatus('done');
  };

  const txLink = txHash ? (
    <a
      href={`https://etherscan.io/tx/${txHash}`}
      style={{ color: 'white' }}
      target="_blank"
    >
      {txHash}
    </a>
  ) : (
    <div />
  );

  if (status === 'ready') {
    return (
      <div>
        <PrimaryButtonLink onClick={start}>Claim NFT</PrimaryButtonLink>
      </div>
    );
  } else if (status === 'processing') {
    return <div>Processing {txLink}</div>;
  } else if (status === 'done') {
    return <div>Successfully claimed NFT! {txLink}</div>;
  } else {
    return <p>Error, try again</p>;
  }
};
