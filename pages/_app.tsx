import { AppProps } from 'next/app';
import '../styles/index.css';
import { ThemeProvider, createGlobalStyle } from 'styled-components';


const GlobalStyles = createGlobalStyle`
  /* roboto-regular - latin */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src: local(''),
        url('../fonts/roboto-v30-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
        url('../fonts/roboto-v30-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
  }

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
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<Component {...pageProps} />
		</ThemeProvider>
	);
}

export default MyApp;
