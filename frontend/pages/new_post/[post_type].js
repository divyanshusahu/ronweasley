import { useRouter } from "next/router";

import { Button, Row, Col, Card, Input, Typography, message } from "antd";
import {
  SaveOutlined,
  SolutionOutlined,
  UserOutlined,
  LinkOutlined,
} from "@ant-design/icons";

import ReCAPTCHA from "react-google-recaptcha";

import SecondaryLayout from "../../components/SecondaryLayout";
import TinyMCEEditor from "../../components/TinyMCEEditor";
import UploadImage from "../../components/UploadImage";

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

let post_type;
let response;

function NewPost(props) {
  const router = useRouter();

  const BASE_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://api.ronweasley.co";

  let title = props.post_type.replace(/_/g, " ");
  title = title
    .split(" ")
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
    .join(" ");

  const recaptchaInstance = React.useRef();

  const [editorContent, setEditorContent] = React.useState("");
  const handleEditorContent = (content) => {
    setEditorContent(content);
  };

  const [imageList, setImageList] = React.useState([]);
  const handleImageList = (list) => {
    setImageList(list);
  };

  const display =
    props.post_type.indexOf("fanart") > 0 ? (
      <div style={{ paddingTop: 16 }}>
        <UploadImage handleImageList={handleImageList} />
        <TinyMCEEditor
          initialContent=""
          handleEditorContent={handleEditorContent}
        />
      </div>
    ) : (
      <TinyMCEEditor
        initialContent=""
        handleEditorContent={handleEditorContent}
      />
    );

  const executeCaptcha = () => {
    message.loading({
      content: "Action in progress...",
      duration: 0,
      key: "newPostLoading",
    });
    recaptchaInstance.current.reset();
    recaptchaInstance.current.execute();
  };

  const add_new_post = () => {
    let post_data = {
      post_title: document.getElementById("post_title").value,
      post_author: document.getElementById("post_author").value,
      post_author_link: document.getElementById("post_author_link").value,
      post_secret: document.getElementById("post_secret").value,
      post_content: editorContent,
      "g-recaptcha-response": response,
    };
    fetch(BASE_URL + "/new_post/" + props.post_type, {
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
          router.push(
            "/post/[post_type]/[post_id]",
            `/post/${props.post_type}/${data.post_id}`
          );
        } else {
          message.error({ content: data.message, key: "newPostLoading" });
        }
      });
  };

  const add_new_fanart = () => {
    let post_data = new FormData();
    imageList.forEach((file) => {
      post_data.append("files", file);
    });
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
    post_data.append("g-recaptcha-response", response);

    fetch(`${BASE_URL}/new_fanart/${props.post_type}`, {
      method: "POST",
      body: post_data,
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          message.success({ content: data.message, key: "newPostLoading" });
          router.push(
            "/fanart/[post_type]/[post_id]",
            `/fanart/${props.post_type}/${data.post_id}`
          );
        } else {
          message.error({ content: data.message, key: "newPostLoading" });
        }
      });
  };

  const post_submit = () => {
    if (post_type === "fanart") {
      add_new_fanart();
    } else if (post_type === "post") {
      add_new_post();
    }
  };

  const verifyCaptcha = () => {
    response = recaptchaInstance.current.getValue();
    if (response) {
      post_submit();
    }
  };

  const newPostButton =
    props.post_type.indexOf("fanart") > 0 ? (
      <Button
        shape="round"
        onClick={() => {
          post_type = "fanart";
          executeCaptcha();
        }}
      >
        <SaveOutlined />
        Create Post
      </Button>
    ) : (
      <Button
        shape="round"
        onClick={() => {
          post_type = "post";
          executeCaptcha();
        }}
      >
        <SaveOutlined />
        Create Post
      </Button>
    );

  return (
    <div>
      <SecondaryLayout title={`New Post: ${title}`}>
        <div className="page_root">
          <Row>
            <Col
              xs={{ span: 22, offset: 1 }}
              md={{ span: 20, offset: 2 }}
              lg={{ span: 18, offset: 3 }}
              xxl={{ span: 16, offset: 4 }}
            >
              <Card
                title={
                  <Typography.Title level={4} style={{ marginBottom: 0 }}>
                    New Post
                  </Typography.Title>
                }
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
                    <Typography.Text type="secondary">optional</Typography.Text>
                  </Col>
                  <Col xs={24} lg={12}>
                    <Input
                      id="post_author_link"
                      placeholder="Author's Profile Link"
                      suffix={<LinkOutlined />}
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
                    bordered={false}
                    extra={newPostButton}
                    bodyStyle={{ padding: 0 }}
                  >
                    {display}
                  </Card>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
        <ReCAPTCHA
          ref={recaptchaInstance}
          sitekey="6LeWVukUAAAAAK0uVPEuSOXo16450MgzzrhM9HDt"
          onChange={verifyCaptcha}
          size="invisible"
          theme="dark"
          badge="inline"
          style={{ display: "none" }}
        />
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
            padding: 64px 0 64px 0;
          }
          .editor_area {
            margin-top: 32px;
          }
        `}
      </style>
    </div>
  );
}

export async function getStaticPaths() {
  const pages = allowedQuery.map((p) => ({ params: { post_type: p } }));
  return { paths: pages, fallback: false };
}

export async function getStaticProps(context) {
  return { props: context.params };
}

export default NewPost;
