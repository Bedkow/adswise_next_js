const getPages = (length: number, inc: number = 1) =>
	Array.from({ length }, (_, i) => i + inc);

export const paginate = (
	totalItems: number,
	currentPage: number,
	itemsPerPage: number
) => {
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	return getPages(totalPages);
};
