import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Breadcrumbs({ categoriesList, postsList }) {
	const router = useRouter();
	const currentQuery = router.query;

	// const category = categoriesList.find((category) => {
	//     return category.node.slug === currentQuery.category
	// })
	// const categoryName = category?.node.name;
	// const categorySlug = category?.node.slug;

	const post = postsList.edges.find((post) => {
		return post.node.slug === currentQuery.post;
	});

	const postTitle = post?.node.title;
	// console.log(post)

	let postCategoryName;
	let postCategorySlug;
	let postCategoryAncestors;
	let postCategoryAncestorsName;
	let postCategoryAncestorsSlug;

	postCategoryName = post?.node.categories.edges[0].node.name;
	postCategorySlug = post?.node.categories.edges[0].node.slug;
	postCategoryAncestors = post?.node.categories.edges[0].node.ancestors;

	if (postCategoryAncestors) {
		postCategoryAncestorsName =
			post?.node.categories.edges[0].node.ancestors.edges[0].node.name;
		postCategoryAncestorsSlug =
			post?.node.categories.edges[0].node.ancestors.edges[0].node.slug;
	}

	return (
		<>
			<div>
				{postCategoryName && (
					<Link href="/">
						<span>Strona Główna</span>
					</Link>
				)}
				{postCategoryAncestors && <span>{` > `}</span>}
				{postCategoryAncestors && (
					<Link href={`/${postCategoryAncestorsSlug}`}>
						<span>{postCategoryAncestorsName}</span>
					</Link>
				)}
				{postCategoryName && <span>{` > `}</span>}
				{postCategoryName && (
					<Link href={`/${postCategorySlug}`}>
						<span>{postCategoryName}</span>
					</Link>
				)}
				{postTitle && <span>{` > `}</span>}
				{postTitle && <span>{postTitle}</span>}
			</div>
		</>
	);
}
