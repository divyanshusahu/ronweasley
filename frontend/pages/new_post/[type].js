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
    "ron-weasley-appreciation",
    "ron-weasley-defense",
    "romione-appreciation"
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
      .replace(/-/g, " ")
      .toUpperCase();
  }

  const [post, setPost] = React.useState(false);
  const handlePost = () => {
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
                fullWidth
                margin="dense"
                required
              />
              <FormHelperText margin="dense">*required</FormHelperText>
              <TextField
                variant="outlined"
                placeholder="Author's Name"
                fullWidth
                margin="dense"
              />
              <FormHelperText disabled margin="dense">
                optional
              </FormHelperText>
              <TextField
                variant="outlined"
                placeholder="Author's Social Profile Link"
                fullWidth
                margin="dense"
              />
              <FormHelperText disabled margin="dense">
                optional
              </FormHelperText>
              <TextField
                variant="outlined"
                placeholder="Post Secret"
                fullWidth
                margin="dense"
                required
              />
              <FormHelperText margin="dense">
                *required. Remember this post secret. Secret is required for
                editing and deleting the post.
              </FormHelperText>
              <div className="editor_pos">
                <PostEditor isPost={post} query={query} />
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
