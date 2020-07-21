import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import isEmpty from "is-empty";
import { motion } from "framer-motion";
import LazyLoad from "react-lazyload";

import { Row, Col, Card, Layout as AntLayout, List, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import NavigationBar from "./NavigationBar";
import WallCarousel from "./WallCarousel";
import Footer from "./Footer";

const DisplayPost = dynamic(() => import("./DisplayPost"));
const DisplayFanart = dynamic(() => import("./DisplayFanart"));

const AntHeader = AntLayout.Header;
const AntContent = AntLayout.Content;
const AntFooter = AntLayout.Footer;

function Layout(props) {
  const router = useRouter();
  let display;

  if (props.type === "fanart") {
    display = (
      <List
        loading={false}
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
              >
                <a>
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                    }}
                  >
                    <div
                      style={{
                        boxShadow: "0 5px 20px rgba(185, 185, 185, 0.5)",
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
    );
  } else {
    display = (
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
        grid={{ column: 1 }}
        dataSource={props.posts}
        renderItem={(p) => (
          <List.Item>
            <LazyLoad height={320} placeholder={<Card loading={true} />} once>
              <Link
                href="/post/[post_type]/[post_id]"
                as={`/post/${p.post_type["S"]}/${p.post_id["S"]}`}
              >
                <a>
                  <motion.div
                    whileHover={{
                      scale: 1.025,
                    }}
                  >
                    <div
                      style={{
                        maxHeight: 320,
                        overflow: "hidden",
                        marginBottom: 60,
                        backgroundColor: "#fff",
                        boxShadow: "0 5px 20px rgba(185, 185, 185, 0.5)",
                        borderRadius: "8px",
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
    );
  }

  const jsonld_webpage = {
    "@context": "http://schema.org",
    "@type": "WebPage",
    name: props.title,
    description: props.about_heading,
  };

  return (
    <div>
      <Head>
        <title>{props.title}</title>
        {isEmpty(props["meta_description"]) ? null : (
          <meta name="description" content={props["meta_description"]} />
        )}
        <link
          rel="canonical"
          href={`https://www.ronweasley.co${router.pathname}`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld_webpage) }}
        />
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
              <Row>
                <Col xs={{ span: 24, offset: 0 }} lg={{ span: 8, offset: 0 }}>
                  <div className="hero">
                    <WallCarousel
                      alt={props.wall_alt}
                      src={props.wall_src}
                      walls={props.wall_items}
                    />
                  </div>
                </Col>
                <Col xs={{ span: 24, offset: 0 }} lg={{ span: 16, offset: 0 }}>
                  <Row>
                    <Col
                      xs={{ span: 22, offset: 1 }}
                      md={{ span: 20, offset: 2 }}
                      lg={{ span: 18, offset: 2 }}
                      xxl={{ span: 16, offset: 2 }}
                    >
                      <div className="heading_div">
                        <h1 className="main_heading">{props.main_heading}</h1>
                        <h3 className="about_heading">{props.about_heading}</h3>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
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
                    <div className="layout_add_post">
                      <Link
                        href="/new_post/[post_type]"
                        as={
                          props.type
                            ? `/new_post/${props.addPostLink}_${props.type}`
                            : `/new_post/${props.addPostLink}_appreciation`
                        }
                      >
                        <a
                          className="ant-btn ant-btn-lg ant-btn-round"
                          style={{ lineHeight: "25px" }}
                        >
                          Add Post
                        </a>
                      </Link>
                    </div>
                    <div className="searchbar">
                      <Row>
                        <Col
                          xs={{ span: 24, offset: 0 }}
                          md={{ span: 24, offset: 0 }}
                          lg={{ span: 8, offset: 16 }}
                          xxl={{ span: 6, offset: 18 }}
                        >
                          <Input
                            prefix={<SearchOutlined />}
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
            min-height: 80vh;
            height: 100%;
            width: 100%;
            margin-top: -64px;
            background-image: linear-gradient(to top, #b224ef 0%, #7579ff 100%);
          }
          .heading_div {
            height: 80vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            font-family: "Karla";
          }
          .main_heading {
            font-size: 60px;
            color: #fff;
            font-weight: bolder;
          }
          .about_heading {
            font-size: 20px;
            color: #fff;
          }
          .hero {
            height: 80vh;
            display: flex;
            justify-content: flex-end;
            overflow: hidden;
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
            margin-bottom: 32px;
          }
          .layout_add_post {
            display: none;
          }
          @media only screen and (max-width: 991px) {
            .hero {
              height: 100vh;
              max-height: 720px;
              justify-content: center;
            }
            .heading_div {
              height: 100%;
              align-items: center;
              justify-content: flex-start;
              padding-bottom: 32px;
            }
            .main_heading {
              font-size: 44px;
            }
          }
          @media only screen and (max-width: 575px) {
            .layout_add_post {
              display: block;
              display: flex;
              justify-content: flex-end;
              padding-bottom: 16px;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Layout;
