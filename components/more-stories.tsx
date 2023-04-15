import Pagination from "./pagination";
import PostPreview from "./post-preview";
import { useState } from "react";
import { paginate } from "../helpers/paginate";

export default function MoreStories({
	postsForHome,
	postsForReadMore,
	pagination,
}: {
	postsForHome?: any;
	postsForReadMore?: any;
	pagination?: boolean;
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

		paginatedPosts = posts /*paginate(posts, currentPage, pageSize);*/

	} else {

		if (postsForHome) {
			posts = postsForHome;
		} else if (postsForReadMore) {
			posts = postsForReadMore;
		}

		paginatedPosts = posts;
	}

	return (
		<section>
			<h2>Więcej Artykułów</h2>
			<div>
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
			</div>
		</section>
	);
}
