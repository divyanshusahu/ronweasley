//import { AnimatePresence } from "framer-motion";
//import { useRouter } from "next/router";
import Head from "next/head";
import "antd/dist/antd.min.css";

function MyApp({ Component, pageProps }) {
  //const router = useRouter();

  /*const handleExitComplete = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0 });
    }
  };*/

  const jsonld_website = {
    "@context": "http://schema.org",
    "@type": "WebSite",
    name: "Ron Weasley Appreciation Website",
    url: "https://www.ronweasley.co",
    creator: { "@type": "Person", name: "Divyanshu Sahu" },
    keywords: [
      "harry potter",
      "ron weasley",
      "hermione granger",
      "romione",
      "golden trio",
      "appreciation",
      "defense",
      "fanarts",
      "fanfiction",
      "checkmated.org",
    ],
    sameAs: [
      "https://www.facebook.com/divyanshu.sahu1997",
      "https://www.instagram.com/_divyanshusahu_/",
      "https://www.linkedin.com/in/divyanshu-sahu/",
    ],
  };

  return (
    <div>
      {/*<AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>*/}
      <Head key="default-head">
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="A Ron Weasley appreciation website. Find Ron's appreciation and defense post written
          by passionate Ron stans along with beautiful fan arts by talented artists."
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
          content="A Ron Weasley Appreciation Website"
        />
        <meta
          name="twitter:description"
          content="Find Ron's appreciation and defense post written
          by passionate Ron stans along with beautiful fan arts by talented artists."
        />
        <meta
          name="twitter:image"
          content="https://www.ronweasley.co/assets/ron_weasley/0.png"
        />
        <meta name="twitter:image:alt" content="Ron Weasley Wall" />

        <meta property="og:url" content="https://www.ronweasley.co" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="A Ron Weasley Appreciation Website"
        />
        <meta
          property="og:description"
          content="Find Ron's appreciation and defense post written
          by passionate Ron stans along with beautiful fan arts by talented artists."
        />
        <meta
          property="og:image"
          content="https://www.ronweasley.co/assets/ron_weasley/0.png"
        />
        <meta property="og:image:alt" content="Ron Weasley Wall" />
        <meta
          property="og:site_name"
          content="Ron Weasley Appreciation Website"
        />
        <meta property="og:locale" content="en_US" />

        <link rel="canonical" href="https://www.ronweasley.co" />

        <script type="application/ld+json">
          {JSON.stringify(jsonld_website)}
        </script>
      </Head>
      {/*<Component {...pageProps} key={router.route} />*/}
      <Component {...pageProps} />
      {/*</AnimatePresence>*/}
    </div>
  );
}

export default MyApp;
