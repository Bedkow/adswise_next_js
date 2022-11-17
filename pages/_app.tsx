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
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
	const theme = {
		colors: {
			primary: '#2A2B2A',
			secondary: '#3F7CAC',
			text: '#D6D6D6',
		},
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
