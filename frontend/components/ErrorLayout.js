import { Result, Layout as AntLayout } from "antd";

import Footer from "./Footer";

const AntContent = AntLayout.Content;
const AntFooter = AntLayout.Footer;

function ErrorLayout(props) {
  return (
    <div>
      <AntLayout style={{ minHeight: "100vh" }}>
        <AntContent>
          <Result
            status={props.status}
            title={props.title}
            subTitle={props.subTitle}
            extra={props.extra}
          />
        </AntContent>
        <AntFooter style={{ padding: 0 }}>
          <Footer />
        </AntFooter>
      </AntLayout>
    </div>
  );
}

export default ErrorLayout;
