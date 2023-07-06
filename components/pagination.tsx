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

const PageLinkContainer = styled.li`
	&.active-page {
		a {
			font-weight: 700;
			border: red solid 1px;
		}
	}
`;

export default function Pagination({
	totalItems,
	currentPage,
	itemsPerPage = 6,
}) {
	const router = useRouter();
	// console.log(router)

	const currentPaginatedCategory = router.query.category;

	const pages = paginate(totalItems, currentPage, itemsPerPage);

	if (pages.length <= 1) return null;

	return (
		<div>
			<hr></hr>
			<ul>
				{pages.map((page) => (
					<PageLinkContainer
						key={page}
						className={`${
							page === currentPage ? "active-page" : "inactive-page"
						}`}>
						{page > 1 && <Link href={`/${currentPaginatedCategory}/${page}`}>{page}</Link>}
						{page === 1 && <Link href={`/${currentPaginatedCategory}`}>{page}</Link>}
					</PageLinkContainer>
				))}
			</ul>
		</div>
	);
}
