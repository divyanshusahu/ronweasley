import { useRouter } from "next/router";
import Link from "next/link";

import { Row, Col, Descriptions, Card, Table, Button, Tag } from "antd";

import { motion } from "framer-motion";
import fetch from "isomorphic-unfetch";

import SecondaryLayout from "../../../../components/SecondaryLayout";
import LoadingComponent from "../../../../components/LoadingComponent";
import ErrorLayout from "../../../../components/ErrorLayout";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://api.ronweasley.co";

function Story(props) {
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

  const columns = [
    {
      title: "Chapter",
      dataIndex: "chapter",
      key: "chapter",
      render: (text, record) => (
        <Button
          type="link"
          href={record.chapter_link}
          target="_blank"
          disabled={record.chapter_link === "#" ? true : false}
        >
          {text}
        </Button>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <Tag color={text === "Available" ? "success" : "error"}>{text}</Tag>
      ),
    },
  ];

  const data = props.story.chapters_url["L"].map((u, i) => {
    let chapter = "Chapter " + (i + 1);
    let status = u["S"] === "#" ? "Not Available" : "Available";
    return {
      key: i,
      chapter: chapter,
      status: status,
      chapter_link: u["S"],
    };
  });

  return (
    <div>
      <SecondaryLayout title={props.story.post_title["S"]}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, transition: { duration: 0.5 } }}
          exit={{ scale: 0.6, opacity: 0, transition: { duration: 0.2 } }}
        >
          <div className="page_root">
            <Row>
              <Col
                xs={{ span: 22, offset: 1 }}
                md={{ span: 20, offset: 2 }}
                lg={{ span: 14, offset: 5 }}
                xxl={{ span: 12, offset: 6 }}
              >
                <Card
                  style={{ boxShadow: "8px 14px 38px 0px rgba(40,40,40,0.1)" }}
                  bodyStyle={{ padding: 0 }}
                >
                  <div className="story_description">
                    <Descriptions
                      title={
                        props.story.post_type["S"].toUpperCase() + " ARCHIEVE"
                      }
                    >
                      <Descriptions.Item label="Name">
                        {props.story.post_title["S"]}
                      </Descriptions.Item>
                      <Descriptions.Item label="Author">
                        {props.story.post_author["S"]}
                      </Descriptions.Item>
                      <Descriptions.Item label="Type">
                        {props.story.story_type["S"]}
                      </Descriptions.Item>
                      <Descriptions.Item label="Status">
                        <Tag
                          color={
                            props.story.story_status["S"] === "Complete"
                              ? "success"
                              : "error"
                          }
                        >
                          {props.story.story_status["S"]}
                        </Tag>
                      </Descriptions.Item>
                      <Descriptions.Item label="Download">
                        <a
                          href={props.story.story_url["S"]}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Full Story
                        </a>
                      </Descriptions.Item>
                    </Descriptions>
                  </div>
                  <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                  />
                </Card>
              </Col>
            </Row>
          </div>
        </motion.div>
      </SecondaryLayout>
      <style jsx>
        {`
          .page_root {
            margin: 64px 0;
          }
          .story_description {
            padding: 16px;
          }
        `}
      </style>
    </div>
  );
}

export async function getStaticPaths() {
  const types = ["checkmated"];
  let pages = [];
  for (let i = 0; i < types.length; i++) {
    const r1 = await fetch(`${BASE_URL}/get_story/${types[i]}`);
    const d1 = await r1.json();
    if (d1.success) {
      d1.stories.forEach((s) => {
        pages.push({
          params: { post_type: types[i], post_id: s["post_id"]["S"] },
        });
      });
    }
  }
  return { paths: pages, fallback: true };
}

export async function getStaticProps(context) {
  const post_type = context.params["post_type"];
  const post_id = context.params["post_id"];
  const r1 = await fetch(`${BASE_URL}/get_story/${post_type}/${post_id}`);
  const d1 = await r1.json();
  if (!d1.success) {
    return { unstable_revalidate: 1, props: { success: false } };
  }
  return { unstable_revalidate: 1, props: d1 };
}

export default Story;
