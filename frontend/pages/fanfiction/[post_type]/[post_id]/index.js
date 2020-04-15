import { Row, Col, Descriptions, Card, Table, Button, Tag } from "antd";

import { motion } from "framer-motion";
import fetch from "isomorphic-unfetch";

import SecondaryLayout from "../../../../components/SecondaryLayout";
import ErrorLayout from "../../../../components/ErrorLayout";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://api.ronweasley.co";

function Story(props) {
  if (!props.success) {
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
    />;
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
                xl={{ span: 12, offset: 6 }}
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

Story.getInitialProps = async ({ query }) => {
  const r1 = await fetch(
    `${BASE_URL}/get_story/${query.post_type}/${query.post_id}`
  );
  const data = await r1.json();
  return data;
};

export default Story;
