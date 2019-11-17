import React from "react";
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  navigation: {
    height: "10vh",
    color: "#ffffff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    textTransform: "uppercase"
  },
  navigation_logo: {
    cursor: "pointer",
    height: "100%"
  },
  navigation_links: {
    listStyle: "none",
    display: "flex",
    height: "100%"
  },
  navigation_items: {
    display: "inline-blocks",
    cursor: "pointer",
    padding: "0 32px",
    "&:hover": {
      borderBottom: "1px solid red"
    }
  },
  navigation_logo_text: {
    lineHeight: "10vh",
    fontSize: "24px",
    fontFamily: "Shojumaru"
  },
  navigation_text: {
    lineHeight: "10vh",
    fontSize: "16px",
    fontFamily: "Capriola"
  }
});

function NavigationBar() {
  const classes = useStyles();

  return (
    <div className={classes.navigation}>
      <Container maxWidth="xl">
        <div className={classes.navigation}>
          <div className={classes.navigation_logo}>
            <p className={classes.navigation_logo_text}>King Weasley</p>
          </div>
          <Hidden mdDown>
            <ul className={classes.navigation_links}>
              <li className={classes.navigation_items}>
                <p className={classes.navigation_text}>Friendships</p>
              </li>
              <li className={classes.navigation_items}>
                <p className={classes.navigation_text}>Romione</p>
              </li>
              <li className={classes.navigation_items}>
                <p className={classes.navigation_text}>Fanon Ships</p>
              </li>
              <li className={classes.navigation_items}>
                <p className={classes.navigation_text}>Feedbacks</p>
              </li>
              <li className={classes.navigation_items}>
                <p className={classes.navigation_text}>Credits</p>
              </li>
            </ul>
          </Hidden>
        </div>
      </Container>
    </div>
  );
}

export default NavigationBar;
