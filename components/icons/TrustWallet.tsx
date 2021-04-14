import React, { FC } from 'react';

interface TrustWalletIconProps {
  className?: string;
}

const TrustWalletIcon: FC<TrustWalletIconProps> = ({ className }) => (
  <svg
    width="25"
    height="30"
    viewBox="0 0 25 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12.5377 2.06354C16.8715 5.68326 21.8414 5.4599 23.2616 5.4599C22.951 26.0451 20.584 21.9631 12.5377 27.7352C4.49106 21.9631 2.13924 26.0451 1.82861 5.4599C3.23378 5.4599 8.20374 5.68326 12.5377 2.06354Z"
      stroke="#3375BB"
      strokeWidth="2.74136"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MemoizedTrustWalletIcon = React.memo(TrustWalletIcon);

export { MemoizedTrustWalletIcon as TrustWalletIcon };
