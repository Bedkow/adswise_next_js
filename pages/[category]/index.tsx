import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import {
	getAllCategories,
	getPostsByCategory,
	getMainLogoData,
	getAllPostsWithSlug,
} from "../../lib/api";
import Link from "next/link";
import Image from "next/image";
import Layout from "../../components/layout";
import Pagination from "../../components/pagination";
import { useState } from "react";
import { paginate } from "../../helpers/paginate";
import { useRouter } from "next/router";

function SingleCategoryPage({
	filteredPosts,
	allCategories,
	mainLogoData,
	postsList,
}) {
	//
	// console.log(filteredPosts)
	//

	const router = useRouter();

	const foundPost = filteredPosts.edges.find((post, index) => {
		return (
			post.node.categories.nodes[0].slug === router.query.category ||
			post.node.categories.nodes[0].ancestors.nodes[0].slug ===
				router.query.category
		);
	});

	// console.log(foundPost);

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
	let perPage = 6;

	// only posts for current page
	let filteredSlicedPosts = filteredPosts.edges.slice(0, perPage);

	return (
		<Layout
			preview={false}
			allCategories={allCategories}
			mainLogoData={mainLogoData}
			postsList={postsList}>
			<h1>{categoryName()}</h1>

			{filteredSlicedPosts.map((paginatedPost) => {
				return (
					<Link
						href={`/post/${paginatedPost.node.slug}`}
						key={paginatedPost.node.slug}>
						{paginatedPost.node.featuredImage && (
							<Image
								width={100}
								height={100}
								alt={paginatedPost.node.featuredImage.node.altText}
								src={paginatedPost.node.featuredImage.node.sourceUrl}></Image>
						)}
						<h2>{paginatedPost.node.title}</h2>
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
	// console.log(allCategories.edges[0].node.contentNodes.nodes.length)
	const filteredAllCategories = allCategories.edges.filter((category) => {
		return category.node.contentNodes.nodes.length > 0;
	});

	// console.log("filtered:@@@@@@@@@@@@@@@@@@@ \n" + filteredAllCategories)

	const paths = filteredAllCategories.map((category) => ({
		params: { category: category.node.slug },
	}));
	return { paths, fallback: false };
};

export default SingleCategoryPage;
