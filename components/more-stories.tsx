import PostPreview from "./post-preview";
import { useState } from "react";
import styled from 'styled-components';

const PostsForReadMoreContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-auto-rows: 1fr;
	gap: 60px;
	margin-bottom: 40px;

  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`

export default function MoreStories({
	postsForHome,
	postsForReadMore,
	pagination,
	tilesNumber,
}: {
	postsForHome?: any;
	postsForReadMore?: any;
	pagination?: boolean;
	tilesNumber?: number;
}) {


	let posts = [];
	let paginatedPosts;
	let pageSize;

	if (pagination) {
		if (postsForHome) {
			posts = postsForHome;
			pageSize = 6;
		} else if (postsForReadMore) {
			posts = postsForReadMore;
			pageSize = 4;
		}

		paginatedPosts = posts; /*paginate(posts, currentPage, pageSize);*/
	} else {
		if (postsForHome) {
			if (tilesNumber) {
				posts = postsForHome.slice(0, tilesNumber);
			} else {
				posts = postsForHome;
			}
		} else if (postsForReadMore) {
			if (tilesNumber) {
				posts = postsForReadMore.slice(0, tilesNumber);
			} else {
				posts = postsForReadMore;
			}
		}

		paginatedPosts = posts;
	}

	return (
		<>	
				{postsForHome && paginatedPosts.map(({ node }, index) => {
						return (
							<PostPreview
								key={node.slug}
								title={node.title}
								coverImage={node.featuredImage}
								date={node.date}
								slug={node.slug}
								excerpt={node.excerpt}
								category={node.categories.nodes[0].slug}
							/>
						);
					})}
					

				{postsForReadMore && 
					<PostsForReadMoreContainer>
						{paginatedPosts.map(({ node }, index) => {
							return (
								<PostPreview
									key={node.slug}
									title={node.title}
									coverImage={node.featuredImage}
									date={node.date}
									slug={node.slug}
									excerpt={node.excerpt}
									category={node.categories.edges[0].node.slug}
								/>
							);
						})}
					</PostsForReadMoreContainer>}
		</>
	);
}
