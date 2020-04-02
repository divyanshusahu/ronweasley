import { Result, Layout as AntLayout } from "antd";

import { motion } from "framer-motion";

import Footer from "./Footer";

const AntContent = AntLayout.Content;
const AntFooter = AntLayout.Footer;

function ErrorLayout(props) {
  return (
    <div>
      <AntLayout style={{ minHeight: "100vh" }}>
        <AntContent>
          <motion.div exit={{ opacity: 0, transition: { duration: 0.1 } }}>
            <Result
              status={props.status}
              title={props.title}
              subTitle={props.subTitle}
              extra={props.extra}
            />
          </motion.div>
        </AntContent>
        <AntFooter style={{ padding: 0 }}>
          <Footer />
        </AntFooter>
      </AntLayout>
    </div>
  );
}

export default ErrorLayout;
