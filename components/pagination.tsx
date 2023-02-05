

export default function Pagination({
	items,
	currentPage,
	pageSize
}) {
	const pagesCount = Math.ceil(items / pageSize);

	if (pagesCount === 1) return null;

	const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

	return (
		<div>
            <hr></hr>
			<ul>
				{pages.map((page) => (
					<li key={page}>
						<a>{page}</a>
					</li>
				))}
			</ul>
		</div>
	);
}
