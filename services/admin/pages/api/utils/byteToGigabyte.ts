const byteToGigabyte = (bytes: number): number => {
	return parseFloat((bytes * (9.31 * 10 ** -10)).toFixed(1));
};

export default byteToGigabyte;