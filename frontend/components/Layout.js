import Head from "next/head";
import Link from "next/link";

import isEmpty from "is-empty";
import AOS from "aos";

import { Row, Col, Card, Layout as AntLayout, List } from "antd";

import { Link as RSLink, Element } from "react-scroll";

import NavigationBar from "./NavigationBar";
import ScrollAnimation from "./ScrollAnimation";
import DisplayPost from "./DisplayPost";
import DisplayFanart from "./DisplayFanart";
import Footer from "./Footer";

const AntHeader = AntLayout.Header;
const AntContent = AntLayout.Content;
const AntFooter = AntLayout.Footer;

function Layout(props) {
  if (typeof window !== "undefined") {
    AOS.init();
  }
  let display;

  if (props.type === "fanart") {
    display = (
      <List
        grid={{ gutter: 48, xs: 1, sm: 1, md: 2, lg: 3, xl: 3 }}
        dataSource={props.posts}
        renderItem={p => (
          <List.Item>
            <Link
              href="/fanart/[post_type]/[post_id]"
              as={`/fanart/${p.post_type["S"]}/${p.post_id["S"]}`}
            >
              <a>
                <DisplayFanart
                  inner={false}
                  bordered={true}
                  showActions={false}
                  key={p.post_id["S"]}
                  post_type={p.post_type["S"]}
                  post_id={p.post_id["S"]}
                  post_title={p.post_title["S"]}
                  post_author={p.post_author["S"]}
                  post_author_link={p.post_author_link["S"]}
                  post_date={p.post_date["S"]}
                  post_image={isEmpty(p.post_image) ? null : p.post_image["L"]}
                />
              </a>
            </Link>
          </List.Item>
        )}
      />
    );
  } else {
    display = (
      <List
        itemLayout="vertical"
        split={false}
        dataSource={props.posts}
        renderItem={p => (
          <List.Item data-aos="zoom-in">
            <DisplayPost
              inner={false}
              bordered={true}
              showActions={false}
              key={p.post_id["S"]}
              post_type={p.post_type["S"]}
              post_id={p.post_id["S"]}
              post_title={p.post_title["S"]}
              post_author={p.post_author["S"]}
              post_author_link={p.post_author_link["S"]}
              post_date={p.post_date["S"]}
              post_content={
                isEmpty(p.post_content) ? null : p.post_content["S"]
              }
              post_image={isEmpty(p.post_image) ? null : p.post_image["L"]}
            />
          </List.Item>
        )}
      />
    );
  }

  return (
    <div>
      <Head>
        <title>{props.title}</title>
        <link
          href="https://fonts.googleapis.com/css?family=Oleo+Script"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css"
          rel="stylesheet"
        ></link>
      </Head>
      <div>
        <AntLayout>
          <AntHeader
            style={{
              padding: 0,
              background: "transparent",
              zIndex: 10
            }}
          >
            <NavigationBar dark={true} />
          </AntHeader>
          <AntContent>
            <div className="main">
              <div className="main_overlay">
                <div className="hero">
                  <p className="hero_big_heading">{props.main_heading}</p>
                  <p className="hero_about_heading">{props.about_heading}</p>
                  <RSLink
                    to="pageContent"
                    spy={true}
                    smooth={true}
                    duration={500}
                  >
                    <ScrollAnimation />
                  </RSLink>
                </div>
              </div>
            </div>
            <Element name="pageContent">
              <div className="page_content">
                <Row>
                  <Col
                    xs={{ span: 22, offset: 1 }}
                    md={{ span: 20, offset: 2 }}
                    lg={{ span: 18, offset: 3 }}
                    xl={{ span: 16, offset: 4 }}
                  >
                    <Card
                      tabList={props.tabList}
                      activeTabKey={props.activeTabKey}
                      onTabChange={key => {
                        props.onTabChange(key);
                      }}
                      tabBarExtraContent={props.tabBarExtraContent}
                      bodyStyle={{
                        paddingLeft: 8,
                        paddingRight: 8,
                        backgroundColor: "rgb(244, 248, 251)"
                      }}
                      headStyle={{
                        backgroundColor: "rgb(244, 248, 251)"
                      }}
                      bordered={false}
                    >
                      <div className="page_posts">{display}</div>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Element>
          </AntContent>
          <AntFooter style={{ padding: 0 }}>
            <Footer />
          </AntFooter>
        </AntLayout>
      </div>
      <style jsx>
        {`
          .main {
            min-height: 60vh;
            height: 100%;
            width: 100%;
            background-image: url(${props.landscape});
            background-repeat: no-repeat;
            background-size: 100% 100%;
            margin-top: -64px;
          }
          .main_overlay {
            width: 100%;
            height: 60vh;
            background-color: rgba(32, 32, 32, 0.75);
          }
          .hero {
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .hero_big_heading {
            color: #fff;
            font-family: "Oleo Script";
            font-size: 3rem;
            margin-bottom: 0.35em;
            font-weight: 400;
            padding: 8px;
          }
          .hero_about_heading {
            color: #efefef;
            font-size: 1.25rem;
            font-family: "Roboto";
            font-weight: 500;
            line-height: 1.6;
            padding: 8px;
          }
          .page_content {
            padding: 80px 0;
            background-color: rgb(244, 248, 251);
          }
          .toolbar {
            padding: 32px 16px 0 16px;
            min-height: 80px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          }
          .page_posts {
            min-height: 160px;
          }
          @media only screen and (orientation: portrait) {
            .main {
              background-image: url(${props.portrait});
            }
          }
          @media only screen and (max-width: 600px) {
            .hero_big_heading {
              font-size: 2rem;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Layout;
