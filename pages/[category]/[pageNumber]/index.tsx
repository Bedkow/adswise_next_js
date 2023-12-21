import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import {
	getAllCategories,
	getPostsByCategory,
	getMainLogoData,
	getAllPostsWithSlug,
} from "../../../lib/api";
import Link from "next/link";
import Layout from "../../../components/layout";
import Pagination from "../../../components/pagination";
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

function SingleCategoryPageNext({
	filteredPosts,
	allCategories,
	mainLogoData,
	postsList,
}) {
	const router = useRouter();

	const foundPost = filteredPosts.edges.find((post) => {
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
	let currentPage = +router.query.pageNumber;

	// number of posts per page, passed to pagination
	let perPage = 10;

	// calc starting index to slice
	let sliceStartingIndex = (currentPage - 1) * perPage;

	// only posts for current page
	let filteredSlicedPosts = filteredPosts.edges.slice(
		sliceStartingIndex,
		sliceStartingIndex + perPage
	);

	return (
		<Layout
			preview={false}
			allCategories={allCategories}
			mainLogoData={mainLogoData}
			postsList={postsList}>

			<CategoryPageTitle>{categoryName()}</CategoryPageTitle>
			
			<CategoryPagePostsLayout>
			{filteredSlicedPosts.map((post) => {
				return (
					<Link href={`/post/${post.node.slug}`} key={post.node.slug}>
						{post.node.featuredImage && (
							<img
							alt={post.node.featuredImage.node.altText}
							src={post.node.featuredImage.node.sourceUrl}></img>
						)}
						<h2>{post.node.title}</h2>
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

	let generatedPaths = [];

	allCategories.edges.map((category) => {
		let pageNumber = Math.ceil(category.node.contentNodes.nodes.length / 1);
		let pages = Array.from({ length: pageNumber }, (_, i) => i + 1);

		pages.map((page) => {
			generatedPaths.push({
				params: {
					category: category.node.slug,
					pageNumber: page.toString(),
				},
			});
		});
	});

	return { paths: generatedPaths, fallback: false };
};

export default SingleCategoryPageNext;
