import { useEffect } from "react";
import { useRouter } from "next/dist/client/router";

//Service
import { authenticateLogin } from "../services";

const DashboardPage = () => {
    const router = useRouter();

    const homepageURL: string = `http://localhost:${process.env.PORT || 9005}/admin`;

    useEffect(() => {
        (async () => {
            const isUserAuthenticated = await authenticateLogin({isReverse: true});

            if(isUserAuthenticated){
                router.push(homepageURL);
            };
        })();
    });

    return(
        <div>Dashboard</div>
    );
};

export default DashboardPage;