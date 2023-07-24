import { CMS_NAME, CMS_URL } from "../lib/constants";
import styled from "styled-components";

const IntroParagraph = styled.p`
	text-align: center;
	margin: 50px 0 50px 0;
	font-size: 1.2rem;
`;

const IntroTitle = styled.h1`
	text-align: center;
	margin: 50px 0 50px 0;
	font-size: 3rem;
`;

export default function Intro() {
	return (
		<>
			<IntroTitle>Tytuł strony</IntroTitle>
			<IntroParagraph>
				Opis strony Opis strony Opis strony Opis strony Opis strony Opis strony Opis strony Opis strony Opis strony Opis strony Opis strony Opis strony Opis strony Opis strony Opis strony Opis strony Opis strony Opis strony Opis strony Opis strony Opis strony Opis strony Opis strony Opis strony Opis strony Opis strony Opis strony Opis strony Opis strony Opis strony Opis strony Opis strony Opis strony Opis strony Opis strony 
				{/* Wyszukiwarke zrób do słów kluczowych co przeszukuje tekst i wchodzi na
			rout nowy */}
			</IntroParagraph>
		</>
	);
}
