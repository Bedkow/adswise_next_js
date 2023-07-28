import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import {
	getAllCategories,
	getPostsByCategory,
	getMainLogoData,
	getAllPostsWithSlug,
} from "../../../lib/api";
import Link from "next/link";
import Image from "next/image";
import Layout from "../../../components/layout";
import Pagination from "../../../components/pagination";
import { useState } from "react";
import { paginate } from "../../../helpers/paginate";
import { useRouter } from "next/router";
import postcss from "postcss";

function SingleCategoryPageNext({
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
			<h1>{categoryName()}</h1>

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

	// const pagesCount = Math.ceil(itemsCount / pageSize);
	// const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

	let generatedPaths = [];

	allCategories.edges.map((category) => {
		// x / page size (post number)
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
