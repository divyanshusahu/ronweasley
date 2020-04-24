import Link from "next/link";

import { Row, Col, Card, List, Typography } from "antd";

import { motion } from "framer-motion";

import SecondaryLayout from "../../components/SecondaryLayout";

const list_data = [
  {
    title: "Checkmated Archive",
    href: "/fanfiction/[post_type]",
    as: "/fanfiction/checkmated",
  },
  {
    title: "Public list by thedistantdusk",
    href:
      "https://docs.google.com/spreadsheets/d/1o67w6F3UbpZ6lcrTuLXA1WOxBTkIZ8tWUtQbw7ImfaA/edit#gid=517909074",
    as:
      "https://docs.google.com/spreadsheets/d/1o67w6F3UbpZ6lcrTuLXA1WOxBTkIZ8tWUtQbw7ImfaA/edit#gid=517909074",
  },
  {
    title: "Public list by Callie Skye",
    href:
      "https://docs.google.com/spreadsheets/d/17zUpF5H9n0RxYbZTURQGHn-prq1PKa9XbSkv_bqS0gQ/edit#gid=0",
    as:
      "https://docs.google.com/spreadsheets/d/17zUpF5H9n0RxYbZTURQGHn-prq1PKa9XbSkv_bqS0gQ/edit#gid=0",
  },
  {
    title: "Public list by Heather Ruiz",
    href:
      "https://docs.google.com/spreadsheets/d/1GCSz4F4fixGr-GWkE6ZUW6HIABjIuikvWutWvHq730A/edit#gid=1937257880",
    as:
      "https://docs.google.com/spreadsheets/d/1GCSz4F4fixGr-GWkE6ZUW6HIABjIuikvWutWvHq730A/edit#gid=1937257880",
  },
];

function FanFiction() {
  return (
    <div>
      <SecondaryLayout title="Fanfictions">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, transition: { duration: 0.5 } }}
          exit={{ scale: 0.6, opacity: 0, transition: { duration: 0.2 } }}
        >
          <Row>
            <Col
              xs={{ span: 22, offset: 1 }}
              md={{ span: 20, offset: 2 }}
              lg={{ span: 14, offset: 5 }}
              xxl={{ span: 12, offset: 6 }}
            >
              <div className="page_root">
                <Card
                  style={{ boxShadow: "8px 14px 38px 0px rgba(40,40,40,0.1)" }}
                >
                  <List
                    split={true}
                    dataSource={list_data}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta
                          title={
                            <Typography.Text style={{ fontSize: 16 }}>
                              <Link href={item.href} as={item.as}>
                                <a>{item.title}</a>
                              </Link>
                            </Typography.Text>
                          }
                        />
                      </List.Item>
                    )}
                  ></List>
                </Card>
              </div>
            </Col>
          </Row>
        </motion.div>
      </SecondaryLayout>
      <style jsx>
        {`
          .page_root {
            margin-top: 64px;
          }
        `}
      </style>
    </div>
  );
}

export default FanFiction;
