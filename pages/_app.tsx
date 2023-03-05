import { AppProps } from 'next/app';
import '../styles/index.css';
import { ThemeProvider, createGlobalStyle } from 'styled-components';


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
    background-color: #404989;
    color: #e1e1e1;
  }

  a, a:visited {
    color: #e1e1e1;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

function MyApp({ Component, pageProps }: AppProps) {

	const theme = {
		colors: {
			primary: '#404989',
			secondary: '#282E56',
      accentGreen: `#45A85E`,
      accentBlue: `#4887F2`,
			text: '#e1e1e1',
      CTA: '#F6C026',
      CTASecondary: `#ffffff`
		},
    breakpoints: {
      tabletPlus: 560,
      desktopPlus: 1280,
    }
	};

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
