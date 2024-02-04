export const convertToMB = (bytes) => {
	const size = (bytes / (1024 * 1024)).toFixed(2);
	return `${size} MB`;
};
