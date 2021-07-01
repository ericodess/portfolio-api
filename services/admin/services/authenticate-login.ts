const authenticateLogin = async (): Promise<boolean> => {
    const result = await fetch("http://localhost:9005/admin/service/login/auth", {
              credentials: 'include'
          })
          .then(data => data.json())
          .catch(error => console.log(error));

    if(result && result.isUserAuthenticated){
        return result.isUserAuthenticated;
    }else{
        return false;
    };
};

export default authenticateLogin;