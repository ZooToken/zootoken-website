import React, { FC } from 'react';
import styled from 'styled-components';
import Link, { LinkProps } from 'next/link';

export const StyledLink = styled.a`
  font-family: 'Khula';
  font-weight: ${(props) => props.theme.fontWeights.semiBold};
  font-size: inherit;
  line-height: 140%;
  color: #333b4e;
  text-decoration: none;

  :hover,
  :active {
    text-decoration: underline;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    font-size: 14px;
  }
`;

interface BaseLinkProps extends LinkProps {
  href: string;
  className?: string;
  external?: boolean;
  style?: any;
}

export const BaseLink: FC<BaseLinkProps> = ({
  className,
  children,
  external,
  href,
  as,
  ...rest
}) => {
  if (external) {
    return (
      <StyledLink
        className={className}
        target="_blank"
        rel="noopener"
        href={href}
        {...rest}
      >
        {children}
      </StyledLink>
    );
  }

  return (
    <Link as={as} passHref {...rest} href={href}>
      <StyledLink className={className}>{children}</StyledLink>
    </Link>
  );
};
