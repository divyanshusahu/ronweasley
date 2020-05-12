import Link from "next/link";

import { Row, Col, Tag, Table, Button } from "antd";

import { motion } from "framer-motion";
import isEmpty from "is-empty";

import SecondaryLayout from "../../../components/SecondaryLayout";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://api.ronweasley.co";

function StoryDomain(props) {
  const [isLoading, setLoading] = React.useState(true);
  const [tableData, setTableData] = React.useState(null);
  const [showLoadMore, setShowLoadMore] = React.useState(false);
  const [lastKey, setLastKey] = React.useState(null);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Link
          href="/fanfiction/[post_type]/[post_id]"
          as={`/fanfiction/${props.post_type}/${record.story_id}`}
        >
          <a>{text}</a>
        </Link>
      ),
    },
    { title: "Author", dataIndex: "author", key: "author" },
    { title: "Type", dataIndex: "type", key: "type" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Complete" ? "success" : "error"}>{status}</Tag>
      ),
    },
  ];

  const handleLoadMore = () => {
    fetch(`${BASE_URL}/get_story/${props.post_type}?last_post_id=${lastKey}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          if (!isEmpty(data.last_key)) {
            setLastKey(data.last_key.post_id["S"]);
          } else {
            setShowLoadMore(false);
          }
          if (data.stories.length === 0) {
            return;
          }
          let d = data.stories.map((story) => {
            return {
              key: story["post_id"]["S"],
              name: story["post_title"]["S"],
              story_id: story["post_id"]["S"],
              author: story["post_author"]["S"],
              type: story["story_type"]["S"],
              status: story["story_status"]["S"],
            };
          });
          let c = tableData.concat(d);
          setTableData(c);
        }
      });
  };

  React.useEffect(() => {
    fetch(`${BASE_URL}/get_story/${props.post_type}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          if (data.stories.length === 0) {
            setTableData([]);
          } else {
            if (!isEmpty(data.last_key)) {
              setShowLoadMore(true);
              setLastKey(data.last_key.post_id["S"]);
            } else {
              setShowLoadMore(false);
            }
            let d = data.stories.map((story) => {
              return {
                key: story["post_id"]["S"],
                name: story["post_title"]["S"],
                story_id: story["post_id"]["S"],
                author: story["post_author"]["S"],
                type: story["story_type"]["S"],
                status: story["story_status"]["S"],
              };
            });
            setTableData(d);
          }
          setLoading(false);
        }
      });
  }, []);

  return (
    <div>
      <SecondaryLayout title={props.post_type.toUpperCase() + " ARCHIVE"}>
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
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
                <Table
                  columns={columns}
                  dataSource={tableData}
                  loading={isLoading}
                  scroll={{ x: true }}
                  pagination={false}
                />
                {showLoadMore ? (
                  <Button
                    size="small"
                    type="ghost"
                    style={{ float: "right" }}
                    onClick={handleLoadMore}
                  >
                    Load More
                  </Button>
                ) : null}
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
        `}
      </style>
    </div>
  );
}

export async function getStaticPaths() {
  const types = ["checkmated"];
  const pages = types.map((p) => ({ params: { post_type: p } }));
  return { paths: pages, fallback: false };
}

export async function getStaticProps(context) {
  const post_type = context.params;
  return { props: post_type };
}

export default StoryDomain;
