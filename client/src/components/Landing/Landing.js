import React from "react";
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
import { makeStyles } from "@material-ui/core/styles";

import NavigationBar from "../Navigation/NavigationBar";

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "100vh",
    height: "100%"
  },
  main: {
    minHeight: "100vh",
    height: "100%",
    /*[theme.breakpoints.down("lg")]: {
      backgroundImage:
        "linear-gradient(90deg, rgba(254,244,225,1) 80%, rgba(255,255,255,1) 100%)"
    },
    [theme.breakpoints.up("lg")]: {
      backgroundImage:
        "linear-gradient(90deg, rgba(254,244,225,1) 20%, rgba(255,255,255,1) 40%, rgba(254, 244, 225) 100%)"
    }*/
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
  landing_content: {
    padding: "80px 0",
    minHeight: "100vh",
    backgroundImage: "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)"
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

  const [tab_value, setTabValue] = React.useState(0);
  const tab_handlechange = (event, value) => {
    setTabValue(value);
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
              color="secondary"
              gutterBottom
            >
              A Website dedicated to the most selfless Harry Potter Character.
            </Typography>
            <Typography variant="h6" component="p">
              Awesome Ron stuffs
            </Typography>
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
                    <Tab label="Defence"></Tab>
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
    </div>
  );
}

export default Landing;
