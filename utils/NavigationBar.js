import Head from "next/head";
import Link from "next/link";

import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";

function NavigationBar() {
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
    <div className="navigation">
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
              <p className="navigation_logo_text">King Weasley</p>
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
                >
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={250}>
                      <div className="popper_element">
                        <ul className="popper_list">
                          <li className="popper_list_items">
                            Golden Trio
                          </li>
                          <li className="popper_list_items">
                            Ron-Harry
                          </li>
                          <li className="popper_list_items">
                            Ron-Luna
                          </li>
                          <li className="popper_list_items">
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
                  <p className="navigation_text">Romione</p>
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
                >
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={250}>
                      <div className="popper_element">
                        <ul className="popper_list">
                          <li className="popper_list_items">
                            <span>Ron-Lavender</span>
                          </li>
                          <li className="popper_list_items">
                            <span>Ron-Harry</span>
                          </li>
                          <li className="popper_list_items">
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
        </div>
      </Container>
      <style jsx>
        {`
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
        `}
      </style>
    </div>
  );
}

export default NavigationBar;
