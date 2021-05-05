import { useWeb3React } from '@web3-react/core';
import { getNftDropAddress } from '../utils/config';
import { DropInfo } from '../utils/nft_drop_data';
import { Nftdrop__factory } from '../utils/zoo_contract/factories/Nftdrop__factory';
import useSWR from 'swr';
import { getProviderOrSigner } from '../utils/web3/helpers';
import { NFTRedeemButton } from './NFTRedeemButton';

export const NFTRedeem = (props: { dropInfo: DropInfo; address: string }) => {
  const { address, dropInfo } = props;

  const { account, chainId, library } = useWeb3React();

  const { data, error } = useSWR(
    `nft_dropstatus:${address}`,
    async () => {
      console.log('starting');
      if (account && chainId && library) {
        const nftDropAddress = getNftDropAddress(chainId);
        const nftDrop = Nftdrop__factory.connect(
          nftDropAddress,
          getProviderOrSigner(library, account) as any,
        );
        const { r, s, v } = dropInfo;
        const owner = await nftDrop.owner();

        try {
          const signerResponse = await nftDrop.getSigner(address, r, s, v);
          console.log({ signerResponse, owner });
          if (signerResponse.toLowerCase() !== owner.toLowerCase()) {
            return 'invalid';
          }
        } catch (e) {
          return 'invalid';
        }

        const hasReedemed = await nftDrop.hasReedeemed(address);
        if (hasReedemed) {
          return 'already_redeemed';
        }

        return 'valid';
      } else {
        return 'invalid';
      }
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0,
    },
  );

  if (!account) {
    return <p>No account, please reconnect.</p>;
  }

  if (dropInfo.address.toLowerCase() !== address.toLowerCase()) {
    return <p>Wrong address, please reconnect.</p>;
  }

  const renderMain = () => {
    if (!data) {
      return <p>Checking Status...</p>;
    } else if (data === 'valid') {
      return <NFTRedeemButton dropInfo={dropInfo} />;
    } else if (data === 'invalid') {
      console.log('data invalid');
      return <p>Something went wrong, please contact us on telegram.</p>;
    } else if (data == 'already_redeemed') {
      return <p>This address has already redeemed their NFT.</p>;
    } else {
      error && console.error(error);
      return <p>Something went wrong, please contact us on telegram.</p>;
    }
  };

  return (
    <div>
      <p>
        Address {address} <strong>is</strong> eligible for the NFT airdrop!
      </p>
      <div style={{ marginTop: '15px' }}>{renderMain()}</div>
    </div>
  );
};
