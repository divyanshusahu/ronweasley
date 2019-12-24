import Error from "next/error";
import { useRouter } from "next/router";

import isEmpty from "is-empty";

import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";

import SecondaryLayout from "../../utils/SecondaryLayout";
import QuillEditor from "../../utils/QuillEditor";
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

  let title = query.replace(/_/g, " ").toUpperCase();

  const [editorContent, setEditorContent] = React.useState("");
  const handleEditorContent = content => {
    setEditorContent(content);
  };

  return (
    <div>
      <SecondaryLayout title="New Post">
        <Container>
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
                <QuillEditor />
                <PostEditor handleEditorContent={handleEditorContent} />
              </CardContent>
              <CardActions></CardActions>
            </Card>
          </div>
        </Container>
      </SecondaryLayout>
      <style jsx>
        {`
          .new_post_card {
            margin: 40px 0;
          }
        `}
      </style>
    </div>
  );
}

export default NewPost;
