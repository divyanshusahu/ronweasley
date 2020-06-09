import { Row, Col, Typography, Card, List, Avatar, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";

import Confetti from "react-confetti";
import LazyLoad from "react-lazyload";
import { motion } from "framer-motion";

import SecondaryLayout from "../components/SecondaryLayout";
import credits_data from "../data/credits_data";

function Credits() {
  const isClient = typeof window === "object";

  const getSize = () => {
    return {
      width: isClient ? document.body.clientWidth : 0,
      height: isClient ? document.body.scrollHeight : 0,
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

  const variants = {
    initial: { y: 30, scale: 0.9, opacity: 0 },
    enter: {
      y: 0,
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exit: {
      scale: 0.6,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const [showImageModal, setShowImageModal] = React.useState(false);
  const [imageURL, setImageURL] = React.useState("#");
  const handleImagePreview = (url) => {
    setShowImageModal(true);
    setImageURL(url);
  };

  const credit_display = (title, data) => {
    return (
      <motion.div variants={variants}>
        <Card
          title={title}
          style={{
            boxShadow: "8px 14px 38px 0px rgba(40,40,40,0.1)",
            marginBottom: "64px",
          }}
        >
          <List
            itemLayout="vertical"
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item
                extra={
                  <LazyLoad height={64} once>
                    <img
                      src={item.thumbnail}
                      alt="art"
                      width={64}
                      onClick={() => handleImagePreview(item.thumbnail)}
                      style={{ cursor: "pointer" }}
                    />
                  </LazyLoad>
                }
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      size="large"
                      icon={<UserOutlined />}
                      style={{
                        backgroundColor: index % 2 ? "#52c41a" : "#faad14",
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
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        recycle={false}
        numberOfPieces={400}
      />
      <SecondaryLayout title="Credits">
        <motion.div
          initial="initial"
          animate="enter"
          exit="exit"
          variants={{
            enter: { transition: { staggerChildren: 0.1 } },
            exit: { transition: { staggerChildren: 0.1 } },
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
                {credit_display("Ron Weasley", credits_data.ron_weasley)}
                {credit_display("Romione", credits_data.romione)}
                {credit_display("Golden Trio", credits_data.golden_trio)}
                {credit_display("Weasley Family", credits_data.weasley_family)}
                {credit_display(
                  "Ron and Lavender",
                  credits_data.ron_and_lavender
                )}
                {credit_display("Ron and Harry", credits_data.ron_and_harry)}
                {credit_display("Ron and Luna", credits_data.ron_and_luna)}
              </Col>
            </Row>
          </div>
        </motion.div>
        <Modal
          centered
          width={640}
          visible={showImageModal}
          footer={null}
          onCancel={() => setShowImageModal(false)}
        >
          <img src={imageURL} alt="art" className="modal_image" />
        </Modal>
      </SecondaryLayout>
      <style jsx>
        {`
          .page_root {
            margin: 48px 0;
          }
          .modal_image {
            max-width: 90%;
            display: block;
            margin: auto;
          }
        `}
      </style>
    </div>
  );
}

export default Credits;
