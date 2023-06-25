import Head from "next/head";
import { GetStaticProps } from "next";
import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import {
	getAllCategories,
	getMainLogoData,
	getAllPostsForHome,
	getAllPostsWithSlug,
} from "../lib/api";
import CategoryPostsBox from "../components/category-posts-box";

export default function Index({
	allPostsForHome: { edges },
	preview,
	allCategories,
	mainLogoData,
	postsList,
}: {
	allPostsForHome?: any;
	preview: boolean;
	allCategories?: any;
	mainLogoData: any;
	postsList: any;
}) {

	const heroPost = edges[0]?.node;
	const morePostsForHome = edges.slice(1);
	let moreFilteredPostsForHome;
	// console.log(edges);
	return (
		<Layout
			preview={preview}
			allCategories={allCategories}
			mainLogoData={mainLogoData}
			postsList={postsList}>
			<Head>
				<title>AdsWise | Strona Główna</title>
			</Head>
			<Container>
				<Intro />

				{heroPost && (
					<HeroPost
						title={heroPost.title}
						coverImage={heroPost.featuredImage}
						date={heroPost.date}
						slug={heroPost.slug}
						excerpt={heroPost.excerpt}
						category={heroPost.categories}
					/>
				)}
				{morePostsForHome.length > 0 && <MoreStories postsForHome={morePostsForHome} pagination={false} tilesNumber={5} />}
				{console.log(morePostsForHome)}
				{console.log(allCategories)}
				{morePostsForHome.length > 0 &&
					allCategories.edges.map((category) => {
						if (
							!category.node.parent &&
							category.node.slug !== "pozostale" &&
							category.node.contentNodes.nodes.length > 0
						) {
							moreFilteredPostsForHome = morePostsForHome.filter((post) => {
								// console.log(`post cat slug: ${post.node.categories.nodes[0].slug}`)
								// console.log(`cat slug: ${category.node.slug}`)
								return (
									post.node.categories.nodes[0].slug === category.node.slug
								);
							});
							return (
								<CategoryPostsBox
									key={category.node.slug}
									category={category.node.name}
									tileNumber={6} //change to customize tile number
									morePostsForHome={moreFilteredPostsForHome}
								/>
							);
						}
					})}
				{morePostsForHome.length > 0 &&
					allCategories.edges.map((category) => {
						if (
							!category.node.parent &&
							category.node.slug === "pozostale" &&
							category.node.contentNodes.nodes.length > 0
						) {
							moreFilteredPostsForHome = morePostsForHome.filter((post) => {
								return (
									post.node.categories.nodes[0].slug === category.node.slug
								);
							});
							return (
								<CategoryPostsBox
									key={category.node.slug}
									category={category.node.name}
									tileNumber={6} //change to customize tile number
									morePostsForHome={moreFilteredPostsForHome}
								/>
							);
						}
					})}
			</Container>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
	const allPostsForHome = await getAllPostsForHome(preview);
	const allCategories = await getAllCategories();
	const mainLogoData = await getMainLogoData();
	const postsList = await getAllPostsWithSlug();

	return {
		props: { allPostsForHome, preview, allCategories, mainLogoData, postsList },
		revalidate: 10,
	};
};
