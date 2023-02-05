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
	// const [currentPage, setCurrentPage] = useState(1);

	const router = useRouter();

	const foundPost = filteredPosts.edges.find((post, index) => {
		return post.node.categories.nodes[0].slug === router.query.category;
	});

	const categoryName = foundPost.node.categories.nodes[0].name;

	let posts = filteredPosts;
	let pageSize = 1; //////////////////////////////////////

	// const onPageChange = (page) => {
	// 	setCurrentPage(page);
	// };

	let currentPage = router.query.pageNumber;

	const paginatedPosts = paginate(posts.edges, currentPage, pageSize);

	return (
		<Layout
			preview={false}
			allCategories={allCategories}
			mainLogoData={mainLogoData}
			postsList={postsList}>
				
			<h1>{categoryName}</h1>

			{paginatedPosts.map((post) => {
				return (
					<Link href={`/post/${post.node.slug}`} key={post.node.slug}>
						{post.node.featuredImage && (
							<Image
								width={100}
								height={100}
								alt={post.node.featuredImage.node.altText}
								src={post.node.featuredImage.node.sourceUrl}></Image>
						)}
						<h2>{post.node.title}</h2>
					</Link>
				);
			})}

			<Pagination
				items={posts.edges.length} ////???
				currentPage={currentPage}
				pageSize={pageSize}
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
