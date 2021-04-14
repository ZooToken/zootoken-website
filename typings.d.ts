// Adds full typescript support to our theming inside of styled-components
// import original module declarations
import 'styled-components';
import 'google.analytics';

// import your custom theme
import { ITheme } from './styles/theme';
// extend the module declarations using custom theme type
declare module 'styled-components' {
  export interface DefaultTheme extends ITheme {}
}

// Adds ethereum to the window typings
import { Web3Provider } from '@ethersproject/providers';
declare global {
  // Merges default window declarations with custom ones below
  interface Window {
    ethereum?: Web3Provider;
  }
}
