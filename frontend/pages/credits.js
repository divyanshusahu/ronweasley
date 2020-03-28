import { Row, Col, Typography, Card, List, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Confetti from "react-confetti";

import SecondaryLayout from "../components/SecondaryLayout";

function Credits() {
  const isClient = typeof window === "object";

  const getSize = () => {
    return {
      width: isClient ? document.body.clientWidth : undefined,
      height: isClient ? document.body.scrollHeight : undefined
    };
  };

  const [windowSize, setWindowSize] = React.useState(getSize());
  React.useEffect(() => {
    if (!isClient) {
      return false;
    }
    const handleResize = () => {
      setWindowSize(getSize());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const ron_weasley_credit = [
    {
      author: "stopblushingemma",
      author_link: "https://stopblushingemma.tumblr.com",
      original_post:
        "https://stopblushingemma.tumblr.com/post/137186406330/colourful-ginger-boy"
    },
    {
      author: "hillyminne",
      author_link: "https://hillyminne.tumblr.com",
      original_post:
        "https://hillyminne.tumblr.com/post/173183074502/bearded-ron-weasley-d-some-ladies-were"
    },
    {
      author: "atalienart",
      author_link: "https://atalienart.tumblr.com",
      original_post: "https://atalienart.tumblr.com/post/156010477127/ron"
    },
    {
      author: "upthehillart",
      author_link: "https://upthehillart.tumblr.com",
      original_post:
        "https://upthehillart.tumblr.com/post/157845950310/pigwidgeon-the-king"
    }
  ];

  const credit_display = (title, data) => {
    return (
      <Card
        title={title}
        style={{
          boxShadow: "8px 14px 38px 0px rgba(40,40,40,0.1)",
          marginBottom: "64px"
        }}
      >
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    size="large"
                    icon={<UserOutlined />}
                    style={{
                      backgroundColor: index % 2 ? "#52c41a" : "#faad14"
                    }}
                  />
                }
                title={
                  <a
                    href={item.author_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.author}
                  </a>
                }
                description={
                  <a
                    href={item.original_post}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Original Post
                  </a>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    );
  };

  return (
    <div>
      <Confetti width={windowSize.width} height={windowSize.height} />
      <SecondaryLayout title="Credits">
        <div className="page_root">
          <Typography.Title level={2} style={{ textAlign: "center" }}>
            Credits
          </Typography.Title>
          <Typography.Paragraph
            strong
            type="secondary"
            style={{ textAlign: "center" }}
          >
            Mentions of all the amazing artists whose fanarts are used on this
            website.
          </Typography.Paragraph>
          <Row>
            <Col
              xs={{ span: 22, offset: 1 }}
              sm={{ span: 20, offset: 2 }}
              md={{ span: 14, offset: 5 }}
              lg={{ span: 12, offset: 6 }}
            >
              {credit_display("Ron Weasley", ron_weasley_credit)}
              {credit_display("Romione", ron_weasley_credit)}
              {credit_display("Golden Trio", ron_weasley_credit)}
            </Col>
          </Row>
        </div>
      </SecondaryLayout>
      <style jsx>
        {`
          .page_root {
            margin: 48px 0;
          }
        `}
      </style>
    </div>
  );
}

export default Credits;
