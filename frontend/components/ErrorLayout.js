import Head from "next/head";

import { Result } from "antd";

function ErrorLayout(props) {
  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/antd@3.26.4/dist/antd.min.css"
          type="text/css"
        />
      </Head>
      <Result
        status={props.status}
        title={props.title}
        subTitle={props.subTitle}
        extra={props.extra}
      />
    </div>
  );
}

export default ErrorLayout;
