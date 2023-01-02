import Pagination from "./pagination";
import PostPreview from "./post-preview";
import { useState } from "react";
import { paginate } from '../helpers/paginate';

export default function MoreStories({
	postsForHome,
	postsForReadMore,
}: {
	postsForHome?: any;
	postsForReadMore?: any;
}) {
	const [currentPage, setCurrentPage] = useState(1);

	let posts = [];
	let pageSize;
	if (postsForHome) {
		posts = postsForHome;
		pageSize = 6;
	} else if (postsForReadMore) {
		posts = postsForReadMore;
		pageSize = 3;
	}

	const onPageChange = (page) => {
		setCurrentPage(page);
	};

	console.log(currentPage);

  const paginatedPosts = paginate(posts, currentPage, pageSize)

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

				<Pagination
					items={posts.length}
					currentPage={currentPage}
					pageSize={pageSize}
					onPageChange={onPageChange}
				/>
			</div>
		</section>
	);
}
