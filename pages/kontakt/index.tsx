import Layout from "../../components/layout";
import { GetStaticProps } from "next";
import { getAllCategories, getAllPostsForHome, getAllPostsWithSlug, getMainLogoData } from "../../lib/api";
import styled from "styled-components";

export const StyledTitle = styled.h1`
  padding: 5px;
  width: max-content;
  border: 3px black solid;
  margin: 10px auto 50px auto;

  @media screen and (max-width: 700px) {
    max-width: 100%;
  }
`

const StyledEmail = styled.a`
  &:hover {
    text-decoration: underline;
  }
`

export default function Contact({ mainLogoData, postsList, allCategories }) {
	return (
		<Layout
			preview={false}
			mainLogoData={mainLogoData}
			allCategories={allCategories}
			postsList={postsList}>

			<StyledTitle>Kontakt</StyledTitle>
			<div>
				Wszelkie zapytania prosimy kierować na adres e-mail:{" "}
				<StyledEmail href='mailto:kontakt@adswise.pl'>
					kontakt@adswise.pl
				</StyledEmail>
			</div>

		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
	const allCategories = await getAllCategories();
	const mainLogoData = await getMainLogoData();
	const postsList = await getAllPostsWithSlug();

	return {
		props: { preview, allCategories, mainLogoData, postsList },
		revalidate: 10,
	};
};