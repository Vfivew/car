const getDays = (startDate: string, endDate: string) => {
	const start = new Date(startDate);
	const end = new Date(endDate);
	const timeDifference = end.getTime() - start.getTime();
	const oneDay = 1000 * 60 * 60 * 24;

	return Math.floor(timeDifference / oneDay);
};

export { getDays };
