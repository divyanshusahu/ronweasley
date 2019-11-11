import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "100vh",
    height: "100%"
  },
  navigation: {
    height: "10vh"
  },
  landing: {
    minHeight: "90vh"
  },
  landingGrids: {
    minHeight: "90vh"
  },
  landingGridsItems: {
    height: "90vh"
  },
  landingImage: {
    height: "100%",
    width: "100%",
    background: `url(${"https://i.imgur.com/IParGP1.jpg"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  },
  mainHeading: {
    fontFamily: "Oleo Script"
  },
  main: {
    minHeight: "100vh",
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      backgroundImage:
        "linear-gradient(90deg, rgba(254,244,225,1) 80%, rgba(255,255,255,1) 100%)"
    },
    [theme.breakpoints.up("sm")]: {
      backgroundImage:
        "linear-gradient(90deg, rgba(254,244,225,1) 45%, rgba(255,255,255,1) 50%, rgba(254, 244, 225) 100%)"
    }
  }
}));

function Landing() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.main}>
        <div className={classes.navigation}></div>
        <div className={classes.landing}>
          <Container maxWidth="xl">
            <Grid container className={classes.landingGrids}>
              <Grid
                container
                item
                xs={12}
                sm={6}
                className={classes.landingGridsItems}
              >
                <div className={classes.landingImage}></div>
              </Grid>
              <Grid
                container
                item
                xs={12}
                sm={6}
                className={classes.landingGridsItems}
                alignItems="center"
              >
                <Typography variant="h2" component="p" className={classes.mainHeading}>
                  "A website dedicated to the most selfless Harry Potter character."
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Landing;
