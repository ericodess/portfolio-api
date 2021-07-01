import type { AppProps } from "next/app";

//Styles
import "../styles/main.scss";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}
export default MyApp
