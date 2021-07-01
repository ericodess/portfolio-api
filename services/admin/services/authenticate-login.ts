//Interfaces
import { IAuthenticateLogin } from "../interfaces/service";

const authenticateLogin = async (params: IAuthenticateLogin): Promise<boolean> => {
    const {
        isReverse = false
    } = params;

    const result = await fetch("http://localhost:9005/admin/service/login/auth", {
              credentials: 'include'
          })
          .then(data => data.json())
          .catch(error => console.log(error));

    if(result && result.isUserAuthenticated){
        if(isReverse){
            return !result.isUserAuthenticated;
        }else{
            return result.isUserAuthenticated;
        };
    }else{
        if(isReverse){
            return true;
        }else{
            return false;
        };
    };
};

export default authenticateLogin;