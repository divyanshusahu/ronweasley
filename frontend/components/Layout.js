import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import isEmpty from "is-empty";
import { motion } from "framer-motion";
import LazyLoad from "react-lazyload";

import { Row, Col, Card, Layout as AntLayout, List, Input } from "antd";

import NavigationBar from "./NavigationBar";
import HeroHeading from "./HeroHeading";
import DisplayPost from "./DisplayPost";
import DisplayFanart from "./DisplayFanart";
import Footer from "./Footer";

const AntHeader = AntLayout.Header;
const AntContent = AntLayout.Content;
const AntFooter = AntLayout.Footer;

function Layout(props) {
  const router = useRouter();
  let display;

  const variants = {
    initial: { scale: 0.9, opacity: 0 },
    enter: { scale: 1, opacity: 1, transition: { duration: 0.1 } },
    exit: { scale: 0.6, opacity: 0, transition: { duration: 0.1 } },
  };

  if (props.type === "fanart") {
    display = (
      <motion.div initial="initial" animate="enter" exit="exit">
        <List
          loading={props.loading}
          pagination={{
            current: parseInt(props.paginationpage)
              ? parseInt(props.paginationpage)
              : 1,
            pageSize: 24,
            hideOnSinglePage: true,
            showSizeChanger: false,
            onChange: (page) => {
              router.push({
                pathname: router.pathname,
                query: { tab: props.type, page: page },
              });
            },
          }}
          grid={{ gutter: 48, xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 3 }}
          dataSource={props.posts}
          renderItem={(p) => (
            <List.Item>
              <LazyLoad height={400} placeholder={<Card loading={true} />} once>
                <Link
                  href="/fanart/[post_type]/[post_id]"
                  as={`/fanart/${p.post_type["S"]}/${p.post_id["S"]}`}
                  scroll={false}
                >
                  <a>
                    <motion.div
                      whileHover={{
                        scale: 1.005,
                        boxShadow: "8px 14px 38px rgba(40, 40, 40, 0.2)",
                      }}
                      variants={variants}
                    >
                      <div
                        style={{
                          boxShadow: "0 6px 15px rgba(36, 37, 38, 0.08)",
                        }}
                      >
                        <DisplayFanart
                          inner={false}
                          bordered={true}
                          showActions={false}
                          is_layout={true}
                          key={p.post_id["S"]}
                          post_type={p.post_type["S"]}
                          post_id={p.post_id["S"]}
                          post_title={p.post_title["S"]}
                          post_author={p.post_author["S"]}
                          post_author_link={p.post_author_link["S"]}
                          post_date={p.post_date["S"]}
                          post_image={
                            isEmpty(p.post_image) ? null : p.post_image["L"]
                          }
                        />
                      </div>
                    </motion.div>
                  </a>
                </Link>
              </LazyLoad>
            </List.Item>
          )}
        />
      </motion.div>
    );
  } else {
    display = (
      <motion.div initial="initial" animate="enter" exit="exit">
        <List
          loading={props.loading}
          pagination={{
            current: parseInt(props.paginationpage)
              ? parseInt(props.paginationpage)
              : 1,
            pageSize: 10,
            hideOnSinglePage: true,
            showSizeChanger: false,
            onChange: (page) => {
              router.push({
                pathname: router.pathname,
                query: { tab: props.type, page: page },
              });
            },
          }}
          itemLayout="vertical"
          split={false}
          dataSource={props.posts}
          renderItem={(p) => (
            <List.Item>
              <LazyLoad height={320} placeholder={<Card loading={true} />} once>
                <Link
                  href="/post/[post_type]/[post_id]"
                  as={`/post/${p.post_type["S"]}/${p.post_id["S"]}`}
                  scroll={false}
                >
                  <a>
                    <motion.div
                      variants={variants}
                      whileHover={{
                        scale: 1.005,
                        boxShadow: "8px 14px 38px rgba(40, 40, 40, 0.2)",
                      }}
                    >
                      <div
                        style={{
                          maxHeight: 320,
                          overflow: "hidden",
                          marginBottom: 36,
                          backgroundColor: "#fff",
                          boxShadow: "0 6px 15px rgba(36, 37,38, 0.08)",
                        }}
                      >
                        <DisplayPost
                          inner={false}
                          bordered={false}
                          showActions={false}
                          key={p.post_id["S"]}
                          post_type={p.post_type["S"]}
                          post_id={p.post_id["S"]}
                          post_title={p.post_title["S"]}
                          post_author={p.post_author["S"]}
                          post_author_link={p.post_author_link["S"]}
                          post_date={p.post_date["S"]}
                          post_content={p.post_content["S"]}
                        />
                      </div>
                    </motion.div>
                  </a>
                </Link>
              </LazyLoad>
            </List.Item>
          )}
        />
      </motion.div>
    );
  }

  return (
    <div>
      <Head>
        <title>{props.title}</title>
      </Head>
      <div>
        <AntLayout>
          <AntHeader
            style={{
              padding: 0,
              background: "transparent",
              zIndex: 10,
            }}
          >
            <NavigationBar dark={true} />
          </AntHeader>
          <AntContent>
            <div className="main">
              <div className="main_overlay">
                <div className="hero">
                  <HeroHeading
                    heading_text={props.main_heading}
                    description_text={props.about_heading}
                  />
                </div>
              </div>
            </div>
            <div className="page_content">
              <Row>
                <Col
                  xs={{ span: 22, offset: 1 }}
                  md={{ span: 20, offset: 2 }}
                  lg={{ span: 18, offset: 3 }}
                  xxl={{ span: 16, offset: 4 }}
                >
                  <Card
                    tabList={props.tabList}
                    activeTabKey={props.activeTabKey}
                    onTabChange={(key) => {
                      props.onTabChange(key);
                    }}
                    tabBarExtraContent={props.tabBarExtraContent}
                    bodyStyle={{
                      paddingLeft: 8,
                      paddingRight: 8,
                      paddingBottom: 0,
                      paddingTop: 16,
                      backgroundColor: "rgb(246, 246, 246)",
                    }}
                    headStyle={{
                      backgroundColor: "rgb(246, 246, 246)",
                    }}
                    bordered={false}
                  >
                    <div className="searchbar">
                      <Row>
                        <Col
                          xs={{ span: 24, offset: 0 }}
                          md={{ span: 24, offset: 0 }}
                          lg={{ span: 8, offset: 16 }}
                          xxl={{ span: 6, offset: 18 }}
                        >
                          <Input.Search
                            placeholder="Search"
                            size="large"
                            value={props.searchvalue}
                            onChange={(event) =>
                              props.searchbar(event.target.value)
                            }
                          />
                        </Col>
                      </Row>
                    </div>
                    <div className="page_posts">{display}</div>
                  </Card>
                </Col>
              </Row>
            </div>
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
          .page_content {
            padding: 64px 0 40px 0;
            background-color: rgb(246, 246, 246);
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
          .searchbar {
            margin-bottom: 16px;
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
