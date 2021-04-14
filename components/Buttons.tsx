import styled from 'styled-components';
import { BaseButton } from './BaseButton';

const PrimaryButton = styled(BaseButton)`
  width: 100%;
  height: 60px;
  background: #333b4e;
  box-shadow: 0px 1px 2px #0f0e39, inset 0px 4px 9px rgba(255, 255, 255, 0.25);
  border-radius: 11px;
  outline: none;
  font-weight: bold;
  font-style: normal;
  font-family: 'Khula';
  font-size: 16px;
  text-align: center;
  color: #ffffff;
  transition: all 0.15s ease-in;
  will-change: transform, background-color, box-shadow;
  cursor: pointer;
  :active {
    transform: scale(0.98);
  }
  :disabled {
    box-shadow: inset 0px 4px 9px rgba(255, 255, 255, 0.25);
    cursor: not-allowed;
  }
  /* also focus ?? */
  :hover:not(:disabled) {
    transform: scale(0.98), translateY(-2px);
  }
`;

const SecondaryButton = styled(BaseButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  text-decoration: none;
  background: #ffffff;
  border: 1px solid #e3f0ff;
  box-shadow: inset 0px 4px 9px rgba(255, 255, 255, 0.25);
  border-radius: 11px;
  outline: none;
  font-weight: bold;
  font-style: normal;
  font-family: 'Khula';
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #333b4e;
  transition: all 0.15s ease-in;
  will-change: transform, background-color, box-shadow;
  cursor: pointer;
  :active {
    transform: scale(0.98);
  }
  :disabled {
    box-shadow: inset 0px 4px 9px rgba(255, 255, 255, 0.25);
    cursor: not-allowed;
  }
  :hover:not(:disabled) {
    transform: scale(0.98), translateY(-2px);
  }
`;

const GoldenPrimaryButton = styled(PrimaryButton)`
  background: #b58532;
`;

const PrimaryButtonLink = styled(PrimaryButton)`
  text-decoration: none;
  width: 162px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 30px;
`;

const GoldenPrimaryButtonLink = styled(PrimaryButtonLink)`
  background: #b58532;
`;

export {
  PrimaryButton,
  PrimaryButtonLink,
  SecondaryButton,
  GoldenPrimaryButton,
  GoldenPrimaryButtonLink,
};
