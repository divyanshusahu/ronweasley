import React from "react";
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import Popover from "@material-ui/core/Popover";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  navigation: {
    height: "8vh",
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
    cursor: "pointer",
    width: "180px",
    textAlign: "center",
    "&:hover": {
      color: "#000",
      backgroundColor: "#fff"
    }
  },
  navigation_logo_text: {
    lineHeight: "8vh",
    fontSize: "24px",
    fontFamily: "Shojumaru"
  },
  navigation_text: {
    lineHeight: "8vh",
    fontSize: "16px",
    fontFamily: "Capriola"
  },
  popover: {
    pointerEvents: "none"
  },
  popover_paper: {
    borderRadius: "0",
    borderTop: "1px solid rgba(100,100,100,0.25)"
  },
  popover_element: {
    width: "180px",
    padding: "8px 16px"
  },
  popover_list: {
    listStyle: "none"
  },
  popover_list_items: {
    fontSize: "16px",
    padding: "4px"
  }
});

function NavigationBar() {
  const classes = useStyles();

  const [friendshipElement, setFriendshipElement] = React.useState(null);
  const handleFriendshipOpen = event => {
    setFriendshipElement(event.currentTarget);
  };
  const handleFriendshipClose = () => {
    setFriendshipElement(null);
  };
  const friendship = Boolean(friendshipElement);
  const check = () => {
    console.log("check");
  }

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
                <p
                  className={classes.navigation_text}
                  aria-owns={friendship ? "friendship-popover" : undefined}
                  aria-haspopup="true"
                  //onMouseEnter={handleFriendshipOpen}
                  //onMouseLeave={handleFriendshipClose}
                  onClick={handleFriendshipOpen}
                >
                  Friendships
                </p>
                <Popover
                  id="friendship-popover"
                  className={classes.popover}
                  classes={{
                    paper: classes.popover_paper
                  }}
                  open={friendship}
                  anchorEl={friendshipElement}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left"
                  }}
                  onClose={handleFriendshipClose}
                  elevation={0}
                  disableRestoreFocus
                >
                  <div className={classes.popover_element}>
                    <ul className={classes.popover_list}>
                      <li className={classes.popover_list_items}>
                        Golden Trio
                      </li>
                      <li className={classes.popover_list_items}>Ron-Harry</li>
                      <li className={classes.popover_list_items}>Ron-Luna</li>
                      <li className={classes.popover_list_items}>
                        Weasley Family
                      </li>
                    </ul>
                  </div>
                </Popover>
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
