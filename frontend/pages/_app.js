import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import Head from "next/head";
import "antd/dist/antd.min.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const handleExitComplete = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0 });
    }
  };

  const jsonld_data = {
    "@context": "http://schema.org",
    "@type": "WebSite",
    name: "Ron Weasley Appreciation Website",
    url: "https://www.ronweasley.co",
    creator: "Divyanshu Sahu",
    keywords:
      "harry potter, ron weasley, hermione granger, appreciation, defense, fanarts, fanfiction, checkmated.org",
    sameAs: [
      "https://www.facebook.com/divyanshu.sahu1997",
      "https://www.instagram.com/_divyanshusahu_/",
      "https://www.linkedin.com/in/divyanshu-sahu/",
    ],
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

        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="divyan5hu" />
        <meta name="twitter:creator" content="divyan5hu" />
        <meta name="twitter:url" content="https://www.ronweasley.co" />
        <meta
          name="twitter:title"
          content="A place where we love Ron Weasley"
        />
        <meta
          name="twitter:description"
          content="A website dedicated to Ron Weasley. Inspired by the amazing work of Ron Weasley Defense Squad."
        />
        <meta
          name="twitter:image"
          content="https://www.ronweasley.co/ron_weasley/landscape.webp"
        />
        <meta name="twitter:image:alt" content="Ron Weasley Wall" />

        <meta property="og:url" content="https://www.ronweasley.co" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="A place where we love Ron Weasley" />
        <meta
          property="og:description"
          content="A website dedicated to Ron Weasley. Inspired by the amazing work of Ron Weasley Defense Squad."
        />
        <meta
          property="og:image"
          content="https://www.ronweasley.co/ron_weasley/landscape.webp"
        />
        <meta property="og:image:alt" content="Ron Weasley Wall" />
        <meta
          property="og:site_name"
          content="Ron Weasley Appreciation Website"
        />
        <meta property="og:locale" content="en_US" />

        <script type="application/ld+json">{JSON.stringify(jsonld_data)}</script>
      </Head>
      <Component {...pageProps} key={router.route} />
    </AnimatePresence>
  );
}

export default MyApp;
