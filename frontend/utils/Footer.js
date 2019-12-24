import Head from "next/head";

import { Row, Col, Icon, Typography } from "antd";

const { Paragraph } = Typography;

function Footer() {
  return (
    <footer>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Ron Weasley" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/antd@3.26.4/dist/antd.min.css"
          type="text/css"
        />
      </Head>
      <style jsx global>
        {`
          html {
            box-sizing: border-box;
          }

          a {
            text-decoration: none;
            color: inherit;
          }

          a:hover {
            text-decoration: none;
            color: inherit;
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
          footer {
            padding: 32px;
            background-color: #fff;
            margin-top: auto;
          }
        `}
      </style>
      <Row>
        <Col sm={12} md={{ span: 8, offset: 8 }}>
          <Paragraph
            style={{ textAlign: "center", fontSize: "1rem", color: "#000" }}
          >
            This Website is dedicated to Ron Lovers.
          </Paragraph>
          <Paragraph
            style={{ textAlign: "center", fontSize: "1rem", color: "#000" }}
          >
            Made with{" "}
            <Icon type="heart" theme="filled" style={{ color: "#f00" }} /> by{" "}
            <a
              href="https://github.com/divyanshusahu"
              target="_blank"
              rel="noopener noreferrer"
            >
              Divyanshu
            </a>
          </Paragraph>
        </Col>
      </Row>
    </footer>
  );
}

export default Footer;
