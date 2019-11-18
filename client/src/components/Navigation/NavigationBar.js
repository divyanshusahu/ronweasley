import React from "react";
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
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
    transition: "0.25s",
    "&:hover": {
      color: "#000",
      backgroundColor: "#fff",
      borderBottom: "1px solid rgba(100, 100, 100, 0.25)"
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
  popper_element: {
    width: "180px",
    backgroundColor: "#fff",
    textAlign: "left"
  },
  popper_list: {
    listStyle: "none"
  },
  popper_list_items: {
    fontSize: "16px",
    padding: "16px",
    fontFamily: "Capriola",
    borderBottom: "1px solid rgba(100, 100, 100, 0.25)"
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

  const [fanonshipElement, setFanonshipElement] = React.useState(null);
  const handleFanonshipOpen = event => {
    setFanonshipElement(event.currentTarget);
  };
  const handleFanonshipClose = () => {
    setFanonshipElement(null);
  };
  const fanonship = Boolean(fanonshipElement);

  return (
    <div className={classes.navigation}>
      <Container maxWidth="xl">
        <div className={classes.navigation}>
          <div className={classes.navigation_logo}>
            <p className={classes.navigation_logo_text}>King Weasley</p>
          </div>
          <Hidden mdDown>
            <ul className={classes.navigation_links}>
              <li
                className={classes.navigation_items}
                aria-owns={friendship ? "friendship-popper" : undefined}
                aria-haspopup="true"
                onMouseEnter={handleFriendshipOpen}
                onMouseLeave={handleFriendshipClose}
              >
                <p className={classes.navigation_text}>Friendships</p>
                <Popper
                  id="friendship-popper"
                  open={friendship}
                  anchorEl={friendshipElement}
                  disablePortal={true}
                  placement="bottom-start"
                  transition
                >
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={250}>
                      <div className={classes.popper_element}>
                        <ul className={classes.popper_list}>
                          <li className={classes.popper_list_items}>
                            Golden Trio
                          </li>
                          <li className={classes.popper_list_items}>
                            Ron-Harry
                          </li>
                          <li className={classes.popper_list_items}>
                            Ron-Luna
                          </li>
                          <li className={classes.popper_list_items}>
                            Weasley Family
                          </li>
                        </ul>
                      </div>
                    </Fade>
                  )}
                </Popper>
              </li>
              <li className={classes.navigation_items}>
                <p className={classes.navigation_text}>Romione</p>
              </li>
              <li
                className={classes.navigation_items}
                aria-owns={fanonship ? "fanonship-popper" : undefined}
                aria-haspopup="true"
                onMouseEnter={handleFanonshipOpen}
                onMouseLeave={handleFanonshipClose}
              >
                <p className={classes.navigation_text}>Fanon Ships</p>
                <Popper
                  id="fanonship-popper"
                  open={fanonship}
                  anchorEl={fanonshipElement}
                  disablePortal={true}
                  placement="bottom-start"
                  transition
                >
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={250}>
                      <div className={classes.popper_element}>
                        <ul className={classes.popper_list}>
                          <li className={classes.popper_list_items}>
                            <span>Ron-Lavender</span>
                          </li>
                          <li className={classes.popper_list_items}>
                            <span>Ron-Harry</span>
                          </li>
                          <li className={classes.popper_list_items}>
                            <span>Ron-Luna</span>
                          </li>
                        </ul>
                      </div>
                    </Fade>
                  )}
                </Popper>
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
