import jwt from "jsonwebtoken";

const authCredentials = (accessToken: string): boolean => {
    let isAuthenticatedUser: boolean = false;

    if(
        accessToken &&
        accessToken.replace(/\s/g, '').length
    ){
        if(
            process.env.SECRET &&
            accessToken.replace(/\s/g, '').length
        ){
            jwt.verify(
                accessToken,
                process.env.SECRET,
                (err) => {
                    if(!err){
                        isAuthenticatedUser = true;
                    }
                }
            );
        };
    };

    return isAuthenticatedUser;
};

export default authCredentials;