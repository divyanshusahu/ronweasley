import React from "react";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = new makeStyles(theme => ({
  "@global": {
    footer: {
      padding: theme.spacing(2),
      backgroundColor: "#eaeaea"
    }
  },
  icon: {
    position: "relative",
    top: "5px"
  }
}));

function Footer() {
  const classes = useStyles();

  return (
    <footer>
      <Container maxWidth="sm">
        <Typography variant="body1" component="p" align="center">
          Made with{" "}
          <Icon color="error" fontSize="small" className={classes.icon}>
            favorite
          </Icon>{" "}
          by{" "}
          <a
            href="https://github.com/divyanshusahu"
            target="_blank"
            rel="noopener noreferrer"
          >
            Divyanshu
          </a>
          .
        </Typography>
      </Container>
    </footer>
  );
}

export default Footer;
