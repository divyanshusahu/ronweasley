import Head from "next/head";
import Link from "next/link";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Hidden from "@material-ui/core/Hidden";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { Link as RSLink, Element } from "react-scroll";

import NavigationBar from "../utils/NavigationBar";
import ScrollAnimation from "../utils/ScrollAnimation";
import Footer from "../utils/Footer";

function Romione() {
  const [tab_value, setTabValue] = React.useState(0);
  const tab_handlechange = (event, value) => {
    setTabValue(value);
  };

  const handleSelectTabChange = event => {
    setTabValue(event.target.value);
  };

  return (
    <div>
      <Head>
        <title>Romione</title>
        <link
          href="https://fonts.googleapis.com/css?family=Oleo+Script"
          rel="stylesheet"
          type="text/css"
        />
      </Head>
      <div className="root">
        <div className="main">
          <div className="main_overlay">
            <NavigationBar />
            <div className="page">
              <p className="page_big_heading">
                Most celebrated Harry Potter canon couples.
              </p>
              <p className="page_about">Some lines best describing Romione.</p>
              <RSLink to="pageContent" spy={true} smooth={true} duration={500}>
                <ScrollAnimation />
              </RSLink>
            </div>
          </div>
        </div>
        <Element name="pageContent">
          <div className="page_content">
            <Container>
              <Paper className="page_content_paper" elevation={24}>
                <div className="toolbar">
                  <div>
                    <Hidden smDown>
                      <Tabs
                        value={tab_value}
                        onChange={tab_handlechange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                      >
                        <Tab label="Appreciation"></Tab>
                        <Tab label="Fanart"></Tab>
                        <Tab label="Fanfiction"></Tab>
                      </Tabs>
                    </Hidden>
                    <Hidden mdUp>
                      <FormControl variant="outlined">
                        <Select
                          value={tab_value}
                          onChange={handleSelectTabChange}
                        >
                          <MenuItem value={0}>Appreciation</MenuItem>
                          <MenuItem value={1}>Fanart</MenuItem>
                          <MenuItem value={2}>Fanfiction</MenuItem>
                        </Select>
                      </FormControl>
                    </Hidden>
                  </div>
                  <div>
                    {tab_value === 0 ? (
                      <Link
                        href="/new_post/[type]"
                        as={`new_post/romione_appreciation`}
                      >
                        <a>
                          <button className="new_button">NEW POST</button>
                        </a>
                      </Link>
                    ) : (
                      <button className="new_button">NEW POST</button>
                    )}
                  </div>
                </div>
                <div className="page_posts"></div>
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
            background-image: url("https://i.imgur.com/5XFq6a3.jpg");
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
            padding: 8px;
          }
          .page_about {
            color: #efefef;
            font-size: 1.25rem;
            font-family: "Roboto";
            font-weight: 500;
            line-height: 1.6;
            padding: 8px;
          }
          .page_content {
            padding: 40px 0 80px 0;
            background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
          }
          .page_content_paper {
            min-height: 150vh;
          }
          .toolbar {
            padding: 32px 16px 0 16px;
            min-height: 80px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
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
          @media only screen and (orientation: portrait) {
            .main {
              background-image: url("https://i.imgur.com/AKuRxbB.jpg");
              background-repeat: no-repeat;
              background-size: 100% 100%;
            }
          }
        `}
      </style>
      <Footer />
    </div>
  );
}

export default Romione;
