import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Breadcrumbs({
	isCategory,
	postsList,
	categoriesList,
}: {
	isCategory?: boolean;
	postsList: any;
	categoriesList: any;
}) {
	const router = useRouter();
	const currentQuery = router.query;

	let category;
	let categoryName;
	let categorySlug;

	if (router.query.category) {
		category = categoriesList.find((category) => {
			return category.node.slug === currentQuery.category;
		});
		categoryName = category?.node.name;
		categorySlug = category?.node.slug;
	}

	const post = postsList.edges.find((post) => {
		return post.node.slug === currentQuery.post;
	});

	const postTitle = post?.node.title;

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

    // ADD ANCESTOR TO BREADCRUMBS WHEN PAGE QUERY IS SUBCATEGORY @@@@

	return (
		<>
			<div>
				{(postCategoryName || categoryName) && (
					<Link href="/">
						<span>Strona Główna</span>
					</Link>
				)}
				{/* {categoryName && (
					<Link href="/">
						<span>Strona Główna</span>
					</Link>
				)} */}
				{postCategoryAncestors && <span>{` > `}</span>}
				{postCategoryAncestors && (
					<Link href={`/${postCategoryAncestorsSlug}`}>
						<span>{postCategoryAncestorsName}</span>
					</Link>
				)}
				{(postCategoryName || categoryName) && <span>{` > `}</span>}
				{postCategoryName && (
					<Link href={`/${postCategorySlug}`}>
						<span>{postCategoryName}</span>
					</Link>
				)}
				{/* {categoryName && <span>{` > `}</span>} */}
				{categoryName && (
					<>
						<span>{categoryName}</span>
					</>
				)}
				{postTitle && <span>{` > `}</span>}
				{postTitle && <span>{postTitle}</span>}
			</div>
		</>
	);
}
