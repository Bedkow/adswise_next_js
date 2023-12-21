import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import {
	getAllCategories,
	getPostsByCategory,
	getMainLogoData,
	getAllPostsWithSlug,
} from "../../lib/api";
import Link from "next/link";
import Layout from "../../components/layout";
import Pagination from "../../components/pagination";
import { useRouter } from "next/router";
import styled from "styled-components";

const CategoryPagePostsLayout = styled.div`
	display: grid;
	gap: 60px;
	grid-template-columns: 1fr 1fr;
	grid-auto-rows: 1fr;

	@media only screen and (max-width: 700px) {
		grid-template-columns: 1fr;
	}

	img {
		max-width: 100%;
		height: auto;
	}
`

const CategoryPageTitle = styled.h1`
	padding: 50px 0px 30px 0px;
`

function SingleCategoryPage({
	filteredPosts,
	allCategories,
	mainLogoData,
	postsList,
}) {

	const router = useRouter();

	const foundPost = filteredPosts.edges.find((post, index) => {
		return (
			post.node.categories.nodes[0].slug === router.query.category ||
			post.node.categories.nodes[0].ancestors.nodes[0].slug ===
				router.query.category
		);
	});

	const categoryName = () => {
		if (foundPost.node.categories.nodes[0].slug === router.query.category) {
			return foundPost.node.categories.nodes[0].name;
		} else if (
			foundPost.node.categories.nodes[0].ancestors.nodes[0].slug ===
			router.query.category
		) {
			return foundPost.node.categories.nodes[0].ancestors.nodes[0].name;
		} else {
			// if anything breaks, pretend everything is fine
			return "-Strona Kategorii-";
		}
	};

	// current pagination page number
	let currentPage = 1;

	// number of posts per page, passed to pagination
	let perPage = 10;

	// only posts for current page
	let filteredSlicedPosts = filteredPosts.edges.slice(0, perPage);

	return (
		<Layout
			preview={false}
			allCategories={allCategories}
			mainLogoData={mainLogoData}
			postsList={postsList}>

			<CategoryPageTitle>{`| ${categoryName()}`}</CategoryPageTitle>

			<CategoryPagePostsLayout>
			{filteredSlicedPosts.map((paginatedPost) => {
				return (
					<Link
						href={`/post/${paginatedPost.node.slug}`}
						key={paginatedPost.node.slug}>
						{paginatedPost.node.featuredImage && (
							<img
								alt={paginatedPost.node.featuredImage.node.altText}
								src={paginatedPost.node.featuredImage.node.sourceUrl}></img>
								
						)}
						<h2>{paginatedPost.node.title}</h2>
					</Link>
				);
			})}
			</CategoryPagePostsLayout>

			<Pagination
				totalItems={filteredPosts.edges.length}
				currentPage={currentPage}
				itemsPerPage={perPage}
			/>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async (context) => {
	const { params } = context;
	const filteredPosts = await getPostsByCategory(params.category);
	const mainLogoData = await getMainLogoData();
	const allCategories = await getAllCategories();
	const postsList = await getAllPostsWithSlug();

	return {
		props: {
			filteredPosts,
			allCategories,
			mainLogoData,
			postsList,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const allCategories = await getAllCategories();
	const filteredAllCategories = allCategories.edges.filter((category) => {
		return category.node.contentNodes.nodes.length > 0;
	});

	const paths = filteredAllCategories.map((category) => ({
		params: { category: category.node.slug },
	}));
	return { paths, fallback: false };
};

export default SingleCategoryPage;
