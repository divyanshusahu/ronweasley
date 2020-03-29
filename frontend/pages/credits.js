import { Row, Col, Typography, Card, List, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Confetti from "react-confetti";

import { motion } from "framer-motion";

import SecondaryLayout from "../components/SecondaryLayout";

function Credits() {
  const isClient = typeof window === "object";

  const getSize = () => {
    return {
      width: isClient ? document.body.clientWidth : 0,
      height: isClient ? document.body.scrollHeight : 0
    };
  };

  // ! initilise width and height value to random numbers to avoid different
  // ! value during server side and client side.
  const [windowSize, setWindowSize] = React.useState({ width: 10, height: 10 });
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

  React.useEffect(() => {
    setWindowSize(getSize());
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

  const variants = {
    initial: { y: 30, scale: 0.9, opacity: 0 },
    enter: {
      y: 0,
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: {
      scale: 0.6,
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const credit_display = (title, data) => {
    return (
      <motion.div variants={variants}>
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
      </motion.div>
    );
  };

  return (
    <div>
      <Confetti width={windowSize.width} height={windowSize.height} />
      <SecondaryLayout title="Credits">
        <motion.div
          initial="initial"
          animate="enter"
          exit="exit"
          variants={{
            enter: { transition: { staggerChildren: 0.1 } },
            exit: { transition: { staggerChildren: 0.1 } }
          }}
        >
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
        </motion.div>
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
