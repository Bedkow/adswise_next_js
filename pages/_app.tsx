import { AppProps } from 'next/app';
import '../styles/index.css';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

const theme = {
  colors: {
    primary: '#f3f3f3',
    secondary: '#b0b0b0',
    accentGreen: `#c1ffd0`,
    accentBlue: `#bcd5ff`,
    text: '#121212',
    textSecondary: '#262626',
    CTA: '#ffffff',
    CTASecondary: `#000000`,
    navBackg: `#000000`,
    navBackgEl: `#ffffff`,
    navBackgHover: `#ffffff`,
    navBackgElHover: `#000000`,
  },
  breakpoints: {
    tabletPlus: 560,
    desktopPlus: 1280,
  }
};

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0
  }

  body {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    width: 100%;
    height: 100%;
    background-color: ${theme.colors.primary};
    color: ${theme.colors.text};
  }

  a, a:visited {
    color: ${theme.colors.text};
    text-decoration: none;
  }

  a:hover {
    text-decoration: none;
  }
`;

function MyApp({ Component, pageProps }: AppProps) {

	return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
	  </>
  );
}

export default MyApp;
