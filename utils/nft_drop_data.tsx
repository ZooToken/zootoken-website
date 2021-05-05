import { TrustWalletIcon } from '../components/icons/TrustWallet';

interface DropInfo {
  address: string;
  r: string;
  s: string;
  v: number;
}

export const getDropInfo = (chainId: number): DropInfo[] => {
  if (chainId === 4) {
    return [
      {
        address: '0x8a333a18B924554D6e83EF9E9944DE6260f61D3B',
        r: '0x65328b49ba16a62a2219ab6b89c1c5c02062faea16e2e84ad28fa04e35d362c6',
        s: '0x4b8077977a91751b923841988c7d03f5b6071fdb8b7bc962f426bb348d1d2782',
        v: 27,
      },
      {
        address: '0x2F29Dd2166910c60b4899B6CD78191971Ac26C7C',
        r: '0xf5544e24232c4c9cd2553670ea4c46e8c6a72034eef9f0e442a18593bcebf2f4',
        s: '0x55e229663daa908480e6c6f3fb6d04fbefaed2718c6e8af56ce56a6cf62e3ab5',
        v: 27,
      },
      {
        address: '0xE0aD99015fAaB410BCBb647C929EADec50852f90',
        r: '0xc15244cf62443c0df6887c1da10f5af3a0215270f4e208766f527717f1e634dc',
        s: '0x74202fb96b8b2540f98f6cb841ba54dd5fd8ab541e6e323e42b7f8d6b54f0bb3',
        v: 28,
      },
      {
        address: '0xb3F193A55867AB7153c5731d667cebDF75C3f192',
        r: '0x27e69d09b324667d05a1951126dd411d49e5445d09d59532f71395be284c3f7d',
        s: '0x242fc25cffd428472d25653faa7d75f460ebba04fd5e561cf54fc8d16e3c18bd',
        v: 27,
      },
    ];
  }

  throw new Error(`Unexpected chainID: ${chainId} for drop recipients`);
};

export type DropInfoResponse =
  | { found: false }
  | { found: true; dropInfo: DropInfo };
export const getDropInfoForAddress = (
  address: string,
  chainId: number,
): DropInfoResponse => {
  const allDropInfo = getDropInfo(chainId);

  const foundItem = allDropInfo.find((d) => {
    return d.address.toLowerCase() == address.toLowerCase();
  });
  if (foundItem) {
    return { found: true, dropInfo: foundItem };
  } else {
    return { found: false };
  }
};
