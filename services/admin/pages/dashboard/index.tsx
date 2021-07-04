import { useEffect, Fragment } from 'react';

//Service
import { authenticateLogin } from "../../services";

//Components
import Head from "next/head";
import { Navbar } from '../../components';

const DashboardPage = () => {
    useEffect(() => {
		authenticateLogin("service/auth/logout", true);
	}, []);

    return(
		<Fragment>
			<Head>
				<meta charSet="UTF-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<title>Dashboard</title>
				<meta
					name="description"
					content="Dashboard page for the back-end"
				/>
			</Head>
			<Navbar />
			<main>
				<p>Dashboard</p>
			</main>
		</Fragment>
	);
};
export default DashboardPage;