import Head from "next/head";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Hidden from "@material-ui/core/Hidden";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

import { Link, Element } from "react-scroll";

import NavigationBar from "../utils/NavigationBar";
import ScrollAnimation from "../utils/ScrollAnimation";
import Footer from "../utils/Footer";
import PostEditor from "../utils/PostEditor";

const useStyles = new makeStyles(theme => ({
  select: {
    marginLeft: theme.spacing(2),
    width: "200px"
  }
}));

function Index() {
  const classes = useStyles();

  const [selectedTab, setSelectedTab] = React.useState("Appericiation");
  const [tab_value, setTabValue] = React.useState(0);
  const tab_handlechange = (event, value) => {
    setTabValue(value);
    if (value === 0) {
      setSelectedTab("Appreciation");
    } else if (value === 1) {
      setSelectedTab("Defense");
    } else if (value === 2) {
      setSelectedTab("Fanart");
    } else if (value === 3) {
      setSelectedTab("Fanfiction");
    }
  };
  const handleSelectTabChange = event => {
    setTabValue(event.target.value);
    if (event.target.value === 0) {
      setSelectedTab("Appreciation");
    } else if (event.target.value === 1) {
      setSelectedTab("Defense");
    } else if (event.target.value === 2) {
      setSelectedTab("Fanart");
    } else if (event.target.value === 3) {
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
    <div>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Oleo+Script"
          rel="stylesheet"
          type="text/css"
        />
        <title>Ron Weasley</title>
      </Head>
      <div className="root">
        <div className="main">
          <div className="main_overlay">
            <NavigationBar />
            <div className="landing">
              <p className="landing_big_heading">
                A Website dedicated to the most selfless Harry Potter Character.
              </p>
              <p className="landing_about">Some lines best describing Ron.</p>
              <Link to="landingContent" spy={true} smooth={true} duration={500}>
                <ScrollAnimation />
              </Link>
            </div>
          </div>
        </div>
        <Element name="landingContent">
          <div className="landing_content">
            <Container>
              <Paper elevation={24}>
                <div className="toolbar">
                  <Grid container>
                    <Grid container item xs={9} lg={10}>
                      <Hidden mdDown>
                        <Tabs
                          value={tab_value}
                          onChange={tab_handlechange}
                          indicatorColor="primary"
                          textColor="primary"
                          variant="scrollable"
                          scrollButtons="auto"
                        >
                          <Tab label="Appreciation"></Tab>
                          <Tab label="Defense"></Tab>
                          <Tab label="Fanart"></Tab>
                          <Tab label="Fanfiction"></Tab>
                        </Tabs>
                      </Hidden>
                      <Hidden lgUp>
                        <FormControl
                          variant="outlined"
                          className={classes.select}
                        >
                          <Select
                            value={tab_value}
                            onChange={handleSelectTabChange}
                          >
                            <MenuItem value={0}>Appereciation</MenuItem>
                            <MenuItem value={1}>Defense</MenuItem>
                            <MenuItem value={2}>Fanart</MenuItem>
                            <MenuItem value={3}>Fanfiction</MenuItem>
                          </Select>
                        </FormControl>
                      </Hidden>
                    </Grid>
                    <Grid container item xs={3} lg={2}>
                      <button
                        onClick={handleCreatePostOpen}
                        className="new_button"
                      >
                        NEW
                      </button>
                    </Grid>
                  </Grid>
                </div>
                <div className="landing_posts"></div>
              </Paper>
            </Container>
          </div>
        </Element>
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
      <style jsx>
        {`
          .root {
            min-height: 100vh;
            height: 100%;
          }
          .main {
            min-height: 100vh;
            height: 100%;
            background-image: url("https://i.imgur.com/IParGP1.jpg");
            background-repeat: no-repeat;
            background-size: contain;
          }
          .main_overlay {
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.75);
          }
          .landing {
            min-height: 92vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .landing_big_heading {
            color: #fff;
            font-family: "Oleo Script";
            font-size: 3rem;
            margin-bottom: 0.35em;
            font-weight: 400;
            padding: 8px;
          }
          .landing_about {
            color: #efefef;
            margin-bottom: 80px;
            font-size: 1.25rem;
            font-family: "Roboto";
            font-weight: 500;
            line-height: 1.6;
            padding: 8px;
          }
          .landing_content {
            padding: 40px 0 80px 0;
            background-image: linear-gradient(
              to top,
              #d5d4d0 0%,
              #d5d4d0 1%,
              #eeeeec 31%,
              #efeeec 75%,
              #e9e9e7 100%
            );
          }
          .toolbar {
            padding-top: 32px;
            min-height: 80px;
          }
          .new_button {
            margin-left: 16px;
            padding: 16px;
            background: none;
            cursor: pointer;
            border: none;
            font-family: "Roboto";
            border: 1px solid rgba(100, 100, 100, 0.5);
            border-radius: 4px;
          }
          .new_button:focus {
            outline: 0;
          }
          .landing_posts {
            min-height: calc(150vh - 80px);
            background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
          }
        `}
      </style>
      <Footer />
    </div>
  );
}

export default Index;
