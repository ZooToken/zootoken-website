import React, { FC } from 'react';

interface CoinbaseWalletIconProps {
  className?: string;
}

const CoinbaseWalletIcon: FC<CoinbaseWalletIconProps> = ({ className }) => (
  <svg
    width="31"
    height="31"
    viewBox="0 0 31 31"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M30.9941 15.2048C30.9941 23.4891 24.2784 30.2048 15.9941 30.2048C7.70987 30.2048 0.994141 23.4891 0.994141 15.2048C0.994141 6.92056 7.70987 0.204834 15.9941 0.204834C24.2784 0.204834 30.9941 6.92056 30.9941 15.2048ZM24.8804 15.2048C24.8804 20.1126 20.9019 24.0911 15.9941 24.0911C11.0864 24.0911 7.10788 20.1126 7.10788 15.2048C7.10788 10.2971 11.0864 6.31858 15.9941 6.31858C20.9019 6.31858 24.8804 10.2971 24.8804 15.2048ZM13.7903 12.2901C13.4763 12.2901 13.2216 12.5448 13.2216 12.8589V17.5508C13.2216 17.8649 13.4763 18.1195 13.7903 18.1195H18.1979C18.512 18.1195 18.7667 17.8649 18.7667 17.5508V12.8589C18.7667 12.5448 18.512 12.2901 18.1979 12.2901H13.7903Z"
      fill="#2F5CE2"
    />
  </svg>
);

const MemoizedCoinbaseWalletIcon = React.memo(CoinbaseWalletIcon);

export { MemoizedCoinbaseWalletIcon as CoinbaseWalletIcon };
