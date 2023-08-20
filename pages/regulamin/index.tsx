import Layout from "../../components/layout";
import { GetStaticProps } from "next";
import { getAllCategories, getAllPostsWithSlug, getMainLogoData } from "../../lib/api";
import styled from "styled-components";

const StyledTitle = styled.h1`
  padding: 5px;
  width: max-content;
  border: 3px black solid;
  margin-bottom: 50px;
`

export default function TermsOfService({ mainLogoData, postsList, allCategories }) {
	return (
		<Layout
			preview={false}
			mainLogoData={mainLogoData}
			allCategories={allCategories}
			postsList={postsList}>
			<StyledTitle>Regulamin</StyledTitle>
      <div>lorem ipsum</div>
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
