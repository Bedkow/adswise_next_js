import Alert from "./alert";
import Footer from "./footer";
import Header from "./header";
import Meta from "./meta";
import styled from "styled-components";
import { useRouter } from "next/router";
import Breadcrumbs from "./breadcrumbs";

const PageLayout = styled.div`
	width: 100%;

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
		max-width: 1400px;
		width: 100%;
		margin: 0 auto 0 auto;
		padding: 50px 50px 50px 50px;
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
	postsList?: any;
}) {

  const categoriesList = allCategories?.edges;

  const router = useRouter();
  console.log(router.route)
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
        {router.route !== "/" ? <Breadcrumbs categoriesList={categoriesList} postsList={postsList} /> : null}
				<main>{children}</main>
				<Footer />
			</PageContent>
		</PageLayout>
	);
}
