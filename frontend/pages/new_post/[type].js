import Link from "next/link";
import Router from "next/router";

import { Button, Row, Col, Card, Input, Icon, Typography, message } from "antd";

import fetch from "isomorphic-unfetch";

import SecondaryLayout from "../../components/SecondaryLayout";
import DraftJSEditor from "../../components/DraftJSEditor";
import ErrorLayout from "../../components/ErrorLayout";

function NewPost({ query }) {
  const allowedQuery = [
    "ron_weasley_appreciation",
    "ron_weasley_defense",
    "romione_appreciation"
  ];

  const BASE_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://api.ronweasley.co";

  if (allowedQuery.findIndex(q => q == query) === -1) {
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
  const handleEditorContent = content => {
    setEditorContent(content);
  };

  const add_new_post = () => {
    let post_data = {
      post_type: query,
      post_title: document.getElementById("post_title").value,
      post_author: document.getElementById("post_author").value,
      post_author_link: document.getElementById("post_author_link").value,
      post_secret: document.getElementById("post_secret").value,
      post_content: editorContent
    };
    message.loading({
      content: "Action in progress...",
      key: "newPostLoading"
    });
    fetch(BASE_URL + "/posts/new/" + query, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post_data)
    })
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          message.success({ content: data.message, key: "newPostLoading" });
          Router.push(`/post/${query}/${data.post_id}`);
        } else {
          message.error({ content: data.message, key: "newPostLoading" });
        }
      });
  };

  return (
    <div>
      <SecondaryLayout title="New Post">
        <div className="page_root">
          <Row type="flex" justify="center">
            <Col xs={22} md={20} lg={18} xl={16}>
              <Card title="New Post" extra={title}>
                <Row gutter={[16, 16]}>
                  <Col xs={24} lg={12}>
                    <Input
                      id="post_title"
                      placeholder="Post Title"
                      suffix={<Icon type="solution" />}
                    />
                    <Typography.Text type="secondary">
                      *required. (min length = 3)
                    </Typography.Text>
                  </Col>
                  <Col xs={24} lg={12}>
                    <Input
                      id="post_author"
                      placeholder="Author's Name"
                      suffix={<Icon type="user" />}
                    />
                    <Typography.Text type="secondary">optional</Typography.Text>
                  </Col>
                  <Col xs={24} lg={12}>
                    <Input
                      id="post_author_link"
                      placeholder="Author's Profile Link"
                      suffix={<Icon type="link" />}
                    />
                    <Typography.Text type="secondary">optional</Typography.Text>
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
                  <Card
                    type="inner"
                    extra={
                      <Button onClick={add_new_post}>
                        <Icon type="save" />
                        Create Post
                      </Button>
                    }
                  >
                    <DraftJSEditor handleEditorContent={handleEditorContent} />
                  </Card>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
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

NewPost.getInitialProps = async ({ query }) => {
  return { query: query.type };
};

export default NewPost;
