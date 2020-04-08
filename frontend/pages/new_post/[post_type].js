import Link from "next/link";
import Router from "next/router";

import { Button, Row, Col, Card, Input, Typography, message } from "antd";
import {
  SaveOutlined,
  SolutionOutlined,
  UserOutlined,
  LinkOutlined,
} from "@ant-design/icons";

import fetch from "isomorphic-unfetch";
import { motion } from "framer-motion";

import SecondaryLayout from "../../components/SecondaryLayout";
import DraftJSEditor from "../../components/DraftJSEditor";
import UploadImage from "../../components/UploadImage";
import ErrorLayout from "../../components/ErrorLayout";
import getPostSummary from "../../hooks/getPostSummary";

function NewPost({ query }) {
  const allowedQuery = [
    "ron_weasley_appreciation",
    "ron_weasley_defense",
    "ron_weasley_fanart",
    "romione_appreciation",
    "romione_fanart",
    "golden_trio_appreciation",
    "golden_trio_fanart",
    "weasley_family_appreciation",
    "weasley_family_fanart",
    "ron_and_lavender_appreciation",
    "ron_and_lavender_fanart",
    "ron_and_harry_appreciation",
    "ron_and_harry_fanart",
    "ron_and_luna_appreciation",
    "ron_and_luna_fanart",
  ];

  const BASE_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://api.ronweasley.co";

  if (allowedQuery.findIndex((q) => q == query) === -1) {
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

  let title = query.replace(/_/g, " ");

  const [editorContent, setEditorContent] = React.useState("");
  const handleEditorContent = (content) => {
    setEditorContent(content);
  };

  const [imageList, setImageList] = React.useState([]);
  const handleImageList = (list) => {
    setImageList(list);
  };

  const display =
    query.indexOf("fanart") > 0 ? (
      <div>
        <UploadImage handleImageList={handleImageList} />
        <DraftJSEditor
          handleEditorContent={handleEditorContent}
          placeholder="Fanart description (optional)"
        />
      </div>
    ) : (
      <DraftJSEditor
        handleEditorContent={handleEditorContent}
        placeholder="Begin your post here..."
      />
    );

  const add_new_post = () => {
    let post_summary = getPostSummary(editorContent);
    let post_data = {
      post_type: query,
      post_title: document.getElementById("post_title").value,
      post_author: document.getElementById("post_author").value,
      post_author_link: document.getElementById("post_author_link").value,
      post_secret: document.getElementById("post_secret").value,
      post_content: editorContent,
      post_summary: post_summary,
    };
    message.loading({
      content: "Action in progress...",
      key: "newPostLoading",
    });
    fetch(BASE_URL + "/new_post/" + query, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post_data),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          message.success({ content: data.message, key: "newPostLoading" });
          Router.replace(
            "/post/[post_type]/[post_id]",
            `/post/${query}/${data.post_id}`
          );
        } else {
          message.error({ content: data.message, key: "newPostLoading" });
        }
      });
  };

  const add_new_fanart = () => {
    message.loading({
      content: "Action in progress...",
      duration: 0,
      key: "newFanart",
    });
    let post_data = new FormData();
    imageList.forEach((file) => {
      post_data.append("files", file);
    });
    post_data.append("post_type", query);
    post_data.append("post_title", document.getElementById("post_title").value);
    post_data.append(
      "post_author",
      document.getElementById("post_author").value
    );
    post_data.append(
      "post_author_link",
      document.getElementById("post_author_link").value
    );
    post_data.append(
      "post_secret",
      document.getElementById("post_secret").value
    );
    post_data.append("post_description", editorContent);

    fetch(`${BASE_URL}/new_fanart/${query}`, {
      method: "POST",
      body: post_data,
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          message.success({ content: data.message, key: "newFanart" });
          Router.replace(
            "/fanart/[post_type]/[post_id]",
            `/fanart/${query}/${data.post_id}`
          );
        } else {
          message.error({ content: data.message, key: "newFanart" });
        }
      });
  };

  const newPostButton =
    query.indexOf("fanart") > 0 ? (
      <Button onClick={add_new_fanart}>
        <SaveOutlined />
        Create Post
      </Button>
    ) : (
      <Button onClick={add_new_post}>
        <SaveOutlined />
        Create Post
      </Button>
    );

  return (
    <div>
      <SecondaryLayout title="New Post">
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
                xl={{ span: 16, offset: 4 }}
              >
                <Card
                  title="New Post"
                  extra={title}
                  style={{ boxShadow: "8px 14px 38px 0px rgba(40,40,40,0.1)" }}
                >
                  <Row gutter={[16, 16]}>
                    <Col xs={24} lg={12}>
                      <Input
                        id="post_title"
                        placeholder="Post Title"
                        suffix={<SolutionOutlined />}
                      />
                      <Typography.Text type="secondary">
                        *required. (min length = 3)
                      </Typography.Text>
                    </Col>
                    <Col xs={24} lg={12}>
                      <Input
                        id="post_author"
                        placeholder="Author's Name"
                        suffix={<UserOutlined />}
                      />
                      <Typography.Text type="secondary">
                        optional
                      </Typography.Text>
                    </Col>
                    <Col xs={24} lg={12}>
                      <Input
                        id="post_author_link"
                        placeholder="Author's Profile Link"
                        suffix={<LinkOutlined />}
                      />
                      <Typography.Text type="secondary">
                        optional
                      </Typography.Text>
                    </Col>
                    <Col xs={24} lg={12}>
                      <Input.Password
                        id="post_secret"
                        placeholder="Post Secret"
                      />
                      <Typography.Text type="secondary">
                        *required. (min length = 6). Remember this post secret.
                        You cannot edit or delete the post without post secret.
                      </Typography.Text>
                    </Col>
                  </Row>
                  <div className="editor_area">
                    <Card type="inner" extra={newPostButton}>
                      {display}
                    </Card>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </motion.div>
      </SecondaryLayout>
      <style jsx>
        {`
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            margin-bottom: 0;
          }
          .page_root {
            margin: 40px 0 80px 0;
          }
          .editor_area {
            margin-top: 32px;
          }
        `}
      </style>
    </div>
  );
}

NewPost.getInitialProps = ({ query }) => {
  return { query: query.post_type };
};

export default NewPost;
