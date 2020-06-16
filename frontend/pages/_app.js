import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import Head from "next/head";
import { NextSeo } from "next-seo";
import "antd/dist/antd.min.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const handleExitComplete = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0 });
    }
  };

  return (
    <AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>
      <Head key="default-head">
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="A website dedicated to Ron Weasley. Inspired by the awesome work of Ron Weasley Defense Squad."
        />
        <meta name="theme-color" content="#ffffff" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <NextSeo key="default-seo" />
      <Component {...pageProps} key={router.route} />
    </AnimatePresence>
  );
}

export default MyApp;
