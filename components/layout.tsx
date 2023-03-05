import Alert from "./alert";
import Footer from "./footer";
import Header from "./header";
import Meta from "./meta";
import styled from "styled-components";

const PageLayout = styled.div`
	max-width: 100%;

	@media only screen and (min-width: ${(props) =>props.theme.breakpoints.tabletPlus}px) {
		main {
			margin: 0 50px;
		}
	}
`;

const PageContent = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;

	main {
		flex-grow: 1;
	}
`;

export default function Layout({
	preview,
	allCategories,
	children,
	mainLogoData,
	postsList,
}: {
	preview: boolean;
	allCategories?: any;
	children: any;
	mainLogoData: any;
	postsList: any;
}) {
	return (
		<PageLayout className='layout'>
			<Meta />
			<Alert preview={preview} />
			<PageContent>
				<Header
					allCategories={allCategories}
					mainLogoData={mainLogoData}
					postsList={postsList}
				/>
				<main>{children}</main>
				<Footer />
			</PageContent>
		</PageLayout>
	);
}
