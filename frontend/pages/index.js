import Head from "next/head";
import Link from "next/link";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Hidden from "@material-ui/core/Hidden";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

import { Link as RSLink, Element } from "react-scroll";

import NavigationBar from "../utils/NavigationBar";
import ScrollAnimation from "../utils/ScrollAnimation";
import Footer from "../utils/Footer";

const useStyles = new makeStyles(theme => ({
  select: {
    marginLeft: theme.spacing(2),
    width: "200px"
  }
}));

function Index() {
  const classes = useStyles();

  const [selectedTab, setSelectedTab] = React.useState("appericiation");
  const [tab_value, setTabValue] = React.useState(0);
  const tab_handlechange = (event, value) => {
    setTabValue(value);
    if (value === 0) {
      setSelectedTab("appreciation");
    } else if (value === 1) {
      setSelectedTab("defense");
    } else if (value === 2) {
      setSelectedTab("fanart");
    } else if (value === 3) {
      setSelectedTab("fanfiction");
    }
  };
  const handleSelectTabChange = event => {
    setTabValue(event.target.value);
    if (event.target.value === 0) {
      setSelectedTab("appreciation");
    } else if (event.target.value === 1) {
      setSelectedTab("defense");
    } else if (event.target.value === 2) {
      setSelectedTab("fanart");
    } else if (event.target.value === 3) {
      setSelectedTab("fanfiction");
    }
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
              <RSLink
                to="landingContent"
                spy={true}
                smooth={true}
                duration={500}
              >
                <ScrollAnimation />
              </RSLink>
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
                      {tab_value === 0 || tab_value === 1 ? (
                        <Link
                          href="/new_post/[type]"
                          as={`new_post/ron-weasley-${selectedTab}`}
                        >
                          <button className="new_button">NEW POST</button>
                        </Link>
                      ) : (
                        <button className="new_button">NEW POST</button>
                      )}
                    </Grid>
                  </Grid>
                </div>
                <div className="landing_posts"></div>
              </Paper>
            </Container>
          </div>
        </Element>
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
            background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
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

export default Index;
