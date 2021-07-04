//Types
import type { AppProps } from "next/app";

//Styles
import "./styles/main.scss";

const AdminApp = ({ Component, pageProps }: AppProps) => {
	return(
		<Component
			{...pageProps}
		/>
	);
};

export default AdminApp;