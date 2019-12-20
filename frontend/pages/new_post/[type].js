import Head from "next/head";
import Error from "next/error";
import { useRouter } from "next/router";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import fetch from "isomorphic-unfetch";
import isEmpty from "is-empty";
import { ToastContainer, toast } from "react-toastify";

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

  let title = query.replace(/_/g, " ").toUpperCase();

  const [editorContent, setEditorContent] = React.useState("");
  const handleEditorContent = content => {
    setEditorContent(content);
  };

  const [postResult, setPostResult] = React.useState(null);
  const [backdropOpen, setBackdropOpen] = React.useState(false);

  const handlePost = post_data => {
    const BASE_URL =
      process.env.NODE_ENV === "development"
        ? "http://localhost:5000"
        : "https://api.ronweasley.co";

    fetch(BASE_URL + "/posts/new/" + post_data.type, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post_data)
    })
      .then(r => r.json())
      .then(data => {
        setPostResult(data);
      });
  };

  const handlePostClick = () => {
    setBackdropOpen(true);
    let post_data = {};
    post_data["title"] = document.getElementById("post_title").value;
    post_data["author"] = document.getElementById("post_author_name").value;
    post_data["author_link"] = document.getElementById(
      "post_author_link"
    ).value;
    post_data["secret"] = document.getElementById("post_secret").value;
    post_data["type"] = query;
    post_data["content"] = editorContent;
    post_data["reported"] = false;
    handlePost(post_data);
  };

  React.useEffect(() => {
    if (!isEmpty(postResult)) {
      setBackdropOpen(false);
      if (isEmpty(postResult["error"])) {
        if (!postResult["success"]) {
          toast.error(postResult["message"]);
        } else {
          toast.success(postResult["message"]);
        }
      } else {
        toast.error("Invalid Input Fields");
      }
    }
  }, [postResult]);

  return (
    <div className="root">
      <Head>
        <title>New Post</title>
        <link
          href="https://cdn.jsdelivr.net/npm/react-toastify@5.4.1/dist/ReactToastify.min.css"
          rel="stylesheet"
        />
      </Head>
      <NavigationBar dark={true} />
      <div className="section">
        <Backdrop open={backdropOpen} style={{ zIndex: 1301 }}>
          <CircularProgress />
        </Backdrop>
        <ToastContainer
          position="bottom-left"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnHover
          draggable
        />
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
              <FormHelperText margin="dense" error>
                {!isEmpty(postResult) && !isEmpty(postResult["error"])
                  ? postResult["error"]["title"]
                  : ""}
              </FormHelperText>
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
              <FormHelperText margin="dense" error></FormHelperText>
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
              <FormHelperText margin="dense" error>
                {!isEmpty(postResult) && !isEmpty(postResult["error"])
                  ? postResult["error"]["author_link"]
                  : ""}
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
              <FormHelperText margin="dense" error>
                {!isEmpty(postResult) && !isEmpty(postResult["error"])
                  ? postResult["error"]["secret"]
                  : ""}
              </FormHelperText>
              <div className="editor_pos">
                <PostEditor handleEditorContent={handleEditorContent} />
              </div>
              <div className="paper_action">
                <Button variant="outlined" onClick={handlePostClick}>
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
