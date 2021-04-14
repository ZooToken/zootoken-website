import styled from 'styled-components';

const H1 = styled.div<TextProps>`
  font-family: 'Khula';
  font-weight: ${({ fontWeight, theme }) => fontWeight ?? theme.fontWeights.h1};
  font-size: ${({ fontSize, theme }) => fontSize ?? theme.fontSizes.h1};
  font-style: normal;
  /* -3.5% letter spacing */
  letter-spacing: -0.035em;
  color: ${({ color, theme }) => color ?? theme.colors.primaryText};
  line-height: ${({ lineHeight }) => lineHeight};
`;

const H2 = styled.h2`
  font-family: 'Khula';
  font-weight: bold;
  font-size: 36px;
  line-height: 100%;
  letter-spacing: -0.035em;
  color: ${(props) => props.theme.colors.primaryText};
`;

const H3 = styled.h3`
  font-family: 'Khula';
  font-weight: bold;
  font-size: 32px;
  line-height: 100%;
  text-align: center;
  color: ${(props) => props.theme.colors.primaryText};
`;

const H4 = styled.h4`
  font-family: 'Khula';
  font-weight: ${(props) => props.theme.fontWeights.semiBold};
  font-size: 24px;
  line-height: 100%;
  color: ${(props) => props.theme.colors.primaryText};
`;

const H5 = styled.h5`
  font-family: 'Khula';
  font-weight: ${(props) => props.theme.fontWeights.semiBold};
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  color: #0e103c;
`;

const P = styled.p<TextProps>`
  font-family: 'Khula';
  font-weight: ${({ fontWeight, theme }) =>
    fontWeight ?? theme.fontWeights.medium};
  font-size: ${({ fontSize, theme }) => fontSize ?? theme.fontSizes.paragraph};
  font-style: normal;
  /* -3.5% letter spacing */
  letter-spacing: -0.035em;
  color: ${({ color, theme }) => color ?? theme.colors.primaryText};
  line-height: ${({ lineHeight }) => lineHeight};
`;

const PBig = styled.p<TextProps>`
  font-family: 'Khula';
  text-align: center;
  font-feature-settings: 'tnum' on, 'lnum' on;
  font-weight: ${({ fontWeight, theme }) =>
    fontWeight ?? theme.fontWeights.medium};
  font-size: ${({ fontSize }) => fontSize ?? '18px'};
  color: ${({ color, theme }) => color ?? theme.colors.primaryText};
  line-height: ${({ lineHeight }) => lineHeight ?? '21px'};
`;

const PLabel = styled.p<TextProps>`
  font-family: 'Khula';
  text-align: center;
  font-weight: ${({ fontWeight, theme }) =>
    fontWeight ?? theme.fontWeights.semiBold};
  font-size: ${({ fontSize }) => fontSize ?? '12px'};
  color: ${({ color, theme }) => color ?? theme.colors.primaryText};
  line-height: ${({ lineHeight }) => lineHeight ?? '14px'};
`;

export { H1, H2, H3, H4, H5, P, PBig, PLabel };

interface TextProps {
  fontWeight?: number;
  fontSize?: string;
  color?: string;
  lineHeight?: string;
}
