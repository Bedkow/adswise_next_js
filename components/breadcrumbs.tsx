import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

const BreadcrumbsContainerStyled = styled.div`
	color: ${(props) => props.theme.colors.text};
	background-color: ${(props) => props.theme.colors.primary};
	white-space: nowrap;
	overflow: auto;
	min-height: 23px;
	width: 100%;

	a {
		color: ${(props) => props.theme.colors.text};
	}
`;

export default function Breadcrumbs({
	postsList,
	categoriesList,
}: {
	postsList?: any;
	categoriesList?: any;
}) {
	const router = useRouter();
	const currentQuery = router.query;
	const currentRoute = router.route;

	let category;
	let categoryName;

	if (router.query.category) {
		category = categoriesList.find((category) => {
			return category.node.slug === currentQuery.category;
		});
		categoryName = category?.node.name;
	}

	let postCategoryName;
	let postCategorySlug;
	let postCategoryAncestors;
	let postCategoryAncestorsName;
	let postCategoryAncestorsSlug;
	let postTitle;

	if (postsList) {
		const post = postsList.edges.find((post) => {
			return post.node.slug === currentQuery.post;
		});

		postTitle = post?.node.title;

		postCategoryName = post?.node.categories.edges[0].node.name;
		postCategorySlug = post?.node.categories.edges[0].node.slug;
		postCategoryAncestors = post?.node.categories.edges[0].node.ancestors;

		if (postCategoryAncestors) {
			postCategoryAncestorsName =
				post?.node.categories.edges[0].node.ancestors.edges[0].node.name;
			postCategoryAncestorsSlug =
				post?.node.categories.edges[0].node.ancestors.edges[0].node.slug;
		}
	}

	let routeIsPage = false;
	if (
		currentRoute === "/o-nas" ||
		currentRoute === "/kontakt" ||
		currentRoute === "/polityka-prywatnosci" ||
		currentRoute === "/regulamin"
	) {
		routeIsPage = true;
	}

	return (
		<BreadcrumbsContainerStyled>
			<div>
				{(postCategoryName || categoryName || routeIsPage) && (
					<Link href='/'>
						<span>Strona Główna</span>
					</Link>
				)}
				{routeIsPage && <span>{` > `}</span>}
				{(() => {
					switch (currentRoute) {
						case "/o-nas":
							return <span>O nas</span>;
						case "/kontakt":
							return <span>Kontakt</span>;
						case "/polityka-prywatnosci":
							return <span>Polityka prywatności</span>;
						case "/regulamin":
							return <span>Regulamin</span>;
						default:
							return null;
					}
				})()}

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
				{categoryName && (
					<>
						<span>{categoryName}</span>
					</>
				)}
				{postTitle && <span>{` > `}</span>}
				{postTitle && <span>{postTitle}</span>}
			</div>
		</BreadcrumbsContainerStyled>
	);
}
