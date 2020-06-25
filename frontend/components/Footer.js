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
          href="https://fonts.googleapis.com/css?family=Karla&display=swap"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Karla&display=swap"
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
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto&display=swap"
        />
      </Head>
      <Row>
        <Col
          sm={{ span: 20, offset: 2 }}
          md={{ span: 18, offset: 3 }}
          lg={{ span: 12, offset: 6 }}
        >
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
          <div className="link_paragraph">
            <Paragraph
              style={{
                fontSize: "16px",
                fontWeight: "400",
                fontFamily: "Karla",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Link href="/suggestions">
                <a className="footer_links">Suggestions</a>
              </Link>
              <Link href="/credits">
                <a className="footer_links">Credits</a>
              </Link>
              <Link href="/timeline">
                <a className="footer_links">Timeline</a>
              </Link>
            </Paragraph>
          </div>
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
          style={{ padding: "8px" }}
        >
          <GithubOutlined style={{ fontSize: "32px", color: "#f0f0f0" }} />
        </a>{" "}
        <a
          href="https://twitter.com/divyan5hu"
          target="_blank"
          rel="noopener noreferrer"
          style={{ padding: "8px" }}
        >
          <TwitterOutlined style={{ fontSize: "32px", color: "#f0f0f0" }} />
        </a>{" "}
        <a href="mailto:dsahu1997@gmail.com" style={{ padding: "8px" }}>
          <GoogleOutlined style={{ fontSize: "32px", color: "#f0f0f0" }} />
        </a>{" "}
        <a
          href="https://instagram.com/_divyanshusahu_"
          target="_blank"
          rel="noopener noreferrer"
          style={{ padding: "8px" }}
        >
          <InstagramOutlined style={{ fontSize: "32px", color: "#f0f0f0" }} />
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
            padding: 48px 8px;
          }
          .contact_admin_div {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .footer_links {
            padding: 12px;
            margin: 0 8px;
          }
          @media screen and (max-width: 991px) {
            .link_paragraph {
              display: none;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Footer;
