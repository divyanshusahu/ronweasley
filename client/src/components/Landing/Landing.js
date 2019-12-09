import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
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

import NavigationBar from "../Navigation/NavigationBar";
import PostEditor from "../Utils/PostEditor";

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
  landing: {
    minHeight: "92vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  landing_big_heading: {
    color: "#fff",
    fontFamily: "Oleo Script"
  },
  landing_about: {
    color: "#efefef",
    marginBottom: "80px"
  },
  landing_content: {
    padding: "80px 0",
    minHeight: "100vh",
    backgroundImage: "linear-gradient(to top, #d5d4d0 0%, #d5d4d0 1%, #eeeeec 31%, #efeeec 75%, #e9e9e7 100%)"
  },
  landing_content_paper: {
    minHeight: "100vh"
  },
  toolbar: {
    paddingTop: "32px",
    minHeight: "80px"
  },
  new_button: {
    marginLeft: "16px"
  },
  landing_posts: {
    minHeight: "calc(100vh - 80px)",
    backgroundImage: "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)"
  }
}));

function Landing() {
  const classes = useStyles();

  const [selectedTab, setSelectedTab] = React.useState("Appericiation");
  const [tab_value, setTabValue] = React.useState(0);
  const tab_handlechange = (event, value) => {
    setTabValue(value);
    if (value === 0) {
      setSelectedTab("Appericiation");
    } else if (value === 1) {
      setSelectedTab("Defense");
    } else if (value === 2) {
      setSelectedTab("Fanart");
    } else if (value === 3) {
      setSelectedTab("Fanfiction");
    }
  };

  const [createPost, setCreatePost] = React.useState(false);
  const handleCreatePostOpen = () => {
    if (tab_value === 0 || tab_value === 1) {
      setCreatePost(true);
    }
  };
  const handleCreatePostClose = () => {
    setCreatePost(false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.main}>
        <div className={classes.main_overlay}>
          <NavigationBar />
          <div className={classes.landing}>
            <Typography
              variant="h3"
              component="p"
              gutterBottom
              className={classes.landing_big_heading}
            >
              A Website dedicated to the most selfless Harry Potter Character.
            </Typography>
            <Typography
              variant="h6"
              component="p"
              className={classes.landing_about}
            >
              Some lines best describing Ron.
            </Typography>
            <Fab>
              <Icon>keyboard_arrow_down</Icon>
            </Fab>
          </div>
        </div>
      </div>
      <div className={classes.landing_content}>
        <Container>
          <Paper className={classes.landing_content_paper} elevation={24}>
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
                    <Tab label="Defense"></Tab>
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
            <div className={classes.landing_posts}></div>
          </Paper>
        </Container>
      </div>
      <Dialog open={createPost} maxWidth="md" fullWidth={true}>
        <DialogTitle>{`New Ron Weasley ${selectedTab} Post`}</DialogTitle>
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
    </div>
  );
}

export default Landing;
