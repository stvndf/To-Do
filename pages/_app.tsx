import type { AppProps } from "next/app";
import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Header from "../components/Header";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>To-Do List</title>
        <link rel="icon" href="favicon.svg" />
      </Head>

      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
