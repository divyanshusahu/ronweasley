import Link from "next/link";

import fetch from "isomorphic-unfetch";
import isEmpty from "is-empty";

import { Button, Row, Col } from "antd";

import { motion } from "framer-motion";

import SecondaryLayout from "../../../components/SecondaryLayout";
import ErrorLayout from "../../../components/ErrorLayout";
import DisplayPost from "../../../components/DisplayPost";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://api.ronweasley.co";

function Fanart(props) {
  if (!props.success) {
    return (
      <ErrorLayout
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link href="/">
            <a>
              <Button type="primary">Back Home</Button>
            </a>
          </Link>
        }
      />
    );
  }

  return (
    <div>
      <SecondaryLayout title={`Fanart: ${props.post.post_title["S"]}`}>
        <motion.div
          initial={{ scale: 0.9, y: 50, opacity: 0 }}
          animate={{
            scale: 1,
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
          }}
          exit={{
            scale: 0.6,
            y: 50,
            opacity: 0,
            transition: { duration: 0.2 }
          }}
        >
          <div className="display_post">
            <Row>
              <Col
                xs={{ span: 22, offset: 1 }}
                md={{ span: 20, offset: 2 }}
                lg={{ span: 18, offset: 3 }}
                xl={{ span: 16, offset: 4 }}
              >
                <DisplayPost
                  inner={false}
                  bordered={true}
                  showActions={true}
                  post_reported={
                    isEmpty(props.post.post_reported)
                      ? false
                      : props.post.post_reported["BOOL"]
                  }
                  key={props.post.post_id["S"]}
                  post_type={props.post.post_type["S"]}
                  post_id={props.post.post_id["S"]}
                  post_title={props.post.post_title["S"]}
                  post_author={props.post.post_author["S"]}
                  post_author_link={props.post.post_author_link["S"]}
                  post_date={props.post.post_date["S"]}
                  post_image={props.post.post_image["L"]}
                />
              </Col>
            </Row>
          </div>
        </motion.div>
      </SecondaryLayout>
      <style jsx>
        {`
          .display_post {
            margin: 64px 0 16px 0;
          }
        `}
      </style>
    </div>
  );
}

Fanart.getInitialProps = async ctx => {
  const post_type = ctx.query.post_type;
  if (post_type.indexOf("fanart") === -1) {
    return { success: false };
  }
  const post_id = ctx.query.post_id;
  const r = await fetch(`${BASE_URL}/get_post/${post_type}/${post_id}`);
  const d = await r.json();
  return d;
};

export default Fanart;
