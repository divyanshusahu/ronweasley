import Head from "next/head";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import { Link, Element } from "react-scroll";

import NavigationBar from "../utils/NavigationBar";
import ScrollAnimation from "../utils/ScrollAnimation";
import PostEditor from "../utils/PostEditor";
import Footer from "../utils/Footer";

function Romione() {
  const [tab_value, setTabValue] = React.useState(0);
  const tab_handlechange = (event, value) => {
    setTabValue(value);
  };

  const [createPost, setCreatePost] = React.useState(false);
  const handleCreatePostOpen = () => {
    if (tab_value === 0) {
      setCreatePost(true);
    }
  };
  const handleCreatePostClose = () => {
    setCreatePost(false);
  };

  return (
    <div className="root">
      <Head>
        <title>Romione</title>
        <link
          href="https://fonts.googleapis.com/css?family=Oleo+Script"
          rel="stylesheet"
          type="text/css"
        />
      </Head>
      <div className="main">
        <div className="main_overlay">
          <NavigationBar />
          <div className="page">
            <p className="page_big_heading">
              Most celebrated Harry Potter canon couples.
            </p>
            <p className="page_about">Some lines best describing Romione.</p>
            <Link to="pageContent" spy={true} smooth={true} duration={500}>
              <ScrollAnimation />
            </Link>
          </div>
        </div>
      </div>
      <Element name="pageContent">
        <div className="page_content">
          <Container>
            <Paper className="page_content_paper" elevation={24}>
              <div className="toolbar">
                <Grid container>
                  <Grid container item xs={12} lg={8}>
                    <Tabs
                      value={tab_value}
                      onChange={tab_handlechange}
                      indicatorColor="primary"
                      textColor="primary"
                      variant="scrollable"
                      scrollButtons="auto"
                    >
                      <Tab label="Appericiation"></Tab>
                      <Tab label="Fanart"></Tab>
                      <Tab label="Fanfiction"></Tab>
                    </Tabs>
                  </Grid>
                  <Grid container item xs={12} lg={4}>
                    <Input
                      startAdornment={
                        <InputAdornment position="start">
                          <Icon>search</Icon>
                        </InputAdornment>
                      }
                      placeholder="Search"
                    />
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      className="new_button"
                      onClick={handleCreatePostOpen}
                    >
                      New
                    </Button>
                  </Grid>
                </Grid>
              </div>
              <div className="page_posts"></div>
            </Paper>
          </Container>
        </div>
      </Element>
      <Dialog open={createPost} maxWidth="md" fullWidth={true}>
        <DialogTitle>{`New Romione Appreciation Post`}</DialogTitle>
        <DialogContent>
          <PostEditor />
        </DialogContent>
        <DialogActions>
          <Button color="default" onClick={handleCreatePostClose}>
            Cancel
          </Button>
          <Button color="primary" variant="contained" autoFocus>
            Post
          </Button>
        </DialogActions>
      </Dialog>
      <style jsx>
        {`
          .root {
            min-height: 100vh;
            height: 100%;
          }
          .main {
            min-height: 100vh;
            height: 100%;
            background-image: url("https://i.imgur.com/G30MPi7.jpg");
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
          .main_overlay {
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.75);
          }
          .page {
            min-height: 92vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .page_big_heading {
            color: #fff;
            font-family: "Oleo Script";
            font-size: 3rem;
            margin-bottom: 0.35em;
            font-weight: 400;
          }
          .page_about {
            color: #efefef;
            margin-bottom: 80px;
            font-size: 1.25rem;
            font-family: "Roboto";
            font-weight: 500;
            line-height: 1.6;
          }
          .page_content {
            padding: 80px 0;
            background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
          }
          .page_content_paper {
            min-height: 150vh;
          }
          .toolbar {
            padding-top: 32px;
            min-height: 80px;
          }
          .new_button {
            margin-left: 16px;
          }
          .page_posts {
            min-height: calc(150vh - 80px);
            background-image: radial-gradient(
                73% 147%,
                #eadfdf 59%,
                #ece2df 100%
              ),
              radial-gradient(
                91% 146%,
                rgba(255, 255, 255, 0.5) 47%,
                rgba(0, 0, 0, 0.5) 100%
              );
            background-blend-mode: screen;
          }
        `}
      </style>
      <Footer />
    </div>
  );
}

export default Romione;
