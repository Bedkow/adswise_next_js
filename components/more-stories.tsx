import Pagination from "./pagination";
import PostPreview from "./post-preview";
import { useState } from "react";
import { paginate } from "../helpers/paginate";
import styled from 'styled-components';

// const StyledPostPreviewContainer

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
	const [currentPage, setCurrentPage] = useState(1);

	let posts = [];
	let paginatedPosts;
	let pageSize;

	const onPageChange = (page) => {
		setCurrentPage(page);
	};

	if (pagination) {
		if (postsForHome) {
			posts = postsForHome;
			pageSize = 6;
		} else if (postsForReadMore) {
			posts = postsForReadMore;
			pageSize = 3;
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
				{postsForHome &&
					paginatedPosts.map(({ node }, index) => {
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
					paginatedPosts.map(({ node }, index) => {
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

				{/* {pagination && <Pagination
					totalItems={posts.length}
					currentPage={currentPage}
					itemsPerPage={pageSize}
				/>} */}
		</>
	);
}
