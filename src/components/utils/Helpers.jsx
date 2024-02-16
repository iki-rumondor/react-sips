export const convertToMB = (bytes) => {
	const size = (bytes / (1024 * 1024)).toFixed(2);
	return `${size} MB`;
};

export const generateYearArray = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= currentYear - 5; i--) {
        years.push(i);
    }
    return years;
}
