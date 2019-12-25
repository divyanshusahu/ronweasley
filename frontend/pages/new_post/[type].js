import Error from "next/error";
import { useRouter } from "next/router";

import isEmpty from "is-empty";

import { Row, Col, Card, Input, Icon, Typography } from "antd";

/*import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";*/

import SecondaryLayout from "../../utils/SecondaryLayout";
import PostEditor from "../../utils/PostEditor";

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

  const [editorType, setEditorType] = React.useState("normal_editor");

  const [editorContent, setEditorContent] = React.useState("");
  const handleEditorContent = content => {
    setEditorContent(content);
  };

  return (
    <div>
      <SecondaryLayout title="New Post">
        {/*<Container>
          <div className="new_post_card">
            <Card raised>
              <CardHeader title={`NEW ${title} POST`} />
              <CardContent>
                <TextField
                  fullWidth
                  helperText="*required."
                  placeholder="Post Title"
                  size="small"
                  variant="outlined"
                  id="post_title"
                />
                <FormHelperText margin="dense" error></FormHelperText>
                <TextField
                  fullWidth
                  helperText="optional"
                  placeholder="Author's Name "
                  size="small"
                  variant="outlined"
                  id="post_author"
                />
                <FormHelperText margin="dense" error></FormHelperText>
                <TextField
                  fullWidth
                  helperText="optional"
                  placeholder="Auhtor's Social Profile Link"
                  size="small"
                  variant="outlined"
                  id="post_title"
                />
                <FormHelperText margin="dense" error></FormHelperText>
                <TextField
                  fullWidth
                  helperText="*required. Remember this post secret.
                  Secret is required for editing and deleting the post"
                  placeholder="Post Title"
                  size="small"
                  variant="outlined"
                  id="post_title"
                />
                <FormHelperText margin="dense" error></FormHelperText>
                <PostEditor handleEditorContent={handleEditorContent} />
              </CardContent>
              <CardActions></CardActions>
            </Card>
          </div>
        </Container>*/}
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
                      setEditorType(key);
                    }}
                  ></Card>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </SecondaryLayout>
      <style jsx>
        {`
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
