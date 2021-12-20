import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

export default function ToDoListApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>To-Do List</title>
        <link rel="icon" href="favicon.svg" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}
