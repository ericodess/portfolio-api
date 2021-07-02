const authenticateLogin = async (redirectPath?: string, isAuthenticatedOnly: boolean = false) => {
	const pageRootPath: string = "http://localhost:9005/admin",
		  authEndpoint: string = "service/auth",
		  fetchURL: string = `${pageRootPath}/${authEndpoint}`

    await fetch(fetchURL, {
        credentials: 'include'
    })
	.then(response => response.json())
	.then(result => {
		if(redirectPath){
			if(isAuthenticatedOnly){
				if(result.isUserAuthenticated === false){
					window.location.replace(`${pageRootPath}/${redirectPath}`);
				};
			}else{
				if(result.isUserAuthenticated){
					window.location.replace(`${pageRootPath}/${redirectPath}`);
				};
			};
		}
	})
    .catch(error => console.log(error));
};

export default authenticateLogin;