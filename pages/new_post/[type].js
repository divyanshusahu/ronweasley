import Head from "next/head";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import NavigationBar from "../../utils/NavigationBar";
import Footer from "../../utils/Footer";
import PostEditor from "../../utils/PostEditor";

const useStyles = new makeStyles(theme => ({
  paper_root: {
    padding: theme.spacing(4)
  }
}));

function Post() {
  //const title = window.location.pathname.substr(10).replace(/-/g, " ").toUpperCase();
  const classes = useStyles();

  return (
    <div className="root">
      <Head>
        <title>New Post</title>
      </Head>
      <NavigationBar dark={true} />
      <div className="section">
        <Container>
          <Paper square={true} elevation={12} className={classes.paper_root}>
            <Typography variant="h4" component="p" gutterBottom>
              NEW POST
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Post Title"
              fullWidth
              margin="dense"
              required
            />
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
              placeholder="Post Secret"
              fullWidth
              margin="dense"
              required
            />
            <FormHelperText margin="dense">
              Remember this post secret. Secret is required for editing and
              deleting the post.
            </FormHelperText>
            <div className="editor_pos">
              <PostEditor />
            </div>
            <div>
              <Button variant="outlined">Post</Button>
            </div>
          </Paper>
        </Container>
      </div>
      <Footer />
      <style jsx>
        {`
          .root {
            min-height: 100vh;
          }
          .section {
            margin: 40px 0 80px 0;
          }
          .editor_pos {
            margin-top: 16px;
          }
        `}
      </style>
    </div>
  );
}

export default Post;
