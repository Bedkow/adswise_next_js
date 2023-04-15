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
`;

export default function Intro() {
	return (
		<>
			<IntroTitle>Ta strona jest o: Dajcie nam pienionszki</IntroTitle>
			<IntroParagraph>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit quis
				expedita molestias et quo veritatis repellendus enim doloremque fugit
				voluptatem ipsum modi reprehenderit sunt possimus ad esse nemo, incidunt
				cupiditate saepe dolore vitae atque magni? Ullam aliquid blanditiis,
				quod laudantium veniam veritatis iusto mollitia nobis, odit numquam quas
				obcaecati iure!
				{/* Wyszukiwarke zrób do słów kluczowych co przeszukuje tekst i wchodzi na
			rout nowy */}
			</IntroParagraph>
		</>
	);
}
