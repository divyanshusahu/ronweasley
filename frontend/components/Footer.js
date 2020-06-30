import Link from "next/link";

import { Row, Col, Typography, Divider } from "antd";
import {
  GithubOutlined,
  TwitterOutlined,
  GoogleOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";

const { Paragraph } = Typography;

function Footer() {
  return (
    <div className="page_footer">
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
              <a href="https://old.ronweasley.co" className="footer_links">
                Old Design
              </a>
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
          href="https://www.linkedin.com/in/divyanshu-sahu/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ padding: "8px" }}
        >
          <LinkedinOutlined style={{ fontSize: "32px", color: "#f0f0f0" }} />
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
