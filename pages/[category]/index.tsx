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
import { useRouter } from "next/router";

function SingleCategoryPage({
	filteredPosts,
	allCategories,
	mainLogoData,
	postsList,
}) {
	const categoryName = filteredPosts.edges[0].node.categories.nodes[0].name;

	return (
		<Layout
			preview={false}
			allCategories={allCategories}
			mainLogoData={mainLogoData}
			postsList={postsList}>
			<h1>{categoryName}</h1>

			{filteredPosts.edges.map((post) => {
				return (
					<Link
						href={`/post/${post.node.slug}`}
						key={post.node.slug}>
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
}

export default SingleCategoryPage;
