import Link from "next/link";
import Router from "next/router";

import fetch from "isomorphic-unfetch";
import cookies from "next-cookies";

import { Button, Row, Col, Card, Input, Icon, Typography, message } from "antd";

import SecondaryLayout from "../../../components/SecondaryLayout";
import ErrorLayout from "../../../components/ErrorLayout";
import DraftJSEditor from "../../../components/DraftJSEditor";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://api.ronweasley.co";

function EditPost(props) {
  if (!props.post_exist) {
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

  if (!props.authorized) {
    return (
      <ErrorLayout
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
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

  const [editorContent, setEditorContent] = React.useState("");
  const handleEditorContent = content => {
    setEditorContent(content);
  };

  const handlePostUpdate = () => {
    message.loading({
      content: "Action in progress",
      duration: 0,
      key: "editPostMessage"
    });
    let post_data = {
      post_title: document.getElementById("post_title").value,
      post_author: document.getElementById("post_author").value,
      post_author_link: document.getElementById("post_author_link").value,
      post_secret: document.getElementById("post_secret").value,
      post_content: editorContent
    };
    fetch(
      `${BASE_URL}/edit_post/update/${post.post_type["S"]}/${post.post_id["S"]}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.access_token}`
        },
        body: JSON.stringify(post_data)
      }
    )
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          message.success({ content: data.message, key: "editPostMessage" });
          Router.replace(
            "/post/[post_type]/[post_id]",
            `/post/${post.post_type["S"]}/${post.post_id["S"]}`
          );
        } else {
          message.error({ content: data.message, key: "editPostMessage" });
        }
      });
  };

  return (
    <div>
      <SecondaryLayout title={`Edit Post: ${post.post_title["S"]}`}>
        <div className="edit_post">
          <Row type="flex" justify="center">
            <Col xs={22} md={20} lg={18} xl={16}>
              <Card
                title="Edit Post"
                extra={post.post_type["S"].replace(/_/g, " ")}
              >
                <Row gutter={[16, 16]}>
                  <Col xs={24} lg={12}>
                    <Input
                      id="post_title"
                      placeholder="Post Title"
                      suffix={<Icon type="solution" />}
                      defaultValue={post.post_title["S"]}
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
                      defaultValue={
                        post.post_author["S"] !== "Anonymous"
                          ? post.post_author["S"]
                          : ""
                      }
                    />
                    <Typography.Text type="secondary">optional</Typography.Text>
                  </Col>
                  <Col xs={24} lg={12}>
                    <Input
                      id="post_author_link"
                      placeholder="Author's Profile Link"
                      suffix={<Icon type="link" />}
                      defaultValue={
                        post.post_author_link["S"] !== "/anonymous/anon.jpg"
                          ? post.post_author_link["S"]
                          : ""
                      }
                    />
                    <Typography.Text type="secondary">optional</Typography.Text>
                  </Col>
                  <Col xs={24} lg={12}>
                    <Input.Password
                      id="post_secret"
                      placeholder="Post Secret"
                    />
                    <Typography.Text type="secondary">
                      New post secret will overwrite the previously saved one.
                      Leave this field empty to keep the old one.
                    </Typography.Text>
                  </Col>
                </Row>
                <div className="editor_area">
                  <Card
                    type="inner"
                    extra={
                      <Button onClick={handlePostUpdate}>
                        <Icon type="save" />
                        Save Post
                      </Button>
                    }
                  >
                    <DraftJSEditor
                      handleEditorContent={handleEditorContent}
                      post_content={post.post_content["S"]}
                    />
                  </Card>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </SecondaryLayout>
      <style jsx>
        {`
          .edit_post {
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

EditPost.getInitialProps = async ctx => {
  const post_type = ctx.query.post_type;
  const post_id = ctx.query.post_id;
  const r1 = await fetch(`${BASE_URL}/get_post/${post_type}/${post_id}`);
  const d1 = await r1.json();
  if (d1.success) {
    const access_token = cookies(ctx)[post_id];
    const r2 = await fetch(`${BASE_URL}/edit_post/identity_check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`
      },
      body: JSON.stringify({ post_id: post_id })
    });
    const d2 = await r2.json();
    if (d2.success) {
      return {
        post_exist: true,
        authorized: true,
        post: d1.post,
        access_token: access_token
      };
    } else {
      return { post_exist: true, authorized: false };
    }
  } else {
    return { post_exist: false };
  }
};

export default EditPost;
