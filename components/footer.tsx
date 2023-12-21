import Link from "next/link";
import styled from "styled-components";

const StyledFooter = styled.footer`
	background-color: ${(props) => props.theme.colors.navBackg};
	color: ${(props) => props.theme.colors.navBackgEl};
	width: 100%;
	min-height: 60px;
	display: flex;
	flex-direction: column;
	justify-content: center;

	a {
		color: ${(props) => props.theme.colors.navBackgEl};
	}
`;

const LinksContainer = styled.nav`
	display: flex;
	flex-direction: row;
	width: 100%;
	justify-content: center;
	gap: 20px;
	flex-wrap: wrap;
`;

export default function Footer() {
	return (
		<StyledFooter>
			<LinksContainer>
				<Link href={"/o-nas"}>O nas</Link>
				<Link href={"/kontakt"}>Kontakt</Link>
				<Link href={"/polityka-prywatnosci"}>Polityka Prywatności</Link>
				<Link href={"/regulamin"}>Regulamin</Link>
			</LinksContainer>
		</StyledFooter>
	);
}
