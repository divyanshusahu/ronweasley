import Head from "next/head";
import { useRouter } from "next/router";

import { Layout as AntLayout } from "antd";

import NavigationBar from "./NavigationBar";
import Footer from "./Footer";

const AntHeader = AntLayout.Header;
const AntContent = AntLayout.Content;
const AntFooter = AntLayout.Footer;

function SecondaryLayout(props) {
  const router = useRouter();
  const jsonld_webpage = {
    "@context": "http://schema.org",
    "@type": "WebPage",
    name: props.title,
  };

  return (
    <div>
      <Head>
        <title>{props.title}</title>
        <link
          rel="canonical"
          href={`https://www.ronweasley.co${router.asPath}`}
        />
        <script type="application/json">
          {JSON.stringify(jsonld_webpage)}
        </script>
      </Head>
      <AntLayout style={{ minHeight: "100vh" }}>
        <AntHeader style={{ padding: 0, zIndex: 10 }}>
          <NavigationBar light={true} />
        </AntHeader>
        <AntContent style={{ backgroundColor: "rgb(246, 246, 246)" }}>
          {props.children}
        </AntContent>
        <AntFooter style={{ padding: 0 }}>
          <Footer />
        </AntFooter>
      </AntLayout>
    </div>
  );
}

export default SecondaryLayout;
