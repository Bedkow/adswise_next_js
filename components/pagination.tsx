import Link from "next/link";
import { paginate } from "../helpers/paginate";
import { useRouter } from "next/router";
import styled from "styled-components";

export type PaginationProps = {
	totalItems: number;
	currentPage: number;
	renderPageLink?: (page: number) => string;
	itemsPerPage?: number;
};

const PaginationContainer = styled.ul`
	list-style: none;
	display: flex;
	flex-direction: row;
	justify-content: center;
	margin: 30px 0px;
`

const PageLinkContainer = styled.li`
	padding: 5px;
	margin: 0px 5px;
	font-size: 1.5rem;

	&.active-page {
		a {
			font-weight: 700;
			text-decoration: underline;
		}
	}
`;

export default function Pagination({
	totalItems,
	currentPage,
	itemsPerPage = 10,
}) {
	const router = useRouter();

	const isLastPage = () => {
		if (Math.ceil(totalItems / itemsPerPage) === currentPage) {
			return true;
		} else {
			return false;
		}
	};

	const isFirstPage = () => {
		if (!router.query.pageNumber || +router.query.pageNumber === 1) {
			return true;
		} else {
			return false;
		}
	}

	const currentPaginatedCategory = router.query.category;

	const pages = paginate(totalItems, currentPage, itemsPerPage);

	if (pages.length <= 1) return null;

	return (
		<div>
			<PaginationContainer>
				{!isFirstPage() && (
					<PageLinkContainer>
						<Link href={`/${currentPaginatedCategory}/`}>{"<<"}</Link>
					</PageLinkContainer>
				)}
				{!isFirstPage() && (
					<PageLinkContainer>
						<Link
							href={`/${currentPaginatedCategory}/${
								+router.query.pageNumber === 2
									? ""
									: +router.query.pageNumber - 1
							}`}>
							{"<"}
						</Link>
					</PageLinkContainer>
				)}

				{pages.map((page) => (
					<PageLinkContainer
						key={page}
						className={`${
							page === currentPage ? "active-page" : "inactive-page"
						}`}>
						{page > 1 && (
							<Link href={`/${currentPaginatedCategory}/${page}`}>{page}</Link>
						)}

						{page === 1 && (
							<Link href={`/${currentPaginatedCategory}`}>{page}</Link>
						)}
					</PageLinkContainer>
				))}
				{!isLastPage() && (
					<PageLinkContainer>
						<Link
							href={`/${currentPaginatedCategory}/${
								isFirstPage() ? 2 : +router.query.pageNumber + 1
							}`}>
							{">"}
						</Link>
					</PageLinkContainer>
				)}
				{!isLastPage() && (
					<PageLinkContainer>
						<Link
							href={`/${currentPaginatedCategory}/${Math.ceil(
								totalItems / itemsPerPage
							)}`}>
							{">>"}
						</Link>
					</PageLinkContainer>
				)}
			</PaginationContainer>
		</div>
	);
}
