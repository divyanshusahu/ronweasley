import { Row, Col } from "antd";

import { motion } from "framer-motion";
import fetch from "isomorphic-unfetch";
import isEmpty from "is-empty";

import SecondaryLayout from "../../../components/SecondaryLayout";
import DisplayFanart from "../../../components/DisplayFanart";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://api.ronweasley.co";

function Fanart(props) {
  return (
    <div>
      <SecondaryLayout title={`Fanart: ${props.post.post_title["S"]}`}>
        <motion.div
          initial={{ scale: 0.9, y: 50, opacity: 0 }}
          animate={{
            scale: 1,
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 },
          }}
          exit={{
            scale: 0.6,
            y: 50,
            opacity: 0,
            transition: { duration: 0.2 },
          }}
        >
          <div className="display_post">
            <Row>
              <Col
                xs={{ span: 22, offset: 1 }}
                md={{ span: 20, offset: 2 }}
                lg={{ span: 18, offset: 3 }}
                xxl={{ span: 16, offset: 4 }}
              >
                <DisplayFanart
                  inner={false}
                  bordered={true}
                  showActions={true}
                  is_layout={false}
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
                  post_description={
                    isEmpty(props.post.post_description)
                      ? ""
                      : props.post.post_description["S"]
                  }
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

export async function getStaticPaths() {
  const types = [
    "ron_weasley_fanart",
    "romione_fanart",
    "golden_trio_fanart",
    "weasley_family_fanart",
    "ron_and_lavender_fanart",
    "ron_and_harry_fanart",
    "ron_and_luna_fanart",
  ];
  let pages = [];
  for (let i = 0; i < types.length; i++) {
    const r1 = await fetch(`${BASE_URL}/get_post/${types[i]}`);
    const d1 = await r1.json();
    if (d1.success) {
      d1.posts.forEach((p) => {
        pages.push(`/fanart/${types[i]}/${p["post_id"]["S"]}`);
      });
    }
  }
  return { paths: pages, fallback: false };
}

export async function getStaticProps(context) {
  const post_type = context.params["post_type"];
  const post_id = context.params["post_id"];
  const r2 = await fetch(`${BASE_URL}/get_post/${post_type}/${post_id}`);
  const d2 = await r2.json();
  return { props: d2 };
}

export default Fanart;
