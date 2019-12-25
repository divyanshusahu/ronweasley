import Head from "next/head";

import { Layout as AntLayout } from "antd";

import NavigationBar from "./NavigationBar";
import Footer from "./Footer";

const AntHeader = AntLayout.Header;
const AntContent = AntLayout.Content;
const AntFooter = AntLayout.Footer;

function SecondaryLayout(props) {
  return (
    <div>
      <Head>
        <title>{props.title}</title>
        <link
          href="https://cdn.jsdelivr.net/npm/react-toastify@5.4.1/dist/ReactToastify.min.css"
          rel="stylesheet"
        />
      </Head>
      <AntLayout>
        <AntHeader
          style={{ padding: 0, position: "sticky", top: 0, zIndex: 10 }}
        >
          <NavigationBar light={true} />
        </AntHeader>
        <AntContent>{props.children}</AntContent>
        <AntFooter style={{ padding: 0 }}>
          <Footer />
        </AntFooter>
      </AntLayout>
    </div>
  );
}

export default SecondaryLayout;
