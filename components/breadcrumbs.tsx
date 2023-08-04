import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

const BreadcrumbsContainerStyled = styled.div`
	color: ${props => props.theme.colors.navBackgEl};
  background-color: ${props => props.theme.colors.navBackg};
  white-space: nowrap;
  overflow: auto;
  min-height: 23px;
  width:100%;
  padding-left: 20px;
  /* overflow-y: hidden; */
  /* width: 100%; */
	/* position: absolute; */
	/* left: 5px; */
	/* top: 60px; */
	/* white-space: nowrap;
	font-size: 2.2vw; */

	/* @media screen and (min-width: 850px) {
		font-size: 1rem;
		left: 20px;
	} */

	a {
		color: ${props => props.theme.colors.navBackgEl};
	}
`

export default function Breadcrumbs({
	isCategory,
	postsList,
	categoriesList,
}: {
	isCategory?: boolean;
	postsList?: any;
	categoriesList?: any;
}) {
	const router = useRouter();
	const currentQuery = router.query;
	const currentRoute = router.route;

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

	// ADD ANCESTOR TO BREADCRUMBS WHEN PAGE QUERY IS SUBCATEGORY @@@@

	return (
		<BreadcrumbsContainerStyled>
			<div>
				{(postCategoryName || categoryName || routeIsPage) && (
					<Link href='/'>
						<span>Strona Główna</span>
					</Link>
				)}
				{(routeIsPage) && <span>{` > `}</span>}
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
      </BreadcrumbsContainerStyled>
	);
}
