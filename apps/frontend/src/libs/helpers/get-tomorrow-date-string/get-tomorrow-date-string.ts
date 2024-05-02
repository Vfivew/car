const getTomorrowDateString = (date: any): string => {
	const tomorrow = new Date(date);
	tomorrow.setDate(tomorrow.getDate() + 1);
	const year = tomorrow.getFullYear();
	const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
	const day = String(tomorrow.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
};

export { getTomorrowDateString };
