import Head from "next/head";

import { Row, Col, Icon, Typography } from "antd";

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
          href="https://cdn.jsdelivr.net/npm/antd@3.26.4/dist/antd.min.css"
          type="text/css"
        />
      </Head>
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
            background-color: #fff;
            padding: 24px;
          }
        `}
      </style>
      <Row>
        <Col sm={{ span: 18, offset: 3 }} md={{ span: 12, offset: 6 }}>
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
    </div>
  );
}

export default Footer;
