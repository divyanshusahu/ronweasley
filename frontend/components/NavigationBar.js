import Head from "next/head";
import Link from "next/link";

import clsx from "clsx";

import { Row, Col, Icon, Drawer, Menu, Dropdown } from "antd";

const { SubMenu, Item } = Menu;

function NavigationBar(props) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const FriendshipsMenu = (
    <ul style={{ listStyle: "none", backgroundColor: "#fff" }}>
      <li>
        <Link href="/friendships/golden_trio">
          <a>
            <p
              style={{
                fontSize: "16px",
                lineHeight: "64px",
                fontFamily: "Capriola",
                color: "#000",
                marginBottom: 0,
                border: "1px solid rgba(128,128,128,0.25)",
                borderTop: "none"
              }}
            >
              Golden Trio
            </p>
          </a>
        </Link>
      </li>
      <li>
        <Link href="/friendships/weasley_family">
          <a>
            <p
              style={{
                fontSize: "16px",
                lineHeight: "64px",
                fontFamily: "Capriola",
                color: "#000",
                marginBottom: 0,
                border: "1px solid rgba(128,128,128,0.25)",
                borderTop: "none"
              }}
            >
              Weasley Family
            </p>
          </a>
        </Link>
      </li>
    </ul>
  );

  const FanonshipMenu = (
    <ul style={{ listStyle: "none", backgroundColor: "#fff" }}>
      <li>
        <Link href="/fanon_ships/ron_and_lavender">
          <a>
            <p
              style={{
                fontSize: "16px",
                lineHeight: "64px",
                fontFamily: "Capriola",
                color: "#000",
                marginBottom: 0,
                border: "1px solid rgba(128,128,128,0.25)",
                borderTop: "none"
              }}
            >
              Ron-Lavender
            </p>
          </a>
        </Link>
      </li>
      <li>
        <Link href="/fanon_ships/ron_and_harry">
          <a>
            <p
              style={{
                fontSize: "16px",
                lineHeight: "64px",
                fontFamily: "Capriola",
                color: "#000",
                marginBottom: 0,
                border: "1px solid rgba(128,128,128,0.25)",
                borderTop: "none"
              }}
            >
              Ron-Harry
            </p>
          </a>
        </Link>
      </li>
      <li>
        <Link href="/fanon_ships/ron_and_luna">
          <a>
            <p
              style={{
                fontSize: "16px",
                lineHeight: "64px",
                fontFamily: "Capriola",
                color: "#000",
                marginBottom: 0,
                border: "1px solid rgba(128,128,128,0.25)",
                borderTop: "none"
              }}
            >
              Ron-Luna
            </p>
          </a>
        </Link>
      </li>
    </ul>
  );

  return (
    <div
      className={clsx({
        dark: props.dark,
        light: props.light
      })}
    >
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
      <div>
        <Row>
          <Col xs={{ span: 22, offset: 1 }}>
            <div className="navigation">
              <div>
                <Link href="/">
                  <a>
                    <p className="navigation_logo_text">King Weasley</p>
                  </a>
                </Link>
              </div>
              <div>
                <div className="xl_up">
                  <ul className="navigation_links">
                    <li className="navigation_item">
                      <Dropdown
                        placement="bottomCenter"
                        overlay={FriendshipsMenu}
                        trigger={["hover", "click"]}
                        overlayStyle={{ width: "150px" }}
                        getPopupContainer={() =>
                          document.getElementsByClassName("navigation_item")[0]
                        }
                      >
                        <p className="navigation_text">Friendships</p>
                      </Dropdown>
                    </li>
                    <li className="navigation_item">
                      <Link href="/romione">
                        <a>
                          <p className="navigation_text">Romione</p>
                        </a>
                      </Link>
                    </li>
                    <li className="navigation_item">
                      <Dropdown
                        placement="bottomCenter"
                        overlay={FanonshipMenu}
                        trigger={["hover", "click"]}
                        overlayStyle={{ width: "150px" }}
                        getPopupContainer={() =>
                          document.getElementsByClassName("navigation_item")[2]
                        }
                      >
                        <p className="navigation_text">Fanon Ships</p>
                      </Dropdown>
                    </li>
                    <li className="navigation_item">
                      <Link href="/suggestions">
                        <a>
                          <p className="navigation_text">Suggestions</p>
                        </a>
                      </Link>
                    </li>
                    <li className="navigation_item">
                      <Link href="/credits">
                        <a>
                          <p className="navigation_text">Credits</p>
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="xl_down">
                  <Icon
                    type="menu"
                    style={{ fontSize: "20px" }}
                    onClick={handleDrawerOpen}
                  />
                  <Drawer
                    title={
                      <Link href="/">
                        <a>King Weasley</a>
                      </Link>
                    }
                    placement="left"
                    visible={drawerOpen}
                    onClose={handleDrawerClose}
                    destroyOnClose
                  >
                    <Menu mode="inline" style={{ border: "none" }}>
                      <SubMenu title="Friendships">
                        <Item>
                          <Link href="/friendships/golden_trio">
                            <a>Golden Trio</a>
                          </Link>
                        </Item>
                        <Item>
                          <Link href="/friendships/weasley_family">
                            <a>Weasley Family</a>
                          </Link>
                        </Item>
                      </SubMenu>
                      <Item>
                        <Link href="/romione">
                          <a>Romione</a>
                        </Link>
                      </Item>
                      <SubMenu title="Fanon Ships">
                        <Item>
                          <Link href="/fanon_ships/ron_and_lavender">
                            <a>Ron-Lavender</a>
                          </Link>
                        </Item>
                        <Item>
                          <Link href="/fanon_ships/ron_and_harry">
                            <a>Ron-Harry</a>
                          </Link>
                        </Item>
                        <Item>
                          <Link href="/fanon_ships/ron_and_luna">
                            <a>Ron-Luna</a>
                          </Link>
                        </Item>
                      </SubMenu>
                      <Item>
                        <Link href="/suggestions">
                          <a>Suggestions</a>
                        </Link>
                      </Item>
                      <Item>
                        <Link href="/credits">
                          <a>Credits</a>
                        </Link>
                      </Item>
                    </Menu>
                  </Drawer>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <style jsx>
        {`
          @media only screen and (max-width: 1199px) {
            .xl_down {
              display: block;
            }
            .xl_up {
              display: none;
            }
          }
          @media only screen and (min-width: 1200px) {
            .xl_down {
              display: none;
            }
            .xl_up {
              display: block;
            }
          }
          a {
            text-decoration: none;
            color: inherit;
            transition: none;
          }
          a:hover {
            text-decoration: none;
            color: inherit;
          }
          .dark {
            color: #ffffff;
          }
          .light {
            background-color: rgba(255, 255, 255, 1);
            color: #000000;
            box-shadow: 0 2px 4px 0 rgba(128, 128, 128, 1);
          }
          .navigation {
            height: 64px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            text-transform: uppercase;
          }
          .navigation_logo_text {
            line-height: 64px;
            font-size: 24px;
            font-family: "Shojumaru";
            margin-bottom: 0;
          }
          .navigation_links {
            list-style: none;
            display: flex;
            margin-bottom: 0;
          }
          .navigation_item {
            cursor: pointer;
            width: 150px;
            text-align: center;
            transition: 0.5s;
          }
          .navigation_item:hover {
            color: #000;
            background-color: #fff;
          }
          .navigation_text {
            line-height: 64px;
            font-size: 16px;
            font-family: "Capriola";
            margin-bottom: 0;
          }
        `}
      </style>
    </div>
  );
}

export default NavigationBar;
