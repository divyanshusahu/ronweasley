import Link from "next/link";

import fetch from "isomorphic-unfetch";
import TimeAgo from "react-timeago";
import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import ReactHtmlParser from "react-html-parser";

import { Button, Row, Col, Card, Typography, Icon } from "antd";

import SecondaryLayout from "../../../components/SecondaryLayout";
import ErrorLayout from "../../../components/ErrorLayout";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://api.ronweasley.co";

function Posts({ data }) {
  if (!data.success) {
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

  const post = data.post;

  return (
    <div>
      <SecondaryLayout title={`Post: ${post.post_title["S"]}`}>
        <div className="display_post">
          <Row>
            <Col
              xs={{ span: 22, offset: 1 }}
              md={{ span: 20, offset: 2 }}
              lg={{ span: 18, offset: 3 }}
              xl={{ span: 16, offset: 4 }}
            >
              <Card
                title={
                  <Card.Meta
                    title={
                      <Typography.Title level={4}>
                        {post.post_title["S"]}
                      </Typography.Title>
                    }
                    description={
                      <a
                        href={post.post_author_link["S"]}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {post.post_author["S"]}
                      </a>
                    }
                  />
                }
                extra={<TimeAgo date={post.post_date["S"]} />}
                actions={[
                  <Icon type="edit" title="Edit Post" />,
                  <Icon type="delete" title="Delete Post" />,
                  <Icon type="flag" title="Report Post" />
                ]}
              >
                {ReactHtmlParser(
                  stateToHTML(
                    convertFromRaw(JSON.parse(post.post_content["S"]))
                  )
                )}
              </Card>
            </Col>
          </Row>
        </div>
      </SecondaryLayout>
      <style jsx>
        {`
          .display_post {
            margin: 40px 0;
          }
        `}
      </style>
    </div>
  );
}

Posts.getInitialProps = async ({ query }) => {
  const post_type = query.post_type;
  const post_id = query.pid;
  const r = await fetch(`${BASE_URL}/get/${post_type}/${post_id}`);
  const data = await r.json();
  return { data: data };
};

export default Posts;
