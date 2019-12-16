import Head from "next/head";
import Link from "next/link";

import clsx from "clsx";

import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import Icon from "@material-ui/core/Icon";
import Drawer from "@material-ui/core/Drawer";

function NavigationBar(props) {
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

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const [nestedFriendships, setNestedFriendships] = React.useState(true);
  const [nestedFanonShips, setNestedFanonShips] = React.useState(true);

  const handleNestedFunction = type => {
    if (type === "fs") {
      setNestedFriendships(!nestedFriendships);
    } else if (type === "fss") {
      setNestedFanonShips(!nestedFanonShips);
    }
  };

  return (
    <div className={clsx({ root: props.dark })}>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Capriola"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Shojumaru"
          rel="stylesheet"
        />
      </Head>
      <Container maxWidth="xl">
        <div className="navigation">
          <div className="navigation_logo">
            <Link href="/">
              <a><p className="navigation_logo_text">King Weasley</p></a>
            </Link>
          </div>
          <Hidden mdDown>
            <ul className="navigation_links">
              <li
                className="navigation_items"
                aria-owns={friendship ? "friendship-popper" : undefined}
                aria-haspopup="true"
                onMouseEnter={handleFriendshipOpen}
                onMouseLeave={handleFriendshipClose}
              >
                <p className="navigation_text">Friendships</p>
                <Popper
                  id="friendship-popper"
                  open={friendship}
                  anchorEl={friendshipElement}
                  disablePortal={true}
                  placement="bottom-start"
                  transition
                  style={{zIndex: "1300"}}
                >
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={250}>
                      <div className="popper_element">
                        <ul className="popper_list">
                          <li
                            className={clsx({
                              popper_list_items: true,
                              custom_borders: props.dark
                            })}
                          >
                            Golden Trio
                          </li>
                          <li
                            className={clsx({
                              popper_list_items: true,
                              custom_borders: props.dark
                            })}
                          >
                            Weasley Family
                          </li>
                        </ul>
                      </div>
                    </Fade>
                  )}
                </Popper>
              </li>
              <li className="navigation_items">
                <Link href="/romione">
                  <a><p className="navigation_text">Romione</p></a>
                </Link>
              </li>
              <li
                className="navigation_items"
                aria-owns={fanonship ? "fanonship-popper" : undefined}
                aria-haspopup="true"
                onMouseEnter={handleFanonshipOpen}
                onMouseLeave={handleFanonshipClose}
              >
                <p className="navigation_text">Fanon Ships</p>
                <Popper
                  id="fanonship-popper"
                  open={fanonship}
                  anchorEl={fanonshipElement}
                  disablePortal={true}
                  placement="bottom-start"
                  transition
                  style={{zIndex: "1300"}}
                >
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={250}>
                      <div className="popper_element">
                        <ul className="popper_list">
                          <li
                            className={clsx({
                              popper_list_items: true,
                              custom_borders: props.dark
                            })}
                          >
                            <span>Ron-Lavender</span>
                          </li>
                          <li
                            className={clsx({
                              popper_list_items: true,
                              custom_borders: props.dark
                            })}
                          >
                            <span>Ron-Harry</span>
                          </li>
                          <li
                            className={clsx({
                              popper_list_items: true,
                              custom_borders: props.dark
                            })}
                          >
                            <span>Ron-Luna</span>
                          </li>
                        </ul>
                      </div>
                    </Fade>
                  )}
                </Popper>
              </li>
              <li className="navigation_items">
                <p className="navigation_text">Feedbacks</p>
              </li>
              <li className="navigation_items">
                <p className="navigation_text">Credits</p>
              </li>
            </ul>
          </Hidden>
          <Hidden lgUp>
            <Icon fontSize="large" onClick={handleDrawerOpen}>
              menu
            </Icon>
            <Drawer open={drawerOpen} onClose={handleDrawerClose}>
              <div className="drawer">
                <div className="drawer_main">
                  <Link href="/">
                    <a><p className="drawer_heading">King Weasley</p></a>
                  </Link>
                  <Icon onClick={handleDrawerClose}>close</Icon>
                </div>
                <ul>
                  <li
                    onClick={() => handleNestedFunction("fs")}
                    className="drawer_list_items nested_list"
                  >
                    <span>Friendships</span>
                    {nestedFriendships ? (
                      <Icon>expand_more</Icon>
                    ) : (
                      <Icon>expand_less</Icon>
                    )}
                  </li>
                  <ul className={clsx({ hidden_class: nestedFriendships })}>
                    <li className="drawer_list_items nested_list_items">
                      Golden Trio
                    </li>
                    <li className="drawer_list_items nested_list_items">
                      Weasley Family
                    </li>
                  </ul>
                  <Link href="/romione">
                    <a><li className="drawer_list_items">Romione</li></a>
                  </Link>
                  <li
                    onClick={() => handleNestedFunction("fss")}
                    className="drawer_list_items nested_list"
                  >
                    <span>Fanon Ships</span>
                    {nestedFanonShips ? (
                      <Icon>expand_more</Icon>
                    ) : (
                      <Icon>expand_less</Icon>
                    )}
                  </li>
                  <ul className={clsx({ hidden_class: nestedFanonShips })}>
                    <li className="drawer_list_items nested_list_items">
                      Ron-Lavender
                    </li>
                    <li className="drawer_list_items nested_list_items">
                      Ron-Harry
                    </li>
                    <li className="drawer_list_items nested_list_items">
                      Ron-Luna
                    </li>
                  </ul>
                  <li className="drawer_list_items">Feedbacks</li>
                  <li className="drawer_list_items">Credits</li>
                </ul>
              </div>
            </Drawer>
          </Hidden>
        </div>
      </Container>
      <style jsx>
        {`
          a {
            color: inherit;
            text-decoration: none;
          }
          .root {
            background-color: rgba(0, 0, 0, 0.75);
          }
          .navigation {
            height: 8vh;
            color: #ffffff;
            display: flex;
            justify-content: space-between;
            align-items: center;
            text-transform: uppercase;
          }
          .navigation_logo {
            cursor: pointer;
            height: 100%;
          }
          .navigation_links {
            list-style: none;
            display: flex;
            height: 100%;
          }
          .navigation_items {
            cursor: pointer;
            width: 180px;
            text-align: center;
            transition: 0.25s;
          }
          .navigation_items:hover {
            color: #000;
            background-color: #fff;
            border-bottom: 1px solid rgba(100, 100, 100, 0.25);
          }
          .navigation_logo_text {
            line-height: 8vh;
            font-size: 24px;
            font-family: "Shojumaru";
          }
          .navigation_text {
            line-height: 8vh;
            font-size: 16px;
            font-family: "Capriola";
          }
          .popper_element {
            width: 180px;
            background-color: #fff;
            text-align: left;
          }
          .popper_list {
            list-style: none;
          }
          .popper_list_items {
            font-size: 16px;
            padding: 16px;
            font-family: "Capriola";
            border-bottom: 1px solid rgba(100, 100, 100, 0.25);
          }
          .custom_borders {
            border-left: 1px solid rgba(100, 100, 100, 0.25);
            border-right: 1px solid rgba(100, 100, 100, 0.25);
          }
          .drawer {
            width: 80vw;
            min-height: 100%;
            background-image: linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%);
            text-transform: uppercase;
            font-family: "Capriola";
          }
          .hidden_class {
            display: none;
          }
          .drawer_main {
            width: 100%;
            height: 80px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 8px;
            border-bottom: 1px solid rgba(100, 100, 100, 0.25);
          }
          .drawer_heading {
            font-size: 24px;
          }
          .drawer_list_items {
            padding: 12px;
          }
          .nested_list {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .nested_list_items {
            padding-left: 36px;
          }
        `}
      </style>
    </div>
  );
}

export default NavigationBar;
