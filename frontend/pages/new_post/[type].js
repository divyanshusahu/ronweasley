import Head from "next/head";
import Error from "next/error";
import { useRouter } from "next/router";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";

import NavigationBar from "../../utils/NavigationBar";
import Footer from "../../utils/Footer";
import PostEditor from "../../utils/PostEditor";

function Post() {
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

  const isBrowser = typeof window !== "undefined";
  let title = "";
  if (isBrowser) {
    title = location.pathname
      .substr(10)
      .replace(/_/g, " ")
      .toUpperCase();
  }

  const [post, setPost] = React.useState(false);
  const [postData, setPostData] = React.useState(null);
  const handlePost = () => {
    let pd = {};
    pd["title"] = document.getElementById("post_title").value;
    pd["author"] = document.getElementById("post_author_name").value;
    pd["author_link"] = document.getElementById("post_author_link").value;
    pd["secret"] = document.getElementById("post_secret").value;
    pd["type"] = query;
    setPostData(pd);
    setPost(true);
  };

  return (
    <div className="root">
      <Head>
        <title>New Post</title>
      </Head>
      <NavigationBar dark={true} />
      <div className="section">
        <Container>
          <Paper square={true} elevation={12}>
            <div className="paper_root">
              <Typography variant="h5" component="p" gutterBottom>
                {`NEW ${title} POST`}
              </Typography>
              <TextField
                variant="outlined"
                placeholder="Post Title"
                id="post_title"
                fullWidth
                margin="dense"
                required
              />
              <FormHelperText margin="dense">*required</FormHelperText>
              <TextField
                variant="outlined"
                placeholder="Author's Name"
                id="post_author_name"
                fullWidth
                margin="dense"
              />
              <FormHelperText disabled margin="dense">
                optional
              </FormHelperText>
              <TextField
                variant="outlined"
                placeholder="Author's Social Profile Link"
                id="post_author_link"
                fullWidth
                margin="dense"
              />
              <FormHelperText disabled margin="dense">
                optional
              </FormHelperText>
              <TextField
                variant="outlined"
                placeholder="Post Secret"
                id="post_secret"
                fullWidth
                margin="dense"
                required
              />
              <FormHelperText margin="dense">
                *required. Remember this post secret. Secret is required for
                editing and deleting the post.
              </FormHelperText>
              <div className="editor_pos">
                <PostEditor isPost={post} data={postData} />
              </div>
              <div className="paper_action">
                <Button variant="outlined" onClick={handlePost}>
                  Post
                </Button>
              </div>
            </div>
          </Paper>
        </Container>
      </div>
      <Footer />
      <style jsx>
        {`
          .root {
            min-height: 100vh;
            background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
          }
          .section {
            margin: 40px 0 80px 0;
          }
          .paper_root {
            padding: 16px;
          }
          .editor_pos {
            margin-top: 16px;
          }
          .paper_action {
            width: 100%;
            padding: 16px;
            display: flex;
            justify-content: flex-end;
          }
          @media screen and (min-width: 600px) {
            .paper_root {
              padding: 32px;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Post;
