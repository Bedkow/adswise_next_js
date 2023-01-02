

export default function Pagination({
	items,
	currentPage,
	pageSize,
	onPageChange,
}) {
	const pagesCount = Math.ceil(items / pageSize);

	if (pagesCount === 1) return null;

	const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

    console.log(`number of items : ${items}`)
    console.log(`pages count: ${pagesCount}`)
    console.log(pages)
    console.log(`current page: ${currentPage}`)


	return (
		<div>
            <hr></hr>
			<ul>
				{pages.map((page) => (
					<li key={page}>
						<a onClick={() => onPageChange(page)}>{page}</a>
					</li>
				))}
			</ul>
		</div>
	);
}
