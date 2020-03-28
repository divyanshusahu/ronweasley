import Head from "next/head";

import { Row, Col, Typography, Divider } from "antd";
import {
  GithubOutlined,
  TwitterOutlined,
  GoogleOutlined,
  InstagramOutlined
} from "@ant-design/icons";

const { Paragraph } = Typography;

function Footer() {
  return (
    <div className="page_footer">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Ron Weasley" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/antd@4.0.2/dist/antd.min.css"
          type="text/css"
        />
      </Head>
      <Row>
        <Col sm={{ span: 18, offset: 3 }} md={{ span: 12, offset: 6 }}>
          <Paragraph
            style={{ textAlign: "center", fontSize: "1rem", color: "#f0f0f0" }}
          >
            A website inspired by the excellent work of Ron Weasley Defense
            Squad.
          </Paragraph>
          <Divider style={{ backgroundColor: "rgba(240,240,240,0.25)" }} />
        </Col>
      </Row>
      <div className="contact_admin_div">
        <span
          style={{
            fontSize: "16px",
            color: "rgba(240,240,240,0.6)",
            marginRight: "8px"
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
