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
import styled from "styled-components";
import { useEffect, useState } from "react";
import { debounce } from "../helpers/debounce";

const StyledTopPostsContainer = styled.div`
	/* border: solid black 2px; */
	display: grid;
	width: 100%;
	height: min-content;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(3, 1fr);
	gap: 20px;
	max-width: 1400px;
	margin: 0 auto 0 auto;

	@media screen and (max-width: 1000px) {
		grid-template-rows: repeat(4, 1fr);
		grid-template-columns: repeat(2, 1fr);
	}

	@media screen and (max-width: 700px) {
		grid-template-rows: 1.5fr repeat(4, 1fr);
		grid-template-columns: 1fr;
	}
`;
const StyledHeroPostContainer = styled.div`
	grid-column-start: 1;
	grid-column-end: 3;
	grid-row-start: 1;
	grid-row-end: 3;

	@media screen and (max-width: 1000px) {
		grid-row-end: 3;
		grid-column-end: 3;
	}

	@media screen and (max-width: 700px) {
		grid-row-end: 2;
		grid-column-end: 2;
	}
`;

const RecentPostsTitle = styled.h2`
	width: max-content;
	margin: auto;
	font-size: 2rem;
`

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
	const [width, setWidth] = useState(0);
	const [morePostsForHomeTileNumber, setMorePostsForHomeTileNumber] = useState(5);
	const [isMobile, setIsMobile] = useState(false)

	if (typeof window !== "undefined") {
		// browser code
		window.addEventListener(
			"resize",
			debounce(() => {
				setWidth(window.innerWidth);
			}, 50)
		);
	}

	useEffect(() => {
		if (typeof window !== "undefined") {
			setWidth(window.innerWidth);
			if (width <= 1000 && morePostsForHomeTileNumber != 4) {
				setMorePostsForHomeTileNumber(4);
			} else if (width > 1000 && morePostsForHomeTileNumber != 5) {
				setMorePostsForHomeTileNumber(5);
			}

			// check if device is mobile
			if (width <= 700) {
				setIsMobile(true);
			} else {
				setIsMobile(false);
			}
		}
	}, [width]);

	const heroPost = edges[0]?.node;
	const morePostsForHome = edges.slice(1);
	let moreFilteredPostsForHome;
	let currentLayoutID;

	// function for different category tile styling prop
	const calcLayoutID = (currentLayoutID) => {
		if (!currentLayoutID) {
			currentLayoutID = 1;
		} else if (currentLayoutID == 1) {
			currentLayoutID = 2;
		} else if (currentLayoutID == 2) {
			currentLayoutID = 3;
		} else if (currentLayoutID == 3) {
			currentLayoutID = 1;
		} else {
			currentLayoutID = 1;
		}
		return currentLayoutID;
	}

	//filter out categories without posts
	const allCategoriesWithPosts = allCategories.edges.filter((category)=>{
		return (
			category.node.contentNodes.nodes.length > 0
		)
	})

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
				<section>
					<Intro />
					<RecentPostsTitle>Ostatnie Posty</RecentPostsTitle>
					<StyledTopPostsContainer>
						{heroPost && (
							<StyledHeroPostContainer>
								<HeroPost
									title={heroPost.title}
									coverImage={heroPost.featuredImage}
									date={heroPost.date}
									slug={heroPost.slug}
									excerpt={heroPost.excerpt}
									category={heroPost.categories}
								/>
							</StyledHeroPostContainer>
						)}

						{morePostsForHome.length > 0 && (
							<MoreStories
								postsForHome={morePostsForHome}
								pagination={false}
								tilesNumber={morePostsForHomeTileNumber}
							/>
						)}
					</StyledTopPostsContainer>
				</section>

				{morePostsForHome.length > 0 &&
					allCategoriesWithPosts.map((category) => {
						if (
							!category.node.parent &&
							category.node.slug !== "pozostale" &&
							category.node.contentNodes.nodes.length > 0
						) {
							currentLayoutID = calcLayoutID(currentLayoutID);
							moreFilteredPostsForHome = morePostsForHome.filter((post) => {
								return (
									post.node.categories.nodes[0].slug === category.node.slug
								);
							});
							return (
								<CategoryPostsBox
									key={category.node.slug}
									category={category.node.name}
									tileNumber={currentLayoutID == 2 ? 5 : 6} //change to customize tile number
									morePostsForHome={moreFilteredPostsForHome}
									layoutID={currentLayoutID}
									isMobile={isMobile}
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
									layoutID={3}
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
