import Router from "next/dist/client/router";
import { useEffect, useState } from 'react';

//Service
import { authenticateLogin } from "../services";

const DashboardPage = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        authenticateLogin()
        .then(isUserAuthenticated => {
            if(isUserAuthenticated === false){
                const homepageURL: string = "/admin";

                Router.push(homepageURL);
            }else{
                setIsLoading(false);
            };
        });
    }, []);

    if(isLoading){
        return <p>Loading</p>
    }else{
        return(
            <p>Dashboard</p>
        );
    };
};
export default DashboardPage;