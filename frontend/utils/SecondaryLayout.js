import Head from "next/head";

import NavigationBar from "./NavigationBar";
import Footer from "./Footer";

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
      <div className="page_root">
        <NavigationBar light={true} />
        <div>{props.children}</div>
        <Footer />
      </div>
      <style jsx>
        {`
          .page_root {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
          }
        `}
      </style>
    </div>
  );
}

export default SecondaryLayout;
