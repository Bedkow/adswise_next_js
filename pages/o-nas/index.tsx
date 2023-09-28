import Layout from "../../components/layout";
import { GetStaticProps } from "next";
import { getAllCategories, getAllPostsWithSlug, getMainLogoData } from "../../lib/api";
import styled from "styled-components";
import { StyledTitle } from "../kontakt";

export default function AboutUs({ mainLogoData, postsList, allCategories }) {
	return (
		<Layout
			preview={false}
			mainLogoData={mainLogoData}
			allCategories={allCategories}
			postsList={postsList}>

			<StyledTitle>O nas</StyledTitle>
      <div>Lorem Ipsum</div>
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
