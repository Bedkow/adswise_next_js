import {paginate} from '../helpers/paginate';

export type PaginationProps = {
	totalItems: number
	currentPage: number
	renderPageLink?: (page: number) => string
	itemsPerPage?: number
  }

export default function Pagination({
	totalItems,
	currentPage,
	itemsPerPage = 6
}) {

	const pages = paginate(totalItems, currentPage, itemsPerPage)

	if (pages.length <= 1) return null;

	return (
		<div>
            <hr></hr>
			<ul>
				{pages.map((page) => (
					<li key={page} className={`${
						page === currentPage ? 'active-page' : 'inactive-page'
					  }`}>
						<a>{page}</a>
					</li>
				))}
			</ul>
		</div>
	);
}
