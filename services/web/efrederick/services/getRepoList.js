const getRepoList = (userName, requestHeaders) => {
    const fetch = require('node-fetch');

	return new Promise((resolve, reject) => {
		fetch(`https://api.github.com/users/${userName}/repos`, {
			headers: requestHeaders
		})
		.then(response => {
			resolve(response.json());
		})
		.catch(error => {
			reject(error);
		})
	})
};

module.exports = getRepoList;