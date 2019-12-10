import React, { Suspense, lazy } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
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
import { makeStyles } from "@material-ui/core/styles";

import { Link, Element } from "react-scroll";

import { Helmet } from "react-helmet";

import NavigationBar from "../Navigation/NavigationBar";
import ScrollAnimation from "../Utils/ScrollAnimation";

const PostEditor = lazy(() => import("../Utils/PostEditor"));

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "100vh",
    height: "100%"
  },
  main: {
    minHeight: "100vh",
    height: "100%",
    backgroundImage: "url('https://i.imgur.com/IParGP1.jpg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain"
  },
  main_overlay: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.75)"
  },
  page: {
    minHeight: "92vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  page_big_heading: {
    color: "#fff",
    fontFamily: "Oleo Script"
  },
  page_about: {
    color: "#efefef",
    marginBottom: "80px"
  },
  page_content: {
    padding: "80px 0",
    backgroundImage:
      "linear-gradient(to top, #d5d4d0 0%, #d5d4d0 1%, #eeeeec 31%, #efeeec 75%, #e9e9e7 100%)"
  },
  page_content_paper: {
    minHeight: "150vh"
  },
  toolbar: {
    paddingTop: "32px",
    minHeight: "80px"
  },
  new_button: {
    marginLeft: "16px"
  },
  page_posts: {
    minHeight: "calc(150vh - 80px)",
    backgroundImage: "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)"
  }
}));

function Romione() {
  const classes = useStyles();

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
    <div className={classes.root}>
      <Helmet>
        <title>Romione</title>
      </Helmet>
      <div className={classes.main}>
        <div className={classes.main_overlay}>
          <NavigationBar />
          <div className={classes.page}>
            <Typography
              variant="h3"
              component="p"
              gutterBottom
              className={classes.page_big_heading}
            >
              Most celebrated Harry Potter canon couples.
            </Typography>
            <Typography
              variant="h6"
              component="p"
              className={classes.page_about}
            >
              Some lines best describing Romione.
            </Typography>
            <Link to="pageContent" spy={true} smooth={true} duration={500}>
              <ScrollAnimation />
            </Link>
          </div>
        </div>
      </div>
      <Element name="pageContent">
        <div className={classes.page_content}>
          <Container>
            <Paper className={classes.page_content_paper} elevation={24}>
              <div className={classes.toolbar}>
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
                      className={classes.new_button}
                      onClick={handleCreatePostOpen}
                    >
                      New
                    </Button>
                  </Grid>
                </Grid>
              </div>
              <div className={classes.page_posts}></div>
            </Paper>
          </Container>
        </div>
      </Element>
      <Dialog open={createPost} maxWidth="md" fullWidth={true}>
        <DialogTitle>{`New Romione Appreciation Post`}</DialogTitle>
        <DialogContent>
          <Suspense fallback={<div></div>}>
            <PostEditor />
          </Suspense>
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
    </div>
  );
}

export default Romione;
