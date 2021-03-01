const byteToGigabyte = (byteValue) => {
    return parseFloat((byteValue * (9.31 * 10 ** -10)).toFixed(1));
};

module.exports = byteToGigabyte;