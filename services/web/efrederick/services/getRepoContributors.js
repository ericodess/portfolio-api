const getRepoContributors = (userName, repoName, requestHeaders) => {
    const fetch = require('node-fetch');
    
	return new Promise((resolve, reject) => {
		fetch(`https://api.github.com/repos/${userName}/${repoName}/stats/contributors`, {
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

module.exports = getRepoContributors;