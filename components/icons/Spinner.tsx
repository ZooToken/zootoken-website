import React from 'react';
import styled, { keyframes } from 'styled-components';

const spinner = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const AnimatedSvg = styled.svg`
  animation: ${spinner} 1.6s linear infinite;
`;

const Spinner = (props: React.SVGProps<SVGSVGElement>) => (
  <AnimatedSvg
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...(props as any)}
  >
    <path
      d="M1.29102 8.52779C1.29097 6.7747 1.90505 5.07699 3.02656 3.72958C4.14808 2.38216 5.70616 1.47019 7.43015 1.1521C9.15414 0.834003 10.9351 1.12988 12.4636 1.98833C13.9921 2.84678 15.1716 4.21356 15.7972 5.85123C16.4228 7.4889 16.455 9.29397 15.8881 10.9529C15.3212 12.6118 14.1911 14.0197 12.6941 14.932C11.1971 15.8443 9.42779 16.2034 7.69357 15.9469C5.95935 15.6904 4.36979 14.8344 3.20102 13.5278"
      stroke="#0A1A5D"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </AnimatedSvg>
);

const MemoSpinner = React.memo(Spinner);

const ThickSpinnerIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <AnimatedSvg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...(props as any)}
  >
    <path
      d="M12 24C10.2015 24 8.472 23.6115 6.858 22.845L8.1435 20.1345C9.3525 20.709 10.65 21 12 21C16.9635 21 21 16.9635 21 12C21 7.0365 16.9635 3 12 3C7.0365 3 3 7.0365 3 12C3 13.3515 3.291 14.649 3.867 15.858L1.158 17.1465C0.39 15.531 0 13.8 0 12C0 5.3835 5.3835 0 12 0C18.6165 0 24 5.3835 24 12C24 18.6165 18.6165 24 12 24Z"
      fill="#0E103C"
    />
  </AnimatedSvg>
);

const MemoThickSpinner = React.memo(ThickSpinnerIcon);

export { MemoSpinner as SpinnerIcon, MemoThickSpinner as ThickSpinnerIcon };
