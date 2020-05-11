import Link from "next/link";

import { Button } from "antd";

import ErrorLayout from "../components/ErrorLayout";

function Custom404() {
  return (
    <ErrorLayout
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link href="/">
          <a>
            <Button type="primary">Back Home</Button>
          </a>
        </Link>
      }
    />
  );
}

export default Custom404;
