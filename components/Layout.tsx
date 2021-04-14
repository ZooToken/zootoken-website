import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex: 1;
  min-height: 100%;
  max-width: 1440px;
  margin: auto;
  flex-direction: column;
  align-items: center;
`;

// Expands on the left to take up remaining space
export const LeftFillContainer = styled.div`
  display: flex;
  flex-shrink: 1;
  flex-basis: 0;
  flex-grow: 1;
  padding-left: 15px;
`;

// Expands on the right to take up remining space
export const RightFillContainer = styled.div`
  display: flex;
  flex-shrink: 1;
  flex-basis: 0;
  flex-grow: 1;
  background-color: #f6f6f9;
  padding-right: 15px;
  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    background-color: #ffffff;
  }
`;

// Main container is seperated in a left (white background) and right (gray background)
export const MainContainer = styled.div`
  position: relative;
  display: flex;
  flex-basis: 1200px;
  max-width: 1200px;
  flex: 1;
  flex-grow: 1000;
`;

export const LeftColumn = styled.div`
  display: flex;
  flex: 1;
  flex-grow: 1;
  flex-basis: 760px;
  padding-right: 80px;
  @media (max-width: ${(props) => props.theme.breakpoints.xl}) {
    padding-right: 40px;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    padding-right: 0;
  }
  flex-direction: column;
  margin-bottom: 80px;
`;

export const RightColumn = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-basis: 440px;
  max-width: 440px;
  padding-left: 80px;
  @media (max-width: ${(props) => props.theme.breakpoints.xl}) {
    padding-left: 40px;
  }
  background-color: #f6f6f9;
  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    display: none;
  }
`;
