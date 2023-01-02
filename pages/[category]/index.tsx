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

function SingleCategoryPage({
	filteredPosts,
	allCategories,
	mainLogoData,
	postsList,
}) {
	const [currentPage, setCurrentPage] = useState(1);
	const categoryName = filteredPosts.edges[0].node.categories.nodes[0].name;

	let posts = filteredPosts;
	let pageSize = 2; //////////////////////////////////////

	const onPageChange = (page) => {
		setCurrentPage(page);
	};

	console.log(`all filtered posts: ${JSON.stringify(posts.edges)}`)

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
				items={posts.edges.length}
				currentPage={currentPage}
				pageSize={pageSize}
				onPageChange={onPageChange}
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

	const paths = allCategories.edges.map((category) => ({
		params: { category: category.node.slug },
	}));
	return { paths, fallback: false };
};

export default SingleCategoryPage;
