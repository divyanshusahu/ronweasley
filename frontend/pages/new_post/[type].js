import Error from "next/error";
import { useRouter } from "next/router";

import isEmpty from "is-empty";

import { Row, Col, Card, Input, Icon, Typography } from "antd";

import SecondaryLayout from "../../utils/SecondaryLayout";
import DraftJSEditor from "../../utils/DraftJSEditor";
import MarkdownEditor from "../../utils/MarkdownEditor";

function NewPost() {
  const allowedQuery = [
    "ron_weasley_appreciation",
    "ron_weasley_defense",
    "romione_appreciation"
  ];

  const router = useRouter();
  const query = router.query.type;

  if (allowedQuery.findIndex(q => q == query) === -1) {
    return <Error statusCode={404} />;
  }

  let title = query.replace(/_/g, " ");

  const tabList = [
    { key: "normal_editor", tab: "Noraml Editor" },
    { key: "markdown", tab: "Markdown" }
  ];

  const [editorContent, setEditorContent] = React.useState("");
  const handleEditorContent = content => {
    setEditorContent(content);
  };

  const [currentEditor, setCurrentEditor] = React.useState(
    <DraftJSEditor handleEditorContent={handleEditorContent} />
  );

  const [editorType, setEditorType] = React.useState("normal_editor");
  const handleOnTabChange = key => {
    setEditorType(key);
    if (key === "normal_editor") {
      setCurrentEditor(
        <DraftJSEditor handleEditorContent={handleEditorContent} />
      );
    } else if (key === "markdown") {
      setCurrentEditor(<MarkdownEditor />);
    }
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
                      *required
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
                      *required. Remember this post secret. You cannot edit or
                      delete the post without post secret.
                    </Typography.Text>
                  </Col>
                </Row>
                <div className="editor_area">
                  <Card
                    type="inner"
                    tabList={tabList}
                    activeTabKey={editorType}
                    onTabChange={key => {
                      handleOnTabChange(key);
                    }}
                  >
                    {currentEditor}
                  </Card>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </SecondaryLayout>
      <style jsx>
        {`
          h1, h2, h3, h4, h5, h6 {
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

export default NewPost;
