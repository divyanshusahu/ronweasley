import Head from "next/head";
import Link from "next/link";

import { Row, Col, Typography, Divider } from "antd";
import {
  GithubOutlined,
  TwitterOutlined,
  GoogleOutlined,
  InstagramOutlined,
} from "@ant-design/icons";

const { Paragraph } = Typography;

import { initGA, logPageView } from "../hooks/analytics";

function Footer() {
  React.useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }, []);

  return (
    <div className="page_footer">
      <Head>
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css?family=Roboto&display=swap"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto&display=swap"
        />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css?family=Karla&display=swap"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Karla&display=swap"
        />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap"
          as="style"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap"
          rel="stylesheet"
        />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css?family=Proza+Libre&display=swap"
          as="style"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Proza+Libre&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Row>
        <Col sm={{ span: 20, offset: 2 }} md={{ span: 12, offset: 6 }}>
          <Paragraph
            style={{
              textAlign: "center",
              fontSize: "18px",
              color: "#f0f0f0",
              fontWeight: "400",
              fontFamily: "Karla",
            }}
          >
            A website inspired by the excellent work of Ron Weasley Defense
            Squad.
          </Paragraph>
          <Paragraph
            style={{
              textAlign: "center",
              fontSize: "16px",
              color: "#f0f0f0",
              fontWeight: "400",
              fontFamily: "Karla",
            }}
          >
            Important Links:{" "}
            <Link href="/timeline">
              <a>Timeline</a>
            </Link>
          </Paragraph>
          <Divider style={{ backgroundColor: "rgba(240,240,240,0.25)" }} />
        </Col>
      </Row>
      <div className="contact_admin_div">
        <span
          style={{
            fontSize: "16px",
            color: "rgba(240,240,240,0.6)",
            marginRight: "8px",
            fontFamily: "Karla",
          }}
        >
          Contact admin
        </span>{" "}
        <a
          href="https://github.com/divyanshusahu"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubOutlined
            style={{ fontSize: "24px", color: "#f0f0f0", margin: "0 4px" }}
          />
        </a>{" "}
        <a
          href="https://twitter.com/divyan5hu"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TwitterOutlined
            style={{ fontSize: "24px", color: "#f0f0f0", margin: "0 4px" }}
          />
        </a>{" "}
        <a href="mailto:dsahu1997@gmail.com">
          <GoogleOutlined
            style={{ fontSize: "24px", color: "#f0f0f0", margin: "0 4px" }}
          />
        </a>{" "}
        <a
          href="https://instagram.com/_divyanshusahu_"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramOutlined
            style={{ fontSize: "24px", color: "#f0f0f0", margin: "0 4px" }}
          />
        </a>
      </div>
      <style jsx global>
        {`
          html {
            box-sizing: border-box;
          }

          *,
          *::before,
          *::after {
            box-sizing: inherit;
            margin: 0;
            padding: 0;
          }
        `}
      </style>
      <style jsx>
        {`
          .page_footer {
            background-color: #282828;
            padding: 48px;
          }
          .contact_admin_div {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}
      </style>
    </div>
  );
}

export default Footer;
