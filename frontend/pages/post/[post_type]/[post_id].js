import { useRouter } from "next/router";
import Link from "next/link";

import { Row, Col, Button } from "antd";

import { motion } from "framer-motion";
import fetch from "isomorphic-unfetch";
import isEmpty from "is-empty";

import SecondaryLayout from "../../../components/SecondaryLayout";
import DisplayPost from "../../../components/DisplayPost";
import LoadingComponent from "../../../components/LoadingComponent";
import ErrorLayout from "../../../components/ErrorLayout";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://api.ronweasley.co";

function Posts(props) {
  const router = useRouter();
  if (router.isFallback) {
    return <LoadingComponent />;
  }

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

  const post = props.post;
  return (
    <div>
      <SecondaryLayout title={`Post: ${post.post_title["S"]}`}>
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
          <div className="page_root">
            <Row>
              <Col
                xs={{ span: 22, offset: 1 }}
                md={{ span: 20, offset: 2 }}
                lg={{ span: 18, offset: 3 }}
                xxl={{ span: 16, offset: 4 }}
              >
                <div className="display_card">
                  <DisplayPost
                    inner={false}
                    bordered={true}
                    showActions={true}
                    post_reported={
                      isEmpty(post.post_reported)
                        ? false
                        : post.post_reported["BOOL"]
                    }
                    key={post.post_id["S"]}
                    post_type={post.post_type["S"]}
                    post_id={post.post_id["S"]}
                    post_title={post.post_title["S"]}
                    post_author={post.post_author["S"]}
                    post_author_link={post.post_author_link["S"]}
                    post_date={post.post_date["S"]}
                    post_content={post.post_content["S"]}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </motion.div>
      </SecondaryLayout>
      <style jsx>
        {`
          .page_root {
            padding: 64px 0 16px 0;
          }
          .display_card {
            box-shadow: 8px 14px 38px rgba(40, 40, 40, 0.1);
          }
        `}
      </style>
    </div>
  );
}

export async function getStaticPaths() {
  const types = [
    "ron_weasley_appreciation",
    "ron_weasley_defense",
    "romione_appreciation",
    "golden_trio_appreciation",
    "weasley_family_appreciation",
    "ron_and_lavender_appreciation",
    "ron_and_harry_appreciation",
    "ron_and_luna_appreciation",
  ];
  let pages = [];
  for (let i = 0; i < types.length; i++) {
    const r1 = await fetch(`${BASE_URL}/get_post/${types[i]}`);
    const d1 = await r1.json();
    if (d1.success) {
      d1.posts.forEach((p) => {
        pages.push({
          params: { post_type: types[i], post_id: p["post_id"]["S"] },
        });
      });
    }
  }
  return { paths: pages, fallback: true };
}

export async function getStaticProps(context) {
  const post_type = context.params["post_type"];
  const post_id = context.params["post_id"];
  const r2 = await fetch(`${BASE_URL}/get_post/${post_type}/${post_id}`);
  const d2 = await r2.json();
  if (!d2.success) {
    return { unstable_revalidate: 1, props: { success: false } };
  }
  return { unstable_revalidate: 1, props: d2 };
}

export default Posts;
