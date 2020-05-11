import Link from "next/link";

import { Row, Col, Card, Form, Input, Select, Button, message } from "antd";

import cookies from "next-cookies";
import fetch from "isomorphic-unfetch";
import { motion } from "framer-motion";

import ErrorLayout from "../../components/ErrorLayout";
import SecondaryLayout from "../../components/SecondaryLayout";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://api.ronweasley.co";

function AddStory(props) {
  if (!props.authorized) {
    return (
      <div>
        <ErrorLayout
          status="403"
          title="403"
          subTitle="Sorry, you are not authorized to access this page."
          extra={
            <Link href="/admin/login">
              <Button type="primary">Back to Login</Button>
            </Link>
          }
        />
      </div>
    );
  }

  const [noOfChapters, setNoOfChapters] = React.useState(1);
  const [urlArray, setURLArray] = React.useState([1]);
  React.useEffect(() => {
    let a = [];
    for (let i = 1; i <= noOfChapters; i++) {
      a.push(i);
    }
    setURLArray(a);
  }, [noOfChapters]);

  const handleFormSubmit = (values) => {
    message.loading({
      content: "Action in progress...",
      key: "addStoryMessage",
      duration: 0,
    });
    let cu = [];
    for (let i = 1; i <= values.no_of_chapters; i++) {
      cu.push(values[`chapter_${i}`]);
    }
    let post_data = {
      post_title: values.story_name,
      post_author: values.story_author,
      post_type: values.story_domain,
      story_status: values.story_status,
      story_type: values.story_type,
      story_url: values.full_story_url,
      chapters_url: cu,
    };
    fetch(BASE_URL + "/admin/add_story", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.access_token}`,
      },
      body: JSON.stringify(post_data),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          message.success({ content: data.message, key: "addStoryMessage" });
        } else {
          message.error({ content: data.message, key: "addStoryMessage" });
        }
      });
  };

  return (
    <div>
      <SecondaryLayout title="Add Story">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, transition: { duration: 0.5 } }}
          exit={{ scale: 0.6, opacity: 0, transition: { duration: 0.2 } }}
        >
          <div className="page_root">
            <Row>
              <Col
                xs={{ span: 22, offset: 1 }}
                md={{ xs: 20, offset: 2 }}
                lg={{ span: 16, offset: 4 }}
                xxl={{ span: 14, offset: 5 }}
              >
                <Card title="Add Story">
                  <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    name="add_story"
                    onFinish={handleFormSubmit}
                  >
                    <Form.Item
                      label="Story Name"
                      name="story_name"
                      rules={[{ required: true, message: "Enter story name" }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Story Author"
                      name="story_author"
                      rules={[{ required: true, message: "Enter author name" }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Story Domain"
                      name="story_domain"
                      rules={[
                        { required: true, message: "Select story domain" },
                      ]}
                    >
                      <Select>
                        <Select.Option value="checkmated">
                          Checkmated
                        </Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="Story Type"
                      name="story_type"
                      rules={[{ required: true, message: "Select story type" }]}
                    >
                      <Select>
                        <Select.Option value="Oneshot">Oneshot</Select.Option>
                        <Select.Option value="Multi-Chapter">
                          Multi-Chapter
                        </Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="No. of Chapters"
                      name="no_of_chapters"
                      rules={[
                        { required: true, message: "Enter no. of chapters" },
                      ]}
                    >
                      <Input
                        type="number"
                        onChange={(e) => setNoOfChapters(e.target.value)}
                      />
                    </Form.Item>
                    {urlArray.map((item) => (
                      <Form.Item
                        key={item}
                        label={`Chapter ${item} URL`}
                        name={`chapter_${item}`}
                        rules={[{ required: true, message: "Enter valid URL" }]}
                      >
                        <Input />
                      </Form.Item>
                    ))}
                    <Form.Item
                      label="Full Story URL"
                      name="full_story_url"
                      rules={[{ required: true, message: "Enter valid URL" }]}
                    >
                      <Input type="url" />
                    </Form.Item>
                    <Form.Item
                      label="Story Status"
                      name="story_status"
                      rules={[
                        { required: true, message: "Select story status" },
                      ]}
                    >
                      <Select>
                        <Select.Option value="Complete">Complete</Select.Option>
                        <Select.Option value="Incomplete">
                          Incomplete
                        </Select.Option>
                        <Select.Option value="Chapters Missing">
                          Chapters Missing
                        </Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
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
        `}
      </style>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { access_token } = cookies(context);
  const r1 = await fetch(BASE_URL + "/admin/identity_check", {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  const result = await r1.json();
  if (result.success) {
    return { props: { authorized: true, access_token: access_token } };
  }
  return { props: { authorized: false } };
}

export default AddStory;
